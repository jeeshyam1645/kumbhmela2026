"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { CampRecord } from "@/lib/queries";
import { campAlt, campImageFallback, displayImage } from "@/lib/media";
import { SoftImage } from "./SoftImage";
import { useToast } from "./Toast";
import { useT } from "./Language";

export function CampList({ camps, live }: { camps: CampRecord[]; live: boolean }) {
  const { t, lang } = useT();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {camps.map((camp) => (
        <article key={camp.id} className="card overflow-hidden">
          <SoftImage
            src={displayImage(camp.nameEn, camp.imageUrl)}
            fallbackSrc={campImageFallback(camp.nameEn)}
            alt={campAlt(camp.nameEn)}
            className="h-52 w-full object-cover"
          />
          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-serif text-2xl">
                {camp.nameEn.toLowerCase().includes("swiss") ? (
                  <Link href="/accommodation/swiss-cottage">{lang === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn}</Link>
                ) : (
                  lang === "hi" && camp.nameHi ? camp.nameHi : camp.nameEn
                )}
              </h2>
            </div>
            <p className="text-sm text-ink/70">{lang === "hi" && camp.descriptionHi ? camp.descriptionHi : camp.descriptionEn}</p>
            <p className="text-xs uppercase tracking-wide text-ink/75">{camp.capacity}</p>
            {live && camp.id > 0 ? <CallbackForm camp={camp} /> : (
              <Link className="btn-primary w-full" href={`/contact?tent=${encodeURIComponent(camp.nameEn)}`}>{t("Send enquiry", "पूछताछ भेजें")}</Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function CallbackForm({ camp }: { camp: CampRecord }) {
  const { data } = useSession();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const toast = useToast();

  if (!data?.user) {
    return <Link className="btn-primary w-full" href={`/contact?tent=${encodeURIComponent(camp.nameEn)}`}>{t("Send enquiry", "पूछताछ भेजें")}</Link>;
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setMessage("");
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        campId: camp.id,
        guestName: String(form.get("guestName") || data?.user?.name || ""),
        mobile: String(form.get("mobile") || ""),
        checkIn: String(form.get("checkIn") || ""),
        checkOut: String(form.get("checkOut") || ""),
        guestCount: Number(form.get("guests") || 2),
      }),
    });
    setPending(false);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const text = body.message || t("Could not save the request.", "अनुरोध सहेजा नहीं जा सका।");
      setMessage(text);
      toast(text, "err");
      return;
    }
    window.location.href = "/bookings";
  }

  return (
    <div>
      <button className="btn-ghost w-full" type="button" onClick={() => setOpen((value) => !value)}>
        {t("Request callback", "कॉल बैक का अनुरोध")}
      </button>
      {open && (
        <form onSubmit={submit} className="mt-3 space-y-2">
          <input className="field" name="guestName" required defaultValue={data.user.name || ""} placeholder={t("Name", "नाम")} />
          <input className="field" name="mobile" required minLength={10} placeholder={t("Mobile", "मोबाइल")} />
          <div className="grid grid-cols-2 gap-2">
            <input className="field" name="checkIn" required type="date" />
            <input className="field" name="checkOut" required type="date" />
          </div>
          <input className="field" name="guests" type="number" min={1} max={10} defaultValue={2} />
          <button className="btn-primary w-full" disabled={pending} type="submit">{t("Request callback", "कॉल बैक का अनुरोध")}</button>
          {message && <p className="text-sm text-red-700">{message}</p>}
        </form>
      )}
    </div>
  );
}
