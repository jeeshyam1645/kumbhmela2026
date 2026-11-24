import Link from "next/link";
import { GuideCta, GuideFaqs } from "@/components/GuideExtras";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "What to pack for Magh Mela 2027",
  "January at Sangam is cold. This camp provides bedding and satvik meals. Here is what to bring, and what the Swiss Cottage, Deluxe Tent, and EP tent already include.",
  "/guides/what-to-pack",
);

const faqs = [
  {
    question: "Does the camp provide bedding?",
    answer: "Yes. Stays include bedding for the January cold. The shared EP tent is a floor stay with a gadda, pillow, and blanket, and it has no beds. The family EP tent has takht beds, pillows, and blankets.",
  },
  {
    question: "What food is served?",
    answer: "Satvik meals. If you are keeping a stricter personal fast, say so in the enquiry so the team can tell you what the kitchen can do. The camp does not publish a separate kalpvas menu.",
  },
  {
    question: "How cold is it?",
    answer: "January mornings and nights at the river are cold enough that the camp provides bedding for that cold. Bring layers you can add and remove. This page does not quote a temperature, because that changes by the week.",
  },
  {
    question: "Which tent should I ask for?",
    answer: "Swiss Cottage is for 2–3 guests and has an attached bathroom. The Deluxe Tent is for 2 guests, with twin beds and a shared bathroom. The shared EP tent is a per-person floor stay. The family EP tent is the whole tent with takht beds, and the price is on request.",
  },
];

export default function PackGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">What to pack for January</h1>
      <p className="mt-4 text-ink/75">
        Magh Mela falls in the cold weeks. Mornings at the Sangam are cold, and the evening after a dip is colder still. Pack for that, and leave the heavy bedding to the camp.
      </p>

      <h2 className="mt-10 font-serif text-3xl">What the camp already provides</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/75">
        <li>Bedding for the January cold.</li>
        <li>Satvik meals.</li>
        <li>A guarded compound with staff on site.</li>
        <li>Swiss Cottage: an attached bathroom, for 2–3 guests.</li>
        <li>Deluxe Tent: twin beds and a shared bathroom, for 2 guests.</li>
        <li>EP tent, shared: a floor stay with a gadda, pillow, and blanket. There are no beds. The published price is ₹999 per person.</li>
        <li>EP tent, family: the whole tent for one family, with takht beds, pillows, and blankets. The price is on request.</li>
      </ul>
      <p className="mt-3 text-sm text-ink/70">Other quotes are confirmed on the call. The team aims to call within 2 hours of an enquiry.</p>

      <h2 className="mt-10 font-serif text-3xl">What to bring yourself</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/75">
        <li>Layers: a warm shawl or jacket for the ghat at dawn, and something lighter for the afternoon.</li>
        <li>Clothes you can change after a dip. The riverbank is wet.</li>
        <li>Footwear you can take off easily, and a pair that can get sandy.</li>
        <li>Any medicine you already use. The camp does not describe an on-site clinic on this website.</li>
        <li>A torch. Mela lanes are uneven, and the plot is allotted rather than a fixed street.</li>
      </ul>
      <p className="mt-3 text-ink/75">That list is practical advice for the river in January. It is not an inventory of things the camp supplies.</p>

      <h2 className="mt-10 font-serif text-3xl">On the big bathing days</h2>
      <p className="mt-3 text-ink/75">
        The reported snan days are on the <Link className="underline" href="/guides/magh-mela-2027-dates">dates guide</Link>. Roads are busiest then. Leave earlier than you think, carry the camp’s phone number ({site.phoneDisplay}), and agree the meeting point when you book.
      </p>

      <GuideCta note="Say how many guests you are, the dates, and whether you want beds or a floor stay." />
      <GuideFaqs faqs={faqs} />
      <p className="mt-8 text-sm text-ink/75">
        Next: <Link className="underline" href="/guides/kalpvas">Kalpvas</Link>
        {" · "}
        <Link className="underline" href="/accommodation">the tents</Link>
      </p>
    </article>
  );
}
