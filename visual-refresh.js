/* BIICODE visual identity v5 */
(function(){
  'use strict';
  const LOGO='assets/biicode-logo.svg';

  function installStyles(){
    if(document.getElementById('biicode-visual-v5'))return;
    const s=document.createElement('style');
    s.id='biicode-visual-v5';
    s.textContent=`
      html,body{background:radial-gradient(circle at 50% -10%,#10284a 0,#0b1320 42%,#070d16 100%)!important}
      main{max-width:540px!important;padding:18px 18px 150px!important}
      .head{display:block!important;margin:0 0 18px!important;padding:0!important}
      .head .bio-logo-img{display:block!important;width:min(390px,100%)!important;height:auto!important;max-height:118px!important;object-fit:contain!important;object-position:left center!important;margin:0 auto 4px 0!important}

      /* Welcome / login: no more vertical centering that pushes the card down on tall iPhones. */
      .login{min-height:100dvh!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;padding:clamp(30px,7vh,82px) 16px 34px!important;overflow-y:auto!important}
      .login .box{width:100%!important;max-width:430px!important;padding:24px 22px 22px!important;background:linear-gradient(155deg,rgba(18,31,49,.98),rgba(10,20,33,.98))!important;border:1px solid #29415f!important;border-radius:26px!important;box-shadow:0 20px 55px rgba(0,0,0,.30),0 0 45px rgba(21,101,255,.06)!important}
      .login .logo{font-size:0!important;line-height:0!important;margin:0 auto 10px!important;height:auto!important;background:none!important}
      .login .logo .bio-logo-img{display:block!important;width:min(285px,86%)!important;max-height:96px!important;object-fit:contain!important;margin:auto!important}
      .login .login-logo{display:block!important;width:min(285px,86%)!important;max-height:96px!important;object-fit:contain!important;margin:0 auto 10px!important}
      .login .tag{display:none!important}
      .login .title{font-size:29px!important;line-height:1.05!important;letter-spacing:-.045em!important;margin:14px 0 7px!important;text-align:left!important}
      .login .muted{font-size:13px!important;line-height:1.45!important;color:#8292a8!important;margin-bottom:3px!important}
      .login label{margin:13px 0 6px!important;font-size:13px!important}
      .login input{min-height:52px!important;height:52px!important;border-radius:14px!important;background:#081320!important}
      .login .btn{min-height:54px!important;height:54px!important;border-radius:15px!important;margin-top:15px!important;box-shadow:0 9px 24px rgba(21,101,255,.22)!important}
      .login .link{margin-top:11px!important;font-size:13px!important;min-height:22px!important}
      .login .msg{margin-bottom:10px!important}

      h1{font-size:28px!important;letter-spacing:-.04em!important;margin:10px 0 14px!important}
      .statusbar{font-size:11px!important;margin:0 0 12px!important;color:#8292a8!important}
      .card{background:linear-gradient(145deg,rgba(18,31,49,.96),rgba(12,23,37,.96))!important;border:1px solid #263c59!important;border-radius:22px!important;padding:18px!important;box-shadow:0 10px 28px rgba(0,0,0,.18)!important;margin-bottom:11px!important}
      .bike{min-height:96px!important}
      .bike strong{font-size:18px!important}
      .bike .id{margin-top:4px!important;font-size:12px!important}
      .pill{padding:6px 9px!important;border-radius:10px!important}
      .grid{gap:11px!important;margin-top:14px!important}
      .action{min-height:112px!important;border-radius:19px!important;background:linear-gradient(145deg,#14253a,#101c2c)!important;border:1px solid #29415f!important;padding:17px!important;box-shadow:0 8px 22px rgba(0,0,0,.15)!important}
      .action strong{font-size:16px!important;margin-bottom:7px!important}
      .quick-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:11px!important;margin-top:11px!important}
      .quick-action{min-height:96px!important;border:1px solid #2b4566!important;border-radius:19px!important;background:linear-gradient(145deg,#101f33,#0d1725)!important;color:#fff!important;text-align:left!important;padding:15px!important;box-shadow:0 8px 22px rgba(0,0,0,.14)!important}
      .quick-action .qa-icon{font-size:27px!important;line-height:30px!important;display:block!important;margin-bottom:7px!important}
      .quick-action strong{display:block!important;font-size:15px!important;letter-spacing:-.01em!important}
      .quick-action span{display:block!important;color:#8292a8!important;font-size:11px!important;margin-top:3px!important}
      .nav{height:108px!important;padding:8px 8px calc(8px + env(safe-area-inset-bottom))!important;gap:4px!important;align-items:center!important;background:rgba(5,10,17,.98)!important;border-top:1px solid #203149!important;backdrop-filter:blur(18px)!important;z-index:10!important}
      .nav button{font-size:0!important;line-height:1!important;max-width:none!important;padding:6px 2px!important;display:flex!important;flex:1 1 0!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:#8190a4!important;border:0!important;background:none!important}
      .nav button .nav-icon{display:block!important;font-size:27px!important;line-height:28px!important;height:29px!important}
      .nav button .nav-label{display:block!important;font-size:13px!important;line-height:16px!important;font-weight:900!important;letter-spacing:-.01em!important}
      .nav .active{color:#fff!important}
      .plus{width:72px!important;height:72px!important;min-width:72px!important;max-width:72px!important;flex:0 0 72px!important;font-size:35px!important;line-height:1!important;margin-top:-27px!important;border:4px solid #070c14!important;box-shadow:0 10px 30px rgba(21,101,255,.48)!important}
      main{padding-bottom:145px!important}
      .modal{background:#07101b!important}
      .modalin{max-width:540px!important}
      .scan-box{position:relative;overflow:hidden;border-radius:24px;background:#050a11;border:1px solid #29415f;min-height:300px;display:grid;place-items:center;margin:15px 0}
      .scan-box video{width:100%;height:320px;object-fit:cover;display:block}
      .scan-frame{position:absolute;width:190px;height:190px;border:3px solid #1670ff;border-radius:24px;box-shadow:0 0 0 999px rgba(0,0,0,.18),0 0 28px rgba(22,112,255,.5);pointer-events:none}
      .scan-status{text-align:center;color:#a9b6c6;font-size:13px;margin:10px 0 14px}
      .scan-manual{margin-top:12px!important}
      @media(max-width:380px){
        main{padding-left:14px!important;padding-right:14px!important}
        .head .bio-logo-img{width:100%!important;max-height:108px!important}
        .login{padding-left:12px!important;padding-right:12px!important;padding-top:24px!important}
        .login .box{padding:21px 18px 20px!important;border-radius:23px!important}
        .login .login-logo,.login .logo .bio-logo-img{width:min(265px,84%)!important;max-height:88px!important}
        .login .title{font-size:27px!important}
        .nav{height:104px!important;padding-left:5px!important;padding-right:5px!important}
        .nav button .nav-icon{font-size:24px!important;line-height:25px!important;height:26px!important}
        .nav button .nav-label{font-size:12px!important;line-height:15px!important}
        .plus{width:66px!important;height:66px!important;min-width:66px!important;max-width:66px!important}
      }
      @media(max-height:720px){.login{padding-top:18px!important}.login .box{padding-top:17px!important;padding-bottom:16px!important}.login .login-logo,.login .logo .bio-logo-img{max-height:72px!important}.login .title{margin-top:8px!important}.login label{margin-top:9px!important}.login .btn{margin-top:10px!important}}
    `;
    document.head.appendChild(s);
  }

  function mountLogos(){
    document.querySelectorAll('.head').forEach(h=>{
      if(h.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');
      img.className='bio-logo-img';
      img.src=LOGO+'?v=5';
      img.alt='BIICODE — La tua bici. Un’identità unica.';
      h.replaceChildren(img);
    });
    document.querySelectorAll('.login .logo').forEach(l=>{
      if(l.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');
      img.className='bio-logo-img';
      img.src=LOGO+'?v=5';
      img.alt='BIICODE';
      l.replaceChildren(img);
    });
  }

  function enhanceLogin(){
    document.querySelectorAll('.login .box').forEach(box=>{
      const title=box.querySelector('.title');
      const muted=box.querySelector('.muted');
      const email=box.querySelector('#email');
      const pass=box.querySelector('#pass');
      if(title && email && pass && title.textContent.trim()==='Accedi'){
        title.textContent='Benvenuto in BIICODE';
        if(muted)muted.textContent='Identifica la tua bici, proteggila e tieni sempre sotto controllo la sua identità.';
      }
    });
  }

  function decorateNav(){
    document.querySelectorAll('.nav button').forEach((b,i)=>{
      if(b.classList.contains('plus')||b.dataset.bioNavV5==='1')return;
      const labels=['Home','Bici','Profilo'];
      const icons=['⌂','🚲','○'];
      const label=labels[i===3?2:i]||'';
      const icon=icons[i===3?2:i]||'';
      b.textContent='';
      const ic=document.createElement('span');ic.className='nav-icon';ic.textContent=icon;
      const lb=document.createElement('span');lb.className='nav-label';lb.textContent=label;
      b.append(ic,lb);
      b.dataset.bioNavV5='1';
    });
  }

  function addQuickActions(){
    if(document.getElementById('biicodeQuickActions'))return;
    const grid=document.querySelector('.grid');
    if(!grid)return;
    const wrap=document.createElement('div');
    wrap.id='biicodeQuickActions';
    wrap.className='quick-actions';
    wrap.innerHTML=`
      <button class="quick-action" type="button" onclick="biicodeScanQR()"><span class="qa-icon">⌾</span><strong>Inquadra QR</strong><span>Verifica una bici</span></button>
      <button class="quick-action" type="button" onclick="biicodeReportTheft()"><span class="qa-icon">🛡️</span><strong>Segnala furto</strong><span>Proteggi la tua bici</span></button>`;
    grid.insertAdjacentElement('afterend',wrap);
  }

  function publicBikeUrl(id){return new URL('verify.html?bike='+encodeURIComponent(id),location.href).href;}

  function closeScanner(){
    const v=document.getElementById('biicodeScanVideo');
    if(v&&v.srcObject){v.srcObject.getTracks().forEach(t=>t.stop());v.srcObject=null;}
  }

  window.biicodeScanQR=async function(){
    if(typeof window.openModal!=='function')return;
    window.openModal(`<button type="button" class="back" onclick="biicodeCloseScan()">‹ Indietro</button><h1>Inquadra il QR</h1><div class="scan-status" id="biicodeScanStatus">Inquadra il QR BIICODE della bicicletta.</div><div class="scan-box"><video id="biicodeScanVideo" playsinline muted autoplay></video><div class="scan-frame"></div></div><div class="small" style="text-align:center">La fotocamera viene usata solo per leggere il codice.</div><label>Oppure inserisci l’ID BIICODE</label><input id="biicodeManualId" placeholder="es. IT-7F82K91X"><button class="btn" type="button" onclick="biicodeOpenManual()">VERIFICA BICI</button>`);
    const status=document.getElementById('biicodeScanStatus');
    try{
      if(!navigator.mediaDevices?.getUserMedia)throw new Error('Fotocamera non disponibile');
      const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
      const video=document.getElementById('biicodeScanVideo');
      if(!video)return;
      video.srcObject=stream;
      await video.play();
      if('BarcodeDetector' in window){
        const detector=new BarcodeDetector({formats:['qr_code']});
        const scan=async()=>{
          if(!document.getElementById('biicodeScanVideo'))return;
          try{
            const codes=await detector.detect(video);
            if(codes&&codes.length){const value=codes[0].rawValue||'';closeScanner();window.biicodeOpenScanned(value);return;}
          }catch(e){}
          requestAnimationFrame(scan);
        };
        requestAnimationFrame(scan);
        if(status)status.textContent='Inquadra il QR dentro il riquadro…';
      }else{
        if(status)status.textContent='Questa versione di Safari non espone la lettura QR automatica. Puoi inserire l’ID qui sotto.';
      }
    }catch(e){
      if(status)status.textContent='Per usare la fotocamera, autorizza l’accesso. Puoi comunque inserire l’ID qui sotto.';
    }
  };

  window.biicodeCloseScan=function(){closeScanner();if(typeof window.closeModal==='function')window.closeModal();};
  window.biicodeOpenManual=function(){const e=document.getElementById('biicodeManualId');if(e)window.biicodeOpenScanned(e.value.trim());};
  window.biicodeOpenScanned=function(value){
    const raw=String(value||'').trim();
    if(!raw)return alert('Inserisci o inquadra un QR BIICODE.');
    try{
      const u=new URL(raw);
      const id=u.searchParams.get('bike');
      if(id){window.biicodeCloseScan();if(typeof window.detail==='function')window.detail(encodeURIComponent(id));return;}
    }catch(e){}
    const id=raw.replace(/^BIICODE[:\-\s]*/i,'').trim();
    window.biicodeCloseScan();
    if(typeof window.detail==='function')window.detail(encodeURIComponent(id));
    else window.location.href=publicBikeUrl(id);
  };

  function appBikes(){try{return typeof bikes!=='undefined'&&Array.isArray(bikes)?bikes:[];}catch(e){return [];}}

  window.biicodeReportTheft=function(){
    if(typeof window.openModal!=='function')return;
    const list=appBikes();
    if(!list.length){window.openModal(`<button type="button" class="back" onclick="closeModal()">‹ Indietro</button><h1>Segnala furto</h1><div class="card"><strong>Nessuna bici registrata</strong><div class="muted">Registra prima una bici per poterla segnalare.</div></div>`);return;}
    const rows=list.map(b=>`<button class="action" style="width:100%;margin-top:10px;text-align:left" type="button" onclick="biicodeChooseTheft('${encodeURIComponent(b.biicode_id)}')"><strong>${String(b.brand||'')} ${String(b.model||'')}</strong><span class="muted">${String(b.biicode_id||'')}</span></button>`).join('');
    window.openModal(`<button type="button" class="back" onclick="closeModal()">‹ Indietro</button><h1>Segnala furto</h1><div class="muted">Seleziona la bici che vuoi segnalare come rubata.</div>${rows}`);
  };

  window.biicodeChooseTheft=function(enc){
    const id=decodeURIComponent(enc||'');
    const list=appBikes();
    const b=list.find(x=>x&&x.biicode_id===id);
    if(!b)return alert('Bici non trovata.');
    if(b.stolen){alert('Questa bici risulta già segnalata come rubata.');return;}
    if(!confirm('Vuoi segnalare '+(b.brand||'')+' '+(b.model||'')+' come rubata?'))return;
    if(typeof window.toggle==='function'){
      window.closeModal();
      window.toggle(encodeURIComponent(id));
    }else if(typeof window.detail==='function'){
      window.closeModal();window.detail(encodeURIComponent(id));
    }
  };

  function apply(){installStyles();mountLogos();enhanceLogin();decorateNav();addQuickActions();}
  apply();
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.body,{childList:true,subtree:true});
})();