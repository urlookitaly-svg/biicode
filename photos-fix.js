/* BIICODE photo upload fix: loaded after qr.js. */
(function(){
  'use strict';
  const SUPABASE_URL='https://swzkrwdqfgetwcmaiqty.supabase.co';
  const SUPABASE_KEY='sb_publishable_inpwNp-Uqe-X4BeTl54ui_1ARA1HNb';
  const PHOTO_BUCKET='bike-photos';
  const MAX_PHOTOS=5;

  const token=()=>typeof session!=='undefined'&&session?.access_token?session.access_token:null;
  const userId=()=>typeof user!=='undefined'&&user?.id?user.id:null;
  const headers=(withAuth=true,contentType)=>{
    const h={apikey:SUPABASE_KEY};
    if(withAuth&&token())h.Authorization='Bearer '+token();
    if(contentType)h['Content-Type']=contentType;
    return h;
  };
  const photoUrl=path=>SUPABASE_URL+'/storage/v1/object/public/'+PHOTO_BUCKET+'/'+path;

  async function responseText(r){
    const t=await r.text().catch(()=> '');
    if(!t)return r.statusText||('HTTP '+r.status);
    try{const j=JSON.parse(t);return j.message||j.error||j.msg||t}catch(e){return t}
  }

  async function compress(file){
    if(!file||!String(file.type||'').startsWith('image/'))throw new Error('Seleziona solo immagini.');
    let img=null;
    try{
      if(typeof createImageBitmap==='function')img=await createImageBitmap(file);
    }catch(e){}
    if(!img){
      img=await new Promise((resolve,reject)=>{
        const url=URL.createObjectURL(file),im=new Image();
        im.onload=()=>{URL.revokeObjectURL(url);resolve(im)};
        im.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Questo formato foto non è leggibile da Safari. Prova una foto JPG/PNG.'))};
        im.src=url;
      });
    }
    const iw=img.naturalWidth||img.width,ih=img.naturalHeight||img.height;
    const scale=Math.min(1,1600/Math.max(iw,ih));
    const w=Math.max(1,Math.round(iw*scale)),h=Math.max(1,Math.round(ih*scale));
    const c=document.createElement('canvas');c.width=w;c.height=h;
    const ctx=c.getContext('2d');if(!ctx)throw new Error('Impossibile preparare la foto.');
    ctx.drawImage(img,0,0,w,h);
    if(img.close)try{img.close()}catch(e){}
    return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('Compressione foto non riuscita.')),'image/jpeg',.82));
  }

  async function upload(path,blob){
    const url=SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+path;
    let r=await fetch(url,{method:'POST',headers:{...headers(true,'image/jpeg'),'x-upsert':'false'},body:blob});
    if((r.status===401||r.status===403)&&token()){
      r=await fetch(url,{method:'POST',headers:{...headers(false,'image/jpeg'),'x-upsert':'false'},body:blob});
    }
    if(!r.ok)throw new Error('Storage '+r.status+': '+await responseText(r));
    return photoUrl(path);
  }

  async function patchBike(id,photos){
    const filter='biicode_id=eq.'+encodeURIComponent(id)+(userId()?'&user_id=eq.'+encodeURIComponent(userId()):'');
    const url=SUPABASE_URL+'/rest/v1/bikes?'+filter;
    const body=JSON.stringify({photos});
    let r=await fetch(url,{method:'PATCH',headers:{...headers(true,'application/json'),Prefer:'return=minimal'},body});
    if((r.status===401||r.status===403)&&token()){
      r=await fetch(url,{method:'PATCH',headers:{...headers(false,'application/json'),Prefer:'return=minimal'},body});
    }
    if(!r.ok)throw new Error('Database '+r.status+': '+await responseText(r));
  }

  async function removeObject(url){
    const path=url.split('/storage/v1/object/public/'+PHOTO_BUCKET+'/')[1];
    if(!path)return;
    const endpoint=SUPABASE_URL+'/storage/v1/object/'+PHOTO_BUCKET+'/'+path;
    let r=await fetch(endpoint,{method:'DELETE',headers:headers(true)});
    if((r.status===401||r.status===403)&&token())r=await fetch(endpoint,{method:'DELETE',headers:headers(false)});
  }

  window.biicodeUploadPhotos=async function(encoded,files){
    const id=decodeURIComponent(encoded||'');
    const b=await (typeof getRemoteBike==='function'?getRemoteBike(id):null) || (typeof localBike==='function'?localBike(id):null);
    if(!b)return alert('Bici non trovata.');
    const current=Array.isArray(b.photos)?b.photos.filter(Boolean).slice(0,MAX_PHOTOS):[];
    const picked=Array.from(files||[]);
    const selected=picked.slice(0,MAX_PHOTOS-current.length);
    if(!selected.length)return alert('Puoi caricare fino a 5 foto per bici.');
    const btn=document.querySelector('.biicode-add-photo');
    if(btn){btn.disabled=true;btn.textContent='CARICAMENTO FOTO…';}
    const uploaded=[];
    try{
      for(let i=0;i<selected.length;i++){
        const blob=await compress(selected[i]);
        const uid=userId()||'public';
        const safe=Date.now()+'-'+Math.random().toString(36).slice(2,9)+'-'+i+'.jpg';
        uploaded.push(await upload(uid+'/'+id+'/'+safe,blob));
      }
      const photos=current.concat(uploaded).slice(0,MAX_PHOTOS);
      try{
        await patchBike(id,photos);
      }catch(dbErr){
        for(const url of uploaded)await removeObject(url).catch(()=>{});
        throw dbErr;
      }
      if(typeof updateLocalBike==='function')updateLocalBike(id,photos);
      alert(picked.length>selected.length?'Ho caricato le foto disponibili fino al limite di 5.':'Foto caricate correttamente.');
      if(typeof window.detail==='function')window.detail(encodeURIComponent(id));
    }catch(e){
      console.error('BIICODE photo upload:',e);
      const message=String(e?.message||e||'Errore sconosciuto');
      alert('Non sono riuscito a caricare le foto.\n\n'+message+'\n\nRiprova.');
      if(btn){btn.disabled=false;btn.textContent='＋ AGGIUNGI FOTO';}
    }
  };
})();
