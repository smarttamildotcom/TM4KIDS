"use client";

import { useState } from "react";
import { RotateCcw, Undo2 } from "lucide-react";

const palette = ["#ffb347", "#ffdf62", "#f77288", "#8bc8ff", "#9bdd8b", "#b7a1ed", "#58d2c8", "#c48b62"];
const regions = ["questy-hat", "questy-scarf", "detective-hat", "art-tent", "inventions-tent", "stories-tent", "brands-tent", "idea-day-banner"] as const;
const initial: Record<string, string> = {};
const ink = "#193b61";

export function CreatorParkColouring({ onReturn, onFile }: { onReturn: () => void; onFile: () => void }) {
  const [colour, setColour] = useState(palette[0]);
  const [fills, setFills] = useState<Record<string, string>>(initial);
  const [history, setHistory] = useState<Record<string, string>[]>([]);
  const paint = (id: string) => {
    if (fills[id] === colour) return;
    setHistory(previous => [...previous, fills]);
    setFills(previous => ({ ...previous, [id]: colour }));
  };
  const undo = () => { if (!history.length) return; setFills(history[history.length - 1]); setHistory(history.slice(0, -1)); };
  const reset = () => { if (!Object.keys(fills).length) return; setHistory(previous => [...previous, fills]); setFills({}); };
  const region = (id: typeof regions[number], path: string, label: string) => <path key={id} d={path} fill={fills[id] ?? "white"} stroke={ink} strokeWidth="3" strokeLinejoin="round" role="button" tabIndex={0} aria-label={`Colour ${label}`} onClick={() => paint(id)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); paint(id); } }} className="cursor-pointer outline-none focus-visible:stroke-[6px]" />;
  return <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-7">
    <h2 className="font-display text-3xl font-bold text-detective-blue-900">🎨 COLOUR CREATOR PARK!</h2><p className="mt-2 text-lg">Questy: “Idea Day needs some colour!” Choose a colour, then tap a tent, hat, scarf or banner. This activity is optional.</p>
    <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
      <svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-2xl border-2 border-detective-blue-100 bg-white" aria-label="Creator Park colouring activity with eight separate areas" role="group">
        <path d="M0 0H800V560H0Z" fill="#fff" />
        <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round"><path d="M0 390q170-45 350 0t450 0M0 460q300-70 800 0" /><path d="M45 158V80m0 30q-26-35-33-12m33 12q38-48 56-12M744 162V67m0 25q-30-38-53-22m53 22q31-42 49-26" /><circle cx="115" cy="92" r="17" /><circle cx="690" cy="86" r="16" /><path d="M395 187v47m-33-20h66" /></g>
        {region("idea-day-banner", "M230 35 Q400 55 570 35 L570 124 Q400 105 230 124 Z", "IDEA DAY banner")}
        <text x="400" y="87" textAnchor="middle" fill={ink} fontWeight="bold" fontSize="35" pointerEvents="none">IDEA DAY</text>
        <g fill="none" stroke={ink} strokeWidth="3"><path d="M22 325L100 202L178 325M214 325L292 202L370 325M430 325L508 202L586 325M622 325L700 202L778 325" /><path d="M25 325V410h150v-85M217 325v85h150v-85M433 325v85h150v-85M625 325v85h150v-85" /></g>
        {region("art-tent", "M22 325L100 202L178 325Z", "ART tent")}
        {region("inventions-tent", "M214 325L292 202L370 325Z", "INVENTIONS tent")}
        {region("stories-tent", "M430 325L508 202L586 325Z", "STORIES tent")}
        {region("brands-tent", "M622 325L700 202L778 325Z", "BRANDS tent")}
        <g fill={ink} textAnchor="middle" fontWeight="bold" fontSize="18" pointerEvents="none"><text x="100" y="378">ART</text><text x="292" y="378" fontSize="14">INVENTIONS</text><text x="508" y="378">STORIES</text><text x="700" y="378">BRANDS</text></g>
        {/* Questy: neutral cat face and body; hat and scarf are separate enclosed paths. */}
        <g fill="white" stroke={ink} strokeWidth="3" strokeLinejoin="round"><path d="M245 530q-15-74 25-98h90q41 29 24 98Z" /><path d="M262 451q-25-26-16-70l20-36 27 17q22-10 44 0l27-17 20 36q7 49-20 70-49 42-102 0Z" /><ellipse cx="295" cy="415" rx="4" ry="6" fill={ink} /><ellipse cx="344" cy="415" rx="4" ry="6" fill={ink} /><path d="M310 435l10 6 10-6m-10 6v8m-14 0q14 13 28 0" fill="none" /></g>
        {region("questy-hat", "M254 375q4-64 63-64t66 64l16 8q-77 17-161 0Z", "Questy’s detective hat")}
        {region("questy-scarf", "M269 462q51 23 96 0l-8 29-32-10-15 36-12-37-22 8Z", "Questy’s scarf")}
        {/* The child's face, hair, body and magnifier remain neutral. */}
        <g fill="white" stroke={ink} strokeWidth="3"><path d="M456 530q-9-76 53-89h39q67 20 57 89Z" /><circle cx="529" cy="416" r="49" /><path d="M494 415q-6-42 35-40 43-3 36 40" fill="none" /><circle cx="516" cy="421" r="3" fill={ink} /><circle cx="544" cy="421" r="3" fill={ink} /><path d="M520 441q11 9 20 0" fill="none" /><circle cx="618" cy="465" r="22" /><path d="M603 481l-22 28" /></g>
        {region("detective-hat", "M478 391q9-57 49-60 43 0 55 60l16 6q-60 15-136 0Z", "the child detective’s hat")}
        <text x="400" y="550" textAnchor="middle" fill={ink} fontSize="16">Colour each area to make Idea Day your own!</text>
      </svg>
      <div className="flex flex-wrap content-start gap-2" aria-label="Colour palette">{palette.map(item => <button key={item} type="button" aria-label={`Select colour ${item}`} aria-pressed={colour === item} onClick={() => setColour(item)} style={{ backgroundColor: item }} className={`h-12 w-12 rounded-full border-4 border-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-blue-700 ${colour === item ? "ring-4 ring-detective-blue-700" : "ring-2 ring-detective-blue-100"}`} />)}<button type="button" onClick={undo} disabled={!history.length} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 font-display font-bold text-detective-blue-900 disabled:opacity-40"><Undo2 className="h-5 w-5" />↶ UNDO</button><button type="button" onClick={reset} disabled={!Object.keys(fills).length} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 font-display font-bold text-detective-blue-900 disabled:opacity-40"><RotateCcw className="h-5 w-5" />Reset</button></div>
    </div><p className="mt-4 text-sm text-detective-blue-700">The approved Creator Park artwork is preserved as reference; this simplified activity has eight independently colourable areas.</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={onFile} className="min-h-12 rounded-full border-2 border-detective-blue-200 px-5 font-display font-bold">VIEW CASE FILE</button><button type="button" onClick={onReturn} className="min-h-12 rounded-full bg-detective-blue-600 px-5 font-display font-bold text-white">RETURN TO IDEA CITY →</button></div>
  </section>;
}
