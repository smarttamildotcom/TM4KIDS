"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import type { NamingChallenge } from "@/lib/lesson-two";

/** One nameless product: suggestion chips plus a free-text input. */
function NamingCard({ challenge }: { challenge: NamingChallenge }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setSubmitted(trimmed);
  }

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-md"
    >
      <ImagePlaceholder
        label={challenge.productLabel}
        emoji={challenge.productEmoji}
        className="aspect-[4/3] w-full"
      />

      <p className="mt-4 font-display text-lg font-bold text-detective-blue-900">
        {challenge.productLabel}
      </p>
      <p className="mt-1 text-sm text-detective-blue-700/80">
        Give it a brand name! Tap an idea or type your own.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {challenge.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setValue(suggestion)}
            className="rounded-full border-2 border-detective-blue-200 bg-detective-blue-50 px-4 py-2 text-sm font-display font-semibold text-detective-blue-700 transition-colors hover:border-detective-blue-400 hover:bg-detective-blue-100"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(value);
        }}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor={`${challenge.id}-name`} className="sr-only">
          Your brand name for {challenge.productLabel}
        </label>
        <input
          id={`${challenge.id}-name`}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Type your own brand name…"
          maxLength={40}
          className="w-full rounded-full border-2 border-detective-blue-200 px-4 py-2 font-medium text-detective-blue-900 outline-none focus:border-detective-blue-500"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-detective-orange-500 px-5 py-2 font-display font-semibold text-white shadow-md transition-colors hover:bg-detective-orange-600"
        >
          Name it!
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.p
            key={submitted}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 rounded-2xl bg-green-50 px-4 py-3 font-medium text-green-800"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
            <Sparkles className="h-4 w-4 shrink-0 text-detective-yellow-500" aria-hidden="true" />
            “{submitted}” is a great brand name, detective!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Interactive naming activity: kids invent brand names for four nameless products. */
export function NamingActivity({ challenges }: { challenges: NamingChallenge[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      {...inViewOnce}
      className="grid gap-6 sm:grid-cols-2"
    >
      {challenges.map((challenge) => (
        <NamingCard key={challenge.id} challenge={challenge} />
      ))}
    </motion.div>
  );
}
