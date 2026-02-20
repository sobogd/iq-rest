import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const EMAIL_TYPES = {
  reminder_onboarded: {

    getSubject: (t: Record<string, string>) => t.subject,
    getHtml: (t: Record<string, string>, locale: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.greeting}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 16px;">${t.body}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 8px; font-weight: 600;">${t.stepsIntro}</p>
        <ol style="font-size: 17px; line-height: 1.7; margin: 0 0 16px; padding-left: 24px;">
          <li style="margin-bottom: 8px;">${t.step1}</li>
          <li style="margin-bottom: 8px;">${t.step2}</li>
          <li>${t.step3}</li>
        </ol>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.timeNote}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 12px;">${t.helpOffer}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.helpAction}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
          <a href="https://iq-rest.com/${locale}/dashboard?from=email" style="color: #0066cc;">${t.cta}</a>
        </p>
        <p style="font-size: 15px; margin: 0; color: #1a1a1a;">${t.signature}</p>
      </div>
    `,
    getText: (t: Record<string, string>, locale: string) =>
      `${t.greeting}\n\n${t.body}\n\n${t.stepsIntro}\n1. ${t.step1}\n2. ${t.step2}\n3. ${t.step3}\n\n${t.timeNote}\n\n${t.helpOffer}\n${t.helpAction}\n\n${t.cta}: https://iq-rest.com/${locale}/dashboard?from=email\n\n${t.signature}`,
  },
  reminder_not_onboarded: {

    getSubject: (t: Record<string, string>) => t.subjectNotOnboarded,
    getHtml: (t: Record<string, string>, locale: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.greeting}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.bodyNotOnboarded}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 12px;">${t.helpOfferNotOnboarded}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.helpAction}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
          <a href="https://iq-rest.com/${locale}/dashboard?from=email" style="color: #0066cc;">${t.cta}</a>
        </p>
        <p style="font-size: 15px; margin: 0; color: #1a1a1a;">${t.signature}</p>
      </div>
    `,
    getText: (t: Record<string, string>, locale: string) =>
      `${t.greeting}\n\n${t.bodyNotOnboarded}\n\n${t.helpOfferNotOnboarded}\n${t.helpAction}\n\n${t.cta}: https://iq-rest.com/${locale}/dashboard?from=email\n\n${t.signature}`,
  },
  reminder_scanner: {
    getSubject: (t: Record<string, string>) => t.subjectScanner,
    getHtml: (t: Record<string, string>, locale: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.greeting}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.bodyScanner}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.helpOfferScanner}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.selfServiceScanner}</p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
          <a href="https://iq-rest.com/${locale}/dashboard?from=email" style="color: #0066cc;">${t.ctaScanner}</a>
        </p>
        <p style="font-size: 15px; margin: 0; color: #1a1a1a;">${t.signature}</p>
      </div>
    `,
    getText: (t: Record<string, string>, locale: string) =>
      `${t.greeting}\n\n${t.bodyScanner}\n\n${t.helpOfferScanner}\n\n${t.selfServiceScanner}\n\n${t.ctaScanner}: https://iq-rest.com/${locale}/dashboard?from=email\n\n${t.signature}`,
  },
} as const;

type EmailType = keyof typeof EMAIL_TYPES;

async function getTranslations(locale: string): Promise<Record<string, string>> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.reminderEmail;
  } catch {
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

    const body = await request.json().catch(() => ({}));
    const emailType = body.type as EmailType;

    if (!emailType || !EMAIL_TYPES[emailType]) {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const config = EMAIL_TYPES[emailType];

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

    const t = await getTranslations(locale);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: ownerEmail,
      subject: config.getSubject(t),
      html: config.getHtml(t, locale),
      text: config.getText(t, locale).replace(/<br>/g, "\n"),
    });

    // Save to emailsSent JSON
    const emailsSent = (company.emailsSent as Record<string, string>) || {};
    emailsSent[emailType] = new Date().toISOString();

    await prisma.company.update({
      where: { id: companyId },
      data: { emailsSent },
    });

    return NextResponse.json({ success: true, sentTo: ownerEmail, type: emailType });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
