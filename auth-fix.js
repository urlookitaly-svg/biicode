/* BIICODE auth bridge + community explainer. */
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

  function injectNetworkStyles(){
    if(document.getElementById('biicode-network-styles'))return;
    const s=document.createElement('style');
    s.id='biicode-network-styles';
    s.textContent=`
      .biicode-how{width:100%;margin:12px 0 0;padding:15px 17px;border:1px solid #2b4566;border-radius:19px;background:linear-gradient(145deg,#12263e,#0d1725);color:#fff;text-align:left;display:flex;align-items:center;gap:13px;box-shadow:0 8px 22px rgba(0,0,0,.14);cursor:pointer}
      .biicode-how-icon{width:42px;height:42px;min-width:42px;border-radius:13px;background:#1565ff;display:grid;place-items:center;font-size:22px;box-shadow:0 7px 18px rgba(21,101,255,.25)}
      .biicode-how strong{display:block;font-size:15px;line-height:1.1}.biicode-how span{display:block;margin-top:4px;color:#8292a8;font-size:11px;line-height:1.25}.biicode-how-arrow{margin-left:auto;font-size:25px;color:#5790ff}
      .biicode-network-page{min-height:100%;padding:4px 0 30px;color:#fff}
      .biicode-network-top{display:flex;align-items:center;gap:10px;margin-bottom:16px}.biicode-network-back{border:0;background:none;color:#5790ff;font-weight:900;font-size:14px;padding:7px 0;cursor:pointer}.biicode-network-logo{display:block;width:145px;height:auto;margin:3px auto 17px}
      .biicode-network-title{font-size:30px!important;line-height:1.02!important;letter-spacing:-.045em;margin:0 0 7px!important;text-align:center}.biicode-network-title span{color:#1565ff}.biicode-network-sub{margin:0 auto 17px;text-align:center;color:#9aabc0;font-size:14px;line-height:1.45;max-width:390px}
      .biicode-comic{display:block;width:100%;height:auto;border-radius:24px;border:1px solid #29415f;background:#f4f8fd;box-shadow:0 15px 35px rgba(0,0,0,.22);margin:0 auto 17px}
      .biicode-network-message{background:linear-gradient(145deg,#142941,#0f1c2d);border:1px solid #29415f;border-radius:20px;padding:17px;margin-bottom:11px;text-align:center}.biicode-network-message strong{display:block;font-size:19px;line-height:1.2}.biicode-network-message p{margin:7px 0 0;color:#9aabc0;font-size:12px;line-height:1.45}
      .biicode-network-privacy{font-size:10px;color:#71839a;text-align:center;margin:14px 18px 0;line-height:1.45}
      .biicode-network-cta{width:100%;min-height:52px;border:0;border-radius:15px;background:#1565ff;color:#fff;font-weight:900;font-size:14px;margin-top:4px;box-shadow:0 9px 24px rgba(21,101,255,.22);cursor:pointer}
    `;
    document.head.appendChild(s);
  }

  function openNetworkPage(){
    injectNetworkStyles();
    const modal=document.getElementById('modal');
    const mi=document.getElementById('modalin');
    if(!modal||!mi)return false;
    mi.innerHTML=`
      <div class="biicode-network-page">
        <div class="biicode-network-top"><button class="biicode-network-back" type="button" data-network-back>← INDIETRO</button></div>
        <img class="biicode-network-logo" src="./assets/biicode-logo-v2.svg?v=network2" alt="BIICODE">
        <h1 class="biicode-network-title">Insieme per bici <span>più sicure.</span></h1>
        <p class="biicode-network-sub">BIICODE crea una rete di ciclisti e cittadini che possono aiutarsi a riconoscere e segnalare una bici rubata.</p>
        <img class="biicode-comic" src="./assets/biicode-rete-comic.svg?v=1" alt="Fumetto: la rete BIICODE aiuta a segnalare una bici rubata">
        <div class="biicode-network-message"><strong>La bici può essere rubata.<br>La sua identità no.</strong><p>Se qualcuno la vede, può segnalare dove l'ha trovata. Il proprietario riceve l'avviso e può attivarsi insieme alle autorità competenti.</p></div>
        <button class="biicode-network-cta" type="button" data-network-back>TORNA ALL'APP</button>
        <div class="biicode-network-privacy">La segnalazione non richiede i dati personali di chi avvista la bici. BIICODE non sostituisce la denuncia né le autorità competenti.</div>
      </div>
    `;
    modal.classList.add('open');
    mi.querySelectorAll('[data-network-back]').forEach(b=>b.addEventListener('click',()=>modal.classList.remove('open')));
    return true;
  }

  function addHowItWorks(){
    const actions=document.querySelector('.quick-actions');
    if(!actions||document.querySelector('[data-biicode-how]'))return;
    const btn=document.createElement('button');
    btn.type='button';btn.className='biicode-how';btn.dataset.biicodeHow='1';
    btn.innerHTML='<span class="biicode-how-icon">❓</span><span><strong>COME FUNZIONA</strong><span>Scopri la rete BIICODE che aiuta a proteggere le biciclette.</span></span><span class="biicode-how-arrow">›</span>';
    btn.addEventListener('click',openNetworkPage);
    actions.parentNode.insertBefore(btn,actions.nextSibling);
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
    injectNetworkStyles();
    simplifyWelcome();
    addHowItWorks();
    patchLoginButtons();
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(run));
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(run,0);
  setTimeout(run,250);
  setTimeout(run,1000);
})();