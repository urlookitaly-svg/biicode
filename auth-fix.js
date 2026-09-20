/* BIICODE welcome: real visible HTML controls, no image hit-maps. */
(function(){'use strict';
const q=s=>document.querySelector(s);
function style(){if(q('#biicode-final-auth-styles'))return;const s=document.createElement('style');s.id='biicode-final-auth-styles';s.textContent=`
.biicode-welcome{position:fixed!important;inset:0!important;z-index:9999!important;background:#050d17!important;padding:0!important;overflow:auto!important}
.biicode-welcome-inner{width:100%!important;max-width:540px!important;min-height:100%!important;margin:auto!important;background:#050d17!important}
.biicode-welcome-photo{position:relative!important;width:100%!important;overflow:hidden!important;aspect-ratio:709/900!important}
.biicode-welcome-art{display:block!important;width:100%!important;height:auto!important;pointer-events:none!important;user-select:none!important;-webkit-user-select:none!important}
.biicode-real-cta{position:relative!important;z-index:10002!important;padding:12px 24px calc(18px + env(safe-area-inset-bottom))!important;background:linear-gradient(180deg,rgba(5,13,23,0),#050d17 18%,#050d17 100%)!important}
.biicode-real-cta button{font-family:inherit!important;cursor:pointer!important}
.biicode-info-btn{width:100%!important;min-height:72px!important;border:2px solid #1594ff!important;border-radius:34px!important;background:#0a3158!important;color:#fff!important;font-size:17px!important;font-weight:900!important;line-height:1!important;padding:0 22px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;box-shadow:0 0 18px rgba(21,148,255,.35)!important}
.biicode-cta-row{display:grid!important;grid-template-columns:1fr 1fr!important;gap:10px!important;margin-top:10px!important}
.biicode-register-btn,.biicode-login-btn{min-height:68px!important;border-radius:28px!important;font-size:15px!important;font-weight:900!important;color:#fff!important}
.biicode-register-btn{border:0!important;background:#087cf0!important}
.biicode-login-btn{border:2px solid #2987c8!important;background:#09233b!important}
.biicode-network-overlay{position:fixed!important;inset:0!important;z-index:30000!important;background:#07101b!important;overflow:auto!important}
.biicode-network-page{min-height:100dvh!important;background:#07101b!important;display:flex!important;justify-content:center!important}
.biicode-network-image{display:block!important;width:100%!important;height:auto!important;max-width:540px!important;align-self:flex-start!important}
.biicode-network-close{position:fixed!important;z-index:30001!important;top:calc(12px + env(safe-area-inset-top))!important;left:14px!important;width:42px!important;height:42px!important;border:1px solid rgba(255,255,255,.4)!important;border-radius:50%!important;background:rgba(4,12,21,.84)!important;color:#fff!important;font-size:27px!important}
`;document.head.appendChild(s)}
function leaveWelcome(){q('.biicode-welcome')?.remove();const nav=q('#nav');if(nav)nav.classList.add('hidden')}
function login(){leaveWelcome();if(typeof window.login==='function')return window.login();alert('Accesso non disponibile. Ricarica la pagina.')}
function info(){q('#biicode-network-overlay')?.remove();const o=document.createElement('div');o.id='biicode-network-overlay';o.className='biicode-network-overlay';o.innerHTML='<button class="biicode-network-close" type="button">×</button><div class="biicode-network-page"><img class="biicode-network-image" src="./assets/A0578995-2476-4A1B-98DD-0CB4312EED18.png?v=32" alt="Come funziona BIICODE"></div>';document.body.appendChild(o);o.querySelector('button').onclick=()=>o.remove()}
function ensureWelcome(){let root=q('.biicode-welcome');if(root)return root;const main=q('#main');if(!main)return null;if(localStorage.getItem('biicode_session'))return null;const nav=q('#nav');if(nav)nav.classList.add('hidden');main.innerHTML='<div class="biicode-welcome"><div class="biicode-welcome-inner"></div></div>';return q('.biicode-welcome')}
function render(){style();const root=ensureWelcome();if(!root)return;const inner=root.querySelector('.biicode-welcome-inner')||root;if(inner.dataset.controller==='21')return;inner.dataset.controller='21';inner.innerHTML='<div class="biicode-welcome-photo"><img class="biicode-welcome-art" src="./assets/biicode-welcome-final.webp?v=20260918d" alt="BIICODE community"></div><div class="biicode-real-cta"><button class="biicode-info-btn" type="button">COME FUNZIONA? <span style="position:absolute;right:22px;top:50%;transform:translateY(-50%);font-size:28px;line-height:1">›</span></button><div class="biicode-cta-row"><button class="biicode-register-btn" type="button">＋ REGISTRA</button><button class="biicode-login-btn" type="button">♙ ACCEDI</button></div></div>';
inner.querySelector('.biicode-info-btn').onclick=info;
inner.querySelector('.biicode-register-btn').onclick=()=>{leaveWelcome();if(typeof window.register==='function')window.register()};
inner.querySelector('.biicode-login-btn').onclick=login}
render();setTimeout(render,100);setTimeout(render,700);
})();