"use client";

import { useState } from "react";

const shops=[{name:"Ice Cream",icon:"🍦"},{name:"Toys",icon:"🧸"},{name:"Books",icon:"📚"},{name:"Pet Treats",icon:"🐾"},{name:"Games",icon:"🎮"},{name:"Bakery",icon:"🧁"}];
const names=["FROSTIPOP","MOONMINT","ZINGORA","STARLOOM","PIPZOO","WONDERNIB"];
const symbols=["🌙","⭐","🚀","🐧","⚡","🌈","🐾","👑"];
const tags=["A little magic every day!","Big smiles start here!","Made for curious minds!","Adventure is waiting!","Small treats, big joy!","Find your favourite!" ];

export function BrandStreetMakeover(){
 const[shop,setShop]=useState(shops[0]);const[name,setName]=useState(names[0]);const[symbol,setSymbol]=useState(symbols[2]);const[tag,setTag]=useState(tags[0]);const[revealed,setRevealed]=useState(false);
 const surprise=()=>{setShop(shops[Math.floor(Math.random()*shops.length)]);setName(names[Math.floor(Math.random()*names.length)]);setSymbol(symbols[Math.floor(Math.random()*symbols.length)]);setTag(tags[Math.floor(Math.random()*tags.length)]);setRevealed(false)};
 return <div className="mx-auto mt-6 max-w-5xl rounded-3xl bg-sky-50 p-4 sm:p-7">
  <div className="rounded-3xl bg-detective-yellow-100 p-5 text-center"><p className="text-5xl">🐱</p><p className="mt-2 font-display text-xl font-bold text-detective-blue-900">Brand Street has room for one more shop — YOURS!</p></div>
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
   <div className="space-y-5 text-left">
    <div><p className="font-display font-bold">1. Pick your shop</p><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{shops.map(x=><button key={x.name} onClick={()=>{setShop(x);setRevealed(false)}} className={`rounded-2xl border-2 p-3 font-display font-bold ${shop.name===x.name?"border-detective-orange-500 bg-detective-yellow-100":"border-detective-blue-100 bg-white"}`}><span className="mr-2 text-xl">{x.icon}</span>{x.name}</button>)}</div></div>
    <div><p className="font-display font-bold">2. Choose a fictional identity</p><div className="mt-2 flex flex-wrap gap-2">{names.map(x=><button key={x} onClick={()=>{setName(x);setRevealed(false)}} className={`rounded-full border-2 px-4 py-2 font-display font-bold ${name===x?"border-detective-orange-500 bg-detective-yellow-100":"border-detective-blue-100 bg-white"}`}>{x}</button>)}</div></div>
    <div><p className="font-display font-bold">3. Pick a symbol</p><div className="mt-2 flex flex-wrap gap-2">{symbols.map(x=><button key={x} aria-label={`Choose ${x}`} onClick={()=>{setSymbol(x);setRevealed(false)}} className={`grid h-12 w-12 place-items-center rounded-2xl border-2 bg-white text-2xl ${symbol===x?"border-detective-orange-500":"border-detective-blue-100"}`}>{x}</button>)}</div></div>
    <div><p className="font-display font-bold">4. Pick a tagline</p><div className="mt-2 grid gap-2">{tags.map(x=><button key={x} onClick={()=>{setTag(x);setRevealed(false)}} className={`rounded-2xl border-2 px-4 py-2 text-left ${tag===x?"border-detective-orange-500 bg-detective-yellow-100":"border-detective-blue-100 bg-white"}`}>{x}</button>)}</div></div>
    <button onClick={surprise} className="min-h-12 rounded-full border-2 border-detective-orange-400 bg-white px-5 font-display font-bold">🎲 SURPRISE ME!</button>
   </div>
   <div className="flex flex-col justify-center">
    <div className="overflow-hidden rounded-[2rem] border-4 border-detective-blue-800 bg-white shadow-lg"><div className="bg-detective-blue-900 px-4 py-3 text-center font-display font-bold text-white">BRAND STREET</div><div className="p-6 text-center"><p className="text-6xl">{shop.icon}</p><p className="mt-2 text-sm font-bold uppercase tracking-widest text-detective-blue-500">{shop.name} shop</p><div className="mx-auto mt-5 rounded-2xl border-4 border-detective-orange-400 bg-detective-yellow-100 p-5"><p className="text-5xl">{symbol}</p><p className="mt-2 font-display text-3xl font-black text-detective-blue-900">{name}</p><p className="mt-2 font-display font-bold text-detective-orange-600">{tag}</p></div><div className="mt-5 flex justify-center gap-2 text-3xl"><span>🏪</span><span>🏬</span><span className="scale-125">🏪</span><span>🏬</span></div></div></div>
    <button onClick={()=>setRevealed(true)} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">✨ OPEN MY SHOP!</button>
   </div>
  </div>
  {revealed&&<div className="mt-6 rounded-3xl bg-gradient-to-br from-detective-yellow-100 to-sky-100 p-6 text-center"><p className="text-5xl">🎉</p><h3 className="mt-2 font-display text-3xl font-black text-detective-blue-900">WELCOME TO BRAND STREET!</h3><p className="mt-3 text-lg">Fantastic detective work! You gave your fictional shop its own identity.</p><p className="mx-auto mt-4 max-w-md rounded-2xl bg-white p-4 font-display text-xl font-bold">🏅 BRAND CREATOR STAMP · ⭐ +20 BONUS XP</p><button onClick={()=>{surprise();setRevealed(false)}} className="mt-4 min-h-12 rounded-full border-2 border-detective-blue-200 bg-white px-6 font-display font-bold">🔄 MAKE ANOTHER BRAND</button></div>}
  <p className="mt-5 rounded-2xl bg-white p-4 text-xs text-detective-blue-600"><strong>Creative-learning note:</strong> A fictional name created here is not necessarily available or registrable as a trademark. Real-world registrability depends on the applicable rules and existing rights.</p>
 </div>
}
