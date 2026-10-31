import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { publicUser } from "@/lib/queries";
import { users } from "@/lib/schema";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().max(20).optional(),
  address: z.string().trim().max(200).optional(),
  city: z.string().trim().max(80).optional(),
  state: z.string().trim().max(80).optional(),
  zip: z.string().trim().max(20).optional(),
  country: z.string().trim().max(80).optional(),
  imageUrl: z.string().trim().max(500).optional(),
});

export async function GET() {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });
  const [user] = await db.select().from(users).where(eq(users.id, Number(session.user.id))).limit(1);
  if (!user) return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  return NextResponse.json(publicUser(user));
}

export async function PATCH(request: Request) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid profile data" }, { status: 400 });
  if (parsed.data.imageUrl?.startsWith("data:")) {
    return NextResponse.json({ message: "Upload the photo to Cloudinary instead of embedding it." }, { status: 400 });
  }

  const [updated] = await db.update(users).set(parsed.data).where(eq(users.id, Number(session.user.id))).returning();
  return NextResponse.json(publicUser(updated));
}
