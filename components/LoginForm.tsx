"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useT } from "./Language";

export function LoginForm() {
  const { t } = useT();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    if (mode === "register") {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          name: String(form.get("name") || ""),
          mobile: String(form.get("mobile") || ""),
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setPending(false);
        setError(body.message || t("Could not create the account.", "खाता नहीं बना।"));
        return;
      }
    }

    const result = await signIn("credentials", { username, password, redirect: false, callbackUrl });
    setPending(false);
    if (result?.error) {
      setError(t("Those details did not match. Google accounts should use the Google button.", "विवरण मेल नहीं खाए। Google खाते के लिए Google बटन का उपयोग करें।"));
      return;
    }
    window.location.href = callbackUrl;
  }

  return (
    <div className="card mx-auto max-w-md p-6">
      <h1 className="font-serif text-3xl">{t("Welcome", "स्वागत")}</h1>
      <button className="btn-ghost mt-4 w-full" type="button" onClick={() => signIn("google", { callbackUrl })}>
        {t("Continue with Google", "Google से जारी रखें")}
      </button>
      <div className="my-4 flex gap-2 text-sm">
        <button type="button" className={mode === "login" ? "font-semibold text-saffron-dark" : ""} onClick={() => setMode("login")}>{t("Login", "लॉग इन")}</button>
        <button type="button" className={mode === "register" ? "font-semibold text-saffron-dark" : ""} onClick={() => setMode("register")}>{t("Create account", "खाता बनाएँ")}</button>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        {mode === "register" && (
          <>
            <input className="field" name="name" required minLength={2} placeholder={t("Full name", "पूरा नाम")} />
            <input className="field" name="mobile" placeholder={t("Mobile", "मोबाइल")} />
          </>
        )}
        <input className="field" name="username" required minLength={3} placeholder={t("Username or email", "उपयोगकर्ता नाम या ईमेल")} />
        <input className="field" name="password" required minLength={8} type="password" placeholder={t("Password (8+ characters)", "पासवर्ड (8+ अक्षर)")} />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button className="btn-primary w-full" disabled={pending} type="submit">
          {pending ? "…" : mode === "login" ? t("Login", "लॉग इन") : t("Create account", "खाता बनाएँ")}
        </button>
      </form>
    </div>
  );
}
