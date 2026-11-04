import { boolean, date, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  role: text("role").default("user").notNull(),
  name: text("name").notNull(),
  mobile: text("mobile"),
  imageUrl: text("image_url"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country").default("India"),
  createdAt: timestamp("created_at").defaultNow(),
  googleId: text("google_id").unique(),
  facebookId: text("facebook_id").unique(),
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
  price: integer("price").default(0),
  imageUrl: text("image_url"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  campId: integer("camp_id").notNull(),
  guestName: text("guest_name").notNull(),
  mobile: text("mobile").notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  guestCount: integer("guest_count").default(1).notNull(),
  totalAmount: integer("total_amount").notNull(),
  advanceAmount: integer("advance_amount").default(0),
  status: text("status").default("pending"),
  paymentStatus: text("payment_status").default("unpaid"),
  bookingType: text("booking_type").default("inquiry_call"),
  specialNeeds: text("special_needs"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  tentType: text("tent_type"),
  checkIn: text("check_in"),
  checkOut: text("check_out"),
  guests: integer("guests"),
  status: text("status").default("new").notNull(),
  emailSent: boolean("email_sent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
