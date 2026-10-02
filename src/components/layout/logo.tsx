import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ tone = "default" }: { tone?: "default" | "light" }) {
  const t = useTranslations("brand");
  return (
    <span className="flex items-center gap-3">
      <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-saffron-700 text-xl font-bold text-white shadow-sm">
        {t("short")}
      </span>
      <span className="leading-tight">
        <span className={cn("block font-semibold", tone === "light" ? "text-white" : "text-earth")}>
          {t("name")}
        </span>
        <span className={cn("block text-xs", tone === "light" ? "text-white/70" : "text-earth-muted")}>
          {t("tagline", { season: site.season })}
        </span>
      </span>
    </span>
  );
}
