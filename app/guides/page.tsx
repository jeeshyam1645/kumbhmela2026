import Link from "next/link";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Magh Mela 2027 guides",
  "Dates, how to reach Sangam, what to pack for January, and a short Kalpvas note for Magh Mela 2027 in Prayagraj.",
  "/guides",
);

const guides = [
  {
    href: "/guides/magh-mela-2027-dates",
    title: "Dates and snan days",
    text: "The 2027 window and the six bathing days reported by the Prayagraj Mela Authority, with the sources named.",
  },
  {
    href: "/guides/how-to-reach-sangam",
    title: "How to reach Sangam",
    text: "Prayagraj airport and the railway stations named by the Ministry of Tourism, then how to ask the camp for the allotted plot.",
  },
  {
    href: "/guides/what-to-pack",
    title: "What to pack in January",
    text: "Cold mornings at the river, and what this camp already provides: bedding, satvik meals, and a guarded compound.",
  },
  {
    href: "/guides/kalpvas",
    title: "Kalpvas",
    text: "The month of simple living that news reports say begins on Paush Purnima, and how a tent stay fits that.",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl md:text-5xl">Guides for Magh Mela 2027</h1>
      <p className="mt-4 text-ink/75">Practical notes for a stay near Sangam in Prayagraj. The camp facts are only those already published on this site. Dates are cited, and anything not announced is left unsaid.</p>
      <ul className="mt-8 space-y-4">
        {guides.map((guide) => (
          <li key={guide.href} className="card p-5">
            <h2 className="font-serif text-2xl"><Link href={guide.href}>{guide.title}</Link></h2>
            <p className="mt-2 text-sm text-ink/75">{guide.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink/75">
        There is also a shorter <Link className="underline" href="/kumbh-guide">rituals and bathing-date list</Link>.
      </p>
    </div>
  );
}
