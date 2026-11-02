import { HomeView } from "@/components/HomeView";
import { JsonLd } from "@/components/JsonLd";
import { listCamps, listPujas } from "@/lib/queries";
import { eventJsonLd, faqJsonLd, lodgingJsonLd, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Magh Mela Camp Booking - Prayagraj 2027",
  "Book Swiss Cottage, Deluxe Tent, and Dormitory stays near Sangam for Magh Mela Prayagraj 2027. Satvik meals, a guarded compound, and help with vedic rituals.",
  "/",
);

export const revalidate = 300;

export default async function HomePage() {
  const [{ camps, live }, pujas] = await Promise.all([listCamps(), listPujas()]);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [lodgingJsonLd(), eventJsonLd(), faqJsonLd()] }} />
      <HomeView camps={camps} live={live} pujas={pujas} />
    </>
  );
}
