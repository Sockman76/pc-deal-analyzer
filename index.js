const {onRequest}=require("firebase-functions/v2/https");
const {defineSecret}=require("firebase-functions/params");

const EBAY_CLIENT_ID=defineSecret("EBAY_CLIENT_ID");
const EBAY_CLIENT_SECRET=defineSecret("EBAY_CLIENT_SECRET");

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