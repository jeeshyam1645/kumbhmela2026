import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { campBody } from "@/lib/admin-schemas";
import { camps } from "@/lib/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const parsed = campBody.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  const [created] = await db.insert(camps).values({
    ...parsed.data,
    nameHi: parsed.data.nameHi || null,
    descriptionHi: parsed.data.descriptionHi || null,
    imageUrl: parsed.data.imageUrl || null,
    features: parsed.data.features || [],
    totalInventory: parsed.data.totalInventory ?? 10,
  }).returning();
  return NextResponse.json(created, { status: 201 });
}
