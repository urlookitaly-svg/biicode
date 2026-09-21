/* BIICODE photo upload fix + Supabase API compatibility. */
(function(){
  'use strict';
  const SUPABASE_URL='https://swzkrwdqfgetwcmaiqty.supabase.co';
  const SUPABASE_KEY='sb_publishable_inpwNp-Uqe-X4BeTl54ui_1ARA1HNb';
  const LEGACY_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3emtyd2RxZmdldHdjbWFpcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjM1MjQsImV4cCI6MjEwMjQ5OTUyNH0.u1UzWB8PAHlvQ_yDFrxI46beycyiXhc2yytrPAxkrQg';
  const nativeFetch=window.fetch.bind(window);
  window.fetch=async function(input,init){
    const url=typeof input==='string'?input:(input&&input.url)||'';
    if(!url.startsWith(SUPABASE_URL))return nativeFetch(input,init);
    let h=new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
    const auth=h.get('Authorization')||'';
    const publishableBearer=/^Bearer\s+sb_publishable_/i.test(auth);
    if(publishableBearer){h.delete('Authorization');h.set('apikey',SUPABASE_KEY);const next={...(init||{}),headers:h};input=input instanceof Request ? new Request(input,{headers:h}) : input;init=next}
    let r=await nativeFetch(input,init);
    if(r.status!==401&&r.status!==403)return r;
    const probe=r.clone();let text='';try{text=await probe.text()}catch(e){}
    if(!/invalid api key|invalid_api_key|invalid jwt|invalid_jwt/i.test(text))return r;
    try{const retryHeaders=new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));retryHeaders.set('apikey',LEGACY_KEY);retryHeaders.set('Authorization','Bearer '+LEGACY_KEY);const retryInit={...(init||{}),headers:retryHeaders};if(input instanceof Request)return nativeFetch(new Request(input,{headers:retryHeaders}),retryInit);return nativeFetch(input,retryInit)}catch(e){return r}
  };
  const PHOTO_BUCKET='bike-photos';
  const MAX_PHOTOS=5;
  const token=()=>typeof session!=='undefined'&&session?.access_token?session.access_token:null;
  const userId=()=>typeof user!=='undefined'&&user?.id?user.id:null;
  const headers=(withAuth=true,contentType)=>{const h={apikey:SUPABASE_KEY};if(withAuth&&token())h.Authorization='Bearer '+token();if(contentType)h['Content-Type']=contentType;return h};
  const photoUrl=path=>SUPABASE_URL+'/storage/v1/object/public/'+PHOTO_BUCKET+'/'+path;
  async function responseText(r){const t=await r.text().catch(()=> '');if(!t)return r.statusText||('HTTP '+r.status);try{const j=JSON.parse(t);return j.message||j.error||j.msg||t}catch(e){return t}}
  async function getBike(id){try{const r=await fetch(SUPABASE_URL+'/rest/v1/bikes?select=*&biicode_id=eq.'+encodeURIComponent(id)+'&limit=1',{headers:headers(false)});if(!r.ok)return null;const rows=await r.json();return rows&&rows[0]?rows[0]:null}catch(e){return null}}
  async function compress(file){
    if(!file||!String(file.type||'').startsWith('image/'))throw new Error('Seleziona solo immagini.');
    let img=null;try{if(typeof createImageBitmap==='function')img=await createImageBitmap(file)}catch(e){}
    if(!img){img=await new Promise((resolve,reject)=>{const url=URL.createObjectURL(file),im=new Image();im.onload=()=>{URL.revokeObjectURL(url);resolve(im)};im.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Questo formato foto non è leggibile da Safari. Prova una foto JPG/PNG.'))};im.src=url})}
    const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height,scale=Math.min(1,1600/Math.max(iw,ih)),w=Math.max(1,Math.round(iw*scale)),h=Math.max(1,Math.round(ih*scale));
    const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');if(!ctx)throw new Error('Impossibile preparare la foto.');ctx.drawImage(img,0,0,w,h);if(img.close)try{img.close()}catch(e){}
    return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('Compressione foto non riuscita.')),'image/jpeg',.82));
  }
  async function upload(path,blob){const url=SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+path;let r=await fetch(url,{method:'POST',headers:{...headers(true,'image/jpeg'),'x-upsert':'false'},body:blob});if((r.status===401||r.status===403)&&token())r=await fetch(url,{method:'POST',headers:{...headers(false,'image/jpeg'),'x-upsert':'false'},body:blob});if(!r.ok)throw new Error('Storage '+r.status+': '+await responseText(r));return photoUrl(path)}
  async function patchBike(id,photos){const filter='biicode_id=eq.'+encodeURIComponent(id)+(userId()?'&user_id=eq.'+encodeURIComponent(userId()):''),url=SUPABASE_URL+'/rest/v1/bikes?'+filter,body=JSON.stringify({photos});let r=await fetch(url,{method:'PATCH',headers:{...headers(true,'application/json'),Prefer:'return=minimal'},body});if((r.status===401||r.status===403)&&token())r=await fetch(url,{method:'PATCH',headers:{...headers(false,'application/json'),Prefer:'return=minimal'},body});if(!r.ok)throw new Error('Database '+r.status+': '+await responseText(r))}
  async function removeObject(url){const marker='/storage/v1/object/public/'+PHOTO_BUCKET+'/',i=url.indexOf(marker);if(i<0)return;const endpoint=SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+url.slice(i+marker.length);let r=await fetch(endpoint,{method:'DELETE',headers:headers(true)});if((r.status===401||r.status===403)&&token())await fetch(endpoint,{method:'DELETE',headers:headers(false)})}
  function updateLocal(id,photos){try{const uid=userId();if(!uid)return;const k='biicode_v3_'+uid,rows=JSON.parse(localStorage.getItem(k)||'[]');if(!Array.isArray(rows))return;for(const b of rows)if(b&&b.biicode_id===id)b.photos=photos;localStorage.setItem(k,JSON.stringify(rows))}catch(e){}}
  window.biicodeUploadPhotos=async function(encoded,files){
    const id=decodeURIComponent(encoded||''),b=await getBike(id);if(!b)return alert('Bici non trovata.');
    const current=Array.isArray(b.photos)?b.photos.filter(Boolean).slice(0,MAX_PHOTOS):[],picked=Array.from(files||[]),selected=picked.slice(0,MAX_PHOTOS-current.length);if(!selected.length)return alert('Puoi caricare fino a 5 foto per bici.');
    const btn=document.querySelector('.biicode-add-photo');if(btn){btn.disabled=true;btn.textContent='CARICAMENTO FOTO…'}
    const uploaded=[];
    try{for(let i=0;i<selected.length;i++){const blob=await compress(selected[i]),uid=userId()||'public',safe=Date.now()+'-'+Math.random().toString(36).slice(2,9)+'-'+i+'.jpg';uploaded.push(await upload(uid+'/'+id+'/'+safe,blob))}
      const photos=current.concat(uploaded).slice(0,MAX_PHOTOS);try{await patchBike(id,photos)}catch(dbErr){for(const url of uploaded)await removeObject(url).catch(()=>{});throw dbErr}
      updateLocal(id,photos);alert(picked.length>selected.length?'Ho caricato le foto disponibili fino al limite di 5.':'Foto caricate correttamente.');if(typeof window.detail==='function')window.detail(encodeURIComponent(id));
    }catch(e){console.error('BIICODE photo upload:',e);alert('Non sono riuscito a caricare le foto.\n\n'+String(e?.message||e||'Errore sconosciuto')+'\n\nRiprova.');if(btn){btn.disabled=false;btn.textContent='＋ AGGIUNGI FOTO'}}
  };

  function enhancePhotoDetail(){
    const modal=document.querySelector('.modal');
    if(!modal||modal.querySelector('.biicode-special-mark'))return;
    const title=modal.querySelector('h1'); if(!title)return;
    const txt=modal.textContent||''; if(!/BIICODE/.test(txt))return;
    const encMatch=modal.innerHTML.match(/toggle\('([^']+)'\)/); if(!encMatch)return;
    const enc=encMatch[1],id=decodeURIComponent(enc);
    const bike=(typeof bikes!=='undefined'&&Array.isArray(bikes))?bikes.find(x=>x&&x.biicode_id===id):null;if(!bike)return;
    const photos=Array.isArray(bike.photos)?bike.photos:[];
    const primary=modal.querySelector('.card');
    if(primary&&!primary.querySelector('.biicode-transfer-runtime')){
      const transfer=document.createElement('button');
      transfer.type='button';transfer.className='btn secondary biicode-transfer-runtime';
      transfer.textContent='⇄ TRASFERISCI PROPRIETÀ';
      transfer.onclick=()=>{if(typeof window.biicodeTransferBike==='function')window.biicodeTransferBike(enc);else alert('Funzione di trasferimento non disponibile.');};
      const del=[...primary.querySelectorAll('button')].find(x=>/ELIMINA BICI/i.test(x.textContent||''));
      if(del)primary.insertBefore(transfer,del);else primary.appendChild(transfer);
    }
    const box=document.createElement('div');box.className='card biicode-special-mark';
    box.innerHTML='<div class="biicode-special-badge">📸 FOTO FORTEMENTE CONSIGLIATA</div><h2>Segni particolari</h2><div class="muted">Fotografa un dettaglio che rende unica e riconoscibile la tua bicicletta: graffi, ammaccature, adesivi, segni sul telaio, riparazioni o altre caratteristiche particolari.</div><div class="biicode-special-tip">Un piccolo dettaglio può essere decisivo per riconoscere la tua bici.</div><label>Foto del segno particolare</label><input id="biicodeSpecialPhoto" type="file" accept="image/*" capture="environment"><label>Descrivi il segno particolare</label><textarea id="biicodeSpecialDescription" maxlength="300" placeholder="Es. Graffio di circa 3 cm sul tubo superiore, lato destro."></textarea><button type="button" class="btn biicode-special-save">SALVA SEGNO PARTICOLARE</button>';
    const first=modal.querySelector('.card');if(first)first.insertAdjacentElement('afterend',box);else modal.appendChild(box);
    box.querySelector('.biicode-special-save').onclick=async()=>{
      const file=box.querySelector('#biicodeSpecialPhoto').files[0],desc=box.querySelector('#biicodeSpecialDescription').value.trim();
      if(!file)return alert('Seleziona la foto del segno particolare.');
      if(photos.length>=MAX_PHOTOS)return alert('Hai già raggiunto il limite di 5 foto. Elimina o sostituisci una foto per aggiungere quella dei segni particolari.');
      try{await window.biicodeUploadPhotos(enc,[file]);if(desc)localStorage.setItem('biicode_special_'+id,desc)}catch(e){}
    };
    const saved=localStorage.getItem('biicode_special_'+id);if(saved)box.querySelector('#biicodeSpecialDescription').value=saved;
  }
  const specialObserver=new MutationObserver(()=>requestAnimationFrame(enhancePhotoDetail));
  specialObserver.observe(document.body,{childList:true,subtree:true});
  setTimeout(enhancePhotoDetail,100);

  /* BIICODE visual refresh: presentation only, no data/auth behaviour changes. */
  const style=document.createElement('style');
  style.textContent=`
    :root{--bio-blue:#1565ff;--bio-bg:#070c14;--bio-panel:#101925;--bio-line:#1d2b3d;--bio-muted:#8d9bad}
    html,body{background:radial-gradient(circle at 50% -10%,#13233b 0,#070c14 42%,#05080d 100%)!important}
    body{letter-spacing:-.01em}
    main{max-width:560px!important;padding:22px 18px 105px!important}
    .box,.card,.action{background:rgba(16,25,37,.9)!important;border-color:rgba(75,103,135,.28)!important;box-shadow:0 10px 35px rgba(0,0,0,.22)!important}
    .card{border-radius:22px!important;padding:18px!important;margin-bottom:12px!important;transition:transform .18s ease,border-color .18s ease}
    .bike{min-height:92px!important;overflow:hidden;position:relative}
    .bike:after{content:'›';font-size:28px;color:#6f7f92;line-height:1;position:absolute;right:17px;top:50%;transform:translateY(-50%)}
    .bike>div:last-child{display:none}
    .bike strong{font-size:17px;letter-spacing:-.025em}
    .id{font-size:11px!important;letter-spacing:.08em;text-transform:uppercase;margin-top:4px}
    .pill{border-radius:999px!important;padding:6px 10px!important;letter-spacing:.06em}
    h1{font-size:31px!important;letter-spacing:-.045em;margin:8px 0 18px!important}
    .head{padding:4px 2px 6px;margin-bottom:18px!important}
    .mini{width:48px!important;height:48px!important;border-radius:16px!important;box-shadow:0 7px 20px rgba(21,101,255,.18)}
    .brand{font-size:21px!important;letter-spacing:-.03em}
    .statusbar{font-size:10px!important;text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px!important}
    .grid{gap:12px!important;margin-top:16px!important}
    .action{min-height:105px!important;border-radius:20px!important;padding:17px!important}
    .action strong{font-size:14px!important}
    .btn{border-radius:16px!important;min-height:56px!important;box-shadow:0 8px 22px rgba(21,101,255,.2)}
    .secondary{box-shadow:none!important}
    .nav{height:78px!important;background:rgba(7,12,20,.94)!important;backdrop-filter:blur(18px);border-top-color:rgba(75,103,135,.25)!important}
    .nav button{font-size:12px!important}
    .plus{box-shadow:0 10px 28px rgba(21,101,255,.38)!important}
    .modal{background:radial-gradient(circle at 50% 0,#122039 0,#070c14 48%,#05080d 100%)!important}
    input{background:#09111c!important;border-color:#26374b!important;border-radius:15px!important}
    .login .box{box-shadow:0 20px 55px rgba(0,0,0,.34)!important}
    .logo{letter-spacing:-.06em}
    .tag{letter-spacing:.15em!important}
    .bio-card-photo{width:72px;height:72px;border-radius:17px;object-fit:cover;display:block;background:#0a111c;flex:0 0 72px;margin-right:13px}
    .bio-card-photo-empty{background:linear-gradient(135deg,#101c2b,#0a111b);display:grid;place-items:center;color:#52647a;font-size:28px}
    .bike.bio-has-photo{padding-left:12px!important}
    .bio-card-content{min-width:0;flex:1;padding-right:28px}
    .bio-card-content strong{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .bio-card-photo-count{font-size:10px;color:#7f90a4;margin-top:6px;letter-spacing:.05em}
    .biicode-special-mark{margin-top:14px!important;border:1px solid rgba(21,101,255,.48)!important}
    .biicode-special-mark h2{margin:8px 0 8px;font-size:21px}
    .biicode-special-badge{display:inline-block;background:rgba(21,101,255,.14);color:#78adff;border:1px solid rgba(21,101,255,.35);border-radius:999px;padding:7px 10px;font-size:10px;font-weight:900;letter-spacing:.06em}
    .biicode-special-tip{margin:13px 0;padding:11px 12px;border-radius:12px;background:#0a1523;color:#dce9f8;font-size:12px;font-weight:750}
    .biicode-special-mark textarea{width:100%;min-height:92px;resize:vertical;padding:13px 14px;background:#09111c;border:1px solid #26374b;border-radius:15px;color:#fff;font:inherit;outline:0}
    .biicode-special-mark input[type=file]{padding:12px;min-height:auto}
    @media(max-width:380px){.bio-card-photo{width:62px;height:62px;flex-basis:62px}.bio-card-content strong{font-size:15px!important}}
  `;
  document.head.appendChild(style);

  function refreshBikeCards(){
    if(typeof bikes==='undefined'||!Array.isArray(bikes))return;
    document.querySelectorAll('.card.bike').forEach(card=>{
      if(card.dataset.bioStyled==='1')return;
      const onclick=card.getAttribute('onclick')||'';
      const match=onclick.match(/detail\('([^']+)'\)/);if(!match)return;
      let id='';try{id=decodeURIComponent(match[1])}catch(e){id=match[1]}
      const bike=bikes.find(x=>x&&x.biicode_id===id);if(!bike)return;
      const first=Array.isArray(bike.photos)&&bike.photos[0];
      const left=card.querySelector(':scope > div:first-child');if(!left)return;
      const content=left.innerHTML;
      const wrap=document.createElement('div');wrap.className='bio-card-content';wrap.innerHTML=content;
      const img=document.createElement('div');
      if(first){const im=document.createElement('img');im.className='bio-card-photo';im.src=first;im.alt='Foto '+(bike.brand||'bici');im.loading='lazy';img.replaceWith(im);card.insertBefore(im,card.firstChild)}else{img.className='bio-card-photo bio-card-photo-empty';img.textContent='🚲';card.insertBefore(img,card.firstChild)}
      left.replaceWith(wrap);
      const count=Array.isArray(bike.photos)?bike.photos.length:0;
      if(count){const c=document.createElement('div');c.className='bio-card-photo-count';c.textContent=count+' foto · tocca per aprire';wrap.appendChild(c)}
      card.classList.add('bio-has-photo');card.dataset.bioStyled='1';
    });
  }
  const observer=new MutationObserver(()=>requestAnimationFrame(refreshBikeCards));
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(refreshBikeCards,80);
})();