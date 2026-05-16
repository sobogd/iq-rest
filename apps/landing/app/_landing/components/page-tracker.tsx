"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const LOCALE_REGEX = /^\/([a-z]{2})(?=\/|$)/;

// Minimum gap between two consecutive view events for the same section.
// Stops a single slow scroll near the section's edge from firing dozens
// of events while a real re-visit (scroll away, scroll back) still fires
// a new one.
const SECTION_THROTTLE_MS = 1500;

function pageNameFromPathname(pathname: string, locale: string): string {
  const prefix = `/${locale}`;
  let rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  if (rest.startsWith("/")) rest = rest.slice(1);
  if (!rest) return "home";
  return rest.replace(/\//g, "_").replace(/-/g, "_").toLowerCase();
}

function fireGclidAndCleanUrl(): void {
  const sp = new URLSearchParams(window.location.search);
  const gclid = sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid");
  if (!gclid || !GCLID_REGEX.test(gclid)) return;

  analytics.track(`land_gclid_${gclid}`);

  ["gclid", "gbraid", "wbraid"].forEach((k) => sp.delete(k));
  const qs = sp.toString();
  const newUrl = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
  window.history.replaceState({}, "", newUrl);
}

function firePageEvent(): void {
  const pathname = window.location.pathname || "/";
  const localeMatch = pathname.match(LOCALE_REGEX);
  const locale = localeMatch ? localeMatch[1] : "en";
  const page = pageNameFromPathname(pathname, locale);
  analytics.track(`land_page_${locale}_${page}`);
}

interface PageTrackerProps {
  /** Kept for backwards compatibility with feature pages, no longer used —
   *  every section view now fires `land_section_view_<name>` so the server
   *  can reconstruct the full scroll journey via event timestamps. */
  eventPrefix?: string;
}

export function PageTracker(_props: PageTrackerProps = {}) {
  useEffect(() => {
    fireGclidAndCleanUrl();
    firePageEvent();

    // Re-fires on every viewport (re-)entry so the server timeline shows
    // the full scroll path — `hero → features → footer → features → ...`.
    // Throttle per section prevents a slow drag at the boundary from
    // spamming the same name.
    const lastFiredAt = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name) continue;
          const last = lastFiredAt.get(name) ?? 0;
          if (now - last < SECTION_THROTTLE_MS) continue;
          lastFiredAt.set(name, now);
          analytics.track(`land_section_view_${name}`);
        }
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
