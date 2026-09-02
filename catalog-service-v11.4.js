(()=>{"use strict";
const VERSION="11.4";
const CATEGORY_MAP={ram:"memory",ssd:"storage",hdd:"storage",cooler:"cpu-cooler",fan:"case-fan"};
const normalizeCategory=c=>CATEGORY_MAP[c]||c;
async function part(category,name){
 category=normalizeCategory(category);
 if(!name)return {category,name:"",new_retail:null,used:null,evidence:"missing-part",confidence:0};
 const r=await window.PCDealPricingServiceV11.pricePart(category,name);
 const rr=r?.retail_record||null;
 return {...r,confidence:rr?.match_confidence|| (r?.new_retail?55:20),
   source:rr?.retail_source||null,observed_at:rr?.observed_at||null,
   regular_price_cad:rr?.regular_price_cad||null,url:rr?.retail_url||null};
}
async function build(b){
 const r=await window.PCDealPricingServiceV11.priceBuild(b||{});
 const covered=r.parts.filter(x=>x.new_retail).length,total=r.parts.length;
 return {...r,retail_coverage:{covered,total,percent:total?Math.round(covered/total*100):0}};
}
async function search(q,category){
 if(!window.PCDealRetailDBV11)return [];
 return window.PCDealRetailDBV11.find(q,normalizeCategory(category));
}
async function manifest(){return window.PCDealRetailDBV11.manifest()}
window.PCDealCatalogV114={VERSION,part,build,search,manifest,normalizeCategory};
window.dispatchEvent(new CustomEvent("pcdeal-catalog-ready",{detail:{version:VERSION}}));
})();