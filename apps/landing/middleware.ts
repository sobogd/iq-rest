import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session");

  // Redirect logged-in users from get-started to dashboard
  if (session && pathname.match(/^\/(en|es)\/get-started/)) {
    const locale = pathname.startsWith("/es") ? "es" : "en";
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  const response = intlMiddleware(request);

  // Add pathname to headers for SSR components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
