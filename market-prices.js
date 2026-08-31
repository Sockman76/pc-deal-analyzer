// PCDeal V7.1 — optional used-market provider client
(() => {
"use strict";
const URL_KEY="pcdeal.market.ebay.functionUrl";
function getUrl(){return localStorage.getItem(URL_KEY)||""}
function setUrl(v){localStorage.setItem(URL_KEY,String(v||"").trim())}
function ebaySearchLink(q,country="CA"){return `https://www.ebay.${country==="CA"?"ca":"com"}/sch/i.html?_nkw=${encodeURIComponent(q)}&LH_ItemCondition=3000`}
async function searchEbay(q,marketplace="EBAY_CA"){
 const base=getUrl();if(!base)throw new Error("eBay backend is not configured.");
 const u=new URL(base);u.searchParams.set("q",q);u.searchParams.set("marketplace",marketplace);
 const r=await fetch(u);if(!r.ok){let t="";try{t=await r.text()}catch{}throw new Error(`eBay backend returned ${r.status}${t?": "+t.slice(0,120):""}`)}
 return r.json();
}
window.PCDealMarket={getUrl,setUrl,ebaySearchLink,searchEbay};
})();