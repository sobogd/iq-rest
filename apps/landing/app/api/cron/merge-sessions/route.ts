import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Find users with multiple distinct sessionIds (limit 100 per run)
    const usersWithMultipleSessions = await prisma.$queryRaw<
      { userId: string; sessionCount: bigint }[]
    >`
      SELECT "userId", COUNT(DISTINCT "sessionId") as "sessionCount"
      FROM analytics_events
      WHERE "userId" IS NOT NULL
      GROUP BY "userId"
      HAVING COUNT(DISTINCT "sessionId") > 1
      LIMIT 100
    `;

    let totalMerged = 0;

    for (const { userId } of usersWithMultipleSessions) {
      // Get all distinct sessionIds for this user, ordered by earliest appearance
      const sessionsOrdered = await prisma.$queryRaw<
        { sessionId: string }[]
      >`
        SELECT "sessionId", MIN("createdAt") as first_seen
        FROM analytics_events
        WHERE "userId" = ${userId}
        GROUP BY "sessionId"
        ORDER BY first_seen ASC
      `;

      if (sessionsOrdered.length < 2) continue;

      const canonicalSessionId = sessionsOrdered[0].sessionId;
      const oldSessionIds = sessionsOrdered.slice(1).map((s) => s.sessionId);

      // Update AnalyticsEvent records to use canonical sessionId
      const updatedEvents = await prisma.$executeRaw`
        UPDATE analytics_events
        SET "sessionId" = ${canonicalSessionId}
        WHERE "userId" = ${userId}
          AND "sessionId" != ${canonicalSessionId}
      `;

      // Update PageView records that had any of the old sessionIds
      const updatedPageViews = await prisma.$executeRaw`
        UPDATE page_views
        SET "sessionId" = ${canonicalSessionId}
        WHERE "sessionId" = ANY(${oldSessionIds})
      `;

      totalMerged += updatedEvents + updatedPageViews;
    }

    return NextResponse.json({
      merged: totalMerged,
      usersProcessed: usersWithMultipleSessions.length,
    });
  } catch (error) {
    console.error("Merge sessions cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
