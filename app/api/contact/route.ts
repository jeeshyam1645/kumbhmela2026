import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { enquiries } from "@/lib/schema";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(10).max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  tentType: z.string().trim().max(80).optional().or(z.literal("")),
  checkIn: z.string().trim().max(20).optional().or(z.literal("")),
  checkOut: z.string().trim().max(20).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(50).optional(),
  company: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

async function turnstileOk(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  if (!(await rateLimit(`contact:${clientIp(request)}`, 8, 15 * 60 * 1000))) {
    return NextResponse.json({ message: "Too many enquiries. Please try WhatsApp." }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Please check the enquiry details." }, { status: 400 });
  if (parsed.data.company?.trim()) return NextResponse.json({ success: true });
  if (!(await turnstileOk(parsed.data.turnstileToken, clientIp(request)))) {
    return NextResponse.json({ message: "Please complete the spam check." }, { status: 400 });
  }

  const data = parsed.data;

  // 1. Persist the enquiry first so it is never lost.
  const db = getDb();
  let enquiryId: number | null = null;
  if (db) {
    try {
      const [row] = await db
        .insert(enquiries)
        .values({
          name: data.name,
          phone: data.mobile,
          email: data.email || null,
          message: data.message || null,
          tentType: data.tentType || null,
          checkIn: data.checkIn || null,
          checkOut: data.checkOut || null,
          guests: data.guests ?? null,
        })
        .returning({ id: enquiries.id });
      enquiryId = row?.id ?? null;
    } catch (error) {
      console.error("[contact] failed to save enquiry", error);
    }
  } else {
    console.error("[contact] DATABASE_URL not configured; enquiry not saved");
  }

  // 2. Try to send the notification email; failures are logged, not surfaced.
  const emailSent = await sendEnquiryEmail(data).catch((error) => {
    console.error("[contact] email send threw", error);
    return false;
  });

  if (db && enquiryId !== null && emailSent) {
    await db.update(enquiries).set({ emailSent: true }).where(eq(enquiries.id, enquiryId)).catch((error) => {
      console.error("[contact] failed to mark email_sent", error);
    });
  }

  // Only fail if we could neither store nor email the enquiry.
  if (enquiryId === null && !emailSent) {
    return NextResponse.json({ message: "Failed to send inquiry. Please use WhatsApp." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

async function sendEnquiryEmail(data: z.infer<typeof schema>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[contact] RESEND_API_KEY not configured; skipping email");
    return false;
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Magh Mela <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO || "maghmelastays@gmail.com"],
      subject: `New Inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Mobile: ${data.mobile}`,
        `Email: ${data.email || "-"}`,
        `Tent: ${data.tentType || "-"}`,
        `Check-in: ${data.checkIn || "-"}`,
        `Check-out: ${data.checkOut || "-"}`,
        `Guests: ${data.guests ?? "-"}`,
        "",
        "Message:",
        data.message || "-",
      ].join("\n"),
    }),
  });
  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text().catch(() => ""));
    return false;
  }
  return true;
}
