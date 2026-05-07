import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";


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
      select: { companyId: true },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const userAgent = request.headers.get("user-agent") || null;
    const ip = request.cookies.get("geo_ip")?.value || null;

    await prisma.pageView.create({
      data: {
        companyId: restaurant.companyId,
        sessionId,
        page,
        language,
        referrer: referrer || null,
        userAgent,
        ip,
      },
    });

    const response = NextResponse.json({ success: true });

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
