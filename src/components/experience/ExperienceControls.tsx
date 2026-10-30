"use client";
import { Languages, Sparkles } from "lucide-react";
import { useExperience, type Locale } from "@/lib/experience/ExperienceProvider";

export function ExperienceControls() {
  const { locale, setLocale, motionEnabled, setMotionEnabled, t } = useExperience();
  return <div className="flex flex-wrap items-center gap-2" aria-label="Experience settings">
    <label className="inline-flex items-center gap-1 rounded-full border border-detective-blue-100 bg-white px-2 py-1 text-sm text-detective-blue-900">
      <Languages className="h-4 w-4" aria-hidden="true"/>
      <span className="sr-only">{t.language}</span>
      <select aria-label={t.language} value={locale} onChange={e=>setLocale(e.target.value as Locale)} className="max-w-32 bg-transparent px-1 py-1 text-sm font-semibold focus:outline-none">
        <option value="en">English</option><option value="ta">தமிழ்</option><option value="hi">हिन्दी</option><option value="ms">Bahasa Melayu</option>
      </select>
    </label>
    <button type="button" aria-pressed={motionEnabled} onClick={()=>setMotionEnabled(!motionEnabled)} className="inline-flex items-center gap-1 rounded-full border border-detective-blue-100 bg-white px-3 py-2 text-xs font-semibold text-detective-blue-900" title={t.motion}>
      <Sparkles className="h-4 w-4" aria-hidden="true"/>{t.motion}: {motionEnabled ? "On" : "Off"}
    </button>
  </div>;
}
