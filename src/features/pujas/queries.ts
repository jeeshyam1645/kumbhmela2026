import "server-only";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { pujaServices } from "@/db/schema";

const summaryColumns = {
  id: pujaServices.id,
  nameEn: pujaServices.nameEn,
  nameHi: pujaServices.nameHi,
  descriptionEn: pujaServices.descriptionEn,
  descriptionHi: pujaServices.descriptionHi,
};

// image_url is left out: some v1 rows store large base64 images.
export type PujaSummary = {
  id: number;
  nameEn: string;
  nameHi: string | null;
  descriptionEn: string;
  descriptionHi: string | null;
};

/** Returns an empty list if the database is unreachable, so pages still render. */
export async function listPujas(): Promise<PujaSummary[]> {
  try {
    return await getDb().select(summaryColumns).from(pujaServices).orderBy(asc(pujaServices.id));
  } catch (error) {
    console.error("listPujas failed", error);
    return [];
  }
}
