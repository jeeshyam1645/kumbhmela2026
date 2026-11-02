import Link from "next/link";
import { pageMeta } from "@/lib/site";

export const metadata = {
  ...pageMeta("Thank you | Magh Mela Stays", "Your Magh Mela 2027 enquiry has been received.", "/thank-you"),
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name } = await searchParams;
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <h1 className="font-serif text-4xl">Thank you{name ? `, ${name}` : ""}</h1>
      <p className="mt-4 text-ink/70">The enquiry is with the camp team. Expect a call about availability and the quote.</p>
      <Link className="btn-primary mt-8" href="/accommodation/swiss-cottage">See the Swiss Cottage</Link>
    </div>
  );
}
