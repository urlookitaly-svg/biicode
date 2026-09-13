/* BIICODE HOME V11 — reference-style mountain bike + top actions */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
.bio-home-bike{position:relative!important;width:100%!important;height:145px!important;margin:-2px 0 2px!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;z-index:0!important;overflow:hidden!important}
.bio-home-bike svg{width:min(430px,105%)!important;height:150px!important;display:block!important;filter:drop-shadow(0 0 14px rgba(21,101,255,.22))!important}
.bio-home-title{position:relative;z-index:2}
.quick-actions{position:relative;z-index:3;display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 14px!important}
.quick-action{min-height:96px!important;border:1px solid #1477ff!important;border-radius:20px!important;background:linear-gradient(145deg,#10243b,#0b1727)!important;color:#fff!important;text-align:left!important;padding:14px!important;box-shadow:0 7px 24px rgba(0,0,0,.2),0 0 18px rgba(21,101,255,.08)!important}
.quick-action strong{display:block!important;font-size:15px!important;margin-top:2px!important}.quick-action span{display:block!important;color:#9bb0c8!important;font-size:11px!important;margin-top:3px!important}.quick-action .qa-icon{font-size:28px!important;line-height:28px!important;display:block!important;margin-bottom:7px!important}.quick-action:nth-child(2){border-color:#ef5b72!important}.quick-action:nth-child(2) .qa-icon{color:#ff5c73!important}
@media(max-width:380px){.bio-home-bike{height:128px!important;margin-top:-2px!important}.bio-home-bike svg{height:132px!important;width:110%!important}.quick-action{min-height:90px!important;padding:12px!important}.quick-action strong{font-size:14px!important}}
`;
document.head.appendChild(style);
const BIKE='<svg viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#1565ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".62"><circle cx="100" cy="135" r="40"/><circle cx="420" cy="135" r="40"/><path d="M100 135 188 72 315 82 245 135H100Z"/><path d="M188 72 245 135 315 82"/><path d="M245 135 207 88"/><path d="M315 82 420 135"/><path d="M315 82 348 135"/><path d="M348 135 420 135"/><path d="M315 82 344 35"/><path d="M344 35 380 35"/><path d="M344 35 357 22"/><path d="M188 72 177 48"/><path d="M168 48 191 48"/><path d="M207 88 229 88"/></g><g stroke="#f5f8ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><path d="M174 47h27"/><path d="M355 48h28"/><path d="M365 39l12-11"/></g><path d="M188 72 315 82" stroke="#0d56d7" stroke-width="7" stroke-linecap="round" opacity=".75"/></svg>';
function arrange(){
 const main=document.querySelector('#main');if(!main)return;
 const title=main.querySelector('h1');const head=main.querySelector('.head');if(title)title.classList.add('bio-home-title');
 let art=main.querySelector('.bio-home-bike');
 if(!art){art=document.createElement('div');art.className='bio-home-bike';}
 art.innerHTML=BIKE;
 if(head && art.parentNode!==main)head.insertAdjacentElement('afterend',art); else if(head && art.parentNode===title)head.insertAdjacentElement('afterend',art); else if(!art.parentNode && title)title.insertAdjacentElement('beforebegin',art);
 const q=main.querySelector('.quick-actions');const firstBike=main.querySelector('.bike');const grid=main.querySelector('.grid');
 if(q){const target=firstBike||grid||title;if(target&&q!==target)target.parentNode.insertBefore(q,target)}
}
arrange();
new MutationObserver(()=>requestAnimationFrame(arrange)).observe(document.body,{childList:true,subtree:true});
})();