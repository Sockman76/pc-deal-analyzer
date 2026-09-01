#!/usr/bin/env python3
import json,sys
from pathlib import Path
root=Path(sys.argv[1] if len(sys.argv)>1 else "master-db")
manifest=json.loads((root/"manifest.json").read_text())
errors=[]
count=0
seen=set()
for cat,meta in manifest.get("categories",{}).items():
    idx=json.loads((root/"index"/f"{cat}.json").read_text())
    if len(idx)!=meta["count"]: errors.append(f"{cat}: index count mismatch")
    for x in idx:
        if x["id"] in seen: errors.append(f"duplicate id {x['id']}")
        seen.add(x["id"]);count+=1
if count!=manifest.get("total_products"): errors.append("manifest total mismatch")
print(json.dumps({"products":count,"categories":len(manifest.get("categories",{})),"errors":errors},indent=2))
sys.exit(1 if errors else 0)
