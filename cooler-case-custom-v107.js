// PCDeal V10.8 — Cooler/Case custom fallback inputs
(() => {
"use strict";

function findLabel(name){
  const key=name.toLowerCase();
  return [...document.querySelectorAll("label")].find(l=>{
    const t=(l.textContent||"").trim().toLowerCase();
    return t===key || t.startsWith(key);
  }) || null;
}
function controlForLabel(name){
  const l=findLabel(name); if(!l)return null;
  const id=l.getAttribute("for");
  if(id && document.getElementById(id))return document.getElementById(id);
  return l.parentElement?.querySelector("select,input") || l.nextElementSibling;
}
function setState(key,value){
  let s={};
  try{s=window.PCDEAL_V5?.getState?.() || JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{}
  s[key]=value;
  try{localStorage.setItem("pcdeal.v5.build",JSON.stringify(s))}catch{}
}
function makeCustom(kind,labelText,placeholder,stateKey){
  const select=controlForLabel(labelText);
  if(!select || select.dataset.v107CustomAttached==="1")return;

  const host=select.parentElement;
  if(!host)return;

  const wrap=document.createElement("div");
  wrap.className="pcdeal-v107-custom-wrap";
  wrap.dataset.kind=kind;

  const lab=document.createElement("label");
  lab.className="pcdeal-v107-custom-label";
  lab.textContent="Custom / exact model";

  const input=document.createElement("input");
  input.type="text";
  input.className="pcdeal-v107-custom-input";
  input.placeholder=placeholder;
  input.autocomplete="off";

  const help=document.createElement("div");
  help.className="tiny pcdeal-v107-custom-help";
  help.textContent="Use this only if the exact product is not in the PCDeal database.";

  wrap.append(lab,input,help);
  host.appendChild(wrap);
  select.dataset.v107CustomAttached="1";

  function syncVisibility(){
    const v=(select.value||"").toLowerCase();
    const exact=v && !/unknown|other|choose|not listed/.test(v);
    wrap.style.display = exact ? "none" : "";
    if(exact){
      input.value="";
      setState(stateKey,select.value);
    }
  }

  select.addEventListener("change",syncVisibility);
  input.addEventListener("input",()=>{
    const val=input.value.trim();
    if(val){
      setState(stateKey,val);
    }
  });

  // Restore existing custom state if present.
  try{
    const s=window.PCDEAL_V5?.getState?.() || JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}");
    const saved=s?.[stateKey];
    if(saved && (!select.value || /unknown|other|choose|not listed/i.test(select.value))){
      input.value=saved;
    }
  }catch{}

  syncVisibility();
}

function init(){
  makeCustom("cooler","CPU Cooler","Type exact cooler model, e.g. Noctua NH-D15","cooler");
  makeCustom("case","Case","Type exact case model, e.g. Fractal Design North","caseName");
}

document.addEventListener("DOMContentLoaded",()=>setTimeout(init,220));
window.addEventListener("pcdeal-v105-master-detected",()=>setTimeout(init,50));
})();