import Link from "next/link";
import { GuideCta, GuideFaqs } from "@/components/GuideExtras";
import { bathingDates, formatPrayagraj, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Magh Mela 2027 dates and snan days",
  "Magh Mela 2027 in Prayagraj runs 15 January to 6 March, with six bathing days reported by the Prayagraj Mela Authority. Confirm the list before you travel.",
  "/guides/magh-mela-2027-dates",
);

const faqs = [
  {
    question: "When is Magh Mela 2027?",
    answer: "Hindustan Times reported on 2 August 2026 that the Prayagraj Mela Authority’s schedule runs from 15 January to 6 March 2027. The Ministry of Tourism’s Incredible India page lists the same window.",
  },
  {
    question: "What is the main bathing day?",
    answer: "The same Hindustan Times report lists Mauni Amavasya on 6 February 2027 among the six major bathing days. Crowds are usually largest on that day. The Mela Authority’s own public webpage does not currently publish the 2027 list, so check again before you travel.",
  },
  {
    question: "Is 2027 a Kumbh year at Prayagraj?",
    answer: "No. Magh Mela is the annual gathering. It becomes the Kumbh every 12 years and the Ardh Kumbh every 6 years. 2027 is the yearly Magh Mela.",
  },
  {
    question: "Can I book a tent for these dates?",
    answer: "Yes. Send an enquiry with your dates, guests, and tent type, or call +91 99363 99677. You do not need an account. The camp team aims to call within 2 hours.",
  },
];

export default function DatesGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">Dates and snan days</h1>
      <p className="mt-4 text-ink/75">
        On 2 August 2026, Hindustan Times reported that the Prayagraj Mela Authority had released a 51-day schedule, and that the SDM (Magh Mela) had sent those bathing dates to the district administration, police, railways, and transport departments. The fair begins with Makar Sankranti on 15 January 2027 and ends with the Mahashivratri bath on 6 March 2027.
      </p>
      <p className="mt-3 text-ink/75">
        The Ministry of Tourism lists the same overall dates on its Incredible India page for Magh Mela 2027: 15 January 2027 to 6 March 2027. That page does not repeat each bathing day.
      </p>
      <p className="mt-3 text-sm text-ink/70">
        The Prayagraj Mela Authority’s own page on the Uttar Pradesh government site describes the authority but does not publish this 2027 calendar. Treat the table as the schedule reported in the press, and confirm it with the official mela notice before you travel.
      </p>

      <h2 className="mt-10 font-serif text-3xl">Bathing days reported for 2027</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Date</th>
            <th>Festival</th>
            <th>Hindi</th>
          </tr>
        </thead>
        <tbody>
          {bathingDates.map((item) => (
            <tr key={item.date} className="border-b border-orange-100">
              <td className="py-3">{formatPrayagraj(item.date, "en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</td>
              <td>{item.nameEn}</td>
              <td>{item.nameHi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-ink/70">
        Hindustan Times also reported that Kalpvas, the month-long stay of austerity, begins on Paush Purnima, 22 January 2027. A separate note is on the <Link className="underline" href="/guides/kalpvas">Kalpvas guide</Link>.
      </p>

      <h2 className="mt-10 font-serif text-3xl">Sources</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/75">
        <li>
          <a className="underline" href="https://www.hindustantimes.com/cities/others/51day-magh-mela-to-begin-on-january-15-bathing-dates-announced-101785611727810.html">Hindustan Times, 2 August 2026</a>: “51-day Magh Mela to begin on January 15, bathing dates announced.” Attributes the schedule to the Prayagraj Mela Authority and an SDM (Magh Mela) communication.
        </li>
        <li>
          <a className="underline" href="https://www.incredibleindia.gov.in/en/festivals-and-events/uttar-pradesh/magh-mela-2027">Incredible India, Ministry of Tourism</a>: Magh Mela 2027 listed as 15 January 2027 – 6 March 2027.
        </li>
        <li>
          <a className="underline" href="https://prayagrajdivision.nic.in/division/prayagraj-mela-authority/">Prayagraj Mela Authority</a> on the Uttar Pradesh government site: describes the authority. It does not publish the 2027 bathing list.
        </li>
      </ul>

      <GuideCta note="Tell us the bathing day you want to be here for, and whether you need the Swiss Cottage, the Deluxe Tent, or the EP tent." />
      <GuideFaqs faqs={faqs} />
      <p className="mt-8 text-sm text-ink/75">
        Next: <Link className="underline" href="/guides/how-to-reach-sangam">how to reach Sangam</Link>
        {" · "}
        <Link className="underline" href="/guides">all guides</Link>
      </p>
    </article>
  );
}
