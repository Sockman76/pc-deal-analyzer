// PCDeal V9 — Source-backed benchmark calibration layer
// Snapshot date: 2026-08-31
// Sources:
// GPU hierarchy: Tom's Hardware, updated 2026-06-24
// CPU hierarchy: Tom's Hardware, updated 2026-08-26
(() => {
"use strict";

const SOURCES = {
  gpu: {
    name: "Tom's Hardware GPU Benchmarks Hierarchy 2026",
    url: "https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html",
    updated: "2026-06-24",
    methodology: "Native-resolution gaming aggregate across 1080p, 1440p and 4K; no upscaling/frame generation in the hierarchy."
  },
  cpu: {
    name: "Tom's Hardware CPU Benchmarks Hierarchy 2026",
    url: "https://www.tomshardware.com/reviews/cpu-hierarchy,4312.html",
    updated: "2026-08-26",
    methodology: "1080p gaming hierarchy plus separate single-/multi-threaded application rankings where explicitly stored."
  }
};

// Percentages are relative performance indexes from the cited hierarchy snapshots.
// FPS fields are aggregate FPS values published in the GPU hierarchy table.
const GPU = {
  "RTX 5090": {p1080:100.0,p1440:100.0,p4k:100.0,f1080:203.8,f1440:167.3,f4k:110.8,msrpUSD:1999.99},
  "RTX 4090": {p1080:90.1,p1440:85.7,p4k:80.4,f1080:183.6,f1440:143.4,f4k:89.1,msrpUSD:1599.99},
  "RTX 5080": {p1080:81.9,p1440:76.7,p4k:69.8,f1080:166.9,f1440:128.3,f4k:77.4,msrpUSD:999.99},
  "RX 7900 XTX": {p1080:79.3,p1440:73.1,p4k:63.7,f1080:161.5,f1440:122.3,f4k:70.6,msrpUSD:999.99},
  "RTX 4080 Super": {p1080:78.0,p1440:70.9,p4k:62.6,f1080:158.9,f1440:118.6,f4k:69.4,msrpUSD:999.99},
  "RTX 4080": {p1080:77.2,p1440:70.3,p4k:60.9,f1080:157.3,f1440:117.5,f4k:67.5,msrpUSD:1199.99},
  "RTX 5070 Ti": {p1080:76.2,p1440:69.8,p4k:61.9,f1080:155.4,f1440:116.8,f4k:68.6,msrpUSD:749.99},
  "RX 9070 XT": {p1080:76.9,p1440:69.7,p4k:59.4,f1080:156.6,f1440:116.5,f4k:65.8,msrpUSD:599.99},
  "RX 7900 XT": {p1080:71.3,p1440:64.6,p4k:54.0,f1080:145.4,f1440:108.0,f4k:59.8,msrpUSD:899.99},
  "RTX 4070 Ti Super": {p1080:69.3,p1440:62.1,p4k:52.8,f1080:141.2,f1440:104.0,f4k:58.5,msrpUSD:799.99},
  "RX 9070": {p1080:69.1,p1440:62.1,p4k:52.1,f1080:140.9,f1440:104.0,f4k:57.7,msrpUSD:549.99},
  "RTX 3090 Ti": {p1080:64.7,p1440:59.7,p4k:53.5,f1080:131.7,f1440:99.9,f4k:59.3,msrpUSD:1999.99},
  "RTX 4070 Super": {p1080:62.2,p1440:54.5,p4k:44.4,f1080:126.7,f1440:91.2,f4k:49.2,msrpUSD:599.99},
  "RX 6950 XT": {p1080:60.5,p1440:53.5,p4k:43.6,f1080:123.3,f1440:89.5,f4k:48.3,msrpUSD:1099.99},
  "RTX 3080 Ti": {p1080:58.7,p1440:53.3,p4k:46.0,f1080:119.6,f1440:89.1,f4k:51.0,msrpUSD:1199.99},
  "RX 9070 GRE": {p1080:59.2,p1440:51.8,p4k:41.8,f1080:120.6,f1440:86.6,f4k:46.3,msrpUSD:549.99},
  "RX 7800 XT": {p1080:58.1,p1440:50.7,p4k:40.7,f1080:118.4,f1440:84.7,f4k:45.1,msrpUSD:499.99},
  "RX 6900 XT": {p1080:57.4,p1440:50.2,p4k:40.5,f1080:117.1,f1440:83.9,f4k:44.9,msrpUSD:999.99},
  "RTX 3080 10GB": {p1080:54.8,p1440:49.0,p4k:39.6,f1080:111.6,f1440:82.0,f4k:43.9,msrpUSD:699.99},
  "RTX 3080": {p1080:54.8,p1440:49.0,p4k:39.6,f1080:111.6,f1440:82.0,f4k:43.9,msrpUSD:699.99},
  "RX 6800 XT": {p1080:54.9,p1440:47.6,p4k:38.1,f1080:111.8,f1440:79.6,f4k:42.2,msrpUSD:649.99},
  "RTX 4070": {p1080:54.7,p1440:46.5,p4k:37.2,f1080:111.5,f1440:77.8,f4k:41.3,msrpUSD:549.99}
};

const CPU = {
  "Ryzen 7 9850X3D": {gaming1080:100.0,streetUSD:484,msrpUSD:500},
  "Ryzen 7 9800X3D": {gaming1080:97.0,streetUSD:415,msrpUSD:480},
  "Ryzen 9 9950X3D": {gaming1080:95.7,streetUSD:569,msrpUSD:700,multiThread:96.2},
  "Ryzen 9 9900X3D": {gaming1080:86.9,streetUSD:510,msrpUSD:600},
  "Ryzen 7 7800X3D": {gaming1080:85.6,streetUSD:330,msrpUSD:450},
  "Ryzen 5 7600X3D": {gaming1080:80.6,streetUSD:240,msrpUSD:300},
  "Core i9-14900K": {gaming1080:78.2,streetUSD:396,msrpUSD:550,multiThread:80.7},
  "i9-14900K": {gaming1080:78.2,streetUSD:396,msrpUSD:550,multiThread:80.7},
  "Core Ultra 7 270K Plus": {gaming1080:77.5,streetUSD:290,msrpUSD:300,multiThread:91.9},
  "Ryzen 9 7900X3D": {gaming1080:77.1,streetUSD:0,msrpUSD:600}
};

function norm(s){
  return String(s||"").toLowerCase()
    .replace(/nvidia|geforce|amd|radeon|intel|processor|graphics|gpu|cpu/gi," ")
    .replace(/\s+/g," ").trim();
}
function fuzzy(map,name){
  const n=norm(name);
  let best=null,score=0;
  for(const [key,val] of Object.entries(map)){
    const k=norm(key);
    if(n===k)return {key,...val};
    if(n.includes(k)||k.includes(n)){
      const s=Math.min(n.length,k.length)/Math.max(n.length,k.length);
      if(s>score){score=s;best={key,...val}}
    }
  }
  return score>=0.72?best:null;
}
function gpu(name){return fuzzy(GPU,name)}
function cpu(name){return fuzzy(CPU,name)}
function gpuScore(name,res="1440"){
  const x=gpu(name);if(!x)return null;
  return res==="1080"?x.p1080:res==="2160"||res==="4k"?x.p4k:x.p1440;
}
function gpuAggregateFPS(name,res="1440"){
  const x=gpu(name);if(!x)return null;
  return res==="1080"?x.f1080:res==="2160"||res==="4k"?x.f4k:x.f1440;
}
function cpuGaming(name){return cpu(name)?.gaming1080||null}
function quality(name,type){
  const x=type==="cpu"?cpu(name):gpu(name);
  return x?{level:"source-backed",source:type==="cpu"?SOURCES.cpu:SOURCES.gpu,entry:x}:{level:"heuristic",source:null,entry:null};
}
window.PCDealBenchmarks={SOURCES,GPU,CPU,gpu,cpu,gpuScore,gpuAggregateFPS,cpuGaming,quality};
})();