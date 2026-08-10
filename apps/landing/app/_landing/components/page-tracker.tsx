"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics, isValidPageLabel, searchReferrerHost, setTrackLocale, type TrackCtx } from "@/lib/analytics";
import { readBillingCurrencyFromDocument } from "@/lib/country-currency-map";
import { sectionLabel } from "@/lib/track-keys";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;
const FROM_REGEX = /^[A-Za-z0-9_.-]{1,64}$/;
const CURRENCY_REGEX = /^[A-Z]{3}$/;

// Document-scoped (not pageview-scoped) facts. They describe the visit, not
// the route, so re-sending them on every client-side navigation would inflate
// the counts without adding information. Module scope is exactly the lifetime
// we want: reset on a real document load, kept across soft navigations.
let documentCtxSent = false;
let currencySent = false;

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

/** Which currency this visitor was quoted, as its own event type so the admin
 *  can read country → currency straight off the timeline. Only on pricing: that
 *  is where the number is actually shown, and one sample per visit is enough to
 *  answer the question. */
function trackCurrency(): void {
  if (currencySent) return;
  const currency = readBillingCurrencyFromDocument();
  if (!CURRENCY_REGEX.test(currency)) return;
  currencySent = true;
  analytics.track("Currency", currency);
}

/** Scroll reach, as ONE event per pageview instead of a per-section stream.
 *
 *  The old per-section events cost eight rows a pageview and answered a
 *  question nobody asked ("was this block on screen at 14:22:03?"). What is
 *  actually useful is how far down the page the visitor got — and, because a
 *  deep link or a restored scroll position can start them mid-page, where they
 *  started. Hence "Hero - Kitchen display (75%)".
 */
function createScrollReach() {
  let startLabel: string | null = null;
  let deepestLabel: string | null = null;
  let deepestTop = -1;
  let maxPercent = 0;
  let sent = false;

  const measure = () => {
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;
    const scrollable = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    if (scrollable > 0) {
      maxPercent = Math.max(maxPercent, Math.min(100, (viewportBottom / scrollable) * 100));
    }
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-section]"))) {
      const token = el.dataset.section;
      if (!token) continue;
      const top = el.getBoundingClientRect().top + viewportTop;
      const bottom = top + el.offsetHeight;
      // Where the visitor STARTED is whatever was on screen at the first
      // measurement — not simply the first section in the document. An anchor
      // link (#pricing) or a restored scroll position drops them mid-page, and
      // the sections above were never seen.
      if (startLabel === null && bottom >= viewportTop && top <= viewportBottom) {
        startLabel = sectionLabel(token);
      }
      // "Reached" = the section's top edge has come into view.
      if (top > viewportBottom) continue;
      if (top >= deepestTop) {
        deepestTop = top;
        deepestLabel = sectionLabel(token);
      }
    }
  };

  const send = () => {
    if (sent) return;
    sent = true;
    measure();
    // Round DOWN to a quarter: "made it past halfway" is a claim we can stand
    // behind, "reached 63%" is noise from the viewport height.
    const bucket = Math.min(100, Math.floor(maxPercent / 25) * 25);
    const name =
      startLabel && deepestLabel && startLabel !== deepestLabel
        ? `${startLabel} - ${deepestLabel} (${bucket}%)`
        : deepestLabel
          ? `${deepestLabel} (${bucket}%)`
          : `Depth ${bucket}%`;
    analytics.track("Scroll", name);
  };

  return { measure, send };
}

interface PageTrackerProps {
  /** Locale-stable page key (e.g. "home", "pricing", "help", "kds"). Becomes
   *  the `page` of every event fired while this page is mounted. */
  page: string;
}

export function PageTracker({ page }: PageTrackerProps) {
  // Keyed on the real pathname, not on `page`: two routes can share a page key
  // (locale variants of the same feature), and a `[page]`-only dependency would
  // skip the second pageview and leave the scroll listener measuring the
  // unmounted route.
  const pathname = usePathname();

  useEffect(() => {
    analytics.setPage(toPageLabel(page));
    setTrackLocale(document.documentElement.lang || "");

    const ctx = collectCtxAndCleanUrl();
    const attribution = ctx && (!documentCtxSent || hasFreshAttribution(ctx)) ? ctx : undefined;
    documentCtxSent = true;
    // The pageview carries the attribution ctx — the server applies it to the
    // session first-write-wins.
    analytics.track("Show", "Pageview", attribution);
    if (page === "pricing") trackCurrency();

    const reach = createScrollReach();
    // rAF-coalesced: a scroll fires dozens of events per second and each
    // measurement walks the sections and reads layout.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        reach.measure();
      });
    };
    reach.measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // Two exits, and both are needed: pagehide covers closing the tab or
    // following a link out (the transport beacons what is buffered), the effect
    // cleanup covers a soft navigation, where pagehide never fires. `send` is
    // idempotent, so the pair can't double-count.
    window.addEventListener("pagehide", reach.send);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pagehide", reach.send);
      reach.send();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pathname]);

  return null;
}
