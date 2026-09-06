const CACHE='biicode-v3';
const APP=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==location.origin)return;
if(event.request.destination==='document'||u.pathname.endsWith('.html')){event.respondWith(fetch(event.request).then(async r=>{const text=await r.clone().text();const patched=text.replace('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','https://unpkg.com/@supabase/supabase-js@2');const headers=new Headers(r.headers);headers.set('content-type','text/html; charset=utf-8');headers.delete('content-length');const out=new Response(patched,{status:r.status,statusText:r.statusText,headers});caches.open(CACHE).then(c=>c.put(event.request,out.clone())).catch(()=>{});return out}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));return;}
event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});
