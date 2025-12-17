import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// Default company names by locale
const defaultCompanyNames: Record<string, string> = {
  en: "My Company",
  es: "Mi Empresa",
};

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
      // Create new user with company
      const companyName = defaultCompanyNames[locale] || defaultCompanyNames.en;

      // Create company first
      const company = await prisma.company.create({
        data: {
          name: companyName,
        },
      });

      // Create user with OTP
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          otp: otpCode,
          otpExpiresAt,
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
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: `Your GrandQR verification code: ${otpCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            Your Verification Code
          </h2>
          <div style="margin: 20px 0; text-align: center;">
            <p style="font-size: 16px; color: #666;">
              Enter this code to sign in to GrandQR:
            </p>
            <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
              <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #333;">
                ${otpCode}
              </span>
            </div>
            <p style="font-size: 14px; color: #999;">
              This code will expire in 10 minutes.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            If you didn't request this code, you can safely ignore this email.
          </p>
        </div>
      `,
      text: `
Your GrandQR Verification Code

Enter this code to sign in: ${otpCode}

This code will expire in 10 minutes.

If you didn't request this code, you can safely ignore this email.
      `,
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
