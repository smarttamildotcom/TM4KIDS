"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, LogOut, UserRound } from "lucide-react";
import { QuestyExpression } from "@/components/illustrations/QuestyExpression";
import { QuestyIcon } from "@/components/illustrations/QuestyIcon";
import { useGame } from "@/lib/gamification/GameProvider";
import { useLogout } from "@/lib/auth/useLogout";
import { badges, getQuizAccuracy, TOTAL_WORLDS } from "@/lib/gamification/config";
import { getRemainingWorldIds } from "@/lib/progress";
import { worlds } from "@/lib/worlds";

/** Detective profile, progress, stats and achievements — all derived from live state. */
export function QuestyProfilePanel({ onNavigate }: { onNavigate?: () => void }) {
  const { player, level } = useGame();
  const logout = useLogout();

  const completed = worlds.filter((world) => player.completedWorldIds.includes(world.id));
  const remainingIds = getRemainingWorldIds(player);
  const earnedBadges = badges.filter((badge) => player.badgeIds.includes(badge.id));
  const accuracy = getQuizAccuracy(player);

  const stats = [
    { icon: "star" as const, label: "Stars Earned", value: player.stats.starsEarned },
    { icon: "badge" as const, label: "Total XP", value: player.xp.toLocaleString() },
    { icon: "clue" as const, label: "Badges Collected", value: player.badgeIds.length },
    { icon: "magnifier" as const, label: "Quiz Accuracy", value: `${accuracy}%` },
    { icon: "paw" as const, label: "Current Streak", value: `${player.streak.count} days` },
  ];

  return (
    <div className="max-h-[70vh] overflow-y-auto p-5">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-detective-blue-50">
          <QuestyExpression mood="happy" size={60} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold text-detective-blue-900">
            {player.name}
          </p>
          <p className="font-display text-sm font-semibold text-detective-orange-500">
            {level.current.title}
          </p>
        </div>
      </div>

      {/* Progress */}
      <section className="mt-5 rounded-2xl bg-detective-blue-50/70 p-4">
        <div className="flex items-baseline justify-between font-display text-sm font-bold text-detective-blue-900">
          <span>
            {player.completedWorldIds.length} / {TOTAL_WORLDS} Worlds Completed
          </span>
          <span className="text-detective-orange-500">{player.xp.toLocaleString()} XP</span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-detective-blue-100">
          <motion.div
            animate={{ width: `${level.percent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-detective-yellow-400 to-detective-orange-500"
          />
        </div>

        <p className="mt-2 text-xs font-semibold text-detective-blue-700/80">
          {level.next
            ? `${level.xpToNext.toLocaleString()} XP to ${level.next.title}`
            : "Top rank reached — Master Detective!"}
        </p>
      </section>

      {/* Statistics */}
      <section className="mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-detective-blue-900">
          Statistics
        </h3>
        <ul className="mt-3 space-y-2">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-detective-blue-700">
                <QuestyIcon name={stat.icon} size={22} />
                {stat.label}
              </span>
              <span className="font-display font-bold text-detective-blue-900">{stat.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recently completed */}
      <section className="mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-detective-blue-900">
          Recently Completed
        </h3>
        {completed.length === 0 ? (
          <p className="mt-2 text-sm text-detective-blue-700/80">
            No worlds finished yet — start with World 1!
          </p>
        ) : (
          <ul className="mt-3 space-y-1.5">
            {completed
              .slice(-5)
              .reverse()
              .map((world) => (
                <li
                  key={world.id}
                  className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-800"
                >
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  World {world.id} – {world.name}
                </li>
              ))}
          </ul>
        )}
      </section>

      {/* Remaining */}
      {remainingIds.length > 0 && (
        <section className="mt-5">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-detective-blue-900">
            Remaining Worlds
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {remainingIds.map((id) => (
              <li
                key={id}
                className="inline-flex items-center gap-1 rounded-full bg-detective-blue-50 px-2.5 py-1 text-xs font-semibold text-detective-blue-700"
              >
                <Lock className="h-3 w-3" aria-hidden="true" />
                World {id}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      <section className="mt-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-detective-blue-900">
          Achievements
        </h3>
        {earnedBadges.length === 0 ? (
          <p className="mt-2 text-sm text-detective-blue-700/80">
            Finish a world to earn your first badge.
          </p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {earnedBadges.map((badge) => (
              <li
                key={badge.id}
                title={badge.description}
                className="inline-flex items-center gap-1.5 rounded-full bg-detective-yellow-100 px-3 py-1.5 text-sm font-semibold text-detective-blue-900"
              >
                <span aria-hidden="true">{badge.emoji}</span>
                {badge.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      <a
        href="/#journey"
        onClick={onNavigate}
        className="mt-6 flex w-full items-center justify-center rounded-full bg-detective-orange-500 px-5 py-3 font-display font-semibold text-white transition-colors hover:bg-detective-orange-600"
      >
        Back to the Journey
      </a>

      {/* Account actions: view the full profile or sign out. */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href="/profile"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 px-4 py-2.5 font-display text-sm font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          Profile
        </Link>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logout();
          }}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-detective-orange-300 px-4 py-2.5 font-display text-sm font-semibold text-detective-orange-600 transition-colors hover:bg-detective-orange-50"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
