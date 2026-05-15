"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

const SKIP_SECTIONS = new Set(["scan"]);

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const LOCALE_REGEX = /^\/([a-z]{2})(?=\/|$)/;

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
  eventPrefix?: string;
}

export function PageTracker({ eventPrefix = "land_home_section_show_" }: PageTrackerProps = {}) {
  useEffect(() => {
    fireGclidAndCleanUrl();
    firePageEvent();

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name || seen.has(name)) continue;
          seen.add(name);
          if (!SKIP_SECTIONS.has(name)) {
            analytics.track(`${eventPrefix}${name}`);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [eventPrefix]);

  return null;
}
