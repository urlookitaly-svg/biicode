/* BIICODE HOME V13 — reference composition */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
main{position:relative!important;overflow:visible!important}
.head{position:relative!important;z-index:3!important;margin-bottom:0!important}
.head-logo{width:min(380px,100%)!important;max-height:112px!important;object-fit:contain!important;object-position:left center!important}
.bio-home-bike{position:absolute!important;right:-8px!important;top:92px!important;width:285px!important;height:122px!important;display:block!important;pointer-events:none!important;z-index:1!important;overflow:visible!important;opacity:.48!important}
.bio-home-bike svg{width:100%!important;height:100%!important;display:block!important;filter:drop-shadow(0 0 12px rgba(21,101,255,.2))!important}
.bio-home-title{position:relative!important;z-index:3!important;margin-top:48px!important;margin-bottom:15px!important}
.statusbar{position:relative!important;z-index:4!important;margin-bottom:10px!important}
.quick-actions{position:relative!important;z-index:4!important;display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 14px!important}
.quick-action{min-height:92px!important;border:1px solid #1677ff!important;border-radius:19px!important;background:linear-gradient(145deg,#10243b,#0b1727)!important;color:#fff!important;text-align:left!important;padding:14px!important;box-shadow:0 7px 24px rgba(0,0,0,.18),0 0 18px rgba(21,101,255,.07)!important}
.quick-action:nth-child(2){border-color:#ff5870!important}
.quick-action .qa-icon{font-size:27px!important;line-height:29px!important;display:block!important;margin-bottom:6px!important}
.quick-action strong{display:block!important;font-size:15px!important;line-height:18px!important}.quick-action span{display:block!important;color:#91a5bd!important;font-size:11px!important;line-height:15px!important;margin-top:3px!important}
.card{border-radius:21px!important;margin-bottom:11px!important}.bike{min-height:96px!important}.grid{margin-top:12px!important;gap:11px!important}.action{min-height:108px!important;border-radius:19px!important}
.nav{height:106px!important}.plus{width:72px!important;height:72px!important;min-width:72px!important;max-width:72px!important}
@media(max-width:380px){main{padding-left:14px!important;padding-right:14px!important}.head-logo{width:100%!important;max-height:104px!important}.bio-home-bike{right:-8px!important;top:88px!important;width:255px!important;height:108px!important;opacity:.44!important}.bio-home-title{margin-top:42px!important}.statusbar{margin-bottom:8px!important}.quick-action{min-height:88px!important;padding:12px!important}.quick-action strong{font-size:14px!important}.nav{height:104px!important}.plus{width:66px!important;height:66px!important;min-width:66px!important;max-width:66px!important}}
`;
document.head.appendChild(style);
const BIKE='<svg viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#1671ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><circle cx="100" cy="135" r="39"/><circle cx="420" cy="135" r="39"/><path d="M100 135 188 72 315 82 245 135H100Z"/><path d="M188 72 245 135 315 82"/><path d="M245 135 207 88"/><path d="M315 82 420 135"/><path d="M315 82 348 135"/><path d="M348 135H420"/><path d="M315 82 344 35"/><path d="M344 35h36"/><path d="M344 35 357 22"/><path d="M188 72 177 48"/><path d="M168 48h23"/><path d="M207 88h22"/></g><g stroke="#f5f8ff" stroke-width="5" stroke-linecap="round" opacity=".9"><path d="M174 47h27"/><path d="M355 48h28"/><path d="M365 39l12-11"/></g></svg>';
function arrange(){
 const main=document.querySelector('#main');if(!main)return;const title=main.querySelector('h1');const head=main.querySelector('.head');if(title)title.classList.add('bio-home-title');
 let art=main.querySelector('.bio-home-bike');if(!art){art=document.createElement('div');art.className='bio-home-bike'}art.innerHTML=BIKE;
 if(head&&art.parentNode!==main)head.insertAdjacentElement('afterend',art);
 const q=main.querySelector('.quick-actions');const firstBike=main.querySelector('.bike');if(q&&firstBike&&q!==firstBike)firstBike.parentNode.insertBefore(q,firstBike);
}
arrange();new MutationObserver(()=>requestAnimationFrame(arrange)).observe(document.body,{childList:true,subtree:true});
})();