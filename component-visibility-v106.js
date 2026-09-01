// PCDeal V10.7 — keep primary component controls visible, hide only redundant override inputs
(() => {
"use strict";

function labels(){
  return [...document.querySelectorAll("label")];
}
function findLabel(name){
  const k=name.toLowerCase();
  return labels().find(l=>{
    const t=(l.textContent||"").trim().toLowerCase();
    return t===k || t.startsWith(k);
  }) || null;
}
function fieldForLabel(name){
  const l=findLabel(name); if(!l)return null;
  const id=l.getAttribute("for");
  if(id && document.getElementById(id))return document.getElementById(id);
  const p=l.parentElement;
  return p?.querySelector("select,input,textarea") || l.nextElementSibling?.matches?.("select,input,textarea") && l.nextElementSibling || null;
}
function forceVisible(el){
  if(!el)return;
  el.hidden=false;
  el.removeAttribute("aria-hidden");
  el.style.removeProperty("display");
  el.style.removeProperty("visibility");
  el.style.removeProperty("opacity");
  let p=el.parentElement;
  for(let i=0;i<2 && p;i++,p=p.parentElement){
    p.classList.remove("pcdeal-custom-resolved");
    p.hidden=false;
    p.removeAttribute("aria-hidden");
    if(p.style.display==="none")p.style.removeProperty("display");
  }
}
function findOverride(kind){
  const rx={
    cpu:/cpu|processor/i,
    gpu:/gpu|graphics/i,
    motherboard:/motherboard/i,
    psu:/power supply/i
  }[kind];
  if(!rx)return null;
  const inputs=[...document.querySelectorAll("input")];
  // Prefer inputs explicitly marked as custom/exact via nearby text.
  return inputs.find(i=>{
    const ph=i.placeholder||"";
    const parent=(i.parentElement?.textContent||"");
    return rx.test(ph) && /custom|exact|type/i.test(ph+" "+parent);
  }) || null;
}
function setSelectCanonical(name, canonical){
  const sel=fieldForLabel(name);
  if(!sel || sel.tagName!=="SELECT" || !canonical)return;
  forceVisible(sel);
  const n=canonical.trim().toLowerCase();
  let opt=[...sel.options].find(o=>o.value.trim().toLowerCase()===n || (o.textContent||"").trim().toLowerCase()===n);
  if(!opt){
    opt=document.createElement("option");
    opt.value=canonical;opt.textContent=canonical;sel.appendChild(opt);
  }
  sel.value=opt.value;
  sel.dispatchEvent(new Event("change",{bubbles:true}));
}
function hideOverride(kind){
  const input=findOverride(kind);
  if(!input)return;
  // Hide ONLY the input itself. Never hide its component row/section.
  input.value="";
  input.classList.add("pcdeal-custom-input-resolved");
  input.setAttribute("aria-hidden","true");
  input.tabIndex=-1;

  // Hide its directly-associated tiny helper label if it says custom/exact,
  // but not any ancestor containing the primary select.
  const parent=input.parentElement;
  if(parent){
    [...parent.children].forEach(ch=>{
      if(ch===input)return;
      const txt=(ch.textContent||"").trim();
      if(/custom\s*\/?\s*exact model/i.test(txt)){
        ch.classList.add("pcdeal-custom-label-resolved");
      }
    });
  }
}
function showOverride(kind){
  const input=findOverride(kind);
  if(!input)return;
  input.classList.remove("pcdeal-custom-input-resolved");
  input.removeAttribute("aria-hidden");
  input.removeAttribute("tabindex");
  const parent=input.parentElement;
  if(parent)[...parent.children].forEach(ch=>ch.classList.remove("pcdeal-custom-label-resolved"));
}
function apply(r){
  r=r || window.PCDealApplyCanonicalV103?.() || null;

  // Primary controls must ALWAYS exist/appear.
  const mobo=fieldForLabel("Motherboard");
  const psu=fieldForLabel("Power Supply");
  forceVisible(mobo);forceVisible(psu);
  if(findLabel("Motherboard"))forceVisible(findLabel("Motherboard"));
  if(findLabel("Power Supply"))forceVisible(findLabel("Power Supply"));

  if(r?.motherboard?.canonical){
    setSelectCanonical("Motherboard",r.motherboard.canonical);
    hideOverride("motherboard");
  }else showOverride("motherboard");

  if(r?.psu?.canonical){
    setSelectCanonical("Power Supply",r.psu.canonical);
    hideOverride("psu");
  }else showOverride("psu");

  // CPU/GPU exact dropdowns already exist; only hide their duplicate overrides.
  const cpu=fieldForLabel("CPU"),gpu=fieldForLabel("GPU");
  forceVisible(cpu);forceVisible(gpu);
  if(cpu && cpu.value && !/other|unknown|choose/i.test(cpu.value))hideOverride("cpu"); else showOverride("cpu");
  if(gpu && gpu.value && !/other|unknown|choose/i.test(gpu.value))hideOverride("gpu"); else showOverride("gpu");
}
window.addEventListener("pcdeal-v103-applied",e=>setTimeout(()=>apply(e.detail),30));
window.addEventListener("pcdeal-v105-master-detected",()=>setTimeout(()=>apply(),50));
document.addEventListener("DOMContentLoaded",()=>setTimeout(()=>apply(),250));
window.PCDealVisibilityV106={apply,forceVisible,setSelectCanonical};
})();