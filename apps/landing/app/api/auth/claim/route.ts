import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { validateEmail } from "@/lib/validate-email";
import { isAnonymousEmail } from "@/lib/anonymous";
import { generateOTP, hashOTP, OTP_EXPIRY_MS } from "@/lib/session-utils";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

interface OtpEmailTranslations {
  subject: string;
  greeting: string;
  welcome: string;
  instructions: string;
  helpOffer: string;
  cta: string;
  signature: string;
  expiry: string;
  ignore: string;
}

async function getTranslations(locale: string): Promise<OtpEmailTranslations> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.otpEmail;
  } catch {
    const messages = await import(`@/messages/en.json`);
    return messages.otpEmail;
  }
}

// Rate limiter
const sendAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = sendAttempts.get(key);
  if (!entry || now > entry.resetAt) {
    sendAttempts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
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

    // Verify this is an anonymous user
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { email: true },
    });

    if (!user || !isAnonymousEmail(user.email)) {
      return NextResponse.json({ error: "Not an anonymous account" }, { status: 403 });
    }

    const { email, locale = "en", turnstileToken } = await request.json();

    // Verify Turnstile
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json({ error: "Verification required" }, { status: 403 });
      }
      const isValid = await verifyTurnstileToken(turnstileToken);
      if (!isValid) {
        return NextResponse.json({ error: "Verification failed" }, { status: 403 });
      }
    }

    // Validate email
    const normalizedEmail = validateEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Rate limit
    if (isRateLimited(auth.userId)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser && existingUser.id !== auth.userId) {
      return NextResponse.json({ error: "email_taken" }, { status: 409 });
    }

    // Generate OTP
    const otpCode = generateOTP();
    const otpHash = hashOTP(otpCode);
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    await prisma.user.update({
      where: { id: auth.userId },
      data: { otp: otpHash, otpExpiresAt, otpAttempts: 0 },
    });

    // Send OTP email
    const transporter = createTransporter();
    const t = await getTranslations(locale);
    const subject = t.subject.replace("{code}", otpCode);

    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: normalizedEmail,
        subject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.greeting}</p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px;">${t.welcome}</p>
            <div style="margin: 24px 0; padding: 24px; background-color: #f5f5f5; border-radius: 12px; text-align: center;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1a1a1a;">${otpCode}</span>
            </div>
            <p style="font-size: 14px; color: #666; margin: 0 0 24px; text-align: center;">${t.expiry}</p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.instructions}</p>
            <p style="font-size: 15px; margin: 0 0 20px; color: #1a1a1a;">${t.signature}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">
            <p style="color: #999; font-size: 13px; margin: 0;">${t.ignore}</p>
          </div>
        `,
        text: `${t.greeting}\n\n${t.welcome}\n\n${otpCode}\n\n${t.expiry}\n\n${t.instructions}\n\n${t.signature.replace("<br>", "\n")}\n\n---\n${t.ignore}`,
      });
    } catch (emailErr) {
      console.error("Failed to send claim OTP email:", emailErr);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in claim:", error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
