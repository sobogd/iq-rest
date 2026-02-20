import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json();

    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      replyTo: email,
      to: process.env.TO_EMAIL,
      subject: `IQ Rest Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong>From:</strong> ${email}
            </p>
            <p style="margin: 10px 0;">
              <strong>Subject:</strong> ${subject}
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <strong>Message:</strong>
              <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the IQ Rest contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

From: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from the IQ Rest contact form.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Contact form submitted:", { email, subject });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
