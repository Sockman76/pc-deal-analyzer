
// PCDeal V7 — Retail pricing layer.
// Static data = retail reference / MSRP when available.
// Optional Best Buy developer API = live/current USD pricing when user supplies their own API key.
(() => {
"use strict";
const KEY="pcdeal.retail.bestbuy.key";
const cache=new Map();
const enc=encodeURIComponent;
function getKey(){return localStorage.getItem(KEY)||""}
function setKey(v){localStorage.setItem(KEY,String(v||"").trim())}
function searchURL(store,q){
 const s=enc(q);
 if(store==="bestbuy")return`https://www.bestbuy.com/site/searchpage.jsp?st=${s}`;
 if(store==="newegg")return`https://www.newegg.com/p/pl?d=${s}`;
 if(store==="amazonca")return`https://www.amazon.ca/s?k=${s}`;
 return`https://www.google.com/search?tbm=shop&q=${s}`;
}
async function bestBuyLookup(query){
 const key=getKey();if(!key)throw new Error("Best Buy API key is not configured.");
 const ck=query.toLowerCase();if(cache.has(ck))return cache.get(ck);
 const url=`https://api.bestbuy.com/v1/products((search=${enc(query)}))?apiKey=${enc(key)}&format=json&pageSize=8&show=sku,name,salePrice,regularPrice,onSale,url,image,onlineAvailability`;
 const res=await fetch(url);if(!res.ok)throw new Error(`Best Buy API returned ${res.status}.`);
 const data=await res.json();const products=(data.products||[]).map(p=>({store:"Best Buy",currency:"USD",name:p.name,current:p.salePrice,regular:p.regularPrice,onSale:p.onSale,available:p.onlineAvailability,url:p.url,image:p.image,sku:p.sku}));
 cache.set(ck,products);return products;
}
function refForName(name){
 const part=window.findCPU?.(name)||window.findGPU?.(name)||null;
 return part?{name:part.name,brand:part.brand,msrpUSD:+part.msrpUSD||0,launchYear:+part.launchYear||0,status:part.launchYear&&new Date().getFullYear()-part.launchYear>=5?"Usually discontinued":"Current/recent generation"}:null;
}
window.PCDealRetail={getKey,setKey,bestBuyLookup,searchURL,refForName};
})();
