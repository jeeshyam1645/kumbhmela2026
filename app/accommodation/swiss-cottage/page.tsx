import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { swissCottageMedia } from "@/lib/media";
import { pageMeta, site, whatsAppLink } from "@/lib/site";

const image = `${site.url}${swissCottageMedia.image}`;
const description = "Swiss Cottage tent with a colourful patterned canopy and an attached bathroom, near Sangam for Magh Mela Prayagraj 2026. ₹5000 per night.";

export const metadata = pageMeta("Swiss Cottage | Magh Mela Stays", description, "/accommodation/swiss-cottage", image);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Swiss Cottage",
  description,
  price: "5000",
  priceCurrency: "INR",
  image,
  url: `${site.url}/accommodation/swiss-cottage`,
  availability: "https://schema.org/LimitedAvailability",
  seller: {
    "@type": "LodgingBusiness",
    name: site.name,
    telephone: site.phone,
    image,
  },
};

export default function SwissCottagePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-24">
      <JsonLd data={jsonLd} />
      <p className="text-sm text-saffron-dark">Magh Mela 2026 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Swiss Cottage</h1>
      <p className="mt-3 max-w-2xl text-ink/75">A colourful patterned tent for two or three guests, with an attached bathroom. ₹5,000 a night. The final quote is confirmed on a call.</p>
      <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={swissCottageMedia.image}
          alt={swissCottageMedia.alt}
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl">Video tour</h2>
        <p className="mt-2 text-sm text-ink/70">A quiet walk through the Swiss Cottage. There is no audio.</p>
        <video
          className="mt-4 aspect-[478/850] w-full max-w-[420px] rounded-2xl bg-black object-contain"
          controls
          preload="none"
          playsInline
          poster={swissCottageMedia.poster}
        >
          <source src={swissCottageMedia.tour} type="video/mp4" />
        </video>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/contact?tent=Swiss%20Cottage">Send an enquiry</Link>
        <a className="btn-wa" href={whatsAppLink("Namaste, I would like to know about the Swiss Cottage tent for Magh Mela 2026.")}>WhatsApp</a>
      </div>
    </article>
  );
}
