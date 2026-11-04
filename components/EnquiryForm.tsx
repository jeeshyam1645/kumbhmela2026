"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { site, tentOptions, whatsAppLink } from "@/lib/site";
import { useT } from "./Language";
import { useToast } from "./Toast";

export function EnquiryForm({ defaultTent = "", defaultNote = "" }: { defaultTent?: string; defaultNote?: string }) {
  const { t } = useT();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    tentType: tentOptions.includes((defaultTent === "Dormitory" ? "EP Tent – Dormitory (Shared)" : defaultTent) as (typeof tentOptions)[number])
      ? (defaultTent === "Dormitory" ? "EP Tent – Dormitory (Shared)" : defaultTent)
      : "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: defaultNote,
    company: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const toast = useToast();
  const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!turnstileKey || document.querySelector("script[src*='turnstile']")) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, [turnstileKey]);

  const message = [
    "Namaste, I would like to enquire about a Magh Mela 2027 stay.",
    `Name: ${form.name}`,
    `Phone: +91 ${form.mobile}`,
    `Tent: ${form.tentType}`,
    `Check-in: ${form.checkIn}`,
    `Check-out: ${form.checkOut}`,
    `Guests: ${form.guests}`,
    form.message ? `Note: ${form.message}` : "",
  ].filter(Boolean).join("\n");

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (form.checkOut <= form.checkIn) {
      const text = t("Check-out must be after check-in.", "चेक-आउट चेक-इन के बाद होना चाहिए।");
      setError(text);
      toast(text, "err");
      return;
    }
    setPending(true);
    const token = (document.querySelector("[name=cf-turnstile-response]") as HTMLInputElement | null)?.value;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        mobile: `+91${form.mobile}`,
        tentType: form.tentType,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        message: form.message,
        company: form.company,
        turnstileToken: token,
      }),
    });
    setPending(false);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const text = body.message || t("Could not send. Use WhatsApp.", "नहीं भेजा जा सका। व्हाट्सएप करें।");
      setError(text);
      toast(text, "err");
      return;
    }
    toast(t("Enquiry sent.", "पूछताछ भेज दी गई।"), "ok");
    router.push(`/thank-you?name=${encodeURIComponent(form.name)}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm text-ink/70">{t("No account needed. Send this form or continue on WhatsApp.", "खाते की ज़रूरत नहीं। फ़ॉर्म भेजें या व्हाट्सएप करें।")}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">{t("Name", "नाम")}
          <input className="field mt-1" required minLength={2} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <label className="block text-sm">{t("Mobile", "मोबाइल")}
          <input className="field mt-1" required minLength={10} inputMode="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="9876543210" />
        </label>
        <label className="block text-sm">{t("Tent", "टेंट")}
          <select className="field mt-1" required value={form.tentType} onChange={(e) => set("tentType", e.target.value)}>
            <option value="">{t("Choose a stay", "ठहराव चुनें")}</option>
            {tentOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="block text-sm">{t("Guests", "अतिथि")}
          <select className="field mt-1" value={form.guests} onChange={(e) => set("guests", e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
          </select>
        </label>
        <label className="block text-sm">{t("Check-in", "चेक-इन")}
          <input className="field mt-1" required type="date" value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
        </label>
        <label className="block text-sm">{t("Check-out", "चेक-आउट")}
          <input className="field mt-1" required type="date" value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
        </label>
      </div>
      <label className="block text-sm">{t("Message", "संदेश")}
        <textarea className="field mt-1 min-h-28" value={form.message} onChange={(e) => set("message", e.target.value)} />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Company
        <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} />
      </label>
      {turnstileKey ? (
        <div className="cf-turnstile" data-sitekey={turnstileKey} />
      ) : null}
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="btn-primary flex-1" disabled={pending} type="submit">{pending ? t("Sending…", "भेज रहे हैं…") : t("Send enquiry", "पूछताछ भेजें")}</button>
        <a className="btn-wa flex-1" href={whatsAppLink(message)} target="_blank" rel="noopener noreferrer">{t("WhatsApp these details", "ये विवरण व्हाट्सएप करें")}</a>
      </div>
      <p className="text-xs text-ink/75">{t("Or call", "या कॉल करें")} {site.phoneDisplay}</p>
    </form>
  );
}
