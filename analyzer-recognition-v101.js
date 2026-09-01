// PCDeal V10.4 — analyzer recognition + valuation corrections
(() => {
"use strict";
const $=id=>document.getElementById(id);
const text=()=>$("listingText")?.value||"";
const norm=s=>String(s||"").toLowerCase().replace(/[®™]/g,"").replace(/[^a-z0-9+.-]+/g," ").replace(/\s+/g," ").trim();
function lines(raw){return String(raw||"").split(/\n|•|\||;/).map(x=>x.trim()).filter(Boolean)}
function setInput(id,v){const e=$(id);if(!e||v==null||v==="")return false;e.value=v;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));return true}
function setSelect(id,v){const e=$(id);if(!e||!v)return false;const o=[...e.options].find(o=>String(o.value).toLowerCase()===String(v).toLowerCase()||String(o.textContent).toLowerCase()===String(v).toLowerCase());if(!o)return false;e.value=o.value;e.dispatchEvent(new Event("change",{bubbles:true}));return true}

function detectAskingPrice(raw){
 const ls=lines(raw);
 const parse=m=>{if(!m)return 0;let n=Number(String(m[1]).replace(/,/g,""));if(/k/i.test(m[2]||""))n*=1000;return n>=20&&n<=50000?Math.round(n):0};
 const strong=/\b(?:asking(?:\s+price)?|ask|price|priced|selling|sell|want|firm|obo)\b/i;
 for(const l of ls){if(!strong.test(l))continue;let m=l.match(/\$\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{2,5}(?:\.\d+)?)\s*([kK])?/);let n=parse(m);if(n)return n;m=l.match(/\b([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{2,5}(?:\.\d+)?)\s*([kK])?\s*(?:cad|cdn|usd)\b/i);n=parse(m);if(n)return n;}
 const hits=[...String(raw).matchAll(/\$\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{2,5}(?:\.\d+)?)\s*([kK])?/g)].map(parse).filter(Boolean);if(hits.length)return hits[hits.length-1];
 const cur=[...String(raw).matchAll(/\b([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{2,5}(?:\.\d+)?)\s*([kK])?\s*(?:cad|cdn|usd)\b/ig)].map(parse).filter(Boolean);return cur.length?cur[cur.length-1]:0;
}
function detectCurrencyV101(raw){return /\b(?:usd|us\s*dollars?)\b/i.test(raw)?"USD":"CAD"}

function bestCatalogLine(kind,raw){
 const C=window.PCDealProductCatalog;if(!C)return null;let best=null;
 for(const l of lines(raw)){
   const x=C.findExact?.(kind,l);if(x&&(!best||x.matchScore>best.matchScore))best={...x,line:l};
 }
 return best;
}
function detectStorageV101(raw){
 const old=window.__pcdealOldStorageDetect?.(raw)||[];if(old.length)return old;
 const hit=bestCatalogLine("storage",raw);if(!hit)return [];
 const m=hit.line.match(/\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/i);if(!m)return [];
 const size=`${m[1]}${m[2].toUpperCase()}`;let type=hit.type||"NVME M.2";
 if(/hdd|hard/i.test(type)||/barracuda|ironwolf|x300|red plus|blue hdd/i.test(hit.name))type="HDD";
 else if(/870 evo|mx500/i.test(hit.name))type="SSD";else type="NVME M.2";
 return [{size,type,capacityGB:Number(m[1])*(m[2].toLowerCase()==="tb"?1000:1),model:hit.name,brand:hit.brand,matchScore:hit.matchScore}];
}
function exactMotherboard(raw){const h=bestCatalogLine("motherboard",raw);return h?.name||""}
function exactPSU(raw){
 const h=bestCatalogLine("psu",raw);if(!h)return "";const l=h.line;const rm=l.match(/\bRM\s*(650|750|850|1000)\s*x\b/i);if(rm)return `Corsair RM${rm[1]}x ${rm[1]}W`;
 const watt=(l.match(/\b(\d{3,4})\s*w\b/i)||[])[1];return watt?`${h.brand} ${h.series||h.model} ${watt}W`.replace(/\s+/g," ").trim():h.name;
}
function ramDetailsV101(raw){
 const ramLine=lines(raw).find(l=>/\b(?:ddr[2345]|ram|memory|vengeance|trident|fury|ripjaws|flare|lancer|viper)\b/i.test(l))||"";
 const speed=(ramLine.match(/\b(?:ddr[45][ -]?)?(2[4-9]\d{2}|[3-8]\d{3})\s*(?:mhz|mt\/?s)?\b/i)||[])[1]||"";
 const model=bestCatalogLine("ram",raw);return {speed:speed?Number(speed):0,model:model?.name||"",brand:model?.brand||""};
}
function addFields(){
 const ramType=$("ramType")?.closest(".field");if(ramType&&!$("ramSpeed")){
   const f=document.createElement("div");f.className="field";f.innerHTML='<label>RAM Speed</label><input id="ramSpeed" type="number" min="0" step="100" placeholder="e.g. 6000"><div class="tiny">Detected MT/s / MHz label from listing.</div>';ramType.parentElement?.appendChild(f);
 }
 const storageSize=$("storageSize")?.closest(".field");if(storageSize&&!$("storageModel")){
   const f=document.createElement("div");f.className="field";f.innerHTML='<label>Storage exact model</label><input id="storageModel" placeholder="e.g. WD Black SN850X 2TB"><div class="tiny">Used for product-specific pricing and identification.</div>';storageSize.parentElement?.appendChild(f);
 }
 const ram=$("ram")?.closest(".field");if(ram&&!$("ramModel")){
   const f=document.createElement("div");f.className="field";f.innerHTML='<label>RAM exact model</label><input id="ramModel" placeholder="e.g. Corsair Vengeance DDR5"><div class="tiny">Optional exact kit/family identity.</div>';ram.parentElement?.appendChild(f);
 }
}

const oldParse=window.parseListing;
window.__pcdealOldStorageDetect=window.detectStorageDetails;
window.detectStorageDetails=detectStorageV101;
window.parseListing=function(){
 const r=typeof oldParse==="function"?oldParse.apply(this,arguments):undefined;const raw=text();
 const price=detectAskingPrice(raw);if(price)setInput("price",price);setSelect("currency",detectCurrencyV101(raw));
 const mb=exactMotherboard(raw);if(mb)setInput("motherboard",mb);
 const ps=exactPSU(raw);if(ps)setInput("psu",ps);
 const ds=detectStorageV101(raw);if(ds[0]){setSelect("storageType",ds[0].type);setSelect("storageSize",ds[0].size);setInput("storageModel",`${ds[0].model} ${ds[0].size}`)}
 const rd=ramDetailsV101(raw);if(rd.speed)setInput("ramSpeed",rd.speed);if(rd.model)setInput("ramModel",rd.model);
 const msg=$("parseMessage");if(msg){const extra=[];if(price)extra.push(`Price $${price}`);if(mb)extra.push(mb);if(ds[0])extra.push(`${ds[0].model} ${ds[0].size}`);if(ps)extra.push(ps);if(rd.speed)extra.push(`RAM ${rd.speed}`);if(extra.length)msg.textContent=(msg.textContent?msg.textContent+" • ":"")+extra.join(" • ")}
 return r;
};

// Improve internal value references for known exact products. These remain estimates, not live market quotes.
const oldBoard=window.getMotherboardValue,oldPSU=window.getPSUValue,oldDrive=window.getSingleDriveValue,oldRam=window.getRamValue;
window.getMotherboardValue=function(name,cpu){const n=norm(name);if(/b650.*tomahawk/.test(n))return 155;if(/x870e.*tomahawk/.test(n))return 220;if(/x870.*eagle/.test(n))return 175;if(/x870e|x670e|z790/.test(n))return 190;if(/b650e/.test(n))return 160;if(/b650/.test(n))return 125;return oldBoard?oldBoard(name,cpu):75};
window.getPSUValue=function(name){const n=norm(name);if(/rm1000x/.test(n))return 145;if(/rm850x/.test(n))return 115;if(/rm750x/.test(n))return 95;if(/focus gx|prime tx|leadex|straight power|dark power|toughpower gf3|core reactor/.test(n)){const w=Number((n.match(/\b(\d{3,4})\s*w/)||[])[1]||850);return w>=1000?145:w>=850?115:w>=750?95:80}return oldPSU?oldPSU(name):0};
window.getSingleDriveValue=function(d){const model=norm($("storageModel")?.value||d?.model||"");const gb=d?.capacityGB||0;if(/sn850x|kc3000|990 pro|t705|t700|firecuda 530|firecuda 540|p44 pro/.test(model)){if(gb>=4000)return 240;if(gb>=2000)return 135;if(gb>=1000)return 80}return oldDrive?oldDrive(d):0};
window.getRamValue=function(ram,type){let v=oldRam?oldRam(ram,type):0;const sp=Number($("ramSpeed")?.value||0),m=norm($("ramModel")?.value||"");if(type==="DDR5"&&sp>=6000)v+=10;if(/dominator|trident z5|fury renegade/.test(m))v+=10;return v};

const oldAnalyze=window.analyzeDeal;
window.analyzeDeal=function(){
 const missing=[];if(!$("cpu")?.value.trim())missing.push("CPU");if(!$("gpu")?.value.trim())missing.push("GPU");if(!Number($("price")?.value||0))missing.push("asking price");
 if(missing.length){alert(`Please add: ${missing.join(", ")}.`);return}
 return typeof oldAnalyze==="function"?oldAnalyze.apply(this,arguments):undefined;
};

document.addEventListener("DOMContentLoaded",()=>{addFields();setTimeout(()=>{addFields()},150)});
window.PCDealV101={detectAskingPrice,detectStorageV101,exactMotherboard,exactPSU,ramDetailsV101};
})();