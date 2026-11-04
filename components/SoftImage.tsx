"use client";

import { useState } from "react";

export function SoftImage({ src, fallbackSrc, alt, className = "" }: { src: string; fallbackSrc?: string; alt: string; className?: string }) {
  const [ready, setReady] = useState(false);
  const img = (
    <img
      src={fallbackSrc || src}
      alt={alt}
      onLoad={() => setReady(true)}
      className={`${className} transition duration-500 motion-reduce:transition-none ${ready ? "opacity-100 blur-0" : "opacity-70 blur-sm"}`}
    />
  );
  if (!fallbackSrc) return img;
  return (
    <picture className="contents">
      <source srcSet={src} type="image/webp" />
      {img}
    </picture>
  );
}
