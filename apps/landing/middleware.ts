import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";
import { getLocaleByCountry } from "./lib/country-locale-map";
import { getCurrencyByCountry } from "./lib/country-currency-map";

const intlMiddleware = createMiddleware(routing);

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

const GEO_COUNTRY_COOKIE = "geo_country";
const GEO_CITY_COOKIE = "geo_city";
const GEO_IP_COOKIE = "geo_ip";
const GEO_UA_COOKIE = "geo_ua";
const CURRENCY_COOKIE = "currency";

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

  if (country) {
    const locale = getLocaleByCountry(country);
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

  // Set geo cookies from Cloudflare headers
  setGeoCookies(request, response);

  // Set session cookie for menu pages (no maxAge = session cookie, dies when browser closes)
  if (pathname.match(new RegExp(`^/(${localePattern})/m/`))) {
    if (!request.cookies.get("sqr_session_id")?.value) {
      const sessionId = crypto.randomUUID();
      response.cookies.set("sqr_session_id", sessionId, {
        path: "/",
        httpOnly: true,
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
