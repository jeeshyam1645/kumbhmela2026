"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "hi";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, hi: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);
  const t = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useT must be used within LanguageProvider");
  return context;
}
