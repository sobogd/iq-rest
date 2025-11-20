import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  // Get locale from form data
  const formData = await request.formData();
  const locale = formData.get("locale") || "en";

  // Clear all auth cookies
  cookieStore.delete("session");
  cookieStore.delete("user_email");
  cookieStore.delete("user_id");

  // Get the origin from request headers
  const origin = request.headers.get("origin") || request.nextUrl.origin;

  // Redirect to home page with locale
  return NextResponse.redirect(new URL(`/${locale}`, origin));
}
