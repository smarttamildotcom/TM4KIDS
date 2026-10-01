"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

type ReadToMeButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function ReadToMeButton({ text, label = "Read to me", className = "" }: ReadToMeButtonProps) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported || !text.trim()) return null;

  const start = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\s+/g, " ").trim());
    utterance.lang = "en-SG";
    utterance.rate = 0.92;
    utterance.pitch = 1.04;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.lang.toLowerCase().startsWith("en-sg"))
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb"))
      ?? voices.find((voice) => voice.lang.toLowerCase().startsWith("en"))
      ?? null;
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setState("speaking");
  };

  const pauseOrResume = () => {
    if (state === "speaking") {
      window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("speaking");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setState("idle");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {state === "idle" ? (
        <button type="button" onClick={start} className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-4 py-2 font-display font-bold text-detective-blue-800 shadow-sm transition hover:border-detective-orange-400 hover:bg-detective-yellow-50" aria-label={`${label}. Listen to this text`}>
          <Volume2 className="h-5 w-5" aria-hidden="true" /> 🔊 {label}
        </button>
      ) : (
        <>
          <button type="button" onClick={pauseOrResume} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-detective-blue-700 px-4 py-2 font-display font-bold text-white">
            {state === "speaking" ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
            {state === "speaking" ? "Pause" : "Continue"}
          </button>
          <button type="button" onClick={stop} className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-4 py-2 font-display font-bold text-detective-blue-800">
            <Square className="h-4 w-4" aria-hidden="true" /> Stop
          </button>
        </>
      )}
    </div>
  );
}
