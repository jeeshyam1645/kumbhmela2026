import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/schema";

export const runtime = "nodejs";

export async function PATCH(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const id = Number((await context.params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  await db.update(bookings).set({ status: "cancelled" }).where(eq(bookings.id, id));
  return NextResponse.json({ success: true });
}
