import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import {
  hashSessionToken,
  AUTH_COOKIE_OPTIONS,
} from "@/lib/session-utils";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const currentEmail = cookieStore.get("user_email")?.value;
    const currentSession = cookieStore.get("session")?.value;
    const currentUserId = cookieStore.get("user_id")?.value;

    if (!isAdminEmail(currentEmail) || !currentSession || !currentUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Validate admin session against DB
    const adminUser = await prisma.user.findUnique({
      where: { email: currentEmail! },
    });
    const adminTokenHash = hashSessionToken(currentSession);
    if (!adminUser || adminUser.sessionToken !== adminTokenHash) {
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

    // Save admin session so we can validate impersonation in getAuthUser()
    cookieStore.set(
      "admin_original_session",
      currentSession,
      AUTH_COOKIE_OPTIONS
    );
    cookieStore.set(
      "admin_original_email",
      currentEmail!,
      AUTH_COOKIE_OPTIONS
    );
    cookieStore.set("admin_original_id", currentUserId, AUTH_COOKIE_OPTIONS);

    // Switch to target user WITHOUT touching their sessionToken
    cookieStore.set("user_email", targetUser.email, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_id", targetUser.id, AUTH_COOKIE_OPTIONS);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Impersonate error:", error);
    return NextResponse.json(
      { error: "Failed to impersonate" },
      { status: 500 }
    );
  }
}
