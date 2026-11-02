import { EnquiryForm } from "@/components/EnquiryForm";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Contact | Magh Mela Stays",
  "Enquire without an account for a Magh Mela 2026 camp. Call or WhatsApp +91 99363 99677.",
  "/contact",
);

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ tent?: string; puja?: string }> }) {
  const params = await searchParams;
  const note = params.puja ? `I would like to know more about ${params.puja}.` : "";
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-28 pb-16 lg:grid-cols-[1.4fr_0.8fr]">
      <div>
        <h1 className="font-serif text-4xl">Contact us</h1>
        <p className="mt-3 text-ink/70">No login needed. Share your dates and tent, and the team aims to call within 2 hours.</p>
        <div className="card mt-6 p-5">
          <EnquiryForm defaultTent={params.tent || ""} defaultNote={note} />
        </div>
      </div>
      <aside className="card h-fit space-y-3 p-5 text-sm">
        <h2 className="font-serif text-2xl">Talk to us</h2>
        <a className="block" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
        <a className="block" href={`mailto:${site.email}`}>{site.email}</a>
        <p>Near Sangam, Prayagraj, Uttar Pradesh</p>
        <p className="text-ink/80">Satvik meals, guarded compound, and purohit arrangements are part of the stay.</p>
      </aside>
    </div>
  );
}
