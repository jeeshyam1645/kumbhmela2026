import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(10).max(20),
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

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ message: "Email is not configured. Please use WhatsApp." }, { status: 503 });
  }

  const data = parsed.data;
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

  if (!response.ok) return NextResponse.json({ message: "Failed to send inquiry" }, { status: 500 });
  return NextResponse.json({ success: true });
}
