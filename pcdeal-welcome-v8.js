
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
 // V8.1: account access belongs in the header, not floating across the page.
 const header=document.querySelector(".topbar")||document.querySelector("header");
 if(!header)return;

 let area=header.querySelector(".account-nav-area");
 if(!area){
   area=document.createElement("div");
   area.className="account-nav-area";
   const nav=header.querySelector(".nav")||header.querySelector("nav");
   if(nav && nav.parentElement===header) header.appendChild(area);
   else header.appendChild(area);
 }

 const chip=document.createElement("button");
 chip.className="account-nav-pill";
 chip.innerHTML='<span class="account-nav-icon">◉</span><span class="account-nav-copy"><strong>Create account</strong><small>Save & sync</small></span>';
 chip.onclick=()=>{localStorage.removeItem(KEY);render()};
 area.appendChild(chip);

 const update=u=>{
   if(u){
     chip.innerHTML='<span class="account-nav-icon">✓</span><span class="account-nav-copy"><strong>My account</strong><small>Signed in</small></span>';
     chip.onclick=()=>location.href="account.html";
   }else{
     chip.innerHTML='<span class="account-nav-icon">◉</span><span class="account-nav-copy"><strong>Create account</strong><small>Save & sync</small></span>';
     chip.onclick=()=>{localStorage.removeItem(KEY);render()};
   }
 };
 const hook=()=>window.PCDealFirebase?.onAuth?.(update);
 if(window.PCDealFirebase)hook();else window.addEventListener("pcdeal-firebase-ready",hook,{once:true});
}
document.addEventListener("DOMContentLoaded",()=>{setTimeout(render,250);accountChip()});
})();