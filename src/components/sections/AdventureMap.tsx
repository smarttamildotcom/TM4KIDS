"use client";

import { motion } from "framer-motion";
import { cityCase } from "@/lib/idea-city";
import { Container } from "@/components/ui/Container";
import { WorldCard, type WorldStatus } from "@/components/sections/WorldCard";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useGame } from "@/lib/gamification/GameProvider";
import { journeyChapters, worlds } from "@/lib/worlds";

const scenery = [
  { emoji: "☁️", className: "left-[3%] top-[3%]", duration: 6 }, { emoji: "⭐", className: "right-[5%] top-[7%]", duration: 4.2 }, { emoji: "💡", className: "left-[6%] top-[34%]", duration: 5.4 }, { emoji: "🎨", className: "right-[4%] top-[42%]", duration: 4.8 }, { emoji: "🗺️", className: "left-[4%] top-[66%]", duration: 5.8 }, { emoji: "📚", className: "right-[6%] top-[74%]", duration: 5 }, { emoji: "⭐", className: "left-[7%] top-[90%]", duration: 4.6 },
];
function zigzagClass(index: number) { const column = index % 3; if (column === 1) return "lg:translate-y-12"; if (column === 2) return "lg:translate-y-4"; return ""; }

export function AdventureMap() {
  const { player } = useGame();
  const { user } = useAuth();
  const completedWorldIds = user ? player.completedWorldIds : [];
  const statuses: WorldStatus[] = worlds.map((world) => completedWorldIds.includes(world.id) ? "completed" : "unlocked");
  const activeIndex = statuses.indexOf("unlocked");
  const districtNames = ["Creator Park", "Brand Street", "Inventor Lab", "Creator Studio + Design District", "Idea City"];
  return <section id="journey" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-detective-blue-50/60 py-8 sm:py-12">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">{scenery.map((item, index) => <motion.span key={`${item.emoji}-${index}`} animate={{ y: [0,-10,0] }} transition={{ duration:item.duration, repeat:Infinity, ease:"easeInOut" }} className={`absolute text-3xl opacity-50 ${item.className}`}>{item.emoji}</motion.span>)}</div>
    <Container className="relative"><div className="space-y-14">{journeyChapters.map((chapter) => { const chapterWorlds = worlds.filter((world) => chapter.worldIds.includes(world.id)); return <section key={chapter.id} aria-labelledby={`chapter-${chapter.id}`} className="rounded-[2rem] border-2 border-detective-blue-100 bg-white/60 p-4 shadow-sm sm:p-6">
      <div className="mb-7 rounded-3xl bg-detective-blue-900 px-5 py-4 text-white"><p className="font-display text-xs font-semibold uppercase tracking-[.2em] text-detective-yellow-300">Idea City · {chapter.focus}</p><h2 id={`chapter-${chapter.id}`} className="mt-1 font-display text-xl font-bold sm:text-2xl">{districtNames[chapter.id-1]}</h2><p className="mt-1 text-sm text-white/80">{chapter.setting}</p></div>
      <ol className="grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{chapterWorlds.map((world) => { const index = world.id - 1; const adventure = cityCase(world.id); return <motion.li key={world.id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.45,ease:[.22,1,.36,1]}} className={zigzagClass(index)}><WorldCard world={world} status={statuses[index]} isActive={index===activeIndex} isExpanded={false} onToggle={()=>{}} onRequestUnlock={()=>{}} onComplete={()=>{}} onNextWorld={()=>{}} caseTitle={adventure.title} caseScene={adventure.scene}/></motion.li>; })}</ol>
    </section>; })}</div></Container>
  </section>;
}
