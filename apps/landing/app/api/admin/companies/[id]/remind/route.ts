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
  step1: string;
  step2: string;
  step3: string;
  helpOffer: string;
  helpAction: string;
  cta: string;
  signature: string;
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

    // Get company with users and restaurant
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
    const restaurantName = restaurant?.title || "your restaurant";
    const locale = restaurant?.defaultLanguage || "en";

    // Get translations for the user's language
    const t = await getTranslations(locale);

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

    // Email content - friendly reminder with steps and help offer
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: ownerEmail,
      subject: t.subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.greeting}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px;">
            ${t.body}
          </p>

          <ol style="font-size: 17px; line-height: 1.7; margin: 0 0 20px; padding-left: 24px;">
            <li style="margin-bottom: 8px;">${t.step1}</li>
            <li style="margin-bottom: 8px;">${t.step2}</li>
            <li>${t.step3}</li>
          </ol>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 12px;">
            ${t.helpOffer}
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
      `,
      text: `${t.greeting}

${t.body}

1. ${t.step1}
2. ${t.step2}
3. ${t.step3}

${t.helpOffer}
${t.helpAction}

${t.cta}: https://iq-rest.com/dashboard

${t.signature}`,
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
