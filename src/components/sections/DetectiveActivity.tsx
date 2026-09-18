"use client";

import { useState } from "react";
import { CheckCircle2, Lightbulb, RefreshCw, Sparkles } from "lucide-react";
import type { World } from "@/lib/worlds";

type ActivityChoice = { label: string; correct: boolean };

function choicesFor(world: World): ActivityChoice[] {
  const choices: Record<number, ActivityChoice[]> = {
    1: [{ label: "A comic", correct: true }, { label: "A rain cloud", correct: false }, { label: "A shoe size", correct: false }],
    2: [{ label: "A logo", correct: true }, { label: "A puddle", correct: false }, { label: "A bus stop", correct: false }],
    3: [{ label: "Give it your own name", correct: true }, { label: "Copy a famous name", correct: false }, { label: "Hide the creator", correct: false }],
    4: [{ label: "Name and logo", correct: true }, { label: "A weather report", correct: false }, { label: "A receipt", correct: false }],
    5: [{ label: "A fresh symbol", correct: true }, { label: "An exact copy", correct: false }, { label: "A price tag", correct: false }],
    6: [{ label: "Original slogan", correct: true }, { label: "Copied slogan", correct: false }, { label: "A password", correct: false }],
    7: [{ label: "Ask a trusted adult", correct: true }, { label: "Share personal details", correct: false }, { label: "Accuse quickly", correct: false }],
    8: [{ label: "A problem to solve", correct: true }, { label: "A copied logo", correct: false }, { label: "A random price", correct: false }],
    9: [{ label: "A useful new mechanism", correct: true }, { label: "A product name", correct: false }, { label: "A song title", correct: false }],
    11: [{ label: "An original drawing", correct: true }, { label: "A shoe size", correct: false }, { label: "A cloud", correct: false }],
    12: [{ label: "Ask first and give credit", correct: true }, { label: "Post it as mine", correct: false }, { label: "Erase the credit", correct: false }],
    13: [{ label: "How it looks", correct: true }, { label: "How it works", correct: false }, { label: "Its price", correct: false }],
  };
  return choices[world.id] ?? [];
}

function InventorCard() {
  const [values, setValues] = useState({ problem: "", solution: "", name: "", feature: "" });
  const done = Object.values(values).every(Boolean);
  return <div className="rounded-3xl bg-white p-5 shadow-sm">
    <p className="font-display font-bold text-detective-blue-900">Questy Inventor Challenge</p>
    <p className="mt-1 text-sm text-detective-blue-700">This stays on this device; it is not saved to your account.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {([["problem", "A problem I noticed"], ["solution", "My solution"], ["name", "My invention name"], ["feature", "What makes it different"]] as const).map(([key, label]) => <label key={key} className="text-sm font-semibold text-detective-blue-800">{label}<input value={values[key]} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border-2 border-detective-blue-100 px-3 py-2 font-normal outline-none focus:border-detective-orange-400" /></label>)}
    </div>
    {done && <p className="mt-4 rounded-2xl bg-green-100 px-4 py-3 font-display font-semibold text-green-800">🎉 Brilliant invention plan, detective!</p>}
  </div>;
}

function MysteryBoard({ worldId }: { worldId: number }) {
  const [matched, setMatched] = useState<string[]>([]);
  const clues = worldId === 14 ? ["ZippyPack name/logo → Trademark", "New locking mechanism → Patent", "Instruction artwork → Copyright", "Special outer look → Design"] : ["CREATE → Imagine original things", "UNDERSTAND → Notice IP clues", "RESPECT → Value other creators", "PROTECT → Think about helpful protection"];
  return <div className="grid gap-3 sm:grid-cols-2">{clues.map((clue) => <button key={clue} type="button" onClick={() => setMatched((current) => current.includes(clue) ? current : [...current, clue])} className={"rounded-2xl border-2 p-4 text-left font-display font-semibold transition " + (matched.includes(clue) ? "border-green-400 bg-green-100 text-green-800" : "border-detective-blue-100 bg-white text-detective-blue-900 hover:border-detective-orange-300")}>{matched.includes(clue) ? "✓ " : "🔎 "}{clue}</button>)}</div>;
}

/** A lightweight, replayable step activity. It never changes completion or rewards. */
export function DetectiveActivity({ world }: { world: World }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const choices = choicesFor(world);
  const isCreate = world.activity.kind === "create";
  const isMystery = world.activity.kind === "mystery";

  return <section key={resetKey} className="rounded-[2rem] border-2 border-detective-orange-200 bg-detective-orange-50/60 p-6 shadow-md sm:p-8">
    <div className="flex items-start justify-between gap-4">
      <div><p className="font-display text-sm font-semibold uppercase tracking-[.18em] text-detective-orange-600">Detective step 7 · Play / create</p><h4 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">{world.activity.title}</h4><p className="mt-2 text-detective-blue-700">{world.activity.instructions}</p></div>
      <button type="button" onClick={() => { setSelected(null); setResetKey((key) => key + 1); }} className="shrink-0 rounded-full border-2 border-detective-orange-300 bg-white p-2 text-detective-orange-600" aria-label="Restart this activity"><RefreshCw className="h-5 w-5" /></button>
    </div>
    <div className="mt-5">
      {isCreate ? <InventorCard /> : isMystery ? <MysteryBoard worldId={world.id} /> : <div className="grid gap-3 sm:grid-cols-3">{choices.map((choice, index) => <button key={choice.label} type="button" onClick={() => setSelected(index)} className={"min-h-16 rounded-2xl border-2 p-4 text-left font-semibold transition " + (selected === index ? choice.correct ? "border-green-400 bg-green-100 text-green-800" : "border-detective-orange-400 bg-detective-orange-100 text-detective-blue-900" : "border-detective-blue-100 bg-white text-detective-blue-900 hover:-translate-y-0.5 hover:border-detective-orange-300")}>{selected === index && <span className="mr-2">{choice.correct ? "✓" : "Try again!"}</span>}{choice.label}</button>)}</div>}
    </div>
    <p className="mt-5 rounded-2xl bg-detective-yellow-100 px-4 py-3 text-sm text-detective-blue-800"><Lightbulb className="mr-2 inline h-4 w-4 text-detective-orange-500" />This activity is for practice and play. Your World reward is claimed separately after the detective questions.</p>
    {selected !== null && choices[selected]?.correct && <p className="mt-4 font-display font-bold text-green-700"><CheckCircle2 className="mr-2 inline h-5 w-5" />Clue solved! Keep exploring.</p>}
    {(isCreate || isMystery) && <p className="mt-4 font-display font-bold text-detective-blue-800"><Sparkles className="mr-2 inline h-5 w-5 text-detective-orange-500" />Great detective thinking!</p>}
  </section>;
}
