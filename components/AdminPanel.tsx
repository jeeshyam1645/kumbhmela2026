"use client";

import { useEffect, useState } from "react";
import type { CampRecord, PujaRecord } from "@/lib/queries";
import { useT } from "./Language";
import { useToast } from "./Toast";

type BookingRow = {
  id: number;
  guestName: string;
  mobile: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalAmount: number;
  advanceAmount: number | null;
  status: string | null;
  bookingType: string | null;
};

export function AdminPanel() {
  const { t } = useT();
  const [tab, setTab] = useState<"bookings" | "camps" | "pujas">("bookings");
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [camps, setCamps] = useState<CampRecord[]>([]);
  const [pujas, setPujas] = useState<PujaRecord[]>([]);
  const [message, setMessage] = useState("");
  const toast = useToast();

  async function load() {
    const [bookingRes, campRes, pujaRes] = await Promise.all([
      fetch("/api/admin/bookings"),
      fetch("/api/camps"),
      fetch("/api/puja-services"),
    ]);
    if (bookingRes.ok) setBookings(await bookingRes.json());
    if (campRes.ok) setCamps(await campRes.json());
    if (pujaRes.ok) setPujas(await pujaRes.json());
  }

  useEffect(() => { load(); }, []);

  async function act(url: string, method = "PATCH") {
    const response = await fetch(url, { method });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const text = body.message || "Request failed";
      setMessage(text);
      toast(text, "err");
      return;
    }
    setMessage("");
    toast("Saved", "ok");
    await load();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl">{t("Admin", "प्रशासन")}</h1>
      <div className="mt-4 flex gap-2 text-sm">
        {(["bookings", "camps", "pujas"] as const).map((item) => (
          <button key={item} className={tab === item ? "btn-primary" : "btn-ghost"} type="button" onClick={() => setTab(item)}>{item}</button>
        ))}
      </div>
      {message && <p className="mt-3 text-sm text-red-700">{message}</p>}

      {tab === "bookings" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th className="py-2">Guest</th><th>Dates</th><th>Status</th><th>Type</th><th>Total</th><th></th></tr></thead>
            <tbody>
              {bookings.map((row) => (
                <tr key={row.id} className="border-b border-orange-100">
                  <td className="py-3">{row.guestName}<div className="text-xs text-ink/75">{row.mobile}</div></td>
                  <td>{row.checkIn} → {row.checkOut}<div className="text-xs">{row.guestCount} guests</div></td>
                  <td className="capitalize">{row.status}</td>
                  <td>{row.bookingType}</td>
                  <td>{row.guestCount}</td>
                  <td className="space-x-2 text-right">
                    {row.status === "pending" && <button className="text-green-700" type="button" onClick={() => act(`/api/admin/bookings/${row.id}/confirm`)}>Confirm</button>}
                    {row.status !== "cancelled" && <button className="text-red-700" type="button" onClick={() => act(`/api/admin/bookings/${row.id}/reject`)}>Reject</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "camps" && <Catalog kind="camp" rows={camps} onDone={load} />}
      {tab === "pujas" && <Catalog kind="puja" rows={pujas} onDone={load} />}
    </div>
  );
}

function Catalog({ kind, rows, onDone }: { kind: "camp" | "puja"; rows: Array<CampRecord | PujaRecord>; onDone: () => Promise<void> }) {
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const current = typeof editing === "number" ? rows.find((row) => row.id === editing) : null;

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const features = String(form.get("features") || "").split(",").map((item) => item.trim()).filter(Boolean);
    const body = {
      nameEn: form.get("nameEn"),
      nameHi: form.get("nameHi"),
      descriptionEn: form.get("descriptionEn"),
      descriptionHi: form.get("descriptionHi"),
      price: Number(form.get("price") || 0),
      capacity: form.get("capacity") || "2 Persons",
      imageUrl: form.get("imageUrl"),
      features,
      totalInventory: Number(form.get("totalInventory") || 10),
    };
    const base = kind === "camp" ? "/api/admin/camps" : "/api/admin/puja-services";
    const response = await fetch(editing === "new" ? base : `${base}/${editing}`, {
      method: editing === "new" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) return;
    setEditing(null);
    await onDone();
  }

  async function uploadInto(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const json = await response.json();
    if (response.ok) {
      const url = input.form?.elements.namedItem("imageUrl");
      if (url instanceof HTMLInputElement) url.value = json.url;
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <button className="btn-primary" type="button" onClick={() => setEditing("new")}>Add</button>
      {rows.map((row) => (
        <div key={row.id} className="card flex items-center justify-between p-4">
          <div>
            <p className="font-semibold">{row.nameEn}</p>
          </div>
          <div className="space-x-3 text-sm">
            <button type="button" onClick={() => setEditing(row.id)}>Edit</button>
            <button className="text-red-700" type="button" onClick={async () => {
              const base = kind === "camp" ? "/api/admin/camps" : "/api/admin/puja-services";
              await fetch(`${base}/${row.id}`, { method: "DELETE" });
              await onDone();
            }}>Delete</button>
          </div>
        </div>
      ))}
      {editing != null && (
        <form onSubmit={save} className="card grid gap-3 p-4 md:grid-cols-2">
          <input className="field" name="nameEn" required defaultValue={current?.nameEn || ""} placeholder="Name (English)" />
          <input className="field" name="nameHi" defaultValue={current?.nameHi || ""} placeholder="Name (Hindi)" />
          <input className="field" name="price" type="number" required defaultValue={current?.price || 0} placeholder="Price" />
          {kind === "camp" && <input className="field" name="capacity" defaultValue={"capacity" in (current || {}) ? (current as CampRecord).capacity : "2 Persons"} placeholder="Capacity" />}
          {kind === "camp" && <input className="field" name="totalInventory" type="number" defaultValue={"totalInventory" in (current || {}) ? (current as CampRecord).totalInventory : 10} placeholder="Inventory" />}
          <input className="field md:col-span-2" name="imageUrl" defaultValue={current?.imageUrl || ""} placeholder="Cloudinary image URL" />
          <input className="text-sm" type="file" accept="image/*" onChange={(event) => uploadInto(event.currentTarget)} />
          <textarea className="field md:col-span-2" name="descriptionEn" required defaultValue={current?.descriptionEn || ""} placeholder="Description" />
          <textarea className="field md:col-span-2" name="descriptionHi" defaultValue={current?.descriptionHi || ""} placeholder="Description (Hindi)" />
          {kind === "camp" && <input className="field md:col-span-2" name="features" defaultValue={"features" in (current || {}) ? ((current as CampRecord).features || []).join(", ") : ""} placeholder="Features, comma separated" />}
          <button className="btn-primary" type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
