/* BIICODE visual identity v2 */
(function(){
  'use strict';
  const LOGO='assets/biicode-logo.svg';
  function apply(){
    if(document.getElementById('biicode-visual-v2'))return;
    const s=document.createElement('style');s.id='biicode-visual-v2';s.textContent=`
      .bio-logo-img{display:block;width:100%;height:auto;object-fit:contain}
      .head .bio-logo-img{width:min(310px,100%);max-height:92px;object-position:left center}
      .head{display:block!important;margin-bottom:18px!important;padding:2px 0!important}
      .head .bio-logo-img{margin:0 auto 2px 0}
      .login .logo{font-size:0!important;line-height:0!important;margin:0 auto 10px!important;height:auto!important;background:none!important}
      .login .logo .bio-logo-img{width:min(330px,100%);margin:auto}
      .login .tag{display:none!important}
      .nav{height:92px!important;padding-bottom:env(safe-area-inset-bottom)!important;gap:4px!important;align-items:center!important}
      .nav button{font-size:14px!important;line-height:1.25!important;max-width:125px!important;padding:8px 4px!important}
      .plus{width:68px!important;height:68px!important;max-width:68px!important;min-width:68px!important;font-size:31px!important;margin-top:-22px!important;border:4px solid #070c14!important}
      main{padding-bottom:125px!important}
      .bike.bio-has-photo .bio-card-photo,.bike .bio-card-photo{width:78px!important;height:78px!important;flex-basis:78px!important}
      .bio-card-content strong{font-size:18px!important}
      @media(max-width:380px){.head .bio-logo-img{width:100%}.nav{height:88px!important}.nav button{font-size:13px!important}.plus{width:64px!important;height:64px!important;min-width:64px!important}}
    `;document.head.appendChild(s);
    document.querySelectorAll('.head').forEach(h=>{
      if(h.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');img.className='bio-logo-img';img.src=LOGO;img.alt='BIICODE — La tua bici. Un’identità unica.';
      h.replaceChildren(img);
    });
    document.querySelectorAll('.login .logo').forEach(l=>{
      if(l.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');img.className='bio-logo-img';img.src=LOGO;img.alt='BIICODE';l.replaceChildren(img);
    });
  }
  apply();
  new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
})();