// PCDeal V10.2 — model-specific supporting-part value corrections
(() => {
"use strict";
const VALUES={
 "MSI MAG B650 Tomahawk WiFi":{used:190,low:165,high:220},
 "Gigabyte X870 Eagle WiFi7":{used:225,low:195,high:255},
 "Corsair RM850x 850W":{used:115,low:95,high:135},
 "Corsair RM1000x 1000W":{used:145,low:120,high:170},
 "Corsair RM750x 750W":{used:95,low:80,high:115},
 "WD_BLACK SN850X 1TB":{used:80,low:65,high:95},
 "WD_BLACK SN850X 2TB":{used:125,low:105,high:145},
 "WD_BLACK SN850X 4TB":{used:240,low:205,high:275},
 "Samsung 990 PRO 1TB":{used:85,low:70,high:100},
 "Samsung 990 PRO 2TB":{used:135,low:110,high:155},
 "Kingston KC3000 1TB":{used:70,low:55,high:85},
 "Kingston KC3000 2TB":{used:115,low:95,high:135},
 "Corsair Vengeance DDR5 32GB":{used:90,low:75,high:105},
 "Kingston FURY Beast DDR5 32GB":{used:85,low:70,high:100}
};
function get(name){return VALUES[name]||null}
function infer(build){
 const out={};
 const m=build.motherboard;if(m&&get(m))out.motherboard=get(m);
 const p=build.psu;if(p&&get(p))out.psu=get(p);
 const sm=build.storageModel||"";
 const ss=build.storageSize||"";
 if(sm){
  const k=(sm+" "+ss).trim().replace(/\s+/g," ");
  if(get(k))out.storage=get(k);
 }
 const rm=build.ramModel||"";const rc=build.ram||"";
 if(rm){
  const k=(rm+" "+rc).trim().replace(/\s+/g," ");
  if(get(k))out.ram=get(k);
 }
 return out;
}
window.PCDealSupportingValuesV102={VALUES,get,infer};
})();