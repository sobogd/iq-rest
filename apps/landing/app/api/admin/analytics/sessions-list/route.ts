import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

function getDateRange(period: string, tz: string): { dateFrom: Date; dateTo?: Date } {
  // Get current date parts in the user's timezone
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value) - 1;
  const day = Number(parts.find((p) => p.type === "day")!.value);

  // Build dates as midnight in user's timezone by computing UTC offset
  const todayLocal = new Date(Date.UTC(year, month, day));
  // Get the UTC offset for this timezone at this date
  const utcStr = todayLocal.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = todayLocal.toLocaleString("en-US", { timeZone: tz });
  const offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();

  const todayStart = new Date(todayLocal.getTime() + offsetMs);

  if (period === "yesterday") {
    const yesterdayStart = new Date(todayStart.getTime() - 86400000);
    return { dateFrom: yesterdayStart, dateTo: todayStart };
  }
  if (period === "7days") {
    const weekAgo = new Date(todayStart.getTime() - 7 * 86400000);
    return { dateFrom: weekAgo };
  }
  return { dateFrom: todayStart };
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const period = request.nextUrl.searchParams.get("period") || "today";
    const tz = request.nextUrl.searchParams.get("tz") || "UTC";

    const { dateFrom, dateTo } = getDateRange(period, tz);

    const where = {
      createdAt: dateTo ? { gte: dateFrom, lt: dateTo } : { gte: dateFrom },
    };

    const sessionsList = await prisma.session.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        country: true,
        gclid: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { events: true } },
      },
    });

    const sessions = sessionsList.map((s) => {
      const durationMs = s.updatedAt.getTime() - s.createdAt.getTime();
      return {
        sessionId: s.id,
        lastEvent: s.updatedAt.toISOString(),
        duration: Math.round(durationMs / 1000),
        eventCount: s._count.events,
        country: s.country,
        source: s.gclid ? "Ads" : "Direct",
        hasUser: !!s.userId,
      };
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Sessions list API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
