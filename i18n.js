(()=>{'use strict';
const translations={
 en:{
 'Accedi':'Sign in','Accesso diretto a BIICODE. L\'app resta visibile anche se Supabase non risponde.':'Direct access to BIICODE. The app remains available even if Supabase does not respond.','Email':'Email','Password':'Password','ACCEDI':'SIGN IN','CREA UN ACCOUNT':'CREATE AN ACCOUNT','PASSWORD DIMENTICATA?':'FORGOT PASSWORD?','Registrati':'Sign up','Registrazione':'Registration','Le mie bici':'My bikes','Immatricola bici':'Register a bike','Marca':'Brand','Modello':'Model','Anno':'Year','Colore':'Color','Numero telaio':'Frame number','SALVA BICI':'SAVE BIKE','SEGNALA FURTO':'REPORT THEFT','SEGNALA RECUPERO':'MARK RECOVERED','TRASFERISCI PROPRIETÀ':'TRANSFER OWNERSHIP','ELIMINA BICI':'DELETE BIKE','PASSAPORTO DELLA BICI':'BIKE PASSPORT','Indietro':'Back','Annulla':'Cancel','Profilo':'Profile','Sincronizza':'Sync','Esci':'Sign out','COME FUNZIONA?':'HOW DOES IT WORK?','REGISTRA':'REGISTER','PROTEGGI':'PROTECT','UNISCITI':'JOIN','CITTÀ':'CITIES','FOTO FORTEMENTE CONSIGLIATA':'PHOTO STRONGLY RECOMMENDED'
 }
};
const key='biicode_language';
const lang=()=>localStorage.getItem(key)||((navigator.language||'it').toLowerCase().startsWith('it')?'it':'en');
const t=(s)=>translations[lang()]?.[s]||s;
function translate(){
 document.documentElement.lang=lang();
 if(lang()==='it')return;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 for(const n of nodes){if(n.parentElement?.closest('script,style,textarea,input,[contenteditable]'))continue;const raw=n.nodeValue,trim=raw.trim();if(translations.en[trim])n.nodeValue=raw.replace(trim,t(trim));}
 for(const el of document.querySelectorAll('input[placeholder],button[aria-label]')){for(const attr of ['placeholder','aria-label']){const v=el.getAttribute(attr);if(v&&translations.en[v])el.setAttribute(attr,t(v));}}
}
function chooser(){if(document.getElementById('biicode-language'))return;const s=document.createElement('select');s.id='biicode-language';s.setAttribute('aria-label','Language / Lingua');s.style.cssText='position:fixed;top:calc(env(safe-area-inset-top, 0px) + 8px);right:12px;z-index:10001;background:#13253b;color:#fff;border:1px solid #34577b;border-radius:10px;padding:6px;font-size:12px;width:auto;min-height:32px';s.innerHTML='<option value="it">🇮🇹 IT</option><option value="en">🇬🇧 EN</option>';s.value=lang();s.addEventListener('change',()=>{localStorage.setItem(key,s.value);location.reload()});document.body.appendChild(s)}
document.addEventListener('DOMContentLoaded',()=>{chooser();translate();const observer=new MutationObserver(()=>{observer.disconnect();translate();observer.observe(document.body,{childList:true,subtree:true})});observer.observe(document.body,{childList:true,subtree:true})});
window.biicodeT=t;
})();