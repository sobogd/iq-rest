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

    // Filters
    const filterCountry = searchParams.get("country") || null;
    const filterKeyword = searchParams.get("keyword") || null;
    const filterBot = searchParams.get("bot"); // "true" | "false" | null
    const filterAds = searchParams.get("ads"); // "true" | "false" | null

    // Build where clause
    const where: Record<string, unknown> = {};
    if (filterCountry) where.country = filterCountry;
    if (filterKeyword) where.keyword = { contains: filterKeyword, mode: "insensitive" };
    if (filterBot === "true") where.isBot = true;
    if (filterBot === "false") where.isBot = false;
    if (filterAds === "true") where.gclid = { not: null };
    if (filterAds === "false") where.gclid = null;

    // Get sessions directly from Session table
    const [sessionsList, totalResult] = await Promise.all([
      prisma.session.findMany({
        where,
        orderBy: { updatedAt: "desc" },
        skip: page * limit,
        take: limit,
        select: {
          id: true,
          country: true,
          gclid: true,
          keyword: true,
          browser: true,
          device: true,
          ip: true,
          userId: true,
          isBot: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { events: true } },
        },
      }),
      prisma.session.count({ where }),
    ]);

    // Collect userIds to resolve restaurant names
    const userIds = sessionsList
      .filter((s) => s.userId)
      .map((s) => s.userId!);

    const userRestaurantMap = new Map<string, string>();
    if (userIds.length > 0) {
      const userCompanies = await prisma.userCompany.findMany({
        where: { userId: { in: userIds } },
        select: {
          userId: true,
          company: {
            select: {
              restaurants: { select: { title: true }, take: 1 },
            },
          },
        },
      });
      for (const uc of userCompanies) {
        const name = uc.company.restaurants[0]?.title;
        if (name) userRestaurantMap.set(uc.userId, name);
      }
    }

    // Determine session types by events
    const sessionIds = sessionsList.map((s) => s.id);
    const eventTypes = await prisma.analyticsEvent.findMany({
      where: { sessionId: { in: sessionIds } },
      select: { sessionId: true, event: true },
    });

    const sessionTypeMap = new Map<string, string | null>();
    for (const evt of eventTypes) {
      const currentType = sessionTypeMap.get(evt.sessionId);
      if (evt.event === "auth_signup") {
        sessionTypeMap.set(evt.sessionId, "signup");
      } else if (evt.event.startsWith("showed_") && currentType !== "signup") {
        sessionTypeMap.set(evt.sessionId, "dashboard");
      }
    }

    const sessions = sessionsList.map((s) => {
      const durationMs = s.updatedAt.getTime() - s.createdAt.getTime();
      return {
        sessionId: s.id,
        firstEvent: s.createdAt.toISOString(),
        duration: Math.round(durationMs / 1000),
        eventCount: s._count.events,
        hasUser: !!s.userId,
        country: s.country,
        source: s.gclid ? "Ads" : "Direct",
        adValues: s.keyword,
        sessionType: sessionTypeMap.get(s.id) || null,
        restaurantName: s.userId
          ? userRestaurantMap.get(s.userId) || null
          : null,
        ip: s.ip,
        isBot: s.isBot,
      };
    });

    return NextResponse.json({
      sessions,
      total: totalResult,
      page,
      totalPages: Math.ceil(totalResult / limit),
    });
  } catch (error) {
    console.error("Sessions list API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
