"use client";

import { useState } from "react";
import { RotateCcw, Undo2 } from "lucide-react";

const palette = ["#ffb347", "#ffdf62", "#f77288", "#8bc8ff", "#9bdd8b", "#b7a1ed", "#58d2c8", "#c48b62"];

export function CreatorParkColouring({ onReturn, onFile }: { onReturn: () => void; onFile: () => void }) {
  const [colour, setColour] = useState(palette[0]);
  const [fills, setFills] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);

  const paint = () => {
    setHistory(previous => [...previous, fills]);
    setFills(previous => [...previous, colour]);
  };
  const undo = () => {
    if (!history.length) return;
    setFills(history[history.length - 1]);
    setHistory(history.slice(0, -1));
  };
  const reset = () => {
    if (!fills.length) return;
    setHistory(previous => [...previous, fills]);
    setFills([]);
  };

  return <section className="rounded-3xl bg-white p-4 shadow-sm sm:p-7">
    <h2 className="font-display text-3xl font-bold text-detective-blue-900">🎨 COLOUR CREATOR PARK!</h2>
    <p className="mt-2 text-lg">Questy: “Idea Day needs some colour!” Choose a colour and make Creator Park your own. This activity is optional.</p>

    <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_180px]">
      <div
        className="relative overflow-hidden rounded-2xl border-2 border-detective-blue-100 bg-white"
        aria-label="Approved Creator Park colouring artwork"
      >
        <img
          src="/cases/world-1/creator-park-colouring.png"
          alt="Idea Day at Creator Park with Questy, a Little IP Detective, and Art, Inventions, Stories and Brands stalls"
          className="block h-auto w-full select-none"
          draggable={false}
        />
        {fills.map((fill, index) => (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{ backgroundColor: fill, opacity: 0.10 }}
            aria-hidden="true"
          />
        ))}
        <button
          type="button"
          onClick={paint}
          className="absolute inset-0 cursor-crosshair bg-transparent focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-blue-700"
          aria-label="Apply selected colour to Creator Park artwork"
        />
      </div>

      <div className="flex flex-wrap content-start gap-2" aria-label="Colour palette">
        {palette.map(item => <button key={item} type="button" aria-label={`Select colour ${item}`} aria-pressed={colour === item} onClick={() => setColour(item)} style={{ backgroundColor: item }} className={`h-12 w-12 rounded-full border-4 border-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-blue-700 ${colour === item ? "ring-4 ring-detective-blue-700" : "ring-2 ring-detective-blue-100"}`} />)}
        <button type="button" onClick={undo} disabled={!history.length} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 font-display font-bold text-detective-blue-900 disabled:opacity-40"><Undo2 className="h-5 w-5" />UNDO</button>
        <button type="button" onClick={reset} disabled={!fills.length} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 font-display font-bold text-detective-blue-900 disabled:opacity-40"><RotateCcw className="h-5 w-5" />Reset</button>
      </div>
    </div>

    <p className="mt-4 text-sm text-detective-blue-700">The approved Creator Park artwork is now the colouring canvas.</p>
    <div className="mt-5 flex flex-wrap gap-3">
      <button type="button" onClick={onFile} className="min-h-12 rounded-full border-2 border-detective-blue-200 px-5 font-display font-bold">VIEW CASE FILE</button>
      <button type="button" onClick={onReturn} className="min-h-12 rounded-full bg-detective-blue-600 px-5 font-display font-bold text-white">RETURN TO IDEA CITY →</button>
    </div>
  </section>;
}
