import Link from "next/link";
import { listPujas } from "@/lib/queries";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Puja Services | Magh Mela Stays",
  "Arrange sankalp, Ganga pujan, and other vedic rituals at Sangam during Magh Mela 2027.",
  "/puja-services",
);

export const revalidate = 300;

export default async function PujaPage() {
  const pujas = await listPujas();
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl">Purohit arrangements and vedic rituals</h1>
      <p className="mt-3 max-w-3xl text-ink/70">We help arrange experienced Brahmins for sankalp and rituals at Sangam, and look after the samagri so you can focus on the worship.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {pujas.map((puja) => (
          <article key={puja.id} className="card p-5">
            <h2 className="font-serif text-2xl">{puja.nameEn}</h2>
            {puja.nameHi && <p className="text-sm text-saffron-dark">{puja.nameHi}</p>}
            <p className="mt-2 text-sm text-ink/70">{puja.descriptionEn}</p>
            <p className="mt-2 text-xs text-ink/75">The dakshina depends on the ritual and the samagri.</p>
            <Link className="mt-3 inline-block text-sm font-semibold text-saffron-dark" href={`/contact?puja=${encodeURIComponent(puja.nameEn)}`}>Enquire</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
