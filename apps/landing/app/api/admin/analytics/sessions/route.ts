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

    const deleted = await prisma.analyticsEvent.deleteMany({
      where: { sessionId },
    });

    return NextResponse.json({ success: true, deleted: deleted.count });
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

      // Determine source for this session
      const adParamKeys = ["ad", "kw", "mt"];
      let source = "Direct";
      let adValues: string | undefined;

      for (const evt of events) {
        const meta = evt.meta as { params?: Record<string, string> } | null;
        if (meta?.params) {
          const hasAdParam = adParamKeys.some(p => p in meta.params!) || "gclid" in meta.params;
          if (hasAdParam) {
            source = "Ads";
            const values = adParamKeys
              .filter(p => meta.params![p])
              .map(p => meta.params![p]);
            if (values.length > 0) {
              adValues = values.join(", ");
            }
            break;
          }
        }
      }

      return NextResponse.json({ events, source, adValues });
    }

    // Get unique sessions (optionally filtered by event)
    const dateFrom = from ? new Date(from) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dateTo = to ? new Date(to) : new Date();

    {
      const sessions = await prisma.analyticsEvent.findMany({
        where: {
          ...(event && { event }),
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

      // Check source and session type for each session
      const sessionIds = sessions.map(s => s.sessionId);
      const allEventsForSessions = await prisma.analyticsEvent.findMany({
        where: {
          sessionId: { in: sessionIds },
        },
        select: {
          sessionId: true,
          event: true,
          meta: true,
        },
      });

      // Determine source, type, event count, and geo for each session
      const sessionSourceMap = new Map<string, { source: string; adValues?: string }>();
      const sessionTypeMap = new Map<string, "signup" | "dashboard" | null>();
      const sessionEventCount = new Map<string, number>();
      const sessionGeoMap = new Map<string, { country?: string; city?: string }>();
      const adParams = ["ad", "kw", "mt"];

      for (const evt of allEventsForSessions) {
        sessionEventCount.set(evt.sessionId, (sessionEventCount.get(evt.sessionId) || 0) + 1);
        // Track ad source
        const meta = evt.meta as { params?: Record<string, string>; geo?: { country?: string; city?: string } } | null;
        if (meta?.params) {
          const hasAdParam = adParams.some(p => p in meta.params!) || "gclid" in meta.params;
          if (hasAdParam && !sessionSourceMap.has(evt.sessionId)) {
            const values = adParams
              .filter(p => meta.params![p])
              .map(p => meta.params![p]);
            sessionSourceMap.set(evt.sessionId, {
              source: "Ads",
              adValues: values.length > 0 ? values.join(", ") : undefined,
            });
          }
        }

        // Track geo: use first event that has country data
        if (meta?.geo?.country && !sessionGeoMap.has(evt.sessionId)) {
          sessionGeoMap.set(evt.sessionId, meta.geo);
        }

        // Track session type: signup takes priority over dashboard
        const currentType = sessionTypeMap.get(evt.sessionId);
        if (evt.event === "auth_signup") {
          sessionTypeMap.set(evt.sessionId, "signup");
        } else if (evt.event.startsWith("dashboard_") && currentType !== "signup") {
          sessionTypeMap.set(evt.sessionId, "dashboard");
        }
      }

      let sessionsWithSource = sessions.map(s => {
        const sourceInfo = sessionSourceMap.get(s.sessionId);
        const geo = sessionGeoMap.get(s.sessionId);
        const currentMeta = s.meta as Record<string, unknown> | null;
        // Enrich meta with geo from any event in the session if missing
        const meta = currentMeta?.geo ? currentMeta : geo ? { ...currentMeta, geo } : currentMeta;
        return {
          ...s,
          meta,
          source: sourceInfo?.source || "Direct",
          adValues: sourceInfo?.adValues,
          sessionType: sessionTypeMap.get(s.sessionId) || null,
          eventCount: sessionEventCount.get(s.sessionId) || 0,
        };
      });

      // Filter by country if specified
      if (country) {
        sessionsWithSource = sessionsWithSource.filter(s => {
          const meta = s.meta as { geo?: { country?: string } } | null;
          return meta?.geo?.country === country;
        });
      }

      return NextResponse.json({ sessions: sessionsWithSource });
    }
  } catch (error) {
    console.error("Admin sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
