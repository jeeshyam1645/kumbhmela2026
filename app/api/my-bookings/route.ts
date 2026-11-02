import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/schema";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json([]);
  const rows = await db.select().from(bookings).where(eq(bookings.userId, Number(session.user.id))).orderBy(desc(bookings.createdAt));
  return NextResponse.json(rows);
}
