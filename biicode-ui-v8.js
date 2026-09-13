/* BIICODE HOME V16 — action emphasis + working QR/theft tools */
(function(){
'use strict';
const style=document.createElement('style');
style.textContent=`
/* Keep the approved composition; only make actions clearer and functional. */
.statusbar{display:none!important}
.bio-home-bike{display:none!important}
.bio-home-title{margin-top:10px!important}
.quick-actions,.grid{position:relative!important;z-index:5!important}
.quick-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 11px!important}
.quick-action,.action{border:1.5px solid #1677ff!important;background:linear-gradient(145deg,#112b48,#0b1b2e)!important;box-shadow:0 0 16px rgba(21,101,255,.12),0 8px 24px rgba(0,0,0,.18)!important;transition:transform .15s ease,box-shadow .15s ease!important}
.quick-action:nth-child(2){border-color:#ff5870!important;box-shadow:0 0 16px rgba(255,88,112,.12),0 8px 24px rgba(0,0,0,.18)!important}
.quick-action:active,.action:active{transform:scale(.98)!important}
.quick-action .qa-icon{font-size:30px!important;line-height:31px!important;color:#28a1ff!important}.quick-action:nth-child(2) .qa-icon{color:#ff5870!important}
.action{min-height:96px!important;padding:15px!important}.action strong{font-size:16px!important}.action .muted{font-size:12px!important}
.grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 14px!important}
.nav .plus{width:82px!important;height:82px!important;min-width:82px!important;max-width:82px!important;flex:0 0 82px!important;margin-top:-24px!important;border-radius:50%!important;background:linear-gradient(145deg,#1680ff,#0758e8)!important;border:3px solid #07101b!important;box-shadow:0 0 0 2px #1677ff,0 8px 34px rgba(21,101,255,.62)!important;font-size:0!important;color:transparent!important}.nav .plus::before{content:'+';display:block!important;color:#fff!important;font-size:42px!important;font-weight:400!important;line-height:76px!important;text-align:center!important}
.qr-scan-wrap{padding-top:2px}.qr-scan-wrap h1{margin-bottom:5px!important}.qr-video-box{position:relative;overflow:hidden;border-radius:24px;background:#050a11;border:1px solid #1677ff;min-height:330px;margin:14px 0;display:grid;place-items:center;box-shadow:0 0 25px rgba(21,101,255,.15)}.qr-video-box video{width:100%;height:330px;object-fit:cover;display:block}.qr-frame{position:absolute;width:210px;height:210px;border:3px solid #1680ff;border-radius:24px;box-shadow:0 0 0 999px rgba(0,0,0,.2),0 0 30px rgba(21,101,255,.55);pointer-events:none}.qr-hint{color:#a8b7ca;text-align:center;font-size:13px;margin:8px 0 14px}.qr-manual{display:grid;grid-template-columns:1fr auto;gap:8px}.qr-manual input{min-height:50px}.qr-manual button{min-width:105px;border:0;border-radius:12px;background:#1677ff;color:#fff;font-weight:900}
.theft-list{display:grid;gap:10px;margin-top:15px}.theft-item{width:100%;text-align:left;border:1px solid #ff5870;border-radius:17px;background:#121f31;color:#fff;padding:15px}.theft-item strong{display:block;font-size:16px}.theft-item span{display:block;color:#93a4b8;font-size:12px;margin-top:4px}
@media(max-width:380px){.nav .plus{width:74px!important;height:74px!important;min-width:74px!important;max-width:74px!important;flex-basis:74px!important}.nav .plus::before{font-size:38px!important;line-height:68px!important}.action{min-height:92px!important}.quick-action{min-height:92px!important}}
`;
document.head.appendChild(style);
function moveActions(){
 const main=document.querySelector('#main');if(!main)return;
 const status=main.querySelector('.statusbar');if(status)status.remove();
 const art=main.querySelector('.bio-home-bike');if(art)art.remove();
 const firstBike=main.querySelector('.bike');
 const q=main.querySelector('.quick-actions');
 const g=main.querySelector('.grid');
 if(firstBike){if(q&&q.parentNode===main)main.insertBefore(q,firstBike);if(g&&g.parentNode===main)main.insertBefore(g,firstBike)}
}
window.biicodeScanQR=function(){
 let stream=null,raf=null,detector=null;
 const close=()=>{if(raf)cancelAnimationFrame(raf);if(stream)stream.getTracks().forEach(t=>t.stop());if(typeof window.closeModal==='function')window.closeModal()};
 const manual=id=>{id=(id||'').trim();if(!id)return;if(typeof window.detail==='function'){close();window.detail(encodeURIComponent(id))}else alert('Bici non trovata.')};
 if(typeof window.openModal!=='function')return alert('Scanner non disponibile.');
 window.openModal(`<div class="qr-scan-wrap"><button type="button" class="back" onclick="window._biicodeCloseQR&&window._biicodeCloseQR()">‹ Indietro</button><h1>Inquadra il QR</h1><div class="muted">Inquadra il QR sulla bici</div><div class="qr-video-box"><video id="biicodeQrVideo" autoplay playsinline muted></video><div class="qr-frame"></div></div><div id="biicodeQrHint" class="qr-hint">Richiedo accesso alla fotocamera…</div><div class="qr-manual"><input id="biicodeQrManual" placeholder="Oppure inserisci il codice BIICODE"><button type="button" onclick="window._biicodeManualQR&&window._biicodeManualQR()">VERIFICA</button></div></div>`);
 window._biicodeCloseQR=close;window._biicodeManualQR=()=>manual(document.getElementById('biicodeQrManual')?.value);
 const hint=document.getElementById('biicodeQrHint'),video=document.getElementById('biicodeQrVideo');
 (async()=>{
  try{
   if(!navigator.mediaDevices?.getUserMedia)throw new Error('camera');
   stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false});video.srcObject=stream;await video.play();
   if('BarcodeDetector' in window){detector=new BarcodeDetector({formats:['qr_code']});hint.textContent='Inquadra il QR: lo riconosco automaticamente.';const scan=async()=>{try{const codes=await detector.detect(video);if(codes?.length){const raw=String(codes[0].rawValue||'');let id=raw;try{const u=new URL(raw);id=u.searchParams.get('bike')||raw}catch{};manual(id);return}}catch{}raf=requestAnimationFrame(scan)};raf=requestAnimationFrame(scan)}else hint.textContent='Fotocamera attiva. Se il QR non viene riconosciuto, inserisci il codice qui sotto.';
  }catch(e){if(hint)hint.textContent='Fotocamera non disponibile. Puoi inserire manualmente il codice BIICODE qui sotto.';}
 })();
};
window.biicodeReportTheft=function(){
 if(typeof window.openModal!=='function')return alert('Funzione non disponibile.');
 const list=Array.isArray(window.bikes)?window.bikes:[];
 const rows=list.length?list.map(b=>`<button class="theft-item" type="button" onclick="window._biicodeConfirmTheft('${encodeURIComponent(b.biicode_id)}')"><strong>${escSafe(b.brand+' '+b.model)}</strong><span>${escSafe(b.biicode_id)} · ${b.stolen?'GIÀ SEGNALATA COME RUBATA':'Segnala come rubata'}</span></button>`).join(''):'<div class="card"><strong>Nessuna bici disponibile</strong><div class="muted">Registra prima una bici.</div></div>';
 window.openModal(`<button type="button" class="back" onclick="closeModal()">‹ Indietro</button><h1>Segnala furto</h1><div class="muted">Seleziona la bici che vuoi segnalare.</div><div class="theft-list">${rows}</div>`);
 window._biicodeConfirmTheft=async enc=>{const id=decodeURIComponent(enc||'');const b=(Array.isArray(window.bikes)?window.bikes:[]).find(x=>x?.biicode_id===id);if(!b)return alert('Bici non trovata.');if(b.stolen){alert('Questa bici risulta già segnalata come rubata.');return}if(!confirm('Confermi di voler segnalare come RUBATA questa bici?'))return;try{if(typeof window.toggle==='function'){await window.toggle(enc);alert('Furto segnalato. La bici ora risulta RUBATA.');}else throw new Error('toggle');}catch(e){alert('Non è stato possibile registrare la segnalazione. Riprova.')}};
};
function escSafe(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
moveActions();
new MutationObserver(()=>requestAnimationFrame(moveActions)).observe(document.body,{childList:true,subtree:true});
})();