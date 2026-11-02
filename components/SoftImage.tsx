"use client";

import { useState } from "react";

export function SoftImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setReady(true)}
      className={`${className} transition duration-500 motion-reduce:transition-none ${ready ? "opacity-100 blur-0" : "opacity-70 blur-sm"}`}
    />
  );
}
