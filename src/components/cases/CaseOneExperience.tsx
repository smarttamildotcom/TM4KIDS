"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseShell } from "@/components/cases/CaseEngine";
import { CreatorParkColouring } from "@/components/cases/CreatorParkColouring";
import { caseOne, type CaseQuestionData } from "@/lib/cases/case-one";
import { readDetectiveProfile } from "@/lib/detective-profile";
import { useAuth } from "@/lib/auth/AuthProvider";

type Step = "story" | "find" | "discovery" | "challenge" | "problem" | "solved" | "file" | "reward";
const buttonClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300";

export function CaseOneExperience({ isCompleted, onComplete }: { isCompleted: boolean; onComplete: (correct: number, total: number) => void }) {
  const [step, setStep] = useState<Step>("story");
  const [scene, setScene] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [knowledgeIndex, setKnowledgeIndex] = useState(0);
  const completedThisVisit = useRef(false);
  const active = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { user } = useAuth();
  const nickname = user ? readDetectiveProfile(user.id, user.studentName)?.nickname ?? "" : "";
  const name = nickname ? `Detective ${nickname}` : "Detective";
  const go = (next: Step) => setStep(next);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const target = active.current;
      if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 96, behavior: reduced ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [step, scene, storyIndex, knowledgeIndex, reduced]);
  const finish = () => {
    if (!isCompleted && !completedThisVisit.current) { completedThisVisit.current = true; onComplete(10, 10); }
    go("solved");
  };
  const shellStep = step === "story" ? "story" : step === "find" ? "investigate" : step === "discovery" ? "discovery" : step === "challenge" ? "clues" : step === "problem" ? "problem" : step === "solved" ? "solved" : step;
  return <div ref={active} className="scroll-mt-24"><CaseShell step={shellStep}>
    {step === "story" && <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-detective-orange-600">World 1 / Case 1 · Creator Park · Scene {scene + 1} of 4</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">{caseOne.title}</h2>
      <h3 className="mt-2 font-display text-2xl font-bold text-detective-blue-800">{caseOne.scenes[scene].title}</h3>
      <Image src={caseOne.scenes[scene].image} alt={caseOne.scenes[scene].alt} width={1672} height={941} priority={scene === 0} className="mt-4 h-auto w-full rounded-2xl" />
      <div className="mt-5 space-y-2">{caseOne.scenes[scene].dialogue.map(([speaker, line], index) => <p key={index} className="rounded-2xl bg-sky-50 px-4 py-3 text-lg text-detective-blue-900"><strong>{speaker === "Detective" ? name : speaker}:</strong> {line.replace("[nickname]", nickname || "Detective")}</p>)}</div>
      {scene === 3 && <div className="mt-5 rounded-2xl bg-detective-yellow-50 p-4 text-center"><p className="font-display font-bold">CASE 1 · THE MYSTERY: {caseOne.mystery}</p><p>MISSION: Find the clues and match every creator to their creation.</p></div>}
      <nav aria-label="Picture story scenes" className="mt-5 flex flex-wrap items-center justify-between gap-3"><button type="button" disabled={scene === 0} onClick={() => setScene(scene - 1)} className="min-h-12 rounded-full border-2 border-detective-blue-200 px-5 font-display font-bold text-detective-blue-800 disabled:invisible"><ArrowLeft className="mr-2 inline h-4 w-4" />BACK</button><button type="button" onClick={() => scene === 3 ? go("find") : setScene(scene + 1)} className={buttonClass}>{scene === 3 ? "START INVESTIGATION" : "NEXT"}<ArrowRight className="h-4 w-4" /></button></nav>
    </section>}
    {step === "find" && <SequentialQuestion key={`story-${storyIndex}`} title="🔎 FIND THE CLUES" question={caseOne.storyQuestions[storyIndex]} index={storyIndex} total={5} onNext={() => storyIndex < 4 ? setStoryIndex(storyIndex + 1) : go("discovery")} nextLabel={storyIndex === 4 ? "DISCOVER IP" : "NEXT CLUE"} afterCorrect={storyIndex === 4 ? "Questy: Excellent detective work! But what do drawings, stories, inventions and brands have to do with IP?" : undefined} />}
    {step === "discovery" && <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7"><h2 className="font-display text-3xl font-bold text-detective-blue-900">🔎 QUESTY’S DISCOVERY</h2><div className="mt-5 grid gap-4"><FactCard title="WHAT IS IP?"><p>IP is short for:</p><p className="mt-2 font-display text-2xl font-bold">INTELLECTUAL PROPERTY</p><p className="mt-3">Questy: “That sounds like a big phrase. But don’t worry!”</p></FactCard><FactCard title="PEOPLE CREATE IN DIFFERENT WAYS"><p>People use their 🧠 Knowledge, 💭 Imagination, ✨ Creativity and 🛠️ Skills to create new things.</p><ul className="mt-3 space-y-1"><li>🎨 Mia created a drawing.</li><li>🤖 Ben built an invention.</li><li>📖 Zara wrote a story.</li><li>☀️ Leo created a brand idea.</li></ul></FactCard><FactCard title="DETECTIVE FACT"><p>Different creations can involve different kinds of intellectual property. You will discover them as you explore Idea City.</p><p className="mt-3 font-semibold">🏪 Brand Street · 🔬 Inventor Lab · 🎨 Creator Studio · 🏛️ Detective HQ</p><p className="mt-3">Questy: “There are trademarks, copyright, patents, designs and more mysteries waiting for us. You don’t need to remember them yet. One mystery at a time, Detective!”</p></FactCard></div><button type="button" onClick={() => go("challenge")} className={`${buttonClass} mt-6`}>TAKE THE DETECTIVE CHALLENGE <ArrowRight className="h-4 w-4" /></button></section>}
    {step === "challenge" && <SequentialQuestion key={`knowledge-${knowledgeIndex}`} title="🏅 DETECTIVE CHALLENGE" question={caseOne.knowledgeQuestions[knowledgeIndex]} index={knowledgeIndex} total={5} onNext={() => knowledgeIndex < 4 ? setKnowledgeIndex(knowledgeIndex + 1) : go("problem")} nextLabel={knowledgeIndex === 4 ? "SOLVE THE CASE" : "NEXT QUESTION"} afterCorrect={knowledgeIndex === 4 ? "🏅 DETECTIVE CHALLENGE COMPLETE! Questy: You’ve discovered your first IP secret. Kids can be creators too!" : undefined} />}
    {step === "problem" && <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7"><h2 className="font-display text-3xl font-bold text-detective-blue-900">🚨 FINAL PROBLEM · THE COPYCAT PROBLEM</h2><Image src="/cases/world-1/copycat-problem.png" alt="Copycat replaces Mia's Creator Card beneath her dragon drawing" width={1672} height={941} className="mt-4 h-auto w-full rounded-2xl" /><div className="mt-4 space-y-2 text-lg text-detective-blue-900"><p>Mia puts her dragon drawing on the Idea Day display. Later, Copycat finds the drawing.</p><p>Copycat removes Mia’s Creator Card and puts his own card underneath it: “Created by Copycat.”</p><p><strong>Mia:</strong> “But I drew that!”</p><p><strong>Questy:</strong> “{name}, we need your help!”</p></div><SequentialQuestion key="final" title="SOLVE THE CASE" question={caseOne.final} onNext={finish} nextLabel="SEE CASE SOLVED" afterCorrect="CREATORS MATTER. THEIR CREATIONS MATTER TOO." /></section>}
    {step === "solved" && <section className="rounded-3xl bg-gradient-to-br from-detective-yellow-100 to-sky-100 p-6 text-center shadow-sm"><h2 className="font-display text-4xl font-bold text-detective-blue-900">🎉 CASE #1 SOLVED!</h2><p className="mt-3 text-2xl">{caseOne.title}</p><p className="mt-4">Awarded to: <strong>{name}</strong></p><p className="mt-3">For discovering: “People can create in many different ways.”</p><p className="mt-5 rounded-2xl bg-white p-5 font-display text-2xl font-bold text-detective-blue-900">🏅 CREATOR DETECTIVE BADGE</p><p className="mt-3 text-detective-blue-800">World 1 rewards are recorded in your existing detective progress.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" className={buttonClass} onClick={() => go("file")}>VIEW CASE FILE</button><button type="button" className={buttonClass} onClick={() => go("reward")}>COLOUR CREATOR PARK 🎨</button></div></section>}
    {step === "file" && <section className="rounded-3xl bg-white p-6 shadow-sm"><p className="font-display font-bold uppercase tracking-widest text-detective-orange-600">LITTLE IP DETECTIVES · CASE FILE #1</p><h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">{caseOne.title}</h2><dl className="mt-5 grid gap-3 sm:grid-cols-2">{[["Case", caseOne.title], ["Mystery", "Who Created What?"], ["New Detective Word", "IP — Intellectual Property"], ["Discovery", "People use their imagination, knowledge and skills to create different things."], ["Detective Rule", "Creators matter. Their creations matter too."], ["Status", "✅ CASE SOLVED"]].map(([label, value]) => <div key={label} className="rounded-2xl bg-sky-50 p-4"><dt className="font-display font-bold">{label}</dt><dd>{value}</dd></div>)}</dl><div className="mt-6 flex flex-wrap gap-3"><button type="button" className={buttonClass} onClick={() => go("reward")}>COLOUR CREATOR PARK 🎨</button></div></section>}
    {step === "reward" && <CreatorParkColouring onFile={() => go("file")} />}
  </CaseShell></div>;
}
function FactCard({ title, children }: { title: string; children: React.ReactNode }) { return <article className="rounded-3xl border-2 border-detective-yellow-200 bg-detective-yellow-50 p-5 text-lg leading-relaxed text-detective-blue-900"><h3 className="mb-2 font-display text-xl font-bold">{title}</h3>{children}</article>; }
function SequentialQuestion({ title, question, index, total, onNext, nextLabel, afterCorrect }: { title: string; question: CaseQuestionData; index?: number; total?: number; onNext: () => void; nextLabel: string; afterCorrect?: string }) {
  const [correct, setCorrect] = useState(false);
  const [feedback, setFeedback] = useState("");
  return <section className="rounded-3xl bg-white p-5 text-center shadow-sm sm:p-7"><p className="font-display font-bold uppercase tracking-widest text-detective-orange-600">{title}{total && ` · ${index! + 1} of ${total}`}</p><h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-detective-blue-900">{question.prompt}</h2><div className="mx-auto mt-6 grid max-w-2xl gap-3">{question.choices.map((choice, i) => <button key={i} type="button" disabled={correct} onClick={() => { const match = i === question.correct; setCorrect(match); setFeedback(match ? question.feedback : "Good try, Detective. Look at the clues again!"); }} className={`min-h-14 rounded-2xl border-2 px-5 py-3 text-left text-lg font-semibold text-detective-blue-900 focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 disabled:opacity-75 ${correct && i === question.correct ? "border-green-500 bg-green-50" : "border-detective-blue-100 bg-sky-50 hover:border-detective-orange-400"}`}><span className="mr-3">{String.fromCharCode(65 + i)}.</span>{choice}</button>)}</div>{feedback && <p role="status" className="mx-auto mt-5 max-w-2xl rounded-2xl bg-detective-yellow-100 p-4 font-display font-bold">{feedback}</p>}{correct && <>{afterCorrect && <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-detective-blue-900">{afterCorrect}</p>}<button type="button" className={`${buttonClass} mt-5`} onClick={onNext}>{nextLabel} <ArrowRight className="h-4 w-4" /></button></>}</section>;
}
