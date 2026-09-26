"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Undo2 } from "lucide-react";

const palette = [
  { name: "Red", value: "#ef4444" },
  { name: "Black", value: "#111827" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#facc15" },
  { name: "Light Blue", value: "#7dd3fc" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#f472b6" },
  { name: "Brown", value: "#92400e" },
  { name: "Grey", value: "#9ca3af" },
];

const IMAGE_SRC = "/cases/world-1/creator-park-colouring.png";

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

export function CreatorParkColouring({ onReturn, onFile }: { onReturn: () => void; onFile: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalRef = useRef<ImageData | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const [colour, setColour] = useState(palette[0].value);
  const [historyCount, setHistoryCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = IMAGE_SRC;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);
      originalRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current = [];
      setHistoryCount(0);
      setReady(true);
    };
  }, []);

  const paintRegion = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const startX = Math.max(0, Math.min(canvas.width - 1, Math.floor((event.clientX - rect.left) * canvas.width / rect.width)));
    const startY = Math.max(0, Math.min(canvas.height - 1, Math.floor((event.clientY - rect.top) * canvas.height / rect.height)));
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const before = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
    const data = imageData.data;
    const start = (startY * canvas.width + startX) * 4;
    const sr = data[start], sg = data[start + 1], sb = data[start + 2];

    // Protect dark line art and text. Only contiguous light paper areas are colourable.
    if ((sr + sg + sb) / 3 < 145) return;

    const fill = hexToRgb(colour);
    const tolerance = 34;
    const matches = (index: number) =>
      Math.abs(data[index] - sr) <= tolerance &&
      Math.abs(data[index + 1] - sg) <= tolerance &&
      Math.abs(data[index + 2] - sb) <= tolerance &&
      (data[index] + data[index + 1] + data[index + 2]) / 3 >= 145;

    const visited = new Uint8Array(canvas.width * canvas.height);
    const stack: number[] = [startY * canvas.width + startX];
    let changed = 0;

    while (stack.length) {
      const pixel = stack.pop()!;
      if (visited[pixel]) continue;
      visited[pixel] = 1;
      const index = pixel * 4;
      if (!matches(index)) continue;

      // Preserve the printed shading while tinting the selected enclosed region.
      const luminance = (data[index] + data[index + 1] + data[index + 2]) / (3 * 255);
      data[index] = Math.round(fill.r * (0.72 + 0.28 * luminance));
      data[index + 1] = Math.round(fill.g * (0.72 + 0.28 * luminance));
      data[index + 2] = Math.round(fill.b * (0.72 + 0.28 * luminance));
      changed++;

      const x = pixel % canvas.width;
      const y = Math.floor(pixel / canvas.width);
      if (x > 0) stack.push(pixel - 1);
      if (x < canvas.width - 1) stack.push(pixel + 1);
      if (y > 0) stack.push(pixel - canvas.width);
      if (y < canvas.height - 1) stack.push(pixel + canvas.width);
    }

    if (changed) {
      historyRef.current.push(before);
      if (historyRef.current.length > 20) historyRef.current.shift();
      ctx.putImageData(imageData, 0, 0);
      setHistoryCount(historyRef.current.length);
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const previous = historyRef.current.pop();
    if (!canvas || !previous) return;
    canvas.getContext("2d")?.putImageData(previous, 0, 0);
    setHistoryCount(historyRef.current.length);
  };

  const reset = () => {
    const canvas = canvasRef.current;
    const original = originalRef.current;
    if (!canvas || !original) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    if (historyRef.current.length === 0) {
      const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(current);
    }
    ctx.putImageData(original, 0, 0);
    setHistoryCount(historyRef.current.length);
  };

  return <section className="rounded-3xl bg-white p-3 shadow-sm sm:p-5 md:p-7">
    <h2 className="font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">🎨 COLOUR CREATOR PARK!</h2>
    <p className="mt-2 text-base sm:text-lg">Questy: “Idea Day needs some colour!” Choose a colour, then tap an area to colour it. This activity is optional.</p>

    <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-5">
      <div className="min-w-0 overflow-hidden rounded-2xl border-2 border-detective-blue-100 bg-white">
        <canvas
          ref={canvasRef}
          onPointerDown={paintRegion}
          aria-label="Creator Park colouring canvas. Select a colour and tap an enclosed area to colour it."
          className="block h-auto w-full touch-manipulation cursor-crosshair select-none"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-9 lg:grid-cols-3" aria-label="Colour palette">
          {palette.map(item => <button
            key={item.name}
            type="button"
            title={item.name}
            aria-label={`Select ${item.name}`}
            aria-pressed={colour === item.value}
            onClick={() => setColour(item.value)}
            style={{ backgroundColor: item.value }}
            className={`aspect-square min-h-10 min-w-10 rounded-full border-4 border-white shadow focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-blue-700 ${colour === item.value ? "ring-4 ring-detective-blue-700" : "ring-2 ring-detective-blue-100"}`}
          />)}
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          <button type="button" onClick={undo} disabled={!historyCount} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 px-3 font-display font-bold text-detective-blue-900 disabled:opacity-40"><Undo2 className="h-5 w-5" />UNDO</button>
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 px-3 font-display font-bold text-detective-blue-900"><RotateCcw className="h-5 w-5" />Reset</button>
        </div>
      </div>
    </div>

    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button type="button" onClick={onFile} className="min-h-12 rounded-full border-2 border-detective-blue-200 px-5 font-display font-bold">VIEW CASE FILE</button>
      <button type="button" onClick={onReturn} className="min-h-12 rounded-full bg-detective-blue-600 px-5 font-display font-bold text-white">RETURN TO IDEA CITY →</button>
    </div>
  </section>;
}
