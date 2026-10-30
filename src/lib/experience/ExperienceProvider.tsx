"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "ta" | "hi" | "ms";
type Settings = { locale: Locale; setLocale: (value: Locale) => void; motionEnabled: boolean; setMotionEnabled: (value: boolean) => void };
const Context = createContext<Settings | null>(null);
const valid: Locale[] = ["en", "ta", "hi", "ms"];

export const copy = {
  en: { home:"Home", about:"About", adventures:"Adventures", parents:"Parents & Educators", books:"Book Corner", contact:"Contact", badge:"Ideas Have Superpowers!", heading:"Discover the amazing", headingAccent:"ideas hiding all around you.", intro:"Join Questy to explore, solve mysteries and discover how people create, invent, design and build brands.", free:"Start with two free adventures. More adventures require membership.", create:"Create", invent:"Invent", brand:"Brand", imagine:"Imagine", language:"Language", motion:"Animations" },
  ta: { home:"முகப்பு", about:"பற்றி", adventures:"சாகசங்கள்", parents:"பெற்றோர் மற்றும் ஆசிரியர்கள்", books:"புத்தகங்கள்", contact:"தொடர்பு", badge:"யோசனைகளுக்கு அபார சக்தி உண்டு!", heading:"உங்களைச் சுற்றியுள்ள", headingAccent:"அற்புதமான யோசனைகளைக் கண்டறியுங்கள்.", intro:"குவெஸ்டியுடன் சேர்ந்து ஆராயுங்கள், மர்மங்களைத் தீருங்கள், படைப்புகள், கண்டுபிடிப்புகள் மற்றும் பிராண்டுகளைப் பற்றி அறியுங்கள்.", free:"முதல் இரண்டு சாகசங்கள் இலவசம். மற்றவற்றுக்கு உறுப்பினர் அனுமதி தேவை.", create:"உருவாக்கு", invent:"கண்டுபிடி", brand:"பிராண்ட்", imagine:"கற்பனை செய்", language:"மொழி", motion:"அசைவூட்டங்கள்" },
  hi: { home:"होम", about:"परिचय", adventures:"रोमांच", parents:"अभिभावक और शिक्षक", books:"पुस्तकें", contact:"संपर्क", badge:"विचारों में अद्भुत शक्ति है!", heading:"अपने आसपास छिपे", headingAccent:"अद्भुत विचारों को खोजें।", intro:"क्वेस्टी के साथ खोजबीन करें, रहस्य सुलझाएँ और रचनाओं, आविष्कारों, डिज़ाइन और ब्रांड के बारे में जानें।", free:"पहले दो रोमांच मुफ़्त हैं। बाकी के लिए सदस्यता आवश्यक है।", create:"बनाएँ", invent:"आविष्कार", brand:"ब्रांड", imagine:"कल्पना", language:"भाषा", motion:"एनिमेशन" },
  ms: { home:"Utama", about:"Tentang Kami", adventures:"Pengembaraan", parents:"Ibu Bapa & Pendidik", books:"Sudut Buku", contact:"Hubungi Kami", badge:"Idea Mempunyai Kuasa Hebat!", heading:"Temui idea hebat", headingAccent:"yang tersembunyi di sekeliling anda.", intro:"Sertai Questy untuk meneroka, menyelesaikan misteri dan mengenali ciptaan, reka bentuk, rekaan baharu serta jenama.", free:"Dua pengembaraan pertama adalah percuma. Selebihnya memerlukan keahlian.", create:"Cipta", invent:"Reka Cipta", brand:"Jenama", imagine:"Bayangkan", language:"Bahasa", motion:"Animasi" }
} as const;

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [motionEnabled, setMotionState] = useState(true);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ip2kids-locale");
      if (valid.includes(saved as Locale)) setLocaleState(saved as Locale);
      const motion = localStorage.getItem("ip2kids-motion");
      if (motion !== null) setMotionState(motion === "true");
      else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotionState(false);
    } catch { /* Storage may be disabled. */ }
  }, []);
  const setLocale = (value: Locale) => { setLocaleState(value); try { localStorage.setItem("ip2kids-locale", value); } catch {} };
  const setMotionEnabled = (value: boolean) => { setMotionState(value); try { localStorage.setItem("ip2kids-motion", String(value)); } catch {} };
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return <Context.Provider value={{ locale, setLocale, motionEnabled, setMotionEnabled }}>{children}</Context.Provider>;
}
export function useExperience() {
  const value = useContext(Context);
  if (!value) throw new Error("useExperience must be used inside ExperienceProvider");
  return { ...value, t: copy[value.locale] };
}
