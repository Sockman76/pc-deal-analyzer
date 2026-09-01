// PCDeal V10.8 — exact cooler/case pricing search keys
(() => {
"use strict";
function key(build,kind){
 if(kind==="cooler")return build.cooler||build.coolerModel||"";
 if(kind==="case")return build.caseName||build.case||"";
 return "";
}
window.PCDealV105PricingKeys={key};
})();