"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BookOpen, Download, LogOut, ShieldCheck, Star, Zap } from "lucide-react";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { useGame } from "@/components/gamification";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLogout } from "@/lib/auth/useLogout";
import { badges, MASTER_CERTIFICATE_ID, TOTAL_WORLDS } from "@/lib/gamification/config";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

const avatarOptions = ["🕵️", "🕵️‍♀️", "🦸", "🦸‍♀️", "🐯", "🦉", "🤖", "🐉"];

export function ProfileView() {
  const { user } = useAuth();
  const { player, level, setProfile } = useGame();
  const logout = useLogout();
  if (!user) return null;
  const completedCount = player.completedWorldIds.length;
  const hasMasterCertificate = player.completedWorldIds.includes(TOTAL_WORLDS);
  const summary: { icon: typeof Zap; label: string; value: string }[] = [
    { icon: BookOpen, label: "Worlds completed", value: `${completedCount} / ${TOTAL_WORLDS}` },
    { icon: Zap, label: "XP earned", value: player.xp.toLocaleString() },
    { icon: Star, label: "Stars earned", value: player.stats.starsEarned.toLocaleString() },
    { icon: Award, label: "Badges earned", value: `${player.badgeIds.length} / ${badges.length}` },
  ];
  const details = [
    { label: "Email", value: user.email }, { label: "Parent / guardian", value: user.parentName || "—" },
    { label: "Age", value: `${user.age}` }, { label: "School", value: user.school || "—" }, { label: "Country", value: user.country || "—" },
  ];
  return <div className="space-y-8">
    <ProfileCard name={user.studentName} avatarEmoji={player.avatarEmoji} xp={player.xp} coins={player.coins} streakDays={player.streak.count} level={level.current} nextTitle={level.next?.title ?? null} percent={level.percent} xpToNext={level.xpToNext}/>
    <motion.section variants={staggerContainer} {...inViewOnce} aria-labelledby="summary-heading" className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8">
      <h2 id="summary-heading" className="mb-2 font-display text-xl font-bold text-detective-blue-900">Detective summary</h2>
      <p className="mb-5 text-sm text-detective-blue-700/80">All 15 learning worlds are free. Your account keeps your detective progress, XP, stars, badges and certificates together.</p>
      <dl className="grid gap-4 sm:grid-cols-2">{summary.map(item=><motion.div key={item.label} variants={fadeUp} className="flex items-center gap-3 rounded-2xl bg-detective-blue-50/70 px-4 py-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-detective-blue-600 shadow-sm"><item.icon className="h-5 w-5"/></span><span><dt className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">{item.label}</dt><dd className="font-display font-bold text-detective-blue-900">{item.value}</dd></span></motion.div>)}</dl>
      <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-detective-yellow-300 bg-detective-yellow-50 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-detective-yellow-400 text-detective-blue-900"><ShieldCheck className="h-6 w-6"/></span><div><p className="font-display font-bold text-detective-blue-900">Certificate status</p><p className="text-sm text-detective-blue-700/85">{hasMasterCertificate?"🏆 Master IP Detective Certificate unlocked!":"🔒 Complete all 15 worlds to unlock your Master IP Detective Certificate."}</p></div></div>{hasMasterCertificate&&<Link href={`/certificates/${MASTER_CERTIFICATE_ID}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-5 py-3 font-display font-semibold text-white shadow-lg hover:bg-detective-blue-700"><Download className="h-5 w-5"/>Download Certificate</Link>}</motion.div>
    </motion.section>
    <motion.section variants={staggerContainer} {...inViewOnce} className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"><h2 className="mb-4 font-display text-xl font-bold text-detective-blue-900">Choose your avatar</h2><motion.div variants={fadeUp} className="flex flex-wrap gap-3">{avatarOptions.map(emoji=>{const selected=player.avatarEmoji===emoji;return <button key={emoji} type="button" onClick={()=>setProfile({avatarEmoji:emoji})} aria-pressed={selected} className={`grid h-14 w-14 place-items-center rounded-2xl border-2 text-3xl ${selected?"border-detective-orange-500 bg-detective-orange-100":"border-detective-blue-200 bg-detective-blue-50 hover:border-detective-blue-400"}`}>{emoji}</button>})}</motion.div></motion.section>
    <motion.section variants={staggerContainer} {...inViewOnce} className="rounded-[2rem] border-2 border-detective-blue-100 bg-white p-6 shadow-md sm:p-8"><h2 className="mb-4 font-display text-xl font-bold text-detective-blue-900">Account details</h2><dl className="grid gap-4 sm:grid-cols-2">{details.map(detail=><motion.div key={detail.label} variants={fadeUp}><dt className="font-display text-xs font-semibold uppercase tracking-widest text-detective-blue-700/70">{detail.label}</dt><dd className="mt-1 font-medium text-detective-blue-900">{detail.value}</dd></motion.div>)}</dl><button type="button" onClick={logout} className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-500 px-6 py-3 font-display font-semibold text-detective-blue-700 hover:bg-detective-blue-50"><LogOut className="h-5 w-5"/>Log out</button></motion.section>
  </div>;
}
