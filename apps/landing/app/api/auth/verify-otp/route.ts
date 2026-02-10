import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Simple session token generator
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and code are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Find user with OTP
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpiresAt) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (user.otpExpiresAt < new Date()) {
      // Clear expired OTP
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          otp: null,
          otpExpiresAt: null,
        },
      });

      return NextResponse.json(
        { error: "Code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== code) {
      return NextResponse.json(
        { error: "Invalid code" },
        { status: 400 }
      );
    }

    // OTP is valid - clear it
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        otp: null,
        otpExpiresAt: null,
      },
    });

    // Generate session token
    const sessionToken = generateSessionToken();

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Store user email in a separate cookie for display purposes
    cookieStore.set("user_email", normalizedEmail, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Store user ID in cookie
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Check if user is new (created within last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const isNewUser = user.createdAt > fifteenMinutesAgo;

    return NextResponse.json(
      {
        message: "Authentication successful",
        email: normalizedEmail,
        userId: user.id,
        isNewUser,
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
