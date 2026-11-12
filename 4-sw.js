const CACHE = 'engapp-v5';
const ASSETS = ['./', './index.html', './2-app.js', './3-app.css', './6-icon-192.png', './7-icon-512.png', './5-manifest.webmanifest', './8-noto-hebrew-400.woff2', './9-noto-hebrew-700.woff2', './10-noto-latin-400.woff2', './11-noto-latin-700.woff2'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
