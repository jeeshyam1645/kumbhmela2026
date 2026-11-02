"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useT } from "./Language";

const order = ["system", "light", "dark"] as const;

export function ThemeToggle({ onHero = false }: { onHero?: boolean }) {
  const { theme, setTheme } = useTheme();
  const { t } = useT();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const current = (theme as (typeof order)[number]) || "system";
  const label =
    current === "light"
      ? t("Light theme. Switch theme.", "हल्की थीम। थीम बदलें।")
      : current === "dark"
        ? t("Dark theme. Switch theme.", "गहरी थीम। थीम बदलें।")
        : t("System theme. Switch theme.", "सिस्टम थीम। थीम बदलें।");

  function cycle() {
    const index = order.indexOf(current);
    setTheme(order[(index + 1) % order.length]);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      className={`grid h-11 w-11 place-items-center rounded-full border transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron ${
        onHero ? "border-white/40 bg-black/30 text-white" : "border-line bg-paper text-ink"
      }`}
    >
      {!ready ? <span className="h-4 w-4" /> : current === "dark" ? <Moon /> : current === "light" ? <Sun /> : <System />}
    </button>
  );
}

function Sun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
  );
}

function System() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
