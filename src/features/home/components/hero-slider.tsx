"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Slide = { image: string; title: string; subtitle: string };

const AUTOPLAY_MS = 6000;

type HeroSliderProps = { slides: Slide[]; badge: string; children?: React.ReactNode };

export function HeroSlider({ slides, badge, children }: HeroSliderProps) {
  const t = useTranslations("hero");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);
  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-earth md:min-h-[85svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt=""
          fill
          sizes="100vw"
          preload={i === 0}
          className={cn(
            "-z-20 object-cover transition-opacity duration-1000",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 md:px-8 md:pb-24">
        <p className="mb-4 inline-block rounded-full bg-saffron-600/90 px-4 py-1.5 text-sm font-semibold text-white">
          {badge}
        </p>
        <div aria-live={paused ? "polite" : "off"} className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
            {current.title}
          </h1>
          <p className="mt-4 text-lg text-white/85 md:text-xl">{current.subtitle}</p>
        </div>

        {children}

        {slides.length > 1 && (
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("previous")}
              className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/15"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={t("goTo", { number: i + 1 })}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-saffron-400" : "w-2 bg-white/50 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("next")}
              className="flex size-10 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/15"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
