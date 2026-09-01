const {onRequest}=require("firebase-functions/v2/https");
const {defineSecret}=require("firebase-functions/params");

const EBAY_CLIENT_ID=defineSecret("EBAY_CLIENT_ID");
const EBAY_CLIENT_SECRET=defineSecret("EBAY_CLIENT_SECRET");
const GEMINI_API_KEY=defineSecret("GEMINI_API_KEY");

let tokenCache={token:"",expires:0};

async function appToken(){
  if(tokenCache.token && Date.now()<tokenCache.expires-60000)return tokenCache.token;
  const id=EBAY_CLIENT_ID.value(),secret=EBAY_CLIENT_SECRET.value();
  const basic=Buffer.from(`${id}:${secret}`).toString("base64");
  const r=await fetch("https://api.ebay.com/identity/v1/oauth2/token",{
    method:"POST",
    headers:{"Authorization":`Basic ${basic}`,"Content-Type":"application/x-www-form-urlencoded"},
    body:"grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope"
  });
  if(!r.ok)throw new Error(`OAuth ${r.status}`);
  const j=await r.json();
  tokenCache={token:j.access_token,expires:Date.now()+(j.expires_in||7200)*1000};
  return tokenCache.token;
}

exports.ebayUsedSearch=onRequest(
  {cors:["https://sockman76.github.io"],secrets:[EBAY_CLIENT_ID,EBAY_CLIENT_SECRET],region:"us-central1"},
  async(req,res)=>{
    try{
      const q=String(req.query.q||"").trim().slice(0,120);
      const marketplace=["EBAY_CA","EBAY_US"].includes(req.query.marketplace)?req.query.marketplace:"EBAY_CA";
      if(!q)return res.status(400).json({error:"Missing q"});
      const token=await appToken();
      const filter=encodeURIComponent("conditions:{USED},buyingOptions:{FIXED_PRICE}");
      const url=`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(q)}&limit=12&filter=${filter}`;
      const r=await fetch(url,{headers:{
        "Authorization":`Bearer ${token}`,
        "X-EBAY-C-MARKETPLACE-ID":marketplace,
        "Accept":"application/json"
      }});
      if(!r.ok)return res.status(r.status).send(await r.text());
      const j=await r.json();
      const items=(j.itemSummaries||[]).map(x=>({
        title:x.title,
        itemId:x.itemId,
        price:x.price?{value:Number(x.price.value),currency:x.price.currency}:null,
        condition:x.condition,
        image:x.image?.imageUrl||"",
        url:x.itemWebUrl||"",
        seller:x.seller?{username:x.seller.username,feedbackPercentage:x.seller.feedbackPercentage}:null,
        shippingOptions:(x.shippingOptions||[]).slice(0,2)
      }));
      res.set("Cache-Control","public,max-age=120,s-maxage=120");
      res.json({marketplace,total:j.total||items.length,items});
    }catch(e){res.status(500).json({error:e.message||"Server error"})}
  }
);

function safePricingPayload(body){
  const raw=body&&typeof body==="object"?body:{};
  const parts=Array.isArray(raw.parts)?raw.parts.slice(0,12).map(x=>({
    kind:String(x.kind||"").slice(0,30),
    name:String(x.name||"").slice(0,120),
    fairLow:Number(x.fairLow)||0,
    fairHigh:Number(x.fairHigh)||0,
    fair:Number(x.fair)||0,
    quickSale:Number(x.quickSale)||0,
    greatBuy:Number(x.greatBuy)||0,
    overpriced:Number(x.overpriced)||0,
    confidence:Number(x.confidence)||0,
    currency:String(x.currency||"CAD").slice(0,8),
    listingStats:x.listingStats?{
      count:Number(x.listingStats.count)||0,
      median:Number(x.listingStats.median)||0,
      q1:Number(x.listingStats.q1)||0,
      q3:Number(x.listingStats.q3)||0
    }:null,
    evidence:Array.isArray(x.evidence)?x.evidence.slice(0,8):[]
  })):[];
  return {
    build:{
      cpu:String(raw.build?.cpu||"").slice(0,120),
      gpu:String(raw.build?.gpu||"").slice(0,120),
      ram:String(raw.build?.ram||"").slice(0,50),
      ramType:String(raw.build?.ramType||"").slice(0,20),
      motherboard:String(raw.build?.motherboard||"").slice(0,150),
      psu:String(raw.build?.psu||"").slice(0,150),
      cooler:String(raw.build?.cooler||"").slice(0,150),
      storage:String(raw.build?.storage||"").slice(0,100),
      askingPrice:Number(raw.build?.askingPrice)||0,
      currency:String(raw.build?.currency||"CAD").slice(0,8)
    },
    parts,
    system:{
      fairLow:Number(raw.system?.fairLow)||0,
      fairHigh:Number(raw.system?.fairHigh)||0,
      fair:Number(raw.system?.fair)||0,
      quickSale:Number(raw.system?.quickSale)||0,
      greatBuy:Number(raw.system?.greatBuy)||0,
      partFair:Number(raw.system?.partFair)||0,
      askingPrice:Number(raw.system?.askingPrice)||0,
      dealPct:Number(raw.system?.dealPct)||0,
      knownParts:Number(raw.system?.knownParts)||0
    }
  };
}

exports.pricingAi=onRequest(
  {cors:["https://sockman76.github.io"],secrets:[GEMINI_API_KEY],region:"us-central1",timeoutSeconds:30,memory:"256MiB"},
  async(req,res)=>{
    try{
      if(req.method!=="POST")return res.status(405).json({error:"POST required"});
      const evidence=safePricingPayload(req.body);
      if(!evidence.parts.length)return res.status(400).json({error:"No pricing evidence supplied."});

      const prompt=`You are the PCDeal pricing analyst. Analyze ONLY the supplied structured price evidence.
Rules:
- Never invent a current price, sold price, retail price, tax, shipping cost, exchange rate, or market listing.
- Active used listings are asking prices, not completed sales.
- A launch MSRP is historical and must not be described as a current retail price.
- PCDeal planning-model/new-build references are estimates, not store prices.
- If evidence is weak, say so clearly and lower confidence.
- Focus on whether the fair-value range is reasonable, which components drive value, and whether the seller asking price looks attractive.
- Do not change the numeric fair values unless you explicitly explain that the evidence is internally inconsistent.
Evidence JSON:
${JSON.stringify(evidence)}`;

      const schema={
        type:"object",
        properties:{
          verdict:{type:"string"},
          summary:{type:"string"},
          confidence:{type:"integer",minimum:0,maximum:100},
          reasons:{type:"array",items:{type:"string"},maxItems:6},
          weakEvidence:{type:"array",items:{type:"string"},maxItems:5}
        },
        required:["verdict","summary","confidence","reasons","weakEvidence"]
      };

      const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",{
        method:"POST",
        headers:{"Content-Type":"application/json","x-goog-api-key":GEMINI_API_KEY.value()},
        body:JSON.stringify({
          contents:[{role:"user",parts:[{text:prompt}]}],
          generationConfig:{temperature:.15,responseMimeType:"application/json",responseSchema:schema}
        })
      });
      if(!r.ok)return res.status(502).json({error:`Gemini API returned ${r.status}`});
      const j=await r.json();
      const text=j?.candidates?.[0]?.content?.parts?.map(x=>x.text||"").join("")||"";
      let parsed;try{parsed=JSON.parse(text)}catch{return res.status(502).json({error:"AI returned invalid structured output."})}
      res.set("Cache-Control","no-store");
      res.json(parsed);
    }catch(e){
      res.status(500).json({error:e.message||"AI pricing analysis failed."});
    }
  }
);
