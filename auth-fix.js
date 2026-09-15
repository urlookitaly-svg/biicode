/* BIICODE auth bridge: keeps the public welcome screen separate from the real login. */
(function(){
  'use strict';

  function originalLogin(){
    const fn=window.__biicodeOriginalLogin;
    if(typeof fn==='function'){
      fn();
      return true;
    }
    return false;
  }

  function simplifyWelcome(){
    const root=document.querySelector('.biicode-welcome');
    if(!root)return;
    if(root.dataset.authFix==='1')return;
    root.dataset.authFix='1';
    const inner=root.querySelector('.biicode-welcome-inner')||root;
    inner.innerHTML=`
      <img class="biicode-welcome-logo" src="./assets/biicode-logo-v2.svg?v=welcome20" alt="BIICODE">
      <div class="biicode-welcome-hero">
        <h1>La tua bici.<br><span>La sua identità.</span></h1>
        <p>Registrala. Identificala. Proteggila.</p>
      </div>
      <div class="biicode-welcome-cta">
        <button class="btn" type="button" data-biicode-register>REGISTRA LA MIA BICI</button>
        <button class="biicode-welcome-secondary" type="button" data-biicode-login>HO GIÀ UN ACCOUNT · ACCEDI</button>
      </div>
      <div class="biicode-welcome-benefits">
        <article class="biicode-benefit"><div class="biicode-benefit-icon">🪪</div><div><h2>Identità</h2><p>Un codice unico per la tua bici.</p></div></article>
        <article class="biicode-benefit"><div class="biicode-benefit-icon">🛡️</div><div><h2>Protezione</h2><p>Segnala subito un eventuale furto.</p></div></article>
        <article class="biicode-benefit"><div class="biicode-benefit-icon">⌾</div><div><h2>Verifica</h2><p>Controlla il BIICODE tramite QR.</p></div></article>
      </div>
      <div class="biicode-trust">I tuoi dati personali restano protetti.</div>
      <div class="footer-note">BIICODE · La tua bici. Un’identità unica.</div>
    `;
    const registerBtn=inner.querySelector('[data-biicode-register]');
    const loginBtn=inner.querySelector('[data-biicode-login]');
    if(registerBtn)registerBtn.addEventListener('click',()=>{if(typeof window.register==='function')window.register();});
    if(loginBtn)loginBtn.addEventListener('click',()=>{if(!originalLogin())window.alert('Schermata di accesso non disponibile. Ricarica la pagina.');});
  }

  function patchLoginButtons(){
    document.querySelectorAll('button').forEach(btn=>{
      const text=(btn.textContent||'').replace(/\s+/g,' ').trim().toUpperCase();
      if(text.includes('HO GIÀ UN ACCOUNT')||text==='ACCEDI SENZA REGISTRARTI'){
        btn.onclick=null;
        if(btn.dataset.authFixBound==='1')return;
        btn.dataset.authFixBound='1';
        btn.addEventListener('click',function(ev){
          ev.preventDefault();
          ev.stopImmediatePropagation();
          originalLogin();
        },true);
      }
    });
  }

  function run(){
    simplifyWelcome();
    patchLoginButtons();
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(run));
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(run,0);
  setTimeout(run,250);
  setTimeout(run,1000);
})();
