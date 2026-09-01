// PCDeal V9.4 — exact product catalog foundation
(() => {
"use strict";

const PRODUCTS = {
  ram: [
    // Corsair
    {brand:"Corsair",family:"Vengeance",model:"Vengeance DDR5",aliases:["corsair vengeance ddr5","vengeance d5"],type:"RAM"},
    {brand:"Corsair",family:"Vengeance RGB",model:"Vengeance RGB DDR5",aliases:["corsair vengeance rgb ddr5","vengeance rgb d5"],type:"RAM"},
    {brand:"Corsair",family:"Dominator Titanium",model:"Dominator Titanium DDR5",aliases:["corsair dominator titanium","dominator titanium"],type:"RAM"},
    {brand:"Corsair",family:"Dominator Platinum RGB",model:"Dominator Platinum RGB DDR5",aliases:["corsair dominator platinum rgb","dominator platinum"],type:"RAM"},
    // G.Skill
    {brand:"G.Skill",family:"Trident Z5",model:"Trident Z5 DDR5",aliases:["gskill trident z5","g skill trident z5","trident z5"],type:"RAM"},
    {brand:"G.Skill",family:"Trident Z5 Neo",model:"Trident Z5 Neo DDR5",aliases:["trident z5 neo","gskill z5 neo"],type:"RAM"},
    {brand:"G.Skill",family:"Ripjaws S5",model:"Ripjaws S5 DDR5",aliases:["ripjaws s5","gskill ripjaws s5"],type:"RAM"},
    {brand:"G.Skill",family:"Flare X5",model:"Flare X5 DDR5",aliases:["flare x5","gskill flare x5"],type:"RAM"},
    // Kingston
    {brand:"Kingston",family:"FURY Beast",model:"FURY Beast DDR5",aliases:["kingston fury beast ddr5","fury beast d5"],type:"RAM"},
    {brand:"Kingston",family:"FURY Renegade",model:"FURY Renegade DDR5",aliases:["kingston fury renegade","fury renegade"],type:"RAM"},
    // Crucial
    {brand:"Crucial",family:"Pro",model:"Crucial Pro DDR5",aliases:["crucial pro ddr5"],type:"RAM"},
    {brand:"Crucial",family:"Pro Overclocking",model:"Crucial Pro Overclocking DDR5",aliases:["crucial pro overclocking","crucial pro oc"],type:"RAM"},
    // TeamGroup
    {brand:"TeamGroup",family:"T-Force Delta RGB",model:"T-Force Delta RGB DDR5",aliases:["teamgroup delta rgb ddr5","t force delta rgb ddr5"],type:"RAM"},
    {brand:"TeamGroup",family:"T-Force Vulcan",model:"T-Force Vulcan DDR5",aliases:["teamgroup vulcan ddr5","t force vulcan"],type:"RAM"},
    // Patriot
    {brand:"Patriot",family:"Viper Venom",model:"Viper Venom DDR5",aliases:["patriot viper venom","viper venom ddr5"],type:"RAM"},
    // Lexar
    {brand:"Lexar",family:"Ares",model:"Ares DDR5",aliases:["lexar ares ddr5"],type:"RAM"},
    // ADATA/XPG
    {brand:"XPG",family:"Lancer",model:"Lancer DDR5",aliases:["xpg lancer ddr5","adata xpg lancer"],type:"RAM"},
    {brand:"XPG",family:"Lancer Blade",model:"Lancer Blade DDR5",aliases:["xpg lancer blade"],type:"RAM"},
    // Silicon Power
    {brand:"Silicon Power",family:"XPOWER Zenith",model:"XPOWER Zenith DDR5",aliases:["silicon power xpower zenith","xpower zenith"],type:"RAM"}
  ],
  storage: [
    // Samsung
    {brand:"Samsung",family:"990 PRO",model:"990 PRO",aliases:["samsung 990 pro","990pro"],type:"NVME M.2"},
    {brand:"Samsung",family:"990 EVO Plus",model:"990 EVO Plus",aliases:["samsung 990 evo plus"],type:"NVME M.2"},
    {brand:"Samsung",family:"980 PRO",model:"980 PRO",aliases:["samsung 980 pro"],type:"NVME M.2"},
    {brand:"Samsung",family:"870 EVO",model:"870 EVO",aliases:["samsung 870 evo"],type:"SSD"},
    // WD
    {brand:"Western Digital",family:"WD_BLACK SN850X",model:"SN850X",aliases:["wd black sn850x","western digital sn850x","sn850x"],type:"NVME M.2"},
    {brand:"Western Digital",family:"WD_BLACK SN770",model:"SN770",aliases:["wd black sn770","sn770"],type:"NVME M.2"},
    {brand:"Western Digital",family:"Blue SN580",model:"SN580",aliases:["wd blue sn580","sn580"],type:"NVME M.2"},
    // Crucial
    {brand:"Crucial",family:"T705",model:"T705",aliases:["crucial t705"],type:"NVME M.2"},
    {brand:"Crucial",family:"T700",model:"T700",aliases:["crucial t700"],type:"NVME M.2"},
    {brand:"Crucial",family:"P3 Plus",model:"P3 Plus",aliases:["crucial p3 plus"],type:"NVME M.2"},
    {brand:"Crucial",family:"MX500",model:"MX500",aliases:["crucial mx500"],type:"SSD"},
    // Kingston
    {brand:"Kingston",family:"KC3000",model:"KC3000",aliases:["kingston kc3000"],type:"NVME M.2"},
    {brand:"Kingston",family:"FURY Renegade SSD",model:"FURY Renegade",aliases:["kingston fury renegade ssd"],type:"NVME M.2"},
    {brand:"Kingston",family:"NV3",model:"NV3",aliases:["kingston nv3"],type:"NVME M.2"},
    // Seagate
    {brand:"Seagate",family:"FireCuda 540",model:"FireCuda 540",aliases:["seagate firecuda 540"],type:"NVME M.2"},
    {brand:"Seagate",family:"FireCuda 530",model:"FireCuda 530",aliases:["seagate firecuda 530"],type:"NVME M.2"},
    {brand:"Seagate",family:"Barracuda",model:"Barracuda HDD",aliases:["seagate barracuda"],type:"HDD"},
    // Sabrent
    {brand:"Sabrent",family:"Rocket 5",model:"Rocket 5",aliases:["sabrent rocket 5"],type:"NVME M.2"},
    {brand:"Sabrent",family:"Rocket 4 Plus",model:"Rocket 4 Plus",aliases:["sabrent rocket 4 plus"],type:"NVME M.2"},
    // SK hynix
    {brand:"SK hynix",family:"Platinum P41",model:"Platinum P41",aliases:["sk hynix platinum p41","p41"],type:"NVME M.2"},
    // Solidigm
    {brand:"Solidigm",family:"P44 Pro",model:"P44 Pro",aliases:["solidigm p44 pro"],type:"NVME M.2"},
    // Lexar
    {brand:"Lexar",family:"NM790",model:"NM790",aliases:["lexar nm790"],type:"NVME M.2"},
    // TeamGroup
    {brand:"TeamGroup",family:"MP44",model:"MP44",aliases:["teamgroup mp44"],type:"NVME M.2"},
    {brand:"TeamGroup",family:"MP44L",model:"MP44L",aliases:["teamgroup mp44l"],type:"NVME M.2"},
    // ADATA/XPG
    {brand:"ADATA",family:"Legend 960 MAX",model:"Legend 960 MAX",aliases:["adata legend 960 max"],type:"NVME M.2"},
    {brand:"XPG",family:"GAMMIX S70 Blade",model:"GAMMIX S70 Blade",aliases:["xpg gammix s70 blade"],type:"NVME M.2"},
    // Inland
    {brand:"Inland",family:"Performance Plus",model:"Performance Plus",aliases:["inland performance plus"],type:"NVME M.2"},
    // HDD
    {brand:"Western Digital",family:"Blue HDD",model:"WD Blue HDD",aliases:["wd blue hdd","western digital blue hdd"],type:"HDD"},
    {brand:"Western Digital",family:"Red Plus",model:"WD Red Plus",aliases:["wd red plus"],type:"HDD"},
    {brand:"Seagate",family:"IronWolf",model:"IronWolf",aliases:["seagate ironwolf"],type:"HDD"},
    {brand:"Toshiba",family:"X300",model:"X300",aliases:["toshiba x300"],type:"HDD"}
  ],
  psu: [
    {brand:"Corsair",family:"RMx",model:"RM650x / RM750x / RM850x / RM1000x",aliases:["rm650x","rm750x","rm850x","rm1000x","corsair rmx"],type:"PSU",tier:"A"},
    {brand:"Corsair",family:"RMe",model:"RM750e / RM850e / RM1000e",aliases:["rm750e","rm850e","rm1000e","corsair rme"],type:"PSU",tier:"A"},
    {brand:"Corsair",family:"HX",model:"HX Series",aliases:["corsair hx","hx1000","hx1200"],type:"PSU",tier:"A"},
    {brand:"Seasonic",family:"FOCUS GX",model:"FOCUS GX",aliases:["seasonic focus gx","focus gx"],type:"PSU",tier:"A"},
    {brand:"Seasonic",family:"PRIME TX",model:"PRIME TX",aliases:["seasonic prime tx","prime tx"],type:"PSU",tier:"A"},
    {brand:"be quiet!",family:"Straight Power 12",model:"Straight Power 12",aliases:["be quiet straight power 12","straight power 12"],type:"PSU",tier:"A"},
    {brand:"be quiet!",family:"Dark Power 13",model:"Dark Power 13",aliases:["be quiet dark power 13","dark power 13"],type:"PSU",tier:"A"},
    {brand:"Super Flower",family:"Leadex VII",model:"Leadex VII",aliases:["super flower leadex vii","leadex vii"],type:"PSU",tier:"A"},
    {brand:"MSI",family:"MPG A-G PCIE5",model:"MPG A850G / A1000G PCIE5",aliases:["msi mpg a850g","msi mpg a1000g"],type:"PSU",tier:"A"},
    {brand:"NZXT",family:"C Gold",model:"C Gold",aliases:["nzxt c750 gold","nzxt c850 gold","nzxt c1000 gold"],type:"PSU",tier:"A"},
    {brand:"Thermaltake",family:"Toughpower GF3",model:"Toughpower GF3",aliases:["thermaltake toughpower gf3","gf3"],type:"PSU",tier:"A"},
    {brand:"Cooler Master",family:"MWE Gold V2",model:"MWE Gold V2",aliases:["cooler master mwe gold v2","mwe gold v2"],type:"PSU",tier:"B"},
    {brand:"EVGA",family:"SuperNOVA G6",model:"SuperNOVA G6",aliases:["evga g6","supernova g6"],type:"PSU",tier:"A"},
    {brand:"ASUS",family:"ROG Thor",model:"ROG Thor",aliases:["asus rog thor","rog thor"],type:"PSU",tier:"A"},
    {brand:"ASUS",family:"TUF Gaming Gold",model:"TUF Gaming Gold",aliases:["asus tuf gaming gold"],type:"PSU",tier:"A"},
    {brand:"FSP",family:"Hydro G Pro",model:"Hydro G Pro",aliases:["fsp hydro g pro"],type:"PSU",tier:"A"},
    {brand:"XPG",family:"Core Reactor II",model:"Core Reactor II",aliases:["xpg core reactor ii","core reactor ii"],type:"PSU",tier:"A"}
  ],
  motherboard: [
    // ASUS
    {brand:"ASUS",family:"ROG Strix",model:"ROG Strix B650E-E Gaming WiFi",aliases:["rog strix b650e-e","b650e-e gaming wifi"],type:"Motherboard",chipset:"B650E"},
    {brand:"ASUS",family:"ROG Strix",model:"ROG Strix B650-A Gaming WiFi",aliases:["rog strix b650-a","b650-a gaming wifi"],type:"Motherboard",chipset:"B650"},
    {brand:"ASUS",family:"TUF Gaming",model:"TUF Gaming B650-PLUS WiFi",aliases:["tuf b650 plus wifi","asus b650 plus wifi"],type:"Motherboard",chipset:"B650"},
    {brand:"ASUS",family:"ROG Strix",model:"ROG Strix X870E-E Gaming WiFi",aliases:["rog strix x870e-e","x870e-e gaming wifi"],type:"Motherboard",chipset:"X870E"},
    {brand:"ASUS",family:"ROG Strix",model:"ROG Strix Z790-A Gaming WiFi",aliases:["rog strix z790-a","z790-a gaming wifi"],type:"Motherboard",chipset:"Z790"},
    // MSI
    {brand:"MSI",family:"MAG Tomahawk",model:"MAG B650 Tomahawk WiFi",aliases:["b650 tomahawk wifi","msi b650 tomahawk"],type:"Motherboard",chipset:"B650"},
    {brand:"MSI",family:"MAG Tomahawk",model:"MAG X870E Tomahawk WiFi",aliases:["x870e tomahawk wifi","msi x870e tomahawk"],type:"Motherboard",chipset:"X870E"},
    {brand:"MSI",family:"MPG Carbon",model:"MPG X870E Carbon WiFi",aliases:["x870e carbon wifi","mpg x870e carbon"],type:"Motherboard",chipset:"X870E"},
    {brand:"MSI",family:"MAG Tomahawk",model:"MAG Z790 Tomahawk WiFi",aliases:["z790 tomahawk wifi"],type:"Motherboard",chipset:"Z790"},
    // Gigabyte
    {brand:"Gigabyte",family:"AORUS Elite",model:"B650 AORUS Elite AX",aliases:["b650 aorus elite ax","aorus elite b650"],type:"Motherboard",chipset:"B650"},
    {brand:"Gigabyte",family:"Eagle",model:"X870 Eagle WiFi7",aliases:["x870 eagle wifi7","gigabyte x870 eagle"],type:"Motherboard",chipset:"X870"},
    {brand:"Gigabyte",family:"AORUS Master",model:"X870E AORUS Master",aliases:["x870e aorus master"],type:"Motherboard",chipset:"X870E"},
    {brand:"Gigabyte",family:"AORUS Elite",model:"Z790 AORUS Elite AX",aliases:["z790 aorus elite ax"],type:"Motherboard",chipset:"Z790"},
    // ASRock
    {brand:"ASRock",family:"Steel Legend",model:"B650E Steel Legend WiFi",aliases:["b650e steel legend wifi"],type:"Motherboard",chipset:"B650E"},
    {brand:"ASRock",family:"Taichi",model:"X870E Taichi",aliases:["x870e taichi"],type:"Motherboard",chipset:"X870E"},
    {brand:"ASRock",family:"Pro RS",model:"B650 Pro RS",aliases:["b650 pro rs"],type:"Motherboard",chipset:"B650"}
  ],
  cooler: [
    {brand:"Noctua",family:"NH-D15",model:"NH-D15",aliases:["noctua nh-d15","nhd15","nh-d15"],type:"Air Cooler"},
    {brand:"Noctua",family:"NH-U12A",model:"NH-U12A",aliases:["noctua nh-u12a","nhu12a"],type:"Air Cooler"},
    {brand:"Thermalright",family:"Peerless Assassin",model:"Peerless Assassin 120 SE",aliases:["peerless assassin 120 se","pa120 se"],type:"Air Cooler"},
    {brand:"Thermalright",family:"Phantom Spirit",model:"Phantom Spirit 120 SE",aliases:["phantom spirit 120 se","ps120 se"],type:"Air Cooler"},
    {brand:"DeepCool",family:"AK620",model:"AK620",aliases:["deepcool ak620"],type:"Air Cooler"},
    {brand:"DeepCool",family:"Assassin IV",model:"Assassin IV",aliases:["deepcool assassin iv"],type:"Air Cooler"},
    {brand:"Arctic",family:"Liquid Freezer III",model:"Liquid Freezer III 240 / 280 / 360 / 420",aliases:["arctic liquid freezer iii","lf3"],type:"AIO"},
    {brand:"Corsair",family:"iCUE LINK H150i",model:"iCUE LINK H150i",aliases:["corsair h150i","h150i"],type:"AIO"},
    {brand:"NZXT",family:"Kraken Elite",model:"Kraken Elite",aliases:["nzxt kraken elite","kraken elite"],type:"AIO"},
    {brand:"Lian Li",family:"Galahad II Trinity",model:"Galahad II Trinity",aliases:["lian li galahad ii","galahad ii trinity"],type:"AIO"},
    {brand:"be quiet!",family:"Dark Rock Pro 5",model:"Dark Rock Pro 5",aliases:["dark rock pro 5"],type:"Air Cooler"}
  ],
  case: [
    {brand:"Corsair",family:"4000D",model:"4000D Airflow",aliases:["corsair 4000d airflow","4000d airflow"],type:"Case"},
    {brand:"Corsair",family:"5000D",model:"5000D Airflow",aliases:["corsair 5000d airflow","5000d airflow"],type:"Case"},
    {brand:"NZXT",family:"H5 Flow",model:"H5 Flow",aliases:["nzxt h5 flow","h5 flow"],type:"Case"},
    {brand:"NZXT",family:"H7 Flow",model:"H7 Flow",aliases:["nzxt h7 flow","h7 flow"],type:"Case"},
    {brand:"NZXT",family:"H9 Flow",model:"H9 Flow",aliases:["nzxt h9 flow","h9 flow"],type:"Case"},
    {brand:"Lian Li",family:"O11 Dynamic EVO",model:"O11 Dynamic EVO",aliases:["lian li o11 dynamic evo","o11 dynamic evo"],type:"Case"},
    {brand:"Lian Li",family:"Lancool 216",model:"Lancool 216",aliases:["lian li lancool 216","lancool 216"],type:"Case"},
    {brand:"Fractal Design",family:"North",model:"North",aliases:["fractal north","fractal design north"],type:"Case"},
    {brand:"Fractal Design",family:"Meshify 2",model:"Meshify 2",aliases:["fractal meshify 2"],type:"Case"},
    {brand:"Phanteks",family:"NV5",model:"NV5",aliases:["phanteks nv5"],type:"Case"},
    {brand:"Montech",family:"AIR 903",model:"AIR 903 MAX",aliases:["montech air 903 max","air 903 max"],type:"Case"},
    {brand:"Hyte",family:"Y70",model:"Y70",aliases:["hyte y70"],type:"Case"}
  ]
};

const BRAND_HINTS = {
 ram:["Corsair","G.Skill","Kingston","Crucial","TeamGroup","Patriot","Lexar","XPG","ADATA","Silicon Power","PNY","Mushkin","GeIL","KLEVV"],
 storage:["Samsung","Western Digital","WD","Crucial","Kingston","Seagate","Sabrent","SK hynix","Solidigm","Lexar","TeamGroup","ADATA","XPG","Inland","Toshiba","PNY","Silicon Power"],
 psu:["Corsair","Seasonic","EVGA","Cooler Master","Thermaltake","MSI","be quiet!","Super Flower","ASUS","Gigabyte","FSP","NZXT","DeepCool","Antec","XPG"],
 motherboard:["ASUS","MSI","Gigabyte","ASRock","EVGA","Biostar","NZXT"],
 cooler:["Noctua","Thermalright","DeepCool","Arctic","Corsair","NZXT","Lian Li","be quiet!","Cooler Master","EK","MSI","ASUS"],
 case:["Corsair","NZXT","Lian Li","Fractal Design","Phanteks","Montech","Hyte","Cooler Master","be quiet!","Thermaltake","DeepCool","Antec"]
};

function norm(s){
 return String(s||"").toLowerCase()
  .replace(/[®™]/g,"")
  .replace(/[^a-z0-9+]+/g," ")
  .replace(/\s+/g," ").trim();
}
function compact(s){return norm(s).replace(/\s+/g,"")}
function scoreText(query,item){
 const q=norm(query),qc=compact(query);
 const hay=[item.brand,item.family,item.model,...(item.aliases||[])];
 let best=0;
 for(const h0 of hay){
  const h=norm(h0),hc=compact(h0);
  if(!h)continue;
  if(q===h||qc===hc)best=Math.max(best,1);
  else if(q.includes(h)||h.includes(q)||qc.includes(hc)||hc.includes(qc)){
   best=Math.max(best,Math.min(qc.length,hc.length)/Math.max(qc.length,hc.length));
  }else{
   const qw=new Set(q.split(" ")),hw=new Set(h.split(" "));
   let hit=0; for(const w of qw)if(hw.has(w))hit++;
   best=Math.max(best,hit/Math.max(qw.size,1)*.82);
  }
 }
 return best;
}
function findExact(kind,query){
 const list=PRODUCTS[kind]||[];
 let best=null,bestScore=0;
 for(const item of list){
  const s=scoreText(query,item);
  if(s>bestScore){bestScore=s;best=item}
 }
 if(!best||bestScore<.52)return null;
 return {...best,matchScore:Math.round(bestScore*100),catalogMatch:bestScore>=.76?"exact/family":"fuzzy"};
}
function inferBrand(kind,text){
 const raw=String(text||"");
 return (BRAND_HINTS[kind]||[]).find(b=>new RegExp("\\b"+b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(raw))||"";
}
function enrich(kind,text,base={}){
 const exact=findExact(kind,text);
 const brand=exact?.brand||inferBrand(kind,text)||base.brand||"";
 return {...base,brand,product:exact?.model||base.product||"",family:exact?.family||base.family||"",catalogMatch:exact?.catalogMatch||"fallback",catalogConfidence:exact?.matchScore||0};
}
function allNames(kind){
 return (PRODUCTS[kind]||[]).map(x=>`${x.brand} ${x.model}`);
}
window.PCDealProductCatalog={PRODUCTS,BRAND_HINTS,findExact,inferBrand,enrich,allNames};
})();