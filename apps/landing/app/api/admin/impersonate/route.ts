import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const currentEmail = cookieStore.get("user_email")?.value;
    const currentSession = cookieStore.get("session")?.value;
    const currentUserId = cookieStore.get("user_id")?.value;

    if (!isAdminEmail(currentEmail) || !currentSession || !currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Look up target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        companies: { include: { company: true }, take: 1 },
      },
    });

    if (!targetUser || !targetUser.companies[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Save current admin cookies
    cookieStore.set("admin_original_session", currentSession, COOKIE_OPTIONS);
    cookieStore.set("admin_original_email", currentEmail!, COOKIE_OPTIONS);
    cookieStore.set("admin_original_id", currentUserId, COOKIE_OPTIONS);

    // Overwrite auth cookies with target user
    const newSession = generateSessionToken();
    cookieStore.set("session", newSession, COOKIE_OPTIONS);
    cookieStore.set("user_email", targetUser.email, COOKIE_OPTIONS);
    cookieStore.set("user_id", targetUser.id, COOKIE_OPTIONS);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Impersonate error:", error);
    return NextResponse.json(
      { error: "Failed to impersonate" },
      { status: 500 }
    );
  }
}
