import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  countryCode: text("country_code").notNull().default("+91"),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  persons: integer("persons").notNull().default(1),
  campPreference: text("camp_preference").notNull(),
  specialNeeds: text("special_needs"),
  pujaRequest: text("puja_request"),
  agreedToTerms: integer("agreed_to_terms").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number must be at most 15 digits"),
  countryCode: z.string().default("+91"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  persons: z.number().min(1).max(10),
  campPreference: z.enum(["swiss-cottage", "deluxe-tent", "dormitory"]),
  specialNeeds: z.string().optional(),
  pujaRequest: z.string().optional(),
  agreedToTerms: z.number().min(1, "You must agree to the terms"),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

// Camp types for accommodation
export const campTypes = [
  {
    id: "swiss-cottage",
    nameEn: "Swiss Cottage",
    nameHi: "स्विस कॉटेज",
    descriptionEn: "Premium luxury tents with attached modern bathroom, geyser, and carpeted flooring. Ideal for couples and families seeking comfort.",
    descriptionHi: "आधुनिक बाथरूम, गीजर और कालीन फर्श के साथ प्रीमियम लक्जरी टेंट। आराम चाहने वाले जोड़ों और परिवारों के लिए आदर्श।",
    features: ["1 Double Bed", "Attached Toilet", "Geyser", "Carpeted Floor", "24/7 Security"],
    featuresHi: ["1 डबल बेड", "अटैच्ड टॉयलेट", "गीजर", "कालीन फर्श", "24/7 सुरक्षा"],
    capacity: "2-3 persons",
    capacityHi: "2-3 व्यक्ति",
  },
  {
    id: "deluxe-tent",
    nameEn: "Deluxe Tent",
    nameHi: "डीलक्स टेंट",
    descriptionEn: "Comfortable tents with twin beds, shared bathroom facilities nearby, and cozy bedding. Perfect for groups and friends.",
    descriptionHi: "ट्विन बेड के साथ आरामदायक टेंट, पास में साझा बाथरूम सुविधाएं और आरामदायक बिस्तर। समूहों और दोस्तों के लिए बिल्कुल सही।",
    features: ["2 Single Beds", "Shared Bathroom", "Heater", "Mattress", "Lockers"],
    featuresHi: ["2 सिंगल बेड", "साझा बाथरूम", "हीटर", "गद्दा", "लॉकर"],
    capacity: "2 persons",
    capacityHi: "2 व्यक्ति",
  },
  {
    id: "dormitory",
    nameEn: "Dormitory",
    nameHi: "डॉरमिटरी",
    descriptionEn: "Budget-friendly shared accommodation with bunk beds. Common bathrooms and dining area. Ideal for solo travelers and pilgrims.",
    descriptionHi: "बंक बेड के साथ बजट-अनुकूल साझा आवास। सामान्य बाथरूम और भोजन क्षेत्र। एकल यात्रियों और तीर्थयात्रियों के लिए आदर्श।",
    features: ["Bunk Bed", "Common Bathroom", "Dining Hall", "Blankets", "Safe Storage"],
    featuresHi: ["बंक बेड", "सामान्य बाथरूम", "भोजन हॉल", "कंबल", "सुरक्षित भंडारण"],
    capacity: "1 person (per bed)",
    capacityHi: "1 व्यक्ति (प्रति बेड)",
  },
] as const;

// Puja services
export const pujaServices = [
  {
    id: "rudrabhishek",
    nameEn: "Rudrabhishek",
    nameHi: "रुद्राभिषेक",
    descriptionEn: "Sacred worship of Lord Shiva for peace, prosperity and removal of obstacles.",
    descriptionHi: "शांति, समृद्धि और बाधाओं को दूर करने के लिए भगवान शिव की पवित्र पूजा।",
  },
  {
    id: "pitra-dosh-nivaran",
    nameEn: "Pitra Dosh Nivaran",
    nameHi: "पितृ दोष निवारण",
    descriptionEn: "Ancestral peace rituals including Pind Daan for departed souls.",
    descriptionHi: "दिवंगत आत्माओं के लिए पिंड दान सहित पैतृक शांति अनुष्ठान।",
  },
  {
    id: "mahamrityunjaya-jaap",
    nameEn: "Mahamrityunjaya Jaap",
    nameHi: "महामृत्युंजय जाप",
    descriptionEn: "Powerful mantra chanting for health, longevity and protection from untimely death.",
    descriptionHi: "स्वास्थ्य, दीर्घायु और अकाल मृत्यु से सुरक्षा के लिए शक्तिशाली मंत्र जाप।",
  },
  {
    id: "satyanarayan-katha",
    nameEn: "Satyanarayan Katha",
    nameHi: "सत्यनारायण कथा",
    descriptionEn: "Auspicious puja for household harmony, prosperity and fulfillment of wishes.",
    descriptionHi: "घरेलू सद्भाव, समृद्धि और इच्छाओं की पूर्ति के लिए शुभ पूजा।",
  },
  {
    id: "vishesh-ganga-pujan",
    nameEn: "Vishesh Ganga Pujan",
    nameHi: "विशेष गंगा पूजन",
    descriptionEn: "Personalized worship at the sacred Sangam with offerings to Mother Ganga.",
    descriptionHi: "मां गंगा को अर्पण के साथ पवित्र संगम पर व्यक्तिगत पूजा।",
  },
] as const;

// Bathing dates for Magh Mela 2025
export const bathingDates = [
  { date: "2025-01-13", nameEn: "Paush Purnima (Start)", nameHi: "पौष पूर्णिमा (आरंभ)", importance: "high" },
  { date: "2025-01-14", nameEn: "Makar Sankranti", nameHi: "मकर संक्रांति", importance: "high" },
  { date: "2025-01-29", nameEn: "Mauni Amavasya", nameHi: "मौनी अमावस्या", importance: "highest" },
  { date: "2025-02-03", nameEn: "Basant Panchami", nameHi: "बसंत पंचमी", importance: "high" },
  { date: "2025-02-12", nameEn: "Maghi Purnima", nameHi: "माघी पूर्णिमा", importance: "high" },
  { date: "2025-02-26", nameEn: "Maha Shivaratri", nameHi: "महा शिवरात्रि", importance: "highest" },
] as const;

// Users table (keeping for compatibility)
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
