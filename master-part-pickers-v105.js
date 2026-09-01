// PCDeal V10.9 — Cooler + Case master-database pickers
(() => {
"use strict";
const DB=()=>window.PCDealMasterDB;
const norm=s=>String(s||"").trim();
function label(name){
 const k=name.toLowerCase();
 return [...document.querySelectorAll("label")].find(l=>{
  const t=(l.textContent||"").trim().toLowerCase();
  return t===k||t.startsWith(k);
 });
}
function field(name){
 const l=label(name);if(!l)return null;
 const id=l.getAttribute("for");
 if(id&&document.getElementById(id))return document.getElementById(id);
 return l.parentElement?.querySelector("select,input")||l.nextElementSibling;
}
function addOption(sel,name){
 if(!sel||!name)return;
 const n=name.toLowerCase();
 let o=[...sel.options].find(x=>x.textContent.trim().toLowerCase()===n||x.value.trim().toLowerCase()===n);
 if(!o){o=document.createElement("option");o.value=name;o.textContent=name;sel.appendChild(o)}
 return o;
}
async function loadCategory(sel,cat){
 if(!sel||sel.dataset.masterLoaded==="1")return;
 try{
  const rows=await DB().index(cat);
  // Remove generic tier-only options but keep Unknown/custom fallback.
  [...sel.options].forEach((o,i)=>{
   const t=o.textContent.toLowerCase();
   if(i>0 && /stock|oem|low-profile|single-tower|dual-tower|premium air|120mm aio|240mm aio|280mm aio|360mm aio|420mm aio|custom water|basic case|mid-range case|premium case/.test(t)) o.remove();
  });
  for(const x of rows)addOption(sel,x.name);
  const other=addOption(sel,"Other / type exact model below");
  sel.dataset.masterLoaded="1";
  sel.dataset.masterCategory=cat;
 }catch(e){console.warn("Master DB category load failed",cat,e)}
}
function listing(){
 const ta=[...document.querySelectorAll("textarea")].find(x=>/listing|deal|description|paste/i.test((x.id||"")+" "+(x.placeholder||"")))||document.querySelector("textarea");
 return ta?.value||"";
}
async function bestFromLines(cat,text){
 const lines=String(text||"").split(/\n+/).map(x=>x.trim()).filter(x=>x.length>=3);
 let best=null;
 for(const line of lines){
  try{
   const hits=await DB().search(cat,line,1);
   const h=hits[0];
   if(h && (!best || h.matchScore>best.matchScore))best=h;
  }catch{}
 }
 return best && best.matchScore>=58 ? best : null;
}
function persist(key,val){
 let s={};try{s=window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{}
 s[key]=val;try{localStorage.setItem("pcdeal.v5.build",JSON.stringify(s))}catch{}
}
async function detect(){
 if(!DB())return;
 const text=listing();if(!text)return;
 const coolerSel=field("CPU Cooler"),caseSel=field("Case");
 await Promise.all([loadCategory(coolerSel,"cpu-cooler"),loadCategory(caseSel,"case")]);
 const [cooler,pcCase]=await Promise.all([bestFromLines("cpu-cooler",text),bestFromLines("case",text)]);
 if(cooler){
  addOption(coolerSel,cooler.name);coolerSel.value=cooler.name;coolerSel.dispatchEvent(new Event("change",{bubbles:true}));
  persist("cooler",cooler.name);
 }
 if(pcCase){
  addOption(caseSel,pcCase.name);caseSel.value=pcCase.name;caseSel.dispatchEvent(new Event("change",{bubbles:true}));
  persist("caseName",pcCase.name);
 }
 window.dispatchEvent(new CustomEvent("pcdeal-v105-master-detected",{detail:{cooler,case:pcCase}}));
}
async function init(){
 const coolerSel=field("CPU Cooler"),caseSel=field("Case");
 for(const [s,c] of [[coolerSel,"cpu-cooler"],[caseSel,"case"]]){
  if(s){
   s.addEventListener("focus",()=>loadCategory(s,c),{once:true});
   // load immediately too so users see exact products without interaction race.
   loadCategory(s,c);
  }
 }
 for(const b of document.querySelectorAll("button")){
  if(/detect|analyze/i.test(b.textContent||"")) b.addEventListener("click",()=>setTimeout(detect,120),true);
 }
 const ta=document.querySelector("textarea");
 if(ta)ta.addEventListener("change",()=>setTimeout(detect,80));
}
document.addEventListener("DOMContentLoaded",init);
window.PCDealMasterPickerV105={loadCategory,detect,bestFromLines};
})();