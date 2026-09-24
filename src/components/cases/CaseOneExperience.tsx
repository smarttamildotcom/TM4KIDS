"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Palette, Puzzle, Sparkles } from "lucide-react";
import { CaseColourReward, CaseFile, CaseHeader, CaseIntro, CaseInvestigation, CaseJigsawReward, CaseQuestion, CaseShell, type CaseStep } from "@/components/cases/CaseEngine";
import { CasePictureStory, type PictureStoryScene } from "@/components/cases/CasePictureStory";
import { DetectiveAvatar } from "@/components/detective/DetectiveAvatar";
import { readDetectiveProfile, type DetectiveProfile } from "@/lib/detective-profile";
import { caseOne } from "@/lib/cases/case-one";
import { useAuth } from "@/lib/auth/AuthProvider";

type Reward = "colour" | "puzzle" | null;

export function CaseOneExperience({ isCompleted, onComplete }: { isCompleted: boolean; onComplete: (correct: number, total: number) => void }) {
  const [step, setStep] = useState<CaseStep>("intro");
  const [detective, setDetective] = useState<DetectiveProfile | null>(null);
  const [question, setQuestion] = useState(0);
  const [reward, setReward] = useState<Reward>(null);
  const reduced = useReducedMotion();
  const { user, isLoaded: authLoaded } = useAuth();
  const nickname = detective?.nickname ?? "";

  useEffect(() => {
    if (!authLoaded || !user) { setDetective(null); return; }
    setDetective(readDetectiveProfile(user.id, user.studentName));
  }, [authLoaded, user?.id, user?.studentName]);

  const finishCase = () => {
    if (!isCompleted) onComplete(3, 3);
    setStep("solved");
  };

  const returnToCity = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  if (step === "intro") return <CaseShell step={step}><CaseIntro nickname={nickname} detective={detective} onStart={() => setStep("story")} /></CaseShell>;
  if (step === "story") return <CaseShell step={step}><CasePictureStory scenes={caseOne.pictureStory as readonly PictureStoryScene[]} nickname={nickname} detective={detective} creators={caseOne.creators} onComplete={() => setStep("investigate")} /></CaseShell>;
  if (step === "investigate") return <CaseShell step={step}><CaseInvestigation creators={caseOne.creators} onComplete={() => setStep("discovery")} /></CaseShell>;
  if (step === "discovery") return <CaseShell step={step}><div className="rounded-3xl bg-white p-6 text-center shadow-sm"><CaseHeader nickname={nickname} detective={detective} /><p className="mt-6 font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Little IP Detectives · Discovery</p><h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">People create things every day.</h2><div className="mt-5 grid gap-3 sm:grid-cols-3"><p className="rounded-2xl bg-sky-50 p-4 font-display font-bold text-detective-blue-900">🎨 Drawings</p><p className="rounded-2xl bg-detective-yellow-50 p-4 font-display font-bold text-detective-blue-900">📖 Stories</p><p className="rounded-2xl bg-sky-50 p-4 font-display font-bold text-detective-blue-900">💡 Inventions</p></div><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-detective-blue-800">People use their ideas, imagination, knowledge and skills to create many different things. Different kinds of creations can involve different types of intellectual property.</p><div className="mx-auto mt-6 max-w-xl rounded-3xl border-2 border-detective-orange-300 bg-detective-yellow-50 p-5"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-600">New detective word</p><h3 className="mt-1 font-display text-3xl font-bold text-detective-blue-900">IP</h3><p className="font-display text-xl font-bold text-detective-blue-800">Intellectual Property</p><p className="mt-3 text-detective-blue-800">IP is short for Intellectual Property. Don&apos;t worry — we&apos;ll discover them one mystery at a time!</p></div><p className="mt-5 text-detective-blue-700">Creators matter, and recognising who created something is an important detective clue.</p><button type="button" onClick={() => setStep("clues")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-7 py-3 font-display font-bold text-white">CHECK THE CLUES 🔎 <ArrowRight className="h-4 w-4" /></button></div></CaseShell>;
  if (step === "clues") return <CaseShell step={step}><CaseQuestion key={question} question={caseOne.questions[question]} index={question} total={caseOne.questions.length} onComplete={() => question < caseOne.questions.length - 1 ? setQuestion((value) => value + 1) : setStep("problem")} /></CaseShell>;
  if (step === "problem") return <CaseShell step={step}><div className="rounded-3xl bg-white p-6 text-center shadow-sm"><CaseHeader nickname={nickname} detective={detective} /><p className="mt-6 font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Solve the case</p><h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">Copycat needs a reminder!</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-detective-blue-800">Copycat finds Mia&apos;s dragon drawing and says, “I&apos;ll put MY name on it and tell everyone I made it!”</p><p className="mt-4 font-display text-xl text-detective-blue-900">{nickname ? `Detective ${nickname}, what should we do?` : "What should we do?"}</p><FinalProblem onSolved={finishCase} /></div></CaseShell>;
  if (step === "solved") return <CaseShell step={step}><CaseSolved nickname={nickname} detective={detective} onReward={() => setStep("reward")} onFile={() => setStep("file")} /></CaseShell>;
  if (step === "reward") return <CaseShell step={step}><RewardRoom reward={reward} setReward={setReward} onFile={() => setStep("file")} onReturn={returnToCity} /></CaseShell>;
  return <CaseShell step={step}><CaseFile solved={isCompleted || step === "file"} onReturn={returnToCity} /></CaseShell>;
}

function FinalProblem({ onSolved }: { onSolved: () => void }) {
  const [feedback, setFeedback] = useState("");
  const [solved, setSolved] = useState(false);
  const answer = (index: number) => { if (index === caseOne.final.correct) { setSolved(true); setFeedback("Exactly! Mia created the drawing, so we should recognise Mia as the creator."); } else setFeedback("Think like a detective. Who actually created the dragon drawing?"); };
  return <><div className="mx-auto mt-6 grid max-w-2xl gap-3">{caseOne.final.choices.map((choice, index) => <button key={choice} type="button" disabled={solved} onClick={() => answer(index)} className={"min-h-14 rounded-2xl border-2 px-5 py-3 text-left font-semibold text-detective-blue-900 " + (solved && index === caseOne.final.correct ? "border-green-500 bg-green-50" : "border-detective-blue-100 bg-sky-50 hover:border-detective-orange-400")}><span className="mr-3 font-display">{String.fromCharCode(65 + index)}.</span>{choice}</button>)}</div>{feedback && <p role="status" className="mx-auto mt-5 max-w-2xl rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900">{solved ? "🔎 " : "💡 "}{feedback}</p>}{solved && <button type="button" onClick={onSolved} className="mt-5 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-7 py-3 font-display font-bold text-white">SOLVE THE CASE <ArrowRight className="h-4 w-4" /></button>}</>;
}

function CaseSolved({ nickname, detective, onReward, onFile }: { nickname: string; detective: DetectiveProfile | null; onReward: () => void; onFile: () => void }) {
  const reduced = useReducedMotion();
  return <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-detective-yellow-100 via-white to-sky-100 p-6 text-center shadow-sm"><div aria-hidden className="text-3xl">{reduced ? "✨" : "✨ 🎉 ⭐ 🎉 ✨"}</div><div className="mx-auto mt-2 max-w-2xl"><CaseHeader nickname={nickname} detective={detective} /></div><h2 className="mt-3 font-display text-4xl font-bold text-detective-blue-900">🎉 CASE SOLVED!</h2><p className="mt-2 font-display text-xl font-bold text-detective-orange-600">YOU SOLVED QUESTY&apos;S FIRST MYSTERY!</p><p className="mx-auto mt-4 max-w-xl text-lg text-detective-blue-800">Fantastic detective work{nickname ? `, Detective ${nickname}` : ""}! You found the creators, followed the clues, and solved the mystery.</p><div className="mx-auto mt-6 max-w-xl rounded-3xl border-2 border-detective-orange-300 bg-white p-5"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">First rule of Idea City</p><p className="mt-2 font-display text-2xl font-bold text-detective-blue-900">⭐ CREATORS MATTER.<br />THEIR CREATIONS MATTER TOO.</p></div><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={onReward} className="rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">🎁 DETECTIVE REWARD</button><button type="button" onClick={onFile} className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-6 py-3 font-display font-bold text-detective-blue-800"><FileText className="h-4 w-4" />VIEW CASE FILE</button></div></div>;
}

function RewardRoom({ reward, setReward, onFile, onReturn }: { reward: Reward; setReward: (reward: Reward) => void; onFile: () => void; onReturn: () => void }) {
  if (reward === "colour") return <div><CaseColourReward onDone={() => setReward(null)} /><RewardDone onFile={onFile} onReturn={onReturn} /></div>;
  if (reward === "puzzle") return <div><CaseJigsawReward onDone={() => setReward(null)} /><RewardDone onFile={onFile} onReturn={onReturn} /></div>;
  return <div className="rounded-3xl bg-white p-6 text-center shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">🎁 Detective reward unlocked!</p><h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">Choose some detective fun!</h2><p className="mt-2 text-detective-blue-700">These activities are just for fun. Your Case is already safely solved.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><button type="button" onClick={() => setReward("colour")} className="rounded-3xl border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 font-display text-xl font-bold text-detective-blue-900"><Palette className="mx-auto h-9 w-9 text-detective-orange-500" />🎨 COLOUR THE CASE</button><button type="button" onClick={() => setReward("puzzle")} className="rounded-3xl border-2 border-detective-blue-200 bg-sky-50 p-6 font-display text-xl font-bold text-detective-blue-900"><Puzzle className="mx-auto h-9 w-9 text-detective-orange-500" />🧩 SOLVE THE CASE PUZZLE</button></div><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={onFile} className="rounded-full border-2 border-detective-blue-200 px-5 py-3 font-display font-bold text-detective-blue-800">VIEW CASE FILE</button><button type="button" onClick={onReturn} className="rounded-full bg-detective-blue-600 px-5 py-3 font-display font-bold text-white">SKIP & RETURN TO IDEA CITY</button></div></div>;
}

function RewardDone({ onFile, onReturn }: { onFile: () => void; onReturn: () => void }) {
  return <div className="mt-5 rounded-3xl bg-green-100 p-5 text-center"><p className="font-display text-xl font-bold text-green-800">🎉 GREAT WORK, DETECTIVE!</p><div className="mt-4 flex flex-wrap justify-center gap-3"><button type="button" onClick={onFile} className="rounded-full border-2 border-green-700 bg-white px-5 py-3 font-display font-bold text-green-800">VIEW CASE FILE</button><button type="button" onClick={onReturn} className="rounded-full bg-detective-blue-600 px-5 py-3 font-display font-bold text-white">RETURN TO IDEA CITY</button></div></div>;
}