// PCDeal V10 — sharded master database browser client
(() => {
"use strict";
const ROOT="master-db";
const cache={manifest:null,index:new Map(),shard:new Map()};
const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9+.-]+/g," ").replace(/\s+/g," ").trim();
const compact=s=>norm(s).replace(/\s+/g,"");
function similarity(q,x){
 q=norm(q);x=norm(x);if(!q||!x)return 0;if(q===x)return 1;
 const qc=compact(q),xc=compact(x);
 if(qc===xc)return 1;
 if(xc.includes(qc)||qc.includes(xc))return Math.min(qc.length,xc.length)/Math.max(qc.length,xc.length)*.94;
 const qw=new Set(q.split(" ")),xw=new Set(x.split(" "));let hit=0;for(const w of qw)if(xw.has(w))hit++;
 return hit/Math.max(qw.size,1)*.82;
}
async function json(url){const r=await fetch(url,{cache:"no-cache"});if(!r.ok)throw new Error(`${url}: ${r.status}`);return r.json()}
async function manifest(){return cache.manifest||(cache.manifest=await json(`${ROOT}/manifest.json`))}
async function index(category){
 if(cache.index.has(category))return cache.index.get(category);
 const data=await json(`${ROOT}/index/${encodeURIComponent(category)}.json`);
 cache.index.set(category,data);return data;
}
async function get(category,id,shard){
 const k=`${category}/${shard}`;let rows=cache.shard.get(k);
 if(!rows){rows=await json(`${ROOT}/shards/${encodeURIComponent(category)}/${shard}.json`);cache.shard.set(k,rows)}
 return rows.find(x=>x.id===id)||null;
}
async function search(category,query,limit=12){
 const rows=await index(category),q=norm(query),scores=[];
 for(const x of rows){
  let score=similarity(q,x.name);
  score=Math.max(score,similarity(q,`${x.brand||""} ${x.model||""}`));
  for(const a of x.aliases||[])score=Math.max(score,similarity(q,a)*.98);
  if(score>=.34)scores.push({score,x});
 }
 scores.sort((a,b)=>b.score-a.score||b.x.confidence-a.x.confidence);
 return scores.slice(0,limit).map(y=>({...y.x,matchScore:Math.round(y.score*100)}));
}
async function resolve(category,query){
 const hits=await search(category,query,5);if(!hits.length)return null;
 const h=hits[0],full=await get(category,h.id,h.shard);
 return full?{...full,matchScore:h.matchScore}:h;
}
async function status(){
 try{const m=await manifest();return {available:true,...m}}catch(e){return {available:false,error:e.message}}
}
window.PCDealMasterDB={manifest,index,get,search,resolve,status};
})();