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

      // Check source for each session (Ads vs Direct)
      const sessionIds = sessions.map(s => s.sessionId);
      const allEventsForSessions = await prisma.analyticsEvent.findMany({
        where: {
          sessionId: { in: sessionIds },
        },
        select: {
          sessionId: true,
          meta: true,
        },
      });

      // Determine source for each session
      const sessionSourceMap = new Map<string, { source: string; adValues?: string }>();
      const adParams = ["ad", "kw", "mt"];

      for (const evt of allEventsForSessions) {
        const meta = evt.meta as { params?: Record<string, string> } | null;
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
      }

      const sessionsWithSource = sessions.map(s => {
        const sourceInfo = sessionSourceMap.get(s.sessionId);
        return {
          ...s,
          source: sourceInfo?.source || "Direct",
          adValues: sourceInfo?.adValues,
        };
      });

      return NextResponse.json({ sessions: sessionsWithSource });
    }
  } catch (error) {
    console.error("Admin sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
