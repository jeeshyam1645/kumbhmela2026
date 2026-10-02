import { useTranslations } from "next-intl";
import { buttonStyles } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <p className="font-serif text-7xl font-semibold text-saffron-600">404</p>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-earth">{t("title")}</h1>
        <p className="mt-3 text-earth-muted">{t("text")}</p>
        <Link href="/" className={buttonStyles({ className: "mt-8" })}>
          {t("home")}
        </Link>
      </Container>
    </Section>
  );
}
