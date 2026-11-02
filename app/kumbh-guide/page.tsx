import { JsonLd } from "@/components/JsonLd";
import { bathingDates, bathingDatesNote, eventJsonLd, formatPrayagraj, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Kumbh Guide | Magh Mela 2027",
  "Bathing dates and rituals for Magh Mela Prayagraj 2027, from Makar Sankranti on 15 January through Maha Shivaratri on 6 March.",
  "/kumbh-guide",
);

const rituals = [
  ["Snan (holy bath)", "A dip at the confluence, best before sunrise."],
  ["Sankalp", "A vow taken at the water with a priest."],
  ["Pind daan", "Offerings for departed ancestors."],
  ["Ganga aarti", "Evening lamps offered to the river."],
  ["Akshay Vat", "The banyan inside Allahabad Fort."],
  ["Akhara visits", "Processions of sadhus from the akharas."],
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-16">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [eventJsonLd()] }} />
      <h1 className="font-serif text-4xl">Kumbh and Magh Mela guide</h1>
      <p className="mt-4 text-ink/75">Magh Mela is the annual gathering at the Sangam of Ganga, Yamuna, and the mythical Saraswati in Prayagraj. Every 12 years it becomes the Kumbh, and every 6 years the Ardh Kumbh. A holy dip on the bathing dates is believed to cleanse a lifetime.</p>
      <h2 className="mt-10 font-serif text-3xl">Bathing dates, 2027</h2>
      <p className="mt-3 text-sm text-ink/70">{bathingDatesNote.en}</p>
      <table className="mt-4 w-full text-left text-sm">
        <thead><tr className="border-b"><th className="py-2">Date</th><th>Festival</th><th>Hindi</th></tr></thead>
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
      <h2 className="mt-10 font-serif text-3xl">Rituals at the Sangam</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {rituals.map(([title, text]) => (
          <article key={title} className="card p-4">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-ink/70">{text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
