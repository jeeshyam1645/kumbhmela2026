import { isRebuiltPath } from "@/config/routes";
import { Link } from "@/i18n/navigation";

type SiteLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Use for every internal link. Rebuilt pages get client-side navigation;
 * pages still on the old site get a normal full page load.
 */
export function SiteLink({ href, ...props }: SiteLinkProps) {
  if (isRebuiltPath(href)) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} {...props} />;
}
