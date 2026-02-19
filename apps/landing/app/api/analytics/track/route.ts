import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadClickConversion } from "@/lib/google-ads";
import nodemailer from "nodemailer";
import crypto from "crypto";

const PLAN_LIMITS = {
  FREE: 400,
  BASIC: Infinity,
  PRO: Infinity,
};

function getOrCreateSessionId(request: NextRequest): {
  sessionId: string;
  isNew: boolean;
} {
  const existing = request.cookies.get("sqr_session_id")?.value;
  if (existing) return { sessionId: existing, isNew: false };
  return { sessionId: crypto.randomUUID(), isNew: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, page, language, referrer } = body;

    if (!slug || !page || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { sessionId, isNew } = getOrCreateSessionId(request);

    // Find restaurant and company by slug
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        companyId: true,
        defaultLanguage: true,
        company: {
          select: {
            id: true,
            plan: true,
            emailsSent: true,
            emailUnsubscribed: true,
            users: {
              select: { user: { select: { email: true } } },
              take: 1,
            },
          },
        },
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const { company } = restaurant;
    const limit = PLAN_LIMITS[company.plan];

    // Get current month's view count
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const currentMonthViews = await prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfMonth },
      },
    });

    const showAd = currentMonthViews >= limit;
    const remaining = Math.max(0, limit - currentMonthViews);

    // Always record the view (even if limit exceeded)
    const userAgent = request.headers.get("user-agent") || null;
    const ip = request.cookies.get("geo_ip")?.value || null;

    await prisma.pageView.create({
      data: {
        companyId: company.id,
        sessionId,
        page,
        language,
        referrer: referrer || null,
        userAgent,
        ip,
      },
    });

    // Send limit warning email when FREE plan approaches limit (within 20 views)
    const WARNING_THRESHOLD = 20;
    if (
      company.plan === "FREE" &&
      limit !== Infinity &&
      currentMonthViews + 1 >= limit - WARNING_THRESHOLD &&
      !company.emailUnsubscribed
    ) {
      const emailsSent = (company.emailsSent as Record<string, string>) || {};
      const currentMonth = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, "0")}`;
      const warningKey = `limit_warning_${currentMonth}`;

      if (!emailsSent[warningKey]) {
        const ownerEmail = company.users[0]?.user?.email;
        if (ownerEmail) {
          try {
            const locale = restaurant.defaultLanguage || "en";
            let t;
            try {
              const msgs = await import(`@/messages/${locale}.json`);
              t = msgs.limitWarningEmail;
            } catch {
              const msgs = await import(`@/messages/en.json`);
              t = msgs.limitWarningEmail;
            }

            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT),
              secure: false,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            });

            const bodyText = (t.body as string).replace("{limit}", String(limit));

            await transporter.sendMail({
              from: process.env.FROM_EMAIL,
              to: ownerEmail,
              subject: t.subject,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px; color: #1a1a1a;">
                  <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${t.greeting}</p>
                  <p style="font-size: 17px; line-height: 1.7; margin: 0 0 20px;">${bodyText}</p>
                  <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">${t.upgrade}</p>
                  <p style="font-size: 17px; line-height: 1.7; margin: 0 0 24px;">
                    <a href="https://iq-rest.com/pricing" style="display: inline-block; background: #0066cc; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">${t.cta}</a>
                  </p>
                  <p style="font-size: 15px; margin: 0; color: #1a1a1a;">${t.signature}</p>
                </div>
              `,
              text: `${t.greeting}\n\n${bodyText}\n\n${t.upgrade}\n\n${t.cta}: https://iq-rest.com/pricing\n\n${t.signature.replace("<br>", "\n")}`,
            });

            await prisma.company.update({
              where: { id: company.id },
              data: {
                emailsSent: { ...emailsSent, [warningKey]: new Date().toISOString() },
              },
            });
          } catch (emailError) {
            console.error("Failed to send limit warning email:", emailError);
          }
        }
      }
    }

    // Check if company reached 20 views → set reached50Views on Session + send conversion
    if (currentMonthViews + 1 >= 20) {
      await prisma.session.updateMany({
        where: { companyId: company.id, reached50Views: false },
        data: { reached50Views: true },
      });

      // Send Google Ads conversion for views milestone
      const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS;
      if (conversionActionId) {
        const sess = await prisma.session.findFirst({
          where: { companyId: company.id, gclid: { not: null }, conversionViewsSent: false },
          select: { id: true, gclid: true },
        });
        if (sess?.gclid) {
          const result = await uploadClickConversion(sess.gclid, new Date().toISOString(), undefined, conversionActionId);
          if (result.success) {
            await prisma.session.updateMany({
              where: { companyId: company.id },
              data: { conversionViewsSent: true },
            });
          }
        }
      }
    }

    const response = NextResponse.json({
      success: true,
      showAd,
      remaining: limit === Infinity ? null : remaining,
    });

    // Set session cookie (no maxAge = dies when browser closes)
    if (isNew) {
      response.cookies.set("sqr_session_id", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
