/* BIICODE HOME V17 — approved order: actions first, bikes below. */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
.statusbar{display:none!important}.bio-home-bike{display:none!important}.bio-home-title{margin-top:18px!important;margin-bottom:14px!important}
.quick-actions,.grid{position:relative!important;z-index:5!important}.quick-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 11px!important}
.quick-action,.action{border:1.5px solid #1677ff!important;background:linear-gradient(145deg,#112b48,#0b1b2e)!important;box-shadow:0 0 16px rgba(21,101,255,.12),0 8px 24px rgba(0,0,0,.18)!important}.quick-action:nth-child(2){border-color:#ff5870!important;box-shadow:0 0 16px rgba(255,88,112,.12),0 8px 24px rgba(0,0,0,.18)!important}
.quick-action .qa-icon{font-size:30px!important;line-height:31px!important;color:#28a1ff!important}.quick-action:nth-child(2) .qa-icon{color:#ff5870!important}.action{min-height:96px!important;padding:15px!important}.action strong{font-size:16px!important}.action .muted{font-size:12px!important}.grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 18px!important}
.nav .plus{width:82px!important;height:82px!important;min-width:82px!important;max-width:82px!important;flex:0 0 82px!important;margin-top:-24px!important;border-radius:50%!important;background:linear-gradient(145deg,#1680ff,#0758e8)!important;border:3px solid #07101b!important;box-shadow:0 0 0 2px #1677ff,0 8px 34px rgba(21,101,255,.62)!important;font-size:0!important;color:transparent!important}.nav .plus::before{content:'+';display:block!important;color:#fff!important;font-size:42px!important;font-weight:400!important;line-height:76px!important;text-align:center!important}
.qr-scan-wrap{padding-top:2px}.qr-video-box{position:relative;overflow:hidden;border-radius:24px;background:#050a11;border:1px solid #1677ff;min-height:330px;margin:14px 0;display:grid;place-items:center;box-shadow:0 0 25px rgba(21,101,255,.15)}.qr-video-box video{width:100%;height:330px;object-fit:cover;display:block}.qr-frame{position:absolute;width:210px;height:210px;border:3px solid #1680ff;border-radius:24px;box-shadow:0 0 0 999px rgba(0,0,0,.2),0 0 30px rgba(21,101,255,.55);pointer-events:none}.qr-hint{color:#a8b7ca;text-align:center;font-size:13px;margin:8px 0 14px}.qr-manual{display:grid;grid-template-columns:1fr auto;gap:8px}.qr-manual input{min-height:50px}.qr-manual button{min-width:105px;border:0;border-radius:12px;background:#1677ff;color:#fff;font-weight:900}.theft-list{display:grid;gap:10px;margin-top:15px}.theft-item{width:100%;text-align:left;border:1px solid #ff5870;border-radius:17px;background:#121f31;color:#fff;padding:15px}.theft-item strong{display:block;font-size:16px}.theft-item span{display:block;color:#93a4b8;font-size:12px;margin-top:4px}
@media(max-width:380px){.nav .plus{width:74px!important;height:74px!important;min-width:74px!important;max-width:74px!important;flex-basis:74px!important}.nav .plus::before{font-size:38px!important;line-height:68px!important}.action,.quick-action{min-height:92px!important}}
`;
document.head.appendChild(style);
function moveHome(){
 const main=document.querySelector('#main');if(!main)return;
 const status=main.querySelector('.statusbar');if(status)status.remove();
 const art=main.querySelector('.bio-home-bike');if(art)art.remove();
 const head=main.querySelector('.head'), title=main.querySelector('h1'), q=main.querySelector('.quick-actions'), g=main.querySelector('.grid');
 if(!head||!title||!q||!g)return;
 title.classList.add('bio-home-title');
 /* Render order: logo → QR/Furto → Immatricola/Sincronizza → Le mie bici → bike cards. */
 head.insertAdjacentElement('afterend',q);q.insertAdjacentElement('afterend',g);g.insertAdjacentElement('afterend',title);
}
window.biicodeScanQR=window.biicodeScanQR||function(){alert('Scanner QR non disponibile.');};
window.biicodeReportTheft=window.biicodeReportTheft||function(){alert('Segnalazione furto non disponibile.');};
moveHome();new MutationObserver(()=>requestAnimationFrame(moveHome)).observe(document.body,{childList:true,subtree:true});
})();