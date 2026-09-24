"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Palette, Play, Puzzle, RotateCcw, Sparkles, Undo2 } from "lucide-react";
import { DetectiveAvatar } from "@/components/detective/DetectiveAvatar";
import type { DetectiveProfile } from "@/lib/detective-profile";
import { questyArt } from "@/lib/questy-art";

export type CaseStep = "intro" | "story" | "investigate" | "discovery" | "clues" | "problem" | "solved" | "reward" | "file";
export type CaseVideoSource = { mp4?: string; webm?: string; poster?: string; captions?: string };

const steps: Array<{ id: CaseStep; label: string }> = [
  { id: "intro", label: "The mystery" },
  { id: "investigate", label: "Investigate" },
  { id: "clues", label: "Clues" },
  { id: "problem", label: "Solve" },
  { id: "solved", label: "Case solved" },
];

const stepOrder: Record<CaseStep, number> = { intro: 0, story: 0, investigate: 1, discovery: 2, clues: 2, problem: 3, solved: 4, reward: 4, file: 4 };

export function CaseShell({ children, step }: { children: React.ReactNode; step: CaseStep }) {
  return <section className="mx-auto mt-8 max-w-4xl rounded-[2rem] border-2 border-detective-blue-100 bg-gradient-to-b from-sky-50 via-white to-detective-yellow-50 p-4 shadow-xl sm:p-7">
    <CaseProgress step={step} />
    <div className="mt-7">{children}</div>
  </section>;
}

export function CaseProgress({ step }: { step: CaseStep }) {
  const current = stepOrder[step];
  return <ol aria-label="Case progress" className="grid grid-cols-5 gap-1 text-center">
    {steps.map((item, index) => <li key={item.id} className="min-w-0">
      <span className={"mx-auto grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold " + (index <= current ? "border-detective-orange-500 bg-detective-orange-500 text-white" : "border-detective-blue-200 bg-white text-detective-blue-400")}>{index < current ? "✓" : index === current && step !== "intro" ? "🔎" : index + 1}</span>
      <span className="mt-1 block truncate text-[10px] font-display font-semibold text-detective-blue-800 sm:text-xs">{item.label}</span>
    </li>)}
  </ol>;
}

export function CaseHeader({ nickname, detective }: { nickname: string; detective: DetectiveProfile | null }) {
  return <header className="grid items-center gap-4 rounded-[2rem] bg-detective-blue-900 px-5 py-5 text-white sm:grid-cols-[auto_1fr_auto]">
    <Image src={questyArt.detective} alt="Questy the detective mascot" className="mx-auto h-24 w-auto object-contain sm:mx-0" priority />
    <div className="text-center sm:text-left"><p className="font-display text-xs font-semibold uppercase tracking-[.18em] text-detective-yellow-300">Little IP Detectives · Creator Park · Case 1</p><h1 className="mt-1 font-display text-3xl font-bold">QUESTY&apos;S FIRST MYSTERY</h1><p className="mt-2 text-white/85">{nickname ? `Detective ${nickname}, we have a mystery!` : "Detective, we have a mystery!"}</p></div>
    {detective && <div className="hidden w-24 sm:block"><DetectiveAvatar avatar={detective.avatar} pose="investigate" /></div>}
  </header>;
}

export function CaseIntro({ nickname, detective, onStart }: { nickname: string; detective: DetectiveProfile | null; onStart: () => void }) {
  return <div className="space-y-6 text-center"><CaseHeader nickname={nickname} detective={detective} /><div className="rounded-3xl bg-white p-6 shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Little IP Detectives · The mystery</p><h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">The Creator Cards are mixed up!</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-detective-blue-800">Four young creators are getting ready for Idea Day. We know what was created, but we need to find out who created each one.</p><p className="mt-4 font-display text-xl text-detective-blue-900">Can you help Questy solve the mystery?</p><button type="button" onClick={onStart} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-detective-orange-500 px-7 py-3 font-display text-lg font-bold text-white shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300">OPEN THE PICTURE STORY <span aria-hidden>🔎</span></button></div></div>;
}

export function CaseVideo({ source, slides, onReady }: { source?: CaseVideoSource; slides: ReadonlyArray<{ title: string; text: string; icon: string }>; onReady: () => void }) {
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);
  if (source?.mp4 || source?.webm) return <div className="rounded-3xl bg-white p-5 text-center shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Watch the story</p><video controls poster={source.poster} className="mx-auto mt-4 max-h-[420px] w-full rounded-2xl" aria-label="Case 1 story video"><>{source.webm && <source src={source.webm} type="video/webm" />}{source.mp4 && <source src={source.mp4} type="video/mp4" />}{source.captions && <track kind="captions" src={source.captions} srcLang="en" label="English" default />}</></video><button type="button" onClick={onReady} className="mt-5 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">I&apos;M READY! 🔎</button></div>;
  const scene = slides[slide];
  return <div className="rounded-3xl bg-white p-5 text-center shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">The story</p><motion.div key={scene.title} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-5 grid min-h-64 max-w-xl place-items-center rounded-3xl bg-gradient-to-br from-sky-100 to-detective-yellow-100 p-6"><div><span aria-hidden className="block text-7xl">{scene.icon}</span><h2 className="mt-4 font-display text-3xl font-bold text-detective-blue-900">{scene.title}</h2><p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-detective-blue-800">{scene.text}</p></div></motion.div><div className="mt-5 flex items-center justify-center gap-3"><span className="text-sm font-semibold text-detective-blue-700">{slide + 1} of {slides.length}</span>{slide < slides.length - 1 ? <button type="button" onClick={() => setSlide((value) => value + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-bold text-white">Next clue <ArrowRight className="h-4 w-4" /></button> : <button type="button" onClick={onReady} className="rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">I&apos;M READY! 🔎</button>}</div></div>;
}

export function CaseInvestigation({ creators, onComplete }: { creators: ReadonlyArray<{ id: string; name: string; creation: string; icon: string; detail: string; image?: string }>; onComplete: () => void }) {
  const [creator, setCreator] = useState<string | null>(null);
  const [found, setFound] = useState<string[]>([]);
  const [message, setMessage] = useState("Choose a creator. Then find the creation they made.");
  const mixed = [...creators].sort((a, b) => ({ leo: 0, ben: 1, zara: 2, mia: 3 }[a.id as "leo" | "ben" | "zara" | "mia"] - ({ leo: 0, ben: 1, zara: 2, mia: 3 }[b.id as "leo" | "ben" | "zara" | "mia"]));
  const chooseCreation = (id: string) => {
    if (!creator || found.includes(id)) return;
    if (creator === id) {
      const matched = creators.find((item) => item.id === id)!;
      const next = [...found, id];
      setFound(next);
      setCreator(null);
      setMessage(`🔎 CLUE FOUND! ${matched.name} created ${matched.creation}!`);
      if (next.length === creators.length) window.setTimeout(onComplete, 450);
    } else setMessage("Good try, Little IP Detective. Look at the clues again!");
  };
  return <div className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-7">
    <div className="text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Case 1 · Investigation</p>
      <h2 className="mt-1 font-display text-3xl font-bold text-detective-blue-900">WHO CREATED WHAT?</h2>
      <p className="mt-2 text-detective-blue-700">The creations are mixed up. Tap a name, then tap the creation that belongs to them.</p>
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
      <div className="rounded-3xl bg-sky-50 p-4">
        <p className="mb-3 text-center font-display font-bold text-detective-blue-900">CREATORS</p>
        <div className="grid gap-3">
          {creators.map((item) => <button key={item.id} type="button" disabled={found.includes(item.id)} onClick={() => { setCreator(item.id); setMessage(`Now find what ${item.name} created.`); }} aria-pressed={creator === item.id} className={"min-h-14 rounded-2xl border-2 px-5 py-3 text-left font-display text-lg font-bold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 " + (found.includes(item.id) ? "border-green-500 bg-green-50 text-green-800" : creator === item.id ? "border-detective-orange-500 bg-detective-yellow-100 text-detective-blue-900" : "border-detective-blue-100 bg-white text-detective-blue-900 hover:border-detective-orange-300")}>{item.name}{found.includes(item.id) && " ✓"}</button>)}
        </div>
      </div>
      <div className="rounded-3xl bg-detective-yellow-50 p-4">
        <p className="mb-3 text-center font-display font-bold text-detective-blue-900">CREATIONS — MIXED UP</p>
        <div className="grid grid-cols-2 gap-3">
          {mixed.map((item) => <button key={item.id} type="button" disabled={found.includes(item.id)} onClick={() => chooseCreation(item.id)} className={"min-h-40 rounded-2xl border-2 p-3 text-center transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 " + (found.includes(item.id) ? "border-green-500 bg-green-50" : "border-detective-blue-100 bg-white hover:border-detective-orange-300")}>{item.image ? <Image src={item.image} alt={item.creation} width={240} height={180} className="mx-auto h-28 w-full rounded-xl object-contain" /> : <span className="text-4xl">{item.icon}</span>}<span className="mt-2 block font-display font-bold text-detective-blue-900">{item.creation}</span></button>)}
        </div>
      </div>
    </div>
    <p role="status" className="mt-5 rounded-2xl bg-detective-yellow-100 px-4 py-3 text-center font-display font-semibold text-detective-blue-900">{message}</p>
    {found.length === creators.length && <p className="mt-4 text-center font-display text-xl font-bold text-detective-orange-600">🎉 ALL CLUES FOUND!</p>}
  </div>;
}

export function CaseQuestion({ question, index, total, onComplete }: { question: { prompt: string; choices: readonly string[]; correct: number; feedback: string }; index: number; total: number; onComplete: () => void }) {
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  const choose = (choice: number) => { if (correct) return; if (choice === question.correct) { setCorrect(true); setFeedback(question.feedback); } else setFeedback("Good try, Detective! Look at the clues and try again."); };
  return <div className="rounded-3xl bg-white p-6 text-center shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">Detective clue {index + 1} of {total}</p><h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold text-detective-blue-900">{question.prompt}</h2><div className="mx-auto mt-6 grid max-w-2xl gap-3">{question.choices.map((choice, choiceIndex) => <button key={choice} type="button" disabled={correct} onClick={() => choose(choiceIndex)} className={"min-h-14 rounded-2xl border-2 px-5 py-3 text-left font-semibold text-detective-blue-900 transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 " + (correct && choiceIndex === question.correct ? "border-green-500 bg-green-50" : "border-detective-blue-100 bg-sky-50 hover:border-detective-orange-400")}><span className="mr-3 font-display">{String.fromCharCode(65 + choiceIndex)}.</span>{choice}</button>)}</div>{feedback && <p role="status" className="mx-auto mt-5 max-w-2xl rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900">{correct ? "🔎 " : "💡 "}{feedback}</p>}{correct && <button type="button" onClick={onComplete} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">Next clue <ArrowRight className="h-4 w-4" /></button>}</div>;
}

export function CaseFile({ solved, onReturn }: { solved: boolean; onReturn: () => void }) {
  return <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">📁 Case File #1</p><h2 className="mt-1 font-display text-3xl font-bold text-detective-blue-900">QUESTY&apos;S FIRST MYSTERY</h2><dl className="mt-6 grid gap-4 text-detective-blue-800 sm:grid-cols-2"><div className="rounded-2xl bg-sky-50 p-4"><dt className="font-display font-bold text-detective-blue-900">MYSTERY</dt><dd className="mt-1">Who created what?</dd></div><div className="rounded-2xl bg-detective-yellow-50 p-4"><dt className="font-display font-bold text-detective-blue-900">DISCOVERY</dt><dd className="mt-1">People create drawings, stories, inventions, names and designs.</dd></div><div className="rounded-2xl bg-sky-50 p-4"><dt className="font-display font-bold text-detective-blue-900">NEW DETECTIVE WORD</dt><dd className="mt-1">IP — Intellectual Property</dd></div><div className="rounded-2xl bg-detective-yellow-50 p-4"><dt className="font-display font-bold text-detective-blue-900">DETECTIVE RULE</dt><dd className="mt-1">⭐ Creators matter. Their creations matter too.</dd></div></dl><p className={"mt-5 rounded-2xl px-5 py-4 font-display font-bold " + (solved ? "bg-green-100 text-green-800" : "bg-detective-blue-50 text-detective-blue-800")}>{solved ? "✓ CASE SOLVED" : "Case still open"}</p><button type="button" onClick={onReturn} className="mt-5 inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-bold text-white">RETURN TO IDEA CITY <ArrowRight className="h-4 w-4" /></button></div>;
}

const colours = ["#FFEA00", "#FF6D00", "#FF1744", "#2979FF", "#00E676", "#7000FF"];
export function CaseColourReward({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState(colours[0]);
  const [fills, setFills] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Array<Record<string, string>>>([]);
  const paint = (id: string) => { setHistory((items) => [...items, fills].slice(-8)); setFills((items) => ({ ...items, [id]: selected })); };
  const reset = () => { setHistory((items) => [...items, fills]); setFills({}); };
  return <div className="rounded-3xl bg-white p-5 shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">🎨 Colour the Case</p><h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">Make an Idea Day poster!</h3><p className="mt-2 text-detective-blue-700">Pick a colour, then tap a picture area.</p><div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto]"><svg viewBox="0 0 420 300" className="w-full rounded-3xl border-2 border-detective-blue-100 bg-sky-50" role="img" aria-label="Creator Park Idea Day colouring page"><text x="210" y="38" textAnchor="middle" className="fill-detective-blue-900 text-[24px] font-bold">IDEA DAY</text><g stroke="#123B6D" strokeWidth="4" strokeLinejoin="round">{[["sky","M0 65H420V300H0Z"],["sun","M350 75a34 34 0 1 0 0.1 0"],["easel","M45 205L90 75l45 130m-70-65h50"],["drawing","M65 105h50v65H65z"],["dragon","M80 135l10-18 12 18 10-12"],["book","M175 190q30-22 60 0v55q-30-20-60 0z"],["robot","M285 165h55v65h-55z"],["sign","M270 245h95v35h-95z"]].map(([id,path])=><path key={id} d={path} fill={fills[id] ?? "#fff"} onClick={() => paint(id)} className="cursor-pointer" />)}</g><text x="317" y="268" textAnchor="middle" className="pointer-events-none fill-detective-blue-900 text-[13px] font-bold">SUNNY SNACKS</text></svg><div className="flex max-w-56 flex-wrap content-start justify-center gap-3">{colours.map((colour) => <button key={colour} type="button" aria-label={"Use colour " + colour} aria-pressed={selected === colour} onClick={() => setSelected(colour)} className={"h-11 w-11 rounded-full border-4 border-white shadow ring-2 " + (selected === colour ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: colour }} />)}<button type="button" onClick={() => { const previous = history[history.length - 1]; if (previous) { setFills(previous); setHistory((items) => items.slice(0, -1)); } }} disabled={!history.length} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 px-4 py-2 font-display font-bold text-detective-blue-800 disabled:opacity-40"><Undo2 className="h-4 w-4" />Undo</button><button type="button" onClick={reset} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 px-4 py-2 font-display font-bold text-detective-blue-800"><RotateCcw className="h-4 w-4" />Reset</button></div></div><button type="button" disabled={!Object.keys(fills).length} onClick={onDone} className="mt-5 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white disabled:opacity-40">Done colouring!</button></div>;
}

export function CaseJigsawReward({ onDone }: { onDone: () => void }) {
  const pieces = [0, 1, 2, 3];
  const [selected, setSelected] = useState<number | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const place = (slot: number) => { if (selected === null || placed.includes(slot)) return; if (selected === slot) setPlaced((items) => [...items, slot]); };
  const complete = placed.length === pieces.length;
  const art = ["IDEA", "DAY", "🐉", "🤖"];
  return <div className="rounded-3xl bg-white p-5 shadow-sm"><p className="font-display text-sm font-bold uppercase tracking-[.18em] text-detective-orange-500">🧩 Solve the Case Puzzle</p><h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">Build the Idea Day poster</h3><p className="mt-2 text-detective-blue-700">Tap a mixed piece, then tap where it belongs.</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><div><p className="mb-2 font-display font-bold text-detective-blue-900">Poster board</p><div className="grid grid-cols-2 overflow-hidden rounded-2xl border-4 border-detective-blue-300">{pieces.map((slot) => <button key={slot} type="button" onClick={() => place(slot)} className="aspect-square border border-detective-blue-200 bg-detective-yellow-50 font-display text-3xl font-bold text-detective-blue-900">{placed.includes(slot) ? art[slot] : "?"}</button>)}</div></div><div><p className="mb-2 font-display font-bold text-detective-blue-900">Mixed pieces</p><div className="grid grid-cols-2 gap-2">{[2, 0, 3, 1].filter((piece) => !placed.includes(piece)).map((piece) => <button key={piece} type="button" onClick={() => setSelected(piece)} aria-pressed={selected === piece} className={"aspect-square rounded-2xl border-2 bg-sky-50 font-display text-3xl font-bold text-detective-blue-900 " + (selected === piece ? "border-detective-orange-500 ring-4 ring-detective-orange-200" : "border-detective-blue-200")}>{art[piece]}</button>)}</div><button type="button" onClick={() => { setSelected(null); setPlaced([]); }} className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 px-4 py-2 font-display font-bold text-detective-blue-800"><RotateCcw className="h-4 w-4" />Mix again</button></div></div>{complete && <div className="mt-5 rounded-2xl bg-green-100 p-4 text-center font-display font-bold text-green-800">🎉 GREAT WORK, DETECTIVE!</div>}<button type="button" disabled={!complete} onClick={onDone} className="mt-5 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white disabled:opacity-40">Finish reward</button></div>;
}