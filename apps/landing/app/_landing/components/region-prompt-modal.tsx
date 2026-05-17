"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGE_NAMES } from "@/app/_landing/lib/language-names";
import { analytics } from "@/lib/analytics";
import { getRegionPromptTexts } from "@/lib/region-prompt-texts";

// localStorage key marking that the visitor has already engaged with the
// modal on this device. Set on either pick or explicit dismiss — we
// never show the prompt again until cleared.
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

    // Paid-traffic landings: respect the locale we targeted the ad at,
    // don't push the visitor toward a different one.
    const sp = new URLSearchParams(window.location.search);
    if (sp.has("gclid") || sp.has("gbraid") || sp.has("wbraid")) return;

    let dismissed: string | null = null;
    try {
      dismissed = window.localStorage.getItem(DISMISSED_KEY);
    } catch {
      // localStorage blocked (Safari private, embedded contexts) — treat
      // as fresh visit so the prompt still works.
    }
    if (dismissed) return;

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
      analytics.track(`land_region_prompt_show_${url}`);
    }
  }, [pathname]);

  if (hidden || options.length < 2) return null;

  const texts = getRegionPromptTexts(urlLocale);

  async function pick(target: string): Promise<void> {
    if (busy) return;
    setBusy(true);
    analytics.track(`land_region_prompt_pick_${target}`);

    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Best-effort — if storage is blocked the visitor will see the
      // prompt again on next nav, which is acceptable.
    }

    // Same locale picked — close in place, no nav.
    if (target === urlLocale) {
      setHidden(true);
      setBusy(false);
      return;
    }

    // Different locale — swap the first path segment. HEAD-probe so that
    // if the target locale doesn't have that route we fall back to its
    // home instead of 404'ing the visitor.
    const segments = pathname.split("/").filter(Boolean);
    const swapped = "/" + [target, ...segments.slice(1)].join("/");
    let destination = swapped;
    try {
      const probe = await fetch(swapped, { method: "HEAD", redirect: "manual" });
      const ok = probe.ok || probe.type === "opaqueredirect" || (probe.status >= 300 && probe.status < 400);
      if (!ok) destination = `/${target}`;
    } catch {
      destination = `/${target}`;
    }

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
