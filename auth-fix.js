/* BIICODE welcome controller — exact artwork + three independent actions. */
(function(){'use strict';
const $=s=>document.querySelector(s);
function css(){if($('#biicode-final-auth-styles'))return;const e=document.createElement('style');e.id='biicode-final-auth-styles';e.textContent=`
.biicode-welcome{position:fixed!important;inset:0!important;z-index:9999!important;background:#050d17!important;overflow:hidden!important;padding:0!important}
.biicode-welcome-inner,.biicode-welcome-photo{position:absolute!important;inset:0!important;width:100%!important;height:100dvh!important;max-width:540px!important;margin:auto!important;padding:0!important;overflow:hidden!important;background:#050d17!important}
.biicode-welcome-art{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center top!important;pointer-events:none!important}
.biicode-hit{position:absolute!important;z-index:10001!important;left:6%!important;right:6%!important;height:6.2%!important;border:0!important;background:transparent!important;color:transparent!important;padding:0!important;margin:0!important;-webkit-appearance:none!important;appearance:none!important;touch-action:manipulation!important}
.biicode-how{top:65.0%!important}.biicode-register{top:71.5%!important}.biicode-login{top:78.0%!important}
.biicode-network-overlay{position:fixed!important;inset:0!important;z-index:20000!important;background:#07101b!important;overflow:auto!important}
.biicode-network-page{position:relative!important;min-height:100dvh!important;background:#07101b!important;display:flex!important;align-items:flex-start!important;justify-content:center!important}
.biicode-network-image{display:block!important;width:100%!important;height:auto!important;max-width:540px!important}
.biicode-network-close{position:fixed!important;z-index:20001!important;top:calc(12px + env(safe-area-inset-top))!important;left:14px!important;width:42px!important;height:42px!important;border:1px solid rgba(255,255,255,.4)!important;border-radius:50%!important;background:rgba(4,12,21,.82)!important;color:#fff!important;font-size:27px!important;line-height:1!important}
`;document.head.appendChild(e)}
function realLogin(){const fn=window.__biicodeOriginalLogin;if(typeof fn==='function'){fn();return}alert('Accesso non disponibile. Ricarica la pagina.')}
function how(){css();$('#biicode-network-overlay')?.remove();const o=document.createElement('div');o.id='biicode-network-overlay';o.className='biicode-network-overlay';o.innerHTML='<button class="biicode-network-close" type="button" aria-label="Chiudi">×</button><div class="biicode-network-page"><img class="biicode-network-image" src="./assets/biicode-how-it-works.webp?v=17" alt="Come funziona BIICODE"></div>';document.body.appendChild(o);o.querySelector('.biicode-network-close').onclick=()=>o.remove()}
function render(){css();const root=$('.biicode-welcome');if(!root)return;const inner=root.querySelector('.biicode-welcome-inner')||root;if(inner.dataset.controller==='11')return;inner.dataset.controller='11';inner.innerHTML='<div class="biicode-welcome-photo"><img class="biicode-welcome-art" src="./assets/biicode-welcome-final.webp?v=20260918c" alt="BIICODE community"><button id="biicodeHow" class="biicode-hit biicode-how" type="button" aria-label="Come funziona"></button><button id="biicodeRegister" class="biicode-hit biicode-register" type="button" aria-label="Registra la mia bici"></button><button id="biicodeLogin" class="biicode-hit biicode-login" type="button" aria-label="Accedi"></button></div>';
inner.querySelector('#biicodeHow').onclick=e=>{e.preventDefault();e.stopPropagation();how()};
inner.querySelector('#biicodeRegister').onclick=e=>{e.preventDefault();e.stopPropagation();if(typeof window.register==='function')window.register()};
inner.querySelector('#biicodeLogin').onclick=e=>{e.preventDefault();e.stopPropagation();realLogin()};
}
const mo=new MutationObserver(()=>requestAnimationFrame(render));mo.observe(document.body,{childList:true,subtree:true});render();setTimeout(render,100);setTimeout(render,600);
})();