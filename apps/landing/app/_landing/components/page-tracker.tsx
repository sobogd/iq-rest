"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, isValidPageLabel, searchReferrerHost, type TrackCtx } from "@/lib/analytics";
import { readBillingCurrencyFromDocument } from "@/lib/country-currency-map";
import { sectionLabel } from "@/lib/track-keys";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;
const FROM_REGEX = /^[A-Za-z0-9_.-]{1,64}$/;
const CURRENCY_REGEX = /^[A-Z]{3}$/;

// Minimum gap between two consecutive view events for the same section.
// Stops a single slow scroll near the section's edge from firing dozens
// of events while a real re-visit (scroll away, scroll back) still fires
// a new one.
const SECTION_THROTTLE_MS = 1500;

// Document-scoped (not pageview-scoped) facts. They describe the visit, not
// the route, so re-sending them on every client-side navigation would inflate
// the counts without adding information. Module scope is exactly the lifetime
// we want: reset on a real document load, kept across soft navigations.
let documentCtxSent = false;
let documentFactsSent = false;

/** "home" → "Home", "qr-menu" → "Qr Menu" — page keys stay locale-stable
 *  short slugs at the call sites, the label is derived. */
function toLabel(slug: string): string {
  return slug
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Page label with a guaranteed-valid result. An empty or malformed `page`
 *  (e.g. a feature page whose trackPrefix collapses to "") is rejected by the
 *  server per-batch, taking every unrelated event in the batch down with it. */
function toPageLabel(slug: string): string {
  const label = toLabel(slug);
  return isValidPageLabel(label) ? label : "Landing";
}

/** Collect session-attribution params (paid click ids, ?from=, search
 *  referrer) from the URL, then strip the ENTIRE query string so a reload
 *  doesn't re-send them. Must run before any other tracking on the page. */
function collectCtxAndCleanUrl(): TrackCtx | undefined {
  const ctx: TrackCtx = {};
  const sp = new URLSearchParams(window.location.search);

  const fbclid = sp.get("fbclid");
  if (fbclid && FBCLID_REGEX.test(fbclid)) ctx.fbclid = fbclid;
  for (const key of ["gclid", "gbraid", "wbraid"] as const) {
    const v = sp.get(key);
    if (v && GCLID_REGEX.test(v)) ctx[key] = v;
  }
  const from = sp.get("from");
  if (from && FROM_REGEX.test(from)) ctx.from = from;
  const ref = searchReferrerHost();
  if (ref) ctx.ref = ref;

  if ([...sp.keys()].length > 0) {
    window.history.replaceState({}, "", window.location.pathname + window.location.hash);
  }
  return Object.keys(ctx).length > 0 ? ctx : undefined;
}

/** Click ids / ?from= only ever come from a fresh entry URL, so seeing one
 *  means a genuinely new attribution — worth sending even mid-visit. `ref` is
 *  derived from document.referrer, which survives soft navigations and would
 *  otherwise re-attribute the session on every route change. */
function hasFreshAttribution(ctx: TrackCtx): boolean {
  return Boolean(ctx.fbclid || ctx.gclid || ctx.gbraid || ctx.wbraid || ctx.from);
}

/** One-per-document measurements: rendered locale (can differ from the
 *  Accept-Language the server stores) and the geo-derived billing currency
 *  that drives every price on the page. */
function trackDocumentFacts(): void {
  if (documentFactsSent) return;
  documentFactsSent = true;

  const lang = (document.documentElement.lang || "").toLowerCase();
  if (/^[a-z]{2,8}$/.test(lang)) analytics.track("Show", `Page language ${lang}`);

  const currency = readBillingCurrencyFromDocument();
  if (CURRENCY_REGEX.test(currency)) analytics.track("Show", `Shown currency ${currency}`);
}

interface PageTrackerProps {
  /** Locale-stable page key (e.g. "home", "pricing", "help", "kds"). Becomes
   *  the `page` of every event fired while this page is mounted. */
  page: string;
}

export function PageTracker({ page }: PageTrackerProps) {
  // Keyed on the real pathname, not on `page`: two routes can share a page key
  // (locale variants of the same feature), and a `[page]`-only dependency
  // would skip the second pageview and leave the IntersectionObserver bound to
  // the unmounted route's DOM.
  const pathname = usePathname();

  useEffect(() => {
    analytics.setPage(toPageLabel(page));

    const ctx = collectCtxAndCleanUrl();
    const attribution = ctx && (!documentCtxSent || hasFreshAttribution(ctx)) ? ctx : undefined;
    documentCtxSent = true;
    // The pageview carries the attribution ctx — the server applies it to the
    // session first-write-wins.
    analytics.track("Show", "Pageview", attribution);
    trackDocumentFacts();

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
          const label = sectionLabel(name);
          if (label) analytics.track("Show", `${label} section`);
        }
      },
      { threshold: 0.5 },
    );

    const seen = new WeakSet<Element>();
    const observeSections = () => {
      document.querySelectorAll("[data-section]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        observer.observe(el);
      });
    };
    observeSections();

    // Sections can mount after this effect (client-only islands, conditionally
    // rendered blocks, modals) — a single query at mount would never see them.
    // Coalesced into one rescan per frame so DOM-heavy pages don't pay for a
    // querySelectorAll on every mutation record.
    let rescan = 0;
    const mutations = new MutationObserver(() => {
      if (rescan) return;
      rescan = requestAnimationFrame(() => {
        rescan = 0;
        observeSections();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rescan) cancelAnimationFrame(rescan);
      mutations.disconnect();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pathname]);

  return null;
}
