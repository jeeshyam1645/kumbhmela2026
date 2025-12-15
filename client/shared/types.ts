import { z } from "zod";

// ---------------- USER TYPES ----------------
export const insertUserSchema = z.object({
  username: z.string(),
  name: z.string(),
  mobile: z.string().optional(),
  password: z.string().min(6).optional()
});

export const updateUserSchema = z.object({
  name: z.string(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  imageUrl: z.string().optional(),
});

// TS Types
export type User = {
  id: number;
  username: string;
  name: string;
  mobile?: string;
  imageUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

// ---------------- CAMP ----------------
export type Camp = {
  id: number;
  nameEn: string;
  nameHi?: string;
  descriptionEn: string;
  descriptionHi?: string;
  price: number;
  capacity: string;
  features?: string[];
  imageUrl?: string;
  totalInventory: number;
};

// ---------------- PUJA ----------------
export type PujaService = {
  id: number;
  nameEn: string;
  nameHi?: string;
  descriptionEn: string;
  descriptionHi?: string;
  price: number;
  imageUrl?: string;
};

// ---------------- BOOKINGS ----------------
export type Booking = {
  id: number;
  userId?: number;
  campId: number;
  guestName: string;
  mobile: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalAmount: number;
  advanceAmount?: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid";
  bookingType: "online_token" | "inquiry_call" | "admin_manual";
  specialNeeds?: string;
  createdAt: string;
};

// ---------------- FIXED STATIC DATA ----------------
export const bathingDates = [
  {
    date: "2026-01-03",
    nameEn: "Paush Purnima (Start)",
    nameHi: "पौष पूर्णिमा (आरंभ)",
    importance: "high",
  },
  {
    date: "2026-01-14",
    nameEn: "Makar Sankranti",
    nameHi: "मकर संक्रांति",
    importance: "high",
  },
  {
    date: "2026-01-18",
    nameEn: "Mauni Amavasya",
    nameHi: "मौनी अमावस्या",
    importance: "highest",
  },
  {
    date: "2026-01-23",
    nameEn: "Basant Panchami",
    nameHi: "बसंत पंचमी",
    importance: "high",
  },
  {
    date: "2026-02-01",
    nameEn: "Maghi Purnima",
    nameHi: "माघी पूर्णिमा",
    importance: "high",
  },
  {
    date: "2026-02-15",
    nameEn: "Maha Shivaratri",
    nameHi: "महा शिवरात्रि",
    importance: "highest",
  },
] as const;
