/* BIICODE welcome: one full-screen interaction layer, no overlapping buttons. */
(function(){'use strict';
const q=s=>document.querySelector(s);
function style(){if(q('#biicode-final-auth-styles'))return;const s=document.createElement('style');s.id='biicode-final-auth-styles';s.textContent=`
.biicode-welcome{position:fixed!important;inset:0!important;z-index:9999!important;background:#050d17!important;padding:0!important;overflow:hidden!important}
.biicode-welcome-inner,.biicode-welcome-photo{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:540px!important;margin:auto!important;padding:0!important;overflow:hidden!important;background:#050d17!important}
.biicode-welcome-art{display:block!important;width:100%!important;height:100%!important;object-fit:fill!important;pointer-events:none!important;user-select:none!important;-webkit-user-select:none!important}
.biicode-welcome-hit{position:absolute!important;left:8%!important;width:84%!important;z-index:10002!important;border:0!important;background:transparent!important;color:transparent!important;padding:0!important;margin:0!important;-webkit-appearance:none!important;appearance:none!important;touch-action:manipulation!important}
.biicode-welcome-hit-info{top:64%!important;height:7.5%!important}
.biicode-welcome-hit-register{top:71.5%!important;height:7.5%!important}
.biicode-welcome-hit-login{top:79%!important;height:8%!important}
.biicode-network-overlay{position:fixed!important;inset:0!important;z-index:30000!important;background:#07101b!important;overflow:auto!important}
.biicode-network-page{min-height:100dvh!important;background:#07101b!important;display:flex!important;justify-content:center!important}
.biicode-network-image{display:block!important;width:100%!important;height:auto!important;max-width:540px!important;align-self:flex-start!important}
.biicode-network-close{position:fixed!important;z-index:30001!important;top:calc(12px + env(safe-area-inset-top))!important;left:14px!important;width:42px!important;height:42px!important;border:1px solid rgba(255,255,255,.4)!important;border-radius:50%!important;background:rgba(4,12,21,.84)!important;color:#fff!important;font-size:27px!important}
`;document.head.appendChild(s)}
function login(){if(typeof window.login==='function')return window.login();alert('Accesso non disponibile. Ricarica la pagina.')}
function info(){q('#biicode-network-overlay')?.remove();const o=document.createElement('div');o.id='biicode-network-overlay';o.className='biicode-network-overlay';o.innerHTML='<button class="biicode-network-close" type="button">×</button><div class="biicode-network-page"><img class="biicode-network-image" src="./assets/biicode-how-it-works.webp?v=18" alt="Come funziona BIICODE"></div>';document.body.appendChild(o);o.querySelector('button').onclick=()=>o.remove()}
function ensureWelcome(){let root=q('.biicode-welcome');if(root)return root;const main=q('#main');if(!main)return null;const hasSession=!!localStorage.getItem('biicode_session');if(hasSession)return null;const nav=q('#nav');if(nav)nav.classList.add('hidden');main.innerHTML='<div class="biicode-welcome"><div class="biicode-welcome-inner"></div></div>';return q('.biicode-welcome')}
function render(){style();const root=ensureWelcome();if(!root)return;const inner=root.querySelector('.biicode-welcome-inner')||root;if(inner.dataset.controller==='15')return;inner.dataset.controller='15';inner.innerHTML='<div class="biicode-welcome-photo"><img class="biicode-welcome-art" src="./assets/biicode-welcome-final.webp?v=20260918d" alt="BIICODE community"><button class="biicode-welcome-hit biicode-welcome-hit-info" type="button" aria-label="Come funziona BIICODE"></button><button class="biicode-welcome-hit biicode-welcome-hit-register" type="button" aria-label="Registra la mia bici"></button><button class="biicode-welcome-hit biicode-welcome-hit-login" type="button" aria-label="Accedi"></button></div>';
const [bInfo,bRegister,bLogin]=inner.querySelectorAll('.biicode-welcome-hit');
bInfo.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();info()});
bRegister.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(typeof window.register==='function')window.register()});
bLogin.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();login()})}
new MutationObserver(()=>requestAnimationFrame(render)).observe(document.body,{childList:true,subtree:true});render();setTimeout(render,100);setTimeout(render,700);
})();