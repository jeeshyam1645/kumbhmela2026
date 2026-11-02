"use client";

import Image from "next/image";
import Link from "next/link";
import type { CampRecord, PujaRecord } from "@/lib/queries";
import { bathingDates, formatPrayagraj, guestFaqs, site, tentOffers, whatsAppLink } from "@/lib/site";
import { cloudinaryUrl, swissCottageMedia } from "@/lib/media";
import { CampList } from "./CampList";
import { useT } from "./Language";

export function HomeView({ camps, live, pujas }: { camps: CampRecord[]; live: boolean; pujas: PujaRecord[] }) {
  const { t, lang } = useT();
  const nextDate = bathingDates.find((item) => new Date(`${item.date}T00:00:00+05:30`).getTime() >= Date.now()) || bathingDates[0];

  return (
    <div>
      <section className="relative flex min-h-[78vh] items-end bg-ink text-white">
        <Image
          src={swissCottageMedia.image}
          alt={swissCottageMedia.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center max-md:portrait:object-[center_60%]"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/75 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-32">
          <p className="mb-3 text-sm text-orange-100">Magh Mela 2026 · Prayagraj</p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{t("Your sanctuary at Sangam", "संगम तट पर आपका घर")}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{t("A colourful Swiss Cottage tent, and a quiet place to rest after the holy dip.", "रंगीन स्विस कॉटेज टेंट, और स्नान के बाद विश्राम के लिए एक शांत स्थान।")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-wa" href={whatsAppLink("Namaste, I am interested in Magh Mela 2026 accommodation.")} target="_blank" rel="noopener noreferrer">{t("Plan on WhatsApp", "व्हाट्सएप पर योजना")}</a>
            <Link className="btn bg-white/15 text-white ring-1 ring-white/40" href="/accommodation/swiss-cottage">{t("See the Swiss Cottage", "स्विस कॉटेज देखें")}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
        {[
          [t("Guarded compound", "सुरक्षित परिसर"), t("Staff on site, day and night", "दिन-रात स्टाफ")],
          [t("Local hosts", "स्थानीय मेजबान"), t("A Prayagraj family", "प्रयागराज का परिवार")],
          [t("Near Sangam", "संगम के पास"), t("Walk to the holy dip", "पवित्र स्नान के पास")],
        ].map(([title, text]) => (
          <div key={title} className="card p-5">
            <h2 className="font-serif text-xl">{title}</h2>
            <p className="mt-1 text-sm text-ink/70">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl">{t("Stays", "आवास")}</h2>
            <p className="mt-2 text-sm text-ink/70">
              {tentOffers.map((offer) => `${offer.name} · ₹${offer.price.toLocaleString("en-IN")}`).join(" · ")} / {t("night", "रात")}
            </p>
          </div>
          <Link href="/accommodation" className="text-sm font-semibold text-saffron-dark">{t("All tents", "सभी टेंट")}</Link>
        </div>
        <CampList camps={camps.slice(0, 3)} live={live} />
      </section>

      <section className="bg-orange-50/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl">{t("Vedic rituals", "वैदिक अनुष्ठान")}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pujas.slice(0, 3).map((puja) => (
              <div key={puja.id} className="card p-5">
                <h3 className="font-serif text-xl">{lang === "hi" && puja.nameHi ? puja.nameHi : puja.nameEn}</h3>
                <p className="mt-2 text-sm text-ink/70">{lang === "hi" && puja.descriptionHi ? puja.descriptionHi : puja.descriptionEn}</p>
                <Link className="mt-4 inline-block text-sm font-semibold text-saffron-dark" href={`/contact?puja=${encodeURIComponent(puja.nameEn)}`}>{t("Ask about this ritual", "इस अनुष्ठान के बारे में पूछें")}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl">{t("Bathing dates", "स्नान तिथियाँ")}</h2>
        <p className="mt-2 text-sm text-ink/70">{t("Next:", "अगली:")} {t(nextDate.nameEn, nextDate.nameHi)} · {formatPrayagraj(nextDate.date, lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short" })}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {bathingDates.map((item) => (
            <div key={item.date} className={`card p-4 text-center ${item.importance === "highest" ? "ring-2 ring-saffron" : ""}`}>
              <p className="font-serif text-3xl text-saffron-dark">{formatPrayagraj(item.date, "en-IN", { day: "numeric" })}</p>
              <p className="text-xs uppercase text-ink/50">{formatPrayagraj(item.date, "en-IN", { month: "short" })}</p>
              <p className="mt-2 text-sm">{t(item.nameEn, item.nameHi)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('/textures/stardust.png')] bg-indigo-950 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl">{t("Vedic guidance", "वैदिक मार्गदर्शन")}</h2>
            <p className="mt-4 text-indigo-100">{t("Acharya Rajendra Mishra meets guests by request. Dakshina is voluntary.", "आचार्य राजेंद्र मिश्र अनुरोध पर अतिथियों से मिलते हैं। दक्षिणा स्वैच्छिक है।")}</p>
            <a className="btn mt-6 bg-yellow-400 text-indigo-950" href={whatsAppLink("Namaste, I would like to meet Acharya Rajendra Mishra ji.")}>{t("Request a time", "समय माँगें")}</a>
          </div>
          <img
            src={cloudinaryUrl("https://res.cloudinary.com/dh7bx2qib/image/upload/v1766414799/WhatsApp_Image_2025-12-21_at_10.57.45_PM_kndk1l.jpg")}
            alt="Acharya Rajendra Mishra"
            className="aspect-[3/4] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center font-serif text-3xl">{t("Common questions", "आम सवाल")}</h2>
        <div className="mt-8 space-y-6">
          {guestFaqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-semibold">{t(faq.question, faq.questionHi)}</h3>
              <p className="mt-1 text-sm text-ink/70">{t(faq.answer, faq.answerHi)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('/textures/cubes.png')] bg-saffron py-16 text-center text-white">
        <h2 className="font-serif text-4xl">{t("Ready to plan the stay?", "प्रवास की योजना बनाएँ?")}</h2>
        <p className="mt-3">{t("Call", "कॉल")} <a className="underline" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
        <Link className="btn mt-6 bg-white text-saffron-dark" href="/contact">{t("Send an enquiry", "पूछताछ भेजें")}</Link>
      </section>
    </div>
  );
}
