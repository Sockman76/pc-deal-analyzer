
(()=>{"use strict";
const CATS=["cpu","gpu","memory","motherboard","storage","psu","cpu-cooler","case"];
const labels={cpu:"CPU",gpu:"GPU",memory:"RAM",motherboard:"Motherboard",storage:"Storage",psu:"Power Supply","cpu-cooler":"CPU Cooler",case:"Case"};
const icons={cpu:"🧠",gpu:"🎮",memory:"🧩",motherboard:"🛠️",storage:"💾",psu:"⚡","cpu-cooler":"❄️",case:"🖥️"};
const fallback={cpu:220,gpu:420,memory:120,motherboard:120,storage:100,psu:80,"cpu-cooler":55,case:60};
const state={listing:"",parts:{},asking:0,currency:"CAD",condition:"Good"};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const cash=n=>"$"+Math.round(Number(n)||0).toLocaleString("en-CA");
const norm=s=>String(s||"").replace(/[®™]/g,"").replace(/\s+/g," ").trim();
function lines(t){return String(t||"").split(/\n|•|\|/).map(x=>norm(x)).filter(Boolean)}
function lineMatch(ls,rx){return ls.find(x=>rx.test(x))||""}
function detect(listing){
 const ls=lines(listing), t=" "+listing.replace(/\n/g," ")+" ";
 const cpu=lineMatch(ls,/\b(?:ryzen\s+[3579]\s+\d{4,5}[a-z0-9]*|core\s+(?:ultra\s+)?[3579]\s+[- ]?\d{4,5}[a-z]*|i[3579][- ]?\d{4,5}[a-z]*)\b/i);
 const gpu=lineMatch(ls,/\b(?:rtx|gtx)\s*\d{3,4}(?:\s*(?:ti|super))?|\brx\s*\d{3,4}(?:\s*xt|\s*gre)?|\barc\s+[ab]\d{3}\b/i);
 const mem=lineMatch(ls,/\b(?:ddr[345]|(?:8|16|24|32|48|64|96|128)\s*gb).*(?:ram|memory|ddr[345])|(?:ram|memory).*(?:ddr[345]|\d+\s*gb)/i);
 const mb=lineMatch(ls,/\b(?:a320|a520|a620|b350|b450|b550|b650e?|b840|b850|x370|x470|x570|x670e?|x870e?|h\d{3}|b\d{3}|z\d{3}|w\d{3})\b/i);
 const st=lineMatch(ls,/\b(?:nvme|m\.?2|ssd|hdd|hard\s*drive|sn\d{3,4}|990\s*pro|9100\s*pro|nm790|nv[23])\b/i);
 const ps=lineMatch(ls,/\b(?:psu|power\s*supply|rm\d{3,4}[ex]?|a\d{3,4}gl|pure\s*power|hydro\s*g|sf\d{3,4})\b|\b(?:450|500|550|600|650|700|750|800|850|900|1000|1200|1300|1500|1600)\s*w\b/i);
 const cool=lineMatch(ls,/\b(?:aio|liquid\s*cool|water\s*cool|ak\d{3,4}|nh-d\d+|peerless\s*assassin|phantom\s*spirit|hyper\s*212|240\s*mm|280\s*mm|360\s*mm|420\s*mm)\b/i);
 const cs=lineMatch(ls,/\b(?:case|chassis|4000d|5000d|fractal\s+north|meshify|define|h\d{3,4}|o11|y70|y60|ap201|pop\s+(?:air|mini)|macube|ch160|ch170|cc550|frame\s*4000d)\b/i);
 const price=(listing.match(/\$\s*([0-9][0-9,]*(?:\.\d{1,2})?)/)||[])[1];
 const ramType=(mem.match(/\bDDR[345]\b/i)||[])[0]||"";
 // Strict speed rule: ONLY RAM-context MHz/MT/s or DDRx-####. Bare 5070 can never become RAM speed.
 let ramSpeed="";
 let m=mem.match(/\b(?:DDR[345]\s*[- ]\s*)?([3-9]\d{3})\s*(?:MHz|MT\/s|MTs)?\b/i);
 if(m && (/\b(?:MHz|MT\/s|MTs)\b/i.test(mem)||/\bDDR[345]\s*[- ]\s*\d{4}\b/i.test(mem)))ramSpeed=m[1];
 if(!ramSpeed){
   const rx=/\b(?:DDR[345]\s*[- ]\s*([3-9]\d{3})|([3-9]\d{3})\s*(?:MHz|MT\/s|MTs))\b/ig;let z;
   while((z=rx.exec(listing))){const candidate=z[1]||z[2];const near=listing.slice(Math.max(0,z.index-80),z.index+100);if(/\b(?:ram|memory|ddr[345]|gb)\b/i.test(near)){ramSpeed=candidate;break}}
 }
 const capacity=(mem.match(/\b(8|16|24|32|48|64|96|128)\s*GB\b/i)||[])[1]||"";
 const cl=(mem.match(/\bCL\s*([0-9]{2})\b/i)||[])[1]||"";
 return {
  cpu:{name:cpu,confidence:cpu?93:0},
  gpu:{name:gpu,confidence:gpu?93:0},
  memory:{name:mem,confidence:mem?90:0,capacity:capacity?capacity+"GB":"",type:ramType.toUpperCase(),speed:ramSpeed,cl:cl?("CL"+cl):""},
  motherboard:{name:mb,confidence:mb?88:0},
  storage:{name:st,confidence:st?90:0},
  psu:{name:ps,confidence:ps?90:0},
  "cpu-cooler":{name:cool,confidence:cool?86:0},
  case:{name:cs,confidence:cs?82:0},
  asking:price?Number(price.replace(/,/g,"")):0
 };
}
function partName(cat,p){
 if(cat==="memory"){
   return norm([p.name,p.capacity,p.type,p.speed?`${p.speed}MHz`:"",p.cl].filter(Boolean).join(" "));
 }
 return norm(p.name);
}
function validatePart(cat,p,all){
 const issues=[];
 if(!p.name)issues.push("Not detected");
 if(cat==="memory" && p.speed && all.gpu?.name && all.gpu.name.includes(p.speed))issues.push("RAM speed matches GPU model; rejected");
 if(cat==="motherboard" && /^__custom$/i.test(p.name||""))issues.push("Internal custom sentinel rejected");
 return issues;
}
function renderParts(){
 const host=$("#parts");host.innerHTML="";
 for(const cat of CATS){
   const p=state.parts[cat]||{name:"",confidence:0};
   const issues=validatePart(cat,p,state.parts);
   const card=document.createElement("section");card.className="part "+(issues.length?"warn":p.name?"ok":"bad");card.dataset.cat=cat;
   let extras="";
   if(cat==="memory")extras=`<div><div class=lbl>Capacity</div><input data-k=capacity value="${p.capacity||""}"></div><div><div class=lbl>Type</div><input data-k=type value="${p.type||""}"></div><div><div class=lbl>Speed</div><input data-k=speed value="${p.speed||""}" inputmode=numeric></div><div><div class=lbl>CAS</div><input data-k=cl value="${p.cl||""}"></div>`;
   card.innerHTML=`<div class=part-head><span class=ico>${icons[cat]}</span><h3>${labels[cat]}</h3><span class=badge>${issues.length?"NEEDS REVIEW":p.name?"DETECTED":"MISSING"}</span></div>
   <div class=part-grid><div class=wide><div class=lbl>Exact / editable model</div><input data-k=name value="${String(p.name||"").replace(/"/g,"&quot;")}" placeholder="Enter exact ${labels[cat]} model"></div>${extras}</div>
   ${issues.length?`<div class=warningbox>⚠ ${issues.join(" • ")}</div>`:""}
   <div class=evidence data-evidence><strong>Pricing:</strong> waiting for exact model…</div>`;
   host.appendChild(card);
 }
 host.querySelectorAll("input").forEach(inp=>inp.addEventListener("input",e=>{
   const card=e.target.closest(".part"), cat=card.dataset.cat;
   state.parts[cat]=state.parts[cat]||{};
   state.parts[cat][e.target.dataset.k]=e.target.value;
 }));
}
async function priceParts(){
 const results=[];
 for(const cat of CATS){
   const p=state.parts[cat]||{},name=partName(cat,p);
   const issues=validatePart(cat,p,state.parts);
   let out={category:cat,name,value:0,newRetail:null,evidence:"missing",confidence:0};
   if(name && !issues.length && window.PCDealCatalogV114){
     try{
       const r=await PCDealCatalogV114.part(cat,name);
       if(r?.used?.fair_used){
         out={category:cat,name,value:r.used.fair_used,newRetail:r.new_retail||null,evidence:"retail-derived",confidence:r.confidence||60,source:r.source||"Canada Computers"};
       }
     }catch(e){}
   }
   if(!out.value && name){
     out.value=fallback[cat]||50;out.evidence="fallback";out.confidence=20;
   }
   results.push(out);
   const ev=document.querySelector(`.part[data-cat="${cat}"] [data-evidence]`);
   if(ev){
     if(out.evidence==="retail-derived")ev.innerHTML=`<strong>Fair used:</strong> ${cash(out.value)}<br><span>Current new: ${cash(out.newRetail)} • ${out.source||"retail"} • confidence ${out.confidence}%</span>`;
     else if(out.evidence==="fallback")ev.innerHTML=`<strong>Fallback used estimate:</strong> ${cash(out.value)}<br><span>No exact current-new match yet • low confidence</span>`;
     else ev.innerHTML=`<strong>Pricing:</strong> unavailable until a model is entered`;
   }
 }
 return results;
}
function scoreFor(r){if(r<=.70)return 95;if(r<=.80)return 90;if(r<=.90)return 85;if(r<=1)return 78;if(r<=1.10)return 68;if(r<=1.20)return 55;if(r<=1.35)return 45;return 35}
function verdict(s){if(s>=90)return["🔥","Excellent deal"];if(s>=78)return["✅","Good deal"];if(s>=68)return["👍","Fair"];if(s>=55)return["⚠️","A little high"];return["❌","Overpriced"]}
async function analyze(){
 const parts=await priceParts(), raw=parts.reduce((a,p)=>a+p.value,0), condition=state.condition==="Excellent"?1.04:state.condition==="Poor"?.82:1;
 const fair=Math.round(raw*condition*.98), low=Math.round(fair*.94), high=Math.round(fair*1.06), asking=Number($("#asking").value)||state.asking||0;
 const ratio=asking/Math.max(fair,1), score=scoreFor(ratio), [em,vt]=verdict(score), offer=Math.min(asking,Math.round(fair*.85/10)*10);
 const confidence=Math.round(parts.reduce((a,p)=>a+p.confidence,0)/parts.length), retail=parts.filter(p=>p.evidence==="retail-derived").length;
 $("#score").textContent=score+"/100";$("#verdict").textContent=em+" "+vt;$("#usedrange").textContent=cash(low)+" – "+cash(high);$("#offer").textContent=cash(offer);$("#confidence").textContent=confidence+"%";$("#coverage").textContent=retail+"/8";
 $("#breakdown").innerHTML=parts.map(p=>`<div class=row><strong>${labels[p.category]}</strong><span>${cash(p.value)}</span><span class=muted>${p.evidence==="retail-derived"?"Retail → used":"Fallback"}</span><span class=muted>${p.confidence}%</span></div>`).join("");
 $("#result").style.display="block";$("#result").scrollIntoView({behavior:"smooth",block:"start"});
 window.PCDealAnalyzer20Result={parts,raw,fair,low,high,asking,score,offer,confidence,retail};
}
function detectAndFill(){
 state.listing=$("#listing").value;const d=detect(state.listing);state.parts=d;state.asking=d.asking||0;$("#asking").value=state.asking||"";renderParts();
 $("#detectedCount").textContent=CATS.filter(c=>d[c]?.name).length+"/8";$("#ramcheck").textContent=d.memory?.speed?d.memory.speed+" MT/s":"—";$("#mbcheck").textContent=d.motherboard?.name||"—";
}
$("#detect").addEventListener("click",detectAndFill);$("#analyze").addEventListener("click",analyze);$("#clear").addEventListener("click",()=>{location.reload()});
$("#condition").addEventListener("change",e=>state.condition=e.target.value);
window.PCDealAnalyzer20={detect,detectAndFill,analyze,state};
})();