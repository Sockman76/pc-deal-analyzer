// PCDeal V10.3 — direct Analyzer visible-field sync
(() => {
"use strict";

const norm=s=>String(s||"").trim();

function allLabels(){
  return [...document.querySelectorAll("label")];
}
function fieldForLabel(name){
  const key=name.toLowerCase();
  for(const l of allLabels()){
    const txt=(l.textContent||"").trim().toLowerCase();
    if(txt===key || txt.startsWith(key)){
      const id=l.getAttribute("for");
      if(id && document.getElementById(id)) return document.getElementById(id);
      const parent=l.parentElement;
      const f=parent?.querySelector("input,select,textarea");
      if(f)return f;
      const next=l.nextElementSibling;
      if(next?.matches?.("input,select,textarea"))return next;
    }
  }
  return null;
}
function setValue(el,val){
  if(!el || val==null || val==="")return false;
  el.value=String(val);
  el.dispatchEvent(new Event("input",{bubbles:true}));
  el.dispatchEvent(new Event("change",{bubbles:true}));
  return true;
}
function setSelect(el,val){
  if(!el || el.tagName!=="SELECT" || !val)return false;
  const nv=String(val).toLowerCase();
  let opt=[...el.options].find(o=>o.value.toLowerCase()===nv || o.textContent.trim().toLowerCase()===nv);
  if(!opt){
    opt=[...el.options].find(o=>{
      const a=o.value.toLowerCase(), b=o.textContent.trim().toLowerCase();
      return a.includes(nv)||b.includes(nv)||nv.includes(a)||nv.includes(b);
    });
  }
  if(!opt){
    // Add exact canonical option if not already in the menu.
    opt=document.createElement("option");
    opt.value=val;opt.textContent=val;
    el.appendChild(opt);
  }
  el.value=opt.value;
  el.dispatchEvent(new Event("change",{bubbles:true}));
  return true;
}
function listingText(){
  const ta=[...document.querySelectorAll("textarea")].find(x=>/listing|paste|description|deal/i.test((x.placeholder||"")+" "+(x.id||"")+" "+(x.name||"")));
  return ta?.value || document.querySelector("textarea")?.value || "";
}
function getField(label, placeholders=[]){
  let el=fieldForLabel(label);
  if(el)return el;
  for(const ph of placeholders){
    el=[...document.querySelectorAll("input,select")].find(x=>(x.placeholder||"").toLowerCase().includes(ph.toLowerCase()));
    if(el)return el;
  }
  return null;
}
function apply(){
  const C=window.PCDealCanonicalV102;
  if(!C)return null;
  const text=listingText();
  if(!text)return null;
  const r=C.extractFromListing(text);

  // RAM speed
  if(r.ramSpeed)setValue(getField("RAM Speed",["6000"]),r.ramSpeed);

  // RAM exact model
  if(r.ram?.canonical)setValue(getField("RAM exact model",["corsair vengeance"]),r.ram.canonical);

  // Storage
  if(r.storageType)setSelect(getField("Storage Type",[]),r.storageType);
  if(r.storageSize)setSelect(getField("Storage Size",[]),r.storageSize);
  if(r.storage?.canonical){
    const storageModel=(r.storage.canonical+" "+(r.storageSize||"")).trim();
    setValue(getField("Storage exact model",["sn850x"]),storageModel);
  }

  // Motherboard
  if(r.motherboard?.canonical){
    const sel=getField("Motherboard",[]);
    setSelect(sel,r.motherboard.canonical);
    setValue(getField("Custom / exact model",["motherboard"]),r.motherboard.canonical);
    // if multiple "Custom / exact model" labels exist, specifically find the motherboard block
    const moboLabel=[...document.querySelectorAll("label")].find(l=>(l.textContent||"").trim().toLowerCase()==="motherboard");
    const block=moboLabel?.parentElement?.parentElement || moboLabel?.parentElement;
    const custom=block?.querySelector('input[placeholder*="motherboard" i]');
    if(custom)setValue(custom,r.motherboard.canonical);
  }

  // PSU
  if(r.psu?.canonical){
    const sel=getField("Power Supply",[]);
    setSelect(sel,r.psu.canonical);
    const psuLabel=[...document.querySelectorAll("label")].find(l=>(l.textContent||"").trim().toLowerCase()==="power supply");
    const block=psuLabel?.parentElement?.parentElement || psuLabel?.parentElement;
    const custom=block?.querySelector('input[placeholder*="power supply" i]');
    if(custom)setValue(custom,r.psu.canonical);
  }

  // Asking price
  if(r.askingPrice)setValue(getField("Asking Price",["950"]),r.askingPrice);

  // persist into known state
  let state={};
  try{
    state=window.PCDEAL_V5?.getState?.() || JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}");
  }catch{}
  if(r.motherboard?.canonical)state.motherboard=r.motherboard.canonical;
  if(r.psu?.canonical)state.psu=r.psu.canonical;
  if(r.storage?.canonical)state.storageModel=r.storage.canonical;
  if(r.storageSize)state.storageSize=r.storageSize;
  if(r.storageType)state.storageType=r.storageType;
  if(r.ram?.canonical)state.ramModel=r.ram.canonical;
  if(r.ramSpeed)state.ramSpeed=r.ramSpeed;
  if(r.askingPrice)state.askingPrice=r.askingPrice;
  try{localStorage.setItem("pcdeal.v5.build",JSON.stringify(state));}catch{}

  window.dispatchEvent(new CustomEvent("pcdeal-v103-applied",{detail:r}));
  return r;
}

function hookButtons(){
  for(const b of document.querySelectorAll("button")){
    const t=(b.textContent||"").toLowerCase();
    if(t.includes("detect") || t.includes("analyze")){
      b.addEventListener("click",()=>setTimeout(apply,100),true);
    }
  }
  const ta=document.querySelector("textarea");
  if(ta){
    ta.addEventListener("input",()=>{ clearTimeout(window.__pcdealV103Timer); window.__pcdealV103Timer=setTimeout(apply,180); });
  }
}

document.addEventListener("DOMContentLoaded",hookButtons);
window.PCDealApplyCanonicalV103=apply;
})();