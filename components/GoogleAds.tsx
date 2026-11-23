"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { NEXT_PUBLIC_GOOGLE_ADS_ID, trackEvent } from "@/lib/gtag";

export function GoogleAds() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/admin");

  useEffect(() => {
    if (!enabled) return;
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackEvent("contact_call");
      else if (/wa\.me|whatsapp/i.test(href)) trackEvent("contact_whatsapp");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${NEXT_PUBLIC_GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
