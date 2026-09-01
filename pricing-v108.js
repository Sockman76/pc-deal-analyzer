// PCDeal V10.9 Canadian pricing model: new and used are separate.
(()=>{"use strict";
const CONFIG={currency:"CAD",retailSources:["Amazon Canada","Best Buy Canada","Canada Computers","Newegg Canada"],retailFreshHours:24,usedFreshDays:14};
const med=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;let m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2};
function robust(rows){let a=rows.map(x=>Number(x.price)).filter(x=>x>0);if(!a.length)return null;let m=med(a),k=a.filter(v=>v>=m*.55&&v<=m*1.8);if(!k.length)k=a;return{low:Math.min(...k),high:Math.max(...k),typical:med(k),observations:k.length}}
function used(rows,retail){let x=robust(rows);if(x)return{...x,method:"used-market-observations"};if(!retail?.typical)return null;return{low:Math.round(retail.typical*.5),high:Math.round(retail.typical*.75),typical:Math.round(retail.typical*.62),observations:0,method:"retail-depreciation-fallback"}}
window.PCDealPricingV108={CONFIG,robust,used};
})();