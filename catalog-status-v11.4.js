(()=>{"use strict";
async function mount(){
 if(!window.PCDealCatalogV114)return;
 let m;try{m=await PCDealCatalogV114.manifest()}catch(e){return}
 document.querySelectorAll("[data-pcdeal-catalog-status]").forEach(el=>{
  const cats=m.categories||{}, count=m.products_with_current_price||0;
  el.textContent=`Retail catalog: ${count.toLocaleString()} current records • ${Object.keys(cats).length} categories • ${m.currency||"CAD"} • updated ${String(m.generated_at||"").slice(0,10)}`;
 });
}
window.addEventListener("load",mount);window.addEventListener("pcdeal-catalog-ready",mount);
})();