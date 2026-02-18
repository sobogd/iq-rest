import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};

export async function POST() {
  try {
    const cookieStore = await cookies();
    const originalSession = cookieStore.get("admin_original_session")?.value;
    const originalEmail = cookieStore.get("admin_original_email")?.value;
    const originalId = cookieStore.get("admin_original_id")?.value;

    if (!originalSession || !originalEmail || !originalId) {
      return NextResponse.json(
        { error: "No impersonation session found" },
        { status: 400 }
      );
    }

    // Restore admin cookies
    cookieStore.set("session", originalSession, COOKIE_OPTIONS);
    cookieStore.set("user_email", originalEmail, COOKIE_OPTIONS);
    cookieStore.set("user_id", originalId, COOKIE_OPTIONS);

    // Delete admin_original_* cookies
    cookieStore.delete("admin_original_session");
    cookieStore.delete("admin_original_email");
    cookieStore.delete("admin_original_id");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Exit impersonation error:", error);
    return NextResponse.json(
      { error: "Failed to exit impersonation" },
      { status: 500 }
    );
  }
}
