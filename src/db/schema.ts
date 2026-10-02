import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

/**
 * Mirrors the existing v1 tables exactly. Until Part 3 the old site still
 * writes to these, so changes here must be additive only.
 */

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

export type Camp = typeof camps.$inferSelect;
export type PujaService = typeof pujaServices.$inferSelect;
