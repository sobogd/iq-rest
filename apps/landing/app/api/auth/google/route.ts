import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = "576149678945-vjqlc4sce6bsne3p0n63bqdvf33k43s0.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { error: "Missing credential" },
        { status: 400 }
      );
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return NextResponse.json(
        { error: "Invalid Google token" },
        { status: 400 }
      );
    }

    const normalizedEmail = payload.email.trim().toLowerCase();
    const displayName = payload.name || normalizedEmail.split("@")[0];

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;

      // Create user + company in a transaction
      const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: { email: normalizedEmail },
        });

        const company = await tx.company.create({
          data: { name: displayName, onboardingStep: 0 },
        });

        await tx.userCompany.create({
          data: {
            userId: newUser.id,
            companyId: company.id,
            role: "owner",
          },
        });

        return newUser;
      });

      user = result;
    }

    // Generate session token
    const sessionToken = generateSessionToken();

    // Set session cookies
    const cookieStore = await cookies();
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    };

    cookieStore.set("session", sessionToken, cookieOptions);
    cookieStore.set("user_email", normalizedEmail, cookieOptions);
    cookieStore.set("user_id", user.id, cookieOptions);

    // Get onboarding step
    const userCompany = await prisma.userCompany.findFirst({
      where: { userId: user.id },
      include: { company: { select: { onboardingStep: true } } },
    });

    const onboardingStep = userCompany?.company.onboardingStep ?? 0;

    return NextResponse.json({
      email: normalizedEmail,
      userId: user.id,
      isNewUser,
      onboardingStep,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
