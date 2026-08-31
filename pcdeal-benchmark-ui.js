// PCDeal V7.1 — benchmark data UI
(() => {
"use strict";
const $=id=>document.getElementById(id);
function getBuild(){
 try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function injectPerformance(){
 const host=document.querySelector('body[data-page="performance"] main.wrap');if(!host||$("benchmarkCalibration"))return;
 const b=getBuild(),B=window.PCDealBenchmarks,g=B?.gpu(b.gpu),c=B?.cpu(b.cpu);
 const panel=document.createElement("section");panel.className="panel";panel.id="benchmarkCalibration";
 panel.innerHTML=`<div class="section-heading"><div><div class="eyebrow">Benchmark calibration</div><h2>Measured hierarchy reference</h2><div class="sub">When a detected part exists in the current calibration snapshot, PCDeal uses published hierarchy data to anchor its internal performance model.</div></div><span class="tag ${g||c?"good":""}">${g||c?"Source-backed data available":"Heuristic only"}</span></div>
 <div class="grid2">
  <div class="card"><h3>GPU calibration</h3>${g?`<div class="big">${esc(g.key)}</div><div class="kpi"><span>1080p hierarchy</span><strong>${g.p1080}%</strong></div><div class="kpi"><span>1440p hierarchy</span><strong>${g.p1440}%</strong></div><div class="kpi"><span>4K hierarchy</span><strong>${g.p4k}%</strong></div><div class="tiny">Aggregate native raster FPS: ${g.f1080} / ${g.f1440} / ${g.f4k}</div>`:`<div class="notice">No exact GPU calibration entry. PCDeal falls back to its internal performance score.</div>`}</div>
  <div class="card"><h3>CPU gaming calibration</h3>${c?`<div class="big">${esc(c.key)}</div><div class="kpi"><span>1080p gaming index</span><strong>${c.gaming1080}%</strong></div><div class="kpi"><span>Published street reference</span><strong>${c.streetUSD?"USD $"+c.streetUSD:"Unavailable"}</strong></div>`:`<div class="notice">No exact CPU calibration entry. PCDeal falls back to its internal performance score.</div>`}</div>
 </div>
 <div class="notice" style="margin-top:14px">These are aggregate hierarchy references, not guaranteed FPS for a specific game. PCDeal's game estimator still applies game/preset/resolution modelling on top of the hardware calibration.</div>`;
 host.appendChild(panel);
}
function injectHardware(){
 const host=document.querySelector('body[data-page="hardware"] main.wrap');if(!host||$("dataQualityPanel"))return;
 const b=getBuild(),B=window.PCDealBenchmarks,g=B?.quality(b.gpu,"gpu"),c=B?.quality(b.cpu,"cpu");
 const panel=document.createElement("section");panel.className="panel";panel.id="dataQualityPanel";
 panel.innerHTML=`<h2>Hardware Data Quality</h2><div class="grid2"><div class="card"><h3>CPU</h3><div class="big">${c?.level==="source-backed"?"Source-backed":"Heuristic"}</div><div class="tiny">${c?.source?`Calibrated from ${esc(c.source.name)}.`:"Recognized from PCDeal's hardware catalog/fallback model."}</div></div><div class="card"><h3>GPU</h3><div class="big">${g?.level==="source-backed"?"Source-backed":"Heuristic"}</div><div class="tiny">${g?.source?`Calibrated from ${esc(g.source.name)}.`:"Recognized from PCDeal's hardware catalog/fallback model."}</div></div></div><div class="actions"><a class="btn secondary" href="data.html">Open Data Lab</a></div>`;
 host.appendChild(panel);
}
document.addEventListener("DOMContentLoaded",()=>{injectPerformance();injectHardware()});
})();