import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const event = searchParams.get("event");
    const sessionId = searchParams.get("sessionId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // Get events for a specific session
    if (sessionId) {
      const events = await prisma.analyticsEvent.findMany({
        where: { sessionId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          event: true,
          sessionId: true,
          userId: true,
          page: true,
          meta: true,
          createdAt: true,
        },
      });

      return NextResponse.json({ events });
    }

    // Get unique sessions for a specific event
    if (event) {
      const dateFrom = from ? new Date(from) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const dateTo = to ? new Date(to) : new Date();

      const sessions = await prisma.analyticsEvent.findMany({
        where: {
          event,
          createdAt: { gte: dateFrom, lte: dateTo },
        },
        distinct: ["sessionId"],
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          sessionId: true,
          userId: true,
          createdAt: true,
          meta: true,
        },
      });

      return NextResponse.json({ sessions });
    }

    return NextResponse.json({ error: "Missing event or sessionId param" }, { status: 400 });
  } catch (error) {
    console.error("Admin sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
