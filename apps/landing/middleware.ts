import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";
import { getLocaleByCountry } from "./lib/country-locale-map";

const intlMiddleware = createMiddleware(routing);

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

const GEO_COUNTRY_COOKIE = "geo_country";
const GEO_CITY_COOKIE = "geo_city";

/**
 * Определяет язык по стране из Cloudflare
 * Fallback на английский если страна не определена
 */
function detectLocaleByCountry(request: NextRequest): Locale {
  const country = request.headers.get("cf-ipcountry");

  if (country) {
    const locale = getLocaleByCountry(country);
    if (locale) {
      return locale;
    }
  }

  return "en";
}

/**
 * Устанавливает geo cookies из заголовков Cloudflare
 */
function setGeoCookies(request: NextRequest, response: NextResponse): void {
  const country = request.headers.get("cf-ipcountry");
  const city = request.headers.get("cf-ipcity");

  if (country) {
    response.cookies.set(GEO_COUNTRY_COOKIE, country, {
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
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to detected locale
  if (pathname === "/") {
    const targetLocale = detectLocaleByCountry(request);
    const redirectUrl = new URL(`/${targetLocale}`, request.url);
    redirectUrl.search = request.nextUrl.search;
    const response = NextResponse.redirect(redirectUrl, 302);
    setGeoCookies(request, response);
    return response;
  }

  // Redirect paths without locale prefix
  if (!localeRegex.test(pathname)) {
    const targetLocale = detectLocaleByCountry(request);
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
