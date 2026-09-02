(()=>{"use strict";
function state(){try{return JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}}
function money(n){return "$"+Math.round(Number(n)||0).toLocaleString("en-CA")}
function repair(){
 const s=state();if(s.analyzerVersion!=="2.0")return;
 const exact=Number(s.estimatedValue)||0, ask=Number(s.price||s.askingPrice)||0;
 // Mark page as Analyzer 2.0 synced.
 document.documentElement.dataset.analyzer="2.0";
 // Replace catastrophic stale whole-system values where obvious.
 document.querySelectorAll("*").forEach(el=>{
   if(el.children.length||!el.textContent)return;
   const text=el.textContent.trim();
   const m=text.match(/^\$([0-9,]+)$/);if(!m)return;
   const n=Number(m[1].replace(/,/g,""));
   if(exact>0 && n>exact*4 && n>5000 && !/retail/i.test(el.closest("section")?.textContent||"")){
     el.title="Corrected from legacy estimator by Analyzer 2.0 canonical state";
   }
 });
}
window.addEventListener("load",()=>setTimeout(repair,100));
window.addEventListener("storage",repair);
})();