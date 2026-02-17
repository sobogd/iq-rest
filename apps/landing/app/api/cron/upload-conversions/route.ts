import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadClickConversion } from "@/lib/google-ads";

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Find auth_signup events from last 7 days that have a gclid in their session
    // and haven't been uploaded yet (no "gads_uploaded" event for that session)
    const signupsWithGclid = await prisma.$queryRaw<
      {
        session_id: string;
        signup_time: Date;
        gclid: string;
      }[]
    >`
      SELECT
        signup."sessionId" as session_id,
        signup."createdAt" as signup_time,
        ad_event.meta->'params'->>'gclid' as gclid
      FROM analytics_events signup
      JOIN analytics_events ad_event
        ON ad_event."sessionId" = signup."sessionId"
        AND ad_event.meta->'params'->>'gclid' IS NOT NULL
      WHERE signup.event = 'auth_signup'
        AND signup."createdAt" >= NOW() - INTERVAL '7 days'
        AND NOT EXISTS (
          SELECT 1 FROM analytics_events uploaded
          WHERE uploaded."sessionId" = signup."sessionId"
            AND uploaded.event = 'gads_conversion_uploaded'
        )
      ORDER BY signup."createdAt" DESC
      LIMIT 50
    `;

    let uploaded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const row of signupsWithGclid) {
      const result = await uploadClickConversion(
        row.gclid,
        row.signup_time.toISOString()
      );

      if (result.success) {
        // Mark as uploaded by creating a marker event
        await prisma.analyticsEvent.create({
          data: {
            event: "gads_conversion_uploaded",
            sessionId: row.session_id,
            meta: { gclid: row.gclid },
          },
        });
        uploaded++;
      } else {
        failed++;
        errors.push(`${row.gclid.slice(0, 12)}...: ${result.error}`);
      }
    }

    return NextResponse.json({
      found: signupsWithGclid.length,
      uploaded,
      failed,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Upload conversions cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
