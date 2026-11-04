"use client";

import Link from "next/link";
import { useState } from "react";
import { epTentPhotos } from "@/lib/media";
import { EP_FAMILY_NAME, EP_SHARED_NAME, EP_SHARED_PRICE, whatsAppLink } from "@/lib/site";
import { SoftImage } from "./SoftImage";

type OptionId = "shared" | "family";

const options = {
  shared: {
    id: "shared" as const,
    title: "Without beds (floor)",
    name: EP_SHARED_NAME,
    summary: "Per-person floor stay with a gadda, pillow and blanket. For budget pilgrims and groups. There are no beds.",
    price: `₹${EP_SHARED_PRICE.toLocaleString("en-IN")} per person`,
    photos: [epTentPhotos.sharedExterior, epTentPhotos.dormitory],
  },
  family: {
    id: "family" as const,
    title: "With beds",
    name: EP_FAMILY_NAME,
    summary: "The whole EP tent for one family, with takht beds, pillows and blankets.",
    price: "Price on request",
    photos: [epTentPhotos.familyExterior, epTentPhotos.family],
  },
};

export function EpTentStay({ initial, sharedPrice = EP_SHARED_PRICE }: { initial: OptionId; sharedPrice?: number }) {
  const [option, setOption] = useState<OptionId>(initial);
  const priced = {
    ...options,
    shared: { ...options.shared, price: `₹${sharedPrice.toLocaleString("en-IN")} per person` },
  };
  const current = priced[option];
  const other = option === "shared" ? priced.family : priced.shared;

  return (
    <article className="mx-auto max-w-5xl px-4 pt-28 pb-16">
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">EP Tent</h1>
      <p className="mt-3 max-w-2xl text-ink/75">One tent, two ways to stay. The dormitory is a shared floor stay. The family option is the same tent with takht beds.</p>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="EP Tent options">
        {(Object.keys(priced) as OptionId[]).map((id) => (
          <button
            key={id}
            className={option === id ? "btn-primary" : "btn-ghost"}
            type="button"
            role="tab"
            aria-selected={option === id}
            onClick={() => setOption(id)}
          >
            {priced[id].title}
          </button>
        ))}
      </div>
      <section className="mt-8" role="tabpanel">
        <h2 className="font-serif text-3xl">{current.name}</h2>
        <p className="mt-3 max-w-2xl text-ink/75">{current.summary}</p>
        <p className="mt-3 text-lg font-semibold text-saffron-dark">{current.price}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {current.photos.map((photo, index) => (
            <div key={photo.webp} className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft ${index === 0 ? "sm:col-span-2" : ""}`}>
              <SoftImage src={photo.webp} fallbackSrc={photo.jpg} alt={photo.alt} className="h-full w-full object-cover object-center" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" href={`/contact?tent=${encodeURIComponent(current.name)}`}>Send an enquiry</Link>
          <a className="btn-wa" href={whatsAppLink(`Namaste, I would like to know about the ${current.name} for Magh Mela 2027.`)}>WhatsApp</a>
        </div>
        <p className="mt-6 text-sm text-ink/70">
          Looking at the other way to use this tent?{" "}
          <button className="underline" type="button" onClick={() => setOption(other.id)}>{other.title}</button>
        </p>
      </section>
    </article>
  );
}
