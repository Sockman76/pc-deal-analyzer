// PCDeal V9 — verified per-game FPS anchors
// Snapshot: August 2026. Values are Average FPS / 1% Low from the cited game pages.
(() => {
"use strict";
const SOURCE={
 name:"DropReference",
 updated:"August 2026",
 url:"https://dropreference.com/en/benchmarks",
 baseline:"Exact stored game/GPU rows are source-backed. Other settings or missing rows are modelled/interpolated."
};
const VERIFIED={
 "Apex Legends":{
  url:"https://dropreference.com/en/benchmarks/apex-legends",
  rows:{
   "RTX 5090":[367,234],"RTX 4090":[334,216],"RX 7900 XTX":[314,203],"RTX 5080":[310,189],
   "RX 9070 XT":[306,186],"RX 7900 XT":[304,189],"RTX 4080":[283,183],"RTX 4080 Super":[283,192],
   "RTX 5070 Ti":[282,180],"RX 9070":[280,183],"RTX 4070 Ti Super":[279,181],"RX 7900 GRE":[275,177],
   "RTX 3090 Ti":[272,185],"RX 6900 XT":[266,166],"RX 7800 XT":[263,164],"RTX 5070":[262,166],
   "RX 6950 XT":[261,169],"RTX 4070 Super":[257,169],"RTX 4070 Ti":[256,167],"RTX 3090":[256,172],
   "RX 6800 XT":[251,170],"RTX 3080 10GB":[245,153]
  }
 },
 "Red Dead Redemption 2":{
  url:"https://dropreference.com/en/benchmarks/red-dead-redemption-2",
  rows:{
   "RTX 5090":[265,180],"RTX 4090":[205,147],"RTX 5080":[199,134],"RX 7900 XTX":[192,135],
   "RX 9070 XT":[186,124],"RTX 4080":[179,122],"RTX 4080 Super":[178,128],"RTX 5070 Ti":[177,121],
   "RX 7900 XT":[176,122],"RTX 3090 Ti":[171,118],"RX 9070":[169,124],"RTX 4070 Ti Super":[164,117],
   "RTX 5070":[161,108],"RTX 3090":[160,109],"RTX 4070 Ti":[159,109],"RTX 3080 Ti":[150,103],
   "RX 6950 XT":[155,107],"RX 7800 XT":[152,107],"RX 6800 XT":[151,100],"RX 7900 GRE":[151,108],
   "RX 6900 XT":[147,105],"RTX 4070 Super":[147,101],"RTX 3080 12GB":[145,102],"RTX 4070":[139,95],
   "RTX 5060 Ti 16GB":[139,96],"RX 9060 XT 16GB":[139,94],"RTX 3080 10GB":[138,99],"RX 6800":[135,96],
   "RX 9060 XT 8GB":[132,95],"RX 7700 XT":[131,97],"Arc A770 16GB":[129,85],"RTX 5060 Ti 8GB":[127,85],
   "RX 6750 XT":[125,83],"Arc B580":[125,89],"RTX 4060 Ti 16GB":[124,87],"RTX 2080 Ti":[124,88],
   "RTX 5060":[122,81],"RTX 3070 Ti":[119,88],"RX 6700 XT":[118,87],"RTX 3070":[118,80],
   "Arc A750":[115,79],"RX 7600 XT":[115,84],"Arc B570":[115,79],"RTX 2080 Super":[114,76],
   "RTX 4060 Ti 8GB":[113,79],"RTX 3060 Ti":[110,77],"RTX 2070 Super":[109,73],"RTX 2080":[107,77],
   "RTX 5050":[107,73],"RX 6650 XT":[105,72],"RX 6600 XT":[104,69],"RTX 4060":[104,73],
   "RX 7600":[103,75],"RTX 2060 Super":[100,70],"RTX 2070":[99,71],"RX 6600":[97,68],
   "RTX 3060 12GB":[94,64],"RTX 2060 6GB":[89,64],"GTX 1660 Ti":[85,59],"GTX 1660 Super":[83,60],
   "GTX 1660":[80,58],"RTX 3050 8GB":[76,54]
  }
 },
 "Marvel Rivals":{
  url:"https://dropreference.com/en/benchmarks/marvel-rivals",
  rows:{
   "RX 6900 XT":[87,52],"RTX 4070 Ti":[85,52],"RX 6800 XT":[84,53],"RTX 4070 Super":[83,53],
   "RX 7700 XT":[82,48],"RX 6800":[81,48],"Arc A770 16GB":[79,45],"RTX 3080 10GB":[78,50],
   "RX 9060 XT 16GB":[78,48],"Arc B580":[78,46],"RTX 4070":[76,48],"RTX 3070 Ti":[76,46],
   "RX 9060 XT 8GB":[76,49],"RTX 2080 Ti":[75,47],"RTX 5060 Ti 16GB":[75,48],
   "RTX 4060 Ti 16GB":[72,44],"RTX 5060 Ti 8GB":[72,45],"RX 6700 XT":[71,44],
   "RTX 3070":[70,43],"Arc A750":[70,45],"Arc B570":[70,44]
  }
 }
};
function norm(s){return String(s||"").toLowerCase().replace(/nvidia|geforce|amd|radeon|intel|graphics|gpu/gi," ").replace(/\s+/g," ").trim()}
function exact(game,gpu){
 const g=VERIFIED[game];if(!g)return null;const n=norm(gpu);
 for(const [k,v] of Object.entries(g.rows)){
  const nk=norm(k);
  if(n===nk||n.includes(nk)||nk.includes(n))return {game,gpu:k,avg:v[0],low:v[1],exact:true,url:g.url,source:"DropReference",verified:true}
 }
 return null;
}
window.PCDealVerifiedFPS={SOURCE,VERIFIED,exact};
})();