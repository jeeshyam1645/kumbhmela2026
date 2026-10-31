"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useT } from "./Language";

const links = [
  { href: "/", en: "Home", hi: "होम" },
  { href: "/about-us", en: "About", hi: "हमारे बारे में" },
  { href: "/accommodation", en: "Stays", hi: "आवास" },
  { href: "/puja-services", en: "Rituals", hi: "अनुष्ठान" },
  { href: "/kumbh-guide", en: "Guide", hi: "गाइड" },
  { href: "/contact", en: "Contact", hi: "संपर्क" },
];

export function Header() {
  const pathname = usePathname();
  const { t, lang, setLang } = useT();
  const { data, status } = useSession();
  const user = data?.user;
  const solid = pathname !== "/";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b ${solid ? "border-orange-100 bg-cream/95 backdrop-blur" : "border-transparent bg-gradient-to-b from-black/50 to-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-saffron text-white">म</span>
          <span className={solid ? "text-ink" : "text-white"}>Magh Mela</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm ${pathname === link.href ? "bg-saffron text-white" : solid ? "text-ink hover:bg-orange-50" : "text-white hover:bg-white/15"}`}
            >
              {t(link.en, link.hi)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-orange-200 text-xs">
            <button className={`px-2 py-1 ${lang === "en" ? "bg-saffron text-white" : "bg-white text-ink"}`} onClick={() => setLang("en")} type="button">EN</button>
            <button className={`px-2 py-1 ${lang === "hi" ? "bg-saffron text-white" : "bg-white text-ink"}`} onClick={() => setLang("hi")} type="button">हिं</button>
          </div>
          {status === "loading" ? null : user ? (
            <details className="relative">
              <summary className={`cursor-pointer list-none rounded-full px-3 py-1.5 text-sm ${solid ? "bg-white" : "bg-white/90"}`}>
                {user.name?.split(" ")[0] || t("Account", "खाता")}
              </summary>
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-orange-100 bg-white p-2 text-sm shadow-lg">
                {user.role === "admin" && <Link className="block rounded-lg px-3 py-2 hover:bg-orange-50" href="/admin">{t("Admin", "प्रशासन")}</Link>}
                <Link className="block rounded-lg px-3 py-2 hover:bg-orange-50" href="/profile">{t("Profile", "प्रोफ़ाइल")}</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-orange-50" href="/bookings">{t("My bookings", "मेरी बुकिंग")}</Link>
                <button className="block w-full rounded-lg px-3 py-2 text-left text-red-700 hover:bg-orange-50" onClick={() => signOut({ callbackUrl: "/" })} type="button">{t("Log out", "लॉग आउट")}</button>
              </div>
            </details>
          ) : (
            <Link href="/login" className="btn-primary !px-4 !py-1.5">{t("Login", "लॉग इन")}</Link>
          )}
        </div>
      </div>
    </header>
  );
}
