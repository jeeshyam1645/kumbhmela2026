import { pgTable, text, serial, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// 1. DATABASE TABLES
// 1. UPDATE USERS TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"), // Optional for OAuth
  role: text("role", { enum: ["admin", "user"] }).default("user").notNull(),
  
  // Basic Info
  name: text("name").notNull(),
  mobile: text("mobile"),
  
  // New Profile Fields
  imageUrl: text("image_url"), // URL to avatar
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country").default("India"),
  
  createdAt: timestamp("created_at").defaultNow(),
  googleId: text("google_id").unique(),
  facebookId: text("facebook_id").unique(),
});

// Update Zod Schema for "Edit Profile" validation
export const updateUserSchema = createInsertSchema(users).pick({
  name: true,
  mobile: true,
  address: true,
  city: true,
  state: true,
  zip: true,
  country: true,
  imageUrl: true,
});

export const camps = pgTable("camps", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi"),
  descriptionEn: text("description_en").notNull(),
  descriptionHi: text("description_hi"),
  price: integer("price").notNull(),
  capacity: text("capacity").notNull(),
  features: text("features").array(),
  imageUrl: text("image_url"),
  totalInventory: integer("total_inventory").default(10).notNull(),
});

export const pujaServices = pgTable("puja_services", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameHi: text("name_hi"),
  descriptionEn: text("description_en").notNull(),
  descriptionHi: text("description_hi"),
  price: integer("price").default(0), // Optional price field
  imageUrl: text("image_url"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // Nullable if admin books for non-registered user
  campId: integer("camp_id").references(() => camps.id).notNull(),
  
  // Guest Details
  guestName: text("guest_name").notNull(),
  mobile: text("mobile").notNull(),
  
  // Stay Details
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  guestCount: integer("guest_count").default(1).notNull(),
  
  // Payment Logic
  totalAmount: integer("total_amount").notNull(),
  advanceAmount: integer("advance_amount").default(0), // New: Token amount paid
  
  // Statuses
  status: text("status", { enum: ["pending", "confirmed", "cancelled"] }).default("pending"),
  paymentStatus: text("payment_status", { enum: ["unpaid", "partial", "paid"] }).default("unpaid"),
  bookingType: text("booking_type", { enum: ["online_token", "inquiry_call", "admin_manual"] }).default("inquiry_call"), // New
  
  specialNeeds: text("special_needs"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  name: true,
  mobile: true,
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});
export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  userId: true,
  status: true,
  paymentStatus: true,
  createdAt: true,
  totalAmount: true, // Backend calculates this
}).extend({
  checkIn: z.string(),
  checkOut: z.string(),
  guestCount: z.coerce.number().min(1),
  bookingType: z.enum(["online_token", "inquiry_call", "admin_manual"]).optional(),
  advanceAmount: z.number().optional()
});
export const insertPujaSchema = createInsertSchema(pujaServices);
export const insertCampSchema = createInsertSchema(camps);

export type User = typeof users.$inferSelect;
export type Camp = typeof camps.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type PujaService = typeof pujaServices.$inferSelect;

// 2. STATIC DATA (For Puja & Dates only)
export const bathingDates = [
  { 
    date: "2026-01-03", 
    nameEn: "Paush Purnima (Start)", 
    nameHi: "पौष पूर्णिमा (आरंभ)", 
    importance: "high" 
  },
  { 
    date: "2026-01-14", 
    nameEn: "Makar Sankranti", 
    nameHi: "मकर संक्रांति", 
    importance: "high" 
  },
  { 
    date: "2026-01-18", 
    nameEn: "Mauni Amavasya", 
    nameHi: "मौनी अमावस्या", 
    importance: "highest" 
  },
  { 
    date: "2026-01-23", 
    nameEn: "Basant Panchami", 
    nameHi: "बसंत पंचमी", 
    importance: "high" 
  },
  { 
    date: "2026-02-01", 
    nameEn: "Maghi Purnima", 
    nameHi: "माघी पूर्णिमा", 
    importance: "high" 
  },
  { 
    date: "2026-02-15", 
    nameEn: "Maha Shivaratri", 
    nameHi: "महा शिवरात्रि", 
    importance: "highest" 
  },
] as const;