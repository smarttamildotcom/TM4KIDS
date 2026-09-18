"use client";

import Image from "next/image";
import type { DetectiveProfile } from "@/lib/detective-profile";

type Pose = "default" | "investigate" | "thinking" | "celebrate" | "notes";

function characterFor(avatar: DetectiveProfile["avatar"]) {
  if (avatar.characterType === "boy" || avatar.characterType === "girl") return avatar.characterType;
  return avatar.baseCharacter === "two" || avatar.baseCharacter === "four" ? "girl" : "boy";
}

export function DetectiveAvatar({ avatar, pose = "default" }: { avatar: DetectiveProfile["avatar"]; pose?: Pose }) {
  const character = characterFor(avatar);
  const src = character === "girl" ? "/detective/characters/detective-girl.png" : "/detective/characters/detective-boy.png";

  return (
    <div className="relative mx-auto w-full max-w-[250px] overflow-visible">
      <Image
        src={src}
        alt={character === "girl" ? "Girl detective avatar" : "Boy detective avatar"}
        width={1024}
        height={1536}
        sizes="(max-width: 640px) 190px, 250px"
        className="h-auto w-full object-contain drop-shadow-xl"
      />
      {pose === "investigate" && <span aria-hidden className="pointer-events-none absolute left-2 top-1/3 text-3xl motion-safe:animate-pulse">✦</span>}
      {pose === "thinking" && <span aria-hidden className="pointer-events-none absolute right-2 top-8 rounded-full bg-white px-3 py-1 font-display text-2xl font-bold text-detective-blue-700 shadow">?</span>}
      {pose === "celebrate" && <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-3 text-center text-3xl motion-safe:animate-bounce">✨ 🎉 ✨</span>}
      {pose === "notes" && <span aria-hidden className="pointer-events-none absolute -right-1 bottom-12 rounded-lg bg-detective-yellow-100 px-2 py-1 text-lg shadow">📝</span>}
    </div>
  );
}