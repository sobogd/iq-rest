import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales, Locale } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Парсит Accept-Language заголовок и возвращает лучший подходящий язык
 */
function getLocaleFromAcceptLanguage(
  acceptLanguage: string | null
): Locale | null {
  if (!acceptLanguage) return null;

  const localeSet = new Set<string>(locales);

  const parsed = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
      return { lang: lang.trim(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parsed) {
    const shortLang = lang.split("-")[0].toLowerCase();
    if (localeSet.has(shortLang)) {
      return shortLang as Locale;
    }
  }

  return null;
}

/**
 * Определяет язык пользователя по приоритету:
 * 1. Сохранённый выбор в cookie
 * 2. Accept-Language заголовок браузера
 * 3. Язык по умолчанию (en)
 */
function detectUserLocale(request: NextRequest): Locale {
  // 1. Проверяем cookie с сохранённым выбором - читаем из заголовка напрямую
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/NEXT_LOCALE=([^;]+)/);
  const savedLocale = match ? match[1] : null;

  if (savedLocale && (locales as readonly string[]).includes(savedLocale)) {
    return savedLocale as Locale;
  }

  // 2. Парсим Accept-Language заголовок
  const acceptLanguage = request.headers.get("accept-language");
  const detectedLocale = getLocaleFromAcceptLanguage(acceptLanguage);
  if (detectedLocale) {
    return detectedLocale;
  }

  // 3. Fallback на язык по умолчанию
  return "en";
}

/**
 * Устанавливает cookie локали в response
 */
function setLocaleCookie(response: NextResponse, locale: string): NextResponse {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return response;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to detected locale
  if (pathname === "/") {
    const targetLocale = detectUserLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${targetLocale}`, request.url),
      302
    );
    return setLocaleCookie(response, targetLocale);
  }

  // Redirect paths without locale prefix
  if (!localeRegex.test(pathname)) {
    const targetLocale = detectUserLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${targetLocale}${pathname}`, request.url),
      302
    );
    return setLocaleCookie(response, targetLocale);
  }

  // Redirect /demo to demo menu
  const demoMatch = pathname.match(new RegExp(`^/(${localePattern})/demo$`));
  if (demoMatch) {
    const locale = demoMatch[1];
    return NextResponse.redirect(
      new URL(`/${locale}/m/love-eatery`, request.url),
      301
    );
  }

  // Use next-intl middleware for locale handling
  const response = intlMiddleware(request);

  // Add pathname to headers for SSR components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|_vercel|m/|.*\\..*).*)",
  ],
};
