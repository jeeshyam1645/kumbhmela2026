export const site = {
  name: { en: "Magh Mela Stays", hi: "माघ मेला स्टेज़" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maghmelastays.in",
  season: 2027,
  phone: {
    display: "+91 99363 99677",
    tel: "+919936399677",
  },
  whatsappNumber: "919936399677",
  email: "maghmelastays@gmail.com",
  address: {
    en: "Near Sangam, Prayagraj, Uttar Pradesh, India",
    hi: "संगम के पास, प्रयागराज, उत्तर प्रदेश, भारत",
  },
} as const;
