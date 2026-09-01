"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { QuizQuestionCard, StarRating } from "@/components/quiz";
import { Confetti } from "@/components/quiz/Confetti";
import {
  Certificate,
  Fireworks,
  LevelBadge,
  useGame,
} from "@/components/gamification";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { calculateStars } from "@/lib/quiz/scoring";
import { formatCertificateDate } from "@/lib/gamification/certificate";
import { certificates } from "@/lib/gamification/config";
import { finalCases } from "@/lib/lesson-five";
import { lessons } from "@/lib/lessons";

const lesson = lessons.find((item) => item.id === "trademark-master")!;
const XP_PER_CASE = Math.round(lesson.xp / finalCases.length);
const certificate = certificates.find((item) => item.id === "trademark-master")!;

const brandSymbols = ["⭐", "🚀", "🐾", "🔥", "🎯", "🌟"];
const brandColors = [
  { id: "blue", label: "Blue", className: "bg-detective-blue-400" },
  { id: "orange", label: "Orange", className: "bg-detective-orange-500" },
  { id: "yellow", label: "Yellow", className: "bg-detective-yellow-400" },
  { id: "green", label: "Green", className: "bg-green-500" },
];

/** The five-case final challenge, ending in a certificate celebration. */
export function FinalChallenge() {
  const { player, level, awardXp, completeLesson } = useGame();

  const [caseIndex, setCaseIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<"challenge" | "celebration">("challenge");

  const currentCase = finalCases[caseIndex];
  const isLastCase = caseIndex === finalCases.length - 1;
  const completedCases = caseIndex + (answered ? 1 : 0);
  const progressPercent = Math.round((completedCases / finalCases.length) * 100);

  function handleCaseAnswered(isCorrect: boolean) {
    if (answered) return;
    setAnswered(true);
    if (isCorrect) setCorrectCount((current) => current + 1);
    awardXp(XP_PER_CASE, `Case ${currentCase.caseNumber} solved! +${XP_PER_CASE} XP`);
  }

  function handleNext() {
    if (!isLastCase) {
      setCaseIndex((current) => current + 1);
      setAnswered(false);
      return;
    }

    const stars = calculateStars(correctCount, finalCases.length - 1);
    completeLesson(lesson.id, { xp: 0, coins: lesson.coins, stars });
    setPhase("celebration");
  }

  if (phase === "celebration") {
    return (
      <CelebrationScreen
        studentName={player.name}
        rankTitle={level.current.title}
        xpEarned={player.xp}
        certificateNumber={
          player.certificateAwards[certificate.id]?.certificateNumber
        }
        awardedAt={player.certificateAwards[certificate.id]?.awardedAt}
      />
    );
  }

  return (
    <div>
      {/* Rank + progress tracker */}
      <div className="mb-8 flex flex-col items-center gap-4 rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <LevelBadge level={level.current} size="md" />
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">
              BrandQuest rank
            </p>
            <p className="font-display text-lg font-bold text-detective-blue-900">
              {level.current.title}
            </p>
          </div>
        </div>

        <div className="w-full sm:max-w-xs">
          <p className="mb-2 text-center font-display text-sm font-semibold text-detective-blue-700 sm:text-right">
            Case {currentCase.caseNumber} of {finalCases.length}
          </p>
          <ProgressBar percent={progressPercent} label="Final challenge progress" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCase.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-detective-orange-500">
            Case {currentCase.caseNumber}: {currentCase.title}
          </p>

          {currentCase.type === "question" ? (
            <QuizQuestionCard
              question={currentCase.question}
              onAnswer={(result) => handleCaseAnswered(result.isCorrect)}
            />
          ) : (
            <BrandCreatorCase onSubmit={() => handleCaseAnswered(true)} />
          )}
        </motion.div>
      </AnimatePresence>

      {answered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-end"
        >
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600"
          >
            {isLastCase ? "Finish the final challenge" : "Next case"}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

/** Case 5: build a brand instead of answering a question. */
function BrandCreatorCase({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState(brandSymbols[0]);
  const [colorId, setColorId] = useState(brandColors[0].id);
  const [created, setCreated] = useState(false);

  const color = brandColors.find((item) => item.id === colorId) ?? brandColors[0];

  function handleCreate() {
    if (!name.trim() || created) return;
    setCreated(true);
    onSubmit();
  }

  return (
    <div className="rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8">
      <h3 className="mb-2 font-display text-xl font-bold text-detective-blue-900 sm:text-2xl">
        Create your own brand
      </h3>
      <p className="mb-6 text-detective-blue-700/85">
        Give your new brand a name, a symbol and a colour.
      </p>

      <label htmlFor="brand-name" className="mb-1 block font-display text-sm font-semibold text-detective-blue-700">
        Brand name
      </label>
      <input
        id="brand-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={created}
        maxLength={30}
        placeholder="Type your brand name…"
        className="w-full rounded-full border-2 border-detective-blue-200 px-4 py-2 font-medium text-detective-blue-900 outline-none focus:border-detective-blue-500 disabled:opacity-60"
      />

      <fieldset className="mt-5" disabled={created}>
        <legend className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
          Choose a symbol
        </legend>
        <div className="flex flex-wrap gap-2">
          {brandSymbols.map((emoji) => (
            <motion.button
              key={emoji}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSymbol(emoji)}
              aria-pressed={symbol === emoji}
              className={`grid h-12 w-12 place-items-center rounded-2xl border-2 text-2xl transition-colors ${
                symbol === emoji
                  ? "border-detective-orange-500 bg-detective-orange-100"
                  : "border-detective-blue-200 bg-detective-blue-50 hover:border-detective-blue-400"
              }`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5" disabled={created}>
        <legend className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-detective-blue-700/70">
          Choose a colour
        </legend>
        <div className="flex flex-wrap gap-2">
          {brandColors.map((option) => (
            <motion.button
              key={option.id}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setColorId(option.id)}
              aria-pressed={colorId === option.id}
              aria-label={option.label}
              className={`h-10 w-10 rounded-full ring-2 ring-offset-2 transition-all ${option.className} ${
                colorId === option.id ? "ring-detective-blue-700" : "ring-transparent"
              }`}
            />
          ))}
        </div>
      </fieldset>

      {!created ? (
        <button
          type="button"
          onClick={handleCreate}
          disabled={!name.trim()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          Create my brand
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 flex items-center gap-4 rounded-2xl bg-green-50 p-4"
        >
          <span
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-full text-3xl shadow-inner ${color.className}`}
            aria-hidden="true"
          >
            {symbol}
          </span>
          <p className="font-medium text-green-800">
            <CheckCircle2 className="mr-1 inline h-5 w-5" aria-hidden="true" />
            “{name}” is officially a brand, detective!
          </p>
        </motion.div>
      )}
    </div>
  );
}

/** Final celebration: fireworks, confetti, badge and printable certificate. */
function CelebrationScreen({
  studentName,
  rankTitle,
  xpEarned,
  certificateNumber,
  awardedAt,
}: {
  studentName: string;
  rankTitle: string;
  xpEarned: number;
  certificateNumber?: string;
  awardedAt?: string;
}) {
  return (
    <div className="text-center">
      <Fireworks />
      <Confetti pieceCount={70} durationMs={3200} />

      <motion.div
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="mx-auto flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-detective-yellow-300 to-detective-orange-500 shadow-2xl"
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-4 border-dashed border-white/70"
          />
          <span aria-hidden="true" className="text-6xl">
            🏅
          </span>
        </motion.div>

        <p className="mt-5 font-display text-2xl font-bold text-detective-blue-900">
          🏅 BrandQuest Champion badge earned!
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl"
      >
        You are now a Little Brand Detective!
      </motion.h2>

      <div className="mt-6 flex justify-center">
        <StarRating earned={3} />
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        {certificateNumber && awardedAt ? (
          <Certificate
            certificate={certificate}
            studentName={studentName}
            levelTitle={rankTitle}
            xpEarned={xpEarned}
            certificateNumber={certificateNumber}
            awardedOn={formatCertificateDate(awardedAt)}
          />
        ) : (
          <p className="rounded-2xl bg-white px-6 py-5 font-display font-bold text-detective-blue-900 shadow-md">
            Generating your official certificate…
          </p>
        )}
      </div>

      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
      >
        Back to my dashboard
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  );
}
