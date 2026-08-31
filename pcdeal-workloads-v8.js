
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
 const game=opts.game||"Apex Legends", res=String(opts.resolution||"1080"), preset=opts.preset||"medium";
 const rt=opts.rayTracing||"off", up=opts.upscaling||"off", fg=opts.frameGen||"off";
 const gp=GAME_PROFILES[game]||GAME_PROFILES.Fortnite,c=cpuScores(s),g=gpuScores(s),rd=window.detectRamDetails?.(s.listing||"")||{};
 if(!s.cpu||!s.gpu)return null;

 const dr=window.PCDealGameBenchmarks?.interpolatedRow?.(game,s.gpu)||null;
 const hierarchy=window.PCDealBenchmarks?.gpu?.(s.gpu)||null;
 let avg1080,low1080,sourceType,sourceText;
 if(dr){
   avg1080=dr.avg; low1080=dr.low; sourceType=dr.exact?"direct-game-benchmark":"game-benchmark-interpolation";
   sourceText=dr.exact?`DropReference ${game} benchmark anchor for ${dr.gpu}.`:`DropReference ${game} benchmark interpolation between nearby calibrated GPUs.`;
 }else{
   const base=hierarchy?.f1080||Math.max(30,g.raster*1.30);
   avg1080=base*(gp.scale||1); low1080=avg1080*.70; sourceType=hierarchy?"hierarchy-model":"heuristic";
   sourceText=hierarchy?"GPU hierarchy baseline with game-specific modelling; no direct DropReference game row was available.":"Heuristic fallback; no direct game benchmark or current hierarchy match was available.";
 }

 // DropReference benchmark pages expose processor selection; our stored game anchors use a high-end CPU baseline.
 // CPU scaling is deliberately modest in GPU-heavy titles and stronger in CPU-sensitive titles.
 const cpuRef=78.2; // i9-14900K gaming hierarchy reference used as a high-end baseline.
 const cpuRatio=Math.max(.48,Math.min(1.12,(c.gaming||50)/cpuRef));
 const sens=window.PCDealGameBenchmarks?.GAMES?.[game]?.cpuSensitivity ?? Math.min(.85,Math.max(.25,gp.cpu||.55));
 const cpuScale=1-sens*(1-cpuRatio);
 avg1080*=cpuScale; low1080*=Math.max(.72,1-(sens+.12)*(1-cpuRatio));

 // Preset conversion. DropReference's site-wide estimator states a 1080p medium-quality baseline.
 const presetM={low:1.16,medium:1,high:.89,ultra:.78}[preset]||1;
 avg1080*=presetM; low1080*=Math.min(1.04,presetM*.98+.02);

 // Resolution conversion uses the actual GPU hierarchy's measured scaling when available.
 let resM=1;
 if(res!=="1080"){
   if(hierarchy?.f1080){resM=res==="1440"?hierarchy.f1440/hierarchy.f1080:hierarchy.f4k/hierarchy.f1080}
   else resM=res==="1440"?.74:.47;
 }
 let avg=avg1080*resM, oneLow=low1080*resM;

 // RT / upscaling are still modelled because the stored benchmark anchors are not a universal RT/upscaling matrix.
 if(rt!=="off"){
   const rtPenalty={medium:.80,high:.68,ultra:.57}[rt]||1;
   const rtStrength=Math.max(.55,Math.min(1.18,g.rt/Math.max(g.raster,1)));
   avg*=1-((1-rtPenalty)*Math.max(.25,gp.rt||.45)/rtStrength);
   oneLow*=1-((1-rtPenalty)*Math.max(.30,gp.rt||.45)/rtStrength);
 }
 const upM={off:1,quality:1.14,balanced:1.25,performance:1.38}[up]||1;
 avg*=upM; oneLow*=Math.min(upM,1.25);

 // RAM configuration mostly affects lows; smaller penalty to averages.
 const gb=parseInt(s.ram)||0;
 if(gb&&gb<16){avg*=.92;oneLow*=.82}
 if(rd.sticks===1){avg*=.96;oneLow*=.88}
 if(rd.speed&&s.ramType==="DDR4"&&rd.speed<2666)oneLow*=.95;
 if(rd.speed&&s.ramType==="DDR5"&&rd.speed<5200)oneLow*=.96;

 const baseAvg=avg,baseLow=oneLow;
 if(fg==="2x"){avg*=1.62;oneLow*=1.48}
 if(fg==="multi"){avg*=2.05;oneLow*=1.70}

 // CPU ceiling is now a sanity check, not the primary source of FPS.
 let cpuCeiling=(c.gaming*2.8)*(game==="Counter-Strike 2"||game==="Valorant"?1.35:1);
 if(res==="1440")cpuCeiling*=1.08;if(res==="2160")cpuCeiling*=1.15;
 if(avg>cpuCeiling){const ratio=cpuCeiling/avg;avg=cpuCeiling;oneLow*=Math.max(.82,ratio)}

 const gpuCeiling=Math.round(avg);
 const min=Math.round(avg*.92),max=Math.round(avg*1.08);
 const bottleneck=cpuCeiling<gpuCeiling*.98?"Mostly CPU-limited":cpuCeiling>gpuCeiling*1.18?"Mostly GPU-limited":"Mixed / balanced";
 const vramNeed=(res==="2160"?12:res==="1440"?8:6)+(rt!=="off"?2:0)+(preset==="ultra"?2:0);
 const vramStatus=g.vram?g.vram>=vramNeed?"Likely adequate":`Potentially limited (${g.vram}GB vs ~${vramNeed}GB target)`:"VRAM unknown";
 const evidence=(dr?.exact?50:dr?42:hierarchy?28:15)+(window.PCDealBenchmarks?.cpu?.(s.cpu)?18:8)+(rd.sticks?7:0)+(rd.speed?5:0)+(s.ram?5:0);
 const confidence=clamp(Math.round(evidence),30,94);
 return {avg:Math.round(avg),baseAvg:Math.round(baseAvg),oneLow:Math.round(oneLow),baseLow:Math.round(baseLow),min,max,bottleneck,cpuCeiling:Math.round(cpuCeiling),gpuCeiling,vramStatus,vramNeed,confidence,sourceType,source:sourceText+(res!=="1080"?" Resolution scaling uses measured GPU hierarchy ratios where available.":"")+(preset!=="medium"?" Preset conversion is modelled from the medium-quality benchmark anchor.":""),latencyNote:fg==="off"?"No frame generation selected.":"Frame generation increases displayed FPS, but base render FPS and input responsiveness remain closer to the pre-generation result."};
}
window.PCDealV8={USES,GAME_PROFILES,state,cpuScores,gpuScores,ramScore,storageScore,qualityScore,workloadScores,usageFit,fpsEstimate};
})();