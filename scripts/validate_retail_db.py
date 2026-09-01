import json,sys
from pathlib import Path
r=Path(sys.argv[1] if len(sys.argv)>1 else "retail-db");m=json.loads((r/"manifest.json").read_text());a=json.loads((r/"current/all.json").read_text());assert m["currency"]=="CAD";ids=set()
for x in a:
 assert x["product_id"] not in ids;ids.add(x["product_id"]);assert x["retail_source"] in {"Canada Computers","Amazon Canada"};assert (x.get("sale_price_cad") or x.get("price_cad") or 0)>0
print("Retail DB OK:",len(a))
