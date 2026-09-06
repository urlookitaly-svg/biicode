const CACHE="biicode-v8";
const APP=["./","./index.html","./manifest.json"];

function patchHtml(text){
  let patched=text;
  patched=patched.replace("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2","https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js");
  const helper=`
function safeBootstrap(){
  try{
    const p=new URLSearchParams(location.search),bike=p.get('bike');
    if(bike){publicMode(bike);return}
    if(location.hash.includes('type=recovery')){showResetPassword();return}
    showLogin();
  }catch(e){
    console.error('BIICODE bootstrap:',e);
    try{showLogin()}catch(_){app.innerHTML='<div style="padding:40px;text-align:center;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><h2>BIICODE</h2><p>Impossibile avviare l\'app. Ricarica la pagina.</p></div>'}
  }
}
if(window.db&&db.auth){
  db.auth.onAuthStateChange((event,session)=>{
    if(event==='INITIAL_SESSION'&&session?.user&&!booting){
      currentUser=session.user;
      startPrivateApp();
    }
  });
}
`;
  if(!patched.includes('function safeBootstrap()')){
    patched=patched.replace(/startApp\(\);\s*<\/script>/,helper+'safeBootstrap();</script>');
  }
  return patched;
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    for(const url of APP){
      try{
        const r=await fetch(url,{cache:'no-store'});
        if(!r.ok)continue;
        if(url==='./' || url.endsWith('.html')){
          const t=await r.text();
          await cache.put(url,new Response(patchHtml(t),{status:r.status,headers:{'content-type':'text/html; charset=utf-8'}}));
        }else await cache.put(url,r);
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
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(r=>r||fetch(event.request))));
});
