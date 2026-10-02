import createIntlProxy from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isRebuiltPath, stripLocale } from "@/config/routes";
import { routing } from "@/i18n/routing";

const intlProxy = createIntlProxy(routing);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isRebuiltPath(pathname)) {
    return intlProxy(request);
  }

  const legacy = legacySiteUrl(request);
  if (!legacy) {
    return intlProxy(request);
  }

  // The old site has no /hi routes, so Hindi links land on its English page.
  return NextResponse.rewrite(new URL(stripLocale(pathname) + search, legacy));
}

function legacySiteUrl(request: NextRequest): URL | null {
  const value = process.env.LEGACY_SITE_URL;
  if (!value) return null;

  const url = new URL(value);
  // Pointing LEGACY_SITE_URL at this app's own domain would loop forever.
  if (url.host === request.headers.get("host")) return null;
  return url;
}

export const config = {
  // Everything except Next.js internals and this app's own static files.
  matcher: ["/((?!_next/|_vercel/|images/|icon\\.png|apple-icon\\.png|favicon\\.ico).*)"],
};
