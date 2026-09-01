// PCDeal V10.2 — sync canonical recognition into Analyzer fields/state
(() => {
"use strict";
const $=id=>document.getElementById(id);
const byLabel=(label)=>{
 const labels=[...document.querySelectorAll("label")];
 const l=labels.find(x=>(x.textContent||"").trim().toLowerCase()===label.toLowerCase());
 if(!l)return null;
 const forId=l.getAttribute("for"); if(forId)return $(forId);
 return l.parentElement?.querySelector("input,select,textarea")||null;
};
function first(...xs){return xs.find(Boolean)||null}
function setInput(el,val){
 if(!el||val==null||val==="")return;
 el.value=String(val);
 el.dispatchEvent(new Event("input",{bubbles:true}));
 el.dispatchEvent(new Event("change",{bubbles:true}));
}
function chooseSelect(el,val){
 if(!el||!val)return false;
 const nv=String(val).toLowerCase();
 const opts=[...el.options];
 let o=opts.find(x=>x.value.toLowerCase()===nv||x.textContent.toLowerCase()===nv);
 if(!o)o=opts.find(x=>x.value.toLowerCase().includes(nv)||x.textContent.toLowerCase().includes(nv)||nv.includes(x.textContent.toLowerCase()));
 if(!o)return false;
 el.value=o.value;el.dispatchEvent(new Event("change",{bubbles:true}));return true;
}
function getListing(){
 return first($("listing"),$("listingText"),$("dealText"),$("listingInput"),document.querySelector("textarea"))?.value||"";
}
function statePatch(r){
 let s={};try{s=window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{}
 if(r.motherboard?.canonical)s.motherboard=r.motherboard.canonical;
 if(r.psu?.canonical)s.psu=r.psu.canonical;
 if(r.storage?.canonical)s.storageModel=r.storage.canonical;
 if(r.storageSize)s.storageSize=r.storageSize;
 if(r.storageType)s.storageType=r.storageType;
 if(r.ram?.canonical)s.ramModel=r.ram.canonical;
 if(r.ramSpeed)s.ramSpeed=r.ramSpeed;
 if(r.askingPrice)s.askingPrice=r.askingPrice;
 try{localStorage.setItem("pcdeal.v5.build",JSON.stringify(s))}catch{}
}
function apply(){
 const text=getListing();if(!text||!window.PCDealCanonicalV102)return null;
 const r=PCDealCanonicalV102.extractFromListing(text);

 const moboSel=first($("motherboard"),byLabel("Motherboard"));
 const moboExact=first($("motherboardCustom"),$("customMotherboard"),document.querySelector('input[placeholder*="motherboard" i]'));
 if(r.motherboard?.canonical){
  if(!chooseSelect(moboSel,r.motherboard.canonical))setInput(moboExact,r.motherboard.canonical);
  else if(moboExact)setInput(moboExact,r.motherboard.canonical);
 }

 const psuSel=first($("psu"),byLabel("Power Supply"));
 const psuExact=first($("psuCustom"),$("customPSU"),document.querySelector('input[placeholder*="power supply" i]'));
 if(r.psu?.canonical){
  if(!chooseSelect(psuSel,r.psu.canonical))setInput(psuExact,r.psu.canonical);
  else if(psuExact)setInput(psuExact,r.psu.canonical);
 }

 const speed=first($("ramSpeed"),document.querySelector('input[placeholder*="6000"]'),byLabel("RAM Speed"));
 if(r.ramSpeed)setInput(speed,r.ramSpeed);

 const ramExact=first($("ramModel"),document.querySelector('input[placeholder*="Corsair Vengeance" i]'),byLabel("RAM exact model"));
 if(r.ram?.canonical)setInput(ramExact,r.ram.canonical);

 const st=first($("storageType"),byLabel("Storage Type"));
 if(r.storageType)chooseSelect(st,r.storageType);

 const ss=first($("storageSize"),byLabel("Storage Size"));
 if(r.storageSize)chooseSelect(ss,r.storageSize);

 const sm=first($("storageModel"),document.querySelector('input[placeholder*="SN850X" i]'),byLabel("Storage exact model"));
 if(r.storage?.canonical)setInput(sm,r.storage.canonical+(r.storageSize?" "+r.storageSize:""));

 const price=first($("askingPrice"),byLabel("Asking Price"),document.querySelector('input[placeholder*="950"]'));
 if(r.askingPrice)setInput(price,r.askingPrice);

 statePatch(r);
 window.dispatchEvent(new CustomEvent("pcdeal-v102-recognized",{detail:r}));
 return r;
}
function install(){
 const candidates=[...document.querySelectorAll("button")].filter(b=>/detect|analy/i.test(b.textContent||""));
 for(const b of candidates){
  b.addEventListener("click",()=>setTimeout(apply,60),true);
 }
 const ta=first($("listing"),$("listingText"),$("dealText"),$("listingInput"),document.querySelector("textarea"));
 if(ta)ta.addEventListener("change",()=>setTimeout(apply,20));
}
document.addEventListener("DOMContentLoaded",install);
window.PCDealApplyV102Recognition=apply;
})();