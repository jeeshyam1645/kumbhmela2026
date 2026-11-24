import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site, whatsAppLink } from "@/lib/site";

export type GuideFaq = { question: string; answer: string };

export function guideFaqJsonLd(faqs: GuideFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function GuideCta({ note }: { note: string }) {
  return (
    <div className="mt-10 rounded-2xl bg-soft p-6">
      <h2 className="font-serif text-2xl">Book a stay or send an enquiry</h2>
      <p className="mt-2 text-sm text-ink/75">{note} Call or WhatsApp {site.phoneDisplay}. No account is needed.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/accommodation">See stays</Link>
        <Link className="btn-ghost" href="/contact">Enquire</Link>
        <a className="btn-wa" href={whatsAppLink("Namaste, I would like to enquire about a Magh Mela 2027 stay.")}>WhatsApp</a>
      </div>
    </div>
  );
}

export function GuideFaqs({ faqs }: { faqs: GuideFaq[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-3xl">Questions</h2>
      <div className="mt-4 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="mt-1 text-sm text-ink/75">{faq.answer}</p>
          </div>
        ))}
      </div>
      <JsonLd data={guideFaqJsonLd(faqs)} />
    </section>
  );
}
