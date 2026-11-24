import Link from "next/link";
import { GuideCta, GuideFaqs } from "@/components/GuideExtras";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "How to reach Sangam for Magh Mela 2027",
  "Prayagraj airport and the railway stations listed by the Ministry of Tourism, and how to ask Magh Mela Stays for the camp plot allotted near Sangam.",
  "/guides/how-to-reach-sangam",
);

const faqs = [
  {
    question: "Which station should I book?",
    answer: "Incredible India names Prayagraj Junction (PRYJ), Prayagraj Chheoki (PCOI), Prayagraj Rambag (PRRB), and Prayagraj Sangam (PYGS) as the major stations. This page does not rank them by distance to the camp, because the camp plot is allotted by the Mela Adhikari and can change.",
  },
  {
    question: "Is there an airport?",
    answer: "Yes. Incredible India lists Prayagraj Airport as the nearest airport for Magh Mela 2027. From there, ask the camp how to reach the allotted plot.",
  },
  {
    question: "Where exactly is the camp?",
    answer: "Near Sangam, Prayagraj, Uttar Pradesh. The exact plot is the one allotted by the Mela Adhikari. Call +91 99363 99677 when you enquire and the team will tell you the meeting point for your dates.",
  },
];

export default function ReachGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <p className="text-sm text-saffron-dark">Magh Mela 2027 · Prayagraj</p>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl">How to reach Sangam</h1>
      <p className="mt-4 text-ink/75">
        The mela is at the Sangam in Prayagraj, where the Ganga and Yamuna meet. The Ministry of Tourism’s Incredible India page for Magh Mela 2027 names the airport and the main railway stations below. This camp is near Sangam. The exact plot depends on the Mela Adhikari’s allotment, so this page does not give a kilometre figure or a fixed gate.
      </p>

      <h2 className="mt-10 font-serif text-3xl">By train</h2>
      <p className="mt-3 text-ink/75">Incredible India lists these as the major railway stations for the mela:</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/75">
        <li>Prayagraj Junction (PRYJ)</li>
        <li>Prayagraj Chheoki Junction (PCOI)</li>
        <li>Prayagraj Rambag (PRRB)</li>
        <li>Prayagraj Sangam (PYGS)</li>
      </ul>
      <p className="mt-3 text-ink/75">Book the train that suits your city. When you enquire, say which station you will arrive at and the camp can tell you how to reach that year’s plot.</p>

      <h2 className="mt-10 font-serif text-3xl">By air</h2>
      <p className="mt-3 text-ink/75">The same tourism page names Prayagraj Airport as the nearest airport. From the airport, plan the last stretch with the camp rather than a guessed landmark. The plot is allotted, not a permanent street address.</p>

      <h2 className="mt-10 font-serif text-3xl">By road</h2>
      <p className="mt-3 text-ink/75">
        Prayagraj is on the state road network. Hindustan Times reported that the SDM (Magh Mela) sent the 2027 bathing schedule to UPSRTC, the state road transport corporation, so bus planning is part of the official preparation. Road closures on the big bathing days are announced closer to the mela. Ask the camp for the approach that is open on your dates.
      </p>

      <h2 className="mt-10 font-serif text-3xl">From the city to the camp</h2>
      <p className="mt-3 text-ink/75">
        The camp is near Sangam, Prayagraj, Uttar Pradesh. Staff are on site in a guarded compound. Call {site.phoneDisplay} or send the enquiry form with your arrival point. The team aims to call within 2 hours. You do not need an account.
      </p>

      <h2 className="mt-10 font-serif text-3xl">Source</h2>
      <p className="mt-3 text-sm text-ink/75">
        Airport and station names: <a className="underline" href="https://www.incredibleindia.gov.in/en/festivals-and-events/uttar-pradesh/magh-mela-2027">Incredible India, Magh Mela 2027</a>. The bathing-date communication to the railways and UPSRTC: <a className="underline" href="https://www.hindustantimes.com/cities/others/51day-magh-mela-to-begin-on-january-15-bathing-dates-announced-101785611727810.html">Hindustan Times, 2 August 2026</a>.
      </p>

      <GuideCta note="Include your station or airport and the dates you need. We will confirm the stay and the way to the allotted plot." />
      <GuideFaqs faqs={faqs} />
      <p className="mt-8 text-sm text-ink/75">
        Next: <Link className="underline" href="/guides/what-to-pack">what to pack</Link>
        {" · "}
        <Link className="underline" href="/guides/magh-mela-2027-dates">dates</Link>
      </p>
    </article>
  );
}
