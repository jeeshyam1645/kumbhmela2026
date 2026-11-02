import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { pujaBody } from "@/lib/admin-schemas";
import { pujaServices } from "@/lib/schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const parsed = pujaBody.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  const [created] = await db.insert(pujaServices).values({
    ...parsed.data,
    nameHi: parsed.data.nameHi || null,
    descriptionHi: parsed.data.descriptionHi || null,
    imageUrl: parsed.data.imageUrl || null,
    price: parsed.data.price ?? 0,
  }).returning();
  return NextResponse.json(created, { status: 201 });
}
