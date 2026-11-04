import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SoftImage } from "@/components/SoftImage";
import { swissCottageMedia } from "@/lib/media";
import { pageMeta, site, whatsAppLink } from "@/lib/site";

const image = `${site.url}${swissCottageMedia.image}`;
const description = "Swiss Cottage tent with an attached bathroom, near Sangam for Magh Mela Prayagraj 2027.";

export const metadata = pageMeta("Swiss Cottage | Magh Mela Stays", description, "/accommodation/swiss-cottage", image);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Swiss Cottage",
  description,
  image: swissCottageMedia.photos.map((photo) => `${site.url}${photo.webp}`),
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
    <article className="mx-auto max-w-5xl px-4 pt-28 pb-16">
      <JsonLd data={jsonLd} />
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Swiss Cottage</h1>
      <p className="mt-3 max-w-2xl text-ink/75">A tent for two or three guests, with an attached bathroom. The quote is confirmed on a call.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {swissCottageMedia.photos.map((photo, index) => (
          <div key={photo.webp} className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft ${index === 0 ? "sm:col-span-2" : ""}`}>
            <SoftImage src={photo.webp} fallbackSrc={photo.jpg} alt={photo.alt} className="h-full w-full object-cover object-center" />
          </div>
        ))}
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
        <a className="btn-wa" href={whatsAppLink("Namaste, I would like to know about the Swiss Cottage tent for Magh Mela 2027.")}>WhatsApp</a>
      </div>
    </article>
  );
}
