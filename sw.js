const CACHE='biicode-v10';
const APP=['./','./index.html','./manifest.json'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    for(const url of APP){
      try{
        const r=await fetch(url,{cache:'no-store'});
        if(r.ok)await cache.put(url,r);
      }catch(e){}
    }
  }).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(event.request.method!=='GET'||u.origin!==location.origin)return;
  if(event.request.destination==='document'||u.pathname.endsWith('.html')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(async r=>{
      if(!r.ok)return r;
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});
      return r;
    }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||fetch(event.request))));
});
