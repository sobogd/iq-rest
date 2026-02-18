import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";
import { uploadClickConversion } from "@/lib/google-ads";

// Conversion event → Session flag mapping
const CONVERSION_FLAGS: Record<string, string> = {
  auth_signup: "wasRegistered",
  clicked_onboarding_continue: "namedRestaurant",
  clicked_onboarding_type: "selectedType",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, sessionId, gclid, keyword } = body;

    if (!event || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: event, sessionId" },
        { status: 400 }
      );
    }

    // Extract technical data from request
    const ua = request.headers.get("user-agent") || null;
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      null;
    const country = request.cookies.get("geo_country")?.value || null;

    // Parse UA
    let browser: string | null = null;
    let device: string | null = null;
    if (ua) {
      const result = UAParser(ua);
      browser = result.browser.name || null;
      device = result.device.type || "desktop";
    }

    // Find-or-create Session
    const existing = await prisma.session.findUnique({
      where: { id: sessionId },
      select: { id: true, country: true, gclid: true, keyword: true, conversionSent: true },
    });

    let sessionGclid = existing?.gclid ?? gclid ?? null;

    if (existing) {
      // Update last-touch fields, preserve first-touch
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          userAgent: ua,
          browser,
          device,
          ip,
          // First-touch: only set if currently null
          ...(existing.country === null && country ? { country } : {}),
          ...(existing.gclid === null && gclid ? { gclid } : {}),
          ...(existing.keyword === null && keyword ? { keyword } : {}),
        },
      });
    } else {
      // Create new session with all fields
      await prisma.session.create({
        data: {
          id: sessionId,
          country,
          gclid: gclid || null,
          keyword: keyword || null,
          userAgent: ua,
          browser,
          device,
          ip,
        },
      });
    }

    // Check conversion flags
    const flagField = CONVERSION_FLAGS[event];
    if (flagField) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { [flagField]: true },
      });
    }

    // Auto-send Google Ads conversion when type is selected and session has gclid
    if (event === "clicked_onboarding_type" && sessionGclid && !existing?.conversionSent) {
      uploadClickConversion(sessionGclid, new Date().toISOString(), 0.01)
        .then(async (result) => {
          if (result.success) {
            await prisma.session.update({
              where: { id: sessionId },
              data: { conversionSent: true },
            });
          }
        })
        .catch(() => {});
    }

    // Create AnalyticsEvent
    await prisma.analyticsEvent.create({
      data: { event, sessionId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
