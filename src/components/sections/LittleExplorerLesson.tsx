"use client";
import { useState } from "react";
import Link from "next/link";
import type { littleExplorers } from "@/lib/little-explorers";
type Lesson = (typeof littleExplorers)[number];
export function LittleExplorerLesson({lesson,title}:{lesson:Lesson;title:string}){
 const [step,setStep]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const [choice,setChoice]=useState<number|null>(null);
 const [done,setDone]=useState(false);
 const button="rounded-2xl border-2 border-emerald-200 bg-white px-5 py-4 text-lg font-bold text-slate-800 hover:bg-emerald-50";
 const next="rounded-2xl bg-emerald-800 px-6 py-4 text-lg font-bold text-white disabled:opacity-40";
 const options=[1,0,2].map(i=>({i,label:lesson.options[i]}));
 const choices=[2,0,1].map(i=>({i,label:lesson.choices[i]}));
 function finish(){setDone(true);try{const key="ip2kids-little-explorers-completed";const old=JSON.parse(localStorage.getItem(key)||"[]");localStorage.setItem(key,JSON.stringify([...new Set([...old,lesson.id])]))}catch{}}
 return <main className="min-h-screen bg-emerald-50 px-4 py-8">
 <div className="mx-auto max-w-2xl">
 <Link href="/learn/little-explorers" className="font-bold text-emerald-800">← Little Explorers</Link>
 <header className="my-6"><p className="font-semibold text-emerald-800">Adventure {lesson.id} of 15</p><h1 className="text-3xl font-bold text-slate-900">{title}</h1></header>
 <div className="mb-5 h-3 overflow-hidden rounded-full bg-emerald-200" role="progressbar" aria-label="Adventure progress" aria-valuenow={done?100:Math.round(step/5*100)} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-emerald-700" style={{width:(done?100:step/5*100)+"%"}}/></div>
 <section className="space-y-5 rounded-3xl bg-white p-6 text-center shadow-sm">
 <div className="text-7xl" aria-hidden="true">{done?"🏆":lesson.icon}</div>
 {done?<><h2 className="text-3xl font-bold">Well done, Explorer!</h2><p className="text-lg">You earned a star for completing this adventure.</p><p className="text-sm text-slate-600">Progress is saved on this browser when storage is available.</p><Link className={next+" block"} href="/learn/little-explorers">Back to adventures</Link>{lesson.id<15&&<Link className={button+" block"} href={"/learn/little-explorers/"+(lesson.id+1)}>Next adventure →</Link>}</>:step<3?<><p className="font-semibold text-emerald-800">Story · {step+1} of 3</p><p className="text-2xl leading-relaxed text-slate-900">{lesson.scenes[step]}</p><button className={next} onClick={()=>setStep(step+1)}>Next →</button></>:step===3?<><h2 className="text-2xl font-bold">{lesson.question}</h2><div className="grid gap-3">{options.map(o=><button key={o.i} className={button} onClick={()=>setAnswer(o.i)} aria-pressed={answer===o.i}>{o.label}</button>)}</div>{answer!==null&&<p role="status" className="text-lg font-semibold">{answer===0?"Great work!":"Try again, Explorer!"}</p>}<button className={next} disabled={answer!==0} onClick={()=>setStep(4)}>Discover more →</button></>:step===4?<><h2 className="text-2xl font-bold">Questy's discovery</h2><p className="text-xl leading-relaxed">{lesson.discovery}</p><button className={next} onClick={()=>setStep(5)}>Try an activity →</button></>:<><h2 className="text-2xl font-bold">{lesson.activity}</h2><div className="grid gap-3">{choices.map(o=><button key={o.i} className={button+(choice===o.i?" ring-4 ring-emerald-600":"")} aria-pressed={choice===o.i} onClick={()=>setChoice(o.i)}>{o.label}</button>)}</div>{choice!==null&&<p role="status" className="font-semibold">{lesson.creative?"Lovely choice! Use your imagination.":choice===0?"Well done!":"Try another choice."}</p>}<button className={next} disabled={choice===null||(!lesson.creative&&choice!==0)} onClick={finish}>Finish adventure</button></>}
 {!done&&step>0&&<button className="block w-full text-sm font-bold text-emerald-800" onClick={()=>setStep(step-1)}>← Back</button>}
 </section></div></main>
}
