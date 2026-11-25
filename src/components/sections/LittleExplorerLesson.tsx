"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import questy from "@/Questy Image.png";

const activities = [
 [{kind:"build",title:"Build a rocket",items:["🔺","▭","🔵"],target:["🔺","▭","🔵"]},{kind:"match",title:"Match the shapes",items:["⭐","🔵","🔺","⭐","🔺","🔵"]},{kind:"build",title:"Make a house",items:["🔺","🟨","🚪"],target:["🔺","🟨","🚪"]}],
 [{kind:"paint",title:"Colour a butterfly",items:["Butterfly"]},{kind:"paint",title:"Draw your own picture",items:["Canvas"]},{kind:"spot",title:"Tap the different picture",items:["🌷","🌷","🌻","🌷","🌷","🌷"],target:["2"]}],
 [{kind:"match",title:"Match the shop signs",items:["🍎","⭐","🐻","🐻","🍎","⭐"]},{kind:"design",title:"Make your shop sign",items:["Moon Shop","Happy Shop","Rainbow Shop"]},{kind:"match",title:"Match the packages",items:["🎁","🧃","🧸","🧃","🧸","🎁"]}],
 [{kind:"build",title:"Build a robot",items:["🤖","🟦","🦿"],target:["🤖","🟦","🦿"]},{kind:"design",title:"Design a toy",items:["🚗","🧸","🚀"]},{kind:"build",title:"Make a silly machine",items:["⚙️","🔋","💡"],target:["⚙️","🔋","💡"]}],
 [{kind:"memory",title:"Find matching cards",items:["🐱","🎨","🎨","🚀","🐱","🚀"]},{kind:"match",title:"Match the pictures",items:["📚","🖍️","🎵","🎵","📚","🖍️"]},{kind:"paint",title:"Make art for the festival",items:["Canvas"]}]
] as const;
const palette=["#ef4444","#f59e0b","#facc15","#22c55e","#38bdf8","#a855f7","#ec4899","#334155"];
type Activity={kind:string;title:string;items:readonly string[];target?:readonly string[]};
const tile="min-h-16 rounded-2xl border-2 border-emerald-200 bg-white p-3 text-3xl shadow-sm hover:bg-emerald-100 focus-visible:outline-4 focus-visible:outline-blue-600";
function ActivityView({activity,onComplete}:{activity:Activity;onComplete:()=>void}){
 const [selected,setSelected]=useState<number|null>(null);
 const [matched,setMatched]=useState<number[]>([]);
 const [parts,setParts]=useState<string[]>([]);
 const [color,setColor]=useState(palette[0]);
 const [pixels,setPixels]=useState<Record<number,string>>({});
 const [name,setName]=useState("");
 const [symbol,setSymbol]=useState("⭐");
 const [notice,setNotice]=useState("");
 const [locked,setLocked]=useState(false);
 const a=activity;
 function match(i:number){if(locked||matched.includes(i)||selected===i)return;if(selected===null){setSelected(i);return;}if(a.items[selected]===a.items[i]){setMatched([...matched,selected,i]);setSelected(null);setNotice("Lovely match!");}else{setNotice("Try another pair!");if(a.kind==="memory"){setLocked(true);setTimeout(()=>{setSelected(null);setLocked(false)},650);}else setSelected(null);}}
 function speak(){if(typeof window!=="undefined"&&"speechSynthesis" in window){window.speechSynthesis.cancel();window.speechSynthesis.speak(new SpeechSynthesisUtterance(a.title));}}
 const ready=a.kind==="build"?parts.length===a.items.length:a.kind==="match"||a.kind==="memory"?matched.length===a.items.length:a.kind==="paint"?Object.keys(pixels).length>0:a.kind==="spot"?matched.length>0:!!name;
 return <div className="space-y-5">
 <div className="flex items-center justify-center gap-3"><h2 className="text-2xl font-bold text-slate-900">{a.title}</h2><button type="button" aria-label="Hear instructions" onClick={speak} className="rounded-full bg-emerald-100 p-3 text-xl">🔊</button></div>
 {a.kind==="build"&&<><p>Tap the pieces to build!</p><div className="flex min-h-36 flex-col items-center justify-center rounded-3xl bg-sky-100 text-5xl">{parts.length?parts.map((part,i)=><span key={i}>{part}</span>):<span className="text-slate-500 text-xl">Your creation goes here</span>}</div><div className="grid grid-cols-3 gap-3">{a.items.map(x=><button key={x} className={tile} disabled={parts.includes(x)} onClick={()=>setParts([...parts,x])}>{x}</button>)}</div><button onClick={()=>setParts([])} className="underline">Start again</button></>}
 {(a.kind==="match"||a.kind==="memory")&&<><p>Tap two matching cards.</p><div className="grid grid-cols-3 gap-3">{a.items.map((x,i)=><button key={i} aria-label={a.kind==="memory"&&!matched.includes(i)&&selected!==i?"Hidden card "+(i+1):x} disabled={matched.includes(i)||locked} onClick={()=>match(i)} className={tile+(matched.includes(i)?" bg-emerald-100 opacity-60":selected===i?" ring-4 ring-amber-400":"")}>{a.kind==="memory"&&!matched.includes(i)&&selected!==i?"❔":x}</button>)}</div></>}
 {a.kind==="spot"&&<><p>Find the one that looks different.</p><div className="grid grid-cols-3 gap-3">{a.items.map((x,i)=><button key={i} className={tile+(matched.includes(i)?" ring-4 ring-green-500":"")} onClick={()=>{if(a.target?.includes(String(i))){setMatched([i]);setNotice("You found it!")}else setNotice("Keep looking!")}}>{x}</button>)}</div></>}
 {a.kind==="paint"&&<><p>Pick a colour. Tap the squares to paint.</p><div className="flex flex-wrap justify-center gap-2">{palette.map((c,i)=><button key={c} aria-label={["Red","Orange","Yellow","Green","Blue","Purple","Pink","Dark grey"][i]} aria-pressed={color===c} onClick={()=>setColor(c)} style={{background:c}} className={"h-10 w-10 rounded-full border-2 "+(color===c?"ring-4 ring-slate-500":"border-white")}/>)}</div><div className="mx-auto grid max-w-xs grid-cols-8 gap-1 rounded-xl bg-slate-200 p-2">{Array.from({length:64},(_,i)=><button key={i} aria-label={"Paint square "+(i+1)} onClick={()=>setPixels({...pixels,[i]:color})} style={{background:pixels[i]||(a.items[0]==="Butterfly"&&[9,10,13,14,17,18,19,20,21,22,26,27,28,29,34,35,36,37,41,42,45,46].includes(i)?"#e5e7eb":"#ffffff")}} className="aspect-square rounded-sm border border-slate-300"/>)}</div><button className="underline" onClick={()=>setPixels({})}>Clear picture</button></>}
 {a.kind==="design"&&<><p>Pick your favourite colours and pictures.</p><div className="rounded-2xl p-8 text-3xl font-bold text-white" style={{background:color}}>{symbol} {name||"My creation"}</div><div className="flex flex-wrap justify-center gap-2">{a.items.map(x=><button key={x} className="rounded-xl border p-3 font-bold" onClick={()=>setName(x)}>{x}</button>)}</div><div className="flex justify-center gap-3">{["⭐","🌈","🐱","🌙"].map(x=><button key={x} className="text-3xl" onClick={()=>setSymbol(x)}>{x}</button>)}</div><div className="flex flex-wrap justify-center gap-2">{palette.map((c,i)=><button key={c} aria-label={["Red","Orange","Yellow","Green","Blue","Purple","Pink","Dark grey"][i]} onClick={()=>setColor(c)} style={{background:c}} className="h-10 w-10 rounded-full"/>)}</div></>}
 <p role="status" className="min-h-6 font-bold text-emerald-800">{notice}</p>
 <button disabled={!ready} onClick={onComplete} className="w-full rounded-2xl bg-emerald-800 p-4 text-xl font-bold text-white disabled:opacity-40">Done! →</button>
 </div>
}
export function LittleExplorerLesson({id,title}:{id:number;title:string}){
 const [step,setStep]=useState(0);const [done,setDone]=useState(false);
 function advance(){if(step<2)setStep(step+1);else{setDone(true);try{const key="ip2kids-little-activities-v2";const old=JSON.parse(localStorage.getItem(key)||"[]");localStorage.setItem(key,JSON.stringify([...new Set([...old,id])]))}catch{}}}
 return <main className="min-h-screen bg-emerald-50 px-4 py-8"><div className="mx-auto max-w-2xl"><Link href="/learn/little-explorers" className="font-bold text-emerald-800">← Little Explorers</Link><header className="my-6"><p className="font-semibold text-emerald-800">Adventure {id} of 5</p><h1 className="text-3xl font-bold">{title}</h1></header><div className="mb-5 flex justify-center gap-3" aria-label={done?"Three activities completed":"Activity "+(step+1)+" of 3"}>{[0,1,2].map(i=><span key={i} className={"text-3xl "+(done||i<step?"":"opacity-30")}>⭐</span>)}</div><section className="space-y-5 rounded-3xl bg-white p-5 text-center shadow-sm sm:p-8"><Image src={questy} alt="Questy" className="mx-auto h-24 w-auto object-contain"/>{done?<><h2 className="text-3xl font-bold">Amazing work! 🎉</h2><p>You made something wonderful!</p><Link className="block rounded-xl bg-emerald-800 p-4 font-bold text-white" href={id<5?"/learn/little-explorers/"+(id+1):"/learn/little-explorers"}>{id<5?"Next adventure →":"Back to adventures"}</Link><button className="underline" onClick={()=>{setStep(0);setDone(false)}}>Play again</button></>:<ActivityView key={id+"-"+step} activity={activities[id-1][step]} onComplete={advance}/>}</section></div></main>
}
