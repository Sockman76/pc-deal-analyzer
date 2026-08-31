
// PCDeal V8 — evidence-weighted detection confidence + Smart Insights
(() => {
"use strict";
const $=id=>document.getElementById(id);
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
function text(){return $("listingText")?.value||""}
function val(id){return $(""+id)?.value?.trim?.()||""}
function labelled(raw,terms){return new RegExp(`(?:^|\\n|•|\\|)\\s*(?:${terms.join("|")})\\s*[:\\-]`,"i").test(raw)}
function exactToken(raw,value){if(!value)return false;const c=window.PCDealAliases?.canonicalKey?.(value)||String(value).toLowerCase().replace(/\W/g,"");const r=(window.PCDealAliases?.canonicalKey?.(raw)||String(raw).toLowerCase().replace(/\W/g,""));return c.length>=4&&r.includes(c)}
function confidence(){
 const raw=text(), cpu=val("cpu"),gpu=val("gpu"),ram=val("ram"),rtype=val("ramType"),mobo=val("motherboard"),psu=val("psu"),cooler=val("cooler"),caseQ=val("caseQuality");
 const rd=window.detectRamDetails?.(raw)||{}, pd=window.detectPSUDetails?.(raw), md=window.detectMotherboardDetails?.(raw), drives=window.detectStorageDetails?.(raw)||[];
 const manual=id=>document.activeElement?.id===id; // manual current editing is intentionally not called "detected".
 function modelConf(kind,value,dbExact,labelTerms){
   if(!value)return 0;
   let x=40;
   if(dbExact)x+=26;
   if(exactToken(raw,value))x+=16;
   if(labelled(raw,labelTerms))x+=11;
   if(manual(kind))x-=5;
   return clamp(x,35,98);
 }
 const c={
   CPU:modelConf("cpu",cpu,!!window.findCPU?.(cpu),["cpu","processor"]),
   GPU:modelConf("gpu",gpu,!!window.findGPU?.(gpu),["gpu","graphics","graphics card"]),
   RAM:!ram?0:clamp(48+(rd.capacityGB?18:0)+(rtype?10:0)+(rd.sticks?8:0)+(rd.speed?6:0)+(labelled(raw,["ram","memory"])?8:0),45,97),
   Storage:drives.length?clamp(58+(drives[0]?.type?15:0)+(drives[0]?.size?14:0)+(labelled(raw,["storage","ssd","hdd"])?7:0),50,96):val("storageSize")?55:0,
   Motherboard:!mobo?0:clamp(43+(md?.chipset?24:0)+(md?.brand?12:0)+(labelled(raw,["motherboard","mobo"])?12:0),40,96),
   PSU:!psu?0:clamp(38+(pd?.brand?14:0)+(pd?.wattage?18:0)+(pd?.tier&&pd.tier!=="Unknown"?15:0)+(labelled(raw,["psu","power supply"])?10:0),35,96),
   Cooling:!cooler?0:clamp(42+(/\d{3}mm|nh-d15|ak620|peerless|phantom|kraken|liquid freezer/i.test(cooler)?28:0)+(labelled(raw,["cooler","cpu cooler"])?12:0),38,91),
   Case:!caseQ?0:clamp(40+(/4000d|5000d|o11|fractal|nzxt|ch560/i.test(raw)?30:0)+(labelled(raw,["case","chassis"])?12:0),35,90)
 };
 const vals=Object.values(c), detected=vals.filter(Boolean), overall=detected.length?Math.round(detected.reduce((a,b)=>a+b,0)/vals.length):0;
 return {parts:c,overall,coverage:Math.round(detected.length/vals.length*100)};
}
function renderConfidenceV8(){
 const c=confidence();
 const map={CPU:"cpu",GPU:"gpu",RAM:"ram",Storage:"storage",Motherboard:"motherboard",PSU:"psu",Cooling:"cooling",Case:"case"};
 for(const [name,key] of Object.entries(map)){
   const row=document.querySelector(`.v6-conf-row span:first-child`) // fallback only; rebuilt below when visualizer exists
 }
 const host=document.querySelector(".v6-confidence");
 if(host)host.innerHTML=Object.entries(c.parts).map(([n,v])=>`<div class="v6-conf-row"><span>${n}</span><div class="v6-conf-track"><div class="v6-conf-fill" style="width:${v}%"></div></div><strong>${v?v+"%":"—"}</strong></div>`).join("");
 const old=$("confidenceValue");if(old)old.textContent=`${c.overall}%`;
 const bar=$("confidenceFill");if(bar)bar.style.width=`${c.overall}%`;
 const note=$("confidenceNote");if(note)note.textContent=`${c.coverage}% of major component categories are identified. Percentages reflect evidence quality, not seller truthfulness.`;
}
function smartInsights(){
 const s=window.PCDealV8?.state?.()||{},fit=window.PCDealV8?.usageFit?.(s,s.usageProfile||"gaming");
 const flags=[];
 const comp=window.motherboardCompatibility?.(s.cpu,s.motherboard,s.ramType);
 if(comp?.issues?.length)flags.push(...comp.issues.map(x=>"Compatibility: "+x));
 const psu=window.detectPSUDetails?.(s.listing||s.psu||"");
 if(!s.psu)flags.push("PSU model is missing; wattage and quality cannot be verified.");
 else if(psu?.tier==="Unknown")flags.push("PSU is identified, but its quality tier is not confidently known.");
 const rd=window.detectRamDetails?.(s.listing||"");
 if(rd?.sticks===1)flags.push("Single-stick RAM configuration can reduce memory bandwidth and 1% low FPS.");
 if(parseInt(s.ram)<16)flags.push("Less than 16GB RAM may cause modern gaming and multitasking limitations.");
 const p=window.PCDealV8?.gpuScores?.(s);
 if((s.usageProfile==="ai"||s.usageProfile==="render")&&p?.brand!=="NVIDIA")flags.push("Professional GPU suitability can differ from gaming performance because application/API support matters.");
 return {fit,flags};
}
function renderSmart(){
 const s=window.PCDealV8?.state?.()||{},x=smartInsights(),profile=s.usageProfile||"gaming";
 const f1080=window.PCDealV8?.fpsEstimate?.(s,{game:"Fortnite",resolution:"1080",preset:"high"});
 const f1440=window.PCDealV8?.fpsEstimate?.(s,{game:"Fortnite",resolution:"1440",preset:"high"});
 if($("fps1080"))$("fps1080").textContent=f1080?`~${f1080.avg} FPS`:"—";
 if($("fps1440"))$("fps1440").textContent=f1440?`~${f1440.avg} FPS`:"—";
 if($("fpsNote"))$("fpsNote").textContent=f1440?`Quick gaming reference • model confidence ${f1440.confidence}% • use the Performance page for game/settings controls.`:"Detect a CPU and GPU first.";
 const title=document.querySelector("#v3Insights h2");if(title)title.textContent="Smart System Insights";
 const sub=document.querySelector("#v3Insights .sub");if(sub)sub.textContent="Evidence-weighted quick checks. Benchmark-calibrated where data exists; unknown information stays unknown.";
 let box=$("v8UseInsight");
 if(!box&&$("v3Insights")){box=document.createElement("div");box.id="v8UseInsight";box.className="notice";$("v3Insights").appendChild(box)}
 if(box&&x.fit)box.innerHTML=`<strong>${x.fit.label}: ${x.fit.score}/100 — ${x.fit.grade}</strong><br>${x.fit.note}${x.flags.length?`<br><br><strong>Verify:</strong> ${x.flags.join(" ")}`:""}`;
 renderConfidenceV8();
}
window.PCDealConfidenceV8=confidence;
window.PCDealRenderV8Insights=renderSmart;
document.addEventListener("DOMContentLoaded",()=>{
 const go=()=>setTimeout(renderSmart,180);
 ["detectButton","analyzeButton"].forEach(id=>$(id)?.addEventListener("click",go));
 ["cpu","gpu","ram","ramType","storageType","storageSize","motherboard","psu","cooler","caseQuality","usageProfile"].forEach(id=>{$(id)?.addEventListener("change",go);$(id)?.addEventListener("input",go)});
 go();
});
})();