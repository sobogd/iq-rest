import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

interface SupportEmailTranslations {
  subject: string;
  greeting: string;
  body: string;
  cta: string;
  signature: string;
}

async function getTranslations(locale: string): Promise<SupportEmailTranslations> {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.supportEmail;
  } catch {
    const messages = await import(`@/messages/en.json`);
    return messages.supportEmail;
  }
}

async function sendNewMessageEmail(toEmail: string, locale: string) {
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

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject: t.subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          ${t.greeting}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          ${t.body}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          <a href="https://iq-rest.com/dashboard?page=support&from=email" style="color: #0066cc;">${t.cta}</a>
        </p>
        <p style="font-size: 15px; margin: 20px 0 0; color: #1a1a1a;">
          ${t.signature}
        </p>
      </div>
    `,
    text: `${t.greeting}

${t.body}

${t.cta}: https://iq-rest.com/dashboard?page=support&from=email

${t.signature}`,
  };

  await transporter.sendMail(mailOptions);
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id: companyId } = await params;

    const messages = await prisma.supportMessage.findMany({
      where: { companyId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching support messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
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

    // Get admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // Get client email and restaurant language to send notification
    const companyWithUsers = await prisma.company.findUnique({
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
          select: { defaultLanguage: true },
          take: 1,
        },
      },
    });

    const supportMessage = await prisma.supportMessage.create({
      data: {
        message: message.trim(),
        companyId,
        userId: adminUser.id,
        isAdmin: true,
      },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    // Send email notification to client
    const clientEmail = companyWithUsers?.users[0]?.user?.email;
    const locale = companyWithUsers?.restaurants[0]?.defaultLanguage || "en";
    if (clientEmail) {
      try {
        await sendNewMessageEmail(clientEmail, locale);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
    }

    return NextResponse.json(supportMessage, { status: 201 });
  } catch (error) {
    console.error("Error creating support message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
