import "server-only";
import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { camps, type Camp } from "@/db/schema";

/** Returns an empty list if the database is unreachable, so pages still render. */
export async function listCamps(): Promise<Camp[]> {
  try {
    return await getDb().select().from(camps).orderBy(asc(camps.price));
  } catch (error) {
    console.error("listCamps failed", error);
    return [];
  }
}
