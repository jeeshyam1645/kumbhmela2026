import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { camps } from "@/lib/schema";

export const runtime = "nodejs";

export async function GET() {
  const db = getDb();
  if (!db) return NextResponse.json([]);
  const rows = await db.select().from(camps);
  return NextResponse.json(rows);
}
