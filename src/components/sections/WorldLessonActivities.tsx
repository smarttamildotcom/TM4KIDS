"use client";

import { useRef, useState } from "react";
import { Download, Palette, RotateCcw, Sparkles } from "lucide-react";

const PALETTE = ["#ef4444", "#f97316", "#facc15", "#4ade80", "#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#92400e", "#ffffff"];

function Celebration({ title }: { title: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-500 via-detective-orange-500 to-detective-yellow-400 px-6 py-5 text-center text-white shadow-lg">
      <div className="animate-bounce text-3xl" aria-hidden="true">🎉 ✨ 🥳 ✨ 🎉</div>
      <p className="mt-2 font-display text-xl font-bold">{title}</p>
      <p className="mt-1 font-semibold text-white/90">Fantastic detective work!</p>
    </div>
  );
}
export function ColourQuesty() {
  const [colour, setColour] = useState(PALETTE[0]);
  const [ready, setReady] = useState(false);
  const [filledAreas, setFilledAreas] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function drawOriginal() {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d")!.drawImage(image, 0, 0);
    setReady(true);
  }

  function floodFill(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));
    const context = canvas.getContext("2d")!;
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = image;
    const start = (y * width + x) * 4;
    // Dark pixels are the printed outlines. They are never painted.
    if (data[start] < 180 || data[start + 1] < 180 || data[start + 2] < 180) return;

    const [red, green, blue] = colour.match(/\w\w/g)!.map((item) => parseInt(item, 16));
    const visited = new Uint8Array(width * height);
    const queue = [y * width + x];
    let cursor = 0;

    while (cursor < queue.length) {
      const point = queue[cursor++];
      if (visited[point]) continue;
      visited[point] = 1;
      const offset = point * 4;
      // Only white/light paper inside a closed black outline is recoloured.
      if (data[offset] < 180 || data[offset + 1] < 180 || data[offset + 2] < 180) continue;
      data[offset] = red; data[offset + 1] = green; data[offset + 2] = blue; data[offset + 3] = 255;
      const px = point % width;
      const py = Math.floor(point / width);
      if (px > 0) queue.push(point - 1);
      if (px < width - 1) queue.push(point + 1);
      if (py > 0) queue.push(point - width);
      if (py < height - 1) queue.push(point + width);
    }

    context.putImageData(image, 0, 0);
    setFilledAreas((current) => Math.min(9, current + 1));
  }

  return <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
    <div className="flex items-center justify-between gap-3"><div><p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">Colour Questy</p><h3 className="font-display text-2xl font-bold text-detective-blue-900">Tap and colour Questy&apos;s detective desk</h3></div><Palette className="h-9 w-9 text-detective-orange-500" aria-hidden="true" /></div>
    <p className="mt-2 text-detective-blue-700/85">Choose a colour, then tap inside one outlined area. Each tap paints only that enclosed area.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-inner">
        <img ref={imageRef} src="/api/activities/world-one-colouring" alt="" onLoad={drawOriginal} className="hidden" />
        <canvas ref={canvasRef} onPointerDown={floodFill} className={"block w-full touch-none " + (ready ? "cursor-crosshair" : "opacity-0")} aria-label="Tap an outlined area to paint it" />
      </div>
      <div className="flex max-w-64 flex-wrap justify-center gap-3">
        {PALETTE.map((item) => <button key={item} type="button" aria-label={"Use colour " + item} aria-pressed={colour === item} onClick={() => setColour(item)} className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour === item ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: item }} />)}
        <a href="/api/activities/world-one-colouring" download="questy-colouring-page.png" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-4 py-2 font-display text-sm font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true"/>Download / print</a>
        <button type="button" onClick={() => { drawOriginal(); setFilledAreas(0); }} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Start again</button>
      </div>
    </div>
    {filledAreas >= 9 && <Celebration title="You coloured Questy&apos;s whole detective desk!" />}
  </section>;
}

const JIGSAW_PIECES = Array.from({ length: 12 }, (_, index) => index);
const MIXED_PIECES = [7, 1, 10, 4, 0, 8, 3, 11, 5, 9, 2, 6];
const LOGO_IMAGE = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#fff7ed"/><path d="M247 63c18-22 13-42 13-42-21 2-39 15-49 32-9 16-5 35-5 35 16 1 31-7 41-25z" fill="#22c55e"/><path d="M204 82c-38-43-110-32-129 17-14 35-4 76 18 109 25 38 56 78 91 78 18 0 25-11 46-11 20 0 27 11 46 11 35 0 63-38 85-76 20-34 31-76 17-112-20-50-90-58-127-16-12 13-18 13-47 0z" fill="#ef4444"/></svg>');
function sliceStyle(piece: number) { const column = piece % 4; const row = Math.floor(piece / 4); return { backgroundImage: `url("${LOGO_IMAGE}")`, backgroundSize: "400% 300%", backgroundPosition: `${column * (100 / 3)}% ${row * 50}%` }; }

export function FamousLogoJigsaw({ worldId }: { worldId: number }) {
  const puzzleNames = ["Apple fruit logo", "Orange fruit logo", "Paw-print animal logo"];
  const puzzleName = puzzleNames[(worldId / 2 - 1) % puzzleNames.length];
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
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Puzzle board</p><div className="grid grid-cols-4 overflow-hidden rounded-2xl border-4 border-detective-blue-300 bg-detective-blue-50">{JIGSAW_PIECES.map((slot) => <button key={slot} type="button" onClick={() => tryPlace(slot)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); tryPlace(slot, Number(event.dataTransfer.getData("piece"))); }} className="aspect-square border border-detective-blue-200 bg-white p-0">{placed.includes(slot) ? <span className="block h-full w-full" style={sliceStyle(slot)} /> : <span className="font-display text-xl text-detective-blue-200">?</span>}</button>)}</div>{complete && <Celebration title={"You solved the " + puzzleName + " jigsaw!"} />}</div>
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Mixed pieces</p><div className="grid grid-cols-4 gap-2">{MIXED_PIECES.filter((piece) => !placed.includes(piece)).map((piece) => <button key={piece} type="button" draggable onDragStart={(event) => event.dataTransfer.setData("piece", String(piece))} onClick={() => { setSelected(piece); setMessage("Now tap the matching puzzle space."); }} className={"aspect-square overflow-hidden rounded-xl border-2 shadow-sm transition-transform hover:-translate-y-1 " + (selected === piece ? "border-detective-orange-500 ring-4 ring-detective-orange-200" : "border-detective-blue-300")}><span className="block h-full w-full" style={sliceStyle(piece)} /></button>)}</div><button type="button" onClick={() => { setSelected(null); setPlaced([]); setMessage(""); }} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-5 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Mix again</button></div>
    </div>
    {!complete && message && <p className="mt-5 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900"><Sparkles className="mr-2 inline h-5 w-5" aria-hidden="true"/>{message}</p>}
  </section>;
}
