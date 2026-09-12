/* BIICODE photo upload fix + Supabase API compatibility. */
(function(){
  'use strict';
  const SUPABASE_URL='https://swzkrwdqfgetwcmaiqty.supabase.co';
  const SUPABASE_KEY='sb_publishable_inpwNp-Uqe-X4BeTl54ui_1ARA1HNb';
  const LEGACY_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3emtyd2RxZmdldHdjbWFpcXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5MjM1MjQsImV4cCI6MjEwMjQ5OTUyNH0.u1UzWB8PAHlvQ_yDFrxI46beycyiXhc2yytrPAxkrQg';

  /* The app's old authHeaders() puts the publishable key in Authorization.
     New Supabase keys are not JWTs: they belong in apikey only. */
  const nativeFetch=window.fetch.bind(window);
  window.fetch=async function(input,init){
    const url=typeof input==='string'?input:(input&&input.url)||'';
    if(!url.startsWith(SUPABASE_URL))return nativeFetch(input,init);

    let h=new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
    const auth=h.get('Authorization')||'';
    const publishableBearer=/^Bearer\s+sb_publishable_/i.test(auth);

    /* Permanent compatibility fix: never send sb_publishable_* as Bearer. */
    if(publishableBearer){
      h.delete('Authorization');
      h.set('apikey',SUPABASE_KEY);
      const next={...(init||{}),headers:h};
      input=input instanceof Request ? new Request(input,{headers:h}) : input;
      init=next;
    }

    let r=await nativeFetch(input,init);
    if(r.status!==401&&r.status!==403)return r;
    const probe=r.clone();
    let text='';try{text=await probe.text()}catch(e){}
    if(!/invalid api key|invalid_api_key|invalid jwt|invalid_jwt/i.test(text))return r;

    /* Fallback for an older cached gateway/client: use the still-active
       legacy anon key correctly in BOTH apikey and Authorization. */
    try{
      const retryHeaders=new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
      retryHeaders.set('apikey',LEGACY_KEY);
      retryHeaders.set('Authorization','Bearer '+LEGACY_KEY);
      const retryInit={...(init||{}),headers:retryHeaders};
      if(input instanceof Request)return nativeFetch(new Request(input,{headers:retryHeaders}),retryInit);
      return nativeFetch(input,retryInit);
    }catch(e){return r}
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
})();