// PCDeal V8.5 — shared client security helpers
(() => {
"use strict";
function escapeHTML(v){
 return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function safeExternalUrl(v){
 try{
   const u=new URL(String(v||""),location.href);
   return ["http:","https:"].includes(u.protocol)?u.href:"#";
 }catch{return"#"}
}
function setText(el,v){if(el)el.textContent=String(v??"")}
window.PCDealSecurity={escapeHTML,safeExternalUrl,setText};
})();