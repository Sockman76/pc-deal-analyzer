// PCDeal V9.4 — product-aware detection bridge
(() => {
"use strict";
function enrichListing(text){
 const C=window.PCDealProductCatalog;
 if(!C)return {};
 return {
  ram:C.enrich("ram",text,window.detectRamDetails?.(text)||{}),
  storage:C.enrich("storage",text,{drives:window.detectStorageDetails?.(text)||[]}),
  psu:C.enrich("psu",text,window.detectPSUDetails?.(text)||{}),
  motherboard:C.enrich("motherboard",text,window.detectMotherboardDetails?.(text)||{}),
  cooler:C.enrich("cooler",text,{}),
  case:C.enrich("case",text,{})
 };
}
function productKey(kind,text){
 const x=window.PCDealProductCatalog?.findExact?.(kind,text);
 return x?`${x.brand} ${x.model}`.trim():String(text||"").trim();
}
window.PCDealExactProducts={enrichListing,productKey};
})();