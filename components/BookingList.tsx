"use client";

import { useState } from "react";
import type { CampRecord } from "@/lib/queries";
import { displayImage } from "@/lib/media";
import { useT } from "./Language";

type Row = {
  id: number;
  campId: number;
  guestName: string;
  mobile: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalAmount: number;
  status: string | null;
};

export function BookingList({ bookings, camps }: { bookings: Row[]; camps: CampRecord[] }) {
  const { t, lang } = useT();
  const [rows, setRows] = useState(bookings);
  const [message, setMessage] = useState("");

  async function cancel(id: number) {
    const response = await fetch(`/api/bookings/${id}/cancel`, { method: "PATCH" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(body.message || t("Could not cancel", "रद्द नहीं हो सका"));
      return;
    }
    setRows((current) => current.map((row) => row.id === id ? { ...row, status: "cancelled" } : row));
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="font-serif text-4xl">{t("My bookings", "मेरी बुकिंग")}</h1>
      <p className="mt-2 text-sm text-ink/70">{t("Callback requests you have already sent.", "आपके भेजे हुए कॉलबैक अनुरोध।")}</p>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
      <div className="mt-6 space-y-4">
        {rows.length === 0 && <p className="card p-6 text-sm">{t("No bookings yet.", "अभी कोई बुकिंग नहीं।")}</p>}
        {rows.map((row) => {
          const camp = camps.find((item) => item.id === row.campId);
          return (
            <article key={row.id} className="card flex flex-col gap-4 p-4 sm:flex-row">
              <img src={displayImage(camp?.nameEn || "tent", camp?.imageUrl)} alt="" className="h-28 w-full rounded-xl object-cover sm:w-36" />
              <div className="flex-1">
                <h2 className="font-serif text-2xl">{lang === "hi" && camp?.nameHi ? camp.nameHi : camp?.nameEn || t("Camp", "शिविर")}</h2>
                <p className="text-sm text-ink/70">{row.checkIn} → {row.checkOut} · {row.guestCount} {t("guests", "अतिथि")} · ₹{row.totalAmount}</p>
                <p className="mt-1 text-sm capitalize">{row.status || "pending"}</p>
                {row.status !== "cancelled" && row.status !== "confirmed" && (
                  <button className="btn-ghost mt-3" type="button" onClick={() => cancel(row.id)}>{t("Cancel request", "अनुरोध रद्द करें")}</button>
                )}
                {row.status === "confirmed" && <p className="mt-2 text-xs text-ink/60">{t("Confirmed stays: please call us to change plans.", "पुष्ट प्रवास बदलने के लिए कॉल करें।")}</p>}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
