import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { camps } from "./schema";
import { EP_FAMILY_NAME, EP_SHARED_NAME, EP_SHARED_PRICE } from "./site";

const sharedFields = {
  nameEn: EP_SHARED_NAME,
  nameHi: "ईपी टेंट – शयनगृह (साझा)",
  descriptionEn:
    "The EP tent as a dormitory: a per-person floor stay with a gadda, pillow and blanket, for budget pilgrims and groups.",
  descriptionHi:
    "ईपी टेंट शयनगृह के रूप में: फर्श पर गद्दा, तकिया और कंबल के साथ प्रति व्यक्ति ठहराव, बजट तीर्थयात्रियों और समूहों के लिए।",
  capacity: "Per person",
  features: ["Gadda (mattress)", "Pillow", "Blanket", "Shared floor stay"],
  imageUrl: "/media/ep-tent-exterior.webp",
};

const familyFields = {
  nameEn: EP_FAMILY_NAME,
  nameHi: "ईपी टेंट – परिवार",
  descriptionEn: "The same EP tent for one family, with takht beds, pillows and blankets.",
  descriptionHi: "वही ईपी टेंट एक परिवार के लिए, तख्त, तकिए और कंबल के साथ।",
  price: 0,
  capacity: "One family",
  features: ["Takht beds", "Pillows", "Blankets", "Whole tent for one family"],
  imageUrl: "/media/ep-tent-exterior.webp",
  totalInventory: 10,
};

let ensured: Promise<void> | null = null;

/** Rename the Dormitory camp to the shared EP tent and add the family option. Keeps the existing per-person price. */
export function ensureEpCamps(): Promise<void> {
  if (!process.env.DATABASE_URL) return Promise.resolve();
  if (!ensured) {
    ensured = applyEpCamps().catch((error: unknown) => {
      ensured = null;
      console.error("[camps] failed to update EP tent rows", error);
    });
  }
  return ensured;
}

function isLegacyDormitory(name: string) {
  const normalized = name.trim().toLowerCase();
  return normalized === "dormitory" || normalized === "dorm";
}

async function applyEpCamps() {
  const db = getDb();
  if (!db) return;
  const rows = await db.select().from(camps);
  const shared = rows.find((row) => row.nameEn === EP_SHARED_NAME);
  const legacy = rows.find((row) => isLegacyDormitory(row.nameEn));

  if (legacy) {
    await db.update(camps).set(sharedFields).where(eq(camps.id, legacy.id));
  } else if (!shared) {
    await db.insert(camps).values({ ...sharedFields, price: EP_SHARED_PRICE, totalInventory: 50 });
  }

  const family = rows.find((row) => row.nameEn === EP_FAMILY_NAME);
  if (!family) {
    await db.insert(camps).values(familyFields);
  }
}
