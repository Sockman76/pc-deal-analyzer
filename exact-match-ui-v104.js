// PCDeal V10.7 — exact-match UI/state cleanup
(() => {
"use strict";

const text = el => (el?.textContent || "").trim().toLowerCase();

function findLabel(name){
  const key=name.toLowerCase();
  return [...document.querySelectorAll("label")].find(l=>{
    const t=text(l);
    return t===key || t.startsWith(key);
  }) || null;
}
function fieldForLabel(name){
  const l=findLabel(name); if(!l)return null;
  const id=l.getAttribute("for");
  if(id && document.getElementById(id))return document.getElementById(id);
  const p=l.parentElement;
  return p?.querySelector("input,select,textarea") || l.nextElementSibling?.matches?.("input,select,textarea") && l.nextElementSibling || null;
}
function ensureOption(select, value){
  if(!select || select.tagName!=="SELECT" || !value)return false;
  const nv=String(value).trim().toLowerCase();
  let opt=[...select.options].find(o=>o.value.trim().toLowerCase()===nv || text(o)===nv);
  if(!opt){
    opt=document.createElement("option");
    opt.value=value;
    opt.textContent=value;
    select.appendChild(opt);
  }
  select.value=opt.value;
  select.dispatchEvent(new Event("change",{bubbles:true}));
  return true;
}
function setInput(input,value){
  if(!input)return;
  input.value=value ?? "";
  input.dispatchEvent(new Event("input",{bubbles:true}));
  input.dispatchEvent(new Event("change",{bubbles:true}));
}
function customInputFor(kind){
  const map={
    motherboard:/motherboard/i,
    psu:/power supply/i,
    storage:/sn850x|storage/i,
    ram:/corsair vengeance|ram exact/i
  };
  const rx=map[kind];
  return [...document.querySelectorAll("input")].find(i=>rx.test(i.placeholder||"")) || null;
}
function customContainer(input){
  if(!input)return null;
  // Prefer a compact wrapper that includes the "Custom / exact model" label.
  let el=input.parentElement;
  for(let i=0;i<3 && el;i++,el=el.parentElement){
    if(/custom\s*\/?\s*exact model/i.test(el.textContent||""))return el;
  }
  return input.parentElement;
}
function exactMatch(kind, canonical){
  if(!canonical)return;
  const labels={
    motherboard:"Motherboard",
    psu:"Power Supply"
  };
  const select=labels[kind] ? fieldForLabel(labels[kind]) : null;
  if(select)ensureOption(select,canonical);

  const custom=customInputFor(kind);
  if(custom){
    // Exact database match means custom override is not needed.
    setInput(custom,"");
    custom.dataset.pcdealExactResolved="true";
    custom.classList.add("pcdeal-custom-input-resolved");
    custom.setAttribute("aria-hidden","true");
    custom.tabIndex=-1;
    const note=custom.parentElement?.querySelector(".pcdeal-exact-match-note");
    if(note)note.remove();
  }
}
function partialMatch(kind, value){
  const custom=customInputFor(kind);
  if(!custom)return;
  custom.classList.remove("pcdeal-custom-input-resolved");
  custom.removeAttribute("aria-hidden");
  custom.removeAttribute("tabindex");
  if(value)setInput(custom,value);
}
function apply(detail){
  const r=detail || window.PCDealApplyCanonicalV103?.() || null;
  if(!r)return;

  if(r.motherboard?.canonical) exactMatch("motherboard",r.motherboard.canonical);
  else partialMatch("motherboard");

  if(r.psu?.canonical) exactMatch("psu",r.psu.canonical);
  else partialMatch("psu");

  // Storage exact model is useful even with an exact match, so keep it visible.
  const storage=customInputFor("storage");
  if(storage && r.storage?.canonical){
    const model=(r.storage.canonical+" "+(r.storageSize||"")).trim();
    setInput(storage,model);
  }

  // RAM exact model only displays if actually known; speed/capacity remain separate.
  const ram=customInputFor("ram");
  if(ram){
    if(r.ram?.canonical)setInput(ram,r.ram.canonical);
    else if(!ram.value)ram.placeholder="Exact RAM kit appears here when recognized";
  }

  // Persist canonical selections into state.
  let state={};
  try{
    state=window.PCDEAL_V5?.getState?.() || JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}");
  }catch{}
  if(r.motherboard?.canonical)state.motherboard=r.motherboard.canonical;
  if(r.psu?.canonical)state.psu=r.psu.canonical;
  try{localStorage.setItem("pcdeal.v5.build",JSON.stringify(state));}catch{}
}

window.addEventListener("pcdeal-v103-applied",e=>setTimeout(()=>apply(e.detail),20));

document.addEventListener("DOMContentLoaded",()=>{
  // Clean up existing stale duplicate values after a reload.
  setTimeout(()=>{
    const r=window.PCDealApplyCanonicalV103?.();
    if(r)apply(r);
  },180);
});

window.PCDealExactMatchUIV104={apply,exactMatch,partialMatch};
})();