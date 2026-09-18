/* BIICODE HOME V19 — approved final composition. */
(function(){
'use strict';
/* On iPhone/PWA keep the BIICODE background continuous through the safe area. */
function meta(name,content){let m=document.querySelector('meta[name="'+name+'"]');if(!m){m=document.createElement('meta');m.name=name;document.head.appendChild(m)}m.content=content}
meta('theme-color','#07101b');
meta('apple-mobile-web-app-capable','yes');
meta('apple-mobile-web-app-status-bar-style','black-translucent');
const style=document.createElement('style');
style.textContent=`
html,body{margin:0!important;min-height:100%!important;background:#07101b!important;background-color:#07101b!important}
body{padding-top:env(safe-area-inset-top)!important;padding-bottom:env(safe-area-inset-bottom)!important}
.statusbar{display:none!important}.bio-home-bike{display:none!important}.bio-home-title{margin-top:18px!important;margin-bottom:14px!important}
.quick-actions,.grid{position:relative!important;z-index:5!important}.quick-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 11px!important}
.quick-action,.action{border:1.5px solid #1677ff!important;background:linear-gradient(145deg,#112b48,#0b1b2e)!important;box-shadow:0 0 16px rgba(21,101,255,.12),0 8px 24px rgba(0,0,0,.18)!important}.quick-action:nth-child(2){border-color:#ff5870!important;box-shadow:0 0 16px rgba(255,88,112,.12),0 8px 24px rgba(0,0,0,.18)!important}
.quick-action .qa-icon{font-size:30px!important;line-height:31px!important;color:#28a1ff!important}.quick-action:nth-child(2) .qa-icon{color:#ff5870!important}.action{min-height:96px!important;padding:15px!important}.action strong{font-size:16px!important}.action .muted{font-size:12px!important}.grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin:0 0 18px!important}
.nav .plus{width:82px!important;height:82px!important;min-width:82px!important;max-width:82px!important;flex:0 0 82px!important;margin-top:-24px!important;border-radius:50%!important;background:linear-gradient(145deg,#1680ff,#0758e8)!important;border:3px solid #07101b!important;box-shadow:0 0 0 2px #1677ff,0 8px 34px rgba(21,101,255,.62)!important;font-size:0!important;color:transparent!important}.nav .plus::before{content:'+';display:block!important;color:#fff!important;font-size:42px!important;font-weight:400!important;line-height:76px!important;text-align:center!important}
.qr-scan-wrap{padding-top:2px}.qr-video-box{position:relative;overflow:hidden;border-radius:24px;background:#050a11;border:1px solid #1677ff;min-height:330px;margin:14px 0;display:grid;place-items:center;box-shadow:0 0 25px rgba(21,101,255,.15)}.qr-video-box video{width:100%;height:330px;object-fit:cover;display:block}.qr-frame{position:absolute;width:210px;height:210px;border:3px solid #1680ff;border-radius:24px;box-shadow:0 0 0 999px rgba(0,0,0,.2),0 0 30px rgba(21,101,255,.55);pointer-events:none}.qr-hint{color:#a8b7ca;text-align:center;font-size:13px;margin:8px 0 14px}.qr-manual{display:grid;grid-template-columns:1fr auto;gap:8px}.qr-manual input{min-height:50px}.qr-manual button{min-width:105px;border:0;border-radius:12px;background:#1677ff;color:#fff;font-weight:900}.theft-list{display:grid;gap:10px;margin-top:15px}.theft-item{width:100%;text-align:left;border:1px solid #ff5870;border-radius:17px;background:#121f31;color:#fff;padding:15px}.theft-item strong{display:block;font-size:16px}.theft-item span{display:block;color:#93a4b8;font-size:12px;margin-top:4px}
/* Public landing page: explain the product before asking for credentials. */
.biicode-welcome{min-height:100dvh!important;padding:calc(18px + env(safe-area-inset-top)) 16px calc(28px + env(safe-area-inset-bottom))!important;display:flex!important;justify-content:center!important;overflow:auto!important}
.biicode-welcome-inner{width:100%;max-width:520px;margin:0 auto!important}
.biicode-welcome-logo{display:block;width:min(300px,82%);height:auto;max-height:92px;object-fit:contain;margin:4px auto 8px}
.biicode-welcome-kicker{text-align:center;color:#5fa3ff;font-size:11px;font-weight:900;letter-spacing:1.8px;text-transform:uppercase;margin-top:8px}
.biicode-welcome-hero{text-align:center;padding:8px 8px 0}
.biicode-welcome h1{font-size:34px!important;line-height:1.02!important;letter-spacing:-.055em!important;margin:10px 0 10px!important}
.biicode-welcome-hero p{color:#a4b2c3;font-size:15px;line-height:1.48;margin:0 auto;max-width:430px}
.biicode-welcome-hero strong{color:#fff}
.biicode-welcome-cta{display:grid;gap:9px;margin:20px 0 18px}
.biicode-welcome-cta .btn{min-height:56px;border-radius:16px;font-size:15px;box-shadow:0 10px 28px rgba(21,101,255,.24);margin-top:0}
.biicode-welcome-secondary{width:100%;min-height:48px;border:1px solid #2a4566;border-radius:14px;background:#0d1928;color:#fff;font-weight:900;font-size:14px}
.biicode-welcome-benefits{display:grid;grid-template-columns:1fr;gap:9px;margin-top:10px}
.biicode-benefit{display:flex;gap:13px;align-items:flex-start;padding:15px;border:1px solid #223a58;border-radius:18px;background:linear-gradient(145deg,#101f33,#0b1726);box-shadow:0 7px 20px rgba(0,0,0,.12)}
.biicode-benefit-icon{flex:0 0 42px;width:42px;height:42px;border-radius:13px;background:#102c4b;border:1px solid #1d6fe4;display:grid;place-items:center;font-size:22px}
.biicode-benefit h2{font-size:15px;margin:1px 0 4px;letter-spacing:-.01em}
.biicode-benefit p{color:#8798ac;font-size:12px;line-height:1.42;margin:0}
.biicode-section-title{text-align:center;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:#70849c;font-weight:900;margin:24px 0 10px}
.biicode-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.biicode-step{padding:13px 10px;text-align:center;border:1px solid #203650;border-radius:16px;background:#0d1928}
.biicode-step-num{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;margin:0 auto 8px;background:#1565ff;font-size:13px;font-weight:950}
.biicode-step strong{display:block;font-size:12px;line-height:1.2}.biicode-step span{display:block;color:#7f91a7;font-size:10px;line-height:1.35;margin-top:4px}
.biicode-trust{text-align:center;color:#71839a;font-size:10px;line-height:1.45;margin:17px 10px 0}
.biicode-trust b{color:#a4b2c3}
.biicode-login-link{display:block;width:100%;border:0;background:none;color:#5790ff;font-size:13px;font-weight:900;margin:13px 0 0;padding:8px}
.biicode-welcome .footer-note{text-align:center;color:#52657b;font-size:10px;margin-top:12px}
@media(min-width:480px){.biicode-welcome{padding-left:22px;padding-right:22px}.biicode-welcome-benefits{grid-template-columns:repeat(3,1fr)}.biicode-benefit{display:block;text-align:center}.biicode-benefit-icon{margin:0 auto 10px}.biicode-benefit h2{margin-top:0}.biicode-welcome h1{font-size:40px!important}}
@media(max-width:380px){
 .nav .plus{width:74px!important;height:74px!important;min-width:74px!important;max-width:74px!important;flex-basis:74px!important}.nav .plus::before{font-size:38px!important;line-height:68px!important}.action,.quick-action{min-height:92px!important}
 .biicode-welcome{padding-left:13px!important;padding-right:13px!important;padding-top:calc(12px + env(safe-area-inset-top))!important}
 .biicode-welcome-logo{width:min(270px,84%);max-height:82px;margin-bottom:4px}
 .biicode-welcome h1{font-size:31px!important}.biicode-welcome-hero p{font-size:14px}.biicode-welcome-cta{margin-top:17px}.biicode-benefit{padding:13px}.biicode-section-title{margin-top:20px}
}
`;
document.head.appendChild(style);

let qrStream=null,qrTimer=null,qrActive=false;
function qrIdFromValue(value){
 try{const u=new URL(String(value).trim(),location.href);const id=u.searchParams.get('bike');if(id)return decodeURIComponent(id)}catch(e){}
 const m=String(value||'').trim().match(/\bIT-[A-Z0-9]{8}\b/i);return m?m[0].toUpperCase():null;
}
function stopQrScanner(){
 qrActive=false;if(qrTimer){cancelAnimationFrame(qrTimer);qrTimer=null}
 if(qrStream){qrStream.getTracks().forEach(t=>t.stop());qrStream=null}
}
function loadJsQR(){
 if(window.jsQR)return Promise.resolve(true);
 return new Promise(resolve=>{
  const urls=['https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js','https://unpkg.com/jsqr@1.4.0/dist/jsQR.js'];let i=0;
  const next=()=>{if(window.jsQR)return resolve(true);if(i>=urls.length)return resolve(false);const s=document.createElement('script');s.src=urls[i++];s.async=true;s.onload=()=>resolve(!!window.jsQR);s.onerror=next;document.head.appendChild(s)};next();
 });
}
function handleQrValue(value){
 const id=qrIdFromValue(value);if(!id)return false;
 stopQrScanner();
 const url=new URL('verify.html?bike='+encodeURIComponent(id),location.href).href;
 location.href=url;return true;
}
async function scanImageFile(file){
 const ok=await loadJsQR();if(!ok)return alert('Lettore QR non disponibile. Controlla la connessione e riprova.');
 const img=await new Promise((resolve,reject)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);resolve(im)};im.onerror=()=>{URL.revokeObjectURL(u);reject(new Error('Immagine non leggibile.'))};im.src=u});
 const max=1400,s=Math.min(1,max/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height));const w=Math.max(1,Math.round((img.naturalWidth||img.width)*s)),h=Math.max(1,Math.round((img.naturalHeight||img.height)*s));
 const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);const d=ctx.getImageData(0,0,w,h);const r=window.jsQR(d.data,w,h,{inversionAttempts:'attemptBoth'});
 if(r&&handleQrValue(r.data))return;alert('Non ho trovato un QR BIICODE nell’immagine.');
}
window.biicodeScanQR=async function(){
 openModal(`<button type="button" class="back" onclick="closeModal()">‹ Annulla</button><h1>Inquadra QR</h1><div class="qr-scan-wrap"><div class="qr-video-box"><video id="qrVideo" playsinline autoplay muted></video><div class="qr-frame"></div></div><div id="qrStatus" class="qr-hint">Avvio fotocamera…</div><div class="qr-manual"><input id="qrManual" placeholder="Oppure inserisci BIICODE (IT-…)" autocapitalize="characters" autocomplete="off"><button type="button" onclick="biicodeManualQR()">VERIFICA</button></div><input id="qrFile" type="file" accept="image/*" capture="environment" style="display:none" onchange="biicodeScanQRFile(this.files[0])"><button type="button" class="btn secondary" style="margin-top:10px" onclick="document.getElementById('qrFile').click()">📷 SCANSIONA UNA FOTO</button></div>`);
 qrActive=true;const status=document.getElementById('qrStatus'),video=document.getElementById('qrVideo');
 const ok=await loadJsQR();
 if(!qrActive)return;
 if(!ok){if(status)status.textContent='Lettore QR non disponibile. Puoi usare una foto o inserire il codice.';return}
 if(!navigator.mediaDevices?.getUserMedia){if(status)status.textContent='Fotocamera non disponibile. Usa una foto oppure inserisci il codice.';return}
 try{qrStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});video.srcObject=qrStream;await video.play();if(status)status.textContent='Inquadra il QR della bicicletta';
  const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
  const loop=()=>{if(!qrActive)return;if(video.readyState>=2&&video.videoWidth){canvas.width=video.videoWidth;canvas.height=video.videoHeight;ctx.drawImage(video,0,0,canvas.width,canvas.height);const d=ctx.getImageData(0,0,canvas.width,canvas.height),r=window.jsQR(d.data,d.width,d.height,{inversionAttempts:'dontInvert'});if(r&&handleQrValue(r.data))return}qrTimer=requestAnimationFrame(loop)};qrTimer=requestAnimationFrame(loop);
 }catch(e){if(status)status.textContent='Fotocamera non disponibile o permesso negato. Usa una foto oppure inserisci il codice.';}
};
window.biicodeManualQR=function(){const v=document.getElementById('qrManual')?.value?.trim();if(!v)return alert('Inserisci un BIICODE.');if(!handleQrValue(v))alert('Codice BIICODE non valido. Usa un codice come IT-XXXXXXXX.');};
window.biicodeScanQRFile=async function(file){if(!file)return;try{await scanImageFile(file)}catch(e){console.error(e);alert('Non sono riuscito a leggere l’immagine.')}};

window.biicodeReportTheft=function(){
 const rows=Array.isArray(window.bikes)?window.bikes:(typeof bikes!=='undefined'?bikes:[]);
 if(!rows.length)return alert('Non hai ancora bici registrate.');
 openModal(`<button type="button" class="back" onclick="closeModal()">‹ Annulla</button><h1>Segnala furto</h1><div class="muted">Seleziona la bici da segnalare come rubata.</div><div class="theft-list">${rows.map(b=>`<button class="theft-item" type="button" onclick="biicodeConfirmTheft('${encodeURIComponent(b.biicode_id)}')"><strong>${esc(b.brand)} ${esc(b.model)}</strong><span>${esc(b.biicode_id)} · ${b.stolen?'GIÀ SEGNALATA':'ATTIVA'}</span></button>`).join('')}</div>`);
};
window.biicodeConfirmTheft=function(enc){const id=decodeURIComponent(enc||'');const b=(typeof bikes!=='undefined'?bikes:[]).find(x=>x.biicode_id===id);if(!b)return;if(b.stolen)return alert('Questa bici risulta già segnalata come rubata.');if(!confirm('Confermi di voler segnalare come rubata questa bici?'))return;closeModal();toggle(enc)};
const originalCloseModal=window.closeModal;
window.closeModal=function(){stopQrScanner();if(typeof originalCloseModal==='function')originalCloseModal();};

/* Welcome/auth ownership moved to auth-fix.js. Keep this file focused on authenticated UI. */
function moveHome(){
 const main=document.querySelector('#main');if(!main)return;
 const status=main.querySelector('.statusbar');if(status)status.remove();
 const art=main.querySelector('.bio-home-bike');if(art)art.remove();
 const head=main.querySelector('.head'), title=main.querySelector('h1'), q=main.querySelector('.quick-actions'), g=main.querySelector('.grid');
 if(!head||!title||!q||!g)return;
 title.classList.add('bio-home-title');
 /* Final order: logo → actions → Le mie bici → bike cards. */
 head.insertAdjacentElement('afterend',q);q.insertAdjacentElement('afterend',g);g.insertAdjacentElement('afterend',title);
}
moveHome();
new MutationObserver(()=>requestAnimationFrame(moveHome)).observe(document.body,{childList:true,subtree:true});

/* The main script calls login() before this enhancement file is loaded. If there is no session,
   replace that initial technical login with the public landing page. */

})();