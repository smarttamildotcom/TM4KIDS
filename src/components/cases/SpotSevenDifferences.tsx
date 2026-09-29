"use client";

import Image from "next/image";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Difference={id:number;label:string;x:number;y:number};

// Coordinates are percentages across the full side-by-side artwork.
// Each target is duplicated on the corresponding left/right location so a child
// can tap the difference on either picture.
const differences:Difference[]=[
  {id:1,label:"IDEA DAY banner star",x:92.0,y:13.5},
  {id:2,label:"Hot-air balloon",x:96.5,y:7.5},
  {id:3,label:"Star Dragon colour",x:68.0,y:61.0},
  {id:4,label:"Robot eyes",x:69.7,y:49.0},
  {id:5,label:"White cat bow",x:82.0,y:58.0},
  {id:6,label:"Happy Snacks",x:91.0,y:66.0},
  {id:7,label:"Questy bow tie and open eye",x:83.0,y:82.0},
];

export function SpotSevenDifferences(){
  const [found,setFound]=useState<number[]>([]);
  const [message,setMessage]=useState("Tap a difference on either picture.");
  const solved=found.length===7;
  const find=(d:Difference)=>{
    if(found.includes(d.id))return;
    setFound(v=>[...v,d.id]);
    setMessage(found.length===6?"Amazing! You found all 7 differences!":`Great spotting! ${found.length+1} of 7 found.`);
  };
  const reset=()=>{setFound([]);setMessage("Tap a difference on either picture.")};
  return <div className="mx-auto mt-6 max-w-5xl">
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-sky-50 p-4 sm:flex-row">
      <div className="text-left"><p className="font-display text-xl font-bold text-detective-blue-900">🔎 Questy’s Copycat Challenge</p><p className="mt-1">Look carefully at both Creator Park pictures. Can you spot all seven changes?</p></div>
      <div className="shrink-0 rounded-full bg-white px-5 py-3 font-display text-xl font-bold text-detective-orange-600">{found.length} / 7 FOUND</div>
    </div>
    <div className="relative mt-4 overflow-hidden rounded-3xl border-4 border-detective-blue-100 bg-white shadow-lg">
      <Image src="/cases/world-3/spot-7-differences.png" alt="Creator Park Spot 7 Differences challenge" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 960px" className="h-auto w-full select-none" draggable={false}/>
      {differences.flatMap(d=>{
        const rightX=d.x;
        const leftX=d.x>50?d.x-50:d.x;
        return [leftX,rightX].map((x,i)=><button key={`${d.id}-${i}`} aria-label={`Difference ${d.id}: ${d.label}`} onClick={()=>find(d)} style={{left:`${x}%`,top:`${d.y}%`}} className={`absolute h-[8%] w-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full transition ${found.includes(d.id)?"border-4 border-green-500 bg-green-300/25":"bg-transparent"}`}/>)})}
    </div>
    <p className={`mx-auto mt-4 max-w-2xl rounded-2xl p-4 text-center font-display font-bold ${solved?"bg-green-100 text-green-800":"bg-detective-yellow-100 text-detective-blue-900"}`}>{solved?"🎉 CASE CRACKED! You spotted all 7 differences — Eagle-Eye Creator Detective!":message}</p>
    <div className="mt-4 flex justify-center"><button onClick={reset} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-6 font-display font-bold"><RotateCcw className="h-4 w-4"/>PLAY AGAIN</button></div>
  </div>;
}
