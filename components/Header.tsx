"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
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
  const onHero = pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b ${onHero && !open ? "border-transparent bg-gradient-to-b from-black/60 to-transparent" : "border-line bg-cream/95 backdrop-blur"}`}>
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-serif text-lg font-semibold">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-white">म</span>
          <span className={onHero && !open ? "text-white" : "text-ink"}>Magh Mela</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("Primary", "मुख्य")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron ${
                pathname === link.href
                  ? "bg-saffron text-white"
                  : onHero
                    ? "text-white hover:bg-white/15"
                    : "text-ink hover:bg-soft"
              }`}
            >
              {t(link.en, link.hi)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className={`hidden overflow-hidden rounded-full border text-xs sm:flex ${onHero && !open ? "border-white/40" : "border-line"}`}>
            <LangButtons lang={lang} setLang={setLang} onHero={onHero && !open} />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle onHero={onHero && !open} />
          </div>
          {status === "loading" ? (
            <span className="h-11 w-16" />
          ) : user ? (
            <details className="relative">
              <summary className={`flex min-h-11 cursor-pointer list-none items-center rounded-full px-3 text-sm ${onHero && !open ? "bg-white/90 text-ink" : "bg-paper text-ink"}`}>
                {user.name?.split(" ")[0] || t("Account", "खाता")}
              </summary>
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-paper p-2 text-sm text-ink shadow-lg">
                {user.role === "admin" && <Link className="block min-h-11 rounded-lg px-3 py-2 hover:bg-soft" href="/admin">{t("Admin", "प्रशासन")}</Link>}
                <Link className="block min-h-11 rounded-lg px-3 py-2 hover:bg-soft" href="/profile">{t("Profile", "प्रोफ़ाइल")}</Link>
                <Link className="block min-h-11 rounded-lg px-3 py-2 hover:bg-soft" href="/bookings">{t("My bookings", "मेरी बुकिंग")}</Link>
                <button className="block min-h-11 w-full rounded-lg px-3 py-2 text-left text-red-700 hover:bg-soft" onClick={() => signOut({ callbackUrl: "/" })} type="button">{t("Log out", "लॉग आउट")}</button>
              </div>
            </details>
          ) : (
            <Link href="/login" className="btn-primary !px-4">{t("Login", "लॉग इन")}</Link>
          )}
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${onHero && !open ? "border-white/40 text-white" : "border-line text-ink"}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="space-y-1 border-t border-line bg-paper px-4 py-3 text-ink lg:hidden" aria-label={t("Mobile", "मोबाइल")}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex min-h-11 items-center rounded-xl px-3 hover:bg-soft active:bg-soft">
              {t(link.en, link.hi)}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex overflow-hidden rounded-full border border-line">
              <LangButtons lang={lang} setLang={setLang} onHero={false} />
            </div>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}

function LangButtons({ lang, setLang, onHero }: { lang: "en" | "hi"; setLang: (lang: "en" | "hi") => void; onHero: boolean }) {
  const idle = onHero ? "text-white" : "bg-paper text-ink";
  return (
    <>
      <button className={`min-h-11 min-w-11 px-3 ${lang === "en" ? "bg-saffron text-white" : idle}`} onClick={() => setLang("en")} type="button">EN</button>
      <button className={`min-h-11 min-w-11 px-3 ${lang === "hi" ? "bg-saffron text-white" : idle}`} onClick={() => setLang("hi")} type="button" aria-label="हिंदी">हिं</button>
    </>
  );
}
