/* BIICODE HOME V9 — reference-style mountain bike + top actions */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
.bio-home-bike{position:relative;width:100%;height:145px;margin:-2px 0 2px;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:0;overflow:hidden}
.bio-home-bike svg{width:min(430px,105%);height:150px;display:block;filter:drop-shadow(0 0 14px rgba(21,101,255,.22))}
.bio-home-title{position:relative;z-index:2}
.quick-actions{position:relative;z-index:3;display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 14px!important}
.quick-action{min-height:96px!important;border:1px solid #1477ff!important;border-radius:20px!important;background:linear-gradient(145deg,#10243b,#0b1727)!important;color:#fff!important;text-align:left!important;padding:14px!important;box-shadow:0 7px 24px rgba(0,0,0,.2),0 0 18px rgba(21,101,255,.08)!important}
.quick-action strong{display:block!important;font-size:15px!important;margin-top:2px!important}.quick-action span{display:block!important;color:#9bb0c8!important;font-size:11px!important;margin-top:3px!important}.quick-action .qa-icon{font-size:28px!important;line-height:28px!important;display:block!important;margin-bottom:7px!important}.quick-action:nth-child(2){border-color:#ef5b72!important}.quick-action:nth-child(2) .qa-icon{color:#ff5c73!important}
@media(max-width:380px){.bio-home-bike{height:128px;margin-top:-2px}.bio-home-bike svg{height:132px;width:110%}.quick-action{min-height:90px!important;padding:12px!important}.quick-action strong{font-size:14px!important}}
`;
document.head.appendChild(style);
function arrange(){
 const main=document.querySelector('#main');
 if(!main)return;
 const title=main.querySelector('h1');
 const head=main.querySelector('.head');
 if(title)title.classList.add('bio-home-title');
 let art=main.querySelector('.bio-home-bike');
 if(!art){
   art=document.createElement('div');art.className='bio-home-bike';
   art.innerHTML='<svg viewBox="0 0 520 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#1565ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"><circle cx="104" cy="132" r="40"/><circle cx="414" cy="132" r="40"/><path d="M104 132 172 67 246 132H104Zm68-65h56l51 65h-79m-28-65 24-31m83 96 55-88 55 88m-55-88h45m-45 0 12-18m-12 18 25 12"/><path d="M224 98 275 98"/><path d="M326 132 348 84"/></g><g stroke="#f5f8ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><path d="M160 67h30l13 12"/><path d="M348 84h29"/><path d="M354 75l12-11"/></g><path d="M171 67 195 67" stroke="#f5f8ff" stroke-width="5" stroke-linecap="round" opacity=".8"/></svg>';
   if(head)head.insertAdjacentElement('afterend',art); else if(title)title.insertAdjacentElement('beforebegin',art);
 }
 const q=main.querySelector('.quick-actions');
 const firstBike=main.querySelector('.bike');
 const grid=main.querySelector('.grid');
 if(q){
   const target=firstBike||grid||title;
   if(target&&q!==target)target.parentNode.insertBefore(q,target);
 }
}
arrange();
new MutationObserver(()=>requestAnimationFrame(arrange)).observe(document.body,{childList:true,subtree:true});
})();