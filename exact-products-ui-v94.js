// PCDeal V9.4 — exact product identity UI
(() => {
"use strict";
const $=id=>document.getElementById(id);
function build(){try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}}
function listing(b){return b.listing||document.getElementById("listingText")?.value||""}
function render(){
 const host=document.querySelector('body[data-page="hardware"] main.wrap');if(!host||$("exactProductIdentity"))return;
 const b=build(),x=window.PCDealExactProducts?.enrichListing?.(listing(b))||{};
 const rows=[
  ["RAM",x.ram?.brand,x.ram?.product,x.ram?.catalogConfidence],
  ["Storage",x.storage?.brand,x.storage?.product,x.storage?.catalogConfidence],
  ["Motherboard",x.motherboard?.brand,x.motherboard?.product,x.motherboard?.catalogConfidence],
  ["PSU",x.psu?.brand,x.psu?.product,x.psu?.catalogConfidence],
  ["Cooling",x.cooler?.brand,x.cooler?.product,x.cooler?.catalogConfidence],
  ["Case",x.case?.brand,x.case?.product,x.case?.catalogConfidence]
 ];
 const sec=document.createElement("section");sec.className="panel";sec.id="exactProductIdentity";
 const head=document.createElement("div");head.className="section-heading";
 const left=document.createElement("div");left.innerHTML='<div class="eyebrow">Exact product identity</div><h2>Brand + family + model</h2><div class="sub">Product-level identity improves pricing, quality analysis and future compatibility rules.</div>';
 head.appendChild(left);sec.appendChild(head);
 const grid=document.createElement("div");grid.className="grid3";
 for(const [kind,brand,model,conf] of rows){
  const card=document.createElement("div");card.className="card";
  const h=document.createElement("h3");h.textContent=kind;
  const big=document.createElement("div");big.className="big";big.textContent=model?`${brand} ${model}`.trim():(brand?`${brand} product`:"Not identified");
  const tiny=document.createElement("div");tiny.className="tiny";tiny.textContent=model?`Catalog identity confidence: ${conf||0}%`:"PCDeal will keep the generic category value until an exact product is identified.";
  card.append(h,big,tiny);grid.appendChild(card);
 }
 sec.appendChild(grid);host.prepend(sec);
}
document.addEventListener("DOMContentLoaded",()=>setTimeout(render,120));
})();