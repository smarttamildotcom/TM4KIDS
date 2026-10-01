"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Sparkles, Target } from "lucide-react";
import { QuizQuestionCard } from "@/components/quiz";
import { ReadToMeButton } from "@/components/audio/ReadToMeButton";
import { toQuizQuestions, worldTheme, type World } from "@/lib/worlds";
import { playCelebrationSound } from "@/lib/audio";
import { WorldCompletionExperience } from "@/components/sections/WorldCompletionExperience";
import { CreatorParkColouring } from "@/components/cases/CreatorParkColouring";
import { CreatorParkPuzzle } from "@/components/cases/CreatorParkPuzzle";
import { SpotDifferences } from "@/components/cases/SpotDifferences";
import { BrandStreetMakeover } from "@/components/cases/BrandStreetMakeover";

function LessonHeading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="text-center"><p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">{eyebrow}</p><h3 className="mt-2 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">{title}</h3></div>; }

function RewardActivity({world}:{world:World}) {
  if(world.id===1) return <CreatorParkColouring onFile={()=>{}}/>;
  if(world.id===2) return <CreatorParkPuzzle onFile={()=>{}}/>;
  if(world.id===3) return <SpotDifferences/>;
  if(world.id===4) return <BrandStreetMakeover/>;
  return <div className="mx-auto max-w-3xl rounded-[2rem] border-2 border-detective-yellow-200 bg-detective-yellow-50 p-7 text-center"><span className="text-5xl">🎨</span><h4 className="mt-3 font-display text-2xl font-bold text-detective-blue-900">Creative Reward</h4><p className="mt-3 text-lg text-detective-blue-700">{world.activity.instructions}</p><p className="mt-4 text-sm font-semibold text-detective-orange-600">More visual reward activities are coming soon.</p></div>;
}

export function WorldDetailPanel({ world, isCompleted, onComplete, onNextWorld }: { world: World; isCompleted: boolean; onComplete: (correct: number, total: number) => void; onNextWorld: (worldId: number) => void; }) {
  const theme=worldTheme[world.color]; const allQuestions=toQuizQuestions(world); const questions=useMemo(()=>allQuestions.slice(0,3),[world.id]); const nextWorldId=world.id<15?world.id+1:null; const [answers,setAnswers]=useState<Record<string,boolean>>({}); const celebrated=useRef(false);
  useEffect(()=>{ if(isCompleted&&!celebrated.current){celebrated.current=true;}},[isCompleted]);
  const answeredCount=Object.keys(answers).length; const correctCount=Object.values(answers).filter(Boolean).length; const allAnswered=answeredCount===questions.length;
  const complete=()=>{playCelebrationSound();onComplete(correctCount,questions.length)};
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.3}} className="overflow-hidden"><div className="space-y-12">
    <section><LessonHeading eyebrow="📖 Questy’s mini story" title={`Adventure ${world.id}: ${world.name}`}/><div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8"><ReadToMeButton text={`${world.name}. ${world.story}`} className="mb-5"/><p className="text-lg leading-relaxed text-detective-blue-900/85">{world.story}</p><p className="mt-6 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold">🐱 Questy says: {world.briefing}</p></div></section>
    <section><LessonHeading eyebrow="💡 Questy’s discovery" title={world.miniLesson.heading}/><div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8"><ReadToMeButton text={`${world.miniLesson.heading}. ${world.miniLesson.body}. ${world.miniLesson.examples.join(". ")}`} label="Listen" className="mb-5"/><p className="text-lg leading-relaxed">{world.miniLesson.body}</p><ul className="mt-6 grid gap-4 sm:grid-cols-3">{world.miniLesson.examples.map(e=><li key={e} className="rounded-3xl border-2 border-detective-blue-100 bg-detective-blue-50/60 p-5 text-center"><Sparkles className="mx-auto h-6 w-6 text-detective-orange-400"/><p className="mt-3 text-sm font-semibold">{e}</p></li>)}</ul><div className="mt-6"><p className="font-display font-bold text-detective-blue-900">What will you notice?</p><ul className="mt-3 space-y-2">{world.objectives.slice(0,3).map(o=><li key={o} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-100"><Check className="h-4 w-4 text-green-700"/></span>{o}</li>)}</ul></div></div></section>
    <section><LessonHeading eyebrow="🔎 Have a go" title="3 fun questions"/><p className="mx-auto mt-3 max-w-xl text-center text-detective-blue-700">No exam here — just three quick questions to see what you noticed.</p><div className="mx-auto mt-8 max-w-3xl space-y-6">{questions.map((q,i)=><QuizQuestionCard key={q.id} question={q} counter={`Question ${i+1} of ${questions.length}`} allowRetry onAnswer={r=>setAnswers(c=>q.id in c?c:{...c,[q.id]:r.isCorrect})}/>)}</div></section>
    <section><LessonHeading eyebrow="🚨 One last challenge" title={world.challenge.title}/><div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-orange-300 bg-detective-orange-50 p-6 shadow-lg sm:p-8"><h4 className="flex items-center gap-2 font-display text-xl font-bold"><Target className="h-5 w-5 text-detective-orange-500"/>Think like a creator</h4><p className="mt-4 text-lg">{world.challenge.prompt}</p></div></section>
    <section><LessonHeading eyebrow="🎉 Adventure complete" title="Celebrate your discovery!"/><div className={`mx-auto mt-8 max-w-3xl rounded-3xl border-2 bg-white p-6 text-center shadow-lg sm:p-8 ${theme.border}`}><span className="block text-6xl">{world.reward.badge}</span><h4 className="mt-4 font-display text-2xl font-bold">{world.reward.label}</h4><p className="mx-auto mt-3 max-w-xl text-detective-blue-700">You&apos;ve discovered one more idea superpower. Your reward activity is waiting below.</p><div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">{isCompleted?<span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-8 py-4 font-display text-lg font-semibold text-green-800"><CheckCircle2 className="h-5 w-5"/>Adventure {world.id} complete</span>:<button onClick={complete} disabled={!allAnswered} className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white disabled:opacity-50"><CheckCircle2 className="h-5 w-5"/>{allAnswered?"Celebrate!":`Try all 3 questions (${answeredCount}/3)`}</button>}{nextWorldId&&isCompleted&&<button onClick={()=>onNextWorld(nextWorldId)} className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-8 py-4 font-display text-lg font-semibold">Next Adventure<ArrowRight className="h-5 w-5"/></button>}</div></div></section>
    {isCompleted&&<><section><LessonHeading eyebrow="🎮 Your reward" title="Play, make or create"/><div className="mt-8"><RewardActivity world={world}/></div></section><WorldCompletionExperience world={world} onNextWorld={onNextWorld}/><section className="mx-auto max-w-3xl rounded-[2rem] bg-detective-blue-900 p-7 text-center text-white"><p className="text-4xl">📚</p><h3 className="mt-3 font-display text-2xl font-bold">Want to discover more?</h3><p className="mx-auto mt-3 max-w-xl text-white/80">Questy&apos;s adventures are only the beginning. Continue exploring ideas, inventions, brands and creativity through IP2Kids books.</p><Link href="/books" className="mt-6 inline-flex rounded-full bg-detective-orange-500 px-7 py-3 font-display font-bold">Visit Book Corner →</Link></section></>}
  </div></motion.div>;
}
