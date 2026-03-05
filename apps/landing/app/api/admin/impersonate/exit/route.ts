import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_OPTIONS } from "@/lib/session-utils";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const originalSession = cookieStore.get("admin_original_session")?.value;
    const originalEmail = cookieStore.get("admin_original_email")?.value;
    const originalId = cookieStore.get("admin_original_id")?.value;

    if (!originalEmail || !originalId || !originalSession) {
      return NextResponse.json(
        { error: "No impersonation session found" },
        { status: 400 }
      );
    }

    // Restore admin cookies (session token unchanged in DB)
    cookieStore.set("session", originalSession, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_email", originalEmail, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_id", originalId, AUTH_COOKIE_OPTIONS);

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
