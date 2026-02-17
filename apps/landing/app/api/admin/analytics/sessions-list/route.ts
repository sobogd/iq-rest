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
    const page = Math.max(0, Number(searchParams.get("page") || 0));
    const limit = 5;

    // Get distinct sessions ordered by most recent event
    const distinctSessions = await prisma.analyticsEvent.findMany({
      distinct: ["sessionId"],
      orderBy: { createdAt: "desc" },
      select: { sessionId: true, createdAt: true },
      skip: page * limit,
      take: limit,
    });

    const totalResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT "sessionId") as count FROM analytics_events
    `;
    const total = Number(totalResult[0]?.count || 0);

    if (distinctSessions.length === 0) {
      return NextResponse.json({ sessions: [], total, page, totalPages: Math.ceil(total / limit) });
    }

    // Get all events for these sessions to compute stats
    const sessionIds = distinctSessions.map((s) => s.sessionId);
    const allEvents = await prisma.analyticsEvent.findMany({
      where: { sessionId: { in: sessionIds } },
      select: { sessionId: true, event: true, userId: true, meta: true, createdAt: true },
    });

    // Aggregate per session
    const sessionMap = new Map<
      string,
      {
        firstEvent: Date;
        eventCount: number;
        hasUser: boolean;
        country: string | null;
        source: string;
        adValues: string | null;
        sessionType: string | null;
      }
    >();

    for (const sid of sessionIds) {
      sessionMap.set(sid, {
        firstEvent: new Date(),
        eventCount: 0,
        hasUser: false,
        country: null,
        source: "Direct",
        adValues: null,
        sessionType: null,
      });
    }

    const adParamKeys = ["kw", "mt"];

    for (const evt of allEvents) {
      const s = sessionMap.get(evt.sessionId);
      if (!s) continue;

      s.eventCount++;
      if (evt.createdAt < s.firstEvent) s.firstEvent = evt.createdAt;
      if (evt.userId) s.hasUser = true;

      const meta = evt.meta as {
        geo?: { country?: string };
        params?: Record<string, string>;
      } | null;

      // Country
      if (!s.country && meta?.geo?.country) {
        s.country = meta.geo.country;
      }

      // Ads source
      if (s.source === "Direct" && meta?.params) {
        if ("gclid" in meta.params) {
          s.source = "Ads";
          const values = adParamKeys
            .filter((p) => meta.params![p])
            .map((p) => meta.params![p]);
          if (values.length > 0) {
            s.adValues = values.join(", ");
          }
        }
      }

      // Session type
      if (evt.event === "auth_signup") {
        s.sessionType = "signup";
      } else if (evt.event.startsWith("showed_") && s.sessionType !== "signup") {
        s.sessionType = "dashboard";
      }
    }

    const sessions = sessionIds.map((sid) => {
      const s = sessionMap.get(sid)!;
      return {
        sessionId: sid,
        firstEvent: s.firstEvent.toISOString(),
        eventCount: s.eventCount,
        hasUser: s.hasUser,
        country: s.country,
        source: s.source,
        adValues: s.adValues,
        sessionType: s.sessionType,
      };
    });

    return NextResponse.json({
      sessions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Sessions list API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
