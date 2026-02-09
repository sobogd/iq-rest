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
 * Пример заголовка: "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
 */
function getLocaleFromAcceptLanguage(
  acceptLanguage: string | null
): Locale | null {
  if (!acceptLanguage) return null;

  const localeSet = new Set<string>(locales);

  // Парсим заголовок и сортируем по качеству (q)
  const parsed = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
      return { lang: lang.trim(), q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parsed) {
    // Сначала проверяем точное совпадение (например "en-US" → "en")
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
  // 1. Проверяем cookie с сохранённым выбором
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (savedLocale && locales.includes(savedLocale as Locale)) {
    return savedLocale as Locale;
  }

  // 2. Парсим Accept-Language заголовок
  const acceptLanguage = request.headers.get("accept-language");
  const detectedLocale = getLocaleFromAcceptLanguage(acceptLanguage);
  if (detectedLocale) {
    return detectedLocale;
  }

  // 3. Fallback на язык по умолчанию
  return routing.defaultLocale;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permanent redirect for paths without locale prefix
  if (!localeRegex.test(pathname) && pathname !== "/") {
    const targetLocale = detectUserLocale(request);
    return NextResponse.redirect(
      new URL(`/${targetLocale}${pathname}`, request.url),
      307
    );
  }

  // Redirect root to detected locale
  if (pathname === "/") {
    const targetLocale = detectUserLocale(request);
    return NextResponse.redirect(new URL(`/${targetLocale}`, request.url), 307);
  }

  // Redirect /demo to demo menu (extract locale from path)
  const demoMatch = pathname.match(new RegExp(`^/(${localePattern})/demo$`));
  if (demoMatch) {
    const locale = demoMatch[1];
    return NextResponse.redirect(new URL(`/${locale}/m/love-eatery`, request.url), 301);
  }

  const response = intlMiddleware(request);

  // Add pathname to headers for SSR components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|m/|.*\\..*).*)"],
};
