"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { useGame } from "@/components/gamification";
import { useAuth } from "@/lib/auth/AuthProvider";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

const avatarOptions = ["🕵️", "🕵️‍♀️", "🦸", "🦸‍♀️", "🐯", "🦉", "🤖", "🐉"];

/** Account details, avatar picker and live stats for the signed-in detective. */
export function ProfileView() {
  const { user, logout } = useAuth();
  const { player, level, setProfile } = useGame();

  if (!user) return null;

  const details: { label: string; value: string }[] = [
    { label: "Email", value: user.email },
    { label: "Parent / guardian", value: user.parentName || "—" },
    { label: "Age", value: `${user.age}` },
    { label: "School", value: user.school || "—" },
    { label: "Country", value: user.country || "—" },
  ];

  return (
    <div className="space-y-8">
      <ProfileCard
        name={user.studentName}
        avatarEmoji={player.avatarEmoji}
        xp={player.xp}
        coins={player.coins}
        streakDays={player.streak.count}
        level={level.current}
        nextTitle={level.next?.title ?? null}
        percent={level.percent}
        xpToNext={level.xpToNext}
      />

      <motion.section
        variants={staggerContainer}
        {...inViewOnce}
        aria-labelledby="avatar-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="avatar-heading"
          className="mb-4 font-display text-xl font-bold text-detective-blue-900"
        >
          Choose your avatar
        </h2>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {avatarOptions.map((emoji) => {
            const isSelected = player.avatarEmoji === emoji;
            return (
              <button
                key={emoji}
                type="button"
                onClick={() => setProfile({ avatarEmoji: emoji })}
                aria-pressed={isSelected}
                aria-label={`Use ${emoji} as my avatar`}
                className={`grid h-14 w-14 place-items-center rounded-2xl border-2 text-3xl transition-colors ${
                  isSelected
                    ? "border-detective-orange-500 bg-detective-orange-100"
                    : "border-detective-blue-200 bg-detective-blue-50 hover:border-detective-blue-400"
                }`}
              >
                {emoji}
              </button>
            );
          })}
        </motion.div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...inViewOnce}
        aria-labelledby="details-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="details-heading"
          className="mb-4 font-display text-xl font-bold text-detective-blue-900"
        >
          Account details
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <motion.div key={detail.label} variants={fadeUp}>
              <dt className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">
                {detail.label}
              </dt>
              <dd className="mt-1 font-medium text-detective-blue-900">
                {detail.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <button
          type="button"
          onClick={logout}
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 px-6 py-3 font-display font-semibold text-detective-blue-700 transition-colors hover:bg-detective-blue-50"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Log out
        </button>
      </motion.section>
    </div>
  );
}
