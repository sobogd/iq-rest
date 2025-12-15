import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function handleLogout(request: NextRequest) {
  const cookieStore = await cookies();

  // Clear all auth cookies
  cookieStore.delete("session");
  cookieStore.delete("user_email");
  cookieStore.delete("user_id");
  cookieStore.delete("dashboard-active-page");
  cookieStore.delete("sidebar_state");

  // Get the origin from host header (works correctly behind reverse proxy)
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const origin = `${protocol}://${host}`;

  // Get locale from referer or default to en
  const referer = request.headers.get("referer") || "";
  const locale = referer.includes("/es/") ? "es" : "en";

  // Redirect to home page with locale
  return NextResponse.redirect(new URL(`/${locale}`, origin));
}

export async function GET(request: NextRequest) {
  return handleLogout(request);
}

export async function POST(request: NextRequest) {
  return handleLogout(request);
}
