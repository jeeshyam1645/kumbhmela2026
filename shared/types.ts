// --------------------------------------
// FRONTEND-SAFE SHARED TYPES
// --------------------------------------

// 1. DOMAIN TYPES (pure TypeScript, no Drizzle)
export interface User {
  id: number;
  username: string;
  name: string;
  mobile?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  imageUrl?: string | null;
  role: "admin" | "user";
}

export interface Camp {
  id: number;
  nameEn: string;
  nameHi?: string | null;
  descriptionEn: string;
  descriptionHi?: string | null;
  price: number;
  capacity: string;
  features?: string[] | null;
  imageUrl?: string | null;
  totalInventory: number;
}

export interface PujaService {
  id: number;
  nameEn: string;
  nameHi?: string | null;
  descriptionEn: string;
  descriptionHi?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

export interface Booking {
  id: number;
  userId?: number | null;
  campId: number;

  guestName: string;
  mobile: string;

  checkIn: string;
  checkOut: string;

  guestCount: number;
  totalAmount: number;
  advanceAmount?: number | null;

  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "unpaid" | "partial" | "paid";
  bookingType: "online_token" | "inquiry_call" | "admin_manual";
  specialNeeds?: string | null;

  createdAt: string;
}

// --------------------------------------
// 2. FRONTEND ZOD SCHEMAS
// --------------------------------------
import { z } from "zod";

// Login + Signup (frontend only)
export const insertUserSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(2),
  mobile: z.string().min(10).optional(),
  password: z.string().min(6).optional(),
});


export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

// Booking creation (frontend)
export const insertBookingSchema = z.object({
  campId: z.number(),
  guestName: z.string().min(2),
  mobile: z.string().min(10),
  checkIn: z.string(),
  checkOut: z.string(),
  guestCount: z.number().min(1),
  bookingType: z.enum(["online_token", "inquiry_call", "admin_manual"]).optional(),
  advanceAmount: z.number().optional(),
  specialNeeds: z.string().optional(),
});

// --------------------------------------
// 3. STATIC BATHING DATES
// --------------------------------------
export const bathingDates = [
  { date: "2026-01-03", nameEn: "Paush Purnima (Start)", nameHi: "पौष पूर्णिमा (आरंभ)", importance: "high" },
  { date: "2026-01-14", nameEn: "Makar Sankranti", nameHi: "मकर संक्रांति", importance: "high" },
  { date: "2026-01-18", nameEn: "Mauni Amavasya", nameHi: "मौनी अमावस्या", importance: "highest" },
  { date: "2026-01-23", nameEn: "Basant Panchami", nameHi: "बसंत पंचमी", importance: "high" },
  { date: "2026-02-01", nameEn: "Maghi Purnima", nameHi: "माघी पूर्णिमा", importance: "high" },
  { date: "2026-02-15", nameEn: "Maha Shivaratri", nameHi: "महाशिवरात्रि", importance: "highest" },
] as const;
