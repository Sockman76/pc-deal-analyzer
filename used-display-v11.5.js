(()=>{"use strict";
const money=n=>"$"+Math.round(Number(n)||0).toLocaleString("en-CA");
async function value(category,name){
 const r=await PCDealCatalogV114.part(category,name);
 if(!r)return null;
 return {
  ...r,
  display_value_cad:r?.used?.fair_used??null,
  quick_sale_cad:r?.used?.quick_sale??null,
  high_ask_cad:r?.used?.high_ask??null,
  new_anchor_cad:r?.new_retail??null,
  display_label:"Fair used value",
  new_anchor_label:"Current new retail",
  pricing_rule:"NEW retail is the anchor; USED value is the PCDeal valuation."
 };
}
function render(v){
 if(!v)return "No valuation available";
 const used=v.display_value_cad==null?"Unavailable":money(v.display_value_cad);
 const retail=v.new_anchor_cad==null?"No exact current-new match":money(v.new_anchor_cad);
 return `<strong>Fair used value:</strong> ${used}<br><span style="opacity:.72">Current new retail anchor: ${retail}${v.source?` • ${v.source}`:""}</span>`;
}
window.PCDealUsedValueV115={value,render};
})();