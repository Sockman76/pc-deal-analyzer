
// PCDeal V7 — broad consumer desktop CPU catalog + universal fallback recognizer.
(() => {
"use strict";
const C=[];

function add(name, performance, value, meta={}){
  C.push({name,performance,value,brand:meta.brand||(/ryzen|athlon|fx/i.test(name)?"AMD":"Intel"),
    platform:meta.platform||"",memory:meta.memory||[],cores:meta.cores||0,threads:meta.threads||0,
    msrpUSD:meta.msrpUSD||0,launchYear:meta.launchYear||0,aliases:meta.aliases||[]});
}
const ai=(name,p,v,platform,memory,year,cores=0,threads=0,msrpUSD=0)=>add(name,p,v,{brand:"Intel",platform,memory,launchYear:year,cores,threads,msrpUSD});
const aa=(name,p,v,platform,memory,year,cores=0,threads=0,msrpUSD=0)=>add(name,p,v,{brand:"AMD",platform,memory,launchYear:year,cores,threads,msrpUSD});

// Intel 2nd–7th gen
[
["i3-2100",18,18],["i3-2120",19,20],["i5-2300",23,22],["i5-2400",25,25],["i5-2500K",28,35],["i7-2600",32,40],["i7-2600K",34,45],["i7-2700K",35,48],
["i3-3220",20,18],["i5-3330",25,22],["i5-3450",27,25],["i5-3470",28,28],["i5-3570",30,30],["i5-3570K",32,38],["i7-3770",37,45],["i7-3770K",39,55],
["i3-4130",22,18],["i3-4150",23,20],["i3-4160",24,22],["i5-4430",30,24],["i5-4440",31,25],["i5-4460",32,28],["i5-4570",34,30],["i5-4590",35,32],["i5-4670K",37,40],["i5-4690K",39,45],["i7-4770",43,50],["i7-4770K",45,60],["i7-4790",46,55],["i7-4790K",49,70],
["i3-6100",28,22],["i3-6300",30,25],["i5-6400",35,30],["i5-6500",37,35],["i5-6600",40,38],["i5-6600K",42,45],["i7-6700",48,55],["i7-6700K",51,65],
["i3-7100",31,22],["i3-7300",33,25],["i5-7400",38,30],["i5-7500",40,35],["i5-7600",42,38],["i5-7600K",45,45],["i7-7700",53,60],["i7-7700K",56,70]
].forEach(x=>ai(x[0],x[1],x[2],/^i[357]-[23]/.test(x[0])?"LGA1155":/^i[357]-4/.test(x[0])?"LGA1150":"LGA1151",[/^i[357]-[234]/.test(x[0])?"DDR3":"DDR4"],+("20"+({2:11,3:12,4:13,6:15,7:17}[x[0].match(/\d/)[0]]||15))));

// Intel 8th–14th gen + Core Ultra desktop
[
["i3-8100",39,35,2017,4,4],["i3-8350K",43,45,2017,4,4],["i5-8400",50,45,2017,6,6],["i5-8500",52,50,2018,6,6],["i5-8600K",56,60,2017,6,6],["i7-8700",64,75,2017,6,12],["i7-8700K",68,85,2017,6,12],
["i3-9100F",42,30,2019,4,4],["i5-9400F",52,45,2019,6,6],["i5-9600K",59,60,2018,6,6],["i7-9700",67,75,2019,8,8],["i7-9700K",71,85,2018,8,8],["i9-9900K",78,110,2018,8,16],["i9-9900KS",80,125,2019,8,16],
["i3-10100F",47,35,2020,4,8],["i3-10300",49,40,2020,4,8],["i5-10400F",57,55,2020,6,12],["i5-10500",59,60,2020,6,12],["i5-10600K",65,75,2020,6,12],["i7-10700",72,85,2020,8,16],["i7-10700K",76,100,2020,8,16],["i9-10850K",81,120,2020,10,20],["i9-10900K",84,135,2020,10,20],
["i5-11400F",61,60,2021,6,12],["i5-11500",63,65,2021,6,12],["i5-11600K",68,80,2021,6,12],["i7-11700",75,90,2021,8,16],["i7-11700K",78,100,2021,8,16],["i9-11900K",82,120,2021,8,16],
["i3-12100F",62,65,2022,4,8],["i5-12400F",73,95,2022,6,12],["i5-12500",75,105,2022,6,12],["i5-12600K",84,145,2021,10,16],["i7-12700",90,180,2022,12,20],["i7-12700K",93,200,2021,12,20],["i9-12900K",97,240,2021,16,24],["i9-12900KS",99,270,2022,16,24],
["i3-13100F",66,75,2023,4,8],["i5-13400F",79,120,2023,10,16],["i5-13500",83,140,2023,14,20],["i5-13600K",92,195,2022,14,20],["i7-13700K",98,260,2022,16,24],["i9-13900K",103,330,2022,24,32],["i9-13900KS",105,370,2023,24,32],
["i3-14100F",68,80,2024,4,8],["i5-14400F",82,130,2024,10,16],["i5-14500",86,150,2024,14,20],["i5-14600K",95,210,2023,14,20],["i7-14700K",102,290,2023,20,28],["i9-14900K",106,360,2023,24,32],["i9-14900KS",108,420,2024,24,32]
].forEach(x=>{
 const gen=parseInt(x[0].match(/-(\d+)/)[1].slice(0,-3));
 const platform=gen<=9?"LGA1151-v2":gen<=11?"LGA1200":"LGA1700";
 ai(x[0],x[1],x[2],platform,gen>=12?["DDR4","DDR5"]:["DDR4"],x[3],x[4],x[5]);
});
[
["Core Ultra 5 225",84,170,2025],["Core Ultra 5 225F",84,160,2025],["Core Ultra 5 245K",96,245,2024],["Core Ultra 5 245KF",96,225,2024],
["Core Ultra 7 265K",103,320,2024],["Core Ultra 7 265KF",103,300,2024],["Core Ultra 9 285K",109,450,2024]
].forEach(x=>ai(x[0],x[1],x[2],"LGA1851",["DDR5"],x[3]));

// AMD legacy + Ryzen
[["FX-4300",20,15],["FX-6300",25,20],["FX-8320",29,25],["FX-8350",31,30],["FX-8370",32,35]].forEach(x=>aa(x[0],x[1],x[2],"AM3+",["DDR3"],2012));
[
["Ryzen 3 1200",34,30,2017,4,4],["Ryzen 3 1300X",37,35,2017,4,4],["Ryzen 5 1400",42,40,2017,4,8],["Ryzen 5 1500X",45,45,2017,4,8],["Ryzen 5 1600",50,50,2017,6,12],["Ryzen 5 1600X",53,55,2017,6,12],["Ryzen 7 1700",58,65,2017,8,16],["Ryzen 7 1700X",60,70,2017,8,16],["Ryzen 7 1800X",62,75,2017,8,16],
["Ryzen 3 2200G",38,35,2018,4,4],["Ryzen 5 2400G",46,45,2018,4,8],["Ryzen 5 2600",58,60,2018,6,12],["Ryzen 5 2600X",61,65,2018,6,12],["Ryzen 7 2700",67,75,2018,8,16],["Ryzen 7 2700X",70,85,2018,8,16],
["Ryzen 3 3100",55,50,2020,4,8],["Ryzen 3 3200G",43,40,2019,4,4],["Ryzen 3 3300X",61,60,2020,4,8],["Ryzen 5 3400G",50,50,2019,4,8],["Ryzen 5 3500X",60,55,2019,6,6],["Ryzen 5 3600",68,70,2019,6,12],["Ryzen 5 3600X",71,75,2019,6,12],["Ryzen 5 3600XT",73,80,2020,6,12],["Ryzen 7 3700X",77,90,2019,8,16],["Ryzen 7 3800X",80,100,2019,8,16],["Ryzen 7 3800XT",82,105,2020,8,16],["Ryzen 9 3900X",86,135,2019,12,24],["Ryzen 9 3950X",90,170,2019,16,32],
["Ryzen 3 4100",57,45,2022,4,8],["Ryzen 5 4500",64,55,2022,6,12],["Ryzen 5 4600G",66,65,2020,6,12],["Ryzen 7 4700G",73,80,2020,8,16],
["Ryzen 5 5500",69,65,2022,6,12],["Ryzen 5 5600G",74,80,2021,6,12],["Ryzen 5 5600GT",76,85,2024,6,12],["Ryzen 5 5600",78,85,2022,6,12],["Ryzen 5 5600X",81,95,2020,6,12],["Ryzen 5 5600XT",83,105,2024,6,12],["Ryzen 7 5700G",80,95,2021,8,16],["Ryzen 7 5700X",86,115,2022,8,16],["Ryzen 7 5700X3D",96,180,2024,8,16],["Ryzen 7 5800X",89,125,2020,8,16],["Ryzen 7 5800X3D",100,210,2022,8,16],["Ryzen 9 5900X",95,170,2020,12,24],["Ryzen 9 5950X",98,220,2020,16,32]
].forEach(x=>aa(x[0],x[1],x[2],"AM4",["DDR4"],x[3],x[4],x[5]));
[
["Ryzen 5 7500F",86,135,2023,6,12],["Ryzen 5 7600",90,160,2023,6,12],["Ryzen 5 7600X",93,175,2022,6,12],["Ryzen 5 7600X3D",101,245,2024,6,12],
["Ryzen 7 7700",96,220,2023,8,16],["Ryzen 7 7700X",98,235,2022,8,16],["Ryzen 7 7800X3D",110,350,2023,8,16],["Ryzen 9 7900",101,300,2023,12,24],["Ryzen 9 7900X",103,320,2022,12,24],["Ryzen 9 7900X3D",108,380,2023,12,24],["Ryzen 9 7950X",108,400,2022,16,32],["Ryzen 9 7950X3D",113,470,2023,16,32],
["Ryzen 3 8300G",73,110,2024,4,8],["Ryzen 5 8500G",83,155,2024,6,12],["Ryzen 5 8600G",89,190,2024,6,12],["Ryzen 7 8700G",95,245,2024,8,16],
["Ryzen 5 9600X",98,200,2024,6,12],["Ryzen 7 9700X",103,255,2024,8,16],["Ryzen 7 9800X3D",118,430,2024,8,16],["Ryzen 9 9900X",108,340,2024,12,24],["Ryzen 9 9900X3D",116,470,2025,12,24],["Ryzen 9 9950X",113,455,2024,16,32],["Ryzen 9 9950X3D",120,580,2025,16,32]
].forEach(x=>aa(x[0],x[1],x[2],"AM5",["DDR5"],x[3],x[4],x[5]));

// Add common K/F/KF variants when a base exists.
const snapshot=[...C];
for(const p of snapshot){
  if(/^i[3579]-\d{4,5}$/.test(p.name)){
    ["F"].forEach(s=>{ if(!C.some(x=>x.name===p.name+s)) add(p.name+s,p.performance,p.value-5,{...p,aliases:[]}); });
  }
}

function norm(v){return String(v||"").toLowerCase().replace(/intel|amd|processor|cpu|desktop/gi," ").replace(/[®™]/g,"").replace(/\s+/g," ").trim();}
function exactCandidates(q){
  const n=norm(q);
  return C.filter(p=>{
    const pn=norm(p.name);
    return n===pn || n.includes(pn) || p.aliases.some(a=>n.includes(norm(a)));
  }).sort((a,b)=>b.name.length-a.name.length);
}
function inferIntel(name){
  const m=String(name).match(/\b(?:core\s+)?i([3579])[-\s]?(\d{4,5})(k?s?|kf|f|t)?\b/i);
  if(!m)return null;
  const tier=+m[1], digits=m[2], suffix=(m[3]||"").toUpperCase();
  const gen=digits.length===5?+digits.slice(0,2):+digits[0];
  const perf=clampCPU((gen*6)+(tier-3)*8+(suffix.includes("K")?3:0));
  const used=Math.max(15,Math.round(perf*1.7));
  return {name:`i${tier}-${digits}${suffix}`,brand:"Intel",performance:perf,value:used,platform:gen>=15?"LGA1851":gen>=12?"LGA1700":gen>=10?"LGA1200":gen>=8?"LGA1151-v2":gen>=6?"LGA1151":gen===4?"LGA1150":"LGA1155",memory:gen>=15?["DDR5"]:gen>=12?["DDR4","DDR5"]:gen>=6?["DDR4"]:["DDR3"],confidence:"heuristic"};
}
function inferRyzen(name){
  const m=String(name).match(/\bryzen\s+([3579])\s+(\d{4})(x3d|xt|x|g|ge|gt|f)?\b/i);
  if(!m)return null;
  const tier=+m[1], model=+m[2], suffix=(m[3]||"").toUpperCase(), series=Math.floor(model/1000);
  const base={1:38,2:48,3:62,4:63,5:77,7:92,8:88,9:101}[series]||70;
  const perf=clampCPU(base+(tier-3)*4+(suffix==="X3D"?10:suffix==="X"?2:0));
  return {name:`Ryzen ${tier} ${model}${suffix}`,brand:"AMD",performance:perf,value:Math.round(perf*1.75),platform:series>=7?"AM5":"AM4",memory:series>=7?["DDR5"]:["DDR4"],confidence:"heuristic"};
}
function inferUltra(name){
  const m=String(name).match(/\bcore\s+ultra\s+([579])\s+(\d{3})(k|kf|f)?\b/i);if(!m)return null;
  const tier=+m[1],model=m[2],suffix=(m[3]||"").toUpperCase(),perf=82+(tier-5)*6+(suffix.includes("K")?3:0);
  return {name:`Core Ultra ${tier} ${model}${suffix}`,brand:"Intel",performance:perf,value:Math.round(perf*2.3),platform:"LGA1851",memory:["DDR5"],confidence:"heuristic"};
}
function clampCPU(n){return Math.max(12,Math.min(125,Math.round(n)))}
function findCPU(q){return exactCandidates(q)[0]||inferUltra(q)||inferRyzen(q)||inferIntel(q)||null}
function detectCPUFromText(text){
  const raw=String(text||"");
  const patterns=[/\bcore\s+ultra\s+[579]\s+\d{3}(?:kf|k|f)?\b/i,/\bryzen\s+[3579]\s+\d{4}(?:x3d|xt|x|g|ge|gt|f)?\b/i,/\b(?:core\s+)?i[3579][-\s]?\d{4,5}(?:ks|kf|k|f|t)?\b/i,/\bfx[-\s]?\d{4}\b/i];
  for(const r of patterns){const m=raw.match(r);if(m)return findCPU(m[0])||{name:m[0],performance:0,value:0,confidence:"recognized"}}
  return null;
}
function detectCPUFromListing(text){const c=detectCPUFromText(text);return c?.name||""}
window.cpuDatabase=C;
window.CPU_DATABASE=C;
window.findCPU=findCPU;
window.detectCPUFromText=detectCPUFromText;
window.detectCPUFromListing=detectCPUFromListing;
})();
