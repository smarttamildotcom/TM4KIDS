"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { StoryScene } from "@/lib/story";

type StoryPlayerProps = {
  scenes: StoryScene[];
  /** Anchor or path the final "Next" button links to. */
  finalCtaHref: string;
  finalCtaLabel?: string;
};

/** Slide-by-slide story player with picture placeholders and Back/Next controls. Reused by every lesson. */
export function StoryPlayer({
  scenes,
  finalCtaHref,
  finalCtaLabel = "Solve the case",
}: StoryPlayerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const scene = scenes[index];
  const isFirst = index === 0;
  const isLast = index === scenes.length - 1;

  function go(step: number) {
    setDirection(step);
    setIndex((current) => Math.min(Math.max(current + step, 0), scenes.length - 1));
  }

  return (
    <div className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-xl sm:p-8">
      {/* Progress dots double as jump-to-scene buttons. */}
      <ol className="flex items-center justify-center gap-2" aria-label="Story progress">
        {scenes.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                setDirection(itemIndex > index ? 1 : -1);
                setIndex(itemIndex);
              }}
              aria-label={`Go to ${item.chapter}: ${item.title}`}
              aria-current={itemIndex === index ? "step" : undefined}
              className={`h-3 rounded-full transition-all ${
                itemIndex === index
                  ? "w-10 bg-detective-orange-500"
                  : "w-3 bg-detective-blue-200 hover:bg-detective-blue-400"
              }`}
            />
          </li>
        ))}
      </ol>

      <div className="mt-8 min-h-[26rem]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={scene.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <ImagePlaceholder
                label={scene.imageLabel}
                emoji={scene.emoji}
                className="aspect-[4/3] w-full"
              />
            </motion.div>

            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
                {scene.chapter}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
                {scene.title}
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-detective-blue-700/90">
                {scene.paragraphs[0]}
              </p>

              {/* The cookie-box name gets its own celebratory reveal. */}
              {scene.highlight?.tone === "reveal" && (
                <motion.p
                  initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
                  animate={{ scale: 1, opacity: 1, rotate: -2 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 220 }}
                  className="my-5 inline-block rounded-2xl bg-detective-yellow-400 px-6 py-3 font-display text-2xl font-bold text-detective-blue-900 shadow-lg sm:text-3xl"
                >
                  {scene.highlight.text}
                </motion.p>
              )}

              {/* The key vocabulary word pulses to draw attention. */}
              {scene.highlight?.tone === "pulse" && (
                <motion.p
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="my-5 inline-block rounded-2xl bg-detective-blue-600 px-6 py-3 font-display text-2xl font-bold tracking-wide text-white shadow-lg sm:text-3xl"
                >
                  {scene.highlight.text}
                </motion.p>
              )}

              {scene.paragraphs.slice(1).map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-lg leading-relaxed text-detective-blue-700/90"
                >
                  {paragraph}
                </p>
              ))}

              {scene.note && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex items-start gap-3 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-medium text-detective-orange-600"
                >
                  <Lightbulb
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0"
                  />
                  {scene.note}
                </motion.p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 px-5 py-3 font-display font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back
        </button>

        <p className="font-display text-sm font-semibold text-detective-blue-700">
          {index + 1} / {scenes.length}
        </p>

        {isLast ? (
          <a
            href={finalCtaHref}
            className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-5 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
          >
            {finalCtaLabel}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => go(1)}
            className="inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-5 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700"
          >
            Next
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
