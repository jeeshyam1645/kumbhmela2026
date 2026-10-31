import {
  CONTACT_EMAIL,
  PHONE_E164,
  SITE_NAME,
  SITE_URL,
  TENT_OFFERS,
  absoluteUrl,
  OG_IMAGE_PATH,
} from "@/lib/site";

const address = {
  "@type": "PostalAddress",
  streetAddress: "Near Sangam",
  addressLocality: "Prayagraj",
  addressRegion: "Uttar Pradesh",
  addressCountry: "IN",
};

export function lodgingJsonLd() {
  return {
    "@type": ["LodgingBusiness", "Campground"],
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    email: CONTACT_EMAIL,
    image: absoluteUrl(OG_IMAGE_PATH),
    priceRange: "₹999–₹5000",
    address,
    makesOffer: TENT_OFFERS.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      price: String(offer.price),
      priceCurrency: "INR",
      url: `${SITE_URL}/accommodation`,
      availability: "https://schema.org/LimitedAvailability",
    })),
  };
}

export function maghMelaEventJsonLd() {
  return {
    "@type": "Event",
    name: "Magh Mela 2026",
    startDate: "2026-01-03",
    endDate: "2026-02-15",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Triveni Sangam, Prayagraj",
      address,
    },
    description:
      "Magh Mela 2026 at the Sangam in Prayagraj, from Paush Purnima on 3 January through Maha Shivaratri on 15 February.",
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_E164,
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
