import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { pujaServices } from "@/lib/schema";

export const runtime = "nodejs";

export async function GET() {
  const db = getDb();
  if (!db) return NextResponse.json([]);
  return NextResponse.json(await db.select().from(pujaServices));
}
