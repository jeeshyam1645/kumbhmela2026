"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "./Toast";

type EnquiryRow = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  tentType: string | null;
  checkIn: string | null;
  checkOut: string | null;
  guests: number | null;
  status: string;
  emailSent: boolean;
  createdAt: string;
};

export function AdminEnquiries() {
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [message, setMessage] = useState("");
  const toast = useToast();

  async function load() {
    const res = await fetch("/api/admin/enquiries");
    if (res.ok) setRows(await res.json());
    else setMessage((await res.json().catch(() => ({}))).message || "Could not load enquiries");
  }

  useEffect(() => { load(); }, []);

  async function markHandled(id: number) {
    const res = await fetch(`/api/admin/enquiries/${id}/handled`, { method: "PATCH" });
    if (!res.ok) {
      const text = (await res.json().catch(() => ({}))).message || "Request failed";
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
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl">Enquiries</h1>
        <Link className="text-sm underline" href="/admin">Back to admin</Link>
      </div>
      {message && <p className="mt-3 text-sm text-red-700">{message}</p>}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b"><th className="py-2">Received</th><th>Contact</th><th>Stay</th><th>Message</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-orange-100 align-top">
                <td className="py-3 whitespace-nowrap">{new Date(row.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                <td>{row.name}<div className="text-xs text-ink/75"><a href={`tel:${row.phone}`}>{row.phone}</a></div>{row.email && <div className="text-xs text-ink/75">{row.email}</div>}</td>
                <td>{row.tentType || "-"}<div className="text-xs">{row.checkIn || "?"} → {row.checkOut || "?"}{row.guests ? ` · ${row.guests} guests` : ""}</div></td>
                <td className="max-w-xs whitespace-pre-wrap">{row.message || "-"}</td>
                <td className="capitalize">{row.status}{!row.emailSent && <div className="text-xs text-ink/60">email not sent</div>}</td>
                <td className="text-right">{row.status !== "handled" && <button className="text-green-700" type="button" onClick={() => markHandled(row.id)}>Mark handled</button>}</td>
              </tr>
            ))}
            {rows.length === 0 && !message && <tr><td className="py-6 text-ink/60" colSpan={6}>No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
