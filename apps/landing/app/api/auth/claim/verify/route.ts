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

// In-memory rate limiter for OTP verification (per userId)
const verifyAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // max 10 requests per window

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = verifyAttempts.get(key);
  if (!entry || now > entry.resetAt) {
    verifyAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getUserWithCompany();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit by userId
    if (isRateLimited(auth.userId)) {
      return NextResponse.json({ error: "TOO_MANY_ATTEMPTS" }, { status: 429 });
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
