"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

const IMAGE = "/cases/world-2/Puzzle.png";

export function CreatorParkPuzzle({ onFile }: { onFile: () => void }) {
  const solved = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  const [order, setOrder] = useState(() => [...solved].sort(() => Math.random() - 0.5));
  const [selected, setSelected] = useState<number | null>(null);
  const complete = order.every((v, i) => v === i);
  const choose = (index: number) => {
    if (complete) return;
    if (selected === null) { setSelected(index); return; }
    if (selected === index) { setSelected(null); return; }
    setOrder(current => { const next=[...current]; [next[selected],next[index]]=[next[index],next[selected]]; return next; });
    setSelected(null);
  };
  const shuffle = () => { setOrder([...solved].sort(() => Math.random() - 0.5)); setSelected(null); };
  return <section className="rounded-3xl bg-white p-4 text-center shadow-sm sm:p-6">
    <p className="font-display font-bold uppercase tracking-widest text-detective-orange-600">🎁 REWARD ACTIVITY</p>
    <h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">Creator Park Puzzle</h2>
    <p className="mx-auto mt-2 max-w-2xl text-lg text-detective-blue-900">Put the 12 pieces back in the right places. Tap one piece, then another, to swap them.</p>
    <div className="mx-auto mt-6 grid aspect-[3/2] w-full max-w-3xl grid-cols-4 grid-rows-3 overflow-hidden rounded-2xl border-4 border-detective-blue-900 bg-sky-50">
      {order.map((piece, index) => {
        const col=piece%4, row=Math.floor(piece/4);
        return <button key={index} type="button" onClick={()=>choose(index)} aria-label={`Puzzle position ${index+1}`} className={`relative overflow-hidden border border-white/70 ${selected===index?"z-10 ring-4 ring-inset ring-detective-orange-500":""}`}>
          <span className="absolute" style={{ width:"400%", height:"300%", left:`-${col*100}%`, top:`-${row*100}%` }}><Image src={IMAGE} alt="" fill sizes="768px" className="object-fill" draggable={false}/></span>
        </button>;
      })}
    </div>
    {complete && <div className="mx-auto mt-5 max-w-2xl rounded-2xl bg-green-100 p-4 font-display text-xl font-bold text-green-800">🎉 Puzzle solved! Great work, Detective!</div>}
    <div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={shuffle} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-detective-blue-200 px-5 font-display font-bold"><RotateCcw className="h-5 w-5"/>SHUFFLE AGAIN</button><button type="button" onClick={onFile} className="min-h-12 rounded-full bg-detective-blue-900 px-6 font-display font-bold text-white">VIEW CASE FILE</button></div>
  </section>;
}
