"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Gamepad2, Sparkles, Star, Trophy } from "lucide-react";
import { ColourQuesty, FamousLogoJigsaw } from "@/components/sections/WorldLessonActivities";
import { questyArt } from "@/lib/questy-art";
import type { World } from "@/lib/worlds";
const rewardKinds: Record<number, "colour" | "jigsaw" | "master" | "graduation"> = {1:"colour",2:"jigsaw",3:"colour",4:"jigsaw",5:"colour",6:"jigsaw",7:"colour",8:"jigsaw",9:"colour",10:"jigsaw",11:"colour",12:"jigsaw",13:"colour",14:"master",15:"graduation"};
export function WorldCompletionExperience({ world, onNextWorld }: { world: World; onNextWorld: (worldId: number) => void }) {
  const reduced=useReducedMotion(); const [open,setOpen]=useState(false); const kind=rewardKinds[world.id];
  const title=kind==="master"?"Great Mystery Solved!":kind==="graduation"?"Congratulations! You did it!":"Mission Complete!";
  return <section className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border-2 border-detective-yellow-300 bg-gradient-to-br from-detective-yellow-50 via-white to-detective-orange-50 p-6 text-center shadow-xl sm:p-8">
    {!reduced && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-2 flex justify-around text-2xl"><motion.span animate={{y:[0,34,0],rotate:[0,100,0]}} transition={{duration:1.8}}>✨</motion.span><motion.span animate={{y:[0,34,0],rotate:[0,-100,0]}} transition={{duration:1.8,delay:.15}}>🎉</motion.span><motion.span animate={{y:[0,34,0],rotate:[0,100,0]}} transition={{duration:1.8,delay:.3}}>⭐</motion.span></div>}
    <motion.div initial={reduced?false:{opacity:0,scale:.85,y:18}} animate={{opacity:1,scale:1,y:0}} transition={{type:"spring",stiffness:220,damping:18}} className="relative">
      <Image src={questyArt.celebrating} alt="Questy celebrating your completed mission" sizes="120px" className="mx-auto h-28 w-auto object-contain drop-shadow-lg"/>
      <p className="font-display text-sm font-semibold uppercase tracking-[.2em] text-detective-orange-600">{kind==="master"?"Master mission complete":kind==="graduation"?"Graduation complete":"World completed"}</p>
      <h3 className="mt-2 font-display text-3xl font-bold text-detective-blue-900">{title}</h3>
      <p className="mt-3 text-lg text-detective-blue-700">{kind==="graduation"?"You are now a Little IP Detective! Your Certificate of Completion is ready.":kind==="master"?"You earned the Master IP Detective achievement!":"Your XP, stars and badge were awarded safely before this optional reward activity."}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><span className="rounded-full bg-white px-4 py-2 font-display font-semibold text-detective-blue-900 shadow-sm"><Sparkles className="mr-1 inline h-4 w-4 text-detective-orange-500"/>+{world.xp} XP</span><span className="rounded-full bg-white px-4 py-2 font-display font-semibold text-detective-blue-900 shadow-sm"><Star className="mr-1 inline h-4 w-4 fill-detective-yellow-400 text-detective-yellow-500"/>Stars earned</span><span className="rounded-full bg-white px-4 py-2 font-display font-semibold text-detective-blue-900 shadow-sm"><Award className="mr-1 inline h-4 w-4 text-detective-orange-500"/>{world.reward.label}</span></div>
      {kind==="graduation"?<div className="mt-7"><a href="/certificates/trademark-master" className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white"><Trophy className="h-5 w-5"/>Certificate of Completion</a></div>:kind==="master"?<p className="mt-7 inline-flex items-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white"><Trophy className="h-5 w-5"/>Master IP Detective</p>:<div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={()=>setOpen(!open)} className="inline-flex items-center justify-center gap-2 rounded-full bg-detective-blue-600 px-6 py-3 font-display font-semibold text-white"><Gamepad2 className="h-5 w-5"/>{open?"Hide Reward Activity":"Play a Reward Activity"}</button><button type="button" onClick={()=>onNextWorld(world.id+1)} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700">Continue <ArrowRight className="h-5 w-5"/></button></div>}
    </motion.div>
    {open&&<div className="relative mt-8 text-left">{kind==="colour"?<ColourQuesty worldId={world.id}/>:<FamousLogoJigsaw worldId={world.id}/>}</div>}
  </section>;
}