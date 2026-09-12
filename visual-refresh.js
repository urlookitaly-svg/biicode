/* BIICODE visual identity v3 */
(function(){
  'use strict';
  const LOGO='assets/biicode-logo.svg';

  function installStyles(){
    if(document.getElementById('biicode-visual-v3'))return;
    const s=document.createElement('style');
    s.id='biicode-visual-v3';
    s.textContent=`
      .bio-logo-img{display:block;width:100%;height:auto;object-fit:contain}
      .head{display:block!important;margin-bottom:20px!important;padding:0!important}
      .head .bio-logo-img{width:min(390px,100%);max-height:125px;object-position:left center;margin:0 auto 2px 0}
      .login .logo{font-size:0!important;line-height:0!important;margin:0 auto 12px!important;height:auto!important;background:none!important}
      .login .logo .bio-logo-img{width:min(350px,100%);margin:auto}
      .login .tag{display:none!important}

      .nav{height:104px!important;padding:7px 10px calc(7px + env(safe-area-inset-bottom))!important;gap:3px!important;align-items:center!important;background:rgba(5,10,17,.97)!important;backdrop-filter:blur(18px)!important}
      .nav button{font-size:0!important;line-height:1!important;max-width:none!important;padding:7px 3px!important;display:flex!important;flex:1 1 0!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:#91a0b3!important}
      .nav button .nav-icon{display:block!important;font-size:28px!important;line-height:28px!important;font-weight:700!important;height:30px!important}
      .nav button .nav-label{display:block!important;font-size:14px!important;line-height:17px!important;font-weight:900!important;letter-spacing:-.01em!important}
      .nav .active{color:#fff!important}
      .plus{width:72px!important;height:72px!important;min-width:72px!important;max-width:72px!important;flex:0 0 72px!important;font-size:34px!important;line-height:1!important;margin-top:-25px!important;border:4px solid #070c14!important;box-shadow:0 10px 30px rgba(21,101,255,.42)!important}
      main{padding-bottom:137px!important}

      .bike.bio-has-photo .bio-card-photo,.bike .bio-card-photo{width:78px!important;height:78px!important;flex-basis:78px!important}
      .bio-card-content strong{font-size:18px!important}
      @media(max-width:380px){
        .head .bio-logo-img{width:100%;max-height:118px}
        .nav{height:100px!important;padding-left:6px!important;padding-right:6px!important}
        .nav button .nav-icon{font-size:25px!important;line-height:25px!important;height:27px!important}
        .nav button .nav-label{font-size:13px!important;line-height:16px!important}
        .plus{width:68px!important;height:68px!important;min-width:68px!important;max-width:68px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function mountLogos(){
    document.querySelectorAll('.head').forEach(h=>{
      if(h.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');
      img.className='bio-logo-img';
      img.src=LOGO+'?v=3';
      img.alt='BIICODE — La tua bici. Un’identità unica.';
      h.replaceChildren(img);
    });
    document.querySelectorAll('.login .logo').forEach(l=>{
      if(l.querySelector('.bio-logo-img'))return;
      const img=document.createElement('img');
      img.className='bio-logo-img';
      img.src=LOGO+'?v=3';
      img.alt='BIICODE';
      l.replaceChildren(img);
    });
  }

  function decorateNav(){
    document.querySelectorAll('.nav button').forEach((b,i)=>{
      if(b.classList.contains('plus')||b.dataset.bioNavV3==='1')return;
      const labels=['Home','Bici','Profilo'];
      const icons=['⌂','🚲','○'];
      const label=labels[i===3?2:i]||'';
      const icon=icons[i===3?2:i]||'';
      b.textContent='';
      const ic=document.createElement('span');ic.className='nav-icon';ic.textContent=icon;
      const lb=document.createElement('span');lb.className='nav-label';lb.textContent=label;
      b.append(ic,lb);
      b.dataset.bioNavV3='1';
    });
  }

  function apply(){
    installStyles();
    mountLogos();
    decorateNav();
  }

  apply();
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.body,{childList:true,subtree:true});
})();