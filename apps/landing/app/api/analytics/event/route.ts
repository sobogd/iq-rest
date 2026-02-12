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

    // Parse User-Agent for device info
    let device = null;
    if (userAgent) {
      const result = UAParser(userAgent);
      device = {
        browser: result.browser.name,
        os: result.os.name,
        device: result.device.type || "desktop", // mobile, tablet, or desktop
      };
    }

    await prisma.analyticsEvent.create({
      data: {
        event,
        sessionId,
        page: page || null,
        meta: {
          ...meta,
          ...(device && { device }),
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
