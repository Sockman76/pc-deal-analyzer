(()=>{"use strict";
const $=s=>document.querySelector(s);
const cash=n=>"$"+Math.round(Number(n)||0).toLocaleString("en-CA");
const catLabel={cpu:"CPU",gpu:"GPU",memory:"RAM",motherboard:"Motherboard",storage:"Storage",psu:"PSU","cpu-cooler":"Cooler",case:"Case"};
const icon={cpu:"🧠",gpu:"🎨",memory:"🧩",motherboard:"🔧",storage:"💾",psu:"⚡","cpu-cooler":"❄️",case:"🖥️"};

function scoreFor(ratio){
 if(ratio<=.70)return 95;if(ratio<=.80)return 90;if(ratio<=.90)return 85;if(ratio<=1)return 78;
 if(ratio<=1.10)return 68;if(ratio<=1.20)return 55;if(ratio<=1.35)return 45;return 35;
}
function verdictFor(score){
 if(typeof window.getDealVerdict==="function")return window.getDealVerdict(score);
 if(score>=90)return{emoji:"🔥",text:"Excellent deal"};
 if(score>=78)return{emoji:"✅",text:"Good deal"};
 if(score>=68)return{emoji:"👍",text:"Fair"};
 if(score>=55)return{emoji:"⚠️",text:"A little high"};
 return{emoji:"❌",text:"Overpriced"};
}
function build(){
 const s=window.PCDealCanonicalBuildV108||{};
 return {
  cpu:s.cpu||"",gpu:s.gpu||"",
  ram:s.ram||"",ramType:s.ramType||"",ramSpeed:s.ramSpeed||"",ramModel:s.ramModel||"",
  motherboard:s.motherboard||"",storageType:s.storageType||"",storageSize:s.storageSize||"",storageModel:s.storageModel||"",
  psu:s.psu||"",cooler:s.cooler||"",caseName:s.caseName||""
 };
}
async function run(){
 const legacy=window.PCDealLegacyEstimateV112, svc=window.PCDealPricingServiceV11;
 if(!legacy||!svc)return;
 const retail=await svc.priceBuild(build());
 const byCat=Object.fromEntries((retail.parts||[]).map(p=>[p.category,p]));
 const cats=["cpu","gpu","memory","motherboard","storage","psu","cpu-cooler","case"];
 const parts=cats.map(category=>{
   const rp=byCat[category], retailUsed=rp?.used?.fair_used;
   const fallback=Number(legacy[category])||0;
   const value=Number.isFinite(retailUsed)?retailUsed:fallback;
   const evidence=Number.isFinite(retailUsed)?"retail-derived":"legacy fallback";
   const confidence=Number.isFinite(retailUsed)?Math.max(45,Math.min(85,rp?.retail_record?.match_confidence||60)):25;
   return {category,value,evidence,confidence,newRetail:rp?.new_retail||null,name:rp?.name||""};
 });
 const raw=parts.reduce((a,p)=>a+p.value,0);
 const condition=Number(legacy.conditionMultiplier)||1;
 // Whole-system adjustment: slight part-out discount; prevents pretending 8 individually sold parts equal turnkey cash value.
 const bundleAdjustment=0.98;
 const fair=Math.round(raw*condition*bundleAdjustment);
 const low=Math.round(fair*.94), high=Math.round(fair*1.06);
 const asking=Number(legacy.askingPrice)||0, ratio=asking/Math.max(fair,1);
 const score=scoreFor(ratio), verdict=verdictFor(score);
 const offer=Math.min(asking,Math.round((fair*.85)/10)*10);
 const confidence=Math.round(parts.reduce((a,p)=>a+p.confidence,0)/parts.length);
 const retailCount=parts.filter(p=>p.evidence==="retail-derived").length;
 const fallbackCount=8-retailCount;

 const scoreEl=$("#score"),verdictEl=$("#verdict"),rt=$("#resultText");
 if(scoreEl)scoreEl.textContent=`${score}/100`;
 if(verdictEl)verdictEl.textContent=`${verdict.emoji} ${verdict.text}`;
 if(!rt)return;

 const heading=rt.querySelector("strong")?.textContent?.trim()||"Detected PC";
 const gamingMatch=rt.innerHTML.match(/🎮[\s\S]*?(?=<br><br>|🧠|$)/i);
 const platformMatch=rt.innerHTML.match(/🔧\s*<strong>CPU socket:<\/strong>[\s\S]*?(?=<br><br>|🧠|$)/i);
 const balanceText=[...rt.childNodes].map(n=>n.textContent||"").join(" ");

 const lines=parts.map(p=>{
   const note=p.evidence==="retail-derived"
    ? `${p.newRetail?cash(p.newRetail)+" current new → ":""}${cash(p.value)} used`
    : `${cash(p.value)} fallback • low confidence`;
   return `${icon[p.category]} <strong>${catLabel[p.category]} value:</strong> ${note}`;
 }).join("<br>");

 rt.innerHTML=`
   <strong>${heading}</strong><br><br>
   Asking price: <strong>${cash(asking)}</strong><br>
   Estimated complete-PC value: <strong>${cash(low)} – ${cash(high)}</strong><br><br>
   📊 <strong>Estimate confidence:</strong> ${confidence}% • retail coverage ${retailCount}/8 • ${fallbackCount} fallback${fallbackCount===1?"":"s"}<br><br>
   ${gamingMatch?gamingMatch[0]:""}
   ${platformMatch?"<br>"+platformMatch[0]:""}
   <br><br>${lines}<br><br>
   🧮 <strong>Complete-system adjustment:</strong> ${(bundleAdjustment*100).toFixed(0)}% of component cash value<br>
   💬 <strong>Suggested starting offer:</strong> ${cash(offer)}
 `;
 let diag=$("#v112pricing");if(diag)diag.remove();
 diag=document.createElement("div");diag.id="v112pricing";diag.style.cssText="margin-top:18px;padding:14px;border:1px solid #573b71;border-radius:12px;background:#100a16";
 diag.innerHTML=`<strong>Pricing evidence</strong><br>Retail-backed: ${retailCount}/8 • Fallback: ${fallbackCount}/8<br>`+
 parts.map(p=>`${catLabel[p.category]}: ${p.evidence}${p.newRetail?` • new ${cash(p.newRetail)}`:""} • used ${cash(p.value)}`).join("<br>");
 rt.appendChild(diag);

 window.PCDealEstimatorV112={parts,raw,condition,bundleAdjustment,fair,low,high,asking,ratio,score,verdict,offer,confidence,retailCount,fallbackCount};
}
document.addEventListener("click",e=>{if(/Analyze Deal/i.test(e.target?.textContent||""))setTimeout(()=>run().catch(console.error),180)},true);
window.addEventListener("pcdeal-canonical-build-v108",()=>setTimeout(()=>run().catch(()=>{}),100));
window.PCDealAnalyzerV112={run};
})();