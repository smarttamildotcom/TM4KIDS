"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Dice5, MapPin } from "lucide-react";
import { DetectiveAvatar } from "@/components/detective/DetectiveAvatar";
import { readDetectiveProfile, saveDetectiveProfile, type DetectiveCharacterType, type DetectiveProfile } from "@/lib/detective-profile";
import { questyArt } from "@/lib/questy-art";

const initial: DetectiveProfile["avatar"] = {
  baseCharacter: "one",
  skinTone: "light",
  hairstyle: "short",
  top: "shirt",
  bottom: "trousers",
  hat: "cap",
  shoes: "trainers",
  badge: "star",
  backpack: "none",
  characterType: "boy",
};

function selectedCharacter(avatar: DetectiveProfile["avatar"]): DetectiveCharacterType {
  if (avatar.characterType === "boy" || avatar.characterType === "girl") return avatar.characterType;
  return avatar.baseCharacter === "two" || avatar.baseCharacter === "four" ? "girl" : "boy";
}

export function DetectiveOnboarding() {
  const [screen, setScreen] = useState<"intro" | "create" | "meet">("intro");
  const [profile, setProfile] = useState<DetectiveProfile | null>(null);
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(initial);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = readDetectiveProfile();
    if (saved) {
      setProfile(saved);
      setNickname(saved.nickname);
      setAvatar(saved.avatar);
    }
  }, []);

  function chooseCharacter(characterType: DetectiveCharacterType) {
    setAvatar((current) => ({
      ...current,
      characterType,
      baseCharacter: characterType === "girl" ? "two" : "one",
    }));
  }

  function surprise() {
    chooseCharacter(Math.random() < 0.5 ? "boy" : "girl");
  }

  function create() {
    const clean = nickname.trim();
    if (!clean) {
      setError("Please choose a fun detective nickname first.");
      return;
    }
    const next: DetectiveProfile = { version: 1, nickname: clean, avatar };
    saveDetectiveProfile(next);
    setProfile(next);
    setScreen("meet");
  }

  if (screen === "intro") {
    return <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white px-4 py-12">
      <section className="mx-auto grid max-w-4xl items-center gap-8 rounded-[2.5rem] bg-white/85 p-8 shadow-xl md:grid-cols-2">
        <Image src={questyArt.detective} alt="Questy, the orange tabby IP2Kids detective guide" className="mx-auto h-72 w-auto object-contain" priority />
        <div className="text-center md:text-left">
          <p className="font-display text-sm font-bold uppercase tracking-[.2em] text-detective-orange-500">Idea City</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-detective-blue-900">MEET QUESTY!</h1>
          <p className="mt-5 text-lg text-detective-blue-800">&quot;Hi! I&apos;m Questy! Idea City is full of amazing creators, inventions and mysteries. But I can&apos;t solve them alone. I need a detective partner!&quot;</p>
          {profile ? <div className="mt-6 space-y-3">
            <button onClick={() => setScreen("meet")} className="w-full rounded-full bg-detective-blue-600 px-6 py-3 font-display font-bold text-white">Continue as Detective {profile.nickname}</button>
            <button onClick={() => setScreen("create")} className="w-full rounded-full border-2 border-detective-blue-200 px-6 py-3 font-display font-bold text-detective-blue-800">Edit My Detective</button>
          </div> : <button onClick={() => setScreen("create")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-7 py-4 font-display font-bold text-white">CREATE MY DETECTIVE <ArrowRight className="h-5 w-5" /></button>}
        </div>
      </section>
    </main>;
  }

  if (screen === "meet") {
    return <main className="min-h-screen bg-gradient-to-b from-detective-yellow-50 to-white px-4 py-12">
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-white p-8 text-center shadow-xl">
        <h1 className="font-display text-4xl font-bold text-detective-blue-900">🎉 MEET DETECTIVE {nickname.toUpperCase()}!</h1>
        <div className="mt-6 grid items-center gap-5 sm:grid-cols-2">
          <Image src={questyArt.detective} alt="Questy welcomes the new detective" className="mx-auto h-52 w-auto object-contain" />
          <DetectiveAvatar avatar={avatar} pose="celebrate" />
        </div>
        <p className="mt-5 text-lg text-detective-blue-800">&quot;Welcome to the team, Detective {nickname}! Idea City needs detectives like you. Ready for your first mystery?&quot;</p>
        <a href="/#journey" className="mt-7 inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-7 py-4 font-display font-bold text-white">ENTER IDEA CITY <MapPin className="h-5 w-5" /></a>
      </section>
    </main>;
  }

  const selected = selectedCharacter(avatar);
  const choices: Array<{ type: DetectiveCharacterType; title: string; description: string; src: string }> = [
    { type: "boy", title: "Boy Detective", description: "Explorer hat, blue hoodie and magnifying glass", src: "/detective/characters/detective-boy.png" },
    { type: "girl", title: "Girl Detective", description: "Pink detective coat, notebook and magnifying glass", src: "/detective/characters/detective-girl.png" },
  ];

  return <main className="min-h-screen bg-gradient-to-b from-sky-100 to-white px-4 py-8">
    <section className="mx-auto max-w-5xl">
      <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
        <aside className="rounded-[2.5rem] bg-white p-6 text-center shadow-xl lg:sticky lg:top-5 lg:h-fit">
          <p className="font-display text-sm font-bold uppercase tracking-[.2em] text-detective-orange-500">Live preview</p>
          <DetectiveAvatar avatar={avatar} />
          <label className="mt-5 block text-left font-display text-detective-blue-900">What&apos;s your detective name?
            <input value={nickname} onChange={(event) => { setNickname(event.target.value); setError(""); }} maxLength={30} placeholder="e.g. Creative Tiger" className="mt-2 w-full rounded-xl border-2 border-detective-blue-100 px-3 py-3 font-sans outline-none focus:border-detective-orange-500" />
          </label>
          <p className="mt-1 text-right text-xs text-detective-blue-500">{nickname.length}/30</p>
          {error && <p className="mt-2 text-sm font-bold text-detective-orange-600">{error}</p>}
        </aside>
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[.2em] text-detective-orange-500">Your detective partner</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-detective-blue-900">CREATE YOUR DETECTIVE</h1>
          <p className="mt-2 text-lg text-detective-blue-800">Pick a detective friend, give them a nickname, and join Questy in Idea City!</p>
          <section className="mt-6 rounded-[2rem] bg-white p-5 shadow-md">
            <h2 className="font-display text-2xl font-bold text-detective-blue-900">Choose your detective</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {choices.map((choice) => <button key={choice.type} onClick={() => chooseCharacter(choice.type)} className={"group relative overflow-hidden rounded-3xl border-4 p-4 text-left transition motion-safe:hover:-translate-y-1 " + (selected === choice.type ? "border-detective-orange-500 bg-detective-yellow-50 shadow-lg" : "border-detective-blue-100 bg-sky-50")}>
                <Image src={choice.src} alt={choice.title} width={1024} height={1536} sizes="(max-width: 640px) 45vw, 270px" className="mx-auto h-64 w-auto object-contain" />
                <p className="mt-2 text-center font-display text-xl font-bold text-detective-blue-900">{selected === choice.type ? "✓ " : ""}{choice.title}</p>
                <p className="mt-1 text-center text-sm text-detective-blue-700">{choice.description}</p>
              </button>)}
            </div>
          </section>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={surprise} className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-display font-bold text-white"><Dice5 className="h-5 w-5" />Surprise Me!</button>
            <button onClick={create} className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-bold text-white">CREATE MY DETECTIVE <ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  </main>;
}