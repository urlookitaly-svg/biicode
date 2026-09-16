/* BIICODE final welcome + auth bridge + how-it-works. */
(function(){
  'use strict';

  function originalLogin(){
    const fn=window.__biicodeOriginalLogin;
    if(typeof fn==='function'){fn();return true}
    return false;
  }

  function styles(){
    if(document.getElementById('biicode-final-auth-styles'))return;
    const s=document.createElement('style');
    s.id='biicode-final-auth-styles';
    s.textContent=`
      /* FINAL WELCOME */
      .biicode-welcome{position:fixed!important;inset:0!important;z-index:9999!important;background:#050d17!important;overflow-y:auto!important;padding:0!important}
      .biicode-welcome-inner{width:100%!important;max-width:540px!important;min-height:100dvh!important;margin:0 auto!important;padding:0!important;position:relative!important;background:#050d17!important;overflow:hidden!important}
      .biicode-welcome-logo{position:absolute!important;z-index:4!important;top:28px!important;left:50%!important;transform:translateX(-50%)!important;width:min(300px,72%)!important;height:auto!important;filter:drop-shadow(0 8px 18px rgba(0,0,0,.3))!important}
      .biicode-welcome-photo{position:relative!important;width:100%!important;height:min(100dvh,860px)!important;min-height:720px!important;overflow:hidden!important;background:#102d4d!important}
      .biicode-welcome-photo img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center top!important}
      .biicode-welcome-photo:after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(3,10,18,.08) 0%,rgba(3,10,18,0) 46%,rgba(3,10,18,.45) 70%,rgba(3,10,18,.97) 100%);pointer-events:none}
      .biicode-welcome-overlay{position:absolute!important;z-index:3!important;left:20px!important;right:20px!important;bottom:22px!important;text-align:center!important}
      .biicode-welcome-overlay h1{margin:0 0 7px!important;font-size:34px!important;line-height:.98!important;letter-spacing:-.05em!important;color:#fff!important;text-shadow:0 4px 20px rgba(0,0,0,.35)!important}
      .biicode-welcome-overlay h1 span{color:#2991ff!important}
      .biicode-welcome-overlay p{margin:0 0 15px!important;color:#d9e6f5!important;font-size:14px!important;font-weight:700!important}
      .biicode-welcome-actions{display:grid!important;gap:9px!important}
      .biicode-welcome-actions button{width:100%!important;min-height:55px!important;border-radius:17px!important;font-size:15px!important;font-weight:950!important;letter-spacing:.01em!important}
      .biicode-welcome-register{border:0!important;background:linear-gradient(135deg,#2b83ff,#095bea)!important;color:#fff!important;box-shadow:0 10px 28px rgba(21,101,255,.38)!important}
      .biicode-welcome-login{border:1.5px solid #55aaff!important;background:rgba(5,16,29,.72)!important;color:#fff!important;backdrop-filter:blur(10px)!important}
      .biicode-welcome-foot{display:none!important}

      /* HOW IT WORKS: only the previously built illustration. */
      .biicode-how{width:100%!important;min-height:68px!important;margin:12px 0 18px!important;padding:12px 16px!important;border:1px solid #43a6ff!important;border-radius:21px!important;background:linear-gradient(145deg,#0c2340,#071525)!important;color:#fff!important;text-align:left!important;display:flex!important;align-items:center!important;gap:12px!important;box-shadow:0 0 6px rgba(41,151,255,.95),0 0 20px rgba(21,101,255,.62),0 0 34px rgba(21,101,255,.28)!important;position:relative!important;overflow:hidden!important;animation:biicodeNeonPulse 2.2s ease-in-out infinite!important}
      .biicode-how strong{display:block!important;font-size:17px!important;line-height:1.05!important;letter-spacing:.01em!important}
      .biicode-how small{display:block!important;margin-top:4px!important;color:#a9c7e8!important;font-size:11px!important;line-height:1.2!important}
      .biicode-how-icon{display:none!important}
      .biicode-how-arrow{margin-left:auto!important;font-size:28px!important;color:#55aaff!important;text-shadow:0 0 12px #1677ff!important}
      @keyframes biicodeNeonPulse{0%,100%{box-shadow:0 0 6px rgba(41,151,255,.95),0 0 20px rgba(21,101,255,.62),0 0 34px rgba(21,101,255,.28)}50%{box-shadow:0 0 9px rgba(72,174,255,1),0 0 28px rgba(21,101,255,.85),0 0 48px rgba(21,101,255,.4)}}

      /* The explainer is the image, nothing else. */
      .biicode-network-page{position:relative!important;min-height:100dvh!important;padding:0!important;background:#07101b!important;display:flex!important;align-items:center!important;justify-content:center!important}
      .biicode-network-image{display:block!important;width:100%!important;height:auto!important;max-height:100dvh!important;object-fit:contain!important}
      .biicode-network-close{position:absolute!important;z-index:2!important;top:calc(12px + env(safe-area-inset-top))!important;left:14px!important;width:38px!important;height:38px!important;border:1px solid rgba(255,255,255,.3)!important;border-radius:50%!important;background:rgba(4,12,21,.7)!important;color:#fff!important;font-size:24px!important;line-height:1!important;backdrop-filter:blur(10px)!important}

      @media(max-width:380px){
        .biicode-welcome-logo{top:23px!important;width:min(270px,70%)!important}
        .biicode-welcome-photo{min-height:680px!important}
        .biicode-welcome-overlay{left:15px!important;right:15px!important;bottom:16px!important}
        .biicode-welcome-overlay h1{font-size:30px!important}
        .biicode-welcome-actions button{min-height:52px!important}
      }
      @media(max-height:720px){
        .biicode-welcome-photo{height:100dvh!important;min-height:620px!important}
        .biicode-welcome-logo{top:16px!important;width:min(245px,66%)!important}
        .biicode-welcome-overlay{bottom:12px!important}
        .biicode-welcome-overlay h1{font-size:27px!important}
        .biicode-welcome-overlay p{margin-bottom:9px!important;font-size:12px!important}
        .biicode-welcome-actions{gap:7px!important}
        .biicode-welcome-actions button{min-height:46px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function openNetworkPage(){
    styles();
    const modal=document.getElementById('modal'),mi=document.getElementById('modalin');
    if(!modal||!mi)return false;
    mi.innerHTML=`<div class="biicode-network-page"><button class="biicode-network-close" type="button" aria-label="Chiudi">×</button><img class="biicode-network-image" src="./assets/biicode-rete-comic.svg?v=final4" alt="Come funziona BIICODE"></div>`;
    modal.classList.add('open');
    mi.querySelector('.biicode-network-close').addEventListener('click',()=>modal.classList.remove('open'));
    return true;
  }

  function addHowItWorks(){
    if(document.querySelector('[data-biicode-how]'))return;
    const grid=document.querySelector('.grid');
    if(!grid)return;
    const btn=document.createElement('button');
    btn.type='button';btn.className='biicode-how';btn.dataset.biicodeHow='1';
    btn.innerHTML='<span><strong>COME FUNZIONA?</strong><small>Scopri la rete BIICODE in 1 minuto.</small></span><span class="biicode-how-arrow">›</span>';
    btn.addEventListener('click',openNetworkPage);
    const headings=[...document.querySelectorAll('h1,h2,h3,.title')];
    const target=headings.find(el=>/le\s+mie\s+bici/i.test((el.textContent||'').trim()));
    if(target)target.parentNode.insertBefore(btn,target);
    else grid.insertAdjacentElement('afterend',btn);
  }

  function simplifyWelcome(){
    const root=document.querySelector('.biicode-welcome');
    if(!root)return;
    const inner=root.querySelector('.biicode-welcome-inner')||root;
    if(inner.dataset.authFixFinal==='1')return;
    inner.dataset.authFixFinal='1';
    inner.innerHTML=`<div class="biicode-welcome-photo"><img src="./assets/biicode-welcome.svg?v=final1" alt="Ciclisti BIICODE"><img class="biicode-welcome-logo" src="./assets/biicode-logo-v2.svg?v=welcome22" alt="BIICODE"><div class="biicode-welcome-overlay"><h1>La tua bici.<br><span>La sua identità.</span></h1><p>Registrala. Identificala. Proteggila.</p><div class="biicode-welcome-actions"><button class="biicode-welcome-register" type="button" data-biicode-register>REGISTRA LA MIA BICI</button><button class="biicode-welcome-login" type="button" data-biicode-login>HO GIÀ UN ACCOUNT · ACCEDI</button></div></div></div>`;
    const r=inner.querySelector('[data-biicode-register]'),l=inner.querySelector('[data-biicode-login]');
    if(r)r.addEventListener('click',()=>{if(typeof window.register==='function')window.register()});
    if(l)l.addEventListener('click',()=>{if(!originalLogin())alert('Schermata di accesso non disponibile. Ricarica la pagina.')});
  }

  function patchLoginButtons(){
    document.querySelectorAll('button').forEach(btn=>{
      const text=(btn.textContent||'').replace(/\s+/g,' ').trim().toUpperCase();
      if(text.includes('HO GIÀ UN ACCOUNT')||text==='ACCEDI SENZA REGISTRARTI'){
        if(btn.dataset.authFixBound==='1')return;
        btn.dataset.authFixBound='1';
        btn.onclick=null;
        btn.addEventListener('click',function(ev){ev.preventDefault();ev.stopImmediatePropagation();originalLogin()},true);
      }
    });
  }

  function run(){styles();simplifyWelcome();addHowItWorks();patchLoginButtons()}
  const observer=new MutationObserver(()=>requestAnimationFrame(run));
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(run,0);setTimeout(run,250);setTimeout(run,900);
})();
