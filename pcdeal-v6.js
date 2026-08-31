(()=>{
"use strict";
const $=id=>document.getElementById(id), qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const BUILD_KEY="pcdeal.v5.build", DEALS_KEY="pcdeal.v5.deals";
const getBuild=()=>{try{return JSON.parse(localStorage.getItem(BUILD_KEY))||{}}catch{return {}}};
const esc=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function toast(title,msg=""){let stack=qs(".v6-toast-stack");if(!stack){stack=document.createElement("div");stack.className="v6-toast-stack";document.body.append(stack)}const t=document.createElement("div");t.className="v6-toast";t.innerHTML=`<strong>${esc(title)}</strong>${msg?`<span>${esc(msg)}</span>`:""}`;stack.append(t);setTimeout(()=>t.remove(),3600)}
window.PCDealToast=toast;
function b64url(obj){const bytes=new TextEncoder().encode(JSON.stringify(obj));let bin="";bytes.forEach(b=>bin+=String.fromCharCode(b));return btoa(bin).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}
function from64(s){s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";const bin=atob(s),bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));return JSON.parse(new TextDecoder().decode(bytes))}
function shareBuild(){const b=getBuild();if(!Object.keys(b).length)return toast("Nothing to share","Analyze a PC first.");const url=new URL(location.href);url.pathname=url.pathname.replace(/[^/]*$/,"");url.search="";url.hash="pcdeal="+b64url(b);navigator.clipboard?.writeText(url.href).then(()=>toast("Share link copied","Anyone opening it can load this build.")).catch(()=>prompt("Copy this share link:",url.href))}
function loadShared(){if(!location.hash.startsWith("#pcdeal="))return;try{const b=from64(location.hash.slice(8));localStorage.setItem(BUILD_KEY,JSON.stringify(b));if(document.body.dataset.page||location.pathname.endsWith("/")||location.pathname.endsWith("index.html")){for(const [k,v] of Object.entries(b)){const e=$(k);if(e&&v!=null&&(typeof v!=="object"))e.value=v}toast("Shared build loaded","PCDeal restored the shared hardware data.");history.replaceState(null,"",location.pathname+location.search)}}catch(e){toast("Couldn’t load share link","The build link may be incomplete.")}}
function theme(){const themes=["purple","blue","green"];let cur=localStorage.getItem("pcdeal.v6.theme")||"purple";document.documentElement.dataset.theme=cur;return()=>{cur=themes[(themes.indexOf(cur)+1)%themes.length];localStorage.setItem("pcdeal.v6.theme",cur);document.documentElement.dataset.theme=cur;toast("Theme changed",cur[0].toUpperCase()+cur.slice(1))}}
function utilityBar(){const bar=document.createElement("div");bar.className="v6-tools";bar.innerHTML='<button class="v6-tool secondary" id="v6Share">↗ Share</button><button class="v6-tool secondary" id="v6Theme">◐ Theme</button>';document.body.append(bar);$("v6Share").onclick=shareBuild;$("v6Theme").onclick=theme()}
function confidence(b){const fields=[['CPU','cpu',b.cpu?96:0],['GPU','gpu',b.gpu?96:0],['RAM','ram',b.ram?92:0],['Storage','storageSize',(b.storageSize||(b.drives||[]).length)?90:0],['Motherboard','motherboard',b.motherboard?84:0],['PSU','psu',b.psu?82:0],['Cooling','cooler',b.cooler?78:0],['Case','caseQuality',b.caseQuality?76:0]];return fields}
function visualizerParts(b){
 const storage=b.storageSize||((b.drives||[])[0]?.size)||"";
 const entries=[
  ["v6-cpu","🧠","CPU",b.cpu],
  ["v6-ram","🧩","RAM",[b.ram,b.ramType].filter(Boolean).join(" ")],
  ["v6-mobo","🧱","Motherboard",b.motherboard],
  ["v6-gpu","🎮","GPU",b.gpu],
  ["v6-ssd","💾","Storage",storage],
  ["v6-psu","⚡","PSU",b.psu],
  ["v6-cooling","❄️","Cooling",b.cooler],
  ["v6-casepart","🖥️","Case",b.caseQuality]
 ];
 return entries.map(([cls,icon,label,value])=>{
   const ok=!!String(value||"").trim();
   const shown=ok?value:"Not detected";
   return `<div class="v6-part ${cls} ${ok?"detected":"missing"}" data-v6-part="${label.toLowerCase()}">
     <div>
       <div class="v6-part-icon">${icon}</div>
       <b>${esc(label)}</b>
       <small>${esc(shown)}</small>
     </div>
     <div class="v6-part-status">${ok?"✓ Detected":"— Missing"}</div>
   </div>`;
 }).join("");
}
function visualizerConfidence(b){
 return confidence(b).map(([n,k,v])=>`<div class="v6-conf-row"><span>${n}</span><div class="v6-conf-track"><div class="v6-conf-fill" style="width:${v}%"></div></div><strong>${v?v+"%":"—"}</strong></div>`).join("");
}
function renderVisualizer(){
 const panel=$("v6Visualizer");
 if(!panel)return;
 const b=getBuild();
 const parts=qs(".v6-parts-grid",panel);
 const conf=qs(".v6-confidence",panel);
 if(parts)parts.innerHTML=visualizerParts(b);
 if(conf)conf.innerHTML=visualizerConfidence(b);
 const detected=confidence(b).filter(x=>x[2]>0).length;
 const status=qs("[data-v6-build-status]",panel);
 if(status)status.textContent=detected?`${detected}/8 components recognized`:"Waiting for a listing";
}
function visualizer(){
 if(!$("detectedSection"))return;
 if(!$("v6Visualizer")){
   const panel=document.createElement("section");
   panel.className="panel";
   panel.id="v6Visualizer";
   panel.innerHTML=`<h2>PC Build Visualizer</h2>
   <div class="sub">A clean visual map of the hardware PCDeal currently knows about. Missing parts stay dim instead of pretending they were detected.</div>
   <div class="v6-pc">
     <div class="v6-case">
       <div class="v6-case-label"><strong>Detected System</strong><span data-v6-build-status>Waiting for a listing</span></div>
       <div class="v6-parts-grid"></div>
     </div>
   </div>
   <div class="v6-panel"><h3 style="margin-top:0">Detection confidence</h3><div class="v6-confidence"></div></div>`;
   $("detectedSection").after(panel);
 }
 renderVisualizer();

 const refresh=()=>setTimeout(renderVisualizer,140);
 ["cpu","gpu","ram","ramType","storageType","storageSize","motherboard","psu","cooler","caseQuality"]
   .forEach(id=>{
     const e=$(id);
     if(!e||e.__v6VisualHooked)return;
     e.__v6VisualHooked=true;
     e.addEventListener("input",refresh);
     e.addEventListener("change",refresh);
   });

 ["detectButton","analyzeButton"].forEach(id=>{
   const e=$(id);
   if(!e||e.__v6VisualHooked)return;
   e.__v6VisualHooked=true;
   e.addEventListener("click",()=>{
     setTimeout(renderVisualizer,180);
     setTimeout(renderVisualizer,420);
   });
 });
}
function dashboardChart(){if(document.body.dataset.page!=="dashboard"||$("v6ScoreChart"))return;const api=window.PCDEAL_V5,b=getBuild();if(!api||!Object.keys(b).length)return;let o;try{o=api.overall(b)}catch{return}const metrics=[['Value',o.value],['Gaming',o.gaming],['Parts',o.quality],['Upgrade',o.upgrade],['Seller',o.seller]];const p=document.createElement("section");p.className="panel";p.id="v6ScoreChart";p.innerHTML=`<h2>Score Breakdown</h2><div class="sub">See what is helping or hurting the overall PCDeal score.</div><div class="v6-chart">${metrics.map(([n,v])=>`<div class="v6-chart-row"><span>${n}</span><div class="v6-chart-track"><div class="v6-chart-fill" style="width:${Math.max(0,Math.min(100,Number(v)||0))}%"></div></div><strong>${Math.round(Number(v)||0)}</strong></div>`).join("")}</div><div class="v6-actions"><button id="v6Report" class="secondary">Export Deal Report</button><button id="v6ShareDash" class="secondary">Copy Share Link</button></div>`;qs("main.wrap")?.append(p);$("v6Report").onclick=()=>location.href="report.html";$("v6ShareDash").onclick=shareBuild}
function offerLadder(){if(document.body.dataset.page!=="buying"||$("v6OfferLadder"))return;const api=window.PCDEAL_V5,b=getBuild();if(!api||!Object.keys(b).length)return;let est=0;try{est=api.estimateSystem(b)}catch{};const ask=Number(b.price)||0;if(!est)return;const p=document.createElement("section");p.className="panel";p.id="v6OfferLadder";p.innerHTML=`<h2>Offer Ladder</h2><div class="sub">A quick negotiation range based on PCDeal’s internal value model, not a live marketplace quote.</div><div class="v6-grid4"><div class="v6-mini"><span>Opening offer</span><strong>$${Math.round(est*.78)}</strong></div><div class="v6-mini"><span>Strong buy</span><strong>$${Math.round(est*.86)}</strong></div><div class="v6-mini"><span>Fair ceiling</span><strong>$${Math.round(est*.94)}</strong></div><div class="v6-mini"><span>Current ask</span><strong>${ask?"$"+Math.round(ask):"—"}</strong></div></div>`;qs("main.wrap")?.append(p)}
function onboarding(){if(localStorage.getItem("pcdeal.v6.onboarded"))return;const d=document.createElement("div");d.className="v6-modal-backdrop";d.innerHTML=`<div class="v6-modal"><div class="eyebrow">Welcome to PCDeal V6</div><h2>Analyze → Compare → Inspect → Buy smarter</h2><p>Paste a listing in Analyzer. PCDeal can estimate value and gaming performance, flag missing specs, compare PCs, plan upgrades, save deals, and now sync selected data with a Firebase account.</p><div class="v6-actions"><button id="v6Start">Start using PCDeal</button></div></div>`;document.body.append(d);$("v6Start").onclick=()=>{localStorage.setItem("pcdeal.v6.onboarded","1");d.remove()}}
function accountBadge(){const add=u=>{qsa('a[href="account.html"]').forEach(a=>{a.textContent=u?(u.displayName?.split(' ')[0]||'Account'):'Account'})};const hook=()=>window.PCDealFirebase?.onAuth(add);window.PCDealFirebase?hook():window.addEventListener("pcdeal-firebase-ready",hook,{once:true})}
function registerPWA(){if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})}
document.addEventListener("DOMContentLoaded",()=>{loadShared();utilityBar();visualizer();dashboardChart();offerLadder();onboarding();accountBadge();registerPWA()});
})();
