import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";
import { getLocaleByCountryAndRegion } from "./lib/country-locale-map";
import { HOME_META, lastModifiedFor } from "./lib/page-meta";

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

  // Per-locale custom landings replace the locale-routed main page (e.g. /en, /es).
  // Match ONLY the bare locale path so sub-routes like /en/contacts keep going through next-intl.
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

  // Redirect root to a locale.
  //
  // SEO note: this used to be a blanket 302 to a geo-detected locale. That
  // made `/` indeterminate for crawlers (Googlebot in EU saw /es, in US saw
  // /en) and triggered "Duplicate without user-selected canonical" warnings
  // on locale homes.
  //
  // New behaviour:
  //   - User has NEXT_LOCALE cookie (picked locale in switcher) → 302 to it.
  //     Stays a 302 because the destination depends on a cookie.
  //   - No cookie (first-time visitor, every crawler) → 301 to /en.
  //     Deterministic, cacheable. Client-side RegionPromptModal still
  //     offers the geo-suggested locale once on /en.
  if (pathname === "/") {
    const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    if (preferredLocale && locales.includes(preferredLocale)) {
      const redirectUrl = new URL(`/${preferredLocale}`, request.url);
      redirectUrl.search = request.nextUrl.search;
      const response = NextResponse.redirect(redirectUrl, 302);
      response.headers.set("Vary", "Cookie");
      setGeoCookies(request, response);
      return response;
    }
    const redirectUrl = new URL(`/en`, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl, 301);
    setGeoCookies(request, response);
    return response;
  }

  // Redirect paths without locale prefix
  if (!localeRegex.test(pathname)) {
    const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    const targetLocale = (preferredLocale && locales.includes(preferredLocale))
      ? preferredLocale
      : detectLocaleByCountry(request);
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
