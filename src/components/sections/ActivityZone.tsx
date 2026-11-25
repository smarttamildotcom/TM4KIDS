"use client";
import { useState } from "react";
import type { World } from "@/lib/worlds";

const btn="min-h-12 rounded-xl border-2 border-sky-200 bg-white p-3 font-bold text-sky-900 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-600 disabled:opacity-60";
function shuffle<T,>(a:T[]):T[]{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
const modes=["Matching","Memory","Jigsaw","Colouring"] as const;
type Mode=typeof modes[number];
export function ActivityZone({world}:{world:World}){
 const [mode,setMode]=useState<Mode|null>(null);
 const [round,setRound]=useState(0);
 return <section className="mt-8 rounded-[2rem] border-2 border-sky-200 bg-sky-50 p-4 sm:p-7" aria-label="Activity Zone">
 <h2 className="text-2xl font-bold text-sky-900">Questy's Activity Zone</h2><p className="my-2 text-sky-900">Play, practise and create! Replay any game without changing your Adventure score.</p>
 <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{modes.map(m=><button key={m} className={btn+(mode===m?" ring-2 ring-orange-500":"")} aria-pressed={mode===m} onClick={()=>{setMode(m);setRound(r=>r+1);}}>{m}</button>)}</div>
 {mode&&<div className="mt-4 rounded-2xl bg-white p-3 sm:p-5"><button className={btn} onClick={()=>setRound(r=>r+1)}>Restart {mode}</button><div key={world.id+":"+mode+":"+round} className="mt-4">{mode==="Matching"?<Matching world={world}/>:mode==="Memory"?<Memory world={world}/>:mode==="Jigsaw"?<Puzzle world={world}/>:<Colour world={world}/>}</div></div>}
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
 return <><p role="status" className="mb-3">Moves: {moves} · Pairs: {done.length/2}/{labels.length}{done.length===cards.length?" — Well done!":""}</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{cards.map((c,i)=><button key={i} className={btn+" min-h-24 "+(done.includes(i)?"bg-green-100":open.includes(i)?"bg-amber-100":"")} disabled={done.includes(i)||open.includes(i)||open.length===2} aria-label={done.includes(i)||open.includes(i)?c:"Reveal card "+(i+1)} onClick={()=>{if(!open.length){setOpen([i]);return;}setMoves(m=>m+1);if(cards[open[0]]===c){setDone(d=>[...d,open[0],i]);setOpen([]);}else setOpen([open[0],i]);}}>{done.includes(i)||open.includes(i)?c:"?"}</button>)}</div>{open.length===2&&<button className={btn+" mt-3"} onClick={()=>setOpen([])}>Turn cards back</button>}</>;
}
function art(world:World){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#dbeafe"/><circle cx="245" cy="45" r="30" fill="#fbbf24"/><path d="M0 230 Q75 140 150 230 T300 230 V300 H0Z" fill="#86efac"/><rect x="65" y="100" width="170" height="135" rx="12" fill="#fff" stroke="#1e3a8a" stroke-width="5"/><text x="150" y="178" text-anchor="middle" font-size="65">'+world.icon+'</text><text x="150" y="215" text-anchor="middle" font-size="18" fill="#1e3a8a">Adventure '+world.id+'</text></svg>';}
function Puzzle({world}:{world:World}){
 const [size,setSize]=useState(3);return <><label>Pieces <select className={btn} value={size} onChange={e=>setSize(Number(e.target.value))}><option value={2}>4</option><option value={3}>9</option><option value={4}>16</option></select></label><Tiles key={size} size={size} world={world}/></>;
}
function Tiles({world,size}:{world:World;size:number}){
 const [tiles,setTiles]=useState(()=>shuffle(Array.from({length:size*size},(_,i)=>i)));
 const [selected,setSelected]=useState<number|null>(null);
 const solved=tiles.every((v,i)=>v===i);const url="data:image/svg+xml,"+encodeURIComponent(art(world));
 return <><p role="status" className="my-3">{solved?"Puzzle solved!":"Tap two tiles to swap them and rebuild the picture."}</p><div className="mx-auto grid max-w-sm gap-1" style={{gridTemplateColumns:"repeat("+size+",minmax(0,1fr))"}}>{tiles.map((v,i)=><button key={i} aria-label={"Tile "+(v+1)+" at position "+(i+1)} aria-pressed={selected===i} className={"aspect-square rounded border-2 "+(selected===i?"border-orange-500":"border-sky-200")} style={{backgroundImage:'url("'+url+'")',backgroundSize:(size*100)+"% "+(size*100)+"%",backgroundPosition:(v%size)/(size-1)*100+"% "+Math.floor(v/size)/(size-1)*100+"%"}} onClick={()=>{if(selected===null){setSelected(i);return;}setTiles(t=>{const n=[...t];[n[i],n[selected]]=[n[selected],n[i]];return n;});setSelected(null);}}/>)}</div><details className="mt-3"><summary>Show reference</summary><img alt="Puzzle reference" src={url} className="w-32"/></details></>;
}
const palette=["#fbbf24","#fb923c","#60a5fa","#4ade80","#f472b6","#a78bfa","#ffffff"];
function Colour({world}:{world:World}){
 const [color,setColor]=useState(palette[0]);const [fills,setFills]=useState<string[]>(Array(6).fill("#ffffff"));const [history,setHistory]=useState<string[][]>([]);
 function fill(i:number){setHistory(h=>[...h,fills]);setFills(f=>f.map((v,j)=>i===j?color:v));}
 const shapes=[{d:"M20 20H280V280H20Z"},{d:"M40 230L150 65L260 230Z"},{d:"M65 230H235V275H65Z"},{d:"M115 180H185V275H115Z"},{d:"M50 50H100V100H50Z"},{d:"M220 30H270V80H220Z"}];
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">'+shapes.map((s,i)=>'<path d="'+s.d+'" fill="'+fills[i]+'" stroke="#172554" stroke-width="3"/>').join("")+'<text x="150" y="155" text-anchor="middle" font-size="28">'+world.icon+'</text></svg>';
 return <><p className="mb-3">Choose a colour, then tap a numbered area to paint your Adventure clubhouse.</p><div className="flex flex-wrap gap-2">{palette.map(c=><button key={c} aria-label={"Colour "+c} aria-pressed={color===c} className={"h-12 w-12 rounded-full border-2 "+(color===c?"border-slate-900 ring-2 ring-orange-500":"border-slate-300")} style={{background:c}} onClick={()=>setColor(c)}/>)}</div><svg viewBox="0 0 300 300" className="mx-auto my-3 w-full max-w-sm">{shapes.map((s,i)=><path key={i} d={s.d} fill={fills[i]} stroke="#172554" strokeWidth="3" onClick={()=>fill(i)}/>)}<text x="150" y="155" textAnchor="middle" fontSize="28" pointerEvents="none">{world.icon}</text></svg><div className="flex flex-wrap gap-2">{shapes.map((_,i)=><button key={i} className={btn} onClick={()=>fill(i)}>Area {i+1}</button>)}<button className={btn} disabled={!history.length} onClick={()=>{setFills(history[history.length-1]);setHistory(h=>h.slice(0,-1));}}>Undo</button><a className={btn} download={"adventure-"+world.id+".svg"} href={"data:image/svg+xml,"+encodeURIComponent(svg)}>Download artwork</a></div></>;
}
