"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Palette, Play, RotateCcw, Sparkles } from "lucide-react";

const VIDEO_SCENES = [
  {
    title: "A brand is a clue",
    caption: "Questy spots a special mark that helps people recognise who made something.",
    icon: "🔍",
    color: "from-sky-400 to-blue-600",
  },
  {
    title: "Clues can look different",
    caption: "A picture, a name, or a special colour can all be brand clues.",
    icon: "⭐",
    color: "from-orange-400 to-rose-500",
  },
  {
    title: "Detectives look closely",
    caption: "Now you can spot clues on everyday things around you!",
    icon: "🕵️",
    color: "from-emerald-400 to-teal-600",
  },
] as const;

const PALETTE = [
  { name: "Sunny yellow", value: "#facc15" },
  { name: "Detective blue", value: "#38bdf8" },
  { name: "Questy orange", value: "#fb923c" },
  { name: "Leaf green", value: "#4ade80" },
  { name: "Purple", value: "#c084fc" },
] as const;

const ZIGZAG_STEPS = [
  { id: 1, clue: "Picture clue", emoji: "⭐" },
  { id: 2, clue: "Name clue", emoji: "Aa" },
  { id: 3, clue: "Colour clue", emoji: "🎨" },
  { id: 4, clue: "Brand detective", emoji: "🕵️" },
] as const;

/** Video-style explainer, colouring play and a zigzag recall puzzle for World 1. */
export function WorldOneActivities() {
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [colour, setColour] = useState<string>(PALETTE[0].value);
  const [colouredParts, setColouredParts] = useState<string[]>([]);
  const [puzzleStep, setPuzzleStep] = useState(0);
  const [puzzleMessage, setPuzzleMessage] = useState("");

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setScene((current) => {
        if (current === VIDEO_SCENES.length - 1) {
          setIsPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const currentScene = VIDEO_SCENES[scene];

  function colourPart(part: string) {
    setColouredParts((current) =>
      current.includes(part) ? current : [...current, part],
    );
  }

  function choosePuzzleStep(id: number) {
    if (id !== puzzleStep + 1) {
      setPuzzleMessage("Try the next clue in Questy's zigzag path.");
      return;
    }

    const nextStep = puzzleStep + 1;
    setPuzzleStep(nextStep);
    setPuzzleMessage(
      nextStep === ZIGZAG_STEPS.length
        ? "Brilliant detective work! You solved the zigzag."
        : "Great! Find the next clue.",
    );
  }

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] border-2 border-detective-blue-100 bg-white shadow-lg">
        <div className={"relative min-h-64 bg-gradient-to-br p-8 text-center text-white sm:p-12 " + currentScene.color}>
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_28%),radial-gradient(circle_at_80%_75%,white_0,transparent_24%)]" />
          <div className="relative mx-auto max-w-xl">
            <span className="inline-grid h-20 w-20 place-items-center rounded-full bg-white/20 text-5xl shadow-xl">
              {currentScene.icon}
            </span>
            <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.2em]">
              Questy's mini video · {scene + 1} / {VIDEO_SCENES.length}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold">{currentScene.title}</h3>
            <p className="mx-auto mt-3 max-w-md text-lg text-white/95">{currentScene.caption}</p>
            <button
              type="button"
              onClick={() => {
                if (scene === VIDEO_SCENES.length - 1) setScene(0);
                setIsPlaying((current) => !current);
              }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold text-detective-blue-800 shadow-lg"
            >
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              {isPlaying ? "Pause video" : scene === VIDEO_SCENES.length - 1 ? "Watch again" : "Play video"}
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 p-4">
          {VIDEO_SCENES.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={"Show video scene " + (index + 1)}
              onClick={() => {
                setScene(index);
                setIsPlaying(false);
              }}
              className={"h-3 rounded-full transition-all " + (scene === index ? "w-8 bg-detective-orange-500" : "w-3 bg-detective-blue-200")}
            />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border-2 border-detective-yellow-300 bg-detective-yellow-50 p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-600">
              Colour Questy
            </p>
            <h3 className="font-display text-2xl font-bold text-detective-blue-900">
              Choose a colour, then tap the picture
            </h3>
          </div>
          <Palette className="h-9 w-9 text-detective-orange-500" aria-hidden="true" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <svg viewBox="0 0 360 280" className="mx-auto w-full max-w-md rounded-3xl bg-white p-3 shadow-inner" role="img" aria-label="Colouring picture of Questy the cat detective">
            <path d="M118 96 L94 42 L151 68 M242 96 L266 42 L209 68" fill="white" stroke="#0b2f5c" strokeWidth="7" strokeLinejoin="round" />
            <circle cx="180" cy="126" r="68" fill={colouredParts.includes("face") ? colour : "white"} stroke="#0b2f5c" strokeWidth="7" onClick={() => colourPart("face")} className="cursor-pointer" />
            <ellipse cx="145" cy="126" rx="10" ry="15" fill="white" stroke="#0b2f5c" strokeWidth="4" />
            <ellipse cx="215" cy="126" rx="10" ry="15" fill="white" stroke="#0b2f5c" strokeWidth="4" />
            <circle cx="146" cy="128" r="4" fill="#0b2f5c" /><circle cx="214" cy="128" r="4" fill="#0b2f5c" />
            <path d="M170 148 Q180 158 190 148" fill="none" stroke="#0b2f5c" strokeWidth="5" strokeLinecap="round" />
            <path d="M118 188 Q180 164 242 188 L262 250 L98 250 Z" fill={colouredParts.includes("coat") ? colour : "white"} stroke="#0b2f5c" strokeWidth="7" strokeLinejoin="round" onClick={() => colourPart("coat")} className="cursor-pointer" />
            <circle cx="180" cy="205" r="28" fill={colouredParts.includes("badge") ? colour : "white"} stroke="#0b2f5c" strokeWidth="6" onClick={() => colourPart("badge")} className="cursor-pointer" />
            <path d="M180 186 L186 199 L201 201 L190 211 L193 226 L180 218 L167 226 L170 211 L159 201 L174 199 Z" fill="white" stroke="#0b2f5c" strokeWidth="3" />
            <circle cx="66" cy="72" r="24" fill={colouredParts.includes("clue") ? colour : "white"} stroke="#0b2f5c" strokeWidth="6" onClick={() => colourPart("clue")} className="cursor-pointer" />
            <path d="M55 72 L64 81 L79 61" fill="none" stroke="#0b2f5c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex flex-wrap justify-center gap-3 md:max-w-48">
            {PALETTE.map((item) => (
              <button
                key={item.value}
                type="button"
                title={item.name}
                aria-label={"Use " + item.name}
                aria-pressed={colour === item.value}
                onClick={() => setColour(item.value)}
                className={"h-11 w-11 rounded-full border-4 border-white shadow-md ring-2 " + (colour === item.value ? "ring-detective-blue-700" : "ring-transparent")}
                style={{ backgroundColor: item.value }}
              />
            ))}
            <button type="button" onClick={() => setColouredParts([])} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-detective-blue-300 bg-white px-4 py-2 font-display text-sm font-semibold text-detective-blue-700">
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start again
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-detective-orange-500">
          Zigzag puzzle
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900">
          Follow Questy's clue trail
        </h3>
        <p className="mt-2 text-detective-blue-700/85">
          Tap the clues in order: picture, name, colour, then become a detective.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ZIGZAG_STEPS.map((step, index) => {
            const solved = step.id <= puzzleStep;
            return (
              <button
                key={step.id}
                type="button"
                disabled={solved}
                onClick={() => choosePuzzleStep(step.id)}
                className={"relative min-h-36 rounded-3xl border-2 p-4 text-center transition-transform hover:-translate-y-1 disabled:cursor-default " + (solved ? "border-green-300 bg-green-50 text-green-800" : "border-detective-blue-200 bg-detective-blue-50 text-detective-blue-900")}
              >
                <span className="text-4xl">{step.emoji}</span>
                <span className="mt-3 block font-display font-bold">{step.clue}</span>
                {solved && <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-600" aria-hidden="true" />}
                {index % 2 === 0 && index < ZIGZAG_STEPS.length - 1 && <span className="absolute -right-4 top-1/2 hidden text-2xl text-detective-orange-500 sm:block" aria-hidden="true">↗</span>}
              </button>
            );
          })}
        </div>

        {puzzleMessage && (
          <p className={"mt-5 rounded-2xl px-5 py-4 font-display font-semibold " + (puzzleStep === ZIGZAG_STEPS.length ? "bg-green-100 text-green-800" : "bg-detective-yellow-100 text-detective-blue-900")}>
            <Sparkles className="mr-2 inline h-5 w-5" aria-hidden="true" />
            {puzzleMessage}
          </p>
        )}
      </section>
    </div>
  );
}
