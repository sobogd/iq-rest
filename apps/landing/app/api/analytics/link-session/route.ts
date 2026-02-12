import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId } = body;

    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: sessionId, userId" },
        { status: 400 }
      );
    }

    // Link all events from this session to the user
    await prisma.analyticsEvent.updateMany({
      where: { sessionId },
      data: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics link-session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
