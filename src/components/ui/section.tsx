import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 md:py-24", className)} {...props} />;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "mb-3 text-sm font-semibold uppercase tracking-wider",
          light ? "text-gold" : "text-saffron-700",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-serif text-3xl font-semibold leading-tight md:text-4xl",
          light ? "text-white" : "text-earth",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg", light ? "text-white/80" : "text-earth-muted")}>{intro}</p>
      )}
    </div>
  );
}
