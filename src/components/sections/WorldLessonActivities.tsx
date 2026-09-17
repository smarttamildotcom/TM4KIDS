"use client";

import { useRef, useState } from "react";
import { Download, Palette, RotateCcw, Sparkles, Undo2 } from "lucide-react";

const PALETTE = [
  { name: "Pure White", value: "#FFFFFF" },
  { name: "Sunburst Yellow", value: "#FFEA00" },
  { name: "Electric Orange", value: "#FF6D00" },
  { name: "Vivid Tomato Red", value: "#FF1744" },
  { name: "Hot Magenta Pink", value: "#F50057" },
  { name: "Bright Violet", value: "#7000FF" },
  { name: "Electric Blue", value: "#2979FF" },
  { name: "Sky Cyan Blue", value: "#00B0FF" },
  { name: "Laser Turquoise", value: "#00E5FF" },
  { name: "Neon Lime Green", value: "#00E676" },
  { name: "Kelly Green", value: "#00C853" },
  { name: "Jet Black", value: "#000000" },
] as const;

function Celebration({ title }: { title: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-500 via-detective-orange-500 to-detective-yellow-400 px-6 py-5 text-center text-white shadow-lg">
      <div className="animate-bounce text-3xl" aria-hidden="true">🎉 ✨ 🥳 ✨ 🎉</div>
      <p className="mt-2 font-display text-xl font-bold">{title}</p>
      <p className="mt-1 font-semibold text-white/90">Fantastic detective work!</p>
    </div>
  );
}

function isPrintedOutline(data: Uint8ClampedArray, pixel: number): boolean {
  const offset = pixel * 4;
  return data[offset] < 190 && data[offset + 1] < 190 && data[offset + 2] < 190;
}

/** Builds a slightly widened outline mask so JPEG anti-aliasing never lets paint leak between areas. */
function buildOutlineMask(data: Uint8ClampedArray, width: number, height: number): Uint8Array {
  const original = new Uint8Array(width * height);
  const mask = new Uint8Array(width * height);

  for (let pixel = 0; pixel < original.length; pixel += 1) {
    if (isPrintedOutline(data, pixel)) original[pixel] = 1;
  }

  // A two-pixel safety border closes tiny breaks introduced by JPEG compression.
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      if (!original[pixel]) continue;
      for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
        for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
          if (offsetX * offsetX + offsetY * offsetY > 4) continue;
          const nextX = x + offsetX;
          const nextY = y + offsetY;
          if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height) {
            mask[nextY * width + nextX] = 1;
          }
        }
      }
    }
  }

  return mask;
}

function hexToRgb(value: string): [number, number, number] {
  const hex = value.slice(1);
  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
  ];
}

export function ColourQuesty({ worldId = 1 }: { worldId?: number }) {
  const [colour, setColour] = useState<(typeof PALETTE)[number]>(PALETTE[0]);
  const [ready, setReady] = useState(false);
  const [filledAreas, setFilledAreas] = useState(0);
  const [canUndo, setCanUndo] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const outlineRef = useRef<Uint8Array | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  function drawOriginal() {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(image, 0, 0);
    const original = context.getImageData(0, 0, canvas.width, canvas.height);
    outlineRef.current = buildOutlineMask(original.data, canvas.width, canvas.height);
    historyRef.current = [];
    setCanUndo(false);
    setReady(true);
  }

  function undoLastFill() {
    const canvas = canvasRef.current;
    const previous = historyRef.current.pop();
    const context = canvas?.getContext("2d");
    if (!canvas || !previous || !context) return;
    context.putImageData(previous, 0, 0);
    setCanUndo(historyRef.current.length > 0);
    setFilledAreas((current) => Math.max(0, current - 1));
  }

  function floodFill(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const outline = outlineRef.current;
    if (!canvas || !outline || !ready) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((event.clientY - rect.top) * (canvas.height / rect.height));
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const startPoint = y * canvas.width + x;
    if (outline[startPoint]) return;

    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = image;
    const [red, green, blue] = hexToRgb(colour.value);
    const visited = new Uint8Array(width * height);
    const queue = [startPoint];
    let cursor = 0;
    let painted = 0;

    while (cursor < queue.length) {
      const point = queue[cursor++];
      if (visited[point] || outline[point]) continue;
      visited[point] = 1;
      const offset = point * 4;
      data[offset] = red;
      data[offset + 1] = green;
      data[offset + 2] = blue;
      data[offset + 3] = 255;
      painted += 1;

      const pointX = point % width;
      const pointY = Math.floor(point / width);
      if (pointX > 0) queue.push(point - 1);
      if (pointX < width - 1) queue.push(point + 1);
      if (pointY > 0) queue.push(point - width);
      if (pointY < height - 1) queue.push(point + width);
    }

    if (!painted) return;
    historyRef.current = [...historyRef.current.slice(-9), snapshot];
    context.putImageData(image, 0, 0);
    setCanUndo(true);
    setFilledAreas((current) => Math.min(9, current + 1));
  }

  return <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
    <div className="flex items-center justify-between gap-3"><div><p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">Colour Questy</p><h3 className="font-display text-2xl font-bold text-detective-blue-900">Tap and colour Questy&apos;s detective desk</h3></div><Palette className="h-9 w-9 text-detective-orange-500" aria-hidden="true" /></div>
    <p className="mt-2 text-detective-blue-700/85">Choose a colour, then tap inside one enclosed area. Reinforced outlines keep each picture section separate.</p>
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-inner">
        <img ref={imageRef} src={`/api/activities/colouring/${worldId}`} alt="" onLoad={drawOriginal} className="hidden" />
        <canvas ref={canvasRef} onPointerDown={floodFill} className={"block w-full touch-none " + (ready ? "cursor-crosshair" : "opacity-0")} aria-label="Tap an outlined area to paint it" />
      </div>
      <div className="flex max-w-64 flex-wrap justify-center gap-3">
        <p className="w-full text-center font-display text-sm font-semibold text-detective-blue-700">Selected: {colour.name}</p>
        {PALETTE.map((item) => <button key={item.value} type="button" aria-label={`Use ${item.name}`} aria-pressed={colour.value === item.value} onClick={() => setColour(item)} className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour.value === item.value ? "ring-detective-blue-700" : "ring-transparent")} style={{ backgroundColor: item.value }} />)}
        <a href={`/api/activities/colouring/${worldId}`} download={`world-${worldId}-questy-colouring-page.jpg`} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-4 py-2 font-display text-sm font-semibold text-white"><Download className="h-4 w-4" aria-hidden="true"/>Download / print</a>
        <button type="button" disabled={!canUndo} onClick={undoLastFill} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-orange-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-orange-700 disabled:cursor-not-allowed disabled:opacity-45"><Undo2 className="h-4 w-4" aria-hidden="true"/>Undo last colour</button>
        <button type="button" onClick={() => { drawOriginal(); setFilledAreas(0); }} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Start again</button>
      </div>
    </div>
    {filledAreas >= 9 && <Celebration title="You coloured Questy&apos;s whole detective desk!" />}
  </section>;
}

const JIGSAW_PIECES = Array.from({ length: 12 }, (_, index) => index);
const MIXED_PIECES = [7, 1, 10, 4, 0, 8, 3, 11, 5, 9, 2, 6];
function sliceStyle(piece: number, imageUrl: string) {
  const column = piece % 4;
  const row = Math.floor(piece / 4);
  // The artwork is square. A centred 4:3 crop keeps it undistorted in the 4×3 board
  // and makes the important part of each picture visible in the mixed pieces.
  return {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "600% auto",
    backgroundPosition: `${(column + 1) * 20}% ${(row + 1.5) * 20}%`,
  };
}

export function FamousLogoJigsaw({ worldId }: { worldId: number }) {
  const puzzleNames: Record<number, string> = { 2: "apple fruit logo", 4: "orange fruit logo", 6: "elephant animal logo", 8: "lion detective logo", 10: "dolphin animal logo", 12: "rainbow toy logo", 14: "fox detective logo" };
  const puzzleName = puzzleNames[worldId] ?? "fruit-and-animal logo";
  const imageUrl = `/api/activities/jigsaw/${worldId}`;
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
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Puzzle board</p><div className="grid grid-cols-4 overflow-hidden rounded-2xl border-4 border-detective-blue-300 bg-detective-blue-50">{JIGSAW_PIECES.map((slot) => <button key={slot} type="button" onClick={() => tryPlace(slot)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); tryPlace(slot, Number(event.dataTransfer.getData("piece"))); }} className="aspect-square border border-detective-blue-200 bg-white p-0">{placed.includes(slot) ? <span className="block h-full w-full" style={sliceStyle(slot, imageUrl)} /> : <span className="font-display text-xl text-detective-blue-200">?</span>}</button>)}</div>{complete && <Celebration title={"You solved the " + puzzleName + " jigsaw!"} />}</div>
      <div><p className="mb-3 font-display font-bold text-detective-blue-900">Mixed pieces</p><div className="grid grid-cols-4 gap-2">{MIXED_PIECES.filter((piece) => !placed.includes(piece)).map((piece) => <button key={piece} type="button" draggable onDragStart={(event) => event.dataTransfer.setData("piece", String(piece))} onClick={() => { setSelected(piece); setMessage("Now tap the matching puzzle space."); }} className={"aspect-square overflow-hidden rounded-xl border-2 shadow-sm transition-transform hover:-translate-y-1 " + (selected === piece ? "border-detective-orange-500 ring-4 ring-detective-orange-200" : "border-detective-blue-300")}><span className="block h-full w-full" style={sliceStyle(piece, imageUrl)} /></button>)}</div><button type="button" onClick={() => { setSelected(null); setPlaced([]); setMessage(""); }} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-5 py-2 font-display text-sm font-semibold text-detective-blue-700"><RotateCcw className="h-4 w-4" aria-hidden="true"/>Mix again</button></div>
    </div>
    {!complete && message && <p className="mt-5 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900"><Sparkles className="mr-2 inline h-5 w-5" aria-hidden="true"/>{message}</p>}
  </section>;
}