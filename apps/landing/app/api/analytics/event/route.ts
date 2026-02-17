import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, sessionId, page, userAgent, meta } = body;

    if (!event || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: event, sessionId" },
        { status: 400 }
      );
    }

    // Parse User-Agent for device info (prefer client-sent, fallback to request header)
    const ua = userAgent || request.headers.get("user-agent") || null;
    let device = null;
    if (ua) {
      const result = UAParser(ua);
      device = {
        browser: result.browser.name,
        os: result.os.name,
        device: result.device.type || "desktop",
      };
    }

    // Capture IP from request headers (Cloudflare / proxy)
    const ip =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      null;

    await prisma.analyticsEvent.create({
      data: {
        event,
        sessionId,
        page: page || null,
        meta: {
          ...meta,
          ...(device && { device }),
          ...(ua && { userAgent: ua }),
          ...(ip && { ip }),
        },
      },
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
