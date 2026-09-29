"use client";

import Image from "next/image";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Spot = { left: { x: number; y: number }; right: { x: number; y: number }; radius: number };

// The artwork contains more than seven valid visual changes. All known valid
// targets are clickable; the challenge completes as soon as any seven are found.
const spots: Spot[] = [
  { left: { x: 39.5, y: 13.4 }, right: { x: 89.8, y: 13.4 }, radius: 4.8 },
  { left: { x: 46.3, y: 8.2 }, right: { x: 96.5, y: 8.2 }, radius: 5.5 },
  { left: { x: 22.1, y: 47.9 }, right: { x: 72.6, y: 47.9 }, radius: 5.0 },
  { left: { x: 14.0, y: 62.0 }, right: { x: 64.5, y: 62.0 }, radius: 6.0 },
  { left: { x: 34.3, y: 55.0 }, right: { x: 84.8, y: 55.0 }, radius: 5.0 },
  { left: { x: 43.9, y: 65.0 }, right: { x: 94.3, y: 65.0 }, radius: 6.0 },
  // Questy's eye difference.
  { left: { x: 30.4, y: 74.8 }, right: { x: 80.5, y: 74.8 }, radius: 6.5 },
  // Ladybug: absent on the left, present at the bottom-right on the right.
  // The paired left coordinate marks the corresponding location in the first panel.
  { left: { x: 41.5, y: 93.0 }, right: { x: 91.5, y: 93.0 }, radius: 7.0 },
];

export function SpotDifferences() {
  const [found, setFound] = useState<number[]>([]);
  const [msg, setMsg] = useState("Tap a difference on either picture.");
  const [miss, setMiss] = useState<{ x: number; y: number } | null>(null);
  const complete = found.length >= 7;

  const click = (e: React.MouseEvent<HTMLDivElement>) => {
    if (complete) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    let hit = -1;

    spots.forEach((s, i) => {
      if (found.includes(i)) return;
      const dl = Math.hypot(x - s.left.x, y - s.left.y);
      const dr = Math.hypot(x - s.right.x, y - s.right.y);
      if (Math.min(dl, dr) <= s.radius) hit = i;
    });

    if (hit >= 0) {
      const nextCount = found.length + 1;
      setFound((v) => [...v, hit]);
      setMiss(null);
      setMsg(nextCount >= 7 ? "Case cracked! You found 7 differences!" : "Difference found! Keep looking, Detective.");
    } else {
      setMiss({ x, y });
      setMsg("Look a little closer, Detective!");
      window.setTimeout(() => setMiss(null), 650);
    }
  };

  const reset = () => {
    setFound([]);
    setMiss(null);
    setMsg("Tap a difference on either picture.");
  };

  return (
    <div className="mt-6">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl bg-sky-50 px-4 py-3">
        <p className="font-display font-bold text-detective-blue-900">🔎 Differences found</p>
        <p className="font-display text-2xl font-bold text-detective-orange-600">{Math.min(found.length, 7)} / 7</p>
      </div>
      <div onClick={click} className="relative mx-auto mt-4 max-w-5xl cursor-crosshair touch-manipulation select-none overflow-hidden rounded-3xl border-4 border-detective-blue-100 bg-white shadow-sm">
        <Image src="/cases/world-3/spot-7-differences.png" alt="Questy's Spot 7 Differences challenge" width={1536} height={1024} sizes="(max-width:1024px) 100vw,1000px" className="h-auto w-full" draggable={false} />
        {found.flatMap((i) => [spots[i].left, spots[i].right].map((p, j) => (
          <span key={`${i}-${j}`} className="pointer-events-none absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-green-500 bg-white/80 font-display text-lg font-bold text-green-700 sm:h-11 sm:w-11" style={{ left: `${p.x}%`, top: `${p.y}%` }}>✓</span>
        )))}
        {miss && <span className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-4 border-detective-orange-400" style={{ left: `${miss.x}%`, top: `${miss.y}%` }} />}
      </div>
      <p className="mx-auto mt-4 max-w-2xl rounded-2xl bg-detective-yellow-100 p-4 font-display font-bold">Questy: {msg}</p>
      {complete && <div className="mx-auto mt-5 max-w-2xl rounded-3xl bg-gradient-to-br from-yellow-100 to-sky-100 p-6"><p className="text-5xl">🏅</p><h3 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">EAGLE-EYE CREATOR DETECTIVE</h3><p className="mt-2">You spotted seven differences. Brilliant detective eyes!</p></div>}
      <button onClick={reset} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-detective-blue-200 px-6 font-display font-bold"><RotateCcw className="h-4 w-4" />PLAY AGAIN</button>
    </div>
  );
}
