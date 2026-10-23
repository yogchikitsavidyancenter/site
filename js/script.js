(function(){
 var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

 // 1. Scroll reveal
 var secs=$$('.reveal-section');
 if(reduce||!('IntersectionObserver' in window)){secs.forEach(function(s){s.classList.add('is-visible')})}
 else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}})},{threshold:.08});secs.forEach(function(s){io.observe(s)})}

 // 2. FAQ accordion (one open at a time)
 var trigs=$$('.accordion-trigger');
 trigs.forEach(function(t){t.addEventListener('click',function(){
  var open=t.getAttribute('aria-expanded')==='true';
  trigs.forEach(function(o){o.setAttribute('aria-expanded','false');document.getElementById(o.getAttribute('aria-controls')).classList.remove('open')});
  if(!open){t.setAttribute('aria-expanded','true');document.getElementById(t.getAttribute('aria-controls')).classList.add('open')}
 })});

 // 3. Smooth scroll with header offset
 $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){
  var id=a.getAttribute('href');if(id.length<2)return;
  var el=document.getElementById(id.slice(1));if(!el)return;
  e.preventDefault();
  var h=($('.site-header')||{offsetHeight:0}).offsetHeight;
  window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-h+1,behavior:reduce?'auto':'smooth'});
  history.replaceState(null,'',id);
 })});

 // 4. Footer year
 var y=$('#footer-year');if(y)y.textContent=new Date().getFullYear();

 // 5. Booking form
 var form=$('#booking-form');if(!form)return;
 var f={name:$('#booking-name'),phone:$('#booking-phone'),track:$('#booking-track'),time:$('#booking-time')};
 var rules={
  name:function(v){return v.trim().length>=2},
  phone:function(v){var d=v.replace(/\D/g,'');return /^[+\d][\d\s\-()+]*$/.test(v.trim())&&d.length>=10&&d.length<=15},
  track:function(v){return v!==''},
  time:function(v){return v.trim().length>0}
 };
 function check(k){var ok=rules[k](f[k].value),er=$('#err-'+k);
  f[k].setAttribute('aria-invalid',ok?'false':'true');er.hidden=ok;
  if(!ok)f[k].setAttribute('aria-describedby','err-'+k);return ok}
 function validate(){var first=null;
  Object.keys(f).forEach(function(k){if(!check(k)&&!first)first=f[k]});
  if(first)first.focus();return !first}
 Object.keys(f).forEach(function(k){['input','change'].forEach(function(ev){f[k].addEventListener(ev,function(){if(f[k].getAttribute('aria-invalid')==='true')check(k)})})});
 function details(){return 'Name: '+f.name.value.trim()+'\nPhone: '+f.phone.value.trim()+'\nTrack: '+f.track.value+'\nPreferred time: '+f.time.value.trim()}
 var intro='Namaste, I would like to book a free consultation at Yog Chikitsa Vidyan Center.';
 form.addEventListener('submit',function(e){e.preventDefault();if(!validate())return;
  window.open('https://wa.me/919130111656?text='+encodeURIComponent(intro+'\n'+details()),'_blank','noopener')});
 $('#send-email').addEventListener('click',function(){if(!validate())return;
  window.location.href='mailto:yogawithsapana@gmail.com?subject='+encodeURIComponent('Free consultation request')+'&body='+encodeURIComponent(intro+'\n\n'+details())});
})();
