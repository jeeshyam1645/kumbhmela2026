import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";
import { hashPassword } from "@/lib/password";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  username: z.string().trim().min(3).max(80),
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().max(20).optional(),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  if (!(await rateLimit(`register:${clientIp(request)}`, 8, 15 * 60 * 1000))) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Password must be at least 8 characters and the form must be complete." }, { status: 400 });
  }

  const [existing] = await db.select().from(users).where(eq(users.username, parsed.data.username)).limit(1);
  if (existing) return NextResponse.json({ message: "User already exists" }, { status: 400 });

  await db.insert(users).values({
    username: parsed.data.username,
    name: parsed.data.name,
    mobile: parsed.data.mobile || "",
    password: await hashPassword(parsed.data.password),
    role: "user",
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
