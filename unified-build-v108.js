// PCDeal V10.9 unified canonical state
(()=>{"use strict";
const L=()=>[...document.querySelectorAll("label")];
const lab=n=>{n=n.toLowerCase();return L().find(x=>{let t=(x.textContent||"").trim().toLowerCase();return t===n||t.startsWith(n)})};
const fld=n=>{let l=lab(n);if(!l)return null;let id=l.getAttribute("for");return(id&&document.getElementById(id))||l.parentElement?.querySelector("input,select,textarea")||l.nextElementSibling};
const set=(e,v)=>{if(!e||v==null||v==="")return;if(e.tagName==="SELECT"){let n=String(v).toLowerCase(),o=[...e.options].find(x=>x.value.toLowerCase()===n||(x.textContent||"").trim().toLowerCase()===n);if(!o){o=document.createElement("option");o.value=v;o.textContent=v;e.appendChild(o)}e.value=o.value}else e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}))};
const man=rx=>[...document.querySelectorAll("input")].find(i=>rx.test((i.placeholder||"")+" "+(i.parentElement?.textContent||"")));
const txt=()=>document.querySelector("textarea")?.value||"";
const rt=s=>{let m=String(s).match(/\bDDR\s*([2-5])\b/i)||String(s).match(/\bDDR([2-5])\b/i);return m?"DDR"+m[1]:""};
function state(){try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}}
function run(){
 let s=txt(),r=window.PCDealCanonicalV102?.extractFromListing(s)||{},old=state(),cpu=fld("CPU"),gpu=fld("GPU"),mb=fld("Motherboard"),ps=fld("Power Supply"),type=rt(s);
 if(type)set(fld("RAM Type"),type);
 let cv=(cpu?.value||"").trim(),gv=(gpu?.value||"").trim(),mv=(r.motherboard?.canonical||mb?.value||"").trim(),pv=(r.psu?.canonical||ps?.value||"").trim();
 if(cv&&!/choose|unknown|other/i.test(cv))set(man(/cpu|processor/i),cv);
 if(gv&&!/choose|unknown|other/i.test(gv))set(man(/gpu|graphics/i),gv);
 if(mv&&!/choose|unknown|other/i.test(mv))set(man(/motherboard/i),mv);
 if(pv&&!/choose|unknown|other/i.test(pv))set(man(/power supply/i),pv);
 let b={...old,cpu:cv||old.cpu||"",gpu:gv||old.gpu||"",ram:(fld("RAM Capacity")?.value||old.ram||""),ramType:type||fld("RAM Type")?.value||old.ramType||"",ramSpeed:Number(fld("RAM Speed")?.value)||old.ramSpeed||0,ramModel:fld("RAM exact model")?.value||old.ramModel||"",motherboard:mv||old.motherboard||"",storageType:fld("Storage Type")?.value||old.storageType||"",storageSize:fld("Storage Size")?.value||old.storageSize||"",storageModel:fld("Storage exact model")?.value||old.storageModel||"",psu:pv||old.psu||"",cooler:fld("CPU Cooler")?.value||old.cooler||"",caseName:fld("Case")?.value||old.caseName||"",askingPrice:Number(fld("Asking Price")?.value)||r.askingPrice||old.askingPrice||0};
 localStorage.setItem("pcdeal.v5.build",JSON.stringify(b));localStorage.setItem("pcdeal.canonical.build.v108",JSON.stringify(b));window.PCDealCanonicalBuildV108=b;
 window.PCDealVisualizerSourceV108={cpu:b.cpu||"Unknown",gpu:b.gpu||"Unknown",ram:[b.ram,b.ramType,b.ramSpeed].filter(Boolean).join(" ")||"Unknown",motherboard:b.motherboard||"Unknown",storage:[b.storageModel,b.storageSize,b.storageType].filter(Boolean).join(" ")||"Unknown",psu:b.psu||"Unknown",cooler:b.cooler||"Unknown",case:b.caseName||"Unknown"};
 window.dispatchEvent(new CustomEvent("pcdeal-canonical-build-v108",{detail:b}));return b}
document.addEventListener("DOMContentLoaded",()=>{setTimeout(run,300);for(let b of document.querySelectorAll("button"))if(/detect|analyze/i.test(b.textContent||""))b.addEventListener("click",()=>setTimeout(run,180),true)});
window.addEventListener("pcdeal-v103-applied",()=>setTimeout(run,60));window.PCDealUnifiedV108={run,ramType:rt};
})();