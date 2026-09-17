"use client";

import { useRef, useState } from "react";
import { Download, Palette, RotateCcw, Sparkles } from "lucide-react";

export function ColourQuesty() {
  const [colour, setColour] = useState(PALETTE[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  function position(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  }
  function begin(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    const point = position(event);
    const context = canvas.getContext("2d")!;
    context.beginPath(); context.moveTo(point.x, point.y);
  }
  function paint(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const canvas = canvasRef.current!;
    const point = position(event);
    const context = canvas.getContext("2d")!;
    context.lineCap = "round"; context.lineJoin = "round";
    context.strokeStyle = colour; context.lineWidth = 24;
    context.lineTo(point.x, point.y); context.stroke();
  }
  function clear() {
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
      <div className="flex items-center justify-between gap-3"><div><p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">Colour Questy</p><h3 className="font-display text-2xl font-bold text-detective-blue-900">Paint Questy&apos;s detective desk</h3></div><Palette className="h-9 w-9 text-detective-orange-500" aria-hidden="true" /></div>
      <p className="mt-2 text-detective-blue-700/85">Use any colour and paint directly on the supplied Questy colouring page.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-inner">
          <img src="/api/activities/world-one-colouring" alt="Questy detective colouring page" className="block w-full" onLoad={(event) => { const canvas = canvasRef.current; if (canvas) { canvas.width = event.currentTarget.naturalWidth; canvas.height = event.currentTarget.naturalHeight; } }} />
          <canvas ref={canvasRef} onPointerDown={begin} onPointerMove={paint} onPointerUp={() => { drawing.current = false; }} onPointerLeave={() => { drawing.current = false; }} className="absolute inset-0 h-full w-full touch-none cursor-crosshair" aria-label="Paint on the Questy colouring page" />
        </div>
        <div className="flex max-w-64 flex-wrap justify-center gap-3">
          {PALETTE.map((item) => <button key={item} type="button" aria-label={"Use colour " + item} aria-pressed={colour === item} onClick={() => setColour(item)} className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour === item ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: item }} />)}
          <a href="/api/activities/world-one-colouring" download="questy-colouring-page.png" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-4 py-2 font-display text-sm font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true"/>Download / print</a>
          <button type="button" onClick={clear} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Clear colours</button>
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
