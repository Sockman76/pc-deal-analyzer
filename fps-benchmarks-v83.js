// PCDeal V8.3 — per-game FPS benchmark anchors
// DropReference benchmark snapshots, August 2026.
// Values below are benchmark-page average FPS / 1% low anchors at the page's default 1080p benchmark view.
// PCDeal uses interpolation for unlisted GPUs and explicitly labels any further settings/resolution adjustment as modelled.
(() => {
"use strict";
const SOURCE={name:"DropReference",url:"https://dropreference.com/en/benchmarks",updated:"August 2026",baseline:"Per-game benchmark anchors; DropReference pages support CPU and 1080p/1440p/2160p filters."};
const GAMES={
 "Apex Legends":{cpuSensitivity:.62,rows:{
  "RTX 5090":[367,234],"RTX 4090":[334,216],"RX 7900 XTX":[314,203],"RTX 5080":[310,189],"RX 9070 XT":[306,186],"RX 7900 XT":[304,189],"RTX 4080":[283,183],"RTX 4080 Super":[283,192],"RTX 5070 Ti":[282,180],"RX 9070":[280,183],"RTX 4070 Ti Super":[279,181]
 }},
 "Marvel Rivals":{cpuSensitivity:.54,rows:{
  "RTX 5090":[134,71],"RX 7900 XTX":[113,62],"RTX 4090":[113,65],"RTX 5080":[106,62],"RX 9070 XT":[105,63],"RX 7900 XT":[104,59],"RTX 5070 Ti":[98,58],"RTX 4080 Super":[97,61],"RX 7900 GRE":[96,55],"RX 9070":[95,59],"RTX 4080":[95,59],"RTX 3090 Ti":[95,56],"RTX 3090":[94,55],"RTX 3080 Ti":[91,54],"RTX 5070":[90,54],"RTX 4070 Ti Super":[90,55],"Arc B580":[78,46],"RTX 4070":[76,48],"RTX 3070 Ti":[76,46],"RX 6700 XT":[71,44],"RTX 3070":[70,43],"Arc A750":[70,45],"RX 7600 XT":[69,41],"RTX 3060 Ti":[67,44],"RX 7600":[66,40]
 }},
 "Red Dead Redemption 2":{cpuSensitivity:.34,rows:{
  "RTX 5090":[265,180],"RTX 4090":[205,147],"RTX 5080":[199,134],"RX 7900 XTX":[192,135],"RX 9070 XT":[186,124],"RTX 4080":[179,122],"RTX 4080 Super":[178,128],"RTX 5070 Ti":[177,121],"RX 7900 XT":[176,122],"RTX 3090 Ti":[171,118],"RX 9070":[169,124],"RTX 4070 Ti Super":[164,117],"RTX 5070":[161,108],"RTX 3090":[160,109],"RTX 4070 Ti":[159,109],"RTX 3080 10GB":[138,99],"RX 6800":[135,96],"RX 7700 XT":[131,97],"Arc A770 16GB":[129,85],"RX 6750 XT":[125,83],"Arc B580":[125,89],"RTX 2080 Ti":[124,88],"RTX 3070 Ti":[119,88],"RX 6700 XT":[118,87],"RTX 3070":[118,80],"Arc A750":[115,79],"RX 7600 XT":[115,84],"RTX 3060 Ti":[110,77],"RTX 4060":[104,73],"RX 7600":[103,75],"RTX 3060 12GB":[94,64],"GTX 1660 Ti":[85,59],"GTX 1660 Super":[83,60],"GTX 1660":[80,58],"RTX 3050 8GB":[76,54]
 }},
 "Grand Theft Auto V":{cpuSensitivity:.58,rows:{
  "RTX 5090":[225,165],"RTX 4090":[175,128],"RTX 5080":[155,114],"RX 7900 XTX":[150,113],"RX 9070 XT":[147,108],"RTX 4080 Super":[141,107],"RX 7900 XT":[137,104],"RTX 5070 Ti":[137,101],"RTX 4080":[135,103],"RX 9070":[131,102],"RTX 4070 Ti Super":[122,90]
 }},
 "ELDEN RING":{cpuSensitivity:.42,rows:{
  "RTX 5090":[175,123],"RTX 4090":[154,105],"RX 7900 XTX":[147,96],"RTX 5080":[143,105],"RX 9070 XT":[138,96],"RX 7900 XT":[137,92],"RTX 4080 Super":[136,98],"RTX 5070 Ti":[136,97],"RTX 4080":[134,98],"RTX 3090 Ti":[133,89],"RX 9070":[131,96]
 }},
 "DEATHLOOP":{cpuSensitivity:.43,rows:{
  "RTX 5090":[240,182],"RTX 4090":[201,147],"RTX 5080":[180,136],"RX 7900 XTX":[173,131],"RX 9070 XT":[169,129],"RTX 4080 Super":[167,120],"RTX 4080":[162,115],"RX 9070":[161,116],"RX 7900 XT":[161,119],"RTX 5070 Ti":[157,121],"RTX 4070 Ti Super":[150,106],"RTX 3090 Ti":[146,98],"RTX 4070 Ti":[144,101]
 }},
 "Control":{cpuSensitivity:.30,rows:{
  "RX 6700":[111,78],"RX 7600 XT":[110,77],"RTX 4060":[109,76],"RTX 2070 Super":[108,74],"RTX 3060 Ti":[108,76],"RTX 5050":[107,73],"RX 6600 XT":[106,70],"RTX 2080":[106,77],"RX 7600":[105,74],"RX 6650 XT":[101,74],"RTX 2070":[101,68],"RX 6600":[100,67],"RTX 2060 Super":[99,71],"RTX 3060 12GB":[93,66],"GTX 1660 Super":[92,60],"GTX 1660 Ti":[87,63],"RTX 3050 8GB":[85,60],"GTX 1660":[85,58],"GTX 1650 Super":[85,57],"GTX 1650":[82,56],"RX 6400":[80,56],"GTX 1050 Ti":[74,51]
 }}
};
function norm(s){return String(s||"").toLowerCase().replace(/nvidia|geforce|amd|radeon|intel|graphics|gpu/gi," ").replace(/\s+/g," ").trim()}
function perfScore(name){const b=window.PCDealBenchmarks?.gpu?.(name);return b?.p1080||window.findGPU?.(name)?.performance||0}
function exactRow(game,gpu){const x=GAMES[game];if(!x)return null;const n=norm(gpu);for(const [k,v] of Object.entries(x.rows)){if(norm(k)===n||n.includes(norm(k))||norm(k).includes(n))return {gpu:k,avg:v[0],low:v[1],exact:true}}return null}
function interpolatedRow(game,gpu){const x=GAMES[game];if(!x)return null;const ex=exactRow(game,gpu);if(ex)return ex;const target=perfScore(gpu);if(!target)return null;const pts=Object.entries(x.rows).map(([k,v])=>({gpu:k,avg:v[0],low:v[1],p:perfScore(k)})).filter(x=>x.p).sort((a,b)=>a.p-b.p);if(!pts.length)return null;let lo=pts[0],hi=pts[pts.length-1];for(let i=0;i<pts.length-1;i++){if(target>=pts[i].p&&target<=pts[i+1].p){lo=pts[i];hi=pts[i+1];break}}if(target<=pts[0].p){lo=hi=pts[0]}if(target>=pts[pts.length-1].p){lo=hi=pts[pts.length-1]}const t=hi.p===lo.p?1:Math.max(0,Math.min(1,(target-lo.p)/(hi.p-lo.p)));return {gpu:String(gpu),avg:lo.avg+(hi.avg-lo.avg)*t,low:lo.low+(hi.low-lo.low)*t,exact:false,between:[lo.gpu,hi.gpu]}}
window.PCDealGameBenchmarks={SOURCE,GAMES,exactRow,interpolatedRow};
})();