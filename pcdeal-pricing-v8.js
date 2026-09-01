
// PCDeal V8 — used vs bought-new / retail reference pricing
(() => {
"use strict";
const $=id=>document.getElementById(id);
const money=(v,c="CAD")=>v?new Intl.NumberFormat("en-CA",{style:"currency",currency:c,maximumFractionDigits:0}).format(v):"Unavailable";
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
function build(){try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}}
function usedParts(s){return window.PCDEAL_V5?.partBreakdown?.(s)||window.PCDEAL_V5?.partBreakdown?.call?.(null,s)||[]}
function refs(s){
 const parts=[
  ["CPU",s.cpu,window.findCPU?.(s.cpu)],
  ["GPU",s.gpu,window.findGPU?.(s.gpu)]
 ];
 const generic=[
  ["RAM",[s.ram,s.ramType].filter(Boolean).join(" "),null],
  ["Storage",(s.drives||[]).map(d=>`${d.size} ${d.type}`).join(" + ")||[s.storageSize,s.storageType].filter(Boolean).join(" "),null],
  ["Motherboard",s.motherboard,null],["PSU",s.psu,null],["Cooling",s.cooler,null],["Case",s.caseQuality,null]
 ];
 return parts.concat(generic);
}
function retailReferenceValue(kind,name,obj,s){
 if(obj?.msrpUSD)return {value:obj.msrpUSD,currency:"USD",label:"Launch MSRP"};
 if(kind==="RAM"){const gb=parseInt(s.ram)||0;return gb?{value:gb*(s.ramType==="DDR5"?3:2),currency:"CAD",label:"New-build reference"}:null}
 if(kind==="Storage"){let cap=parseFloat(s.storageSize)||0;if(/TB/i.test(s.storageSize||""))cap*=1000;return cap?{value:Math.max(35,cap*(s.storageType==="NVME M.2"?.10:s.storageType==="SSD"?.075:.035)),currency:"CAD",label:"New-build reference"}:null}
 if(kind==="PSU"){const w=+(String(s.psu||"").match(/(\d{3,4})\s*w/i)||[])[1];return w?{value:w*.16,currency:"CAD",label:"New-build reference"}:null}
 if(kind==="Motherboard"&&s.motherboard)return {value:/x870|x670e|z890|z790/i.test(s.motherboard)?320:/b850|b650|b550|b760|b660/i.test(s.motherboard)?210:150,currency:"CAD",label:"New-build reference"};
 if(kind==="Cooling"&&s.cooler)return {value:/420|360/i.test(s.cooler)?190:/280|240/i.test(s.cooler)?135:/premium|dual|nh-d15|ak620/i.test(s.cooler)?115:55,currency:"CAD",label:"New-build reference"};
 if(kind==="Case"&&s.caseQuality)return {value:s.caseQuality==="premium"?180:s.caseQuality==="mid"?110:70,currency:"CAD",label:"New-build reference"};
 return null;
}
function inject(){
 const host=document.querySelector('body[data-page="hardware"] main.wrap');if(!host||$("realPricingPanel"))return;
 const s=build(),used=usedParts(s),r=refs(s);
 const panel=document.createElement("section");panel.className="panel";panel.id="realPricingPanel";
 panel.innerHTML=`<div class="section-heading"><div><div class="eyebrow">Part pricing</div><h2>Used value vs newly bought pricing</h2><div class="sub">Used value drives the deal analysis. New pricing is shown separately as launch MSRP, a new-build reference, or a live retailer result when configured.</div></div><a class="btn secondary" href="retail.html">Live Retail</a></div>
 <div class="table-wrap"><table><thead><tr><th>Part</th><th>Detected</th><th>Used value</th><th>New / retail reference</th><th>Reference type</th></tr></thead><tbody>${r.map(([k,n,o])=>{const u=used.find(x=>x.name===k)?.value||0,rr=retailReferenceValue(k,n,o,s);return`<tr><td>${esc(k)}</td><td>${esc(n||"Unknown")}</td><td>${esc(money(u,s.currency||"CAD"))}</td><td>${esc(rr?money(rr.value,rr.currency):"Unavailable")}</td><td>${esc(rr?.label||"No reliable reference")}</td></tr>`}).join("")}</tbody></table></div>
 <div class="notice" style="margin-top:14px">A launch MSRP is historical, not today's store price. Generic “new-build reference” values are clearly separated from live retail and should be treated as planning estimates.</div>`;
 host.prepend(panel);
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(inject,100));
})();