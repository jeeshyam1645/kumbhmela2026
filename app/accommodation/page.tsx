import { CampList } from "@/components/CampList";
import { JsonLd } from "@/components/JsonLd";
import { listCamps } from "@/lib/queries";
import { lodgingJsonLd, pageMeta, tentOffers } from "@/lib/site";

export const metadata = pageMeta(
  "Accommodation | Magh Mela Stays",
  "Swiss Cottage, Deluxe Tent, and EP Tent stays for Magh Mela Prayagraj 2027, near Sangam.",
  "/accommodation",
);

export const revalidate = 300;

export default async function AccommodationPage() {
  const { camps, live } = await listCamps();
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [lodgingJsonLd()] }} />
      <h1 className="font-serif text-4xl text-saffron-dark">Comfort-first pilgrimage</h1>
      <p className="mt-3 max-w-2xl text-ink/70">Clean, warm tents near Sangam for Magh Mela 2027. The quote is confirmed on a call.</p>
      <p className="mt-3 text-sm text-ink/80">{tentOffers.map((offer) => offer.name).join(" · ")}</p>
      <div className="mt-8">
        <CampList camps={camps} live={live} />
      </div>
    </div>
  );
}
