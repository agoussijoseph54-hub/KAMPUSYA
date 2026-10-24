const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const page=location.pathname.split("/").pop()||"index.html";
const L=[["index.html","Accueil"],["index.html#fonctions","Fonctionnalités"],["tarifs.html","Tarifs"],["contact.html","Contact"]];
$("#hdr").outerHTML=`<header id="hdr"><div class="wrap nav"><a class="logo" href="index.html"><i></i>SIXPAY</a>
<nav class="links" id="lk">${L.map(([h,t])=>`<a href="${h}" class="${h===page?"on":""}">${t}</a>`).join("")}</nav>
<div class="act"><a class="btn ghost sm" id="login" href="connexion.html">Connexion</a><a class="btn lime sm" href="connexion.html#signup">Ouvrir un compte</a><button class="burger" id="bg" aria-label="Menu">☰</button></div></div></header>`;
$("#ftr").outerHTML=`<footer><div class="wrap"><div class="fgrid"><div><a class="logo" href="index.html"><i></i>SIXPAY</a>
<p style="margin-top:1rem;font-size:.9rem;max-width:300px">Le compte professionnel qui simplifie votre trésorerie.</p>
<form class="nl" data-form="newsletter"><input type="email" name="email" placeholder="Votre e-mail" required aria-label="E-mail"><button class="btn lime sm">S'abonner</button></form><div class="msg" style="margin-top:.6rem"></div></div>
<div><h4>Produit</h4><a href="index.html#fonctions">Cartes virtuelles</a><a href="index.html#fonctions">Multi-devises</a><a href="tarifs.html">Tarifs</a></div>
<div><h4>Société</h4><a href="contact.html">Contact</a><a href="index.html#faq">FAQ</a><a href="connexion.html">Espace client</a></div>
<div><h4>Légal</h4><a href="#">Mentions légales</a><a href="#">Confidentialité</a><a href="#">CGU</a></div></div>
<div class="fb"><span>© ${new Date().getFullYear()} SixPay. Tous droits réservés.</span><span>Abidjan · Côte d'Ivoire</span></div></div></footer>`;
document.body.insertAdjacentHTML("afterbegin",'<div class="curtain"><b>SIXPAY</b></div>');
addEventListener("load",()=>setTimeout(()=>document.body.classList.add("ready"),350));
addEventListener("pageshow",e=>{if(e.persisted){document.body.classList.remove("leaving");document.body.classList.add("ready")}});
document.addEventListener("click",e=>{
  const a=e.target.closest("a[href]");if(!a||a.target||e.metaKey||e.ctrlKey)return;
  const u=new URL(a.href,location);if(u.origin!==location.origin||u.pathname===location.pathname)return;
  e.preventDefault();document.body.classList.add("leaving");const c=$(".curtain");
  requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add("go")));setTimeout(()=>location.href=a.href,650)});
const h=$("#hdr");addEventListener("scroll",()=>h.classList.toggle("solid",scrollY>40),{passive:true});
$("#bg").onclick=()=>$("#lk").classList.toggle("open");
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);
  if(x.target.dataset.count)count(x.target)}}),{threshold:.2});
$$("[data-r],[data-count]").forEach((el,i)=>{el.style.setProperty("--d",(i%4)*.08+"s");io.observe(el)});
function count(el){const to=+el.dataset.count,s=el.dataset.suf||"",t0=performance.now();
  (function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString("fr-FR")+s;p<1&&requestAnimationFrame(f)})(t0)}
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab,.panel").forEach(x=>x.classList.remove("on"));b.classList.add("on");$("#"+b.dataset.t).classList.add("on")});
const st=$(".stage");if(st&&matchMedia("(hover:hover)").matches)$(".hero").addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*2;$$(".tile",st).forEach((t,i)=>t.style.marginLeft=x*(i%2?-14:14)+"px")});
const show=(f,ok,t)=>{const m=$(".msg",f)||f.nextElementSibling;m.className="msg "+(ok?"ok":"err");m.textContent=t};
$$("form[data-form]").forEach(f=>f.addEventListener("submit",async e=>{
  e.preventDefault();const d=Object.fromEntries(new FormData(f)),k=f.dataset.form,b=$("button",f);b.disabled=true;let r;
  if(k==="newsletter")r=await API.subscribe(d.email);
  if(k==="contact")r=await API.contact({name:d.name,email:d.email,subject:d.subject,message:d.message});
  if(k==="signup")r=await API.signUp(d.email,d.password,d.name);
  if(k==="login")r=await API.signIn(d.email,d.password);
  b.disabled=false;
  if(r.error)return show(f,false,r.error.code==="23505"?"Cette adresse est déjà inscrite.":r.error.message);
  show(f,true,{newsletter:"Merci, vous êtes inscrit(e).",contact:"Message envoyé. Nous répondons sous 24 h.",signup:"Compte créé. Vérifiez votre e-mail pour confirmer.",login:"Connexion réussie."}[k]);
  f.reset();if(k==="login")setTimeout(()=>location.href="index.html",900)}));
API.user().then(u=>{if(u){const l=$("#login");l.textContent="Déconnexion";l.href="#";l.onclick=async e=>{e.preventDefault();await API.signOut();location.reload()}}});
