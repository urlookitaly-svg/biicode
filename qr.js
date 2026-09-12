/* BIICODE QR + bike photos extension: loaded after the main app. */
(function(){
  'use strict';
  const SUPABASE_URL='https://swzkrwdqfgetwcmaiqty.supabase.co';
  const SUPABASE_KEY='sb_publishable_inpwNp-Uqe-X4BeTl54ui_1ARA1HNb';
  const PHOTO_BUCKET='bike-photos';
  const MAX_PHOTOS=5;
  const esc=x=>String(x??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
  const css=document.createElement('style');
  css.textContent=`
    .biicode-qr{width:max-content;margin:18px auto 12px;padding:12px;background:#fff;border-radius:14px;min-width:214px;min-height:214px;display:grid;place-items:center}
    .biicode-qr img,.biicode-qr canvas{display:block;max-width:190px}
    .biicode-qr-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}
    .biicode-qr-actions button{min-height:48px;background:#111d2d;border:1px solid #2a3b52;color:#fff;border-radius:12px;font-weight:800}
    .biicode-public{max-width:520px;margin:0 auto;padding:28px 20px 50px}
    .biicode-public .logo{width:58px;height:58px;margin:0 auto 14px;border-radius:16px;background:#07101d;display:grid;place-items:center;font-size:28px;font-weight:950;color:#fff}
    .biicode-public .logo b{color:#1565ff}
    .biicode-public h1{margin:8px 0 18px}
    .biicode-photos{margin-top:20px}
    .biicode-photos-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
    .biicode-photos-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .biicode-photo{position:relative;aspect-ratio:1/1;border-radius:14px;overflow:hidden;background:#0b1625;border:1px solid #203149}
    .biicode-photo img{width:100%;height:100%;object-fit:cover;display:block}
    .biicode-photo button{position:absolute;right:7px;top:7px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-weight:900}
    .biicode-add-photo{width:100%;min-height:48px;border-radius:12px;border:1px dashed #46617f;background:#111d2d;color:#fff;font-weight:800}
    .biicode-photo-note{font-size:11px;color:#7f8b9a;margin-top:8px}
  `;
  document.head.appendChild(css);
  function publicUrl(id){return new URL('verify.html?bike='+encodeURIComponent(id),location.href).href;}
  window.biicodePublicUrl=publicUrl;
  function loadQRCode(){
    if(window.QRCode)return Promise.resolve(true);
    return new Promise(resolve=>{
      const urls=['https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js','https://unpkg.com/qrcodejs@1.0.0/qrcode.min.js','https://raw.githubusercontent.com/davidshimjs/qrcodejs/master/qrcode.min.js'];
      let i=0;
      const next=()=>{if(window.QRCode)return resolve(true);if(i>=urls.length)return resolve(false);const s=document.createElement('script');s.src=urls[i++];s.async=true;s.onload=()=>resolve(!!window.QRCode);s.onerror=next;document.head.appendChild(s);};
      next();
    });
  }
  function fallbackQr(box,id){if(!box)return;const u='https://api.qrserver.com/v1/create-qr-code/?size=190x190&margin=8&data='+encodeURIComponent(publicUrl(id));box.innerHTML='<img src="'+u+'" width="190" height="190" alt="QR BIICODE">';}
  function localBike(id){try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(!k.startsWith('biicode_v3_'))continue;const rows=JSON.parse(localStorage.getItem(k)||'[]');if(Array.isArray(rows)){const b=rows.find(x=>x&&x.biicode_id===id);if(b)return b;}}}catch(e){}return null;}
  async function getRemoteBike(id){try{const r=await fetch(SUPABASE_URL+'/rest/v1/bikes?select=*&biicode_id=eq.'+encodeURIComponent(id)+'&limit=1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});if(!r.ok)return null;const rows=await r.json();return rows&&rows[0]?rows[0]:null;}catch(e){return null;}}
  async function ensureRemoteBike(b){const remote=await getRemoteBike(b.biicode_id);if(remote)return remote;if(!b.user_id)return b;try{const payload={biicode_id:b.biicode_id,user_id:b.user_id,brand:b.brand||'',model:b.model||'',year:b.year?Number(b.year):null,color:b.color||'',frame_number:b.frame_number||'',stolen:b.stolen===true,status:b.status||'active',photos:Array.isArray(b.photos)?b.photos:[]};const r=await fetch(SUPABASE_URL+'/rest/v1/bikes',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(payload)});if(!r.ok)return b;const rows=await r.json();return rows&&rows[0]?rows[0]:b;}catch(e){return b;}}
  async function getBike(id){const local=localBike(id);if(local)return local;return getRemoteBike(id);}
  window.biicodeShare=async function(encoded){const id=decodeURIComponent(encoded||'');const url=publicUrl(id);if(navigator.share){try{await navigator.share({title:'BIICODE',text:'Verifica questa bicicletta su BIICODE',url});return;}catch(e){}}try{await navigator.clipboard.writeText(url);alert('Link di verifica copiato.');}catch(e){alert(url);}};
  window.biicodeSaveQr=function(){const box=document.getElementById('biicodeQr');if(!box)return;const canvas=box.querySelector('canvas'),img=box.querySelector('img');const data=canvas?canvas.toDataURL('image/png'):(img?img.src:'');if(!data)return alert('QR non disponibile.');const w=window.open(data,'_blank');if(!w)alert('Apri il QR e salvalo nelle foto per stamparlo.');};

  function photoUrl(path){return SUPABASE_URL+'/storage/v1/object/public/'+PHOTO_BUCKET+'/'+path;}
  function photoPathFromUrl(url){const marker='/storage/v1/object/public/'+PHOTO_BUCKET+'/';const i=String(url||'').indexOf(marker);return i>=0?String(url).slice(i+marker.length):null;}
  function authHeaders(token,contentType){const h={apikey:SUPABASE_KEY,Authorization:'Bearer '+(token||SUPABASE_KEY)};if(contentType)h['Content-Type']=contentType;return h;}
  function updateLocalBike(id,photos){try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i)||'';if(!k.startsWith('biicode_v3_'))continue;const rows=JSON.parse(localStorage.getItem(k)||'[]');if(!Array.isArray(rows))continue;let changed=false;for(const row of rows){if(row&&row.biicode_id===id){row.photos=photos;changed=true;}}if(changed)localStorage.setItem(k,JSON.stringify(rows));}}catch(e){}}
  async function updateBikePhotos(id,photos){
    const r=await fetch(SUPABASE_URL+'/rest/v1/bikes?biicode_id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{...authHeaders(window.session?.access_token||null),'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({photos})});
    if(!r.ok){const t=await r.text().catch(()=>r.statusText);throw new Error(t||('HTTP '+r.status));}
    updateLocalBike(id,photos);
  }
  async function compressPhoto(file){
    if(!file||!file.type.startsWith('image/'))throw new Error('Seleziona solo immagini.');
    const img=await new Promise((resolve,reject)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);resolve(im)};im.onerror=()=>{URL.revokeObjectURL(u);reject(new Error('Immagine non leggibile.'))};im.src=u;});
    const max=1600,scale=Math.min(1,max/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height));
    const w=Math.max(1,Math.round((img.naturalWidth||img.width)*scale)),h=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));
    const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');ctx.drawImage(img,0,0,w,h);
    return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('Compressione foto non riuscita.')),'image/jpeg',.82));
  }
  async function uploadPhoto(id,file,index){
    const blob=await compressPhoto(file);
    const safe=Date.now()+'-'+Math.random().toString(36).slice(2,9)+'-'+index+'.jpg';
    const path=(window.user?.id||'user')+'/'+id+'/'+safe;
    const r=await fetch(SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+path,{method:'POST',headers:{...authHeaders(window.session?.access_token||null,'image/jpeg'),'x-upsert':'false'},body:blob});
    if(!r.ok){const t=await r.text().catch(()=>r.statusText);throw new Error(t||('Upload foto fallito: HTTP '+r.status));}
    return photoUrl(path);
  }
  function renderPhotos(b){
    const photos=Array.isArray(b.photos)?b.photos.filter(Boolean).slice(0,MAX_PHOTOS):[];
    const left=MAX_PHOTOS-photos.length;
    return `<div class="biicode-photos"><div class="biicode-photos-head"><strong>FOTO DELLA BICI</strong><span class="small">${photos.length}/${MAX_PHOTOS}</span></div><div class="biicode-photos-grid">${photos.map((p,i)=>`<div class="biicode-photo"><img src="${esc(p)}" alt="Foto ${i+1}" loading="lazy"><button type="button" aria-label="Elimina foto" onclick="biicodeDeletePhoto('${encodeURIComponent(b.biicode_id)}',${i})">×</button></div>`).join('')}</div>${left>0?`<button class="biicode-add-photo" type="button" style="margin-top:10px" onclick="document.getElementById('biicodePhotoInput').click()">＋ AGGIUNGI FOTO (${left} disponibili)</button>`:'<div class="biicode-photo-note">Hai raggiunto il limite di 5 foto.</div>'}<input id="biicodePhotoInput" type="file" accept="image/*" multiple style="display:none" onchange="biicodeUploadPhotos('${encodeURIComponent(b.biicode_id)}',this.files)"><div class="biicode-photo-note">Puoi caricare fino a 5 foto. Le immagini vengono ridimensionate automaticamente per occupare meno spazio.</div></div>`;
  }
  window.biicodeUploadPhotos=async function(encoded,files){
    const id=decodeURIComponent(encoded||'');
    const b=await getRemoteBike(id)||localBike(id);
    if(!b)return alert('Bici non trovata.');
    const current=Array.isArray(b.photos)?b.photos.filter(Boolean).slice(0,MAX_PHOTOS):[];
    const selected=Array.from(files||[]).slice(0,MAX_PHOTOS-current.length);
    if(!selected.length)return alert('Puoi caricare fino a 5 foto per bici.');
    const bad=Array.from(files||[]).length>selected.length;
    const btn=document.querySelector('.biicode-add-photo');if(btn){btn.disabled=true;btn.textContent='CARICAMENTO FOTO…';}
    try{
      const added=[];
      for(let i=0;i<selected.length;i++)added.push(await uploadPhoto(id,selected[i],i));
      const photos=current.concat(added).slice(0,MAX_PHOTOS);
      await updateBikePhotos(id,photos);
      alert(bad?'Ho caricato le foto disponibili fino al limite di 5.':'Foto caricate correttamente.');
      window.detail(encodeURIComponent(id));
    }catch(e){console.error(e);alert('Non sono riuscito a caricare le foto. Riprova.');}
  };
  window.biicodeDeletePhoto=async function(encoded,index){
    const id=decodeURIComponent(encoded||'');
    const b=await getRemoteBike(id)||localBike(id);if(!b)return;
    const photos=Array.isArray(b.photos)?b.photos.filter(Boolean):[];if(index<0||index>=photos.length)return;
    if(!confirm('Eliminare questa foto?'))return;
    const removed=photos[index];
    try{
      const path=photoPathFromUrl(removed);
      if(path){const r=await fetch(SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+path,{method:'DELETE',headers:authHeaders(window.session?.access_token||null)});if(!r.ok)console.warn('Eliminazione file foto non riuscita',await r.text().catch(()=>''));}
      photos.splice(index,1);await updateBikePhotos(id,photos);window.detail(encodeURIComponent(id));
    }catch(e){console.error(e);alert('Non sono riuscito a eliminare la foto.');}
  };

  const originalDetail=window.detail;
  window.detail=async function(enc){
    const id=decodeURIComponent(enc||''),b=await getBike(id);
    if(!b){if(typeof originalDetail==='function')return originalDetail(enc);return alert('Bici non trovata.');}
    if(typeof window.openModal!=='function')return;
    const stolen=b.stolen===true;
    window.openModal(`<button type="button" class="back" onclick="closeModal()">‹ Indietro</button><h1>${esc(b.brand)} ${esc(b.model)}</h1><div class="card"><div class="muted">BIICODE</div><div style="font-size:24px;font-weight:900;margin-top:5px">${esc(b.biicode_id)}</div><div id="biicodeQr" class="biicode-qr"><span style="color:#111;font-weight:800">GENERAZIONE QR…</span></div><div class="biicode-qr-actions"><button type="button" onclick="biicodeSaveQr()">SALVA QR</button><button type="button" onclick="biicodeShare('${encodeURIComponent(b.biicode_id)}')">CONDIVIDI</button></div>${renderPhotos(b)}<div class="muted" style="margin-top:18px">TELAIO</div><div style="font-size:20px;font-weight:800">${esc(b.frame_number||'-')}</div><br><div class="muted">ANNO · COLORE</div><div style="font-size:18px;font-weight:800">${esc(b.year||'-')} · ${esc(b.color||'-')}</div><div class="msg ${stolen?'error':'ok'}" style="margin-top:18px">${stolen?'🔴 QUESTA BICI RISULTA RUBATA':'🟢 QUESTA BICI RISULTA ATTIVA'}</div><button class="btn ${stolen?'':'danger'}" onclick="toggle('${encodeURIComponent(b.biicode_id)}')">${stolen?'SEGNALA RECUPERO':'SEGNALA FURTO'}</button><button class="btn secondary" onclick="deleteBike('${encodeURIComponent(b.biicode_id)}')">ELIMINA BICI</button></div>`);
    const q=document.getElementById('biicodeQr');
    const ok=await loadQRCode();
    if(q&&ok){q.innerHTML='';new QRCode(q,{text:publicUrl(b.biicode_id),width:190,height:190});}else fallbackQr(q,b.biicode_id);
    ensureRemoteBike(b);
  };
  async function showPublic(){const id=new URLSearchParams(location.search).get('bike');if(!id)return;const nav=document.getElementById('nav');if(nav)nav.classList.add('hidden');const root=document.getElementById('main');if(!root)return;root.innerHTML='<div class="biicode-public"><div class="logo">b<b>◯</b></div><div class="tag">BIICODE · VERIFICA BICICLETTA</div><div id="publicCard" class="card"><div class="muted">VERIFICA IN CORSO…</div></div></div>';const b=await getRemoteBike(id),box=document.getElementById('publicCard');if(!box)return;if(!b){box.innerHTML='<div style="font-size:22px;font-weight:900">Bici non trovata</div><div class="muted" style="margin-top:8px">Questo BIICODE non è associato a una bicicletta registrata.</div>';return;}const stolen=b.stolen===true;box.innerHTML=`<div class="muted">BIICODE</div><div style="font-size:24px;font-weight:900;margin-top:5px">${esc(b.biicode_id)}</div><h1>${esc(b.brand)} ${esc(b.model)}</h1><div class="muted">ANNO</div><div style="font-size:19px;font-weight:800;margin:5px 0 16px">${esc(b.year||'-')}</div><div class="muted">COLORE</div><div style="font-size:19px;font-weight:800;margin:5px 0 18px">${esc(b.color||'-')}</div><div class="msg ${stolen?'error':'ok'}">${stolen?'🔴 ATTENZIONE: QUESTA BICI RISULTA RUBATA':'🟢 QUESTA BICI RISULTA ATTIVA'}</div><div class="small" style="text-align:center;margin-top:14px">Il numero di telaio e i dati personali del proprietario non vengono mostrati.</div>`;}
  const publicId=new URLSearchParams(location.search).get('bike');
  if(publicId){window.renderHome=function(){showPublic();};window.login=function(){showPublic();};window.renderBikes=function(){showPublic();};window.profile=function(){showPublic();};setTimeout(showPublic,0);setTimeout(showPublic,300);}
  const originalSaveBike=window.saveBike;
  window.saveBike=async function(){
    const before=new Set((bikes||[]).map(x=>x.biicode_id));
    await originalSaveBike();
    const created=(bikes||[]).find(x=>!before.has(x.biicode_id));
    if(!created||!session?.access_token||!user?.email)return;
    try{
      const check=await fetch(SUPABASE_URL+'/rest/v1/bikes?select=biicode_id&biicode_id=eq.'+encodeURIComponent(created.biicode_id)+'&user_id=eq.'+encodeURIComponent(user.id)+'&limit=1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+session.access_token}});
      const rows=await check.json().catch(()=>[]);
      if(!check.ok||!rows.length){setStatus('Offline · bici salvata localmente');return;}
      const r=await fetch(SUPABASE_URL+'/functions/v1/send-biicode-registration',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'},body:JSON.stringify({biicode_id:created.biicode_id,brand:created.brand,model:created.model,year:created.year,color:created.color,frame_number:created.frame_number,customer_email:user.email})});
      const data=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(data.error||`HTTP ${r.status}`);
      setStatus('Online · bici sincronizzata · email inviata');
    }catch(e){console.warn('BIICODE registration email:',e);setStatus('Online · bici sincronizzata · email da completare');}
  };
})();
