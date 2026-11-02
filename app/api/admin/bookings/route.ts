import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { listAllBookings } from "@/lib/queries";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ message: "Admin access required" }, { status: 403 });
  return NextResponse.json(await listAllBookings());
}
