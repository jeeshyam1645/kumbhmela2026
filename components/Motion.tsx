"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main section, main .card"));
    if (reduce) return;

    const waiting = nodes.filter((node) => node.getBoundingClientRect().top > window.innerHeight * 0.92);
    waiting.forEach((node) => {
      node.dataset.reveal = "true";
      node.classList.add("reveal-wait");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          entry.target.classList.remove("reveal-wait");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    waiting.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
