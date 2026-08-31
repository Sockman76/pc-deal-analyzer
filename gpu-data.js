
// PCDeal V7 — broad consumer desktop GPU catalog + universal fallback recognizer.
(() => {
"use strict";
const G=[];
function add(name,performance,value,meta={}){G.push({name,performance,value,brand:meta.brand||(/rx|radeon/i.test(name)?"AMD":/arc/i.test(name)?"Intel":"NVIDIA"),vram:meta.vram||0,msrpUSD:meta.msrpUSD||0,launchYear:meta.launchYear||0,aliases:meta.aliases||[]})}
const n=(name,p,v,year=0,vram=0,msrpUSD=0)=>add(name,p,v,{brand:"NVIDIA",launchYear:year,vram,msrpUSD});
const a=(name,p,v,year=0,vram=0,msrpUSD=0)=>add(name,p,v,{brand:"AMD",launchYear:year,vram,msrpUSD});
const i=(name,p,v,year=0,vram=0,msrpUSD=0)=>add(name,p,v,{brand:"Intel",launchYear:year,vram,msrpUSD});

// NVIDIA legacy to RTX 50
[
["GTX 650",15,20,2012,1],["GTX 650 Ti",18,25,2012,1],["GTX 660",22,30,2012,2],["GTX 660 Ti",25,35,2012,2],["GTX 670",27,40,2012,2],["GTX 680",30,45,2012,2],["GTX 690",34,55,2012,4],
["GTX 750",20,25,2014,1],["GTX 750 Ti",24,35,2014,2],["GTX 760",29,40,2013,2],["GTX 770",33,45,2013,2],["GTX 780",37,50,2013,3],["GTX 780 Ti",41,60,2013,3],
["GTX 950",28,35,2015,2],["GTX 960",34,45,2015,4],["GTX 970",42,60,2014,4],["GTX 980",47,75,2014,4],["GTX 980 Ti",53,90,2015,6],
["GT 1030",22,35,2017,2],["GTX 1050",31,45,2016,2],["GTX 1050 Ti",36,55,2016,4],["GTX 1060 3GB",43,60,2016,3],["GTX 1060 6GB",47,70,2016,6],["GTX 1070",56,95,2016,8],["GTX 1070 Ti",61,110,2017,8],["GTX 1080",66,125,2016,8],["GTX 1080 Ti",75,170,2017,11],
["GTX 1630",29,55,2022,4],["GTX 1650",40,70,2019,4],["GTX 1650 Super",47,85,2019,4],["GTX 1660",52,100,2019,6],["GTX 1660 Super",56,115,2019,6],["GTX 1660 Ti",58,120,2019,6],
["RTX 2060",61,130,2019,6],["RTX 2060 Super",66,150,2019,8],["RTX 2070",69,160,2018,8],["RTX 2070 Super",74,180,2019,8],["RTX 2080",78,200,2018,8],["RTX 2080 Super",81,215,2019,8],["RTX 2080 Ti",88,260,2018,11],
["RTX 3050 6GB",54,120,2024,6],["RTX 3050 8GB",59,135,2022,8],["RTX 3060 8GB",66,160,2022,8],["RTX 3060 12GB",70,180,2021,12],["RTX 3060 Ti",78,220,2020,8],["RTX 3070",84,250,2020,8],["RTX 3070 Ti",88,280,2021,8],["RTX 3080 10GB",96,330,2020,10],["RTX 3080 12GB",99,360,2022,12],["RTX 3080 Ti",104,400,2021,12],["RTX 3090",108,470,2020,24],["RTX 3090 Ti",111,520,2022,24],
["RTX 4060",76,250,2023,8],["RTX 4060 Ti 8GB",84,310,2023,8],["RTX 4060 Ti 16GB",86,350,2023,16],["RTX 4070",94,410,2023,12],["RTX 4070 Super",101,480,2024,12],["RTX 4070 Ti",105,540,2023,12],["RTX 4070 Ti Super",110,620,2024,16],["RTX 4080",118,760,2022,16],["RTX 4080 Super",121,800,2024,16],["RTX 4090",135,1250,2022,24],
["RTX 5050",72,230,2025,8],["RTX 5060",88,320,2025,8],["RTX 5060 Ti 8GB",97,390,2025,8],["RTX 5060 Ti 16GB",99,450,2025,16],["RTX 5070",109,560,2025,12],["RTX 5070 Ti",119,720,2025,16],["RTX 5080",130,950,2025,16],["RTX 5090",150,1650,2025,32]
].forEach(x=>n(...x));

// AMD Radeon
[
["HD 7750",14,18,2012,1],["HD 7770",17,22,2012,1],["HD 7850",22,28,2012,2],["HD 7870",25,32,2012,2],["HD 7950",29,38,2012,3],["HD 7970",32,45,2012,3],
["R7 250",16,20,2013,2],["R7 260X",21,25,2013,2],["R9 270",28,35,2013,2],["R9 270X",30,38,2013,2],["R9 280",34,42,2014,3],["R9 280X",37,48,2013,3],["R9 285",39,50,2014,2],["R9 290",43,55,2013,4],["R9 290X",46,60,2013,4],["R9 380",41,55,2015,4],["R9 390",48,65,2015,8],["R9 390X",51,70,2015,8],["R9 Fury",54,80,2015,4],["R9 Fury X",57,90,2015,4],
["RX 460",28,35,2016,4],["RX 470",39,50,2016,4],["RX 480 4GB",44,60,2016,4],["RX 480 8GB",47,70,2016,8],
["RX 550",24,35,2017,4],["RX 560",31,40,2017,4],["RX 570 4GB",42,55,2017,4],["RX 570 8GB",44,60,2017,8],["RX 580 4GB",47,60,2017,4],["RX 580 8GB",50,70,2017,8],["RX 590",54,80,2018,8],
["RX Vega 56",60,100,2017,8],["RX Vega 64",64,115,2017,8],["Radeon VII",70,150,2019,16],
["RX 5500 XT 4GB",48,80,2019,4],["RX 5500 XT 8GB",51,90,2019,8],["RX 5600 XT",62,120,2020,6],["RX 5700",70,150,2019,8],["RX 5700 XT",75,175,2019,8],
["RX 6400",45,90,2022,4],["RX 6500 XT",51,105,2022,4],["RX 6600",68,160,2021,8],["RX 6600 XT",75,190,2021,8],["RX 6650 XT",79,210,2022,8],["RX 6700 10GB",82,225,2022,10],["RX 6700 XT",87,250,2021,12],["RX 6750 XT",91,280,2022,12],["RX 6800",100,340,2020,16],["RX 6800 XT",106,390,2020,16],["RX 6900 XT",111,440,2020,16],["RX 6950 XT",115,480,2022,16],
["RX 7600",77,250,2023,8],["RX 7600 XT",82,300,2024,16],["RX 7700 XT",96,390,2023,12],["RX 7800 XT",104,470,2023,16],["RX 7900 GRE",110,540,2024,16],["RX 7900 XT",119,680,2022,20],["RX 7900 XTX",126,800,2022,24],
["RX 9060 XT 8GB",92,360,2025,8],["RX 9060 XT 16GB",96,420,2025,16],["RX 9070",112,580,2025,16],["RX 9070 XT",120,680,2025,16]
].forEach(x=>a(...x));

[["Arc A310",34,60,2022,4],["Arc A380",43,80,2022,6],["Arc A580",67,140,2023,8],["Arc A750",76,180,2022,8],["Arc A770 8GB",82,210,2022,8],["Arc A770 16GB",85,240,2022,16],["Arc B570",80,210,2025,10],["Arc B580",91,270,2024,12]].forEach(x=>i(...x));

function norm(v){return String(v||"").toLowerCase().replace(/nvidia|geforce|amd|radeon|graphics|gpu/gi," ").replace(/\s+/g," ").trim();}
function candidates(q){
 const x=norm(q);
 return G.filter(p=>x===norm(p.name)||x.includes(norm(p.name))||p.aliases.some(a=>x.includes(norm(a)))).sort((a,b)=>b.name.length-a.name.length)
}
function inferGPU(q){
 const s=String(q||"");
 let m=s.match(/\b(?:rtx|gtx|gt)\s*(\d{3,4})(?:\s*(ti|super))?(?:\s*(\d{1,2})\s*gb)?\b/i);
 if(m){const family=/rtx/i.test(m[0])?"RTX":/gtx/i.test(m[0])?"GTX":"GT",model=+m[1],mod=(m[2]||"").replace(/^./,x=>x.toUpperCase()),vram=+(m[3]||0),series=Math.floor(model/1000),perf=Math.max(20,Math.min(150,(series||1)*14+(model%1000)/18+(mod?6:0)));return{name:`${family} ${model}${mod?" "+mod:""}${vram?` ${vram}GB`:""}`,brand:"NVIDIA",performance:Math.round(perf),value:Math.round(perf*3.1),vram,confidence:"heuristic"}}
 m=s.match(/\brx\s*(\d{3,4})(?:\s*(xtx|xt|gre))?(?:\s*(\d{1,2})\s*gb)?\b/i);
 if(m){const model=+m[1],mod=(m[2]||"").toUpperCase(),vram=+(m[3]||0),series=Math.floor(model/1000),perf=Math.max(24,Math.min(140,series*13+(model%1000)/18+(mod==="XTX"?10:mod==="XT"?6:mod==="GRE"?5:0)));return{name:`RX ${model}${mod?" "+mod:""}${vram?` ${vram}GB`:""}`,brand:"AMD",performance:Math.round(perf),value:Math.round(perf*3),vram,confidence:"heuristic"}}
 m=s.match(/\barc\s*([ab])(\d{3})(?:\s*(\d{1,2})\s*gb)?\b/i);
 if(m){const perf=55+(+m[2]-300)/10+(m[1].toUpperCase()==="B"?12:0);return{name:`Arc ${m[1].toUpperCase()}${m[2]}`,brand:"Intel",performance:Math.round(perf),value:Math.round(perf*2.7),vram:+m[3]||0,confidence:"heuristic"}}
 return null;
}
function findGPU(q){return candidates(q)[0]||inferGPU(q)||null}
function detectGPUFromText(text){
 const raw=String(text||"");
 const patterns=[/\b(?:rtx|gtx|gt)\s*\d{3,4}(?:\s*(?:ti|super))?(?:\s*\d{1,2}\s*gb)?\b/i,/\brx\s*\d{3,4}(?:\s*(?:xtx|xt|gre))?(?:\s*\d{1,2}\s*gb)?\b/i,/\barc\s*[ab]\d{3}(?:\s*\d{1,2}\s*gb)?\b/i,/\br9\s*(?:2|3)\d{2}x?\b/i,/\br7\s*2\d{2}x?\b/i,/\bhd\s*7\d{3}\b/i,/\bradeon\s+vii\b/i,/\bvega\s*(?:56|64)\b/i];
 for(const r of patterns){const m=raw.match(r);if(m)return findGPU(m[0])||{name:m[0],performance:0,value:0,confidence:"recognized"}}
 return null;
}
function detectGPUFromListing(text){const g=detectGPUFromText(text);return g?.name||""}
window.gpuDatabase=G;
window.GPU_DATABASE=G;
window.findGPU=findGPU;
window.detectGPUFromText=detectGPUFromText;
window.detectGPUFromListing=detectGPUFromListing;
})();
