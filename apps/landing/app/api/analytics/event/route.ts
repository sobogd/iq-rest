import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, sessionId, page, meta } = body;

    if (!event || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields: event, sessionId" },
        { status: 400 }
      );
    }

    await prisma.analyticsEvent.create({
      data: {
        event,
        sessionId,
        page: page || null,
        meta: meta || null,
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
