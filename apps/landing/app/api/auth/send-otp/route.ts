import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Simple session token generator
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

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

export async function POST(request: NextRequest) {
  try {
    const { email, locale = "en" } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if iCloud email
    const emailDomain = normalizedEmail.split("@")[1];
    const isICloudEmail = ["icloud.com", "me.com", "mac.com"].includes(emailDomain);

    // Generate 4-digit OTP code
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user) {
      // Update existing user with new OTP
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: {
          otp: otpCode,
          otpExpiresAt,
        },
      });
    } else {
      // NEW USER - auto-login without OTP verification
      const companyName = defaultCompanyNames[locale] || defaultCompanyNames.en;

      // Create company first
      const company = await prisma.company.create({
        data: {
          name: companyName,
        },
      });

      // Create user WITHOUT OTP (no verification needed for new users)
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
        },
      });

      // Link user to company
      await prisma.userCompany.create({
        data: {
          userId: user.id,
          companyId: company.id,
          role: "owner",
        },
      });

      // Auto-login: set session cookies
      const sessionToken = generateSessionToken();
      const cookieStore = await cookies();

      cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      cookieStore.set("user_email", normalizedEmail, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      cookieStore.set("user_id", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      // Return auto-login response (skip OTP step)
      return NextResponse.json(
        {
          autoLogin: true,
          isNewUser: true,
          userId: user.id,
          email: normalizedEmail,
        },
        { status: 200 }
      );
    }

    // Create transporter - use different SMTP for iCloud emails
    const smtpConfig = isICloudEmail
      ? {
          host: process.env.ICLOUD_SMTP_HOST,
          port: Number(process.env.ICLOUD_SMTP_PORT),
          auth: {
            user: process.env.ICLOUD_SMTP_USER,
            pass: process.env.ICLOUD_SMTP_PASS,
          },
          fromEmail: process.env.ICLOUD_FROM_EMAIL,
        }
      : {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          fromEmail: process.env.FROM_EMAIL,
        };

    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: false,
      auth: smtpConfig.auth,
    });

    // Get translations for the user's locale
    const t = await getTranslations(locale);
    const subject = t.subject.replace("{code}", otpCode);

    // Email content
    const mailOptions = {
      from: smtpConfig.fromEmail,
      to: email,
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
            <a href="https://iq-rest.com/dashboard" style="color: #0066cc;">${t.cta}</a>
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
      text: `${t.greeting}

${t.welcome}

${otpCode}

${t.expiry}

${t.instructions}

${t.helpOffer}

${t.cta}: https://iq-rest.com/dashboard

${t.signature.replace("<br>", "\n")}

---
${t.ignore}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "OTP sent successfully" },
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
