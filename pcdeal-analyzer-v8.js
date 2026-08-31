
// PCDeal V8 — obvious dropdown + custom/manual detected-part controls
(() => {
"use strict";
const $=id=>document.getElementById(id);
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function sortedUnique(a){return [...new Set(a.filter(Boolean))].sort((x,y)=>x.localeCompare(y,undefined,{numeric:true}))}
function createPicker(inputId,label,items){
 const input=$(inputId);if(!input||document.getElementById(inputId+"Picker"))return;
 const field=input.closest(".field")||input.parentElement;
 const oldLabel=field.querySelector("label");if(oldLabel)oldLabel.textContent=label;
 const select=document.createElement("select");select.id=inputId+"Picker";select.className="detected-picker";
 select.innerHTML=`<option value="">Choose from PCDeal database…</option>${items.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}<option value="__custom">Other / type exact model below</option>`;
 input.parentNode.insertBefore(select,input);
 const hint=document.createElement("div");hint.className="manual-hint";hint.innerHTML=`<strong>Custom / exact model</strong><span>Detected automatically when possible. Use the dropdown or type here if needed.</span>`;
 input.parentNode.insertBefore(hint,input);
 input.placeholder=`Type exact ${label.toLowerCase()} if not in menu`;
 select.addEventListener("change",()=>{if(select.value&&select.value!=="__custom"){input.value=select.value;input.dispatchEvent(new Event("change",{bubbles:true}))}else if(select.value==="__custom"){input.focus()}});
 input.addEventListener("input",()=>{const o=[...select.options].find(o=>o.value===input.value);select.value=o?o.value:(input.value?"__custom":"")});
 input.addEventListener("change",()=>{const o=[...select.options].find(o=>o.value===input.value);select.value=o?o.value:(input.value?"__custom":"")});
}
function init(){
 createPicker("cpu","CPU",sortedUnique((window.cpuDatabase||[]).map(x=>x.name)));
 createPicker("gpu","GPU",sortedUnique((window.gpuDatabase||[]).map(x=>x.name)));
 createPicker("motherboard","Motherboard",[
  "A320 motherboard","B450 motherboard","B550 motherboard","X570 motherboard",
  "A620 motherboard","B650 motherboard","B650E motherboard","X670 motherboard","X670E motherboard","B850 motherboard","X870 motherboard","X870E motherboard",
  "H610 motherboard","B660 motherboard","Z690 motherboard","B760 motherboard","Z790 motherboard","B860 motherboard","Z890 motherboard"
 ]);
 createPicker("psu","Power Supply",[
  "500W PSU","550W PSU","600W PSU","650W PSU","750W PSU","850W PSU","1000W PSU","1200W PSU",
  "Corsair RM650x 650W","Corsair RM750x 750W","Corsair RM850x 850W","Corsair RM1000x 1000W",
  "Seasonic Focus GX-650 650W","Seasonic Focus GX-750 750W","Seasonic Focus GX-850 850W"
 ]);
 const sec=$("detectedSection");
 if(sec&&!$("usageProfile")){
   const p=document.createElement("section");p.className="usage-selector";
   p.innerHTML=`<div><div class="eyebrow">What will this PC be used for?</div><strong>Choose the primary workload</strong><div class="tiny">PCDeal changes its recommendation weights instead of treating every computer as a gaming PC.</div></div>
   <select id="usageProfile"><option value="gaming">Gaming</option><option value="esports">Competitive / Esports</option><option value="workstation">Extreme Workstation</option><option value="editing">Video Editing</option><option value="render">3D Rendering</option><option value="ai">AI / ML</option><option value="general">General / School / Office</option><option value="mixed">Mixed Use</option></select>`;
   sec.insertBefore(p,sec.children[1]||null);
   const saved=localStorage.getItem("pcdeal.v8.usage")||"gaming";$("usageProfile").value=saved;
   $("usageProfile").addEventListener("change",()=>{localStorage.setItem("pcdeal.v8.usage",$("usageProfile").value);try{const b=JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}");b.usageProfile=$("usageProfile").value;localStorage.setItem("pcdeal.v5.build",JSON.stringify(b))}catch{}});
 }
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(init,80));
})();