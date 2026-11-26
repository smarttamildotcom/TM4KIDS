"use client";
import { useEffect, useState } from "react";
import { ArtworkGame } from "./ArtworkGame";
import type { World } from "@/lib/worlds";

const btn="min-h-12 rounded-xl border-2 border-sky-200 bg-white p-3 font-bold text-sky-900 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600 disabled:opacity-60";
function shuffle<T,>(a:T[]):T[]{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
const modes=["Matching","Memory","Jigsaw","Colouring"] as const;
type Mode=typeof modes[number];
export function ActivityZone({world}:{world:World}){
 const [mode,setMode]=useState<Mode|null>(null);
 const [round,setRound]=useState(0);
 return <section className="mt-8 rounded-[2rem] border-2 border-sky-200 bg-sky-50 p-4 sm:p-7" aria-label="Activity Zone">
 <h2 className="text-2xl font-bold text-sky-900">Free Activities</h2><p className="my-2 text-sky-900">Play, practise and create! Replay any game without changing your Adventure score.</p>
 <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{modes.map(m=><button key={m} className={btn+(mode===m?" ring-2 ring-orange-500":"")} aria-pressed={mode===m} onClick={()=>{setMode(m);setRound(r=>r+1);}}>{m}</button>)}</div>
 {mode&&<div className="mt-4 rounded-2xl bg-white p-3 sm:p-5"><button className={btn} onClick={()=>setRound(r=>r+1)}>Restart {mode}</button><div key={world.id+":"+mode+":"+round} className="mt-4">{mode==="Matching"?<Matching world={world}/>:mode==="Memory"?<Memory world={world}/>:<ArtworkGame id={world.id} mode={mode}/>}</div></div>}
 </section>;
}
function Matching({world}:{world:World}){
 const pairs=world.mcqs.slice(0,3).map(q=>({q:q.question,a:q.options[q.answerIndex]}));
 const [order]=useState(()=>shuffle(pairs.map((_,i)=>i)));
 const [selected,setSelected]=useState<number|null>(null);
 const [done,setDone]=useState<number[]>([]);
 const [feedback,setFeedback]=useState("Choose a clue, then its matching answer.");
 return <><p role="status" className="mb-3 font-bold">{done.length===pairs.length?"Great detective work! All matched.":feedback}</p><div className="grid grid-cols-2 gap-3"><div className="grid gap-2">{pairs.map((p,i)=><button key={i} className={btn+(selected===i?" ring-2 ring-orange-500":"")} disabled={done.includes(i)} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{p.q}{done.includes(i)?" ✓":""}</button>)}</div><div className="grid gap-2">{order.map(i=><button key={i} className={btn} disabled={done.includes(i)||selected===null} onClick={()=>{if(selected===i){setDone(d=>[...d,i]);setSelected(null);setFeedback("Correct match!");}else setFeedback("Try another match.");}}>{pairs[i].a}</button>)}</div></div></>;
}
function Memory({world}:{world:World}){
 const labels=[world.icon,...world.miniLesson.examples].filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
 const [cards]=useState(()=>shuffle([...labels,...labels]));
 const [open,setOpen]=useState<number[]>([]);const [done,setDone]=useState<number[]>([]);const [moves,setMoves]=useState(0);
 useEffect(()=>{if(open.length!==2)return;const timer=window.setTimeout(()=>setOpen([]),1200);return ()=>window.clearTimeout(timer);},[open]);
 return <><p role="status" className="mb-3">Moves: {moves} · Pairs: {done.length/2}/{labels.length}{done.length===cards.length?" — Well done!":""}</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{cards.map((c,i)=><button key={i} className={btn+" min-h-24 "+(done.includes(i)?"bg-green-100":open.includes(i)?"bg-amber-100":"")} disabled={done.includes(i)||open.includes(i)||open.length===2} onPointerLeave={()=>{if(open.length===2)setOpen([]);}} aria-label={done.includes(i)||open.includes(i)?c:"Reveal card "+(i+1)} onClick={()=>{if(!open.length){setOpen([i]);return;}setMoves(m=>m+1);if(cards[open[0]]===c){setDone(d=>[...d,open[0],i]);setOpen([]);}else setOpen([open[0],i]);}}>{done.includes(i)||open.includes(i)?c:"?"}</button>)}</div></>;
}
