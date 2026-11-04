import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { ensureEnquiriesTable } from "@/lib/ensure-enquiries";
import { enquiries } from "@/lib/schema";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  await ensureEnquiriesTable();
  return NextResponse.json(await db.select().from(enquiries).orderBy(desc(enquiries.createdAt), desc(enquiries.id)));
}
