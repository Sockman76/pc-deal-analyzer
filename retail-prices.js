// PCDeal V8.5 — secure retail pricing client
// Retail API secrets live in Firebase Functions, never in browser storage.
(() => {
"use strict";
const URL_KEY="pcdeal.retail.bestbuy.functionUrl";
const DEFAULT_URL="https://us-central1-pcdeal-d8f08.cloudfunctions.net/bestBuySearch";
const cache=new Map();
const enc=encodeURIComponent;

function getFunctionUrl(){return localStorage.getItem(URL_KEY)||DEFAULT_URL}
function setFunctionUrl(v){
  const x=String(v||"").trim();
  if(x)localStorage.setItem(URL_KEY,x); else localStorage.removeItem(URL_KEY);
}
function searchURL(store,q){
 const s=enc(q);
 if(store==="bestbuy")return`https://www.bestbuy.ca/en-ca/search?search=${s}`;
 if(store==="newegg")return`https://www.newegg.ca/p/pl?d=${s}`;
 if(store==="amazonca")return`https://www.amazon.ca/s?k=${s}`;
 return`https://www.google.com/search?tbm=shop&q=${s}`;
}
async function bestBuyLookup(query){
 const ck=query.toLowerCase();if(cache.has(ck))return cache.get(ck);
 const base=getFunctionUrl();
 const u=new URL(base);u.searchParams.set("q",query);
 const res=await fetch(u.toString(),{headers:{"Accept":"application/json"}});
 if(!res.ok){
   let msg=`Best Buy backend returned ${res.status}.`;
   try{const j=await res.json();if(j?.error)msg=j.error}catch{}
   throw new Error(msg);
 }
 const data=await res.json();
 const products=Array.isArray(data.products)?data.products:[];
 cache.set(ck,products);return products;
}
function refForName(name){
 const part=window.findCPU?.(name)||window.findGPU?.(name)||null;
 return part?{name:part.name,brand:part.brand,msrpUSD:+part.msrpUSD||0,launchYear:+part.launchYear||0,status:part.launchYear&&new Date().getFullYear()-part.launchYear>=5?"Usually discontinued":"Current/recent generation"}:null;
}
window.PCDealRetail={getFunctionUrl,setFunctionUrl,bestBuyLookup,searchURL,refForName};
})();