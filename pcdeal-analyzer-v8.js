
// PCDeal V9.4 — exact-product dropdown + custom/manual controls
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
 createPicker("motherboard","Motherboard",sortedUnique([
  ...(window.PCDealProductCatalog?.allNames?.("motherboard")||[]),
  "A320 motherboard","B450 motherboard","B550 motherboard","X570 motherboard","A620 motherboard","B650 motherboard","B650E motherboard","X670 motherboard","X670E motherboard","B850 motherboard","X870 motherboard","X870E motherboard","H610 motherboard","B660 motherboard","Z690 motherboard","B760 motherboard","Z790 motherboard","B860 motherboard","Z890 motherboard"
 ]));
 createPicker("psu","Power Supply",sortedUnique([
  ...(window.PCDealProductCatalog?.allNames?.("psu")||[]),
  "500W PSU","550W PSU","600W PSU","650W PSU","750W PSU","850W PSU","1000W PSU","1200W PSU"
 ]));
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(init,80));
})();
// V10.3 canonical menus
window.addEventListener("DOMContentLoaded",()=>{
 const C=window.PCDealCanonicalV102;if(!C)return;
 const fill=(id,kind)=>{
  const s=document.getElementById(id);if(!s||s.tagName!=="SELECT")return;
  const known=new Set([...s.options].map(o=>o.textContent.trim().toLowerCase()));
  for(const x of C.aliases[kind]||[]){
   if(known.has(x.canonical.toLowerCase()))continue;
   const o=document.createElement("option");o.value=x.canonical;o.textContent=x.canonical;s.appendChild(o);
  }
 };
 fill("motherboard","motherboard");fill("psu","psu");
});
