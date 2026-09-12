/* BIICODE QR extension: loaded after the main app. */
(function(){
  'use strict';
  const css = document.createElement('style');
  css.textContent = `
    .biicode-qr{width:max-content;margin:18px auto 12px;padding:12px;background:#fff;border-radius:14px;min-width:214px;min-height:214px;display:grid;place-items:center}
    .biicode-qr img,.biicode-qr canvas{display:block;max-width:190px}
    .biicode-qr-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
    .biicode-qr-actions button{min-height:48px;background:#111d2d;border:1px solid #2a3b52;color:#fff;border-radius:12px;font-weight:800}
    .biicode-public{max-width:520px;margin:0 auto;padding:28px 20px 50px}
    .biicode-public .logo{width:58px;height:58px;margin:0 auto 14px;border-radius:16px;background:#07101d;display:grid;place-items:center;font-size:28px;font-weight:950;color:#fff}
    .biicode-public .logo b{color:#1565ff}
    .biicode-public h1{margin:8px 0 18px}
  `;
  document.head.appendChild(css);

  function publicUrl(id){
    return new URL('verify.html?bike='+encodeURIComponent(id), location.href).href;
  }
  window.biicodePublicUrl = publicUrl;

  window.biicodeShare = async function(encoded){
    const id = decodeURIComponent(encoded || '');
    const url = publicUrl(id);
    if(navigator.share){
      try{ await navigator.share({title:'BIICODE',text:'Verifica questa bicicletta su BIICODE',url}); return; }catch(e){}
    }
    try{ await navigator.clipboard.writeText(url); alert('Link di verifica copiato.'); }
    catch(e){ alert(url); }
  };

  window.biicodeSaveQr = function(){
    const box=document.getElementById('biicodeQr');
    if(!box)return;
    const canvas=box.querySelector('canvas');
    const img=box.querySelector('img');
    const data=canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
    if(!data)return alert('QR non disponibile.');
    const w=window.open(data,'_blank');
    if(!w)alert('Apri il QR e salvalo nelle foto per stamparlo.');
  };

  const originalDetail = window.detail;
  window.detail = function(enc){
    const id=decodeURIComponent(enc || '');
    const list=window.bikes || [];
    const b=list.find(x=>x.biicode_id===id);
    if(!b){
      if(typeof originalDetail==='function')return originalDetail(enc);
      return;
    }
    if(typeof window.openModal!=='function')return;
    const stolen=b.stolen===true;
    window.openModal(`
      <button type="button" class="back" onclick="closeModal()">‹ Indietro</button>
      <h1>${window.esc(b.brand)} ${window.esc(b.model)}</h1>
      <div class="card">
        <div class="muted">BIICODE</div>
        <div style="font-size:24px;font-weight:900;margin-top:5px">${window.esc(b.biicode_id)}</div>
        <div id="biicodeQr" class="biicode-qr"></div>
        <div class="biicode-qr-actions">
          <button type="button" onclick="biicodeSaveQr()">SALVA QR</button>
          <button type="button" onclick="biicodeShare('${encodeURIComponent(b.biicode_id)}')">CONDIVIDI</button>
        </div>
        <div class="muted" style="margin-top:18px">TELAIO</div>
        <div style="font-size:20px;font-weight:800">${window.esc(b.frame_number||'-')}</div>
        <br>
        <div class="muted">ANNO · COLORE</div>
        <div style="font-size:18px;font-weight:800">${window.esc(b.year||'-')} · ${window.esc(b.color||'-')}</div>
        <div class="msg ${stolen?'error':'ok'}" style="margin-top:18px">${stolen?'🔴 QUESTA BICI RISULTA RUBATA':'🟢 QUESTA BICI RISULTA ATTIVA'}</div>
        <button class="btn ${stolen?'':'danger'}" onclick="toggle('${encodeURIComponent(b.biicode_id)}')">${stolen?'SEGNALA RECUPERO':'SEGNALA FURTO'}</button>
        <button class="btn secondary" onclick="deleteBike('${encodeURIComponent(b.biicode_id)}')">ELIMINA BICI</button>
      </div>`);
    const q=document.getElementById('biicodeQr');
    if(q && window.QRCode){
      new QRCode(q,{text:publicUrl(b.biicode_id),width:190,height:190});
    }else if(q){
      q.innerHTML='<div style="color:#111;font-weight:800;text-align:center;padding:20px">QR in caricamento…</div>';
      setTimeout(function(){
        if(document.getElementById('biicodeQr') && window.QRCode){
          new QRCode(document.getElementById('biicodeQr'),{text:publicUrl(b.biicode_id),width:190,height:190});
        }
      },500);
    }
  };

  async function loadPublicBike(id){
    try{
      const r=await fetch(SUPABASE_URL+'/rest/v1/bikes?select=biicode_id,brand,model,year,color,stolen,status&biicode_id=eq.'+encodeURIComponent(id)+'&limit=1',{
        headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}
      });
      if(!r.ok)return null;
      const rows=await r.json();
      return rows && rows[0] ? rows[0] : null;
    }catch(e){return null;}
  }

  async function showPublic(){
    const p=new URLSearchParams(location.search);
    const id=p.get('bike');
    if(!id)return;
    if(window.nav)window.nav.classList.add('hidden');
    const root=document.getElementById('main');
    if(!root)return;
    root.innerHTML='<div class="biicode-public"><div class="logo">b<b>◯</b></div><div class="tag">BIICODE · VERIFICA BICICLETTA</div><div id="publicCard" class="card"><div class="muted">VERIFICA IN CORSO…</div></div></div>';
    const b=await loadPublicBike(id);
    const box=document.getElementById('publicCard');
    if(!box)return;
    if(!b){
      box.innerHTML='<div style="font-size:22px;font-weight:900">Bici non trovata</div><div class="muted" style="margin-top:8px">Questo BIICODE non è associato a una bicicletta registrata.</div>';
      return;
    }
    const stolen=b.stolen===true;
    box.innerHTML=`<div class="muted">BIICODE</div><div style="font-size:24px;font-weight:900;margin-top:5px">${window.esc(b.biicode_id)}</div><h1>${window.esc(b.brand)} ${window.esc(b.model)}</h1><div class="muted">ANNO</div><div style="font-size:19px;font-weight:800;margin:5px 0 16px">${window.esc(b.year||'-')}</div><div class="muted">COLORE</div><div style="font-size:19px;font-weight:800;margin:5px 0 18px">${window.esc(b.color||'-')}</div><div class="msg ${stolen?'error':'ok'}">${stolen?'🔴 ATTENZIONE: QUESTA BICI RISULTA RUBATA':'🟢 QUESTA BICI RISULTA ATTIVA'}</div><div class="small" style="text-align:center;margin-top:14px">Il numero di telaio e i dati personali del proprietario non vengono mostrati.</div>`;
  }

  const publicId=new URLSearchParams(location.search).get('bike');
  if(publicId){
    const originalRenderHome=window.renderHome;
    window.renderHome=function(){showPublic();};
    window.login=function(){showPublic();};
    window.renderBikes=function(){showPublic();};
    window.profile=function(){showPublic();};
    setTimeout(showPublic,0);
    setTimeout(showPublic,300);
    void originalRenderHome;
  }
})();
