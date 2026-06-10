"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { readBillingCurrencyFromDocument } from "@/lib/country-currency-map";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;

// Minimum gap between two consecutive view events for the same section.
// Stops a single slow scroll near the section's edge from firing dozens
// of events while a real re-visit (scroll away, scroll back) still fires
// a new one.
const SECTION_THROTTLE_MS = 1500;

function readFromSource(): string | null {
  // `?from=` is no longer stripped server-side — read it straight from the URL.
  // Sanitize to the API event charset (a-z0-9_) instead of rejecting, so ANY
  // source name still fires `l_from_<name>` (e.g. "My-Campaign 1" → "my_campaign_1").
  const sp = new URLSearchParams(window.location.search);
  const raw = (sp.get("from") || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
  return raw || null;
}

function fireFromAndClean(): void {
  const source = readFromSource();
  if (!source) return;

  analytics.track(`l_from_${source}`);

  // Strip ?from= from the URL after firing so a reload doesn't double-count.
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

function fireCurrencyEvent(): void {
  // Geo-determined billing currency (from the geo_currency cookie, EUR default).
  // Lowercase: the API's generic-event regex is /^[a-z0-9_]{1,64}$/, so an
  // uppercase currency (e.g. "EUR") would be rejected and the event dropped.
  analytics.track(`l_currency_${readBillingCurrencyFromDocument().toLowerCase()}`);
}

function fireLocaleEvent(): void {
  // Language the page actually rendered in — read from <html lang="…">, set by
  // each per-locale layout (root group is "en"). Fires `l_locale_<lang>` so we
  // can see which language visitors land on, alongside the currency event.
  // Guarded to the API's /^[a-z0-9_]{1,64}$/ event regex.
  const lang = (document.documentElement.lang || "").toLowerCase();
  if (!/^[a-z]{2,8}$/.test(lang)) return;
  analytics.track(`l_locale_${lang}`);
}

interface PageTrackerProps {
  /** Locale-stable page key (e.g. "home", "pricing", "help", "kds"). Fires
   *  `l_page_<page>` so the event aggregates across every language version. */
  page: string;
}

export function PageTracker({ page }: PageTrackerProps) {
  useEffect(() => {
    fireGclidEvent();
    fireFbclidEvent();
    fireFromAndClean();
    analytics.track(`l_page_${page}`);
    fireCurrencyEvent();
    fireLocaleEvent();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return null;
}
