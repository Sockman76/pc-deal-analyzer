#!/usr/bin/env python3
"""
Amazon.ca fallback importer.
Input is a JSON export of exact Amazon product observations gathered for products
that are absent from the Canada Computers catalog. This validator rejects weak matches.
"""
import argparse,json,re
from pathlib import Path
def norm(s):return re.sub(r"\s+"," ",re.sub(r"[^a-z0-9+.-]+"," ",str(s or "").lower())).strip()
def sim(a,b):
 A=set(norm(a).split());B=set(norm(b).split())
 return len(A&B)/max(1,len(A|B))
def main():
 ap=argparse.ArgumentParser();ap.add_argument("--input",required=True);ap.add_argument("--missing",required=True);ap.add_argument("--out",default="retail-import/amazon-ca.json");a=ap.parse_args()
 rows=json.loads(Path(a.input).read_text());missing=json.loads(Path(a.missing).read_text());out=[]
 for r in rows:
  best=max((sim(r.get("name"),m.get("name")) for m in missing),default=0)
  if best<.72:continue
  if str(r.get("condition","new")).lower()!="new":continue
  r["retail_source"]="Amazon Canada";r["match_confidence"]=round(best*100);out.append(r)
 Path(a.out).write_text(json.dumps(out,indent=2),encoding="utf-8")
 print("accepted",len(out),"Amazon fallbacks")
if __name__=="__main__":main()
