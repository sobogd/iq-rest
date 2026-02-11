import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { getUserWithCompany } from "@/lib/auth";

const ADMIN_EMAIL = "sobogd@gmail.com";

async function sendNewMessageToAdmin(clientEmail: string, messageText: string) {
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
    to: ADMIN_EMAIL,
    subject: `New support message from ${clientEmail}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          <strong>New message from:</strong> ${clientEmail}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          ${messageText}
        </p>
        <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">
          <a href="https://iq-rest.com/dashboard?page=admin" style="color: #0066cc;">Open Admin Panel</a>
        </p>
      </div>
    `,
    text: `New message from: ${clientEmail}

${messageText}

Open Admin Panel: https://iq-rest.com/dashboard?page=admin`,
  };

  await transporter.sendMail(mailOptions);
}

export async function GET() {
  try {
    const userCompany = await getUserWithCompany();

    if (!userCompany) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.supportMessage.findMany({
      where: { companyId: userCompany.companyId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
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

export async function POST(request: NextRequest) {
  try {
    const userCompany = await getUserWithCompany();

    if (!userCompany) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    // Get user email for notification
    const user = await prisma.user.findUnique({
      where: { id: userCompany.userId },
      select: { email: true },
    });

    const supportMessage = await prisma.supportMessage.create({
      data: {
        message: message.trim(),
        companyId: userCompany.companyId,
        userId: userCompany.userId,
        isAdmin: false,
      },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    // Send email notification to admin
    if (user?.email) {
      try {
        await sendNewMessageToAdmin(user.email, message.trim());
      } catch (emailError) {
        console.error("Failed to send email notification to admin:", emailError);
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
