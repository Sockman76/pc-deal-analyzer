import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, writeBatch, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8NhIR_YIV5eV0jhgArSV-x2DOorE0Wek",
  authDomain: "pcdeal-d8f08.firebaseapp.com",
  projectId: "pcdeal-d8f08",
  storageBucket: "pcdeal-d8f08.firebasestorage.app",
  messagingSenderId: "704444707283",
  appId: "1:704444707283:web:40dc26d3cbcd17f9bc3f26",
  measurementId: "G-W1MXHF9625"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
isSupported().then(ok=>{ if(ok) getAnalytics(app); }).catch(()=>{});

const LOCAL_BUILD = "pcdeal.v5.build";
const LOCAL_DEALS = "pcdeal.v5.deals";
const parse = (key, fallback)=>{ try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback} };
const safeId = x => String(x || (crypto.randomUUID ? crypto.randomUUID() : Date.now()+"-"+Math.random())).replace(/[^a-zA-Z0-9_-]/g,"_");
async function ensureProfile(user){
  if(!user) return;
  await setDoc(doc(db,"users",user.uid), {email:user.email||"",displayName:user.displayName||"",photoURL:user.photoURL||"",lastSeenAt:serverTimestamp()}, {merge:true});
}
async function saveCurrentBuild(){
  const u=auth.currentUser;if(!u) throw new Error("Sign in first.");
  const build=parse(LOCAL_BUILD,{}); if(!Object.keys(build).length) throw new Error("Analyze a PC first.");
  const id=safeId(build.id || "latest");
  await setDoc(doc(db,"users",u.uid,"builds",id), {...build,cloudSavedAt:serverTimestamp()}, {merge:true});
  return id;
}
async function uploadLocalDeals(){
  const u=auth.currentUser;if(!u) throw new Error("Sign in first.");
  const deals=parse(LOCAL_DEALS,[]); const batch=writeBatch(db);
  deals.forEach(d=>batch.set(doc(db,"users",u.uid,"deals",safeId(d.id)),{...d,cloudSavedAt:serverTimestamp()},{merge:true}));
  await batch.commit(); return deals.length;
}
async function pullCloudDeals(){
  const u=auth.currentUser;if(!u) throw new Error("Sign in first.");
  const snap=await getDocs(collection(db,"users",u.uid,"deals")); const remote=[]; snap.forEach(x=>remote.push({id:x.id,...x.data()}));
  const local=parse(LOCAL_DEALS,[]); const map=new Map(local.map(x=>[String(x.id),x])); remote.forEach(x=>map.set(String(x.id),{...(map.get(String(x.id))||{}),...x})); const merged=[...map.values()];
  localStorage.setItem(LOCAL_DEALS,JSON.stringify(merged)); return merged.length;
}
async function pullLatestBuild(){
  const u=auth.currentUser;if(!u) throw new Error("Sign in first.");
  const ref=doc(db,"users",u.uid,"builds","latest"); const snap=await getDoc(ref); if(!snap.exists()) throw new Error("No cloud build saved yet.");
  const d=snap.data(); localStorage.setItem(LOCAL_BUILD,JSON.stringify(d)); return d;
}

window.PCDealFirebase={
  app,auth,db,
  signInGoogle:()=>signInWithPopup(auth,googleProvider),
  signUpEmail:(email,password)=>createUserWithEmailAndPassword(auth,email,password),
  signInEmail:(email,password)=>signInWithEmailAndPassword(auth,email,password),
  signOut:()=>signOut(auth),
  resetPassword:(email)=>sendPasswordResetEmail(auth,email),
  saveCurrentBuild,uploadLocalDeals,pullCloudDeals,pullLatestBuild,
  onAuth:(cb)=>onAuthStateChanged(auth,async u=>{if(u) await ensureProfile(u).catch(()=>{});cb(u)})
};
window.dispatchEvent(new Event("pcdeal-firebase-ready"));
