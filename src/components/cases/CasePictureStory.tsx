"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, Wind } from "lucide-react";
import { DetectiveAvatar } from "@/components/detective/DetectiveAvatar";
import type { DetectiveProfile } from "@/lib/detective-profile";
import { questyArt } from "@/lib/questy-art";

export type PictureStoryScene = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  kind: "welcome" | "creators" | "wind" | "mission";
};

export function CasePictureStory({
  scenes,
  nickname,
  detective,
  creators,
  onComplete,
}: {
  scenes: readonly PictureStoryScene[];
  nickname: string;
  detective: DetectiveProfile | null;
  creators: ReadonlyArray<{ id: string; name: string; creation: string; icon: string; dialogue: string; image?: string }>;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [activeCreator, setActiveCreator] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const scene = scenes[index];
  const detectiveName = nickname ? `Detective ${nickname}` : "Detective";

  const next = () => {
    setActiveCreator(null);
    if (index < scenes.length - 1) setIndex((value) => value + 1);
    else onComplete();
  };

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-detective-blue-100 px-5 py-3">
        <p className="font-display text-xs font-bold uppercase tracking-[.18em] text-detective-orange-500">
          Little IP Detectives · Picture Story
        </p>
        <p className="text-sm font-semibold text-detective-blue-600">Scene {index + 1} of {scenes.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: -18 }}
          transition={{ duration: 0.28 }}
          className="p-4 sm:p-6"
        >
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border-2 border-sky-100 bg-gradient-to-b from-sky-100 via-emerald-50 to-detective-yellow-100 p-5 sm:min-h-[480px] sm:p-8">
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-200/70 to-transparent" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-detective-orange-300 via-detective-yellow-300 to-sky-300" />

            <div className="relative z-10 text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[.2em] text-detective-orange-600">{scene.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">{scene.title}</h2>
              {scene.description && <p className="mx-auto mt-3 max-w-xl text-detective-blue-700">{scene.description}</p>}
            </div>

            {scene.kind === "welcome" && (
              <div className="relative z-10 mt-7 grid items-end gap-4 sm:grid-cols-[1fr_1.2fr_1fr]">
                <div className="flex justify-center"><Image src={questyArt.hero} alt="Questy welcoming the Little IP Detective" className="h-44 w-auto object-contain sm:h-56" priority /></div>
                <div className="order-first rounded-3xl border-2 border-white bg-white/95 p-5 text-center shadow-lg sm:order-none">
                  <p className="font-display text-xl font-bold text-detective-blue-900">Questy</p>
                  <p className="mt-2 text-lg leading-relaxed text-detective-blue-800">“Welcome to Creator Park, Little IP Detective!”</p>
                  <p className="mt-2 text-detective-blue-700">“Today is Idea Day. Everyone has brought something they created.”</p>
                  <p className="mt-2 font-display font-bold text-detective-orange-600">“Come on — let’s investigate!”</p>
                </div>
                {detective ? <div className="mx-auto w-36 sm:w-44"><DetectiveAvatar avatar={detective.avatar} pose="celebrate" /></div> : <div className="mx-auto rounded-3xl bg-white/85 p-5 text-center text-sm font-semibold text-detective-blue-700">Create your detective to join Questy.</div>}
              </div>
            )}

            {scene.kind === "creators" && (
              <div className="relative z-10 mt-6">
                <p className="text-center font-display font-semibold text-detective-blue-800">Tap each creator to hear their clue.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {creators.map((creator) => (
                    <button
                      key={creator.id}
                      type="button"
                      onClick={() => setActiveCreator(creator.id)}
                      aria-pressed={activeCreator === creator.id}
                      className={"min-h-32 rounded-3xl border-2 bg-white/95 p-4 text-center shadow-sm transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 " + (activeCreator === creator.id ? "border-detective-orange-500 ring-4 ring-detective-orange-200" : "border-white hover:border-detective-blue-200")}
                    >
                      {creator.image ? <Image src={creator.image} alt={creator.creation} width={180} height={135} className="mx-auto h-24 w-full rounded-2xl object-contain" /> : <span aria-hidden className="text-5xl">{creator.icon}</span>}
                      <span className="mt-2 block font-display text-lg font-bold text-detective-blue-900">{creator.name}</span>
                      <span className="block text-sm text-detective-blue-600">{creator.creation}</span>
                    </button>
                  ))}
                </div>
                <div role="status" className="mx-auto mt-4 min-h-24 max-w-2xl rounded-3xl bg-white/95 p-5 text-center shadow">
                  {activeCreator ? (() => {
                    const creator = creators.find((item) => item.id === activeCreator)!;
                    return <><p className="font-display font-bold text-detective-blue-900">{creator.name}</p><p className="mt-1 text-lg text-detective-blue-800">“{creator.dialogue}”</p></>;
                  })() : <p className="text-detective-blue-700">Four creators. Four different creations. Who made what?</p>}
                </div>
              </div>
            )}

            {scene.kind === "wind" && (
              <div className="relative z-10 mt-7 text-center">
                <motion.div animate={reduced ? undefined : { x: [-12, 16, -8, 0], rotate: [-2, 3, -2, 0] }} transition={{ duration: 1.1 }} className="mx-auto max-w-2xl">
                  <Wind className="mx-auto h-16 w-16 text-sky-500" aria-hidden="true" />
                  <p className="mt-2 font-display text-5xl font-black text-detective-blue-900">WHOOSH! 💨</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3" aria-label="Mixed Creator Cards">
                    {["MIA", "BEN", "ZARA", "LEO"].map((name, cardIndex) => (
                      <motion.span key={name} initial={reduced ? false : { y: -40, rotate: cardIndex % 2 ? 12 : -12 }} animate={{ y: 0, rotate: cardIndex % 2 ? -4 : 4 }} className="rounded-xl border-2 border-detective-blue-200 bg-white px-5 py-3 font-display font-bold text-detective-blue-900 shadow-lg">{name}</motion.span>
                    ))}
                  </div>
                </motion.div>
                <div className="mx-auto mt-6 max-w-xl rounded-3xl bg-white/95 p-5 shadow">
                  <p className="font-display text-lg font-bold text-detective-blue-900">Mia: “Oh no!”</p>
                  <p className="mt-2 text-lg text-detective-blue-800">Questy: “The Creator Cards are all mixed up!”</p>
                </div>
              </div>
            )}

            {scene.kind === "mission" && (
              <div className="relative z-10 mt-7 grid items-center gap-5 sm:grid-cols-[auto_1fr_auto]">
                <Image src={questyArt.thinking} alt="Questy thinking about the mystery" className="mx-auto h-48 w-auto object-contain" />
                <div className="rounded-3xl border-2 border-white bg-white/95 p-6 text-center shadow-lg">
                  <Search className="mx-auto h-9 w-9 text-detective-orange-500" aria-hidden="true" />
                  <p className="mt-3 text-lg text-detective-blue-800">“{detectiveName}, we know <strong>WHAT</strong> was created...”</p>
                  <p className="mt-2 font-display text-xl font-bold text-detective-blue-900">“But can you discover WHO created each one?”</p>
                  <div className="mt-5 rounded-2xl bg-detective-yellow-100 p-4">
                    <p className="font-display text-xs font-bold uppercase tracking-[.18em] text-detective-orange-600">Case 1 · Your mission</p>
                    <p className="mt-1 font-display text-xl font-bold text-detective-blue-900">MATCH EACH CREATOR WITH THEIR CREATION</p>
                  </div>
                </div>
                {detective ? <div className="w-36 sm:w-44"><DetectiveAvatar avatar={detective.avatar} pose="investigate" /></div> : null}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={() => { setActiveCreator(null); setIndex((value) => Math.max(0, value - 1)); }} disabled={index === 0} className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-5 py-3 font-display font-bold text-detective-blue-800 disabled:invisible">
              <ArrowLeft className="h-4 w-4" /> BACK
            </button>
            <button type="button" onClick={next} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300">
              {index === scenes.length - 1 ? "START INVESTIGATION 🔎" : "NEXT"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
