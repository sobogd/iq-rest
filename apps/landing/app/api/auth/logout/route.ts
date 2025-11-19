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

  // Redirect to home page with locale
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL(`/${locale}`, baseUrl));
}
