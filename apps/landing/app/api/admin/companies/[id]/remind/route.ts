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
  timeNote: string;
  cta: string;
  helpNote: string;
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

    // Replace {restaurant} placeholder in translations
    const subject = t.subject.replace("{restaurant}", restaurantName);
    const body = t.body.replace("{restaurant}", restaurantName);
    const signature = t.signature.replace(/\n/g, "<br>");
    const signatureText = t.signature;

    // Email content - friendly, non-pushy reminder
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: ownerEmail,
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${t.greeting}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
            ${body}
          </p>

          <p style="font-size: 17px; line-height: 1.7; margin: 0 0 28px;">
            ${t.timeNote}
          </p>

          <a href="https://iq-rest.com/dashboard"
             style="display: inline-block; padding: 14px 28px; background-color: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
            ${t.cta}
          </a>

          <p style="font-size: 15px; line-height: 1.7; margin: 36px 0 0; color: #666;">
            ${t.helpNote}
          </p>

          <p style="font-size: 15px; margin: 28px 0 0; color: #1a1a1a;">
            ${signature}
          </p>

        </div>
      `,
      text: `${t.greeting}

${body}

${t.timeNote}

${t.cta}: https://iq-rest.com/dashboard

${t.helpNote}

${signatureText}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, sentTo: ownerEmail });
  } catch (error) {
    console.error("Error sending reminder:", error);
    return NextResponse.json(
      { error: "Failed to send reminder" },
      { status: 500 }
    );
  }
}
