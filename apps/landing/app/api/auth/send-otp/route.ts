import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { validateEmail } from "@/lib/validate-email";
import { generateOTP, hashOTP, OTP_EXPIRY_MS } from "@/lib/session-utils";

// Default company names by locale
const defaultCompanyNames: Record<string, string> = {
  en: "My Company",
  es: "Mi Empresa",
};

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

// In-memory rate limiter for OTP sending (per email)
const sendAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // max 5 OTP sends per 15 minutes per email

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = sendAttempts.get(email);

  if (!entry || now > entry.resetAt) {
    sendAttempts.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const { email, locale = "en", turnstileToken } = await request.json();

    // Verify Turnstile token
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Verification required" },
          { status: 403 }
        );
      }

      const isValid = await verifyTurnstileToken(turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: "Verification failed" },
          { status: 403 }
        );
      }
    }

    // Strict email validation
    const normalizedEmail = validateEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Rate limiting per email
    if (isRateLimited(normalizedEmail)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Generate secure 6-digit OTP
    const otpCode = generateOTP();
    const otpHash = hashOTP(otpCode);
    const otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    let isNewUser = false;

    if (user) {
      // Existing user: store OTP hash
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          otp: otpHash,
          otpExpiresAt,
          otpAttempts: 0,
        },
      });
    } else {
      // New user: create account + company, store OTP hash (require verification!)
      isNewUser = true;

      const cookieStore = await cookies();
      const pendingCompanyId = cookieStore.get("pending_company_id")?.value;

      let company;

      if (pendingCompanyId) {
        // Check if a scanned company exists with no users (orphan from AI scanner)
        const pendingCompany = await prisma.company.findFirst({
          where: { id: pendingCompanyId, users: { none: {} } },
        });

        if (pendingCompany) {
          company = pendingCompany;
          cookieStore.set("pending_company_id", "", { maxAge: 0, path: "/" });
        }
      }

      if (!company) {
        const companyName =
          defaultCompanyNames[locale] || defaultCompanyNames.en;
        company = await prisma.company.create({
          data: {
            name: companyName,
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          },
        });
      }

      // Create user WITH OTP — always require verification
      // Use try/catch to handle race condition (concurrent requests for same email)
      try {
        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            otp: otpHash,
            otpExpiresAt,
            otpAttempts: 0,
          },
        });
      } catch (err: unknown) {
        // Unique constraint violation — user was created by a concurrent request
        if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
          const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });
          if (!existingUser) {
            return NextResponse.json(
              { error: "Failed to send OTP" },
              { status: 500 }
            );
          }
          user = await prisma.user.update({
            where: { email: normalizedEmail },
            data: { otp: otpHash, otpExpiresAt, otpAttempts: 0 },
          });
          // Skip company creation — the concurrent request already created it
          isNewUser = false;
        } else {
          throw err;
        }
      }

      // Link user to company (only for truly new users)
      if (isNewUser) {
        await prisma.userCompany.create({
          data: {
            userId: user.id,
            companyId: company.id,
            role: "owner",
          },
        });
      }

    }

    // Send OTP email (always — no auto-login bypass)
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
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
              ${t.greeting}
            </p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px;">
              ${t.welcome}
            </p>
            <div style="margin: 24px 0; padding: 24px; background-color: #f5f5f5; border-radius: 12px; text-align: center;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1a1a1a;">
                ${otpCode}
              </span>
            </div>
            <p style="font-size: 14px; color: #666; margin: 0 0 24px; text-align: center;">
              ${t.expiry}
            </p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
              ${t.instructions}
            </p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
              ${t.helpOffer}
            </p>
            <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
              <a href="https://iq-rest.com/login?from=email" style="color: #0066cc;">${t.cta}</a>
            </p>
            <p style="font-size: 15px; margin: 0 0 20px; color: #1a1a1a;">
              ${t.signature}
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">
            <p style="color: #999; font-size: 13px; margin: 0;">
              ${t.ignore}
            </p>
          </div>
        `,
        text: `${t.greeting}\n\n${t.welcome}\n\n${otpCode}\n\n${t.expiry}\n\n${t.instructions}\n\n${t.helpOffer}\n\n${t.cta}: https://iq-rest.com/login?from=email\n\n${t.signature.replace("<br>", "\n")}\n\n---\n${t.ignore}`,
      });
    } catch (emailErr) {
      console.error("Failed to send OTP email:", emailErr);
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully", isNewUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
