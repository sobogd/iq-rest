import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing, locales } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Create regex pattern for all locales
const localePattern = locales.join("|");
const localeRegex = new RegExp(`^/(${localePattern})(/|$)`);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permanent redirect for paths without locale prefix
  if (!localeRegex.test(pathname) && pathname !== "/") {
    return NextResponse.redirect(new URL(`/en${pathname}`, request.url), 301);
  }

  // Redirect root to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url), 301);
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
