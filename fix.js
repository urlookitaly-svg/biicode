(function(){
  function loadAlt(){
    if(window.supabase&&window.supabase.createClient)return;
    if(document.querySelector('script[data-biicode-sb]'))return;
    var s=document.createElement('script');s.dataset.biicodeSb='1';s.src='https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js';
    document.head.appendChild(s);
  }
  loadAlt();
  window.addEventListener('error',function(){
    setTimeout(function(){if(window.showLogin)window.showLogin();},50);
  });
  window.addEventListener('unhandledrejection',function(){
    setTimeout(function(){if(window.showLogin)window.showLogin();},50);
  });
  setTimeout(function(){
    var app=document.getElementById('app');
    if(window.showLogin&&app&&!app.innerHTML.trim())window.showLogin();
  },1800);
})();