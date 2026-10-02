"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, RotateCcw, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import { adventureContent, ultimateIpChallenge, type AdventureQuestion } from "@/lib/adventures/adventure-content";
import { playCelebrationSound } from "@/lib/audio";
import type { World } from "@/lib/worlds";

type Step = "passage" | "clues" | "discovery" | "file" | "ultimate";
const steps = [
  { id: "passage", label: "Passage", emoji: "📖" },
  { id: "clues", label: "Find Clues", emoji: "🔎" },
  { id: "discovery", label: "Discovery", emoji: "💡" },
  { id: "file", label: "Case File", emoji: "📋" },
] as const;

const primary = "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-xs font-display font-bold text-white shadow-sm sm:text-sm";
const secondary = "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border-2 border-blue-200 bg-white px-4 py-2 text-xs font-display font-bold text-blue-900 sm:text-sm";

function Rail({ step }: { step: Step }) {
  const active = step === "ultimate" ? 3 : Math.max(0, steps.findIndex((x) => x.id === step));
  return <div className="rounded-2xl bg-white/95 px-2 py-2 shadow-lg sm:px-4 sm:py-3"><div className="flex items-start justify-between">{steps.map((x, i) => <div key={x.id} className="flex min-w-0 flex-1 items-start"><div className="flex min-w-0 flex-1 flex-col items-center text-center"><div className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-black sm:h-8 sm:w-8 sm:text-xs ${i === active ? "bg-orange-500 text-white" : i < active ? "bg-green-500 text-white" : "bg-sky-100 text-blue-700"}`}>{i < active ? <Check className="h-3.5 w-3.5" /> : i + 1}</div><div className="text-sm sm:text-base">{x.emoji}</div><p className="text-[8px] font-extrabold leading-none text-blue-800 sm:text-[10px]">{x.label}</p></div>{i < steps.length - 1 && <ChevronRight className="mt-3 hidden h-4 w-4 text-sky-400 sm:block" />}</div>)}</div></div>;
}

function pickGentleVoice(voices: SpeechSynthesisVoice[]) {
  const english = voices.filter((voice) => /^en(-|_)/i.test(voice.lang));
  const preferredNames = /Samantha|Zira|Aria|Jenny|Sonia|Karen|Moira|Tessa|Serena|Female|Google UK English Female/i;
  return english.find((voice) => preferredNames.test(voice.name))
    ?? english.find((voice) => /^en-SG/i.test(voice.lang))
    ?? english.find((voice) => /^en-GB/i.test(voice.lang))
    ?? english.find((voice) => /^en-US/i.test(voice.lang))
    ?? english[0]
    ?? voices[0];
}

function Passage({ title, paragraphs, onNext }: { title: string; paragraphs: string[]; onNext: () => void }) {
  const [reading, setReading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  function stopReading() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setReading(false);
  }

  function readToMe() {
    if (!("speechSynthesis" in window)) return;
    if (reading) {
      stopReading();
      return;
    }
    setMuted(false);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${title}. ${paragraphs.join(" ")}`);
    const voice = pickGentleVoice(voices.length ? voices : window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || "en-GB";
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;
    utterance.onend = () => setReading(false);
    utterance.onerror = () => setReading(false);
    setReading(true);
    window.speechSynthesis.speak(utterance);
  }

  function toggleMute() {
    if (!muted) stopReading();
    setMuted((value) => !value);
  }

  return <section className="mx-auto max-w-4xl rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-lg sm:p-7">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-[11px] font-black uppercase tracking-wider text-orange-600">📖 Adventure Passage</p><h3 className="mt-1 font-display text-xl font-black text-blue-950 sm:text-3xl">Read or listen to the story</h3><p className="mt-1 text-sm text-blue-700">Listen with a gentle reading voice, or read at your own pace.</p></div>
      <div className="flex gap-2"><button type="button" onClick={readToMe} className={secondary} aria-pressed={reading}><Volume2 className="h-3.5 w-3.5" />{reading ? "Stop" : "Read to me"}</button><button type="button" onClick={toggleMute} className={secondary} aria-pressed={muted}>{muted ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}{muted ? "Unmute" : "Mute"}</button></div>
    </div>
    <div className="mt-5 space-y-4 rounded-2xl bg-gradient-to-b from-sky-50 to-amber-50 p-4 text-[15px] leading-7 text-blue-950 sm:p-6 sm:text-base">{paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>)}</div>
    <div className="mt-5 text-center"><button type="button" onClick={() => { stopReading(); onNext(); }} className={primary}>Find the Clues <ArrowRight className="h-3.5 w-3.5" /></button></div>
  </section>;
}

function Question({ q, n, onNext }: { q: AdventureQuestion; n: number; onNext: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");
  function choose(i: number) {
    if (ok) return;
    setSelected(i);
    if (i === q.correct) { setOk(true); setMsg(q.feedback); }
    else setMsg("Almost! Check the passage clue and try again.");
  }
  return <section className="mx-auto max-w-3xl rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-lg sm:p-7"><div className="flex justify-between"><h3 className="font-display text-xl font-black text-blue-950 sm:text-2xl">🔎 Find the Clues</h3><span className="rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold text-blue-800">{n}/5</span></div><p className="mt-3 rounded-xl bg-sky-50 p-3.5 font-display text-base font-black text-blue-950 sm:text-xl">{q.prompt}</p><div className="mt-3 grid gap-2">{q.options.map((x, i) => <button key={x} disabled={ok} onClick={() => choose(i)} className={`flex min-h-10 items-center rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold sm:text-base ${ok && i === q.correct ? "border-green-400 bg-green-50" : selected === i ? "border-amber-400 bg-amber-50" : "border-sky-100"}`}><span className="mr-2.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-500 text-[11px] font-black text-white">{String.fromCharCode(65 + i)}</span>{x}{ok && i === q.correct && <Check className="ml-auto h-4 w-4 text-green-600" />}</button>)}</div>{msg && <p className={`mt-3 rounded-xl p-3 text-sm ${ok ? "bg-green-50 text-green-900" : "bg-yellow-50 text-blue-900"}`}>🐱 <strong>{ok ? "Great job!" : "Questy:"}</strong> {msg}</p>}{ok && <button onClick={onNext} className={`${primary} mt-4 w-full`}>{n === 5 ? "See Questy's Discovery" : "Next Question"}<ArrowRight className="h-3.5 w-3.5" /></button>}</section>;
}

function Ultimate({ onFinish }: { onFinish: (score: number) => void }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");
  const q = ultimateIpChallenge[i];
  function choose(a: number) { if (ok) return; if (a === q.correct) { setOk(true); setScore((s) => s + 1); setMsg(q.feedback); } else setMsg("Nice try! Look for the IP clue and try again."); }
  function next() { if (i === 9) onFinish(score); else { setI((v) => v + 1); setOk(false); setMsg(""); } }
  return <section className="mx-auto max-w-4xl rounded-2xl border-2 border-yellow-300 bg-white p-4 shadow-lg sm:p-8"><p className="text-xs font-black text-orange-600">🏆 QUESTY&apos;S ULTIMATE IP CHALLENGE</p><h3 className="mt-2 font-display text-xl font-black text-blue-950">Final mystery {i + 1} of 10 · ⭐ {score}</h3><p className="mt-3 font-semibold text-blue-950">{q.prompt}</p><div className="mt-4 grid gap-2">{q.options.map((x, a) => <button key={x} disabled={ok} onClick={() => choose(a)} className={`min-h-10 rounded-xl border-2 px-3 py-2 text-left text-sm font-semibold ${ok && a === q.correct ? "border-green-500 bg-green-50" : "border-sky-100"}`}>{String.fromCharCode(65 + a)}. {x}</button>)}</div>{msg && <p className="mt-4 rounded-xl bg-yellow-50 p-3 text-sm font-semibold">🐱 Questy: {msg}</p>}{ok && <button onClick={next} className={`${primary} mt-4`}>{i === 9 ? "See My Celebration" : "Next Mystery"}<ArrowRight className="h-3.5 w-3.5" /></button>}</section>;
}

export function AdventureExperience({ world, isCompleted, onComplete, onNextWorld }: { world: World; isCompleted: boolean; onComplete: (correct: number, total: number) => void; onNextWorld: (id: number) => void }) {
  const content = adventureContent.find((x) => x.id === world.id) ?? adventureContent[0];
  const [step, setStep] = useState<Step>("passage");
  const [q, setQ] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const sent = useRef(false);

  useEffect(() => { setStep("passage"); setQ(0); setFinalScore(null); sent.current = false; if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); }, [world.id]);

  function openCaseFile() {
    if (!isCompleted && !sent.current) { sent.current = true; onComplete(5, 5); playCelebrationSound(); }
    setStep("file");
  }

  const finalMessage = finalScore === 10 ? "Amazing! Master Idea Adventurer!" : (finalScore ?? 0) >= 7 ? "Brilliant Idea Explorer!" : (finalScore ?? 0) >= 4 ? "Great investigating! Let's look at a few clues again." : "Questy needs your help! Let's revisit some adventures.";
  const passage = content.scenes.map((scene) => scene.text);

  return <div className="mt-4 overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 via-white to-amber-50 shadow-lg sm:mt-8"><header className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 p-3 sm:p-6"><div className="grid items-center gap-3 lg:grid-cols-[.72fr_1.28fr]"><div className="flex items-center gap-3 text-white"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-yellow-300 bg-gradient-to-br from-yellow-300 to-orange-400"><div className="text-center"><div className="text-sm">{content.icon}</div><div className="font-display text-xl font-black">{world.id}</div></div></div><div><p className="text-[11px] font-black text-yellow-200 sm:text-sm">Adventure {world.id}</p><h2 className="font-display text-2xl font-black sm:text-4xl">{content.title}</h2><p className="text-xs font-semibold sm:text-base">{content.subtitle}</p></div></div><Rail step={step} /></div></header><div className="p-2.5 sm:p-5 lg:p-6">
    {step === "passage" && <Passage key={`passage-${world.id}`} title={content.title} paragraphs={passage} onNext={() => setStep("clues")} />}
    {step === "clues" && <Question key={`${world.id}-${q}`} q={content.questions[q]} n={q + 1} onNext={() => q === 4 ? setStep("discovery") : setQ((v) => v + 1)} />}
    {step === "discovery" && <section className="mx-auto max-w-4xl rounded-2xl border-2 border-yellow-200 bg-white p-4 shadow-lg sm:p-7"><div className="text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-yellow-100 text-2xl">💡</div><p className="mt-2 text-xs font-black uppercase text-orange-600">Questy&apos;s Discovery</p><h3 className="font-display text-xl font-black text-blue-950 sm:text-3xl">You found the idea!</h3></div><div className="mt-4 grid gap-2 sm:grid-cols-3">{content.discovery.map((x) => <article key={x.title} className="rounded-xl border-2 border-sky-100 bg-sky-50 p-3.5 sm:p-5"><Sparkles className="h-5 w-5 text-orange-500" /><h4 className="mt-2 font-display font-black text-blue-950">{x.title}</h4><p className="mt-1 text-sm text-blue-900 sm:text-base">{x.body}</p></article>)}</div><div className="mt-5 text-center"><button onClick={openCaseFile} className={primary}>Open My Case File <ArrowRight className="h-3.5 w-3.5" /></button></div></section>}
    {step === "file" && <section className="mx-auto max-w-4xl rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-lg sm:p-7"><div className="flex justify-between gap-2"><div><p className="text-xs font-black uppercase text-orange-600">📋 Case File #{world.id}</p><h3 className="font-display text-xl font-black text-blue-950 sm:text-3xl">What I Discovered</h3></div><span className="h-fit rounded-full bg-green-100 px-3 py-1.5 text-xs font-black text-green-800">✓ CASE SOLVED</span></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{content.caseFile.map((x) => <div key={x} className="flex gap-2 rounded-xl bg-sky-50 p-3 text-sm text-blue-950 sm:text-base"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-500 text-white"><Check className="h-3.5 w-3.5" /></span>{x}</div>)}</div><div className="mt-5 flex flex-wrap gap-2">{world.id === 15 ? <button onClick={() => setStep("ultimate")} className={primary}>Start Final Quest 🏆</button> : <button onClick={() => onNextWorld(world.id + 1)} className={primary}>Next Adventure {world.id + 1}<ArrowRight className="h-3.5 w-3.5" /></button>}<button onClick={() => { setQ(0); setStep("passage"); }} className={secondary}><RotateCcw className="h-3.5 w-3.5" />Replay</button></div></section>}
    {step === "ultimate" && finalScore === null && <Ultimate onFinish={(score) => { setFinalScore(score); playCelebrationSound(); }} />}
    {step === "ultimate" && finalScore !== null && <section className="mx-auto max-w-4xl rounded-2xl border-2 border-yellow-300 bg-white p-5 text-center shadow-lg sm:p-9"><div className="text-5xl">🏆</div><p className="mt-3 text-xs font-black uppercase tracking-wider text-orange-600">15 Adventures Complete</p><h3 className="mt-2 font-display text-3xl font-black text-blue-950">{finalMessage}</h3><p className="mt-3 text-blue-800">You scored {finalScore}/10. This final challenge is for practice and celebration, not pass or fail.</p><div className="mx-auto mt-5 max-w-2xl rounded-2xl bg-sky-50 p-4"><Star className="mx-auto h-6 w-6 text-yellow-500" /><h4 className="mt-2 font-display text-xl font-black text-blue-950">Ready for a bigger idea adventure?</h4><p className="mt-2 text-sm text-blue-800">Keep exploring longer stories, puzzles, drawing activities and new mysteries in Book Corner.</p><Link href="/books" className={`${primary} mt-4`}>Visit Book Corner <ArrowRight className="h-3.5 w-3.5" /></Link></div></section>}
  </div></div>;
}
