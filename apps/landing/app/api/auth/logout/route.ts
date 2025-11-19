import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Clear all auth cookies
  cookieStore.delete("session");
  cookieStore.delete("user_email");
  cookieStore.delete("user_id");

  // Redirect to home page
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
