import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

// Funnel 1: Landing page section views
const SECTION_FUNNEL = [
  { event: "section_view_features", label: "Features" },
  { event: "section_view_feature_color_scheme", label: "Color Scheme" },
  { event: "section_view_feature_mobile_management", label: "Mobile Mgmt" },
  { event: "section_view_feature_custom_design", label: "Custom Design" },
  { event: "section_view_feature_easy_menu", label: "Easy Menu" },
  { event: "section_view_feature_ai_translation", label: "AI Translation" },
  { event: "section_view_feature_reservations", label: "Reservations" },
  { event: "section_view_pricing", label: "Pricing" },
];

// Funnel 2: Marketing pages
const MARKETING_FUNNEL = [
  { event: "page_view_home", label: "Home" },
  { event: "demo_open", label: "Demo" },
  { event: "page_view_pricing", label: "Pricing" },
  { event: "page_view_faq", label: "FAQ" },
  { event: "page_view_contacts", label: "Contacts" },
  { event: "page_view_changelog", label: "Changelog" },
  { event: "page_view_terms", label: "Terms" },
  { event: "page_view_privacy", label: "Privacy" },
  { event: "page_view_cookies", label: "Cookies" },
];

// Funnel 3: Dashboard pages
const DASHBOARD_FUNNEL = [
  { event: "showed_home", label: "Home" },
  { event: "showed_menu", label: "Menu" },
  { event: "showed_contacts", label: "Contacts" },
  { event: "showed_settings", label: "Settings" },
  { event: "showed_design", label: "Design" },
  { event: "showed_qr_menu", label: "QR Menu" },
  { event: "showed_analytics", label: "Analytics" },
  { event: "showed_tables", label: "Tables" },
  { event: "showed_reservations", label: "Reservations" },
  { event: "showed_billing", label: "Billing" },
  { event: "showed_support", label: "Support" },
];

// Funnel 4: Conversion funnel (new users only)
const CONVERSION_FUNNEL = [
  { event: "page_view_home", label: "Landing" },
  { event: "auth_signup", label: "New Signup" },
  { event: "clicked_onboarding_continue", label: "Name Entered" },
  { event: "clicked_onboarding_type", label: "Type Selected" },
];

async function getFunnelData(
  steps: { event: string; label: string }[],
  dateFrom: Date,
  dateTo: Date
) {
  return Promise.all(
    steps.map(async (step) => {
      const count = await prisma.analyticsEvent.groupBy({
        by: ["sessionId"],
        where: {
          event: step.event,
          createdAt: { gte: dateFrom, lte: dateTo },
        },
      });
      return {
        ...step,
        count: count.length,
      };
    })
  );
}

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Parse date range from query params
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
      dateFrom.setDate(dateFrom.getDate() - 30);
      dateFrom.setHours(0, 0, 0, 0);
    }

    // Get all 4 funnels in parallel
    const [sectionFunnel, marketingFunnel, dashboardFunnel, conversionFunnel] = await Promise.all([
      getFunnelData(SECTION_FUNNEL, dateFrom, dateTo),
      getFunnelData(MARKETING_FUNNEL, dateFrom, dateTo),
      getFunnelData(DASHBOARD_FUNNEL, dateFrom, dateTo),
      getFunnelData(CONVERSION_FUNNEL, dateFrom, dateTo),
    ]);

    // Get recent events (last 20)
    const recentEvents = await prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        event: true,
        sessionId: true,
        meta: true,
        createdAt: true,
      },
    });

    // Get total stats
    const totalEvents = await prisma.analyticsEvent.count({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    });

    const uniqueSessions = await prisma.session.count({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    });

    const linkedSessions = await prisma.session.count({
      where: {
        userId: { not: null },
        createdAt: { gte: dateFrom, lte: dateTo },
      },
    });

    // Get events by day for chart
    const eventsByDay = await prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT
        DATE("createdAt") as date,
        COUNT(*) as count
      FROM analytics_events
      WHERE "createdAt" >= ${dateFrom} AND "createdAt" <= ${dateTo}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
      LIMIT 60
    `;

    // Get geo and device stats from Session table
    const sessionsInRange = await prisma.session.findMany({
      where: {
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      select: {
        country: true,
        device: true,
        browser: true,
      },
    });

    const countryMap = new Map<string, number>();
    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();

    for (const s of sessionsInRange) {
      if (s.country) {
        countryMap.set(s.country, (countryMap.get(s.country) || 0) + 1);
      }
      if (s.device) {
        deviceMap.set(s.device, (deviceMap.get(s.device) || 0) + 1);
      }
      if (s.browser) {
        browserMap.set(s.browser, (browserMap.get(s.browser) || 0) + 1);
      }
    }

    const sortByCount = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const geoStats = {
      countries: sortByCount(countryMap),
      devices: sortByCount(deviceMap),
      browsers: sortByCount(browserMap),
      os: [] as { name: string; count: number }[],
    };

    // Get IPs with multiple sessions from PageView
    const returningIps = await prisma.$queryRaw<{ ip: string; sessions: bigint; views: bigint }[]>`
      SELECT ip, COUNT(DISTINCT "sessionId") as sessions, COUNT(*) as views
      FROM page_views
      WHERE ip IS NOT NULL
        AND "createdAt" >= ${dateFrom} AND "createdAt" <= ${dateTo}
      GROUP BY ip
      HAVING COUNT(DISTINCT "sessionId") > 1
      ORDER BY sessions DESC
      LIMIT 20
    `;

    return NextResponse.json({
      funnels: {
        sections: sectionFunnel,
        marketing: marketingFunnel,
        dashboard: dashboardFunnel,
        conversion: conversionFunnel,
      },
      recentEvents,
      stats: {
        totalEvents,
        uniqueSessions,
        linkedSessions,
      },
      eventsByDay: eventsByDay.map((row) => ({
        date: row.date,
        count: Number(row.count),
      })),
      geoStats,
      returningIps: returningIps.map((row) => ({
        ip: row.ip,
        sessions: Number(row.sessions),
        views: Number(row.views),
      })),
      dateRange: {
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
