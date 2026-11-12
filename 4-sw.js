const CACHE = 'engapp-v3';
const ASSETS = ['./', './index.html', './app.js', './app.css', './icon-192.png', './icon-512.png', './manifest.webmanifest', './noto-hebrew-400.woff2', './noto-hebrew-700.woff2', './noto-latin-400.woff2', './noto-latin-700.woff2'];
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
