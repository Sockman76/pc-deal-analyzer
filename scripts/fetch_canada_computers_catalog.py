#!/usr/bin/env python3
"""
PCDeal Canada Computers catalog collector.
Collects NEW product cards from configured PC component categories.
The normalizer in build_retail_db.py matches these observations to the master DB.
"""
from __future__ import annotations
import argparse, json, re, time, urllib.parse
from pathlib import Path
from datetime import datetime, timezone
import requests
from bs4 import BeautifulSoup

BASE="https://www.canadacomputers.com"
CATEGORIES={
 "cpu":"https://www.canadacomputers.com/en/956/cpu",
 "gpu":"https://www.canadacomputers.com/en/915/desktop-graphics-cards",
 "memory":"https://www.canadacomputers.com/en/1022/desktop-memory",
 "motherboard":"https://www.canadacomputers.com/en/53/motherboards",
 "storage":"https://www.canadacomputers.com/en/1291/desktop-laptop-internal-ssds",
 "hdd":"https://www.canadacomputers.com/en/1134/desktop-hard-drives",
 "psu":"https://www.canadacomputers.com/en/1346/power-supplies",
 "cpu-cooler":"https://www.canadacomputers.com/en/936/cpu-cooling",
 "case":"https://www.canadacomputers.com/en/861/computer-cases",
 "case-fan":"https://www.canadacomputers.com/en/927/case-fans",
}
HEADERS={"User-Agent":"Mozilla/5.0 (compatible; PCDealPriceIndexer/1.0; +https://github.com/)"}
PRICE_RE=re.compile(r"\$([0-9][0-9,]*(?:\.[0-9]{2})?)")

def now():
 return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z")

def prices(text):
 vals=[float(x.replace(",","")) for x in PRICE_RE.findall(text or "")]
 return vals

def cards(html,category,url):
 soup=BeautifulSoup(html,"html.parser")
 out=[]
 seen=set()
 # Product links on category pages point to /en/<category>/<id>/<slug>.html
 for a in soup.select('a[href*="/en/"]'):
  href=a.get("href","")
  title=" ".join(a.get_text(" ",strip=True).split())
  if not title or len(title)<6 or title.lower() in {"add to cart","buy now","load more items"}:continue
  if href.startswith("/"):href=BASE+href
  if not href.startswith(BASE+"/en/"):continue
  node=a
  for _ in range(5):
   if not node.parent:break
   node=node.parent
   txt=" ".join(node.get_text(" ",strip=True).split())
   vals=prices(txt)
   if vals and len(txt)<1600:break
  vals=prices(" ".join(node.get_text(" ",strip=True).split()) if node else "")
  if not vals:continue
  # Skip open-box cards for retail-new baseline.
  block=" ".join(node.get_text(" ",strip=True).split())
  if re.search(r"\b(open[\s-]?box|refurb(?:ished)?|renewed|used)\b", block+" "+title, re.I):continue
  key=(title,href)
  if key in seen:continue
  seen.add(key)
  current=vals[0]
  regular=vals[1] if len(vals)>1 and vals[1]>=current else None
  out.append({
   "name":title,"category":category,"price_cad":current,
   "regular_price_cad":regular,"sale_price_cad":current if regular else None,
   "condition":"new","retail_baseline":"current_new_selling_price","in_stock":"Sold out" not in block,
   "url":href,"seller":"Canada Computers","observed_at":now()
  })
 return out

def fetch(session,url):
 r=session.get(url,headers=HEADERS,timeout=30)
 r.raise_for_status()
 return r.text

def main():
 ap=argparse.ArgumentParser()
 ap.add_argument("--out",default="retail-import/canada-computers.json")
 ap.add_argument("--delay",type=float,default=1.2)
 ap.add_argument("--max-pages",type=int,default=60)
 a=ap.parse_args()
 s=requests.Session(); allrows=[]; seen_urls=set()
 for category,start in CATEGORIES.items():
  queue=[start];pages=0
  while queue and pages<a.max_pages:
   url=queue.pop(0)
   if url in seen_urls:continue
   seen_urls.add(url);pages+=1
   try:html=fetch(s,url)
   except Exception as e:
    print(category,url,"ERROR",e);continue
   rows=cards(html,category,url);allrows.extend(rows)
   soup=BeautifulSoup(html,"html.parser")
   # Follow explicit pagination/load-more/category pagination links when present.
   for a_tag in soup.find_all("a",href=True):
    label=" ".join(a_tag.get_text(" ",strip=True).split()).lower()
    href=urllib.parse.urljoin(url,a_tag["href"])
    if ("load more" in label or "next"==label or "page=" in href or "p=" in href) and href.startswith(BASE):
     if href not in seen_urls:queue.append(href)
   time.sleep(a.delay)
  print(category,"pages",pages,"rows",len([x for x in allrows if x["category"]==category]))
 Path(a.out).parent.mkdir(parents=True,exist_ok=True)
 Path(a.out).write_text(json.dumps(allrows,indent=2),encoding="utf-8")
 print("saved",len(allrows),"observations to",a.out)

if __name__=="__main__":main()
