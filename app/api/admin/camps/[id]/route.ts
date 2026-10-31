import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { campBody } from "@/lib/admin-schemas";
import { camps } from "@/lib/schema";

export const runtime = "nodejs";

async function idFrom(context: { params: Promise<{ id: string }> }) {
  const id = Number((await context.params).id);
  return Number.isInteger(id) ? id : null;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const id = await idFrom(context);
  if (id == null) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  const parsed = campBody.partial().safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  await db.update(camps).set(parsed.data).where(eq(camps.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const id = await idFrom(context);
  if (id == null) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  await db.delete(camps).where(eq(camps.id, id));
  return NextResponse.json({ success: true });
}
