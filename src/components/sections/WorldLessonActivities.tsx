"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Palette, Play, RotateCcw, Sparkles } from "lucide-react";

const VIDEO_SCENES = {
  1: [
    { icon: "🔍", title: "A brand is a clue", text: "Questy spots a special mark that tells us who made something.", tone: "from-sky-400 to-blue-600" },
    { icon: "⭐", title: "Clues look different", text: "Pictures, names and colours can all help us recognise a brand.", tone: "from-orange-400 to-rose-500" },
    { icon: "🕵️", title: "You are the detective", text: "Look closely at everyday things and spot their brand clues.", tone: "from-emerald-400 to-teal-600" },
  ],
  2: [
    { icon: "🏷️", title: "A product is a thing", text: "Shoes, drinks and games are products that people use.", tone: "from-violet-400 to-purple-600" },
    { icon: "💭", title: "A brand is a feeling", text: "A name, a look and a promise can make a product feel special.", tone: "from-orange-400 to-pink-500" },
    { icon: "✨", title: "Spot the difference", text: "A strong brand helps people remember and trust a product.", tone: "from-cyan-400 to-blue-600" },
  ],
} as const;

const PALETTE = [
  "#facc15", "#38bdf8", "#fb923c", "#4ade80", "#c084fc", "#f472b6", "#a16207", "#ffffff",
];

const PIECES = [
  { id: "apple", brand: "Apple", clue: "🍎", colour: "bg-red-100" },
  { id: "nike", brand: "Nike", clue: "✓", colour: "bg-slate-100" },
  { id: "mcdonalds", brand: "McDonald's", clue: "M", colour: "bg-yellow-100" },
  { id: "adidas", brand: "Adidas", clue: "≡", colour: "bg-blue-100" },
] as const;

export function WorldMiniVideo({ worldId }: { worldId: 1 | 2 }) {
  const scenes = VIDEO_SCENES[worldId];
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setScene((current) => {
        if (current === scenes.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [playing, scenes.length]);

  const current = scenes[scene];
  return (
    <section className="overflow-hidden rounded-[2rem] border-2 border-detective-blue-100 bg-white shadow-lg">
      <div className={"relative min-h-72 bg-gradient-to-br p-8 text-center text-white sm:p-12 " + current.tone}>
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_28%),radial-gradient(circle_at_80%_75%,white_0,transparent_24%)]" />
        <div className="relative mx-auto max-w-xl">
          <span className="inline-grid h-24 w-24 animate-bounce place-items-center rounded-full bg-white/20 text-6xl shadow-xl">{current.icon}</span>
          <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.2em]">Questy&apos;s animated mini video · {scene + 1} / {scenes.length}</p>
          <h3 className="mt-2 font-display text-3xl font-bold">{current.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-lg text-white/95">{current.text}</p>
          <button type="button" onClick={() => { if (scene === scenes.length - 1) setScene(0); setPlaying((currentPlaying) => !currentPlaying); }} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold text-detective-blue-800 shadow-lg">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" /> {playing ? "Pause video" : scene === scenes.length - 1 ? "Watch again" : "Play video"}
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 p-4">
        {scenes.map((item, index) => <button key={item.title} type="button" aria-label={"Show video scene " + (index + 1)} onClick={() => { setScene(index); setPlaying(false); }} className={"h-3 rounded-full transition-all " + (scene === index ? "w-8 bg-detective-orange-500" : "w-3 bg-detective-blue-200")} />)}
      </div>
    </section>
  );
}

export function ColourQuesty() {
  const [colour, setColour] = useState("#facc15");
  const [parts, setParts] = useState<Record<string, string>>({});

  const paint = (part: string) => setParts((current) => ({ ...current, [part]: colour }));
  const fill = (part: string) => parts[part] ?? "white";
  return (
    <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">Colour Questy</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">Paint the same Questy picture as the printable page</h3>
      <p className="mt-2 text-detective-blue-700/85">Choose any colour, then tap Questy&apos;s hat, face, coat, tail, badge or magnifying glass.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <svg viewBox="0 0 360 280" className="mx-auto w-full max-w-md rounded-3xl bg-white p-3 shadow-inner" role="img" aria-label="Interactive Questy colouring picture">
          <g fill="white" stroke="#0b2f5c" strokeWidth="7" strokeLinejoin="round">
            <path d="M118 96 L94 42 L151 68 M242 96 L266 42 L209 68" fill={fill("ears")} onClick={() => paint("ears")} className="cursor-pointer"/>
            <path d="M235 164 Q300 170 304 215 Q286 242 248 224" fill={fill("tail")} onClick={() => paint("tail")} className="cursor-pointer"/>
            <circle cx="180" cy="126" r="68" fill={fill("face")} onClick={() => paint("face")} className="cursor-pointer"/>
            <path d="M118 188 Q180 164 242 188 L262 250 L98 250 Z" fill={fill("coat")} onClick={() => paint("coat")} className="cursor-pointer"/>
            <path d="M132 84 Q180 45 228 84 L214 105 Q180 85 146 105 Z" fill={fill("hat")} onClick={() => paint("hat")} className="cursor-pointer"/>
            <circle cx="180" cy="205" r="28" fill={fill("badge")} onClick={() => paint("badge")} className="cursor-pointer"/>
            <circle cx="68" cy="74" r="24" fill={fill("glass")} onClick={() => paint("glass")} className="cursor-pointer"/>
          </g>
          <g fill="white" stroke="#0b2f5c" strokeWidth="4"><ellipse cx="145" cy="126" rx="10" ry="15"/><ellipse cx="215" cy="126" rx="10" ry="15"/></g>
          <g fill="#0b2f5c"><circle cx="146" cy="128" r="4"/><circle cx="214" cy="128" r="4"/></g>
          <g fill="none" stroke="#0b2f5c" strokeWidth="5" strokeLinecap="round"><path d="M170 148 Q180 158 190 148"/><path d="M57 74 L66 83 L81 63"/></g>
          <path d="M180 186 L186 199 L201 201 L190 211 L193 226 L180 218 L167 226 L170 211 L159 201 L174 199 Z" fill="white" stroke="#0b2f5c" strokeWidth="3"/>
          <g stroke="#0b2f5c" strokeWidth="3" strokeLinecap="round"><path d="M115 145 L80 140"/><path d="M115 155 L80 162"/><path d="M245 145 L280 140"/><path d="M245 155 L280 162"/></g>
        </svg>
        <div className="flex max-w-64 flex-wrap justify-center gap-3">
          {PALETTE.map((item) => <button key={item} type="button" aria-label={"Use colour " + item} aria-pressed={colour === item} onClick={() => setColour(item)} className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour === item ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: item }} />)}
          <a href="/activities/world-1-questy-colouring.svg" download className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-4 py-2 font-display text-sm font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true"/>Print colouring page</a>
          <button type="button" onClick={() => setParts({})} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Start again</button>
        </div>
      </div>
    </section>
  );
}

export function FamousLogoJigsaw() {
  const [placed, setPlaced] = useState<string[]>([]);
  const complete = placed.length === PIECES.length;
  return (
    <section className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-500">Famous logo jigsaw</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">Assemble Questy&apos;s logo case file</h3>
      <p className="mt-2 text-detective-blue-700/85">Tap each familiar logo piece to place it in the jigsaw.</p>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border-4 border-detective-blue-300 bg-detective-blue-50 shadow-inner">
          {PIECES.map((piece) => {
            const isPlaced = placed.includes(piece.id);
            return <div key={piece.id} className={"relative grid min-h-36 place-items-center border border-detective-blue-200 p-4 text-center sm:min-h-44 " + (isPlaced ? piece.colour : "bg-white")}>{isPlaced ? <><span className="font-display text-5xl font-bold text-detective-blue-900">{piece.clue}</span><span className="mt-2 font-display text-sm font-bold text-detective-blue-900">{piece.brand}</span></> : <span className="font-display text-4xl text-detective-blue-200">?</span>}</div>;
          })}
        </div>
        <div className="grid grid-cols-2 gap-3 lg:w-64">
          {PIECES.map((piece) => <button key={piece.id} type="button" disabled={placed.includes(piece.id)} onClick={() => setPlaced((current) => current.includes(piece.id) ? current : [...current, piece.id])} className={"min-h-28 rounded-3xl border-2 p-3 text-center shadow-sm transition-transform hover:-translate-y-1 disabled:cursor-default " + (placed.includes(piece.id) ? "border-green-300 bg-green-50 text-green-800" : "border-detective-orange-200 bg-detective-orange-50 text-detective-blue-900")}><span className="block font-display text-3xl font-bold">{piece.clue}</span><span className="mt-2 block font-display text-sm font-bold">{placed.includes(piece.id) ? "Placed ✓" : piece.brand}</span></button>)}
          <button type="button" onClick={() => setPlaced([])} className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Mix pieces again</button>
        </div>
      </div>
      {complete && <p className="mt-5 rounded-2xl bg-green-100 px-5 py-4 font-display font-semibold text-green-800"><Sparkles className="mr-2 inline h-5 w-5" aria-hidden="true"/>Brilliant! You assembled the famous-logo case file.</p>}
    </section>
  );
}
