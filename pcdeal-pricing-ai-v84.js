// PCDeal V9 — evidence-first pricing + optional AI explanation
(() => {
"use strict";

const AI_URL_KEY="pcdeal.ai.pricing.functionUrl";
const DEFAULT_AI_URL="https://us-central1-pcdeal-d8f08.cloudfunctions.net/pricingAi";
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const num=v=>Number(v)||0;

function getAiUrl(){return localStorage.getItem(AI_URL_KEY)||DEFAULT_AI_URL}
function setAiUrl(v){
  const x=String(v||"").trim();
  if(x)localStorage.setItem(AI_URL_KEY,x);
  else localStorage.removeItem(AI_URL_KEY);
}
function money(v,currency="CAD"){
  if(!Number.isFinite(Number(v)))return"Unavailable";
  try{return new Intl.NumberFormat("en-CA",{style:"currency",currency,maximumFractionDigits:0}).format(Number(v))}
  catch{return `${currency} $${Math.round(Number(v))}`}
}
function normalizeWords(s){
  return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(/\s+/).filter(x=>x.length>1);
}
function titleMatchScore(query,title){
  const a=new Set(normalizeWords(query)),b=new Set(normalizeWords(title));
  if(!a.size||!b.size)return 0;
  let hit=0; for(const x of a)if(b.has(x))hit++;
  return hit/a.size;
}
function percentile(sorted,p){
  if(!sorted.length)return null;
  const i=(sorted.length-1)*p,lo=Math.floor(i),hi=Math.ceil(i);
  return sorted[lo]+(sorted[hi]-sorted[lo])*(i-lo);
}
function robustStats(rows,query){
  const clean=(rows||[])
    .filter(x=>x?.price&&Number.isFinite(Number(x.price.value)))
    .map(x=>({...x,_match:titleMatchScore(query,x.title),_price:Number(x.price.value)}))
    .filter(x=>x._match>=0.55);
  if(!clean.length)return {rows:[],count:0};
  const prices=clean.map(x=>x._price).sort((a,b)=>a-b);
  const q1=percentile(prices,.25),q3=percentile(prices,.75),iqr=q3-q1;
  const low=Math.max(0,q1-1.5*iqr),high=q3+1.5*iqr;
  const trimmed=clean.filter(x=>x._price>=low&&x._price<=high);
  const finalPrices=(trimmed.length>=3?trimmed:clean).map(x=>x._price).sort((a,b)=>a-b);
  return {
    rows:trimmed.length>=3?trimmed:clean,
    count:finalPrices.length,
    median:percentile(finalPrices,.5),
    q1:percentile(finalPrices,.25),
    q3:percentile(finalPrices,.75),
    min:finalPrices[0],
    max:finalPrices[finalPrices.length-1],
    average:finalPrices.reduce((a,b)=>a+b,0)/finalPrices.length
  };
}
function internalUsed(kind,build){
  const rows=window.PCDEAL_V5?.partBreakdown?.(build)||[];
  const names={CPU:"CPU",GPU:"GPU",RAM:"RAM",Storage:"Storage",Motherboard:"Motherboard",PSU:"PSU",Cooling:"Cooling",Case:"Case"};
  return num(rows.find(x=>x.name===names[kind])?.value);
}
function reference(kind,name,build){
  const obj=kind==="CPU"?window.findCPU?.(name):kind==="GPU"?window.findGPU?.(name):null;
  if(obj?.msrpUSD)return {value:num(obj.msrpUSD),currency:"USD",type:"Launch MSRP",source:"PCDeal catalog"};
  if(kind==="RAM"){
    const gb=parseInt(build.ram)||0;
    return gb?{value:gb*(build.ramType==="DDR5"?3:2),currency:"CAD",type:"New-build reference",source:"PCDeal planning model"}:null;
  }
  if(kind==="Storage"){
    let cap=parseFloat(build.storageSize)||0;if(/TB/i.test(build.storageSize||""))cap*=1000;
    return cap?{value:Math.max(35,cap*(build.storageType==="NVME M.2"?.10:build.storageType==="SSD"?.075:.035)),currency:"CAD",type:"New-build reference",source:"PCDeal planning model"}:null;
  }
  if(kind==="Motherboard"&&name)return {value:/x870|x670e|z890|z790/i.test(name)?320:/b850|b650|b550|b760|b660/i.test(name)?210:150,currency:"CAD",type:"New-build reference",source:"PCDeal planning model"};
  if(kind==="PSU"&&name){
    const w=num((String(name).match(/(\d{3,4})\s*w/i)||[])[1]);
    return w?{value:w*.16,currency:"CAD",type:"New-build reference",source:"PCDeal planning model"}:null;
  }
  if(kind==="Cooling"&&name)return {value:/420|360/i.test(name)?190:/280|240/i.test(name)?135:/nh-d15|ak620|peerless|phantom/i.test(name)?115:55,currency:"CAD",type:"New-build reference",source:"PCDeal planning model"};
  if(kind==="Case"&&name)return {value:build.caseQuality==="premium"?180:build.caseQuality==="mid"?110:70,currency:"CAD",type:"New-build reference",source:"PCDeal planning model"};
  return null;
}
function partList(build){
  return [
    ["CPU",build.cpu],
    ["GPU",build.gpu],
    ["RAM",[build.ram,build.ramType].filter(Boolean).join(" ")],
    ["Storage",(build.drives||[]).map(d=>`${d.size} ${d.type}`).join(" + ")||[build.storageSize,build.storageType].filter(Boolean).join(" ")],
    ["Motherboard",build.motherboard],
    ["PSU",build.psu],
    ["Cooling",build.cooler],
    ["Case",build.caseName||build.caseQuality]
  ].filter(x=>String(x[1]||"").trim());
}
function deterministicPrice(kind,name,build,usedRows=[]){
  const used=internalUsed(kind,build);
  const stats=robustStats(usedRows,name);
  const ref=reference(kind,name,build);
  let midpoint=used||0,low=used?used*.90:0,high=used?used*1.10:0;
  const evidence=[];

  if(used){evidence.push({type:"PCDeal used model",value:used,currency:build.currency||"CAD"});}
  if(stats.count>=3){
    midpoint=used?stats.median*.72+used*.28:stats.median;
    low=stats.q1||midpoint*.90; high=stats.q3||midpoint*1.10;
    evidence.push({type:"Current used listings",count:stats.count,median:stats.median,q1:stats.q1,q3:stats.q3,currency:usedRows.find(x=>x.price)?.price?.currency||"CAD"});
  }
  if(ref)evidence.push({type:ref.type,value:ref.value,currency:ref.currency,source:ref.source});

  if(!midpoint&&ref?.value){
    midpoint=ref.currency==="CAD"?ref.value:ref.value*1.15;
    low=midpoint*.45; high=midpoint*.70;
  }
  midpoint=Math.max(0,midpoint);
  low=Math.max(0,Math.min(low||midpoint*.9,midpoint));
  high=Math.max(midpoint,high||midpoint*1.1);

  const quick=midpoint*.90;
  const great=midpoint*.84;
  const overpriced=high*1.12;

  let confidence=25;
  if(used)confidence+=22;
  if(stats.count>=3)confidence+=Math.min(24,stats.count*3);
  if(stats.count>=6)confidence+=4;
  if(ref)confidence+=8;
  confidence=clamp(Math.round(confidence),25,82);

  return {
    kind,name,
    fairLow:Math.round(low),fairHigh:Math.round(high),fair:Math.round(midpoint),
    quickSale:Math.round(quick),greatBuy:Math.round(great),overpriced:Math.round(overpriced),
    confidence,listingStats:stats,evidence,
    currency:(stats.rows[0]?.price?.currency)||(build.currency||"CAD"),
    explanation:stats.count>=3
      ? `Fair value blends ${stats.count} relevant active used asking listings with PCDeal's internal model. Asking prices are not completed-sale evidence.`
      : used
        ? "No strong live used-listing cluster is available, so the fair range leans mainly on PCDeal's internal used-value model."
        : "Price evidence is limited. Treat this as a planning estimate, not a market quote."
  };
}
async function fetchUsed(name){
  if(!window.PCDealMarket?.getUrl?.())return [];
  try{
    const j=await window.PCDealMarket.searchEbay(name,"EBAY_CA");
    return j.items||[];
  }catch{return[]}
}
async function analyzePart(kind,name,build,{live=true}={}){
  const rows=live?await fetchUsed(name):[];
  return deterministicPrice(kind,name,build,rows);
}
function systemSummary(parts,build){
  const valid=parts.filter(x=>x&&x.fair>0);
  const partFair=valid.reduce((a,x)=>a+x.fair,0);
  const partLow=valid.reduce((a,x)=>a+x.fairLow,0);
  const partHigh=valid.reduce((a,x)=>a+x.fairHigh,0);
  const known=valid.length;
  // Whole PCs often need a bundle/liquidity adjustment rather than simply summing all components.
  const bundle=known>=5?.91:.95;
  const fair=Math.round(partFair*bundle);
  const low=Math.round(partLow*.90);
  const high=Math.round(partHigh*.96);
  const quick=Math.round(fair*.91);
  const great=Math.round(fair*.83);
  const asking=num(build.askingPrice);
  const dealPct=asking&&fair?((fair-asking)/fair)*100:null;
  return {partFair,partLow,partHigh,fairLow:low,fairHigh:high,fair,quickSale:quick,greatBuy:great,askingPrice:asking,dealPct,knownParts:known};
}
async function aiExplain(payload){
  const url=getAiUrl();
  const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  if(!r.ok){
    let msg=`AI pricing backend returned ${r.status}.`;
    try{const j=await r.json();if(j?.error)msg=j.error}catch{}
    throw new Error(msg);
  }
  return r.json();
}
window.PCDealPricingAI={getAiUrl,setAiUrl,money,robustStats,partList,reference,deterministicPrice,analyzePart,systemSummary,aiExplain};
})();