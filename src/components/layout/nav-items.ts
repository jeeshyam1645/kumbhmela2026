import { LEGACY_PATHS } from "@/config/routes";

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: LEGACY_PATHS.about },
  { key: "accommodation", href: LEGACY_PATHS.accommodation },
  { key: "pujaServices", href: LEGACY_PATHS.pujaServices },
  { key: "kumbhGuide", href: LEGACY_PATHS.kumbhGuide },
  { key: "contact", href: LEGACY_PATHS.contact },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
