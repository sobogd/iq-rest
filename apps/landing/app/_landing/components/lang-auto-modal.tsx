"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { locales, type Locale } from "@/i18n/routing";
import { LANGUAGE_NAMES } from "@/app/_landing/lib/language-names";
import { swapLocale } from "@/lib/locale-slug-overrides";
import { rememberLocale } from "@/lib/remember-locale";
import { analytics } from "@/lib/analytics";

/**
 * `?lang=` handler for ad entry links (e.g. `?from=fb-mockap&lang=auto`).
 *
 *   • `lang=auto`      → open a picker modal (styled like the auth modal) with
 *                        up to 3 suggestions: geo locale (from the middleware's
 *                        `geo_locale` cookie), device language, English fallback.
 *   • `lang=<locale>`  → immediately redirect to that locale's homepage.
 *
 * The query string is captured SYNCHRONOUSLY in a useState initializer — it must
 * be read before PageTracker's mount effect strips every param from the URL
 * (child effects run before this layout-level component's own effect). The
 * params themselves are left in place so PageTracker still fires its
 * `l_param_lang__*` / `l_param_from__*` analytics events before cleaning.
 */

/** Same page in the target locale — swapLocale honours per-locale SEO slugs
 *  (e.g. /es/menu-digital-restaurantes ↔ /digital-menu-for-restaurants) and
 *  falls back to the locale home only when the page has no counterpart. */
function localizedHref(locale: Locale): string {
  return swapLocale(window.location.pathname, locale);
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** Map "pt-BR" / "es" / cookie values to a supported locale, else null. */
function asLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const primary = value.toLowerCase().split("-")[0];
  return (locales as readonly string[]).includes(primary) ? (primary as Locale) : null;
}

function deviceLocale(): Locale | null {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of candidates) {
    const mapped = asLocale(lang);
    if (mapped) return mapped;
  }
  return null;
}

export function LangAutoModal() {
  // Page-locale copy (messages/<locale>.json, en fallback via deep-merge).
  const t = useTranslations("langModal");
  // Captured during the first client render — before any mount effect
  // (PageTracker included) can rewrite the URL.
  const [initialSearch] = useState<string>(() =>
    typeof window === "undefined" ? "" : window.location.search,
  );
  const [suggestions, setSuggestions] = useState<Locale[] | null>(null);

  useEffect(() => {
    if (!initialSearch) return;
    const params = new URLSearchParams(initialSearch);
    const lang = params.get("lang");
    if (!lang) return;

    // Explicit locale → straight redirect to the same page in that locale,
    // keeping the other params (fbclid/utm/from) so tracking fires there.
    const explicit = asLocale(lang);
    if (explicit) {
      rememberLocale(explicit);
      params.delete("lang");
      const qs = params.toString();
      window.location.replace(localizedHref(explicit) + (qs ? `?${qs}` : ""));
      return;
    }

    if (lang !== "auto") return;

    // current-page locale (e.g. /es?lang=auto) → geo → device → English,
    // deduped; English is always present as fallback.
    const pageLocale = asLocale(document.documentElement.lang);
    const ordered = [pageLocale, asLocale(readCookie("geo_locale")), deviceLocale(), "en" as Locale];
    const unique: Locale[] = [];
    for (const l of ordered) {
      if (l && !unique.includes(l)) unique.push(l);
    }
    // Nothing to choose between → don't bother the user with a one-option modal.
    if (unique.length <= 1) return;
    setSuggestions(unique);
    // Suffix = the exact list of locales offered, e.g. l_langmodal_open_es_en_fr.
    analytics.track(`l_langmodal_open_${unique.join("_")}`);
  }, [initialSearch]);

  if (!suggestions) return null;

  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (o) return;
        analytics.track("l_langmodal_close");
        setSuggestions(null);
      }}
    >
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-md p-0 gap-0 bg-background border-border overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-0 text-left">
            <DialogTitle className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-2">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-snug">
              {t("subtitle")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3">
            {suggestions.map((locale) => (
              <a
                key={locale}
                href={localizedHref(locale)}
                onClick={() => {
                  rememberLocale(locale);
                  analytics.track(`l_langmodal_pick_${locale}`);
                }}
                className="w-full h-12 text-base font-medium text-foreground bg-background border border-border rounded-xl hover:border-foreground active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {LANGUAGE_NAMES[locale]}
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
