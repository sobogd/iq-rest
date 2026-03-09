import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";
import { isAnonymousEmail } from "@/lib/anonymous";
import { validateEmail } from "@/lib/validate-email";
import {
  generateSessionToken,
  hashSessionToken,
  hashOTP,
  safeCompare,
  MAX_OTP_ATTEMPTS,
  AUTH_COOKIE_OPTIONS,
} from "@/lib/session-utils";

export async function POST(request: NextRequest) {
  try {
    const auth = await getUserWithCompany();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, code } = await request.json();

    const normalizedEmail = validateEmail(email);
    if (!normalizedEmail || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    // Verify this is an anonymous user
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
    });

    if (!user || !isAnonymousEmail(user.email)) {
      return NextResponse.json({ error: "Not an anonymous account" }, { status: 403 });
    }

    // Check OTP exists
    if (!user.otp || !user.otpExpiresAt) {
      return NextResponse.json({ error: "INVALID_CODE" }, { status: 400 });
    }

    // Check attempts
    if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null, otpAttempts: 0 },
      });
      return NextResponse.json({ error: "TOO_MANY_ATTEMPTS" }, { status: 429 });
    }

    // Check expiry
    if (user.otpExpiresAt < new Date()) {
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiresAt: null, otpAttempts: 0 },
      });
      return NextResponse.json({ error: "INVALID_CODE" }, { status: 400 });
    }

    // Verify OTP
    const codeHash = hashOTP(code);
    if (!safeCompare(user.otp, codeHash)) {
      await prisma.user.update({
        where: { id: user.id },
        data: { otpAttempts: { increment: 1 } },
      });
      return NextResponse.json({ error: "INVALID_CODE" }, { status: 400 });
    }

    // Check email not taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser && existingUser.id !== user.id) {
      return NextResponse.json({ error: "email_taken" }, { status: 409 });
    }

    // OTP valid — update email and session
    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: normalizedEmail,
        otp: null,
        otpExpiresAt: null,
        otpAttempts: 0,
        sessionToken: tokenHash,
      },
    });

    // Set new cookies
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_email", normalizedEmail, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_id", user.id, AUTH_COOKIE_OPTIONS);

    return NextResponse.json({ ok: true, email: normalizedEmail });
  } catch (error) {
    console.error("Error in claim verify:", error);
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }
}
