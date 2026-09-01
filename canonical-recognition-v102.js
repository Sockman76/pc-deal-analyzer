// PCDeal V10.2 — canonical recognition pipeline for non-CPU/GPU parts
(() => {
"use strict";

const n=s=>String(s||"").toLowerCase().replace(/[®™]/g,"").replace(/[^a-z0-9+]+/g," ").replace(/\s+/g," ").trim();
const c=s=>n(s).replace(/\s+/g,"");

const aliases={
 motherboard:[
  {canonical:"MSI MAG B650 Tomahawk WiFi",aliases:["b650 tomahawk","b650 tomahawk wifi","msi b650 tomahawk","msi mag b650 tomahawk"]},
  {canonical:"Gigabyte X870 Eagle WiFi7",aliases:["x870 eagle","x870 eagle wifi7","gigabyte x870 eagle"]},
  {canonical:"ASUS ROG Strix Z790-A Gaming WiFi",aliases:["z790-a gaming wifi","rog strix z790-a","asus z790-a"]},
  {canonical:"MSI MAG X870E Tomahawk WiFi",aliases:["x870e tomahawk","x870e tomahawk wifi","msi x870e tomahawk"]},
  {canonical:"Gigabyte B650 AORUS Elite AX",aliases:["b650 aorus elite","b650 aorus elite ax","gigabyte b650 aorus elite"]},
  {canonical:"ASRock B650E Steel Legend WiFi",aliases:["b650e steel legend","b650e steel legend wifi"]}
 ],
 psu:[
  {canonical:"Corsair RM850x 850W",aliases:["rm850x","corsair rm850x","rm 850x","rm850x 850w"]},
  {canonical:"Corsair RM1000x 1000W",aliases:["rm1000x","corsair rm1000x","rm 1000x"]},
  {canonical:"Corsair RM750x 750W",aliases:["rm750x","corsair rm750x","rm 750x"]},
  {canonical:"Seasonic FOCUS GX-850 850W",aliases:["focus gx 850","seasonic focus gx 850","gx-850"]},
  {canonical:"MSI MPG A850G PCIE5 850W",aliases:["mpg a850g","msi a850g","a850g pcie5"]},
  {canonical:"Thermaltake Toughpower GF3 850W",aliases:["toughpower gf3 850","gf3 850"]}
 ],
 storage:[
  {canonical:"WD_BLACK SN850X",aliases:["sn850x","wd black sn850x","wd_black sn850x","western digital sn850x"],type:"NVME M.2"},
  {canonical:"Samsung 990 PRO",aliases:["990 pro","990pro","samsung 990 pro"],type:"NVME M.2"},
  {canonical:"Kingston KC3000",aliases:["kc3000","kingston kc3000"],type:"NVME M.2"},
  {canonical:"Crucial T705",aliases:["t705","crucial t705"],type:"NVME M.2"},
  {canonical:"Crucial P3 Plus",aliases:["p3 plus","crucial p3 plus"],type:"NVME M.2"},
  {canonical:"Samsung 870 EVO",aliases:["870 evo","samsung 870 evo"],type:"SSD"},
  {canonical:"Crucial MX500",aliases:["mx500","crucial mx500"],type:"SSD"}
 ],
 ram:[
  {canonical:"Corsair Vengeance DDR5",aliases:["corsair vengeance ddr5","vengeance ddr5","corsair vengeance"]},
  {canonical:"Corsair Vengeance RGB DDR5",aliases:["corsair vengeance rgb ddr5","vengeance rgb ddr5"]},
  {canonical:"G.Skill Trident Z5 DDR5",aliases:["trident z5","gskill trident z5","g skill trident z5"]},
  {canonical:"Kingston FURY Beast DDR5",aliases:["kingston fury beast","fury beast ddr5","kingston fury beast ddr5"]},
  {canonical:"TeamGroup T-Force Delta RGB DDR5",aliases:["t force delta rgb","teamgroup delta rgb","t-force delta rgb"]}
 ]
};

function score(q,a){
 const nq=n(q),na=n(a),cq=c(q),ca=c(a);
 if(!nq||!na)return 0;
 if(nq===na||cq===ca)return 1;
 if(nq.includes(na)||na.includes(nq)||cq.includes(ca)||ca.includes(cq)){
  return Math.min(cq.length,ca.length)/Math.max(cq.length,ca.length);
 }
 const qs=new Set(nq.split(" ")),as=new Set(na.split(" "));
 let hit=0;for(const x of qs)if(as.has(x))hit++;
 return (hit/Math.max(1,qs.size))*.8;
}
function match(kind,text){
 const full=n(text),fullc=c(text);
 let best=null,bestScore=0;
 for(const item of aliases[kind]||[]){
  for(const a of item.aliases){
   const na=n(a),ca=c(a);
   let s=score(text,a);
   // Listings contain many unrelated words, so an alias appearing as a phrase
   // or compact token is stronger evidence than whole-listing similarity.
   if(na && (full.includes(na) || fullc.includes(ca))){
     s=Math.max(s, Math.min(1,.88 + Math.min(na.length,24)/200));
   }
   if(s>bestScore){bestScore=s;best=item}
  }
 }
 if(!best||bestScore<.48)return null;
 return {...best,confidence:Math.round(bestScore*100)};
}
function extractPrice(text){
 const s=String(text||"");
 const patterns=[
  /\$\s*([0-9]{1,3}(?:,[0-9]{3})+(?:\.\d+)?|[0-9]{3,5}(?:\.\d+)?)/i,
  /\b(?:asking|price|priced at|selling for)\s*[:\-]?\s*\$?\s*([0-9]{3,5}(?:\.\d+)?)/i,
  /\b([0-9]+(?:\.\d+)?)\s*k\s*(?:cad|cdn|dollars?)?\b/i,
  /\b([0-9]{3,5})\s*(?:cad|cdn)\b/i
 ];
 for(let i=0;i<patterns.length;i++){
  const m=s.match(patterns[i]); if(!m)continue;
  let v=Number(String(m[1]).replace(/,/g,""));
  if(i===2)v*=1000;
  if(v>=50&&v<=100000)return Math.round(v);
 }
 return 0;
}
function extractRamSpeed(text){
 const s=String(text||"");
 const direct=s.match(/\b(?:ddr[45][ -]?)?(?:5[0-9]{3}|6[0-9]{3}|7[0-9]{3}|8[0-9]{3})\s*(?:mhz|mt\/s|mts)?\b/i);
 if(direct){
  const v=Number((direct[0].match(/\d{4}/)||[])[0]);
  if(v>=1600&&v<=10000)return v;
 }
 const labeled=s.match(/\b(?:ram|memory)[^\n]{0,35}?\b([2-9][0-9]{3})\s*(?:mhz|mt\/s|mts)?/i);
 return labeled?Number(labeled[1]):0;
}
function extractStorageCapacity(text){
 const s=String(text||"");
 const storageWords="(?:sn850x|kc3000|990\\s*pro|980\\s*pro|p3\\s*plus|t705|nvme|ssd|hdd|drive|storage)";
 let m=s.match(new RegExp(storageWords+"[^\\n]{0,24}?\\b(500|512)\\s*gb\\b","i"));
 if(m)return "500GB";
 m=s.match(new RegExp(storageWords+"[^\\n]{0,24}?\\b(1|2|4|8)\\s*tb\\b","i"));
 if(m)return m[1]+"TB";
 m=s.match(/\b(500|512)\s*gb\b[^\n]{0,24}?(?:nvme|ssd|sn850x|kc3000|990\s*pro|p3\s*plus)/i);
 if(m)return "500GB";
 m=s.match(/\b(1|2|4|8)\s*tb\b[^\n]{0,24}?(?:nvme|ssd|hdd|sn850x|kc3000|990\s*pro|p3\s*plus)/i);
 return m?m[1]+"TB":"";
}
function extractFromListing(text){
 const motherboard=match("motherboard",text);
 const psu=match("psu",text);
 const storage=match("storage",text);
 const ram=match("ram",text);
 const storageSize=extractStorageCapacity(text);
 return {
  motherboard,
  psu,
  storage,
  ram,
  ramSpeed:extractRamSpeed(text),
  storageSize,
  storageType:storage?.type||(storageSize?/nvme|sn850x|kc3000|990\s*pro|p3\s*plus|t705/i.test(text)?"NVME M.2":/ssd/i.test(text)?"SSD":/hdd/i.test(text)?"HDD":"":""),
  askingPrice:extractPrice(text)
 };
}
window.PCDealCanonicalV102={aliases,match,extractPrice,extractRamSpeed,extractStorageCapacity,extractFromListing};
})();