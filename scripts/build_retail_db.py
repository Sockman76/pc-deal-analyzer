#!/usr/bin/env python3
import argparse,json,re,datetime
from pathlib import Path
from collections import defaultdict
NOW=datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z")
def S(v):return "" if v is None else str(v).strip()
def N(v):return re.sub(r"\s+"," ",re.sub(r"[^a-z0-9+.-]+"," ",S(v).lower())).strip()
def C(v):return re.sub(r"[^a-z0-9]+","",S(v).lower())
def NUM(v):
 m=re.search(r"([0-9][0-9,]*(?:\.[0-9]+)?)",S(v));return float(m.group(1).replace(",","")) if m else None
def SIM(a,b):
 a,b=N(a),N(b)
 if not a or not b:return 0
 if a==b or C(a)==C(b):return 1
 A,B=C(a),C(b)
 if A in B or B in A:return min(len(A),len(B))/max(len(A),len(B))*.95
 aw,bw=set(a.split()),set(b.split());return len(aw&bw)/max(len(aw),1)*.82
def LOAD(p):
 p=Path(p)
 if not p.exists():return []
 x=json.loads(p.read_text(encoding="utf-8"));return x if isinstance(x,list) else x.get("items",x.get("products",[]))
def MASTER(root):
 out=[]
 for p in (Path(root)/"index").glob("*.json"):
  for x in json.loads(p.read_text(encoding="utf-8")):out.append({**x,"category":p.stem})
 return out
def BEST(o,m):
 q=o.get("name") or "";best=None;score=0
 for x in m:
  if o.get("category") and x["category"]!=o["category"]:continue
  z=max(SIM(q,x.get("name")),SIM(q,f"{x.get('brand','')} {x.get('model','')}"))
  for a in x.get("aliases",[]):z=max(z,SIM(q,a)*.98)
  if z>score:best,score=x,z
 return (best,round(score*100)) if best and score>=.72 else (None,round(score*100))
def main():
 ap=argparse.ArgumentParser();ap.add_argument("--master",default="master-db");ap.add_argument("--cc",default="retail-import/canada-computers.json");ap.add_argument("--amazon",default="retail-import/amazon-ca.json");ap.add_argument("--out",default="retail-db");a=ap.parse_args()
 master=MASTER(a.master);obs=[]
 for src,p in [("Canada Computers",a.cc),("Amazon Canada",a.amazon)]:
  for z in LOAD(p):
   o={"name":S(z.get("name") or z.get("title")),"category":S(z.get("category")),"mpn":S(z.get("mpn") or z.get("sku")),"retail_source":src,"retail_url":S(z.get("url")),"seller":S(z.get("seller") or src),"condition":S(z.get("condition") or "new").lower(),"price_cad":NUM(z.get("price_cad",z.get("price"))),"sale_price_cad":NUM(z.get("sale_price_cad",z.get("sale_price"))),"regular_price_cad":NUM(z.get("regular_price_cad",z.get("regular_price"))),"in_stock":z.get("in_stock",True),"observed_at":S(z.get("observed_at") or NOW)}
   if not(o["price_cad"] or o["sale_price_cad"]):continue
   x,score=BEST(o,master)
   if not x:continue
   o.update({"product_id":x["id"],"category":x["category"],"name":x["name"],"brand":x.get("brand",""),"model":x.get("model",""),"match_confidence":score,"match_method":"exact_name/model"});obs.append(o)
 by=defaultdict(list)
 for x in obs:by[x["product_id"]].append(x)
 cur=[]
 for pid,r in by.items():
  cc=[x for x in r if x["retail_source"]=="Canada Computers" and x["condition"]=="new" and x["in_stock"] is not False]
  am=[x for x in r if x["retail_source"]=="Amazon Canada" and x["condition"]=="new" and x["in_stock"] is not False]
  pool=cc or am
  if pool:cur.append(sorted(pool,key=lambda x:x.get("sale_price_cad") or x.get("price_cad") or 10**9)[0])
 out=Path(a.out);(out/"current").mkdir(parents=True,exist_ok=True);(out/"observations").mkdir(parents=True,exist_ok=True)
 (out/"current/all.json").write_text(json.dumps(cur,indent=2),encoding="utf-8");(out/"observations/all.json").write_text(json.dumps(obs,indent=2),encoding="utf-8")
 cats=defaultdict(int)
 for x in cur:cats[x["category"]]+=1
 (out/"manifest.json").write_text(json.dumps({"schema_version":1,"generated_at":NOW,"currency":"CAD","priority":["Canada Computers","Amazon Canada"],"products_with_current_price":len(cur),"observations":len(obs),"categories":dict(cats),"policy":{"canada_computers_first":True,"amazon_fallback_only":True,"exact_sku_only":True}},indent=2),encoding="utf-8")
 print(f"Retail DB built: {len(cur)} current, {len(obs)} observations")
if __name__=="__main__":main()
