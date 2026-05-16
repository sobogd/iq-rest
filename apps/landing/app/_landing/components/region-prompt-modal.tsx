"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LANGUAGE_NAMES } from "@/app/_landing/lib/language-names";
import { analytics } from "@/lib/analytics";
import { getRegionPromptTexts } from "@/lib/region-prompt-texts";

// localStorage key marking that the visitor has already engaged with the
// modal. Once set we never ask again on this device — even though the
// middleware will keep adding ?askregion on every nav (it can't read
// client storage), the modal silently strips the param on mount.
const PROMPT_DISMISSED_KEY = "iq_region_prompt_dismissed";

function stripAskRegionFromUrl(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has("askregion")) return;
  url.searchParams.delete("askregion");
  const qs = url.searchParams.toString();
  window.history.replaceState(
    {},
    "",
    url.pathname + (qs ? `?${qs}` : "") + url.hash,
  );
}

interface PromptInnerProps {
  /** Comma-separated list parsed from `?askregion=` — the first entry is
   *  the URL locale (already on screen), the second is the geo-detected
   *  suggestion. Validated against the LANGUAGE_NAMES registry so a
   *  malformed param doesn't crash render. */
  raw: string;
  pathname: string;
}

function PromptInner({ raw, pathname }: PromptInnerProps) {
  const [hidden, setHidden] = useState(true); // start hidden; flipped after the mount-time LS check
  const [busy, setBusy] = useState(false);
  const shownRef = useRef(false);

  const options = Array.from(
    new Set(
      raw
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s in LANGUAGE_NAMES),
    ),
  );

  // URL locale is whatever the current pathname starts with — that's also
  // the locale we render the modal copy in (the visitor reads it in the
  // language they arrived at).
  const segments = pathname.split("/").filter(Boolean);
  const urlLocale = segments[0] && segments[0] in LANGUAGE_NAMES ? segments[0] : "en";
  const texts = getRegionPromptTexts(urlLocale);

  // On mount: if the visitor already engaged with the prompt on this
  // device, hide and strip the param so the URL stays clean across
  // navigations. Otherwise reveal and fire the show event.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let prior: string | null = null;
    try {
      prior = window.localStorage.getItem(PROMPT_DISMISSED_KEY);
    } catch {
      // localStorage blocked (Safari private, embedded contexts) —
      // treat as fresh visit so the modal still works.
    }
    if (prior) {
      stripAskRegionFromUrl();
      return;
    }
    setHidden(false);
    if (shownRef.current) return;
    shownRef.current = true;
    analytics.track(`land_region_prompt_show_${urlLocale}`);
  }, [urlLocale]);

  if (hidden || options.length < 2) return null;

  async function pick(target: string): Promise<void> {
    if (busy) return;
    setBusy(true);
    analytics.track(`land_region_prompt_pick_${target}`);

    // Mark dismissed so future navs don't re-show even when middleware
    // re-adds askregion.
    try {
      window.localStorage.setItem(PROMPT_DISMISSED_KEY, "1");
    } catch {
      // Best effort — if storage is blocked the visitor will see the
      // prompt again on next nav, which is acceptable.
    }

    // Preserve every existing param except askregion. Critical for
    // gclid/gbraid/wbraid so the Google Ads conversion chain survives
    // the locale switch.
    const params = new URLSearchParams(window.location.search);
    params.delete("askregion");
    const qs = params.toString();

    // Picked the locale we're already on — strip askregion from the URL
    // in place (no full navigation, no flash). Modal disappears because
    // the param is gone.
    if (target === urlLocale) {
      const cleanUrl = window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
      setBusy(false);
      return;
    }

    // Different locale — swap the first path segment. HEAD-probe the
    // resulting URL: if it's live we route there so the visitor stays
    // on the same content, otherwise fall back to the locale's home so
    // we don't dump them onto a 404.
    const swapped = "/" + [target, ...segments.slice(1)].join("/");
    let destination = swapped;
    try {
      const probe = await fetch(swapped, { method: "HEAD", redirect: "manual" });
      // `opaqueredirect` happens when redirect:manual hits a 3xx — still
      // treat as "this URL is live", the browser will follow on nav.
      const ok = probe.ok || probe.type === "opaqueredirect" || (probe.status >= 300 && probe.status < 400);
      if (!ok) destination = `/${target}`;
    } catch {
      destination = `/${target}`;
    }

    window.location.href = qs ? `${destination}?${qs}` : destination;
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

function PromptResolver() {
  const params = useSearchParams();
  const pathname = usePathname() ?? "/";
  const raw = params?.get("askregion");
  if (!raw) return null;
  return <PromptInner raw={raw} pathname={pathname} />;
}

// `useSearchParams()` opts a page into client-side rendering unless it's
// inside a Suspense boundary. Wrapping the resolver keeps the surrounding
// landing page eligible for static rendering — the modal is rendered only
// after hydration, hidden from the static HTML payload.
export function RegionPromptModal() {
  return (
    <Suspense fallback={null}>
      <PromptResolver />
    </Suspense>
  );
}
