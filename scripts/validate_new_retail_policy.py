#!/usr/bin/env python3
import json,re,sys
from pathlib import Path
p=Path(sys.argv[1] if len(sys.argv)>1 else "retail-db/current/all.json")
rows=json.loads(p.read_text())
bad=[]
for i,r in enumerate(rows):
 s=str(r.get("name",""))
 if str(r.get("condition","")).lower()!="new":bad.append((i,"condition",s))
 if re.search(r"\b(open[\s-]?box|refurb(?:ished)?|renewed|used)\b",s,re.I):bad.append((i,"non-new-title",s))
 if not isinstance(r.get("price_cad"),(int,float)) or r["price_cad"]<=0:bad.append((i,"price",s))
if bad:
 print("FAIL",bad[:20]);raise SystemExit(1)
print("PASS",len(rows),"NEW retail records")
