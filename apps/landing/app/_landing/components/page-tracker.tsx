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
    // Preserve the existing state object. Passing a fresh {} overwrites the App
    // Router's internal history state, and Back onto this entry then finds
    // nothing to restore and falls back to a full document reload — on the ad
    // entry page, which is the one entry that must stay cheap.
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.hash,
    );
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

/** How long the page must sit still before a scroll counts as finished. Long
 *  enough to ride out momentum scrolling on a phone, short enough that two
 *  deliberate swipes are two events. */
const SCROLL_SETTLE_MS = 500;
/** Hard cap per pageview. Someone flicking up and down a long page produces
 *  real transitions, but not an unbounded number of rows. */
const MAX_SCROLL_EVENTS = 40;

/**
 * Scroll as movement between sections: every time the page settles somewhere
 * new, one event — "Scroll down" / "Scroll up" for the action, the section it
 * came to rest on for the name.
 *
 * Direction is the action rather than part of the name so the two can be
 * counted separately, and only the destination is named: the section it left
 * is the destination of the event before it, so recording both would say the
 * same thing twice.
 *
 * The previous version reported a depth percentage and only when the deepest
 * quarter increased, which meant scrolling back up produced nothing at all and
 * sections that did not happen to straddle a 25% boundary were never named.
 */
function createScrollTracker() {
  let settled: string | null = null;
  let settledY = 0;
  let sent = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  /** The section the viewport is looking at = the one containing its middle.
   *  Using the centre rather than the top edge keeps the answer stable while a
   *  section boundary drifts past the top of the screen. */
  const currentSection = (): string | null => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).filter(
      (el) => el.dataset.section,
    );
    if (els.length === 0) return null;

    // At the very bottom, name the last section outright. A short footer never
    // reaches the middle of the screen, so the centre rule alone would report
    // the block above it as the end of every scroll to the end of the page.
    const scrollable = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    if (window.scrollY + window.innerHeight >= scrollable - 2) {
      const last = els[els.length - 1].dataset.section;
      return last ? sectionLabel(last) : null;
    }

    const centre = window.scrollY + window.innerHeight / 2;
    let best: string | null = null;
    let bestTop = -Infinity;
    for (const el of els) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top > centre) continue;
      // Sections are laid out in document order, but a nested one can appear
      // later with a smaller top — take the lowest section that starts above
      // the centre.
      if (top > bestTop) {
        bestTop = top;
        best = sectionLabel(el.dataset.section!);
      }
    }
    // Scrolled above the first section (rubber-banding, sticky header offset).
    return best ?? sectionLabel(els[0].dataset.section!);
  };

  const settle = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // A modal locks body scroll, which collapses the scrollable height to about
    // one viewport while scrollY keeps its old value — the bottom-of-page rule
    // below would then read as "reached the footer" from wherever the visitor
    // happened to be. Nothing they do inside a modal is a scroll gesture.
    if (document.body.style.overflow === "hidden") return;
    const now = currentSection();
    const y = window.scrollY;
    if (!now) return;
    if (settled && now !== settled && sent < MAX_SCROLL_EVENTS) {
      sent += 1;
      analytics.track(y >= settledY ? "Scroll down" : "Scroll up", now);
    }
    settled = now;
    settledY = y;
  };

  /** Called on every (coalesced) scroll frame: restart the settle countdown. */
  const onMove = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(settle, SCROLL_SETTLE_MS);
  };

  /** Where the visitor entered the page — an anchor link or a restored
   *  position means that is not necessarily the top. */
  const begin = () => {
    settled = currentSection();
    settledY = window.scrollY;
  };

  /** The pageview is ending: close any scroll still in flight and push it out.
   *
   *  The flush is not optional. The transport registers its own pagehide /
   *  visibilitychange handlers when the module loads, i.e. BEFORE this
   *  component mounts, so on the way out it drains the queue first and an event
   *  queued here would sit on a document that is already gone. */
  const finish = () => {
    settle();
    analytics.flush();
  };

  return { begin, onMove, finish };
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

    const scroll = createScrollTracker();
    scroll.begin();
    // rAF-coalesced: a scroll fires dozens of events per second, and there is
    // no point restarting the settle countdown more than once per frame.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scroll.onMove();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Three exits, and all three are needed. On mobile a tab is usually swiped
    // away or backgrounded, which fires visibilitychange and often no pagehide
    // at all; desktop link-outs fire pagehide; a soft navigation fires neither
    // and only unmounts.
    const onHide = () => {
      if (document.visibilityState === "hidden") scroll.finish();
    };
    window.addEventListener("pagehide", scroll.finish);
    document.addEventListener("visibilitychange", onHide);
    // Back-navigation on Safari (and increasingly elsewhere) restores the page
    // from bfcache: the document is reused, so this effect never re-runs and
    // the return visit would otherwise leave no trace at all. The attribution
    // ctx is deliberately not re-sent — the visit already carries it.
    const onShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      analytics.setPage(toPageLabel(page));
      setTrackLocale(document.documentElement.lang || "");
      analytics.track("Show", "Pageview");
      scroll.begin();
    };
    window.addEventListener("pageshow", onShow);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", scroll.finish);
      window.removeEventListener("pageshow", onShow);
      document.removeEventListener("visibilitychange", onHide);
      scroll.finish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pathname]);

  return null;
}
