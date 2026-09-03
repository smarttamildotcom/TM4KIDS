"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Sparkles, Target } from "lucide-react";
import { QuizQuestionCard } from "@/components/quiz";
import { toQuizQuestions, worldTheme, type World } from "@/lib/worlds";

/** Section heading styled to match the eyebrow + title pattern used in Levels 1–5. */
function LessonHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-detective-blue-900 sm:text-3xl">
        {title}
      </h3>
    </div>
  );
}

/**
 * The full lesson for one world, laid out in the same order and card styling
 * as Levels 1–5: story, objectives, mini lesson, quiz, challenge, reward.
 */
export function WorldDetailPanel({
  world,
  isCompleted,
  onComplete,
  onNextWorld,
}: {
  world: World;
  isCompleted: boolean;
  onComplete: (correct: number, total: number) => void;
  onNextWorld: (worldId: number) => void;
}) {
  const theme = worldTheme[world.color];
  const questions = toQuizQuestions(world);
  const nextWorldId = world.id < 15 ? world.id + 1 : null;
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(Boolean).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="mt-8 space-y-12 border-t-2 border-dashed border-detective-blue-200 pt-10">
        {/* 2. Story introduction */}
        <section>
          <LessonHeading eyebrow="The story" title={`Case ${world.id}: ${world.name}`} />
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8">
            <p className="text-lg leading-relaxed text-detective-blue-900/85">{world.story}</p>
          </div>
        </section>

        {/* 3. Learning objectives */}
        <section>
          <LessonHeading eyebrow="Your mission" title="What you will learn" />
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8">
            <ul className="space-y-3">
              {world.objectives.map((objective) => (
                <li
                  key={objective}
                  className="flex items-start gap-3 text-lg text-detective-blue-900/85"
                >
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-700" aria-hidden="true" />
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-detective-yellow-100 px-5 py-4 font-display font-semibold text-detective-blue-900">
              🕵️ Briefing: {world.briefing}
            </p>
          </div>
        </section>

        {/* 4. Mini lesson */}
        <section>
          <LessonHeading eyebrow="Mini lesson" title={world.miniLesson.heading} />
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-lg sm:p-8">
            <p className="text-lg leading-relaxed text-detective-blue-900/85">
              {world.miniLesson.body}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {world.miniLesson.examples.map((example) => (
                <li
                  key={example}
                  className="rounded-3xl border-2 border-detective-blue-100 bg-detective-blue-50/60 p-5 text-center"
                >
                  <Sparkles
                    className="mx-auto h-6 w-6 text-detective-orange-400"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold text-detective-blue-900">{example}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 + 6. Three multiple choice, then two true or false */}
        <section>
          <LessonHeading
            eyebrow="Think like a detective"
            title="Five questions to earn your badge"
          />
          <div className="mx-auto mt-8 max-w-3xl space-y-6">
            {questions.map((question, index) => (
              <QuizQuestionCard
                key={question.id}
                question={question}
                counter={`Question ${index + 1} of ${questions.length}`}
                allowRetry
                onAnswer={(result) =>
                  setAnswers((current) =>
                    question.id in current
                      ? current
                      : { ...current, [question.id]: result.isCorrect },
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* 7. Detective challenge */}
        <section>
          <LessonHeading eyebrow="Detective challenge" title={world.challenge.title} />
          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-detective-orange-400 bg-detective-orange-100/50 p-6 shadow-lg sm:p-8">
            <h4 className="flex items-center gap-2 font-display text-xl font-bold text-detective-blue-900">
              <Target className="h-5 w-5 text-detective-orange-500" aria-hidden="true" />
              {world.activity.title}
            </h4>
            <p className="mt-3 text-lg leading-relaxed text-detective-blue-900/85">
              {world.activity.instructions}
            </p>
            <p className="mt-5 rounded-2xl bg-white px-5 py-4 text-lg text-detective-blue-900/85">
              <span className="font-display font-bold">Extra credit: </span>
              {world.challenge.prompt}
            </p>
          </div>
        </section>

        {/* 8. Reward */}
        <section>
          <LessonHeading eyebrow="Reward" title="Case closed, detective!" />
          <div
            className={`mx-auto mt-8 max-w-3xl rounded-3xl border-2 bg-white p-6 text-center shadow-lg sm:p-8 ${theme.border}`}
          >
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="block text-6xl"
            >
              {world.reward.badge}
            </motion.span>

            <h4 className="mt-4 font-display text-2xl font-bold text-detective-blue-900">
              {world.reward.label}
            </h4>
            <p className="mt-2 text-lg text-detective-blue-700/85">
              You solved World {world.id} and earned your badge. Great detective work!
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-display font-bold ${theme.chip}`}
              >
                ⚡ +{world.xp} XP earned
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-detective-yellow-100 px-5 py-2 font-display font-bold text-detective-orange-600">
                🏅 {world.reward.label}
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {isCompleted ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-8 py-4 font-display text-lg font-semibold text-green-800">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  World {world.id} complete
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onComplete(correctCount, questions.length)}
                  disabled={!allAnswered}
                  className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-8 py-4 font-display text-lg font-semibold text-white shadow-lg transition-colors hover:bg-detective-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  {allAnswered
                    ? "Claim my badge"
                    : `Answer all ${questions.length} questions (${answeredCount}/${questions.length})`}
                </button>
              )}

              {nextWorldId && isCompleted && (
                <button
                  type="button"
                  onClick={() => onNextWorld(nextWorldId)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-8 py-4 font-display text-lg font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
                >
                  Next: World {nextWorldId}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
