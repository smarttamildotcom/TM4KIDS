"use client";

import { useState } from "react";
import { Download, Palette, RotateCcw, Sparkles } from "lucide-react";

const PALETTE = ["#ef4444", "#f97316", "#facc15", "#4ade80", "#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#92400e", "#ffffff"];
const COLOUR_AREAS = [
  { id: "hat", label: "Questy's hat", style: { left: "31%", top: "12%", width: "29%", height: "16%", clipPath: "ellipse(48% 45% at 50% 50%)" } },
  { id: "face", label: "Questy's face", style: { left: "28%", top: "24%", width: "34%", height: "26%", clipPath: "ellipse(48% 45% at 50% 50%)" } },
  { id: "coat", label: "Questy's coat", style: { left: "30%", top: "47%", width: "31%", height: "24%", clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" } },
  { id: "tail", label: "Questy's tail", style: { left: "9%", top: "39%", width: "21%", height: "31%", clipPath: "ellipse(38% 48% at 56% 52%)" } },
  { id: "magnifier", label: "Questy's magnifying glass", style: { left: "57%", top: "31%", width: "23%", height: "27%", clipPath: "ellipse(48% 45% at 50% 50%)" } },
  { id: "lamp", label: "desk lamp", style: { left: "76%", top: "37%", width: "21%", height: "29%", clipPath: "polygon(20% 0, 75% 0, 100% 35%, 75% 50%, 75% 100%, 28% 100%, 28% 50%, 0 35%)" } },
  { id: "star", label: "star clue", style: { left: "6%", top: "68%", width: "23%", height: "18%", clipPath: "polygon(50% 0, 62% 35%, 100% 38%, 70% 59%, 82% 100%, 50% 74%, 18% 100%, 30% 59%, 0 38%, 38% 35%)" } },
  { id: "shoe", label: "shoe clue", style: { left: "29%", top: "70%", width: "31%", height: "16%", clipPath: "ellipse(48% 45% at 50% 50%)" } },
  { id: "box", label: "box clue", style: { left: "62%", top: "69%", width: "27%", height: "19%", clipPath: "polygon(8% 18%, 88% 0, 96% 90%, 12% 100%)" } },
] as const;

function Celebration({ title }: { title: string }) {
  return <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-500 via-detective-orange-500 to-detective-yellow-400 px-6 py-5 text-center text-white shadow-lg">
    <div className="animate-bounce text-3xl" aria-hidden="true">🎉 ✨ 🥳 ✨ 🎉</div>
    <p className="mt-2 font-display text-xl font-bold">{title}</p>
    <p className="mt-1 font-semibold text-white/90">Fantastic detective work!</p>
  </div>;
}

export function ColourQuesty() {
  const [colour, setColour] = useState(PALETTE[0]);
  const [painted, setPainted] = useState<Record<string, string>>({});
  const complete = COLOUR_AREAS.every((area) => painted[area.id]);

  return <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
    <div className="flex items-center justify-between gap-3"><div><p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">Colour Questy</p><h3 className="font-display text-2xl font-bold text-detective-blue-900">Tap and colour Questy&apos;s detective desk</h3></div><Palette className="h-9 w-9 text-detective-orange-500" aria-hidden="true" /></div>
    <p className="mt-2 text-detective-blue-700/85">Choose a colour, then tap each part of the supplied colouring page.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-inner">
        <img src="/api/activities/world-one-colouring" alt="Questy detective colouring page" className="block w-full" />
        {COLOUR_AREAS.map((area) => <button key={area.id} type="button" aria-label={"Colour " + area.label} onClick={() => setPainted((current) => ({ ...current, [area.id]: colour }))} className="absolute opacity-70 transition-opacity hover:opacity-90 focus:opacity-90" style={{ ...area.style, backgroundColor: painted[area.id] ?? "transparent" }} />)}
      </div>
      <div className="flex max-w-64 flex-wrap justify-center gap-3">
        {PALETTE.map((item) => <button key={item} type="button" aria-label={"Use colour " + item} aria-pressed={colour === item} onClick={() => setColour(item)} className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour === item ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: item }} />)}
        <a href="/api/activities/world-one-colouring" download="questy-colouring-page.png" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-4 py-2 font-display text-sm font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true"/>Download / print</a>
        <button type="button" onClick={() => setPainted({})} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Start again</button>
      </div>
    </div>
    {complete && <Celebration title="You coloured every clue!" />}
  </section>;
}

const JIGSAW_PIECES = Array.from({ length: 12 }, (_, index) => index);
const MIXED_PIECES = [7, 1, 10, 4, 0, 8, 3, 11, 5, 9, 2, 6];
const LOGO_IMAGE = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#fff7ed"/><path d="M247 63c18-22 13-42 13-42-21 2-39 15-49 32-9 16-5 35-5 35 16 1 31-7 41-25z" fill="#22c55e"/><path d="M204 82c-38-43-110-32-129 17-14 35-4 76 18 109 25 38 56 78 91 78 18 0 25-11 46-11 20 0 27 11 46 11 35 0 63-38 85-76 20-34 31-76 17-112-20-50-90-58-127-16-12 13-18 13-47 0z" fill="#ef4444"/></svg>');
function sliceStyle(piece: number) { const column = piece % 4; const row = Math.floor(piece / 4); return { backgroundImage: `url("${LOGO_IMAGE}")`, backgroundSize: "400% 300%", backgroundPosition: `${column * (100 / 3)}% ${row * 50}%` }; }

export function FamousLogoJigsaw() {
  const [selected, setSelected] = useState<number | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const complete = placed.length === JIGSAW_PIECES.length;
  function tryPlace(slot: number, piece = selected) {
    if (piece === null || placed.includes(slot)) return;
    if (piece !== slot) { setMessage("That piece does not fit there yet. Try another space."); return; }
    setPlaced((current) => [...current, slot]); setSelected(null); setMessage("Great fit! Keep building the logo.");
  }
  return <section className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8">
    <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-500">Famous logo jigsaw</p><h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">Rebuild the hidden logo — 12 mixed pieces</h3><p className="mt-2 text-detective-blue-700/85">Tap a mixed piece, then tap where it belongs. On a computer, you can also drag it.</p>
    <div className="mt-7 grid gap-7 lg:grid-cols-2">
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Puzzle board</p><div className="grid grid-cols-4 overflow-hidden rounded-2xl border-4 border-detective-blue-300 bg-detective-blue-50">{JIGSAW_PIECES.map((slot) => <button key={slot} type="button" onClick={() => tryPlace(slot)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); tryPlace(slot, Number(event.dataTransfer.getData("piece"))); }} className="aspect-square border border-detective-blue-200 bg-white p-0">{placed.includes(slot) ? <span className="block h-full w-full" style={sliceStyle(slot)} /> : <span className="font-display text-xl text-detective-blue-200">?</span>}</button>)}</div></div>
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Mixed pieces</p><div className="grid grid-cols-4 gap-2">{MIXED_PIECES.filter((piece) => !placed.includes(piece)).map((piece) => <button key={piece} type="button" draggable onDragStart={(event) => event.dataTransfer.setData("piece", String(piece))} onClick={() => { setSelected(piece); setMessage("Now tap the matching puzzle space."); }} className={"aspect-square overflow-hidden rounded-xl border-2 shadow-sm transition-transform hover:-translate-y-1 " + (selected === piece ? "border-detective-orange-500 ring-4 ring-detective-orange-200" : "border-detective-blue-300")}><span className="block h-full w-full" style={sliceStyle(piece)} /></button>)}</div><button type="button" onClick={() => { setSelected(null); setPlaced([]); setMessage(""); }} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-5 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Mix again</button></div>
    </div>
    {complete ? <Celebration title="You solved the famous-logo jigsaw!" /> : message && <p className="mt-5 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900"><Sparkles className="mr-2 inline h-5 w-5" aria-hidden="true"/>{message}</p>}
  </section>;
}
