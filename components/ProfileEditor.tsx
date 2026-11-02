"use client";

import { useState } from "react";
import { useT } from "./Language";
import { useToast } from "./Toast";

type Profile = {
  name: string;
  username: string;
  mobile: string | null;
  imageUrl: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
};

export function ProfileEditor({ user }: { user: Profile }) {
  const { t } = useT();
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState(user.imageUrl || "");

  async function upload(file: File) {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const json = await response.json();
    if (!response.ok) {
      setMessage(json.message || t("Upload failed", "अपलोड विफल"));
      return;
    }
    setImageUrl(json.url);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        mobile: form.get("mobile"),
        address: form.get("address"),
        city: form.get("city"),
        state: form.get("state"),
        zip: form.get("zip"),
        country: form.get("country"),
        imageUrl,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      const text = json.message || t("Could not save", "सहेजा नहीं जा सका");
      setMessage(text);
      toast(text, "err");
      return;
    }
    setEditing(false);
    const saved = t("Profile saved.", "प्रोफ़ाइल सहेजी गई।");
    setMessage(saved);
    toast(saved, "ok");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 pt-28 pb-16 md:grid-cols-[280px_1fr]">
      <aside className="card p-6 text-center">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-orange-100">
          {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center font-serif text-3xl">{user.name.slice(0, 1)}</span>}
        </div>
        <h1 className="mt-4 font-serif text-2xl">{user.name}</h1>
        <p className="text-sm text-ink/80">{user.username}</p>
        <p className="mt-3 text-sm">{user.mobile || t("No mobile yet", "मोबाइल नहीं")}</p>
      </aside>
      <form onSubmit={save} className="card space-y-3 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">{t("Profile", "प्रोफ़ाइल")}</h2>
          {!editing && <button className="btn-ghost" type="button" onClick={() => setEditing(true)}>{t("Edit", "संपादित करें")}</button>}
        </div>
        {(["name", "mobile", "address", "city", "state", "zip", "country"] as const).map((field) => (
          <label key={field} className="block text-sm capitalize">{field}
            <input className="field mt-1" name={field} defaultValue={(user[field] as string) || (field === "country" ? "India" : "")} disabled={!editing} />
          </label>
        ))}
        {editing && (
          <label className="block text-sm">{t("Photo", "फ़ोटो")}
            <input className="mt-1 block text-sm" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file); }} />
          </label>
        )}
        {message && <p className="text-sm">{message}</p>}
        {editing && <button className="btn-primary" type="submit">{t("Save", "सहेजें")}</button>}
      </form>
    </div>
  );
}
