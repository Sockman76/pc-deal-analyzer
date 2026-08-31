
// PCDeal V7 — recognition refinement layer
(() => {
"use strict";
const $=id=>document.getElementById(id);
function setIfEmpty(id,v){const e=$(id);if(e && !String(e.value||"").trim() && v){e.value=v;e.dispatchEvent(new Event("change",{bubbles:true}))}}
function refine(){
 const text=$("listingText")?.value||"";
 if(!text)return;
 const c=window.detectCPUFromText?.(text); if(c?.name)setIfEmpty("cpu",c.name);
 const g=window.detectGPUFromText?.(text); if(g?.name)setIfEmpty("gpu",g.name);
 const r=window.detectRamDetails?.(text)||{};
 if(r.capacity)setIfEmpty("ram",r.capacity);
 if(r.type)setIfEmpty("ramType",r.type);
 if(!r.type){const inferred=window.inferRamType?.($("cpu")?.value,$("motherboard")?.value); if(inferred)setIfEmpty("ramType",inferred)}
 const psu=window.detectPSUDetails?.(text); if(psu?.raw)setIfEmpty("psu",psu.raw);
 const mb=window.detectMotherboardDetails?.(text); if(mb?.name)setIfEmpty("motherboard",mb.name);
 const drives=window.detectStorageDetails?.(text)||[];
 if(drives[0]){setIfEmpty("storageType",drives[0].type);setIfEmpty("storageSize",drives[0].size)}
 document.dispatchEvent(new CustomEvent("pcdeal:v7-refined",{detail:{cpu:c,gpu:g,ram:r,psu,motherboard:mb,drives}}));
}
function wrap(){
 if(typeof window.parseListing==="function"&&!window.parseListing.__v7){const old=window.parseListing;window.parseListing=function(){const x=old.apply(this,arguments);setTimeout(refine,40);setTimeout(refine,180);return x};window.parseListing.__v7=true}
}
document.addEventListener("DOMContentLoaded",()=>{wrap();$("listingText")?.addEventListener("blur",refine)});
function v72Canon(id,kind){const e=$(id);if(!e)return;const old=String(e.value||"").trim();if(!old)return;const next=window.PCDealAliases?.normalizeAnyHardware?.(kind,old)||old;if(next!==old){e.value=next;e.dispatchEvent(new Event("change",{bubbles:true}))}}
document.addEventListener("DOMContentLoaded",()=>{[["cpu","cpu"],["gpu","gpu"],["motherboard","motherboard"],["psu","psu"],["ram","ram"],["cooler","cooler"]].forEach(([id,k])=>$(id)?.addEventListener("blur",()=>v72Canon(id,k)))});
window.PCDealRefineRecognition=refine;
})();
