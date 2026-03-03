import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  generateSessionToken,
  hashSessionToken,
  AUTH_COOKIE_OPTIONS,
} from "@/lib/session-utils";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const originalEmail = cookieStore.get("admin_original_email")?.value;
    const originalId = cookieStore.get("admin_original_id")?.value;

    if (!originalEmail || !originalId) {
      return NextResponse.json(
        { error: "No impersonation session found" },
        { status: 400 }
      );
    }

    // Generate a fresh session token for admin and save hash
    const freshSession = generateSessionToken();
    const tokenHash = hashSessionToken(freshSession);

    await prisma.user.update({
      where: { id: originalId },
      data: { sessionToken: tokenHash },
    });

    // Set admin cookies with fresh session
    cookieStore.set("session", freshSession, AUTH_COOKIE_OPTIONS);
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
