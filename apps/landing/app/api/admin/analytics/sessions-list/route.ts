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

    // Collect unique userIds to resolve company names
    const userIds = new Set<string>();
    for (const evt of allEvents) {
      if (evt.userId) userIds.add(evt.userId);
    }

    // Fetch restaurant names for users (user → company → restaurant)
    const userRestaurantMap = new Map<string, string>();
    if (userIds.size > 0) {
      const userCompanies = await prisma.userCompany.findMany({
        where: { userId: { in: Array.from(userIds) } },
        select: { userId: true, company: { select: { restaurants: { select: { title: true }, take: 1 } } } },
      });
      for (const uc of userCompanies) {
        const name = uc.company.restaurants[0]?.title;
        if (name) userRestaurantMap.set(uc.userId, name);
      }
    }

    // Aggregate per session
    const sessionMap = new Map<
      string,
      {
        firstEvent: Date;
        lastEvent: Date;
        eventCount: number;
        hasUser: boolean;
        country: string | null;
        source: string;
        adValues: string | null;
        sessionType: string | null;
        restaurantName: string | null;
        ip: string | null;
        userAgent: string | null;
        isBot: boolean;
      }
    >();

    for (const sid of sessionIds) {
      sessionMap.set(sid, {
        firstEvent: new Date(),
        lastEvent: new Date(0),
        eventCount: 0,
        hasUser: false,
        country: null,
        source: "Direct",
        adValues: null,
        sessionType: null,
        restaurantName: null,
        ip: null,
        userAgent: null,
        isBot: false,
      });
    }

    const adParamKeys = ["kw", "mt"];
    const botPatterns = /bot|crawl|spider|scraper|headless|phantom|selenium|puppeteer|lighthouse/i;

    for (const evt of allEvents) {
      const s = sessionMap.get(evt.sessionId);
      if (!s) continue;

      s.eventCount++;
      if (evt.createdAt < s.firstEvent) s.firstEvent = evt.createdAt;
      if (evt.createdAt > s.lastEvent) s.lastEvent = evt.createdAt;

      if (evt.userId) {
        s.hasUser = true;
        if (!s.restaurantName) {
          s.restaurantName = userRestaurantMap.get(evt.userId) || null;
        }
      }

      const meta = evt.meta as {
        geo?: { country?: string };
        params?: Record<string, string>;
        ip?: string;
        userAgent?: string;
      } | null;

      if (!s.country && meta?.geo?.country) {
        s.country = meta.geo.country;
      }

      if (!s.ip && meta?.ip) {
        s.ip = meta.ip;
      }

      if (!s.userAgent && meta?.userAgent) {
        s.userAgent = meta.userAgent;
        if (botPatterns.test(meta.userAgent)) {
          s.isBot = true;
        }
      }

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

      if (evt.event === "auth_signup") {
        s.sessionType = "signup";
      } else if (evt.event.startsWith("showed_") && s.sessionType !== "signup") {
        s.sessionType = "dashboard";
      }
    }

    const sessions = sessionIds.map((sid) => {
      const s = sessionMap.get(sid)!;
      const durationMs = s.lastEvent.getTime() - s.firstEvent.getTime();
      return {
        sessionId: sid,
        firstEvent: s.firstEvent.toISOString(),
        duration: Math.round(durationMs / 1000),
        eventCount: s.eventCount,
        hasUser: s.hasUser,
        country: s.country,
        source: s.source,
        adValues: s.adValues,
        sessionType: s.sessionType,
        restaurantName: s.restaurantName,
        ip: s.ip,
        isBot: s.isBot,
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
