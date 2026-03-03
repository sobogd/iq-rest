import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { validateEmail } from "@/lib/validate-email";
import {
  generateSessionToken,
  hashSessionToken,
  hashOTP,
  safeCompare,
  MAX_OTP_ATTEMPTS,
  AUTH_COOKIE_OPTIONS,
} from "@/lib/session-utils";

// In-memory rate limiter for OTP verification (per email)
const verifyAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // max 10 requests per window

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = verifyAttempts.get(email);

  if (!entry || now > entry.resetAt) {
    verifyAttempts.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Strict email validation
    const normalizedEmail = validateEmail(email);
    if (!normalizedEmail || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    // Rate limiting per email
    if (isRateLimited(normalizedEmail)) {
      return NextResponse.json(
        { error: "TOO_MANY_ATTEMPTS" },
        { status: 429 }
      );
    }

    // Find user with OTP
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Check if user exists and has a pending OTP
    if (!user || !user.otp || !user.otpExpiresAt) {
      return NextResponse.json(
        { error: "INVALID_CODE" },
        { status: 400 }
      );
    }

    // Check if too many failed attempts (DB-level protection)
    if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
      // Clear OTP — user must request a new one
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { otp: null, otpExpiresAt: null, otpAttempts: 0 },
      });

      return NextResponse.json(
        { error: "TOO_MANY_ATTEMPTS" },
        { status: 429 }
      );
    }

    // Check if OTP is expired
    if (user.otpExpiresAt < new Date()) {
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { otp: null, otpExpiresAt: null, otpAttempts: 0 },
      });

      return NextResponse.json(
        { error: "INVALID_CODE" },
        { status: 400 }
      );
    }

    // Verify OTP (constant-time comparison of hashes)
    const codeHash = hashOTP(code);
    if (!safeCompare(user.otp, codeHash)) {
      // Increment failed attempts
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { otpAttempts: { increment: 1 } },
      });

      return NextResponse.json(
        { error: "INVALID_CODE" },
        { status: 400 }
      );
    }

    // OTP is valid — generate session token and save hash to DB
    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);

    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        otp: null,
        otpExpiresAt: null,
        otpAttempts: 0,
        sessionToken: tokenHash,
      },
    });

    // Set session cookies
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_email", normalizedEmail, AUTH_COOKIE_OPTIONS);
    cookieStore.set("user_id", user.id, AUTH_COOKIE_OPTIONS);

    // Get onboarding step for redirect hint
    const userCompany = await prisma.userCompany.findFirst({
      where: { userId: user.id },
      include: { company: { select: { onboardingStep: true } } },
    });

    const onboardingStep = userCompany?.company.onboardingStep ?? 0;

    return NextResponse.json(
      {
        message: "Authentication successful",
        email: normalizedEmail,
        userId: user.id,
        onboardingStep,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify code" },
      { status: 500 }
    );
  }
}
