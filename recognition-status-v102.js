// PCDeal V10.2 — exact/partial recognition status and compact editor
(() => {
"use strict";
function addStatus(){
 const details=[...document.querySelectorAll("details")].find(d=>/review\s*\/?\s*edit detected parts/i.test(d.textContent||""));
 if(details){details.open=false;details.removeAttribute("open");}
 const visual=document.querySelector(".visualizer,.pc-visualizer,#pcVisualizer,.build-visualizer");
 if(!visual||document.getElementById("recognitionQualityV102"))return;
 const bar=document.createElement("div");bar.id="recognitionQualityV102";bar.className="notice";
 bar.textContent="Recognition quality updates after detection: Exact model > Partial > Generic > Unknown.";
 visual.parentElement?.insertBefore(bar,visual);
}
window.addEventListener("pcdeal-v102-recognized",e=>{
 const r=e.detail||{};const bar=document.getElementById("recognitionQualityV102");if(!bar)return;
 const vals=[r.motherboard,r.psu,r.storage,r.ram];
 const exact=vals.filter(x=>x?.canonical).length;
 const aux=(r.ramSpeed?1:0)+(r.storageSize?1:0)+(r.askingPrice?1:0);
 bar.textContent=`Exact product matches: ${exact}/4 supporting categories • Extra fields captured: ${aux}/3. Generic detection is no longer counted as an exact product match.`;
});
document.addEventListener("DOMContentLoaded",()=>setTimeout(addStatus,100));
})();