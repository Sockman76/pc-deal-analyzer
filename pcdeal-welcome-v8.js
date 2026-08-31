
// PCDeal V8 — welcoming account/guest flow
(() => {
"use strict";
const KEY="pcdeal.v8.welcomeChoice";
const $=id=>document.getElementById(id);
function close(choice){localStorage.setItem(KEY,choice);document.querySelector(".welcome-overlay")?.remove()}
function render(){
 if(localStorage.getItem(KEY)||document.querySelector(".welcome-overlay"))return;
 const el=document.createElement("div");el.className="welcome-overlay";
 el.innerHTML=`<div class="welcome-modal">
   <button class="welcome-close" aria-label="Close">×</button>
   <div class="welcome-logo">PC<span>Deal</span></div>
   <div class="eyebrow">Welcome</div>
   <h2>Analyze PCs now. Save everything when you create an account.</h2>
   <p>Accounts sync saved builds, deal history and preferences across devices. You can also continue as a guest — the analyzer stays fully usable.</p>
   <div class="welcome-benefits">
    <div><strong>☁ Cloud saves</strong><span>Keep analyzed PCs and deals.</span></div>
    <div><strong>★ Watchlists</strong><span>Return to listings later.</span></div>
    <div><strong>↗ Share reports</strong><span>Keep your analysis organized.</span></div>
   </div>
   <div class="welcome-actions">
     <button id="welcomeGoogle">Continue with Google</button>
     <a class="btn secondary" href="account.html" id="welcomeCreate">Create / use email account</a>
     <button class="secondary" id="welcomeGuest">Continue as Guest</button>
   </div>
   <div class="tiny">No account is required to analyze a PC.</div>
 </div>`;
 document.body.appendChild(el);
 el.querySelector(".welcome-close").onclick=()=>close("guest");
 $("welcomeGuest").onclick=()=>close("guest");
 $("welcomeCreate").onclick=()=>localStorage.setItem(KEY,"account");
 $("welcomeGoogle").onclick=async()=>{
   try{
     if(!window.PCDealFirebase)throw new Error("Firebase is still loading.");
     await window.PCDealFirebase.signInGoogle();close("account");
     window.PCDealToast?.("Signed in","Your PCDeal account is ready.");
   }catch(e){window.PCDealToast?.("Sign-in failed",e.message||"Please try again.");}
 };
}
function accountChip(){
 const nav=document.querySelector(".nav");
 if(!nav)return;

 // Remove any older injected account controls from previous versions.
 document.querySelectorAll(".account-nudge,.account-nav-area,.account-nav-pill,.account-floating,.create-account-floating")
   .forEach(e=>e.remove());

 // Re-use the existing Account navigation link instead of creating another button.
 let link=[...nav.querySelectorAll("a")].find(a=>
   /account/i.test(a.textContent||"") || /account\.html/i.test(a.getAttribute("href")||"")
 );

 if(!link){
   link=document.createElement("a");
   link.href="account.html";
   link.textContent="Account";
   const links=nav.querySelector(".navlinks");
   if(links)links.appendChild(link);
 }

 link.classList.add("account-nav-link");
 link.removeAttribute("onclick");

 const setSignedOut=()=>{
   link.href="account.html";
   link.innerHTML='<span class="account-link-icon">◎</span><span>Account</span>';
   link.title="Create an account or sign in";
 };
 const setSignedIn=()=>{
   link.href="account.html";
   link.innerHTML='<span class="account-link-icon">✓</span><span>Account</span>';
   link.title="Open your PCDeal account";
   link.classList.add("account-signed-in");
 };

 setSignedOut();

 const hook=()=>{
   if(window.PCDealFirebase?.onAuth){
     window.PCDealFirebase.onAuth(user=>{
       if(user)setSignedIn();
       else setSignedOut();
     });
   }
 };
 if(window.PCDealFirebase)hook();
 else window.addEventListener("pcdeal-firebase-ready",hook,{once:true});
}
document.addEventListener("DOMContentLoaded",()=>{setTimeout(render,250);accountChip()});
})();