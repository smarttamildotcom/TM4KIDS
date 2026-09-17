"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import type { World } from "@/lib/worlds";

const activityChoices: Record<NonNullable<World["activity"]["kind"]>, string[]> = {
  match: ["Match the special clue", "Match the creator clue", "Match the original choice"],
  sort: ["Idea / invention", "Brand clue", "Creative work"],
  clue: ["A useful original clue", "A copied clue", "A weather clue"],
  scenario: ["Ask a trusted adult", "Check carefully and respect the creator", "Share without checking"],
  create: ["A problem I noticed", "My original solution", "One special feature"],
  classify: ["Trademark", "Patent", "Copyright", "Design"],
  mystery: ["Trademark key", "Patent key", "Copyright key", "Design key"],
  colour: [],
  jigsaw: [],
};

export function IpDetectiveActivity({ world }: { world: World }) {
  const kind = world.activity.kind ?? "clue";
  const choices = activityChoices[kind] ?? activityChoices.clue;
  const [selected, setSelected] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [invention, setInvention] = useState({ problem: "", solution: "", feature: "" });
  const title = useMemo(() => {
    const labels: Record<string, string> = {
      match: "Match the clues",
      sort: "Sort the clues",
      clue: "Choose the best clue",
      scenario: "Choose the careful action",
      create: "Inventor's workshop",
      classify: "IP classification board",
      mystery: "Open Questy's case files",
    };
    return labels[kind] ?? "Detective activity";
  }, [kind]);

  const toggle = (choice: string) => {
    setSelected((current) => current.includes(choice) ? current.filter((item) => item !== choice) : [...current, choice]);
  };

  const ready = kind === "create"
    ? Boolean(invention.problem.trim() && invention.solution.trim() && invention.feature.trim())
    : selected.length >= Math.min(2, choices.length);

  return (
    <section className="mx-auto max-w-3xl rounded-3xl border-2 border-detective-blue-100 bg-detective-blue-50/50 p-6 shadow-lg sm:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">Hands-on mission</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-detective-blue-900">{title}</h3>
      <p className="mt-3 text-lg text-detective-blue-900/85">{world.activity.instructions}</p>

      {kind === "create" ? (
        <div className="mt-6 grid gap-4">
          {(["problem", "solution", "feature"] as const).map((field) => (
            <label key={field} className="grid gap-2 font-display font-semibold text-detective-blue-900">
              {field === "problem" ? "What problem will you solve?" : field === "solution" ? "What is your original solution?" : "What is one special feature?"}
              <input value={invention[field]} onChange={(event) => setInvention((current) => ({ ...current, [field]: event.target.value }))} maxLength={160} className="rounded-2xl border-2 border-detective-blue-200 bg-white px-4 py-3 font-sans font-normal outline-none focus:border-detective-orange-400" />
            </label>
          ))}
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {choices.map((choice) => (
            <button key={choice} type="button" onClick={() => toggle(choice)} className={`rounded-2xl border-2 px-5 py-4 text-left font-display font-semibold transition ${selected.includes(choice) ? "border-detective-orange-500 bg-detective-yellow-100 text-detective-blue-900" : "border-detective-blue-100 bg-white text-detective-blue-700 hover:border-detective-blue-300"}`}>
              {selected.includes(choice) ? "✓ " : "○ "}{choice}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" disabled={!ready} onClick={() => setComplete(true)} className="inline-flex items-center gap-2 rounded-full bg-detective-orange-500 px-6 py-3 font-display font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
          <Sparkles className="h-5 w-5" /> Solve this mission
        </button>
        <button type="button" onClick={() => { setSelected([]); setComplete(false); setInvention({ problem: "", solution: "", feature: "" }); }} className="inline-flex items-center gap-2 rounded-full border-2 border-detective-blue-200 bg-white px-6 py-3 font-display font-semibold text-detective-blue-700">
          <RotateCcw className="h-5 w-5" /> Start again
        </button>
      </div>
      {complete && <p className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-green-100 px-4 py-3 font-display font-semibold text-green-800"><CheckCircle2 className="h-5 w-5" /> Mission solved! Great careful detective work.</p>}
    </section>
  );
}
