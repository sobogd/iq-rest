import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

// All onboarding-related events we want to track
const ONBOARDING_EVENTS = [
  // Name step
  "showed_onboarding_name",
  "focused_onboarding_name",
  "clicked_onboarding_continue",
  // Menu choice
  "showed_onboarding_menu",
  "clicked_onboarding_skip",
  "clicked_onboarding_back",
  // Scan path
  "showed_onboarding_scan",
  "clicked_onboarding_scan",
  "scan_menu_upload",
  "scan_menu_success",
  "scan_menu_error",
  // Templates path
  "clicked_onboarding_templates",
  "showed_onboarding_templates",
  "clicked_template_restaurant",
  "clicked_template_cafe",
  "clicked_template_bar",
  "template_apply_success",
  "template_apply_error",
  // Manual path
  "clicked_onboarding_manual",
  "showed_onboarding_category",
  "focused_onboarding_category_name",
  "clicked_onboarding_save_category",
  "showed_onboarding_item",
  "focused_onboarding_item_name",
  "focused_onboarding_item_price",
  "focused_onboarding_item_description",
  "clicked_onboarding_save_item",
  // Done page
  "showed_onboarding_done",
  "clicked_onboarding_add_item",
  "clicked_onboarding_add_category",
  "clicked_onboarding_finish",
  // Dashboard (completion marker)
  "showed_home",
];

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    let dateFrom: Date;
    let dateTo: Date;

    if (fromParam && toParam) {
      dateFrom = new Date(fromParam);
      dateTo = new Date(toParam);
    } else {
      dateTo = new Date();
      dateTo.setHours(23, 59, 59, 999);
      dateFrom = new Date();
      dateFrom.setDate(dateFrom.getDate() - 7);
      dateFrom.setHours(0, 0, 0, 0);
    }

    // Single query: count distinct sessions per event
    const eventCounts = await prisma.$queryRaw<
      { event: string; count: bigint }[]
    >`
      SELECT event, COUNT(DISTINCT "sessionId") as count
      FROM analytics_events
      WHERE event = ANY(${ONBOARDING_EVENTS})
        AND "createdAt" >= ${dateFrom} AND "createdAt" <= ${dateTo}
      GROUP BY event
    `;

    const counts: Record<string, number> = {};
    for (const row of eventCounts) {
      counts[row.event] = Number(row.count);
    }

    // Scan meta aggregation: total files uploaded and error breakdown
    const scanUploadMeta = await prisma.$queryRaw<
      { meta_value: string; cnt: bigint }[]
    >`
      SELECT meta->>'fileCount' as meta_value, COUNT(*) as cnt
      FROM analytics_events
      WHERE event = 'scan_menu_upload'
        AND "createdAt" >= ${dateFrom} AND "createdAt" <= ${dateTo}
        AND meta IS NOT NULL
      GROUP BY meta->>'fileCount'
    `;

    let totalFiles = 0;
    for (const row of scanUploadMeta) {
      const fileCount = parseInt(row.meta_value || "0", 10);
      totalFiles += fileCount * Number(row.cnt);
    }

    const scanErrorMeta = await prisma.$queryRaw<
      { meta_value: string; cnt: bigint }[]
    >`
      SELECT meta->>'reason' as meta_value, COUNT(*) as cnt
      FROM analytics_events
      WHERE event = 'scan_menu_error'
        AND "createdAt" >= ${dateFrom} AND "createdAt" <= ${dateTo}
        AND meta IS NOT NULL
      GROUP BY meta->>'reason'
    `;

    const errorBreakdown: Record<string, number> = {};
    for (const row of scanErrorMeta) {
      if (row.meta_value) {
        errorBreakdown[row.meta_value] = Number(row.cnt);
      }
    }

    // Sessions that started onboarding AND reached dashboard
    const reachedDashboardResult = await prisma.$queryRaw<
      { count: bigint }[]
    >`
      SELECT COUNT(DISTINCT a1."sessionId") as count
      FROM analytics_events a1
      INNER JOIN analytics_events a2 ON a1."sessionId" = a2."sessionId"
      WHERE a1.event = 'showed_onboarding_name'
        AND a2.event = 'showed_home'
        AND a1."createdAt" >= ${dateFrom} AND a1."createdAt" <= ${dateTo}
        AND a2."createdAt" >= ${dateFrom} AND a2."createdAt" <= ${dateTo}
    `;

    const reachedDashboard = Number(reachedDashboardResult[0]?.count || 0);

    return NextResponse.json({
      counts,
      scanMeta: { totalFiles, errorBreakdown },
      reachedDashboard,
      dateRange: {
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
      },
    });
  } catch (error) {
    console.error("Admin onboarding analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
