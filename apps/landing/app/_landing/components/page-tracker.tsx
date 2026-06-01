"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { readBillingCurrencyFromDocument } from "@/lib/country-currency-map";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;
const LOCALE_REGEX = /^\/([a-z]{2})(?=\/|$)/;
const FROM_REGEX = /^[a-z0-9_]{1,32}$/;

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

function readFromSource(): string | null {
  // First, look at the URL — direct hit before middleware-stripped cookie kicks in
  // (e.g. SPA-style nav added by an external linker, or middleware bypass for some path).
  const sp = new URLSearchParams(window.location.search);
  const fromParam = sp.get("from");
  if (fromParam && FROM_REGEX.test(fromParam.toLowerCase())) {
    return fromParam.toLowerCase();
  }
  // Otherwise read the cookie middleware set on the initial /?from=… hit
  // (5-minute TTL — only covers the first navigation after the click).
  const m = document.cookie.match(/(?:^|; )ref_from=([^;]*)/);
  if (!m) return null;
  const raw = decodeURIComponent(m[1]).toLowerCase();
  return FROM_REGEX.test(raw) ? raw : null;
}

function fireFromAndClean(): void {
  const source = readFromSource();
  if (!source) return;

  analytics.track(`l_from_${source}`);

  // Clear cookie so we don't re-fire on subsequent page loads in the same session.
  document.cookie = "ref_from=; path=/; max-age=0";

  // Strip ?from= from the URL if it survived (middleware normally redirects it away,
  // but a same-origin SPA push could leave it).
  const sp = new URLSearchParams(window.location.search);
  if (!sp.has("from")) return;
  sp.delete("from");
  const qs = sp.toString();
  const newUrl = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
  window.history.replaceState({}, "", newUrl);
}

function fireGclidEvent(): void {
  const sp = new URLSearchParams(window.location.search);
  const gclid = sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid");
  if (!gclid || !GCLID_REGEX.test(gclid)) return;

  analytics.track(`l_gclid_${gclid}`);
}

function fireFbclidEvent(): void {
  const sp = new URLSearchParams(window.location.search);
  const fbclid = sp.get("fbclid");
  if (!fbclid || !FBCLID_REGEX.test(fbclid)) return;

  analytics.track(`l_fbclid_${fbclid}`);
}

function firePageEvent(): void {
  const pathname = window.location.pathname || "/";
  const localeMatch = pathname.match(LOCALE_REGEX);
  const locale = localeMatch ? localeMatch[1] : "en";
  const page = pageNameFromPathname(pathname, locale);
  analytics.track(`l_page_${locale}_${page}`);
}

function fireCurrencyEvent(): void {
  // Geo-determined billing currency (from the geo_currency cookie, EUR default).
  analytics.track(`land_currency_${readBillingCurrencyFromDocument()}`);
}

interface PageTrackerProps {
  /** Kept for backwards compatibility with feature pages, no longer used —
   *  every section view now fires `l_section_view_<name>` so the server
   *  can reconstruct the full scroll journey via event timestamps. */
  eventPrefix?: string;
}

export function PageTracker(_props: PageTrackerProps = {}) {
  useEffect(() => {
    fireGclidEvent();
    fireFbclidEvent();
    fireFromAndClean();
    firePageEvent();
    fireCurrencyEvent();

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
          analytics.track(`l_section_view_${name}`);
        }
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
