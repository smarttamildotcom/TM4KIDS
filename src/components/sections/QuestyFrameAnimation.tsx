"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Zone = "idle" | "left" | "center" | "right";

const TOTAL_FRAMES = 192;
const FPS = 24;
const FRAME_MS = 1000 / FPS;
const frameSrc = (frame: number) => `/frame_${String(frame).padStart(4, "0")}.webp`;

// Ranges follow the approved 8-second source animation.
const SEQUENCES: Record<Zone, number[]> = {
  idle: [1],
  left: Array.from({ length: 48 }, (_, i) => i + 25),
  center: Array.from({ length: 48 }, (_, i) => i + 121),
  right: Array.from({ length: 48 }, (_, i) => i + 73),
};

export function QuestyFrameAnimation() {
  const [frame, setFrame] = useState(1);
  const [zone, setZone] = useState<Zone>("idle");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const stopPlayback = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const play = useCallback((nextZone: Zone) => {
    stopPlayback();
    setZone(nextZone);
    indexRef.current = 0;
    const sequence = SEQUENCES[nextZone];
    setFrame(sequence[0]);
    if (sequence.length === 1) return;
    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= sequence.length) {
        stopPlayback();
        return;
      }
      setFrame(sequence[indexRef.current]);
    }, FRAME_MS);
  }, [stopPlayback]);

  const scheduleIdle = useCallback(() => {
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => play("idle"), 2000);
  }, [play]);

  useEffect(() => {
    // Preload all frames to prevent first-interaction flicker.
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 1) {
      const img = new Image();
      img.src = frameSrc(i);
      images.push(img);
    }
    return () => {
      stopPlayback();
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, [stopPlayback]);

  const chooseZone = useCallback((clientX: number, rect: DOMRect) => {
    const position = (clientX - rect.left) / rect.width;
    const nextZone: Zone = position < 1 / 3 ? "left" : position > 2 / 3 ? "right" : "center";
    if (nextZone !== zone) play(nextZone);
    scheduleIdle();
  }, [play, scheduleIdle, zone]);

  return (
    <div
      className="relative mx-auto flex h-[300px] w-full max-w-sm touch-manipulation select-none items-center justify-center sm:h-[360px]"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        chooseZone(event.clientX, event.currentTarget.getBoundingClientRect());
      }}
      onPointerLeave={() => play("idle")}
      onClick={() => play("center")}
      role="img"
      aria-label="Questy, the IP2Kids detective mascot. Move the pointer left, centre or right to interact with Questy."
    >
      <div aria-hidden="true" className="absolute inset-x-4 top-6 -z-10 h-[78%] rounded-[45%] bg-detective-orange-100" />
      <img
        src={frameSrc(frame)}
        alt=""
        draggable={false}
        className="block h-full w-full object-contain object-center drop-shadow-2xl"
      />
      <span className="sr-only">Current interaction: {zone}</span>
    </div>
  );
}
