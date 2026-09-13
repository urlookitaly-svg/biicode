/* BIICODE HOME V8 */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
.bio-home-bike{position:absolute;right:-18px;top:-92px;width:285px;height:185px;opacity:.38;pointer-events:none;z-index:0}
.bio-home-bike svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 10px rgba(21,101,255,.35))}
h1.bio-home-title{position:relative;z-index:1}
.quick-actions{position:relative;z-index:3;display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 14px!important}
.quick-action{min-height:92px!important;border:1px solid #1477ff!important;border-radius:20px!important;background:linear-gradient(145deg,#10243b,#0b1727)!important;color:#fff!important;text-align:left!important;padding:14px!important;box-shadow:0 7px 24px rgba(0,0,0,.2),0 0 18px rgba(21,101,255,.08)!important}
.quick-action strong{display:block!important;font-size:15px!important;margin-top:2px!important}.quick-action span{display:block!important;color:#9bb0c8!important;font-size:11px!important;margin-top:3px!important}.quick-action .qa-icon{font-size:28px!important;line-height:28px!important;display:block!important;margin-bottom:7px!important}.quick-action:nth-child(2){border-color:#ef5b72!important}.quick-action:nth-child(2) .qa-icon{color:#ff5c73!important}
@media(max-width:380px){.bio-home-bike{width:235px;height:155px;right:-20px;top:-72px;opacity:.3}.quick-action{min-height:88px!important;padding:12px!important}.quick-action strong{font-size:14px!important}}
`;
document.head.appendChild(style);
function arrange(){
 const title=document.querySelector('#main h1');
 if(!title)return;
 title.classList.add('bio-home-title');
 if(!title.querySelector('.bio-home-bike')){const art=document.createElement('div');art.className='bio-home-bike';art.innerHTML='<svg viewBox="0 0 360 190" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#1670ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><circle cx="78" cy="142" r="37"/><circle cx="282" cy="142" r="37"/><path d="M78 142 126 74l50 68H78Zm48-68 38 0 40 68h-76m-2-68 29-28m49 96 39-68 39 68m-39-68h34m-34 0 12-15"/><path d="M126 74 158 74"/></g><path d="M116 48h34" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>';title.appendChild(art)}
 const q=document.querySelector('.quick-actions');
 const firstCard=document.querySelector('#main .card');
 if(q&&firstCard&&q!==firstCard&&(q.compareDocumentPosition(firstCard)&Node.DOCUMENT_POSITION_FOLLOWING))firstCard.parentNode.insertBefore(q,firstCard);
}
arrange();
new MutationObserver(()=>requestAnimationFrame(arrange)).observe(document.body,{childList:true,subtree:true});
})();