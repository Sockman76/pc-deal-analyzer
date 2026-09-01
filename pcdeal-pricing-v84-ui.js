// PCDeal V8.4 — Hardware pricing intelligence UI
(() => {
"use strict";
const $=id=>document.getElementById(id),A=()=>window.PCDealPricingAI;
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function build(){try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}}
function price(v,c){return A().money(v,c)}
function rowHtml(x){
 const stats=x.listingStats||{};
 const market=stats.count>=3?`${stats.count} relevant active listings • median ${price(stats.median,x.currency)}`:"No strong live listing cluster";
 return `<div class="market-part-card">
   <div class="market-part-head"><div><span class="tag">${esc(x.kind)}</span><h3>${esc(x.name)}</h3></div><div class="market-confidence"><strong>${x.confidence}%</strong><span>price confidence</span></div></div>
   <div class="market-price-grid">
    <div><span>Fair used</span><strong>${price(x.fair,x.currency)}</strong><small>${price(x.fairLow,x.currency)}–${price(x.fairHigh,x.currency)}</small></div>
    <div><span>Quick sale</span><strong>${price(x.quickSale,x.currency)}</strong><small>Faster-sale target</small></div>
    <div><span>Great buy</span><strong>≤ ${price(x.greatBuy,x.currency)}</strong><small>Strong buyer value</small></div>
    <div><span>High asking</span><strong>≥ ${price(x.overpriced,x.currency)}</strong><small>Worth extra scrutiny</small></div>
   </div>
   <div class="market-evidence"><strong>Evidence</strong><span>${esc(market)}</span><span>${esc(x.explanation)}</span></div>
 </div>`;
}
async function run(){
 const b=build(),parts=A().partList(b),host=$("marketPartResults"),status=$("marketRunStatus");
 if(!parts.length){status.textContent="Analyze a PC first.";return}
 status.textContent="Building market evidence…";host.innerHTML="";
 const results=[];
 for(const [kind,name] of parts){
   status.textContent=`Checking ${kind}: ${name}…`;
   results.push(await A().analyzePart(kind,name,b,{live:true}));
 }
 host.innerHTML=results.map(rowHtml).join("");
 const sys=A().systemSummary(results,b);window._pcdealMarketResults={parts:results,system:sys,build:b};
 $("systemFair").textContent=price(sys.fair,b.currency||"CAD");
 $("systemRange").textContent=`${price(sys.fairLow,b.currency||"CAD")}–${price(sys.fairHigh,b.currency||"CAD")}`;
 $("systemQuick").textContent=price(sys.quickSale,b.currency||"CAD");
 $("systemGreat").textContent=`≤ ${price(sys.greatBuy,b.currency||"CAD")}`;
 $("systemPartOut").textContent=price(sys.partFair,b.currency||"CAD");
 if(sys.askingPrice){
   $("systemAsking").textContent=price(sys.askingPrice,b.currency||"CAD");
   $("systemDelta").textContent=sys.dealPct==null?"—":`${sys.dealPct>=0?"+":""}${sys.dealPct.toFixed(1)}% value vs asking`;
 }else{$("systemAsking").textContent="Not detected";$("systemDelta").textContent="Add an asking price in Analyzer."}
 status.textContent=`Market analysis complete • ${results.length} priced component categories.`;
 $("aiPriceButton").disabled=false;
}
async function ai(){
 const x=window._pcdealMarketResults;if(!x){$("aiPriceText").textContent="Run market analysis first.";return}
 const btn=$("aiPriceButton"),box=$("aiPriceText");btn.disabled=true;box.textContent="AI is reviewing the price evidence…";
 try{
   const res=await A().aiExplain({build:{cpu:x.build.cpu,gpu:x.build.gpu,ram:x.build.ram,ramType:x.build.ramType,motherboard:x.build.motherboard,psu:x.build.psu,cooler:x.build.cooler,storage:x.build.storageSize,askingPrice:x.build.askingPrice,currency:x.build.currency||"CAD"},parts:x.parts,system:x.system});
   box.innerHTML=`<strong>${esc(res.verdict||"AI pricing review")}</strong><p>${esc(res.summary||"")}</p>${Array.isArray(res.reasons)&&res.reasons.length?`<ul>${res.reasons.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>`:""}<div class="tiny">AI confidence: ${Number(res.confidence)||0}% • AI is constrained to the supplied price evidence and should not invent missing market prices.</div>`;
 }catch(e){
   box.textContent=`AI pricing explanation is not configured yet: ${e.message}`;
 }
 btn.disabled=false;
}
function inject(){
 const host=document.querySelector('body[data-page="hardware"] main.wrap');if(!host||$("marketPricingV84"))return;
 document.getElementById("realPricingPanel")?.remove();
 const sec=document.createElement("section");sec.className="panel";sec.id="marketPricingV84";
 sec.innerHTML=`<div class="section-heading"><div><div class="eyebrow">Pricing intelligence</div><h2>What are these parts actually worth?</h2><div class="sub">PCDeal separates internal used value, active used-listing evidence, new-price references and optional AI reasoning.</div></div><div class="actions"><button id="runMarketPricing">Analyze Market Prices</button><a class="btn secondary" href="retail.html">New Retail</a></div></div>
 <div class="notice">AI does not create the prices. The price engine builds the evidence first; AI can then explain whether the result makes sense and what evidence is weak.</div>
 <div class="system-market-summary">
   <div><span>Whole-PC fair value</span><strong id="systemFair">—</strong><small id="systemRange">Run analysis</small></div>
   <div><span>Quick-sale PC</span><strong id="systemQuick">—</strong><small>Liquidity-adjusted</small></div>
   <div><span>Great-buy threshold</span><strong id="systemGreat">—</strong><small>Buyer-side target</small></div>
   <div><span>Part-out midpoint</span><strong id="systemPartOut">—</strong><small>Before selling friction</small></div>
   <div><span>Seller asking</span><strong id="systemAsking">—</strong><small id="systemDelta"></small></div>
 </div>
 <div class="tiny" id="marketRunStatus">Press Analyze Market Prices after detecting the PC.</div>
 <div id="marketPartResults" class="market-part-list"></div>
 <div class="ai-pricing-card"><div class="section-heading"><div><div class="eyebrow">Optional AI review</div><h3>PCDeal AI Pricing Analyst</h3><div class="sub">Explains the evidence; it is instructed not to invent unsupported prices.</div></div><button id="aiPriceButton" class="secondary" disabled>Ask AI to Review Prices</button></div><div id="aiPriceText" class="notice">Run market analysis first.</div></div>`;
 host.prepend(sec);
 $("runMarketPricing").onclick=run;$("aiPriceButton").onclick=ai;
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(inject,120));
})();