# THE SCRIPT - desktop app (Windows, macOS, Linux)

The same screenplay editor as the website, as a normal program with its own window, an icon and
an installer. Everything is stored on your computer (encrypted with your password), nothing is
sent anywhere.

## Build the Windows app (about 5 minutes, once)
1. Install Node.js (LTS) from https://nodejs.org
2. Unzip this folder.
3. Double-click `build-windows.bat`.
4. Open the `dist` folder: `THE SCRIPT Setup 1.0.0.exe` installs the app (Start menu + desktop icon),
   `THE SCRIPT 1.0.0.exe` (portable) runs without installing.

macOS: `npm install` then `npm run dist:mac` (on a Mac). Linux: `npm install` then `npm run dist:linux`.

## Try it without building
Double-click `run-app.bat` (or run `npm install` then `npm start`).

## Good to know
- The first `npm install` needs internet. It also saves the PDF engine inside the app, so
  Save / Export works offline afterwards.
- Your scripts live in the app's own storage. Accounts made in the browser version are not shared
  with the desktop app, because each one keeps its data on its own. Use Save / Export to move a script.
- Alt shows the menu bar. Right-click gives spelling suggestions and copy / paste.
- Windows may show "unknown publisher" for an unsigned installer. Choose "More info" then "Run anyway".
  A code-signing certificate removes that warning.
- To update the editor later, replace the files inside `app/` and build again.

## Folders
- `main.js` - the desktop window (size memory, spell check, safe links)
- `app/` - the editor (same code as the website)
- `scripts/get-pdf-engine.js` - downloads the PDF engine during install
- `build/icon.png` - the app icon


## Telugu typing

Type Telugu in English letters and it becomes Telugu script when you press space, a punctuation mark, Enter or Tab:

    namaskaram naa peru tharun nenu chadavadam maanesaanu  ->  నమస్కారం నా పేరు తరుణ్ నేను చదవడం మానేసాను

- Common Telugu words and names are spelled from a built-in dictionary. Words with an ending (ravitho, ammaki, pustakaalu) are built from the dictionary word plus the ending. Anything else is written by sound. Right after a word turns Telugu, press Ctrl+Space to swap it for the next spelling in place (no box); the app remembers the spelling you settle on.
- Put a backtick before a word to keep it in English: `` `phone ``.
- Ctrl+Z after a word turns it back into English letters.
- INT./EXT./DAY/NIGHT in scene headings and transitions stay in English.
- Typing starts in English. Switch with the **EN | తెలుగు** switch in the top bar (click the language you want), or press Ctrl+Shift+T to flip between them. Pick the Telugu font from "Telugu font" (fonts load from Google Fonts, so they need internet the first time).

## Look

The whole app uses **Sato Sans** (one weight, Medium) for its interface text, so the top bar sits in the same type as the rest of the app. The app name uses **Narezka**. Both are bundled in `app/fonts` (Sato is under the SIL Open Font License, see `app/fonts/OFL-Sato.txt`). Themes are based on real light: Daylight (default), Paper, Overcast, Golden hour, Candlelight, Moonlight, or Match system.

## Build the apps with GitHub (no installs on your PC)

1. Make a free account at github.com and create a new repository (for example `the-script`).
2. Upload everything from this folder to it. The easiest way is GitHub Desktop: *Add local repository*, then *Commit* and *Publish*.
   If you use the website's "Upload files", make sure the hidden-looking `.github` folder goes up too (drag the whole folder contents in).
3. Open the repository's **Actions** tab. The build starts by itself (or press **Run workflow**). It takes about 5-10 minutes.
4. When it is green, open the run and download from **Artifacts**: `THE-SCRIPT-windows` has the Windows installer and the portable `.exe`;
   `THE-SCRIPT-mac` has the `.dmg`; `THE-SCRIPT-linux` has the `.AppImage`.
5. For a download page that never expires, tag a version: in GitHub Desktop choose *Repository > Create tag* `v1.0.0` and push it.
   The apps then appear under the repository's **Releases**.

Change the version number in `package.json` when you release a new one. Windows may warn "unknown publisher" because the installer is not signed.

## Phone version

Two ways to get THE SCRIPT on a phone, both built by GitHub (see the workflows in `.github/workflows`):

1. **Web app (Android and iPhone).** Turn on GitHub Pages once: repository *Settings > Pages > Source: GitHub Actions*. After the "Publish web app" run finishes, open the address it shows on your phone. Android Chrome: menu > *Install app*. iPhone Safari: Share > *Add to Home Screen*. It then works offline.
2. **Android app (.apk).** Run the "Build Android app" workflow, download `THE-SCRIPT-android` from the run's Artifacts, unzip it and install `app-debug.apk` (allow "install unknown apps" when asked).

On a phone the script opens in **Text view** (it reflows to the screen). Menu > *Page view* shows the paper page scaled to fit.

## Project files: phone <-> computer

A project saved from *Save / Export > Project version* is a single file ending in **.thescript**. It holds the script, title page, storyboard photos and linktree.

- Send it between phone and computer any way you like (WhatsApp, Gmail, Drive, USB). Old `.script.json` files still open too.
- **Computer app:** double-click a `.thescript` file. The app opens (or comes forward) and asks whether to replace the current script with it. Log in first if the app is locked. This works with the installer; the portable `.exe` cannot register file types.
- **Android app:** tap a `.thescript` file in Files, Drive or Downloads and choose THE SCRIPT. Saving sends the file through the Android share list.
- **Installed web app:** on Android, share the file to *THE SCRIPT*; on Chrome or Edge on a computer, double-click the file after installing the app.
- Anywhere: *Save / Export > Open a project > Choose project file*.
