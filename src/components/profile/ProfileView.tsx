"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BookOpen, Download, LogOut, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { useGame } from "@/components/gamification";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLogout } from "@/lib/auth/useLogout";
import { badges, MASTER_CERTIFICATE_ID, TOTAL_WORLDS } from "@/lib/gamification/config";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

const avatarOptions = ["🕵️", "🕵️‍♀️", "🦸", "🦸‍♀️", "🐯", "🦉", "🤖", "🐉"];

/** Account details, avatar picker and live stats for the signed-in detective. */
export function ProfileView() {
  const { user } = useAuth();
  const { player, level, setProfile } = useGame();
  const logout = useLogout();

  if (!user) return null;

  const completedCount = player.completedWorldIds.length;
  const hasMasterCertificate = completedCount >= TOTAL_WORLDS;

  // Snapshot stats shown at the top of the profile.
  const summary: { icon: typeof Zap; label: string; value: string }[] = [
    { icon: Sparkles, label: "Membership", value: "Brand Quest Member" },
    { icon: BookOpen, label: "Worlds completed", value: `${completedCount} / ${TOTAL_WORLDS}` },
    { icon: Zap, label: "XP earned", value: player.xp.toLocaleString() },
    { icon: Award, label: "Badges earned", value: `${player.badgeIds.length} / ${badges.length}` },
  ];

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

      {/* Detective summary: membership, progress and achievements at a glance. */}
      <motion.section
        variants={staggerContainer}
        {...inViewOnce}
        aria-labelledby="summary-heading"
        className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"
      >
        <h2
          id="summary-heading"
          className="mb-4 font-display text-xl font-bold text-detective-blue-900"
        >
          Detective summary
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          {summary.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl bg-detective-blue-50/70 px-4 py-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-detective-blue-600 shadow-sm">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <dt className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">
                  {item.label}
                </dt>
                <dd className="font-display font-bold text-detective-blue-900">
                  {item.value}
                </dd>
              </span>
            </motion.div>
          ))}
        </dl>

        {/* Certificate status — the Master certificate unlocks only after World 15. */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-detective-yellow-300 bg-detective-yellow-50 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-detective-yellow-400 text-detective-blue-900">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-bold text-detective-blue-900">
                Certificate status
              </p>
              <p className="text-sm text-detective-blue-700/85">
                {hasMasterCertificate
                  ? "🏆 Master Brand Detective Certificate unlocked!"
                  : "🔒 Complete all 15 worlds to unlock your certificate."}
              </p>
            </div>
          </div>

          {hasMasterCertificate && (
            <Link
              href={`/certificates/${MASTER_CERTIFICATE_ID}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-5 py-3 font-display font-semibold text-white shadow-lg transition-colors hover:bg-detective-blue-700"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Download Certificate
            </Link>
          )}
        </motion.div>
      </motion.section>

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
