const CACHE='biicode-v2';
const APP=['./','./index.html','./manifest.json'];
const AUTH_PATCH=`<script>
(function(){
  function friendlyAuthError(e){
    const m=String(e&&e.message||e||'').trim();
    if(!navigator.onLine)return 'Nessuna connessione Internet. Controlla la connessione e riprova.';
    if(/failed to fetch|load failed|networkerror|network request failed/i.test(m))return 'Connessione al servizio non riuscita. Controlla Internet e riprova tra qualche secondo.';
    if(/invalid login credentials/i.test(m))return 'Email o password non corretti.';
    if(/email not confirmed/i.test(m))return 'Devi prima confermare il tuo indirizzo email.';
    if(/too many requests/i.test(m))return 'Troppi tentativi. Attendi qualche minuto e riprova.';
    return m||'Impossibile effettuare l’accesso. Riprova.';
  }
  window.biicodeFriendlyAuthError=friendlyAuthError;
  window.loginUser=async function(){
    const emailEl=document.getElementById('loginEmail'),passEl=document.getElementById('loginPassword'),b=document.getElementById('loginButton');
    const email=(emailEl?.value||'').trim(),password=passEl?.value||'';
    if(!email||!password){if(window.authMsg)authMsg('Inserisci email e password.');return}
    if(!navigator.onLine){authMsg('Nessuna connessione Internet. Controlla la connessione e riprova.');return}
    if(b){b.disabled=true;b.textContent='ACCESSO IN CORSO...'}
    let lastError=null;
    try{
      for(let attempt=0;attempt<2;attempt++){
        try{
          const result=await Promise.race([
            db.auth.signInWithPassword({email,password}),
            new Promise((_,reject)=>setTimeout(()=>reject(new Error('NETWORK_TIMEOUT')),12000))
          ]);
          if(result.error)throw result.error;
          currentUser=result.data.user;
          await startPrivateApp();
          return;
        }catch(e){lastError=e;if(attempt===0){await new Promise(r=>setTimeout(r,700));}}
      }
      authMsg(friendlyAuthError(lastError));
    }catch(e){authMsg(friendlyAuthError(e));}
    finally{if(b){b.disabled=false;b.textContent='ACCEDI'}}
  };
})();
</script>`;
async function patchedResponse(request){
  const response=await fetch(request);
  if(!response.ok)return response;
  if(new URL(request.url).pathname.endsWith('/index.html')||new URL(request.url).pathname==='/' ){
    const text=await response.text();
    const patched=text.includes('window.biicodeFriendlyAuthError')?text:text.replace('</body>',AUTH_PATCH+'</body>');
    return new Response(patched,{status:response.status,statusText:response.statusText,headers:response.headers});
  }
  return response;
}
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async c=>{for(const url of APP){try{const r=await patchedResponse(new Request(url));if(r.ok)await c.put(url,r)}catch(e){}}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==location.origin)return;event.respondWith(patchedResponse(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))))});
