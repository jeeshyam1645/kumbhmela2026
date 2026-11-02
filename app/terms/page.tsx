import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Terms | Magh Mela Stays",
  "Booking, cancellation, and camp rules for Magh Mela Stays near Sangam.",
  "/terms",
);

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl">Terms and cancellation</h1>
      <p className="mt-2 text-sm text-ink/80">Last updated: December 2024</p>
      <h2 className="mt-8 font-serif text-2xl">Booking</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
        <li>Bookings depend on availability and a confirmation call.</li>
        <li>A stay is confirmed after the advance is received.</li>
        <li>The balance is due 7 days before check-in.</li>
        <li>Quoted rates are per person per night unless we say otherwise.</li>
      </ul>
      <h2 className="mt-8 font-serif text-2xl">Cancellation</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
        <li>30 or more days before check-in: 90% refund.</li>
        <li>15–29 days: 70% refund.</li>
        <li>7–14 days: 50% refund.</li>
        <li>Under 7 days: no refund.</li>
      </ul>
      <h2 className="mt-8 font-serif text-2xl">Camp rules</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
        <li>Check-in 12:00, check-out 10:00.</li>
        <li>No alcohol, non-vegetarian food, or smoking in the compound.</li>
        <li>Guests look after their own belongings. Damage to camp property is charged.</li>
        <li>Quiet hours are 22:00 to 06:00.</li>
      </ul>
      <h2 className="mt-8 font-serif text-2xl">Rituals</h2>
      <p className="mt-3 text-sm">Puja is arranged with priests we know. The cost depends on the ritual, samagri, and dakshina. Cancel a ritual at least 24 hours ahead.</p>
      <h2 className="mt-8 font-serif text-2xl">Liability</h2>
      <p className="mt-3 text-sm">The camp is not liable for loss or injury unless it comes from our gross negligence. Travel insurance is a good idea.</p>
      <p className="mt-6 text-sm">{site.phoneDisplay} · {site.email}</p>
    </article>
  );
}
