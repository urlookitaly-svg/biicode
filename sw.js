const CACHE='biicode-v6';
const APP=['./','./index.html','./manifest.json','./fix.js'];

const START_PRIVATE_CURRENT=`async function startPrivateApp(){if(booting)return;booting=true;try{currentUser=currentUser||((await db.auth.getUser()).data.user);await loadData();home()}finally{booting=false}}`;
const START_PRIVATE_NEW=`async function startPrivateApp(){if(booting)return;if(!currentUser){showLogin();return}booting=true;try{await loadData();home()}catch(e){console.error('BIICODE startup:',e);loadLocal();home()}finally{booting=false}}`;
const START_APP_CURRENT=`async function startApp(){const p=new URLSearchParams(location.search),bike=p.get('bike');if(bike){await publicMode(bike);return}const {data:s}=await db.auth.getSession();if(s.session?.user){currentUser=s.session.user;if(location.hash.includes('type=recovery')){showResetPassword();return}await startPrivateApp()}else showLogin()}`;
const START_APP_NEW=`async function startApp(){const p=new URLSearchParams(location.search),bike=p.get('bike');if(bike){await publicMode(bike);return}if(location.hash.includes('type=recovery')){showResetPassword();return}showLogin()}`;

function patchHtml(text){
  let patched=text;
  patched=patched.replace('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js');
  patched=patched.replace(START_PRIVATE_CURRENT,START_PRIVATE_NEW);
  patched=patched.replace(START_APP_CURRENT,START_APP_NEW);
  if(!patched.includes('<script src="./fix.js"></script>')) patched=patched.replace('</head>','<script src="./fix.js"></script></head>');
  return patched;
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    const assets=await Promise.all(APP.map(async url=>{
      try{
        const response=await fetch(url,{cache:'no-store'});
        if(!response.ok)throw new Error('HTTP '+response.status);
        if(url.endsWith('.html')||url==='./'){
          const text=await response.text();
          return [url,new Response(patchHtml(text),{headers:{'content-type':'text/html; charset=utf-8'}})];
        }
        return [url,response];
      }catch(e){return null}
    }));
    for(const item of assets)if(item)await cache.put(item[0],item[1]);
  }).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(event.request.method!=='GET'||u.origin!==location.origin)return;
  if(event.request.destination==='document'||u.pathname.endsWith('.html')){
    event.respondWith(fetch(event.request).then(async r=>{
      const text=await r.clone().text();
      const patched=patchHtml(text);
      const headers=new Headers(r.headers);
      headers.set('content-type','text/html; charset=utf-8');
      headers.delete('content-length');
      const out=new Response(patched,{status:r.status,statusText:r.statusText,headers});
      caches.open(CACHE).then(c=>c.put(event.request,out.clone())).catch(()=>{});
      return out;
    }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});
