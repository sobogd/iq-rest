"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGE_NAMES } from "@/app/_landing/lib/language-names";
import { analytics } from "@/lib/analytics";
import { getRegionPromptTexts } from "@/lib/region-prompt-texts";
import { swapLocale } from "@/lib/locale-slug-overrides";

const DISMISSED_KEY = "iq_region_prompt_dismissed";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function readBrowserLocale(): string | null {
  if (typeof navigator === "undefined") return null;
  const lang = navigator.language || (navigator.languages && navigator.languages[0]);
  if (!lang) return null;
  const short = lang.toLowerCase().split("-")[0];
  return short in LANGUAGE_NAMES ? short : null;
}

// Crawlers and ad/preview agents must never see the region prompt — it
// pollutes the rendered HTML they index and skews Google Ads quality checks
// (the bot lands on /en and gets nudged to switch). Match common bot
// signatures conservatively; anything we miss just sees the prompt as
// before, which is harmless beyond the SEO concern.
function isBot(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (!ua) return true;
  return /bot|crawler|spider|crawling|googlebot|bingbot|baiduspider|yandex|duckduckbot|slurp|facebookexternalhit|whatsapp|telegram|twitterbot|linkedinbot|adsbot-google|mediapartners-google|google-inspectiontool|google-pagespeed|chrome-lighthouse|headlesschrome|prerender|preview/i.test(
    ua,
  );
}

/**
 * Region prompt is a pure client-side decision now — no middleware redirect,
 * no ?askregion= param, no overlay on SSR HTML. We read:
 *
 *   - URL locale from pathname (what the visitor is reading)
 *   - geo_locale cookie set by middleware (what Cloudflare's country header
 *     resolved to)
 *   - navigator.language (the OS/browser's preference)
 *
 * If at least two distinct supported locales appear and the visitor hasn't
 * dismissed the prompt before, we surface a modal listing them so e.g. a
 * Chinese visitor landing on /es from a Spanish IP can switch to /zh in
 * one tap. Bots never render the modal — they don't execute the hydration
 * effect (and even if they did, the prompt is purely additive, the SSR
 * page underneath is the canonical content).
 */
export function RegionPromptModal() {
  const pathname = usePathname() ?? "/";
  const [hidden, setHidden] = useState(true);
  const [options, setOptions] = useState<string[]>([]);
  const [urlLocale, setUrlLocale] = useState("en");
  const [busy, setBusy] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isBot()) return;

    try {
      if (window.localStorage.getItem(DISMISSED_KEY)) return;
    } catch {
      // localStorage blocked (Safari private, embedded contexts) — fall
      // through and show the prompt; this visit gets one impression.
    }

    const segments = pathname.split("/").filter(Boolean);
    const url = segments[0] && segments[0] in LANGUAGE_NAMES ? segments[0] : "en";

    const geo = readCookie("geo_locale");
    const browser = readBrowserLocale();

    // Dedup and validate. Order matters for which tile shows first: URL
    // locale (the one being read) goes top, then geo, then browser.
    const opts = Array.from(
      new Set(
        [url, geo, browser].filter(
          (v): v is string => !!v && v in LANGUAGE_NAMES,
        ),
      ),
    );
    if (opts.length < 2) return;

    setUrlLocale(url);
    setOptions(opts);
    setHidden(false);

    if (!shownRef.current) {
      shownRef.current = true;
      analytics.track(`l_region_prompt_show_${opts.join("_")}`);
    }
  }, [pathname]);

  if (hidden || options.length < 2) return null;

  const texts = getRegionPromptTexts(urlLocale);

  async function pick(target: string): Promise<void> {
    if (busy) return;
    setBusy(true);
    analytics.track(`l_region_prompt_pick_${target}`);

    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Best-effort — if storage is blocked the prompt will reappear on
      // next nav, which is acceptable degradation.
    }

    // Same locale picked — close in place, no nav.
    if (target === urlLocale) {
      setHidden(true);
      setBusy(false);
      return;
    }

    // Different locale — translate the path via the shared override table.
    // swapLocale knows that e.g. /tr/restoran-online-siparis-sistemi maps
    // to /es/sistema-de-pedidos-para-restaurantes, falls back to a plain
    // first-segment swap for routes that aren't in the table.
    const destination = swapLocale(pathname, target);
    window.location.href = destination + window.location.search + window.location.hash;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="region-prompt-heading"
    >
      <div className="w-full max-w-sm rounded-2xl bg-background border border-border shadow-2xl p-6">
        <h2
          id="region-prompt-heading"
          className="text-xl font-semibold tracking-tight mb-2 text-center"
        >
          {texts.heading}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {texts.sub}
        </p>
        <div className="flex flex-col gap-3">
          {options.map((code) => (
            <button
              key={code}
              type="button"
              disabled={busy}
              onClick={() => pick(code)}
              className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-muted hover:border-foreground/40 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none"
            >
              {LANGUAGE_NAMES[code]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
