import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { bookings, camps } from "@/lib/schema";

export const runtime = "nodejs";

const schema = z.object({
  campId: z.number().int().positive(),
  guestName: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(10).max(20),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guestCount: z.number().int().min(1).max(20),
  specialNeeds: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Please login to book" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Invalid booking data" }, { status: 400 });

  const [camp] = await db.select().from(camps).where(eq(camps.id, parsed.data.campId)).limit(1);
  if (!camp) return NextResponse.json({ message: "Camp not found" }, { status: 404 });

  const start = new Date(`${parsed.data.checkIn}T00:00:00+05:30`).getTime();
  const end = new Date(`${parsed.data.checkOut}T00:00:00+05:30`).getTime();
  const nights = Math.round((end - start) / 86400000);
  if (nights < 1) return NextResponse.json({ message: "Check-out must be after check-in" }, { status: 400 });

  const [created] = await db.insert(bookings).values({
    userId: Number(session.user.id),
    campId: camp.id,
    guestName: parsed.data.guestName,
    mobile: parsed.data.mobile,
    checkIn: parsed.data.checkIn,
    checkOut: parsed.data.checkOut,
    guestCount: parsed.data.guestCount,
    totalAmount: camp.price * parsed.data.guestCount * nights,
    advanceAmount: 0,
    status: "pending",
    paymentStatus: "unpaid",
    bookingType: "inquiry_call",
    specialNeeds: parsed.data.specialNeeds,
  }).returning();

  return NextResponse.json(created, { status: 201 });
}
