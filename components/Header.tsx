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
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const onHero = pathname === "/";
  const glass = onHero && !open;

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  const chip = glass
    ? "border border-white/35 bg-black/45 text-white backdrop-blur-md"
    : "border border-line bg-paper text-ink";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b ${glass ? "border-transparent bg-gradient-to-b from-black/70 to-transparent" : "border-line bg-cream/95 text-ink backdrop-blur"}`}>
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-serif text-lg font-semibold">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-white">म</span>
          <span className={glass ? "text-white" : "text-ink"}>Magh Mela</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("Primary", "मुख्य")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron ${
                pathname === link.href ? "bg-saffron text-white" : glass ? "text-white hover:bg-white/15" : "text-ink hover:bg-soft"
              }`}
            >
              {t(link.en, link.hi)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className={`hidden overflow-hidden rounded-full lg:flex ${chip}`}>
            <LangButtons lang={lang} setLang={setLang} glass={glass} />
          </div>
          <div className="hidden lg:block">
            <ThemeToggle onHero={glass} />
          </div>
          <div className="relative hidden lg:block">
            {status === "loading" ? (
              <span className={`inline-flex h-11 w-24 rounded-full ${chip}`} />
            ) : user ? (
              <>
                <button
                  type="button"
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ${chip}`}
                  aria-expanded={accountOpen}
                  aria-controls="account-menu"
                  onClick={() => setAccountOpen((value) => !value)}
                >
                  {user.name?.split(" ")[0] || t("Account", "खाता")}
                </button>
                {accountOpen && (
                  <div id="account-menu" className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-paper p-2 text-sm text-ink shadow-lg">
                    <AccountLinks t={t} />
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${chip}`}>
                {t("Login", "लॉग इन")}
              </Link>
            )}
          </div>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${chip}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("Close menu", "मेनू बंद करें") : t("Open menu", "मेनू खोलें")}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-paper px-4 py-3 text-ink lg:hidden">
          <nav className="space-y-1" aria-label={t("Mobile", "मोबाइल")}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="flex min-h-11 items-center rounded-xl px-3 hover:bg-soft active:bg-soft">
                {t(link.en, link.hi)}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            <div className="flex overflow-hidden rounded-full border border-line bg-paper">
              <LangButtons lang={lang} setLang={setLang} glass={false} />
            </div>
            <ThemeToggle />
          </div>
          <div className="mt-3 border-t border-line pt-3">
            {status === "loading" ? (
              <p className="px-3 py-2 text-sm text-ink/70">{t("Loading account…", "खाता लोड हो रहा है…")}</p>
            ) : user ? (
              <AccountLinks t={t} />
            ) : (
              <Link href="/login" className="btn-primary w-full">{t("Login", "लॉग इन")}</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function AccountLinks({ t }: { t: (en: string, hi: string) => string }) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="space-y-1">
      {user?.role === "admin" && <Link className="flex min-h-11 items-center rounded-lg px-3 hover:bg-soft" href="/admin">{t("Admin", "प्रशासन")}</Link>}
      <Link className="flex min-h-11 items-center rounded-lg px-3 hover:bg-soft" href="/profile">{t("Profile", "प्रोफ़ाइल")}</Link>
      <Link className="flex min-h-11 items-center rounded-lg px-3 hover:bg-soft" href="/bookings">{t("My bookings", "मेरी बुकिंग")}</Link>
      <button className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-red-700 hover:bg-soft" onClick={() => signOut({ callbackUrl: "/" })} type="button">{t("Log out", "लॉग आउट")}</button>
    </div>
  );
}

function LangButtons({ lang, setLang, glass }: { lang: "en" | "hi"; setLang: (lang: "en" | "hi") => void; glass: boolean }) {
  const idle = glass ? "text-white" : "bg-paper text-ink";
  return (
    <>
      <button className={`min-h-11 min-w-11 px-3 ${lang === "en" ? "bg-saffron text-white" : idle}`} onClick={() => setLang("en")} type="button">EN</button>
      <button className={`min-h-11 min-w-11 px-3 ${lang === "hi" ? "bg-saffron text-white" : idle}`} onClick={() => setLang("hi")} type="button" aria-label="हिंदी">हिं</button>
    </>
  );
}
