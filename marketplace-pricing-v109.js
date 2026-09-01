// PCDeal V10.9 Marketplace Cash Pricing Engine
// Goal: estimate Canadian peer-to-peer cash value, not MSRP/retail-with-tax.
(()=>{"use strict";

const CFG={
 currency:"CAD",
 version:"10.9",
 // Calibration bands supplied for Canadian peer-to-peer fallback use.
 // These are NEVER allowed to override stronger exact-model market evidence.
 bands:{
  ram_ddr5_32_5600_6000:[90,130],
  ram_ddr4_16_3200_3600:[30,45],
  gpu_modern_mid_high:[550,700],
  gpu_prev_mid:[320,420],
  gpu_legacy_entry:[60,110],
  cpu_current_socket:[180,260],
  cpu_am4_mainstream:[70,130],
  motherboard_mainstream:[90,160],
  psu_650_850_gold:[50,90],
  case_midtower:[40,70],
  nvme_1_2tb:[45,80]
 },
 retailFallback:{
  gpu:[.60,.75], cpu:[.62,.75], ram:[.50,.60], motherboard:[.45,.62],
  psu:[.35,.55], case:[.30,.50], storage:[.35,.55], cooler:[.35,.60]
 }
};

const median=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;let m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function clean(rows){
 let a=(rows||[]).map(x=>({...x,price:Number(x.price)})).filter(x=>x.price>0);
 if(a.length<3)return a;
 let m=median(a.map(x=>x.price));
 return a.filter(x=>x.price>=m*.55&&x.price<=m*1.75);
}
function observed(rows){
 let a=clean(rows), p=a.map(x=>x.price);
 if(a.length<3)return null;
 let m=median(p);
 return {low:Math.round(Math.min(...p)),fair:Math.round(m),high:Math.round(Math.max(...p)),
         observations:a.length,method:"exact/relevant used-market observations",
         confidence:clamp(55+a.length*3,55,92)};
}
function band(category,part){
 let s=(part||"").toLowerCase(), b=null;
 if(category==="ram"&&/32\s*gb/.test(s)&&/ddr5/.test(s)&&/(5600|6000)/.test(s))b=CFG.bands.ram_ddr5_32_5600_6000;
 else if(category==="ram"&&/16\s*gb/.test(s)&&/ddr4/.test(s)&&/(3200|3600)/.test(s))b=CFG.bands.ram_ddr4_16_3200_3600;
 else if(category==="storage"&&/(1\s*tb|2\s*tb)/.test(s)&&/(nvme|m\.?2)/.test(s))b=CFG.bands.nvme_1_2tb;
 else if(category==="psu"&&/(650|750|850)\s*w/.test(s)&&/gold/.test(s))b=CFG.bands.psu_650_850_gold;
 else if(category==="case")b=CFG.bands.case_midtower;
 if(!b)return null;
 return {low:b[0],fair:Math.round((b[0]+b[1])/2),high:b[1],observations:0,method:"Canadian street-price calibration fallback",confidence:32};
}
function retailDerived(category,retail){
 let r=Number(retail); if(!(r>0))return null;
 let pct=CFG.retailFallback[category]||[.45,.65];
 return {low:Math.round(r*pct[0]),fair:Math.round(r*((pct[0]+pct[1])/2)),high:Math.round(r*pct[1]),
         observations:0,method:"current-retail category fallback",confidence:38};
}
function price({category,part,usedRows=[],currentRetail=null}){
 let x=observed(usedRows);
 if(x)return finalize(x);
 // Exact current retail is preferable to a generic hard-coded category dollar amount.
 let r=retailDerived(category,currentRetail);
 let b=band(category,part);
 if(r&&b){
   // sanity blend: keep retail movement reflected while using street calibration as guardrail
   let low=Math.round(r.low*.7+b.low*.3), high=Math.round(r.high*.7+b.high*.3);
   return finalize({low,fair:Math.round((low+high)/2),high,observations:0,
     method:"current retail + Canadian street calibration fallback",confidence:42});
 }
 return finalize(r||b||{low:null,fair:null,high:null,observations:0,method:"insufficient market data",confidence:15});
}
function finalize(x){
 if(x.fair==null)return {...x,quickSale:null,greatBuy:null,highAsking:null};
 return {...x,quickSale:Math.round(x.fair*.90),greatBuy:Math.round(x.fair*.84),highAsking:Math.round(x.fair*1.12)};
}
window.PCDealMarketplacePricingV109={CFG,price,observed,retailDerived,band};
})();