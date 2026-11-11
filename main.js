// Desktop shell for the screenplay editor.
// The editor itself is the web app in ./app. It is served through a private app:// address
// (a secure origin), so encryption, IndexedDB and localStorage behave exactly like on the web.
const { app, BrowserWindow, Menu, protocol, net, shell, session, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, 'app');
const START_URL = 'app://script/index.html';

// Smooth scrolling and typing: draw with the graphics card (must be set before the app is ready)
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true } },
]);

// One window only: opening the app again just brings the first one forward
if (!app.requestSingleInstanceLock()) app.quit();

let win = null;

// ---- project files (.thescript): double-click one and the app opens it
let pendingProject = null;                                  // a file waiting for the window to finish loading
const projectFromArgs = (argv) => argv.slice(1).find((a) => /\.thescript$/i.test(a) && fs.existsSync(a));
function sendProject(file) {
  if (!file) return;
  if (!win || win.webContents.isLoading()) { pendingProject = file; return; }
  fs.readFile(file, 'utf8', (err, text) => {
    if (err || !win || text.length > 80e6) return;
    win.webContents.executeJavaScript(
      `window.__openProject&&window.__openProject(${JSON.stringify(path.basename(file))},${JSON.stringify(text)})`
    ).catch(() => {});
  });
  if (win.isMinimized()) win.restore();
  win.focus();
}
pendingProject = projectFromArgs(process.argv);
app.on('open-file', (e, file) => { e.preventDefault(); sendProject(file); });   // macOS

// ---- remember the window size and position between runs
const stateFile = () => path.join(app.getPath('userData'), 'window.json');
function loadState() {
  try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch { return {}; }
}
function saveState() {
  if (!win || win.isDestroyed()) return;
  const maximized = win.isMaximized();
  const bounds = maximized ? (loadState().bounds || win.getNormalBounds()) : win.getBounds();
  try { fs.writeFileSync(stateFile(), JSON.stringify({ bounds, maximized })); } catch { /* not important */ }
}

// ---- serve ./app over app:// and never let a request leave that folder
function serveApp() {
  protocol.handle('app', (request) => {
    const url = new URL(request.url);
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/' || rel === '') rel = '/index.html';
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT + path.sep)) return new Response('Forbidden', { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
  });
}

function buildMenu() {
  const template = [
    { label: 'File', submenu: [{ role: process.platform === 'darwin' ? 'close' : 'quit' }] },
    { label: 'Edit', submenu: [
      { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
      { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
    ] },
    { label: 'View', submenu: [
      { role: 'togglefullscreen' },
      ...(app.isPackaged ? [] : [{ role: 'toggleDevTools' }, { role: 'reload' }]),
    ] },
    { label: 'Window', submenu: [{ role: 'minimize' }, { role: 'close' }] },
  ];
  if (process.platform === 'darwin') template.unshift({ role: 'appMenu' });
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  const state = loadState();
  win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 900, minHeight: 600,
    ...(state.bounds || {}),
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#15181d' : '#e6e3dc',
    title: 'THE SCRIPT',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,           // press Alt to show the menu on Windows / Linux
    show: false,
    webPreferences: {
      contextIsolation: true, sandbox: true, nodeIntegration: false,
      spellcheck: true,
    },
  });
  if (state.maximized) win.maximize();
  win.once('ready-to-show', () => win.show());
  win.on('close', saveState);
  win.on('closed', () => { win = null; });

  // Links to other sites open in the normal browser, never inside the app
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^(https?:|mailto:)/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('app://')) { e.preventDefault(); if (/^(https?:|mailto:)/i.test(url)) shell.openExternal(url); }
  });

  // Right-click: spelling suggestions and clipboard (Electron has no default context menu)
  win.webContents.on('context-menu', (_e, p) => {
    const items = [];
    if (p.misspelledWord) {
      p.dictionarySuggestions.slice(0, 5).forEach((s) => items.push({ label: s, click: () => win.webContents.replaceMisspelling(s) }));
      items.push(
        { label: 'Add to dictionary', click: () => win.webContents.session.addWordToSpellCheckerDictionary(p.misspelledWord) },
        { type: 'separator' },
      );
    }
    if (p.isEditable) items.push({ role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { type: 'separator' }, { role: 'selectAll' });
    else if (p.selectionText) items.push({ role: 'copy' });
    if (items.length) Menu.buildFromTemplate(items).popup({ window: win });
  });

  win.webContents.on('did-finish-load', () => {
    if (pendingProject) { const f = pendingProject; pendingProject = null; sendProject(f); }
  });

  win.loadURL(START_URL);
}

app.whenReady().then(() => {
  serveApp();
  // The editor needs no camera, location, notifications and so on
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, done) => done(false));
  buildMenu();
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});

app.on('second-instance', (_e, argv) => {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.focus();
  sendProject(projectFromArgs(argv));
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
