// V10.9 Hardware-page pricing bridge
(()=>{"use strict";
function load(){
 const E=window.PCDealMarketplacePricingV109;if(!E)return;
 window.PCDealPricePartV109=(category,part,usedRows,currentRetail)=>E.price({category,part,usedRows,currentRetail});
 // Expose policy so legacy UI can identify old internal-only estimates as fallback data.
 window.PCDealPricingPolicyV109={
   market:"Canadian peer-to-peer cash",
   priority:["recent exact-model used evidence","relevant used comparables","current exact-model Canadian retail","category/street calibration"],
   taxIncluded:false,
   retailMarginTarget:false,
   refuseFalsePrecision:true
 };
 window.dispatchEvent(new CustomEvent("pcdeal-pricing-v109-ready"));
}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",load):load();
})();