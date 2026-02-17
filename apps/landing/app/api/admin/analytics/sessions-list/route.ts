import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

interface SessionRow {
  session_id: string;
  first_event: Date;
  event_count: bigint;
  has_user: boolean;
  country: string | null;
  source: string | null;
  ad_values: string | null;
  session_type: string | null;
}

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
    const offset = page * limit;

    const [sessions, countResult] = await Promise.all([
      prisma.$queryRaw<SessionRow[]>`
        SELECT
          s."sessionId" as session_id,
          MIN(s."createdAt") as first_event,
          COUNT(*) as event_count,
          bool_or(s."userId" IS NOT NULL) as has_user,
          (
            SELECT e.meta->'geo'->>'country'
            FROM analytics_events e
            WHERE e."sessionId" = s."sessionId" AND e.meta->'geo'->>'country' IS NOT NULL
            LIMIT 1
          ) as country,
          (
            SELECT
              CASE WHEN e.meta->'params'->>'gclid' IS NOT NULL THEN 'Ads' ELSE NULL END
            FROM analytics_events e
            WHERE e."sessionId" = s."sessionId" AND e.meta->'params'->>'gclid' IS NOT NULL
            LIMIT 1
          ) as source,
          (
            SELECT string_agg(
              COALESCE(e.meta->'params'->>'kw', '') || CASE WHEN e.meta->'params'->>'mt' IS NOT NULL THEN ' (' || e.meta->'params'->>'mt' || ')' ELSE '' END,
              ', '
            )
            FROM (
              SELECT DISTINCT meta FROM analytics_events e
              WHERE e."sessionId" = s."sessionId" AND e.meta->'params'->>'kw' IS NOT NULL
              LIMIT 1
            ) e
          ) as ad_values,
          (
            SELECT
              CASE
                WHEN bool_or(e.event = 'auth_signup') THEN 'signup'
                WHEN bool_or(e.event LIKE 'showed_%') THEN 'dashboard'
                ELSE NULL
              END
            FROM analytics_events e
            WHERE e."sessionId" = s."sessionId"
          ) as session_type
        FROM analytics_events s
        GROUP BY s."sessionId"
        ORDER BY first_event DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT "sessionId") as count
        FROM analytics_events
      `,
    ]);

    const total = Number(countResult[0]?.count || 0);

    return NextResponse.json({
      sessions: sessions.map((row) => ({
        sessionId: row.session_id,
        firstEvent: row.first_event,
        eventCount: Number(row.event_count),
        hasUser: row.has_user,
        country: row.country,
        source: row.source || "Direct",
        adValues: row.ad_values,
        sessionType: row.session_type,
      })),
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
