/* BIICODE HOME V15 — only requested cleanup */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
/* Keep every existing element unchanged except the two requested removals. */
.statusbar{display:none!important}
.bio-home-bike{display:none!important}
.bio-home-title{margin-top:10px!important}
`;
document.head.appendChild(style);
function arrange(){
 const main=document.querySelector('#main');if(!main)return;
 const status=main.querySelector('.statusbar');if(status)status.remove();
 const art=main.querySelector('.bio-home-bike');if(art)art.remove();
}
arrange();new MutationObserver(()=>requestAnimationFrame(arrange)).observe(document.body,{childList:true,subtree:true});
})();