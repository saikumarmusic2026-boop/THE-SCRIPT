// THE SCRIPT service worker: the web version works offline once opened, and receives project files
// that are shared to the installed app (Android share list).
const CACHE = 'the-script-v1';
const CORE = ['./', 'index.html', 'telugu.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'fonts/Narezka.ttf', 'fonts/Sato-Medium.ttf', 'lang/te.json', 'lang/hi.json', 'lang/ta.json', 'lang/ml.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith('the-script-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request, u = new URL(r.url);
  if (r.method === 'POST' && u.pathname.endsWith('/share-target')) {      // a project file was shared to the app
    e.respondWith((async () => {
      try {
        const f = (await r.formData()).get('project');
        if (f && f.text) {
          const c = await caches.open('share');
          await c.put('project', new Response(await f.text(), { headers: { 'X-Name': encodeURIComponent(f.name || 'project') } }));
        }
      } catch (err) { /* open the app anyway */ }
      return Response.redirect(new URL('./?shared=1', self.registration.scope).href, 303);
    })());
    return;
  }
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then((hit) => {
    const net = fetch(r).then((res) => {
      if (res.ok) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(r, cp)); }
      return res;
    }).catch(() => hit);
    if (hit) { e.waitUntil(net); return hit; }                           // open from the saved copy, refresh in the background
    return net;
  }));
});
