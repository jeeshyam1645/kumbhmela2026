import { desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { ensureEpCamps } from "./ep-tent";
import { bookings, camps, pujaServices, users } from "./schema";
import { EP_FAMILY_NAME, EP_SHARED_NAME, tentOffers } from "./site";

export type CampRecord = {
  id: number;
  nameEn: string;
  nameHi: string | null;
  descriptionEn: string;
  descriptionHi: string | null;
  price: number;
  capacity: string;
  features: string[] | null;
  imageUrl: string | null;
  totalInventory: number;
};

export type PujaRecord = {
  id: number;
  nameEn: string;
  nameHi: string | null;
  descriptionEn: string;
  descriptionHi: string | null;
  price: number | null;
  imageUrl: string | null;
};

const fallbackCamps: CampRecord[] = tentOffers.map((offer, index) => ({
  id: -(index + 1),
  nameEn: offer.name,
  nameHi: offer.name === "Swiss Cottage" ? "स्विस कॉटेज" : offer.name === "Deluxe Tent" ? "डीलक्स टेंट" : offer.name === EP_SHARED_NAME ? "ईपी टेंट – शयनगृह (साझा, बिना बिस्तर, फर्श)" : offer.name === EP_FAMILY_NAME ? "ईपी टेंट – परिवार (बिस्तर के साथ)" : null,
  descriptionEn: offer.description,
  descriptionHi: null,
  price: offer.price,
  capacity: offer.name === EP_SHARED_NAME ? "Per person" : offer.name === EP_FAMILY_NAME ? "One family" : offer.name === "Deluxe Tent" ? "2 Persons" : "2-3 Persons",
  features: null,
  imageUrl: null,
  totalInventory: 0,
}));

function campRank(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("swiss")) return 0;
  if (normalized.includes("deluxe")) return 1;
  if (normalized.includes("family")) return 3;
  if (normalized.includes("ep tent") || normalized.includes("dorm")) return 2;
  return 4;
}

function sortCamps(rows: CampRecord[]) {
  return [...rows].sort((a, b) => campRank(a.nameEn) - campRank(b.nameEn) || a.nameEn.localeCompare(b.nameEn));
}

const fallbackPujas: PujaRecord[] = [
  { id: -1, nameEn: "Rudrabhishek", nameHi: "रुद्राभिषेक", descriptionEn: "Sacred worship of Lord Shiva.", descriptionHi: "भगवान शिव की पूजा।", price: 2100, imageUrl: null },
  { id: -2, nameEn: "Vishesh Ganga Pujan", nameHi: "विशेष गंगा पूजन", descriptionEn: "Special worship of the Ganga at Sangam.", descriptionHi: "संगम पर गंगा की विशेष पूजा।", price: 1100, imageUrl: null },
];

function mapCamp(row: typeof camps.$inferSelect): CampRecord {
  return {
    id: row.id,
    nameEn: row.nameEn,
    nameHi: row.nameHi,
    descriptionEn: row.descriptionEn,
    descriptionHi: row.descriptionHi,
    price: row.price,
    capacity: row.capacity,
    features: row.features,
    imageUrl: row.imageUrl,
    totalInventory: row.totalInventory,
  };
}

export async function listCamps() {
  const db = getDb();
  if (!db) return { camps: sortCamps(fallbackCamps), live: false };
  try {
    await ensureEpCamps();
    const rows = await db.select().from(camps);
    if (!rows.length) return { camps: sortCamps(fallbackCamps), live: false };
    return { camps: sortCamps(rows.map(mapCamp)), live: true };
  } catch {
    return { camps: sortCamps(fallbackCamps), live: false };
  }
}

export async function listPujas() {
  const db = getDb();
  if (!db) return fallbackPujas;
  try {
    const rows = await db.select().from(pujaServices);
    if (!rows.length) return fallbackPujas;
    return rows.map((row) => ({
      id: row.id,
      nameEn: row.nameEn,
      nameHi: row.nameHi,
      descriptionEn: row.descriptionEn,
      descriptionHi: row.descriptionHi,
      price: row.price,
      imageUrl: row.imageUrl,
    }));
  } catch {
    return fallbackPujas;
  }
}

export async function listBookingsForUser(userId: number) {
  const db = getDb();
  if (!db) return [];
  return db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
}

export async function listAllBookings() {
  const db = getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export function publicUser(user: typeof users.$inferSelect) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    mobile: user.mobile,
    role: user.role,
    imageUrl: user.imageUrl,
    address: user.address,
    city: user.city,
    state: user.state,
    zip: user.zip,
    country: user.country,
  };
}
