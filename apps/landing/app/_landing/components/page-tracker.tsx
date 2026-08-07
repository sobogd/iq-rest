"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { readBillingCurrencyFromDocument } from "@/lib/country-currency-map";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;

// Minimum gap between two consecutive view events for the same section.
// Stops a single slow scroll near the section's edge from firing dozens
// of events while a real re-visit (scroll away, scroll back) still fires
// a new one.
const SECTION_THROTTLE_MS = 1500;

// Sanitize an arbitrary string to the API event charset (a-z0-9_), collapsing
// any underscore run to a single `_` so a double underscore `__` can be used
// as an unambiguous name/value separator (parts never contain `__`).
function sanitizeEventPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// Only the Google click ids keep a dedicated raw-value event — their raw value
// (case + -, up to 256 chars) and server-side semantics (bot-filter bypass,
// is_google_ads flag) can't survive the generic a-z0-9_ channel. `fbclid` is
// listed ONLY to keep it out of the generic l_param_ pass: we deliberately do
// NOT track or store it anymore (client-privacy decision, 2026-08-07) — it is
// stripped from the URL with the rest of the query and never leaves the
// browser. Everything else (incl. `from`) goes through the universal l_param_
// pass.
const HANDLED_PARAMS = new Set(["gclid", "gbraid", "wbraid", "fbclid"]);

// Fire a `l_param_<name>__<value>` event for every other URL query param (the
// double underscore `__` separates name from value unambiguously — single
// underscores inside either part are kept), then strip ALL params from the URL
// so a reload doesn't double-count. Runs AFTER the dedicated gclid/fbclid
// handlers (they read their params first).
function fireAllParamsAndClean(): void {
  const sp = new URLSearchParams(window.location.search);
  if ([...sp.keys()].length === 0) return;

  for (const [key, value] of sp.entries()) {
    if (HANDLED_PARAMS.has(key.toLowerCase())) continue;
    const k = sanitizeEventPart(key);
    const v = sanitizeEventPart(value);
    if (!k || !v) continue;
    analytics.track(`l_param_${k}__${v}`.slice(0, 64));
  }

  const newUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, "", newUrl);
}

// Google click ids ride the unified `l_param_<name>__<value>` namespace too,
// but the value is the RAW id (case + - preserved, NOT sanitized) — the server
// accepts these via a dedicated permissive regex, sets is_google_ads, and
// bypasses the bot filter. Admin parses the id back by stripping the prefix.
function fireGclidEvent(): void {
  const sp = new URLSearchParams(window.location.search);
  const gclid = sp.get("gclid") || sp.get("gbraid") || sp.get("wbraid");
  if (!gclid || !GCLID_REGEX.test(gclid)) return;

  analytics.track(`l_param_gclid__${gclid}`);
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
    // Generic catch-all for every other URL param (incl. `from`), then strip
    // the whole query. fbclid is skipped on purpose — see HANDLED_PARAMS.
    fireAllParamsAndClean();
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
