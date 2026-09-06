(function(){
  if(window.supabase&&window.supabase.createClient)return;
  var s=document.createElement('script');
  s.src='https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js';
  s.async=false;
  s.onload=function(){};
  s.onerror=function(){
    var f=document.createElement('script');
    f.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
    f.async=false;
    document.head.appendChild(f);
  };
  document.head.appendChild(s);
})();