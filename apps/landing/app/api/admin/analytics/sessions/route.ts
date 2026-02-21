import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing required field: sessionId" },
        { status: 400 }
      );
    }

    // Cascade will delete all events
    await prisma.session.delete({
      where: { id: sessionId },
    }).catch(() => {
      // If session doesn't exist, delete orphaned events
      return prisma.analyticsEvent.deleteMany({
        where: { sessionId },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const country = searchParams.get("country");

    // Get events for a specific session
    if (sessionId) {
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          events: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              event: true,
              sessionId: true,
              meta: true,
              createdAt: true,
            },
          },
        },
      });

      // Look up restaurant name via companyId
      let restaurantName: string | null = null;
      if (session?.companyId) {
        const restaurant = await prisma.restaurant.findFirst({
          where: { companyId: session.companyId },
          select: { title: true },
        });
        restaurantName = restaurant?.title ?? null;
      }

      return NextResponse.json({
        session: session ? {
          id: session.id,
          companyId: session.companyId,
          country: session.country,
          city: session.city,
          landingPage: session.landingPage,
          gclid: session.gclid,
          keyword: session.keyword,
          userAgent: session.userAgent,
          browser: session.browser,
          device: session.device,
          ip: session.ip,
          restaurantName,
          wasRegistered: session.wasRegistered,
          namedRestaurant: session.namedRestaurant,
          selectedType: session.selectedType,
          modifiedMenu: session.modifiedMenu,
          modifiedContacts: session.modifiedContacts,
          modifiedDesign: session.modifiedDesign,
          reached50Views: session.reached50Views,
          paidSubscription: session.paidSubscription,
          conversionSent: session.conversionSent,
          conversionViewsSent: session.conversionViewsSent,
          conversionSubscriptionSent: session.conversionSubscriptionSent,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt,
        } : null,
        events: session?.events || [],
      });
    }

    // Get unique sessions (optionally filtered by event)
    const dateFrom = from ? new Date(from) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dateTo = to ? new Date(to) : new Date();

    // Build session query conditions
    const sessionWhere: Record<string, unknown> = {
      createdAt: { gte: dateFrom, lte: dateTo },
    };

    if (country) {
      sessionWhere.country = country;
    }

    // If filtering by event, get sessionIds that match first
    let sessionIdFilter: string[] | undefined;
    if (event) {
      const matchingSessions = await prisma.analyticsEvent.findMany({
        where: {
          event,
          createdAt: { gte: dateFrom, lte: dateTo },
        },
        distinct: ["sessionId"],
        select: { sessionId: true },
        take: 100,
      });
      sessionIdFilter = matchingSessions.map(s => s.sessionId);
      if (sessionIdFilter.length === 0) {
        return NextResponse.json({ sessions: [] });
      }
      sessionWhere.id = { in: sessionIdFilter };
    }

    const sessions = await prisma.session.findMany({
      where: sessionWhere,
      orderBy: { updatedAt: "desc" },
      take: 100,
      select: {
        id: true,
        userId: true,
        country: true,
        gclid: true,
        browser: true,
        device: true,
        ip: true,
        createdAt: true,
        _count: { select: { events: true } },
        events: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { createdAt: true },
        },
      },
    });

    // Sort by last event date descending
    sessions.sort((a, b) => {
      const aLast = a.events[0]?.createdAt ?? a.createdAt;
      const bLast = b.events[0]?.createdAt ?? b.createdAt;
      return new Date(bLast).getTime() - new Date(aLast).getTime();
    });

    // Determine session type by looking at events
    const sessionIds = sessions.map(s => s.id);
    const eventTypes = await prisma.analyticsEvent.findMany({
      where: { sessionId: { in: sessionIds } },
      select: { sessionId: true, event: true },
    });

    const sessionTypeMap = new Map<string, "signup" | "dashboard" | null>();
    for (const evt of eventTypes) {
      const currentType = sessionTypeMap.get(evt.sessionId);
      if (evt.event === "auth_signup") {
        sessionTypeMap.set(evt.sessionId, "signup");
      } else if (evt.event.startsWith("showed_") && evt.event !== "showed_login" && evt.event !== "showed_otp" && evt.event !== "showed_onboarding_name" && currentType !== "signup") {
        sessionTypeMap.set(evt.sessionId, "dashboard");
      }
    }

    const sessionsWithSource = sessions.map(s => ({
      sessionId: s.id,
      userId: s.userId,
      createdAt: s.createdAt,
      lastEventAt: s.events[0]?.createdAt ?? s.createdAt,
      meta: s.country ? { geo: { country: s.country } } : null,
      source: s.gclid ? "Ads" : "Direct",
      adValues: undefined,
      sessionType: sessionTypeMap.get(s.id) || null,
      eventCount: s._count.events,
    }));

    return NextResponse.json({ sessions: sessionsWithSource });
  } catch (error) {
    console.error("Admin sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
