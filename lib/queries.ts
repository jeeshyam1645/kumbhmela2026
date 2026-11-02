import { desc, eq } from "drizzle-orm";
import { getDb } from "./db";
import { bookings, camps, pujaServices, users } from "./schema";
import { tentOffers } from "./site";

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
  nameHi: offer.name === "Swiss Cottage" ? "स्विस कॉटेज" : offer.name === "Deluxe Tent" ? "डीलक्स टेंट" : "शयनगृह",
  descriptionEn: offer.description,
  descriptionHi: null,
  price: 0,
  capacity: offer.name === "Dormitory" ? "10 Persons" : offer.name === "Deluxe Tent" ? "2 Persons" : "2-3 Persons",
  features: null,
  imageUrl: null,
  totalInventory: 0,
}));

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
  if (!db) return { camps: fallbackCamps, live: false };
  try {
    const rows = await db.select().from(camps);
    if (!rows.length) return { camps: fallbackCamps, live: false };
    return { camps: rows.map(mapCamp), live: true };
  } catch {
    return { camps: fallbackCamps, live: false };
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
