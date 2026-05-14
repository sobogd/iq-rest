import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";
import { getLocaleByCountry, getLocaleByCountryAndRegion } from "./lib/country-locale-map";
import { getCurrencyByCountry } from "./lib/country-currency-map";

const intlMiddleware = createMiddleware(routing);

// Last-Modified dates for marketing pages (shared source of truth with sitemap.ts)
const PAGE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-04-30",
  "/pricing": "2026-02-24",
  "/instant-setup": "2026-02-24",
  "/mobile-management": "2026-02-24",
  "/ai-translation": "2026-02-24",
  "/multilingual": "2026-02-24",
  "/ai-images": "2026-02-24",
  "/easy-menu": "2026-02-24",
  "/analytics": "2026-02-24",
  "/reservations": "2026-02-24",
  "/custom-design": "2026-02-24",
  "/color-scheme": "2026-02-24",
  "/personal-support": "2026-02-24",
  "/online-orders": "2026-02-24",
  "/changelog": "2026-02-20",
};

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

const GEO_COUNTRY_COOKIE = "geo_country";
const GEO_REGION_COOKIE = "geo_region";
const GEO_CITY_COOKIE = "geo_city";
const GEO_IP_COOKIE = "geo_ip";
const GEO_UA_COOKIE = "geo_ua";
const CURRENCY_COOKIE = "currency";

const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;

/** Bot User-Agent patterns. UA itself is read from header in edge memory and
 *  NEVER persisted (GDPR). Only the derived boolean is sent to the tracking API. */
const BOT_UA_REGEX =
  /AdsBot-Google|Mediapartners-Google|Googlebot|Google-InspectionTool|GoogleOther|APIs-Google|FeedFetcher-Google|bingbot|BingPreview|YandexBot|DuckDuckBot|Baiduspider|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Discordbot|Applebot|PetalBot|SemrushBot|AhrefsBot|MJ12bot|DotBot|HeadlessChrome|PhantomJS|Screaming Frog|Sitebulb|python-requests|curl\/|wget\/|Go-http-client/i;

/** Same categorical classifier as dashboard-api's UsageController.classifyDevice.
 *  Raw UA never leaves the edge runtime — only the derived categories below
 *  (device kind + OS family) get persisted, matching what /api/usage/event
 *  already stores. Both write paths therefore produce comparable rows. */
function classifyDeviceFromUa(ua: string): {
  device: string | null;
  platform: string | null;
} {
  if (!ua) return { device: null, platform: null };
  const lower = ua.toLowerCase();
  let device: string = "desktop";
  if (/ipad|tablet|playbook|silk/.test(lower) || (/android/.test(lower) && !/mobile/.test(lower))) {
    device = "tablet";
  } else if (/mobi|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini|fennec/.test(lower)) {
    device = "mobile";
  }
  let platform: string = "other";
  if (/iphone|ipad|ipod|ios/.test(lower)) platform = "ios";
  else if (/android/.test(lower)) platform = "android";
  else if (/windows/.test(lower)) platform = "windows";
  else if (/mac os x|macintosh/.test(lower)) platform = "macos";
  else if (/linux|ubuntu|fedora|debian/.test(lower)) platform = "linux";
  return { device, platform };
}

function pickGclid(sp: URLSearchParams): string | null {
  for (const key of ["gclid", "gbraid", "wbraid"]) {
    const v = sp.get(key);
    if (v && GCLID_REGEX.test(v)) return v;
  }
  return null;
}

/** Path after locale prefix → snake_case page name. "/" → "home". */
function pageNameFromPath(pathname: string, locale: string): string {
  const prefix = `/${locale}`;
  let rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;
  if (rest.startsWith("/")) rest = rest.slice(1);
  if (!rest) return "home";
  return rest.replace(/\//g, "_").replace(/-/g, "_").toLowerCase();
}

/** Internal base URL used to call our own /api/track-landing route from the
 *  edge middleware. The Next.js edge sandbox can't loop through the public
 *  hostname back to itself (nginx → next → fetch → nginx fails inside the
 *  sandbox), so in production we have to point straight at the local Node
 *  process. Port is fixed by the `next start -p 8123` invocation on the
 *  server (see package.json scripts). */
const INTERNAL_TRACK_BASE =
  process.env.NODE_ENV === "production" ? "http://127.0.0.1:8123" : "";

/** Fire-and-forget POST to /api/track-landing. */
function fireTrackEvent(
  origin: string,
  event: string,
  country: string,
  region: string,
  ip: string | null,
  gclid: string | null,
  isBot: boolean,
  device: string | null,
  platform: string | null,
): void {
  const payload = { event, country, region, ip, gclid, isBot, device, platform };
  const base = INTERNAL_TRACK_BASE || origin;
  // No await — fire-and-forget. keepalive ensures completion post-response.
  void fetch(`${base}/api/track-landing`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((e) => {
    console.error("[track-landing] fetch error", base, e);
  });
}

/** Fire land_page_<locale>_<page> for every visit and land_google_ads when ?gclid= present. */
function trackLandingFromRequest(request: NextRequest, locale: string): void {
  // Skip RSC payload re-fetches triggered by client-side navigation.
  if (request.headers.get("RSC") === "1" || request.headers.get("Next-Router-Prefetch") === "1") return;
  if (request.method !== "GET") return;

  const origin = request.nextUrl.origin;
  const country = (request.headers.get("cf-ipcountry") || "XX").toUpperCase().slice(0, 2);
  let region = request.headers.get("cf-region") || "";
  try { region = decodeURIComponent(region); } catch { /* ignore */ }
  region = region.slice(0, 100);
  // Try every header nginx might be setting; the prod config explicitly
  // populates cf-connecting-ip = $remote_addr but a wider fallback chain
  // protects against future config drift.
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for");
  const gclid = pickGclid(request.nextUrl.searchParams);

  // UA stays in edge memory only — never sent to the tracking API or DB.
  const ua = request.headers.get("user-agent") || "";
  const isBot = BOT_UA_REGEX.test(ua);
  const { device, platform } = classifyDeviceFromUa(ua);

  const pageName = pageNameFromPath(request.nextUrl.pathname, locale);
  const pageEvent = `land_page_${locale}_${pageName}`;
  // Single event per visit. gclid (when present) is attached to the page event
  // instead of fired as a separate land_google_ads row.
  fireTrackEvent(origin, pageEvent, country, region, ip, gclid, isBot, device, platform);
}

/**
 * Получить страну: приоритет URL param ?country= > Cloudflare header
 */
function getCountry(request: NextRequest): string | null {
  const urlCountry = request.nextUrl.searchParams.get("country")?.toUpperCase();
  if (urlCountry && urlCountry.length === 2) {
    return urlCountry;
  }
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
 * Устанавливает geo cookies (страна из Cloudflare)
 * Не перезаписывает если кука уже установлена через ?country= параметр
 */
function setGeoCookies(request: NextRequest, response: NextResponse): void {
  const cfCountry = request.headers.get("cf-ipcountry");
  const region = request.headers.get("cf-region");
  const city = request.headers.get("cf-ipcity");

  // Проверяем есть ли уже кука geo_country (могла быть установлена через ?country=)
  const existingCountryCookie = request.cookies.get(GEO_COUNTRY_COOKIE)?.value;

  // Если кука есть и она отличается от Cloudflare — значит установлена вручную, не трогаем
  if (existingCountryCookie && existingCountryCookie !== cfCountry) {
    return;
  }

  if (cfCountry) {
    response.cookies.set(GEO_COUNTRY_COOKIE, cfCountry, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });

    // Валюта по стране
    const currency = getCurrencyByCountry(cfCountry);
    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  } else {
    response.cookies.set(CURRENCY_COOKIE, "EUR", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }

  if (region) {
    let decodedRegion = region;
    try {
      decodedRegion = decodeURIComponent(region);
    } catch {
      // ignore
    }
    response.cookies.set(GEO_REGION_COOKIE, decodedRegion, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }

  if (city) {
    // Cloudflare может отправлять город в URL-encoded формате
    const decodedCity = decodeURIComponent(city);
    response.cookies.set(GEO_CITY_COOKIE, decodedCity, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }

  // IP из Cloudflare или x-forwarded-for
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (ip) {
    response.cookies.set(GEO_IP_COOKIE, ip, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
    });
  }
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Per-locale custom landings replace the locale-routed main page (e.g. /en, /es).
  // Match ONLY the bare locale path so sub-routes like /en/contacts keep going through next-intl.
  const onlyLocaleMatch = pathname.match(/^\/([a-z]{2})$/);
  if (onlyLocaleMatch && (locales as readonly string[]).includes(onlyLocaleMatch[1])) {
    const response = NextResponse.next();
    response.headers.set("Last-Modified", new Date(PAGE_LAST_MODIFIED["/"]).toUTCString());
    response.headers.set("Content-Language", onlyLocaleMatch[1]);
    trackLandingFromRequest(request, onlyLocaleMatch[1]);
    return response;
  }

  // Redirect /[locale]/m/[slug](/...) → https://[slug].iq-rest.com(/...). The
  // public menu now lives on its own SPA per slug subdomain. Old code is kept
  // around for the time being but no longer serves users.
  const menuMatch = pathname.match(/^\/[a-z]{2}\/m\/([a-z0-9-]+)(\/.*)?$/);
  if (menuMatch) {
    const slug = menuMatch[1];
    const sub = menuMatch[2] || "/";
    const RESERVED_SUBDOMAINS = new Set([
      "admin", "back", "dashboard", "dashboard-api", "menu", "moneyboss",
      "my-history", "www", "mail", "support", "api", "app", "staff",
      "test", "dev", "staging", "root", "ftp",
    ]);
    if (!RESERVED_SUBDOMAINS.has(slug)) {
      const target = `https://${slug}.iq-rest.com${sub}${request.nextUrl.search}`;
      return NextResponse.redirect(target, 302);
    }
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

  // Проверяем есть ли тестовый параметр ?country=
  const testCountry = request.nextUrl.searchParams.get("country")?.toUpperCase();
  const hasTestCountry = testCountry && testCountry.length === 2;

  // Если есть тестовый параметр, редиректим на нужную локаль и ставим куки
  if (hasTestCountry) {
    const targetLocale = getLocaleByCountry(testCountry) || "en";
    const currency = getCurrencyByCountry(testCountry);

    // Убираем ?country= из URL после обработки
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete("country");

    // Определяем куда редиректить
    let targetPath: string;
    if (pathname === "/") {
      targetPath = `/${targetLocale}`;
    } else if (!localeRegex.test(pathname)) {
      targetPath = `/${targetLocale}${pathname}`;
    } else {
      // Заменяем текущую локаль на нужную
      targetPath = pathname.replace(localeRegex, `/${targetLocale}/`);
    }

    cleanUrl.pathname = targetPath;
    const response = NextResponse.redirect(cleanUrl, 302);

    // Ставим куки
    response.cookies.set(GEO_COUNTRY_COOKIE, testCountry, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  }

  // Redirect root to detected locale
  if (pathname === "/") {
    // User's chosen locale (from language selector) takes priority over geo
    const preferredLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined;
    const targetLocale = (preferredLocale && locales.includes(preferredLocale))
      ? preferredLocale
      : detectLocaleByCountry(request);
    const redirectUrl = new URL(`/${targetLocale}`, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl, 302);
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

  // Redirect /demo to demo menu
  const demoMatch = pathname.match(new RegExp(`^/(${localePattern})/demo$`));
  if (demoMatch) {
    const locale = demoMatch[1];
    const response = NextResponse.redirect(
      new URL(`/${locale}/m/love-eatery`, request.url),
      301
    );
    setGeoCookies(request, response);
    return response;
  }

  // Use next-intl middleware for locale handling
  const response = intlMiddleware(request);

  // Add pathname to headers for SSR components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  // Landing analytics: track final (post-redirect) page hit + gclid arrival.
  // Skip dashboard — internal user area, not part of marketing funnel.
  const localeMatchForTrack = pathname.match(localeRegex);
  if (localeMatchForTrack) {
    const trackedLocale = localeMatchForTrack[1];
    const isDashboard = pathname.startsWith(`/${trackedLocale}/dashboard`);
    if (!isDashboard) {
      trackLandingFromRequest(request, trackedLocale);
    }
  }

  // Set Last-Modified for marketing pages
  const pagePath = pathname.replace(localeRegex, "/");
  const lastModified = PAGE_LAST_MODIFIED[pagePath];
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

  // Set session cookie for menu pages (no maxAge = session cookie, dies when browser closes)
  if (pathname.match(new RegExp(`^/(${localePattern})/m/`))) {
    if (!request.cookies.get("sqr_session_id")?.value) {
      const sessionId = crypto.randomUUID();
      response.cookies.set("sqr_session_id", sessionId, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_vercel|m/|.*\\..*).*)",
  ],
};
