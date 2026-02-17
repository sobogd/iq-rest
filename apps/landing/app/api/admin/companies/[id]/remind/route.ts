import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface ReminderEmailTranslations {
  subject: string;
  greeting: string;
  body: string;
  stepsIntro: string;
  step1: string;
  step2: string;
  step3: string;
  timeNote: string;
  helpOffer: string;
  helpAction: string;
  cta: string;
  signature: string;
  subjectNotOnboarded: string;
  bodyNotOnboarded: string;
  helpOfferNotOnboarded: string;
}

async function getTranslations(locale: string): Promise<ReminderEmailTranslations> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.reminderEmail;
  } catch {
    // Fallback to English
    const messages = await import(`@/messages/en.json`);
    return messages.reminderEmail;
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: companyId } = await params;

    // Get company with users, restaurant, and onboarding step
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        users: {
          include: {
            user: {
              select: { email: true },
            },
          },
        },
        restaurants: {
          select: { title: true, defaultLanguage: true },
          take: 1,
        },
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const ownerEmail = company.users[0]?.user?.email;
    if (!ownerEmail) {
      return NextResponse.json({ error: "No user email found" }, { status: 400 });
    }

    const restaurant = company.restaurants[0];
    const locale = restaurant?.defaultLanguage || "en";
    const isOnboarded = company.onboardingStep >= 2;

    // Get translations for the user's language
    const t = await getTranslations(locale);

    // Choose texts based on onboarding status
    const subject = isOnboarded ? t.subject : t.subjectNotOnboarded;
    const body = isOnboarded ? t.body : t.bodyNotOnboarded;
    const helpOffer = isOnboarded ? t.helpOffer : t.helpOfferNotOnboarded;

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

    // Build email based on onboarding status
    const htmlContent = isOnboarded
      ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.greeting}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px;">
            ${body}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 8px; font-weight: 600;">
            ${t.stepsIntro}
          </p>

          <ol style="font-size: 17px; line-height: 1.7; margin: 0 0 16px; padding-left: 24px;">
            <li style="margin-bottom: 8px;">${t.step1}</li>
            <li style="margin-bottom: 8px;">${t.step2}</li>
            <li>${t.step3}</li>
          </ol>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.timeNote}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 12px;">
            ${helpOffer}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.helpAction}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
            <a href="https://iq-rest.com/dashboard" style="color: #0066cc;">${t.cta}</a>
          </p>

          <p style="font-size: 15px; margin: 0; color: #1a1a1a;">
            ${t.signature}
          </p>

        </div>
      `
      : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.greeting}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${body}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 12px;">
            ${helpOffer}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.helpAction}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
            <a href="https://iq-rest.com/dashboard" style="color: #0066cc;">${t.cta}</a>
          </p>

          <p style="font-size: 15px; margin: 0; color: #1a1a1a;">
            ${t.signature}
          </p>

        </div>
      `;

    const textContent = isOnboarded
      ? `${t.greeting}\n\n${body}\n\n${t.stepsIntro}\n1. ${t.step1}\n2. ${t.step2}\n3. ${t.step3}\n\n${t.timeNote}\n\n${helpOffer}\n${t.helpAction}\n\n${t.cta}: https://iq-rest.com/dashboard\n\n${t.signature}`
      : `${t.greeting}\n\n${body}\n\n${helpOffer}\n${t.helpAction}\n\n${t.cta}: https://iq-rest.com/dashboard\n\n${t.signature}`;

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: ownerEmail,
      subject,
      html: htmlContent,
      text: textContent,
    };

    await transporter.sendMail(mailOptions);

    // Update reminderSentAt timestamp
    await prisma.company.update({
      where: { id: companyId },
      data: { reminderSentAt: new Date() },
    });

    return NextResponse.json({ success: true, sentTo: ownerEmail });
  } catch (error) {
    console.error("Error sending reminder:", error);
    return NextResponse.json(
      { error: "Failed to send reminder" },
      { status: 500 }
    );
  }
}
