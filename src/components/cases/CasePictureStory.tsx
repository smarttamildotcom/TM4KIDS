"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DetectiveAvatar } from "@/components/detective/DetectiveAvatar";
import type { DetectiveProfile } from "@/lib/detective-profile";

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
          <div className="overflow-hidden rounded-[1.75rem] border-2 border-sky-100 bg-white">
            <Image
              src={`/cases/world-1/${({ welcome: "scene-1-welcome.png", creators: "scene-2-creators.png", wind: "scene-3-whoosh.png", mission: "scene-4-first-case.png" } as const)[scene.kind]}`}
              alt={scene.kind === "welcome" ? "Questy and a child detective entering Creator Park for Idea Day" : scene.kind === "creators" ? "Mia, Ben, Zara and Leo showing their four creations" : scene.kind === "wind" ? "A colourful gust mixes up the four creations at Idea Day" : "Questy and a child detective examining the four creations"}
              width={1672}
              height={941}
              priority={index === 0}
              className="h-auto w-full"
            />
            <div className="p-5 text-center sm:p-7">
              <p className="font-display text-xs font-bold uppercase tracking-[.2em] text-detective-orange-600">{scene.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">{scene.title}</h2>
              {scene.description && <p className="mx-auto mt-2 max-w-xl text-detective-blue-700">{scene.description}</p>}
              {scene.kind === "welcome" && <p className="mt-3 text-detective-blue-800">Questy: “Welcome to Creator Park, Little IP Detective! Today is Idea Day. Come on — let’s investigate!”</p>}
              {scene.kind === "creators" && <>
                <p className="mt-3 font-semibold text-detective-blue-800">Tap each creator to hear their clue.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {creators.map((creator) => <button key={creator.id} type="button" onClick={() => setActiveCreator(creator.id)} aria-pressed={activeCreator === creator.id} className={"min-h-12 rounded-2xl border-2 px-3 py-3 font-display font-bold focus-visible:outline focus-visible:outline-4 focus-visible:outline-detective-yellow-300 " + (activeCreator === creator.id ? "border-detective-orange-500 bg-detective-yellow-100" : "border-detective-blue-100 bg-sky-50")}>{creator.name}</button>)}
                </div>
                <p role="status" className="mt-4 min-h-16 rounded-2xl bg-detective-yellow-50 p-4 text-detective-blue-900">{activeCreator ? `${creators.find((item) => item.id === activeCreator)?.name}: “${creators.find((item) => item.id === activeCreator)?.dialogue}”` : "Four creators. Four different creations. Who made what?"}</p>
              </>}
              {scene.kind === "wind" && <p className="mt-3 text-lg text-detective-blue-800">Questy: “Oh no! The creations are mixed up!”</p>}
              {scene.kind === "mission" && <p className="mt-3 text-lg text-detective-blue-800">Questy: “{detectiveName}, we know WHAT was created... But can you discover WHO created each one?”<span className="mt-2 block font-display font-bold">Match each creator with their creation.</span></p>}
              {detective && <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-sky-50 p-2"><div className="w-14 shrink-0"><DetectiveAvatar avatar={detective.avatar} pose="investigate" /></div><span className="font-display font-semibold text-detective-blue-900">{detectiveName} is on the case!</span></div>}
            </div>
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
