import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";
import { getLocaleByCountryAndRegion } from "./lib/country-locale-map";
import { HOME_META, lastModifiedFor } from "./lib/page-meta";
import { isGone } from "./lib/gone-paths";
import { LOCALE_SLUG_OVERRIDES } from "./lib/locale-slug-overrides";

const EN_ROOT_SLUGS: ReadonlySet<string> = new Set(
  Object.values(LOCALE_SLUG_OVERRIDES)
    .map((m) => m.en)
    .filter((v): v is string => !!v),
);

// Minimal HTML body for HTTP 410. Search engines look at the status code,
// not the body — keep it tiny but human-readable in case anyone lands here.
function goneResponse(pathname: string): NextResponse {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Gone · IQ Rest</title>
<meta name="robots" content="noindex">
<style>body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:64px auto;padding:0 20px;color:#1a1a1a}h1{font-weight:500;font-size:28px;margin:0 0 12px}p{line-height:1.5;color:#555}a{color:#000;text-decoration:underline}</style>
</head>
<body>
<h1>This page is no longer available</h1>
<p>The page <code>${pathname.replace(/[<>&]/g, "")}</code> was removed and won't return. Head to <a href="/">iq-rest.com</a> to find what you need.</p>
</body>
</html>`;
  return new NextResponse(body, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

const intlMiddleware = createMiddleware(routing);

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

const GEO_COUNTRY_COOKIE = "geo_country";
const GEO_LOCALE_COOKIE = "geo_locale";

/**
 * Получить страну из Cloudflare header.
 */
function getCountry(request: NextRequest): string | null {
  return request.headers.get("cf-ipcountry");
}

/**
 * Определяет язык по стране
 * Fallback на английский если страна не определена
 */
function detectLocaleByCountry(request: NextRequest): Locale {
  const country = getCountry(request);
  const region = request.headers.get("cf-region");
  const city = request.headers.get("cf-ipcity");

  if (country) {
    const locale = getLocaleByCountryAndRegion(country, region, city);
    if (locale) {
      return locale;
    }
  }

  return "en";
}

/**
 * Записывает geo-куки:
 *   geo_country — страна из Cloudflare (используется dashboard и map-picker).
 *   geo_locale  — вычисленный locale (используется client-side
 *                 RegionPromptModal чтобы решить, показывать ли prompt).
 *
 * Никаких 302/URL-params для prompt'а — клиент сам решает по cookie +
 * navigator.language. Это убирает crawl-budget waste для ботов и
 * любой риск soft-cloaking от оверлея поверх SSR-контента.
 */
function setGeoCookies(request: NextRequest, response: NextResponse): void {
  const cfCountry = request.headers.get("cf-ipcountry");
  if (!cfCountry) return;

  const existing = request.cookies.get(GEO_COUNTRY_COOKIE)?.value;
  if (!existing || existing === cfCountry) {
    response.cookies.set(GEO_COUNTRY_COOKIE, cfCountry, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }

  response.cookies.set(GEO_LOCALE_COOKIE, detectLocaleByCountry(request), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // FB/PPC entry point: detect locale by Cloudflare geo, 302 to localized home.
  // 302 (NOT 301) — the target depends on the visitor's geo, so it must not be
  // cached. Respects an explicit NEXT_LOCALE cookie for returning visitors.
  if (pathname === "/detect-lang") {
    const preferred = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    const locale = (preferred && locales.includes(preferred))
      ? preferred
      : detectLocaleByCountry(request);
    const target = new URL(locale === "en" ? "/" : `/${locale}`, request.url);
    target.search = request.nextUrl.search; // preserve fbclid/utm/gclid
    const response = NextResponse.redirect(target, 302);
    setGeoCookies(request, response);
    return response;
  }

  // Pages we removed in the 2026-05-20 landing restructure: serve 410 Gone
  // so Googlebot can drop them from the index quickly. Lookup is O(1).
  if (isGone(pathname)) {
    return goneResponse(pathname);
  }

  // English is served at the root: `/`, `/pricing`, etc. Old `/en` and known
  // `/en/<slug>` URLs 301 to their root counterparts. Must run BEFORE the
  // bare-locale-match block below, otherwise /en falls through to a 404.
  if (pathname === "/en") {
    const target = new URL("/", request.url);
    target.search = request.nextUrl.search;
    const response = NextResponse.redirect(target, 301);
    setGeoCookies(request, response);
    return response;
  }
  if (pathname.startsWith("/en/")) {
    const sub = pathname.slice(3);
    if (EN_ROOT_SLUGS.has(sub)) {
      const target = new URL(sub, request.url);
      target.search = request.nextUrl.search;
      const response = NextResponse.redirect(target, 301);
      setGeoCookies(request, response);
      return response;
    }
  }

  // Per-locale custom landings replace the locale-routed main page (e.g. /es, /it).
  // Match ONLY the bare locale path so sub-routes like /it/contacts keep going through next-intl.
  // `/en` is already handled above (301 → /), so it never reaches this match.
  const onlyLocaleMatch = pathname.match(/^\/([a-z]{2})$/);
  if (onlyLocaleMatch && (locales as readonly string[]).includes(onlyLocaleMatch[1])) {
    const response = NextResponse.next();
    response.headers.set("Last-Modified", new Date(HOME_META.lastModified).toUTCString());
    response.headers.set("Content-Language", onlyLocaleMatch[1]);
    setGeoCookies(request, response);
    return response;
  }

  // Strip ?from= param → save to cookie for client-side referral tracking
  const fromParam = request.nextUrl.searchParams.get("from");
  if (fromParam) {
    const slugParam = request.nextUrl.searchParams.get("slug");
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete("from");
    if (slugParam) cleanUrl.searchParams.delete("slug");
    const response = NextResponse.redirect(cleanUrl, 302);
    response.cookies.set("ref_from", fromParam, {
      path: "/",
      maxAge: 60 * 5, // 5 minutes
      sameSite: "lax",
    });
    if (slugParam) {
      response.cookies.set("ref_slug", slugParam, {
        path: "/",
        maxAge: 60 * 5,
        sameSite: "lax",
      });
    }
    return response;
  }

  // `/` and English root slugs (pricing, digital-menu-for-restaurants, ...)
  // resolve to the `app/(en)` route group. Set Last-Modified and skip the
  // "no-locale-prefix" geo redirect below.
  if (pathname === "/" || EN_ROOT_SLUGS.has(pathname)) {
    const response = NextResponse.next();
    const lm = pathname === "/" ? HOME_META.lastModified : lastModifiedFor(
      // Resolve root slug → shared route key for lookup in FEATURE_PAGES
      Object.entries(LOCALE_SLUG_OVERRIDES).find(([, m]) => m.en === pathname)?.[0] ?? pathname,
    );
    if (lm) response.headers.set("Last-Modified", new Date(lm).toUTCString());
    response.headers.set("Content-Language", "en");
    setGeoCookies(request, response);
    return response;
  }

  // Redirect paths without locale prefix to the visitor's preferred locale.
  if (!localeRegex.test(pathname)) {
    const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    const targetLocale = (preferredLocale && locales.includes(preferredLocale))
      ? preferredLocale
      : detectLocaleByCountry(request);
    if (targetLocale === "en") {
      const response = NextResponse.next();
      setGeoCookies(request, response);
      return response;
    }
    const redirectUrl = new URL(`/${targetLocale}${pathname}`, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl, 302);
    setGeoCookies(request, response);
    return response;
  }

  // Redirect /[locale]/demo → demo public-menu subdomain directly.
  const demoMatch = pathname.match(new RegExp(`^/(${localePattern})/demo$`));
  if (demoMatch) {
    return NextResponse.redirect("https://love-eatery.iq-rest.com", 301);
  }

  // Use next-intl middleware for locale handling
  const response = intlMiddleware(request);

  // Add pathname to headers for SSR components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  // Set Last-Modified for marketing pages
  const pagePath = pathname.replace(localeRegex, "/");
  const lastModified = lastModifiedFor(pagePath);
  if (lastModified) {
    response.headers.set("Last-Modified", new Date(lastModified).toUTCString());
  }

  // Disable Google Translate prompt
  const localeMatch = pathname.match(localeRegex);
  if (localeMatch) {
    response.headers.set("Content-Language", localeMatch[1]);
  }

  // Set geo cookies from Cloudflare headers
  setGeoCookies(request, response);

  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_vercel|m/|.*\\..*).*)",
  ],
};
