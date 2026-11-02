import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Privacy Policy | Magh Mela Stays",
  "How Magh Mela Stays uses your name, phone number, and enquiry details.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <article className="prose mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl">Privacy policy</h1>
      <p className="text-sm text-ink/80">Last updated: December 2024</p>
      <h2 className="mt-8 font-serif text-2xl">1. Information we collect</h2>
      <p>When you enquire or create an account we collect your name, mobile number, dates, guest count, tent preference, and any ritual request you write.</p>
      <h2 className="mt-8 font-serif text-2xl">2. How we use it</h2>
      <p>We use it to call you about availability, confirm a stay, arrange a ritual, and send booking updates. We do not sell the information.</p>
      <h2 className="mt-8 font-serif text-2xl">3. Who sees it</h2>
      <p>Camp staff who serve you, priests involved in a requested ritual, and authorities if the law requires it.</p>
      <h2 className="mt-8 font-serif text-2xl">4. Security and retention</h2>
      <p>We keep the details only as long as needed for the stay and any legal record. No internet transmission is perfectly secure.</p>
      <h2 className="mt-8 font-serif text-2xl">5. Your choices</h2>
      <p>You can ask to see, correct, or delete your details, and you can refuse marketing messages.</p>
      <h2 className="mt-8 font-serif text-2xl">6. Cookies</h2>
      <p>The site stores your language choice and a sign-in cookie so you can stay logged in.</p>
      <h2 className="mt-8 font-serif text-2xl">7. Contact</h2>
      <p>{site.phoneDisplay} · {site.email}</p>
    </article>
  );
}
