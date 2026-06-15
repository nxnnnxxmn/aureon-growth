"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

/**
 * Analytics loader — GA4 + Microsoft Clarity.
 *
 * Architecture:
 *  - Scripts use strategy="afterInteractive" so they don't block initial paint
 *  - GA4 fires automatic page_view via gtag config
 *  - Clarity captures heatmaps + session recordings automatically
 *  - On client-side route changes (Next.js navigation), we manually fire page_view
 *    because GA4 only auto-tracks initial load in SPA mode
 *
 * Privacy defaults:
 *  - anonymize_ip enabled (IP truncated before storage)
 *  - SameSite=Lax cookies with Secure flag
 *  - No consent banner included here — add separately if targeting strict EU/UK
 *
 * No-op gracefully when env vars are missing — safe to ship without configured analytics.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID || "";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "";

export default function Analytics() {
  // Don't render anything if neither service is configured
  if (!GA_ID && !CLARITY_ID) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure',
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {/* Client-side route change tracker — wrapped in Suspense (Next.js 15 requirement) */}
      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}

/**
 * Tracks Next.js App Router navigation changes.
 * Uses usePathname + useSearchParams to detect route changes,
 * then fires page_view to GA4 for SPA navigation.
 */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(url, typeof document !== "undefined" ? document.title : undefined);
  }, [pathname, searchParams]);

  return null;
}
