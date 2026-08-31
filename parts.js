
// PCDeal V7 — listing recognition helpers
(() => {
"use strict";
const RAM_SPEEDS={DDR3:[1066,1333,1600,1866,2133],DDR4:[2133,2400,2666,2933,3000,3200,3333,3600,3733,4000,4266,4400,4600,4800],DDR5:[4800,5200,5600,6000,6200,6400,6800,7200,7600,8000,8400]};
const PSU_BRANDS=["Corsair","Seasonic","EVGA","Cooler Master","Thermaltake","MSI","be quiet!","Super Flower","ASUS","Gigabyte","FSP","SilverStone","NZXT","DeepCool","Antec","XPG"];
const PSU_TIERS=[
 {r:/corsair\s+(ax|hx|rmx|rme|rm\d|sf\d)/i,tier:"A"},
 {r:/seasonic\s+(prime|vertex|focus)/i,tier:"A"},
 {r:/super\s*flower\s+(leadex|legion)/i,tier:"A"},
 {r:/be\s*quiet!?\s+(dark power|straight power|pure power)/i,tier:"A"},
 {r:/msi\s+(mpg|mag).*(gf|gl)/i,tier:"B"},
 {r:/cooler\s*master\s+(mwe gold|v\d|gx)/i,tier:"B"},
 {r:/thermaltake\s+toughpower/i,tier:"B"},
 {r:/evga\s+(g\d|p\d|supernova)/i,tier:"B"}
];
function clean(s){return String(s||"").replace(/[–—]/g,"-").replace(/\s+/g," ").trim()}
function detectRamDetails(text){
 const raw=String(text||"");
 const kit=raw.match(/\b(\d)\s*[x×]\s*(\d+)\s*gb\b/i);
 const total=kit?+kit[1]*+kit[2]:+((raw.match(/\b(4|8|12|16|24|32|48|64|96|128|192|256)\s*gb\s*(?:ram|memory|ddr[345])?/i)||[])[1]||0);
 const gen=((raw.match(/\bddr\s*([345])\b/i)||[])[1]||"");
 const speed=+((raw.match(/\b([1-9]\d{3})\s*(?:mhz|mt\/s|mts)\b/i)||[])[1]||0);
 const cl=+((raw.match(/\bcl\s*(\d{2,3})\b/i)||[])[1]||0);
 return {capacityGB:total,capacity:total?`${total}GB`:"",sticks:kit?+kit[1]:0,perStickGB:kit?+kit[2]:0,type:gen?`DDR${gen}`:"",speed,cl,ecc:/\becc\b/i.test(raw),sodimm:/\bso-?dimm\b/i.test(raw)};
}
function inferRamType(cpuName,motherboardText){
 const cpu=window.findCPU?.(cpuName);
 const result=window.getBestMemorySelection?.(cpu,motherboardText);
 return result?.memoryTypes?.length===1?result.memoryTypes[0]:"";
}
function detectPSUDetails(text){
 const raw=String(text||"");
 const line=raw.split(/\n|•|\|/).find(l=>/\bpsu\b|power supply|\b\d{3,4}\s*w\b/i.test(l))||"";
 if(!line)return null;
 const wattage=+((line.match(/\b(\d{3,4})\s*w\b/i)||[])[1]||0);
 const rating=((line.match(/\b80\s*\+?\s*(white|bronze|silver|gold|platinum|titanium)\b/i)||[])[1]||"");
 const brand=(PSU_BRANDS.find(b=>new RegExp(b.replace(/[!]/g,"!?"),"i").test(line))||"");
 const tier=(PSU_TIERS.find(x=>x.r.test(line))||{}).tier||"Unknown";
 const modular=/fully\s*modular/i.test(line)?"Fully modular":/semi[-\s]*modular/i.test(line)?"Semi-modular":/\bmodular\b/i.test(line)?"Modular":"";
 return {raw:clean(line.replace(/^(?:psu|power supply)\s*[:\-]\s*/i,"")),brand,wattage,rating:rating?`80+ ${rating[0].toUpperCase()+rating.slice(1).toLowerCase()}`:"",modular,tier};
}
function detectMotherboardDetails(text){
 return window.detectMotherboardFromText?.(text)||null;
}
function normalizeStorageType(v){
 const x=String(v||"").toLowerCase();
 if(/nvme/.test(x))return"NVME M.2";
 if(/hdd|hard drive/.test(x))return"HDD";
 if(/ssd|solid state/.test(x))return"SSD";
 return"";
}
function detectStorageDetails(text){
 const raw=String(text||""),out=[];
 const rx=/\b(\d+(?:\.\d+)?)\s*(tb|gb)\b[^\n,;+|]{0,55}?\b(m\.2\s*nvme(?:\s*ssd)?|nvme\s*ssd|nvme|m\.2\s*sata\s*ssd|sata\s*ssd|solid state drive|hard drive|hdd|ssd)\b|\b(m\.2\s*nvme(?:\s*ssd)?|nvme\s*ssd|nvme|m\.2\s*sata\s*ssd|sata\s*ssd|solid state drive|hard drive|hdd|ssd)\b[^\n,;+|]{0,55}?\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/ig;let m;
 while((m=rx.exec(raw))){const size=`${m[1]||m[5]}${String(m[2]||m[6]).toUpperCase()}`,kind=m[3]||m[4],type=normalizeStorageType(kind);if(!out.some(d=>d.size===size&&d.type===type))out.push({size,type})}
 return out;
}
function retailReference(part){
 if(!part)return null;
 return {msrpUSD:+part.msrpUSD||0,launchYear:+part.launchYear||0,status:part.launchYear&&new Date().getFullYear()-part.launchYear>=5?"Usually discontinued":"May still be sold new"};
}
window.RAM_SPEEDS=RAM_SPEEDS;
window.detectRamDetails=detectRamDetails;
window.inferRamType=inferRamType;
window.detectPSUDetails=detectPSUDetails;
window.detectMotherboardDetails=detectMotherboardDetails;
window.detectStorageDetails=detectStorageDetails;
window.normalizeStorageType=normalizeStorageType;
window.retailReference=retailReference;
})();
