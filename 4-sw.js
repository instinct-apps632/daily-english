const CACHE='engapp-cloud-v4';
const ASSETS=['./2-app.js','./3-app.css','./','./index.html','./9-cloud-v3.js','./6-cloud-v2.css','./1-14-cloud-v6.js','./2-14-cloud-v6.css','./3-privacy.html','./6-icon-192.png','./7-icon-512.png','./5-manifest.webmanifest','./8-noto-hebrew-400.woff2','./9-noto-hebrew-700.woff2','./10-noto-latin-400.woff2','./11-noto-latin-700.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('engapp-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok&&['./','./index.html'].some(p=>new URL(p,self.registration.scope).pathname===url.pathname)){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));return;}
 if(ASSETS.some(p=>new URL(p,self.registration.scope).pathname===url.pathname))e.respondWith(caches.open(CACHE).then(c=>c.match(e.request,{ignoreSearch:true})).then(r=>r||fetch(e.request)));
});
