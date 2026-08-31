
// PCDeal V8 — workload-aware system suitability + deeper FPS model
(() => {
"use strict";
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const num=v=>Number(v)||0;

const USES={
 gaming:{label:"Gaming",cpu:.30,gpu:.55,ram:.07,storage:.03,quality:.05},
 esports:{label:"Competitive / Esports",cpu:.45,gpu:.40,ram:.08,storage:.02,quality:.05},
 workstation:{label:"Extreme Workstation",cpu:.47,gpu:.22,ram:.18,storage:.08,quality:.05},
 editing:{label:"Video Editing",cpu:.34,gpu:.31,ram:.18,storage:.12,quality:.05},
 render:{label:"3D Rendering",cpu:.27,gpu:.48,ram:.15,storage:.05,quality:.05},
 ai:{label:"AI / ML",cpu:.16,gpu:.57,ram:.16,storage:.06,quality:.05},
 general:{label:"General / School / Office",cpu:.40,gpu:.10,ram:.22,storage:.18,quality:.10},
 mixed:{label:"Mixed Use",cpu:.31,gpu:.34,ram:.14,storage:.09,quality:.12}
};

const GAME_PROFILES={
 "Fortnite":{cpu:.80,gpu:.72,rt:.55,scale:1.20},
 "Counter-Strike 2":{cpu:1.00,gpu:.55,rt:0,scale:1.55},
 "Valorant":{cpu:1.08,gpu:.48,rt:0,scale:1.85},
 "Call of Duty: Warzone":{cpu:.82,gpu:.88,rt:.10,scale:.82},
 "Cyberpunk 2077":{cpu:.60,gpu:1.00,rt:1.00,scale:.60},
 "Grand Theft Auto V":{cpu:.82,gpu:.72,rt:.10,scale:1.12},
 "Grand Theft Auto V Enhanced":{cpu:.70,gpu:.93,rt:.75,scale:.75},
 "Apex Legends":{cpu:.85,gpu:.78,rt:0,scale:1.08},
 "Marvel Rivals":{cpu:.78,gpu:.84,rt:.25,scale:.90},
 "Minecraft Java":{cpu:1.00,gpu:.48,rt:.20,scale:1.35},
 "Forza Horizon 5":{cpu:.62,gpu:.94,rt:.25,scale:.91},
 "Red Dead Redemption 2":{cpu:.57,gpu:1.00,rt:0,scale:.70},
 "Rainbow Six Siege":{cpu:.93,gpu:.62,rt:0,scale:1.45},
 "Overwatch 2":{cpu:.92,gpu:.60,rt:0,scale:1.42},
 "Helldivers 2":{cpu:.78,gpu:.92,rt:0,scale:.70},
 "Black Myth: Wukong":{cpu:.55,gpu:1.00,rt:.80,scale:.55},
 "Alan Wake 2":{cpu:.50,gpu:1.00,rt:1.00,scale:.50}
};

function state(){
 try{return window.PCDEAL_V5?.getState?.()||JSON.parse(localStorage.getItem("pcdeal.v5.build")||"{}")}catch{return{}}
}
function ramScore(s){
 const gb=parseInt(s.ram)||0,details=window.detectRamDetails?.(s.listing||"")||{};
 let v=gb>=64?100:gb>=32?92:gb>=16?76:gb>=8?48:25;
 if(details.sticks===1)v-=10;
 if(details.speed){
   if(s.ramType==="DDR5"&&details.speed>=6000)v+=5;
   if(s.ramType==="DDR4"&&details.speed>=3200)v+=4;
 }
 return clamp(v);
}
function storageScore(s){
 const ds=s.drives?.length?s.drives:(window.detectStorageDetails?.(s.listing||"")||[]);
 if(!ds.length&&s.storageType)ds.push({type:s.storageType,size:s.storageSize||""});
 if(!ds.length)return 30;
 let score=ds.some(d=>d.type==="NVME M.2")?92:ds.some(d=>d.type==="SSD")?75:45;
 const cap=ds.reduce((a,d)=>{let n=parseFloat(d.size)||0;if(/TB/i.test(d.size))n*=1000;return a+n},0);
 if(cap>=2000)score+=5;if(cap<500)score-=10;
 return clamp(score);
}
function qualityScore(s){
 let v=45;
 const pq=window.getPSUQuality?.(s.psu);
 if(pq?.tier==="A")v+=22;else if(pq?.tier==="B")v+=14;else if(pq?.tier==="C")v+=4;
 if(s.motherboard)v+=9;if(s.cooler)v+=8;if(s.caseQuality==="premium")v+=10;else if(s.caseQuality==="mid")v+=6;
 return clamp(v);
}
function cpuScores(s){
 const p=window.findCPU?.(s.cpu), b=window.PCDealBenchmarks?.cpu?.(s.cpu);
 const base=num(p?.performance)||num(s.cpuPerformance)||35;
 const gaming=b?.gaming1080?clamp(b.gaming1080):clamp(base);
 const cores=num(p?.cores)||(/ryzen\s+9|i9/i.test(s.cpu||"")?12:/ryzen\s+7|i7/i.test(s.cpu||"")?8:6);
 const threads=num(p?.threads)||cores*2;
 // Multi-thread grows with core/thread resources instead of blindly mirroring gaming score.
 const multi=clamp(base*.62 + Math.min(threads,64)*1.15);
 const single=clamp(base*.82 + gaming*.18);
 return {gaming,multi,single,cores,threads};
}
function gpuScores(s){
 const p=window.findGPU?.(s.gpu), b=window.PCDealBenchmarks?.gpu?.(s.gpu);
 const base=num(p?.performance)||num(s.gpuPerformance)||30;
 const raster=b?.p1440?clamp(b.p1440*1.18):clamp(base);
 let rt=raster;
 if(/rtx\s*50/i.test(s.gpu||""))rt*=1.09;
 else if(/rtx\s*40/i.test(s.gpu||""))rt*=1.02;
 else if(/rx\s*9\d{3}/i.test(s.gpu||""))rt*=.90;
 else if(/rx|radeon/i.test(s.gpu||""))rt*=.75;
 const vram=num(p?.vram)||num((String(s.gpu||"").match(/(\d{1,2})\s*gb/i)||[])[1]);
 return {raster:clamp(raster),rt:clamp(rt),vram,brand:p?.brand||(/rx/i.test(s.gpu||"")?"AMD":/arc/i.test(s.gpu||"")?"Intel":"NVIDIA")};
}
function workloadScores(s){
 const c=cpuScores(s),g=gpuScores(s),ram=ramScore(s),storage=storageScore(s),quality=qualityScore(s);
 const cpuFor={gaming:c.gaming,esports:(c.gaming*.65+c.single*.35),workstation:c.multi,editing:(c.multi*.65+c.single*.35),render:c.multi,ai:c.multi*.65,general:c.single,mixed:(c.gaming+c.multi)/2};
 const gpuFor={gaming:g.raster,esports:g.raster,workstation:g.raster*.78,editing:g.raster*(g.brand==="NVIDIA"?1.04:1),render:g.raster*(g.brand==="NVIDIA"?1.10:g.brand==="AMD"?.82:.75),ai:g.raster*(g.brand==="NVIDIA"?1.12:g.brand==="AMD"?.70:.66),general:g.raster*.45,mixed:g.raster};
 const result={};
 for(const [k,w] of Object.entries(USES)){
   const score=clamp(Math.round(cpuFor[k]*w.cpu+gpuFor[k]*w.gpu+ram*w.ram+storage*w.storage+quality*w.quality));
   result[k]={score,label:w.label,grade:score>=92?"Exceptional":score>=82?"Excellent":score>=70?"Very good":score>=58?"Good":score>=45?"Adequate":"Weak"};
 }
 return result;
}
function usageFit(s,profile=s.usageProfile||"gaming"){
 const all=workloadScores(s),x=all[profile]||all.gaming,c=cpuScores(s),g=gpuScores(s);
 let note="";
 if(profile==="workstation"&&c.cores<12)note="Strong gaming hardware does not automatically make an extreme workstation; heavily threaded professional workloads benefit from substantially more CPU cores and memory.";
 else if(profile==="gaming"&&x.score>=90)note="Top-tier gaming performance. If the target is only 1080p/60 Hz, some of this hardware may be unnecessary even though performance remains excellent.";
 else if(profile==="ai"&&g.brand!=="NVIDIA")note="The raw GPU can be fast, but many local AI workflows still depend heavily on software/backend support and VRAM.";
 else if(profile==="render"&&g.brand!=="NVIDIA")note="Good general GPU performance does not guarantee equal performance in CUDA/OptiX-focused renderers.";
 else note=`This build is rated ${x.grade.toLowerCase()} for ${x.label.toLowerCase()} based on the detected CPU, GPU, RAM, storage and supporting hardware.`;
 return {...x,note,all};
}
function fpsEstimate(s,opts={}){
 const game=opts.game||"Fortnite", res=String(opts.resolution||"1440"), preset=opts.preset||"high";
 const rt=opts.rayTracing||"off", up=opts.upscaling||"off", fg=opts.frameGen||"off";
 const gp=GAME_PROFILES[game]||GAME_PROFILES.Fortnite,c=cpuScores(s),g=gpuScores(s),rd=window.detectRamDetails?.(s.listing||"")||{};
 if(!s.cpu||!s.gpu)return null;

 const bench=window.PCDealBenchmarks?.gpu?.(s.gpu);
 let gpuAnchor=bench ? (res==="1080"?bench.f1080:res==="2160"?bench.f4k:bench.f1440) : Math.max(25,g.raster*1.20);
 let cpuCeiling=(c.gaming*2.15)*gp.cpu;
 if(game==="Counter-Strike 2"||game==="Valorant")cpuCeiling*=1.50;
 if(res==="1440")cpuCeiling*=1.08;if(res==="2160")cpuCeiling*=1.18;

 const resCorrection=bench?1:(res==="1080"?1:res==="1440"?.74:.44);
 const presetM={low:1.33,medium:1.16,high:1,ultra:.84}[preset]||1;
 let gpuFPS=gpuAnchor*gp.scale*resCorrection*presetM;

 // Ray tracing is a real extra GPU load; card families handle it differently.
 if(rt!=="off"){
   const rtLoad=rt==="ultra"?.58:rt==="high"?.68:.78;
   const rtStrength=(g.rt/Math.max(g.raster,1));
   gpuFPS*=1-(gp.rt*(1-rtLoad*rtStrength));
 }
 const upM={off:1,quality:1.17,balanced:1.29,performance:1.43}[up]||1;
 gpuFPS*=upM;

 // RAM penalties affect lows more than averages.
 let avg=Math.min(gpuFPS,cpuCeiling);
 let lowFactor=.76;
 const gb=parseInt(s.ram)||0;
 if(gb<16){avg*=.90;lowFactor-=.09}
 if(rd.sticks===1){avg*=.95;lowFactor-=.07}
 if(rd.speed&&s.ramType==="DDR4"&&rd.speed<2666)lowFactor-=.04;
 if(rd.speed&&s.ramType==="DDR5"&&rd.speed<5200)lowFactor-=.03;

 // Frame generation affects displayed FPS, not base responsiveness.
 const baseAvg=avg;
 if(fg==="2x")avg*=1.72;
 if(fg==="multi")avg*=2.20;

 const oneLow=Math.max(15,avg*clamp(lowFactor,.55,.82));
 const min=Math.round(avg*.88), max=Math.round(avg*1.12);
 const cpuLimited=cpuCeiling<gpuFPS*.93;
 const gpuLimited=gpuFPS<cpuCeiling*.93;
 const bottleneck=cpuLimited?"Mostly CPU-limited":gpuLimited?"Mostly GPU-limited":"Well balanced";
 const vramNeed=(res==="2160"?12:res==="1440"?8:6)+(rt!=="off"?2:0)+(preset==="ultra"?2:0);
 const vramStatus=g.vram?g.vram>=vramNeed?"Likely adequate":`Potentially limited (${g.vram}GB vs ~${vramNeed}GB target)`:"VRAM unknown";
 const confidence=clamp(Math.round(
   (bench?34:18)+(window.PCDealBenchmarks?.cpu?.(s.cpu)?22:12)+(s.ram?10:0)+(rd.sticks?7:0)+(rd.speed?5:0)+(s.motherboard?5:0)+(s.psu?4:0)
 ),35,92);

 return {
   avg:Math.round(avg),baseAvg:Math.round(baseAvg),oneLow:Math.round(oneLow),min,max,
   bottleneck,cpuCeiling:Math.round(cpuCeiling),gpuCeiling:Math.round(gpuFPS),
   vramStatus,vramNeed,confidence,
   latencyNote:fg==="off"?"No frame generation selected.":"Frame generation can raise displayed FPS but does not multiply base input responsiveness by the same amount.",
   source:bench?"GPU baseline calibrated to published hierarchy data; game-specific scaling remains modelled.":"GPU baseline is heuristic because this card lacks a current source-backed hierarchy entry."
 };
}
window.PCDealV8={USES,GAME_PROFILES,state,cpuScores,gpuScores,ramScore,storageScore,qualityScore,workloadScores,usageFit,fpsEstimate};
})();