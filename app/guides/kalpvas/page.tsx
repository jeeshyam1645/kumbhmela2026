import Link from "next/link";
import { GuideCta, GuideFaqs } from "@/components/GuideExtras";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Kalpvas at Magh Mela 2027",
  "Kalpvas at Prayagraj is the month of simple living. Hindustan Times reported that it begins on Paush Purnima, 22 January 2027. The camp offers satvik meals and simple tents.",
  "/guides/kalpvas",
);

const faqs = [
  {
    question: "When does Kalpvas 2027 start?",
    answer: "Hindustan Times reported on 2 August 2026 that the month-long stay of austerity begins on Paush Purnima, 22 January 2027, and that the mela itself runs until the Mahashivratri bath on 6 March 2027.",
  },
  {
    question: "Does the camp set the rules of the vow?",
    answer: "No. Kalpvas is a personal observance. Incredible India describes it as a month in camp given to prayer, meditation, charity, and simple living. What you eat, how often you bathe, and how strict you are, is your vow. Tell the camp what you need and the team will say what the kitchen and the tent can do.",
  },
  {
    question: "Can I stay the whole month?",
    answer: "Send the enquiry with 22 January as check-in, or whatever date your vow starts, and 6 March or your own last day as check-out. The shared EP tent is a floor stay with a gadda, pillow, and blanket. The family tent has takht beds. Satvik meals are included with a stay.",
  },
];

export default function KalpvasGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Kalpvas</h1>
      <p className="mt-4 text-ink/75">
        Kalpvas is the tradition of staying through the Magh month at the Sangam in a simple camp, with a quieter routine than a short visit. The Ministry of Tourism describes devotees spending the month in temporary camps, in prayer, meditation, charity, and simple living.
      </p>
      <p className="mt-3 text-ink/75">
        Hindustan Times, reporting the Prayagraj Mela Authority’s 2027 schedule, said this stay of austerity begins on Paush Purnima, 22 January 2027. The mela’s last reported bathing day is Mahashivratri on 6 March 2027. Those dates are from that news report and the tourism listing of the overall window. The authority’s own public page does not publish the 2027 calendar, so confirm them before you commit to a month.
      </p>

      <h2 className="mt-10 font-serif text-3xl">What a camp stay can cover</h2>
      <p className="mt-3 text-ink/75">
        This camp is 500 m from Sangam, 50 m from Ganga ji, and 300 m from Bade Hanuman ji Mandir (Lete Hanuman ji). A stay includes satvik meals, bedding for the January cold, and a guarded compound with staff on site. The shared EP tent is a floor stay: gadda, pillow, and blanket, and no beds. The family EP tent is the whole tent with takht beds. The Swiss Cottage has an attached bathroom for 2–3 guests. The Deluxe Tent has twin beds and a shared bathroom for 2 guests.
      </p>
      <p className="mt-3 text-ink/75">
        The camp does not publish a kalpvas rulebook. If your vow is stricter than a normal satvik meal, write that in the enquiry. The team aims to call within 2 hours.
      </p>

      <h2 className="mt-10 font-serif text-3xl">A short visit is also fine</h2>
      <p className="mt-3 text-ink/75">
        Most guests come for one bathing day, not the whole month. The six reported snan days are on the <Link className="underline" href="/guides/magh-mela-2027-dates">dates page</Link>. Book the nights you need.
      </p>

      <GuideCta note="For a month-long stay, send the full dates and how many people will keep the vow with you." />
      <GuideFaqs faqs={faqs} />
      <p className="mt-8 text-sm text-ink/75">
        <Link className="underline" href="/guides">All guides</Link>
        {" · "}
        <Link className="underline" href="/contact">Enquire</Link>
      </p>
    </article>
  );
}