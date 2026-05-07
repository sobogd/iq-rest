"use client";

// Client-side analytics tracker mounted in the menu layout. Fires once per
// pathname change (not preview, no SSR), so every menu sub-page (/, /menu,
// /contacts, /reserve, /order, /language, ...) records a page_view. The
// layout owns this so individual page.tsx files don't have to remember to
// call it themselves.

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  slug: string;
  locale: string;
}

export function MenuPageTracker({ slug, locale }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string | null>(null);

  useEffect(() => {
    if (searchParams.get("preview") === "1") return;
    if (!pathname) return;
    if (lastTrackedRef.current === pathname) return;
    lastTrackedRef.current = pathname;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        page: pathname,
        language: locale,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, searchParams, slug, locale]);

  return null;
}
