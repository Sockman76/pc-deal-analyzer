#!/usr/bin/env python3
"""
PCDeal Master Database builder.

Designed to merge:
1) docyx/pc-part-dataset (MIT; 66k+ parts, snapshot-oriented)
2) BuildCores OpenDB (ODC-By 1.0; community-maintained, structured)
3) PCDeal official/manual overrides

This script does not scrape PCPartPicker live.
"""
from __future__ import annotations
import argparse, json, re, hashlib, datetime, os
from pathlib import Path
from collections import defaultdict

NOW = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

CATEGORY_MAP = {
    "cpu":"cpu","cpus":"cpu","processor":"cpu","processors":"cpu",
    "cpu-cooler":"cpu-cooler","cpu-coolers":"cpu-cooler","cooler":"cpu-cooler","coolers":"cpu-cooler",
    "motherboard":"motherboard","motherboards":"motherboard","mainboard":"motherboard",
    "memory":"memory","ram":"memory",
    "storage":"storage","internal-storage":"storage","ssd":"storage","hdd":"storage",
    "video-card":"gpu","video-cards":"gpu","gpu":"gpu","graphics-card":"gpu","graphics-cards":"gpu",
    "case":"case","cases":"case",
    "power-supply":"psu","power-supplies":"psu","psu":"psu",
    "optical-drive":"optical-drive","optical-drives":"optical-drive",
    "operating-system":"operating-system","operating-systems":"operating-system",
    "monitor":"monitor","monitors":"monitor",
    "external-storage":"external-storage",
    "case-accessory":"case-accessory","case-accessories":"case-accessory",
    "case-fan":"case-fan","case-fans":"case-fan",
    "fan-controller":"fan-controller","fan-controllers":"fan-controller",
    "thermal-compound":"thermal-compound",
    "ups":"ups","ups-system":"ups","ups-systems":"ups",
    "sound-card":"sound-card","sound-cards":"sound-card",
    "wired-network-adapter":"wired-network-adapter","wired-network-adapters":"wired-network-adapter",
    "wireless-network-adapter":"wireless-network-adapter","wireless-network-adapters":"wireless-network-adapter",
    "headphone":"headphones","headphones":"headphones",
    "keyboard":"keyboard","keyboards":"keyboard",
    "mouse":"mouse","mice":"mouse",
    "speaker":"speakers","speakers":"speakers",
    "webcam":"webcam","webcams":"webcam"
}

IDENTIFIER_KEYS = {
    "mpn","part_number","partnumber","manufacturer_part_number","manufacturerpartnumber",
    "upc","ean","gtin","sku","asin","model_number","modelnumber","retailer_sku"
}

def s(v):
    if v is None: return ""
    if isinstance(v,(str,int,float)): return str(v).strip()
    return ""

def norm(v):
    return re.sub(r"\s+"," ",re.sub(r"[^a-z0-9+.-]+"," ",s(v).lower())).strip()

def compact(v):
    return re.sub(r"[^a-z0-9]+","",s(v).lower())

def slug_category(v, fallback="other"):
    x=norm(v).replace(" ","-")
    return CATEGORY_MAP.get(x,x or fallback)

def infer_category(path:Path, obj:dict):
    for k in ("category","type","part_type","partType","component_type","componentType"):
        if obj.get(k):
            c=slug_category(obj[k])
            if c!="other": return c
    parts=[p.lower().replace("_","-") for p in path.parts]
    for p in reversed(parts):
        if p in CATEGORY_MAP: return CATEGORY_MAP[p]
        singular=p[:-1] if p.endswith("s") else p
        if singular in CATEGORY_MAP: return CATEGORY_MAP[singular]
    return "other"

def pick(obj,*keys):
    for k in keys:
        if k in obj and s(obj[k]): return s(obj[k])
    return ""

def flatten_specs(obj):
    # Keep useful unknown fields without duplicating common identity metadata.
    skip=set([
      "id","name","title","category","type","brand","manufacturer","make","series","model","variant",
      "aliases","url","link","product_url","productUrl","metadata","prices","price","sources","source"
    ])
    out={}
    for k,v in obj.items():
        if k in skip: continue
        if isinstance(v,(str,int,float,bool)) or v is None:
            out[k]=v
        elif isinstance(v,list) and len(v)<=30 and all(isinstance(x,(str,int,float,bool,type(None))) for x in v):
            out[k]=v
        elif isinstance(v,dict) and len(v)<=40:
            clean={kk:vv for kk,vv in v.items() if isinstance(vv,(str,int,float,bool,type(None)))}
            if clean: out[k]=clean
    return out

def source_record(source_name, obj, path):
    url=pick(obj,"url","product_url","productUrl","link")
    return {"source":source_name,"source_path":str(path).replace("\\","/"),"url":url or None,"imported_at":NOW}

def canonicalize(obj:dict, path:Path, source_name:str):
    meta=obj.get("metadata") if isinstance(obj.get("metadata"),dict) else {}
    name=pick(obj,"name","title","product_name","productName","full_name","fullName")
    manufacturer=pick(meta,"manufacturer") or pick(obj,"manufacturer","brand","make")
    brand=pick(obj,"brand") or manufacturer
    series=pick(meta,"series") or pick(obj,"series","family","line")
    variant=pick(meta,"variant") or pick(obj,"variant","edition","color")
    model=pick(obj,"model","model_name","modelName","model_number","modelNumber")
    if not name:
        name=" ".join(x for x in [brand,series,model,variant] if x).strip()
    if not name: return None

    category=infer_category(path,obj)
    aliases=[]
    raw_aliases=obj.get("aliases")
    if isinstance(raw_aliases,list): aliases.extend(s(x) for x in raw_aliases if s(x))
    aliases.extend(x for x in [model,series, f"{brand} {model}".strip(), f"{brand} {series} {model}".strip()] if x)
    aliases=list(dict.fromkeys(x for x in aliases if x and norm(x)!=norm(name)))[:30]

    ids={}
    for k,v in obj.items():
        if k.lower() in IDENTIFIER_KEYS and s(v): ids[k]=v
    for k,v in meta.items():
        if k.lower() in IDENTIFIER_KEYS and s(v): ids[k]=v

    # Stable local ID: strongest identity keys first; otherwise category + normalized name.
    id_basis=""
    for key in ("mpn","manufacturer_part_number","part_number","upc","ean","gtin"):
        val=next((s(v) for k,v in ids.items() if k.lower()==key and s(v)), "")
        if val: id_basis=f"{category}|{brand}|{key}|{val}"; break
    if not id_basis: id_basis=f"{category}|{manufacturer or brand}|{name}"
    pid="pcd_"+hashlib.sha1(norm(id_basis).encode()).hexdigest()[:20]

    return {
      "id":pid,
      "category":category,
      "name":name,
      "normalized_name":norm(name),
      "manufacturer":manufacturer,
      "brand":brand,
      "series":series,
      "model":model,
      "variant":variant,
      "aliases":aliases,
      "identifiers":ids,
      "specs":flatten_specs(obj),
      "sources":[source_record(source_name,obj,path)],
      "confidence":70 if model or ids else 55,
      "first_seen":NOW,
      "last_verified":NOW
    }

def load_records(root:Path, source_name:str):
    if not root or not root.exists(): return []
    out=[]
    for path in root.rglob("*"):
        if not path.is_file(): continue
        try:
            if path.suffix.lower()==".json":
                raw=json.loads(path.read_text(encoding="utf-8",errors="ignore"))
                items=raw if isinstance(raw,list) else [raw]
            elif path.suffix.lower() in (".jsonl",".ndjson"):
                items=[json.loads(line) for line in path.read_text(encoding="utf-8",errors="ignore").splitlines() if line.strip()]
            else:
                continue
            for obj in items:
                if isinstance(obj,dict):
                    rec=canonicalize(obj,path.relative_to(root),source_name)
                    if rec: out.append(rec)
        except Exception as e:
            print("WARN",path,e)
    return out

def identity_keys(r):
    keys=set()
    cat=r["category"]; brand=norm(r.get("brand") or r.get("manufacturer"))
    ids=r.get("identifiers") or {}
    for k,v in ids.items():
        if s(v): keys.add(f"id|{cat}|{k.lower()}|{compact(v)}")
    if r.get("model"):
        keys.add(f"model|{cat}|{brand}|{compact(r['model'])}")
    keys.add(f"name|{cat}|{brand}|{compact(r['name'])}")
    return keys

def merge(a,b):
    for k in ("manufacturer","brand","series","model","variant"):
        if not a.get(k) and b.get(k): a[k]=b[k]
    a["aliases"]=list(dict.fromkeys((a.get("aliases") or [])+(b.get("aliases") or [])))[:60]
    a["identifiers"]={**(a.get("identifiers") or {}),**(b.get("identifiers") or {})}
    # Prefer existing spec keys, fill gaps from second source.
    specs=dict(b.get("specs") or {}); specs.update(a.get("specs") or {}); a["specs"]=specs
    seen={(x.get("source"),x.get("source_path")) for x in a.get("sources") or []}
    for x in b.get("sources") or []:
        if (x.get("source"),x.get("source_path")) not in seen: a["sources"].append(x)
    a["confidence"]=min(99,max(a.get("confidence",0),b.get("confidence",0))+ (8 if len(a["sources"])>1 else 0))
    a["last_verified"]=NOW
    return a

def dedupe(records):
    out={}
    key_to_id={}
    for r in records:
        match=None
        for k in identity_keys(r):
            if k in key_to_id: match=key_to_id[k]; break
        if match:
            out[match]=merge(out[match],r)
            rid=match
        else:
            rid=r["id"]
            while rid in out:
                rid=r["id"]+"_"+hashlib.sha1((r["name"]+str(len(out))).encode()).hexdigest()[:5]
            r["id"]=rid; out[rid]=r
        for k in identity_keys(out[rid]): key_to_id[k]=rid
    return list(out.values())

def apply_overrides(records, root:Path):
    if not root.exists(): return records
    by_id={r["id"]:r for r in records}
    by_name={(r["category"],compact(r["name"])):r for r in records}
    for path in root.rglob("*.json"):
        raw=json.loads(path.read_text(encoding="utf-8"))
        items=raw if isinstance(raw,list) else [raw]
        for o in items:
            if not isinstance(o,dict): continue
            target=by_id.get(o.get("id")) or by_name.get((slug_category(o.get("category","other")),compact(o.get("name",""))))
            if target:
                for k,v in o.items():
                    if k in ("sources",): continue
                    if v not in ("",None,[],{}): target[k]=v
                target.setdefault("sources",[]).append({"source":"PCDeal official/manual override","source_path":str(path),"url":o.get("source_url"),"imported_at":NOW})
                target["confidence"]=max(target.get("confidence",0),95)
                target["last_verified"]=NOW
            else:
                rec=canonicalize(o,path,"PCDeal official/manual override")
                if rec: rec["confidence"]=95; records.append(rec)
    return records

def write_output(records,out_dir:Path,sources_meta):
    index_dir=out_dir/"index"; shard_dir=out_dir/"shards"
    index_dir.mkdir(parents=True,exist_ok=True); shard_dir.mkdir(parents=True,exist_ok=True)
    # wipe generated files only
    for d in (index_dir,shard_dir):
        for p in d.rglob("*.json"): p.unlink()
    cats=defaultdict(list)
    for r in records: cats[r["category"]].append(r)
    manifest={"generated_at":NOW,"total_products":len(records),"categories":{},"sources":sources_meta,"schema_version":1}
    for cat,items in sorted(cats.items()):
        items.sort(key=lambda r:(norm(r.get("brand")),r["normalized_name"],r["id"]))
        cat_dir=shard_dir/cat; cat_dir.mkdir(parents=True,exist_ok=True)
        shards=defaultdict(list)
        mini=[]
        for r in items:
            bucket=hashlib.sha1(r["id"].encode()).hexdigest()[:2]
            shards[bucket].append(r)
            mini.append({
              "id":r["id"],"name":r["name"],"normalized_name":r["normalized_name"],
              "brand":r.get("brand",""),"manufacturer":r.get("manufacturer",""),
              "series":r.get("series",""),"model":r.get("model",""),
              "aliases":r.get("aliases",[])[:12],"confidence":r.get("confidence",0),"shard":bucket
            })
        for bucket,rows in shards.items():
            (cat_dir/f"{bucket}.json").write_text(json.dumps(rows,separators=(",",":"),ensure_ascii=False),encoding="utf-8")
        (index_dir/f"{cat}.json").write_text(json.dumps(mini,separators=(",",":"),ensure_ascii=False),encoding="utf-8")
        manifest["categories"][cat]={"count":len(items),"shards":len(shards),"index":f"master-db/index/{cat}.json"}
    (out_dir/"manifest.json").write_text(json.dumps(manifest,indent=2),encoding="utf-8")
    (out_dir/"attribution.json").write_text(json.dumps({
      "generated_at":NOW,
      "sources":sources_meta,
      "notice":"PCDeal Master Database contains merged/normalized records. Source attribution and license notices must be preserved."
    },indent=2),encoding="utf-8")

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--pcpart",type=Path)
    ap.add_argument("--buildcores",type=Path)
    ap.add_argument("--overrides",type=Path,default=Path("master-db/overrides"))
    ap.add_argument("--out",type=Path,default=Path("master-db"))
    args=ap.parse_args()

    records=[]
    meta=[]
    if args.pcpart and args.pcpart.exists():
        x=load_records(args.pcpart,"docyx/pc-part-dataset")
        records+=x
        meta.append({"name":"docyx/pc-part-dataset","license":"MIT","url":"https://github.com/docyx/pc-part-dataset","records_imported":len(x),"upstream_snapshot":"2025-07-23"})
    if args.buildcores and args.buildcores.exists():
        x=load_records(args.buildcores,"BuildCores OpenDB")
        records+=x
        meta.append({"name":"BuildCores OpenDB","license":"ODC-By 1.0","url":"https://github.com/buildcores/buildcores-open-db","records_imported":len(x)})
    print("Raw records:",len(records))
    records=dedupe(records)
    records=apply_overrides(records,args.overrides)
    records=dedupe(records)
    print("Merged records:",len(records))
    write_output(records,args.out,meta)

if __name__=="__main__":
    main()
