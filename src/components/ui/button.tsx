import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-saffron-600 text-white shadow-sm hover:bg-saffron-700",
        whatsapp: "bg-whatsapp text-white shadow-sm hover:bg-whatsapp-dark",
        outline: "border border-saffron-200 bg-white text-saffron-800 hover:bg-saffron-50",
        ghost: "text-earth hover:bg-sand",
        light: "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        gold: "bg-gold text-earth shadow-sm hover:brightness-95",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;

/** Renders an <a> styled as a button. Most actions on this site are links (WhatsApp, call, pages). */
export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyleProps) {
  return <a className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
