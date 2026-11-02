import type { Metadata } from "next";

export const site = {
  name: "Magh Mela Stays",
  url: "https://maghmelastays.in",
  phone: "+919936399677",
  phoneDisplay: "+91 99363 99677",
  whatsapp: "919936399677",
  email: "maghmelastays@gmail.com",
  ogImage: "https://maghmelastays.in/og-image.png",
};

export const tentOffers = [
  { name: "Swiss Cottage", description: "Premium tent with an attached bathroom for 2–3 guests." },
  { name: "Deluxe Tent", description: "Twin-bed tent with a shared bathroom for 2 guests." },
  { name: "Dormitory", description: "Shared dormitory stay for groups and solo pilgrims." },
] as const;

export const tentOptions = [...tentOffers.map((tent) => tent.name), "Not sure yet"];

export const bathingDates = [
  { date: "2027-01-15", nameEn: "Makar Sankranti", nameHi: "मकर संक्रांति", importance: "high" },
  { date: "2027-01-22", nameEn: "Paush Purnima", nameHi: "पौष पूर्णिमा", importance: "high" },
  { date: "2027-02-06", nameEn: "Mauni Amavasya", nameHi: "मौनी अमावस्या", importance: "highest" },
  { date: "2027-02-11", nameEn: "Basant Panchami", nameHi: "बसंत पंचमी", importance: "high" },
  { date: "2027-02-20", nameEn: "Maghi Purnima", nameHi: "माघी पूर्णिमा", importance: "high" },
  { date: "2027-03-06", nameEn: "Maha Shivaratri", nameHi: "महा शिवरात्रि", importance: "highest" },
] as const;

export const bathingDatesNote = {
  en: "These dates follow the panchang and the Prayagraj Mela Authority schedule announced in the press. Confirm them with the official mela schedule before you travel.",
  hi: "ये तिथियाँ पंचांग और प्रेस में घोषित प्रयागराज मेला प्राधिकरण कार्यक्रम के अनुसार हैं। यात्रा से पहले आधिकारिक मेला कार्यक्रम से पुष्टि करें।",
};

export const guestFaqs = [
  {
    question: "Do I need an account to ask about a stay?",
    questionHi: "क्या ठहराव पूछने के लिए खाता चाहिए?",
    answer: "No. Send the enquiry form with your name, phone, dates, guests, and tent type, or WhatsApp +91 99363 99677.",
    answerHi: "नहीं। अपना नाम, फ़ोन, तिथियाँ, अतिथि और टेंट का प्रकार फ़ॉर्म में भेजें, या व्हाट्सएप +91 99363 99677 पर लिखें।",
  },
  {
    question: "Where is the camp?",
    questionHi: "शिविर कहाँ है?",
    answer: "Near Sangam, Prayagraj, Uttar Pradesh. The exact plot is the one allotted by the Mela Adhikari.",
    answerHi: "संगम के पास, प्रयागराज, उत्तर प्रदेश। सटीक भूखंड मेला अधिकारी द्वारा आवंटित स्थान पर होता है।",
  },
  {
    question: "Which tents can I book?",
    questionHi: "कौन से टेंट बुक हो सकते हैं?",
    answer: "Swiss Cottage with an attached bathroom, Deluxe Tent, and a shared Dormitory. The quote is confirmed on the call.",
    answerHi: "अटैच बाथरूम वाला स्विस कॉटेज, डीलक्स टेंट, और साझा शयनगृह। कोटेशन कॉल पर तय होता है।",
  },
  {
    question: "How quickly will someone call?",
    questionHi: "कितनी जल्दी कॉल आएगी?",
    answer: "The camp team aims to call within 2 hours to confirm availability and the quote.",
    answerHi: "शिविर टीम उपलब्धता और कोटेशन की पुष्टि के लिए 2 घंटे के भीतर कॉल करने का प्रयास करती है।",
  },
  {
    question: "What is included with the stay?",
    questionHi: "ठहराव में क्या शामिल है?",
    answer: "Satvik meals, bedding for the January cold, and a guarded compound with staff on site.",
    answerHi: "सात्विक भोजन, जनवरी की ठंड के लिए बिस्तर, और कर्मचारियों के साथ सुरक्षित परिसर।",
  },
];

export function pageMeta(title: string, description: string, path: string, image = site.ogImage): Metadata {
  const full = title.includes("Magh Mela") ? title : `${title} | ${site.name}`;
  const url = `${site.url}${path}`;
  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}

export function whatsAppLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatPrayagraj(isoDate: string, locale: string, options: Intl.DateTimeFormatOptions) {
  const day = isoDate.slice(0, 10);
  return new Intl.DateTimeFormat(locale, { timeZone: "Asia/Kolkata", ...options }).format(
    new Date(`${day}T00:00:00+05:30`),
  );
}

export function lodgingJsonLd() {
  return {
    "@type": ["LodgingBusiness", "Campground"],
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: site.ogImage,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Sangam",
      addressLocality: "Prayagraj",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    makesOffer: tentOffers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      url: offer.name === "Swiss Cottage" ? `${site.url}/accommodation/swiss-cottage` : `${site.url}/accommodation`,
      ...(offer.name === "Swiss Cottage" ? { image: `${site.url}/media/swiss-cottage.webp` } : {}),
      availability: "https://schema.org/LimitedAvailability",
    })),
  };
}

export function eventJsonLd() {
  return {
    "@type": "Event",
    name: "Magh Mela 2027",
    startDate: "2027-01-15",
    endDate: "2027-03-06",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Triveni Sangam, Prayagraj",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Prayagraj",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    },
    description: "Magh Mela 2027 at the Sangam in Prayagraj, from Makar Sankranti on 15 January through Maha Shivaratri on 6 March.",
    organizer: { "@type": "Organization", name: site.name, url: site.url, telephone: site.phone },
  };
}

export function faqJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: guestFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
