import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/schema";

export const runtime = "nodejs";

export async function PATCH(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "Database is not configured" }, { status: 503 });

  const bookingId = Number((await context.params).id);
  if (!Number.isInteger(bookingId)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
  if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  if (booking.userId !== Number(session.user.id)) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  if (booking.status === "confirmed") {
    return NextResponse.json({ message: "Confirmed bookings cannot be cancelled directly. Please contact support." }, { status: 400 });
  }

  await db.update(bookings).set({ status: "cancelled" }).where(eq(bookings.id, bookingId));
  return NextResponse.json({ success: true });
}
