import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { Prisma } from "@prisma/client";

// Funnel 1: Landing page section views
const SECTION_FUNNEL = [
  { event: "section_view_hero", label: "Hero" },
  { event: "section_view_features", label: "Features" },
  { event: "section_view_feature_reservations", label: "Reservations" },
  { event: "section_view_feature_custom_design", label: "Custom Design" },
  { event: "section_view_feature_color_scheme", label: "Color Scheme" },
  { event: "section_view_feature_easy_menu", label: "Easy Menu" },
  { event: "section_view_feature_multilingual", label: "Multilingual" },
  { event: "section_view_feature_ai_translation", label: "AI Translation" },
  { event: "section_view_feature_mobile_management", label: "Mobile Mgmt" },
  { event: "section_view_intro", label: "Intro" },
  { event: "section_view_why_us", label: "Why Us" },
  { event: "section_view_cta", label: "CTA" },
];

// Funnel 2: Marketing pages
const MARKETING_FUNNEL = [
  { event: "page_view_home", label: "Home" },
  { event: "demo_open", label: "Demo Open" },
  { event: "page_view_pricing", label: "Pricing" },
  { event: "page_view_faq", label: "FAQ" },
  { event: "page_view_contacts", label: "Contacts" },
  { event: "page_view_changelog", label: "Changelog" },
];

// Funnel 3: Dashboard pages
const DASHBOARD_FUNNEL = [
  { event: "dashboard_onboarding", label: "Onboarding" },
  { event: "dashboard_categories", label: "Categories" },
  { event: "dashboard_items", label: "Items" },
  { event: "dashboard_settings", label: "Settings" },
  { event: "dashboard_design", label: "Design" },
  { event: "dashboard_contacts", label: "Contacts" },
  { event: "dashboard_languages", label: "Languages" },
  { event: "dashboard_analytics", label: "Analytics" },
  { event: "dashboard_qrMenu", label: "QR Menu" },
  { event: "dashboard_billing", label: "Billing" },
];

// Funnel 4: Conversion funnel
const CONVERSION_FUNNEL = [
  { event: "page_view_home", label: "Landing" },
  { event: "auth_signup", label: "Signup" },
  { event: "restaurant_saved", label: "Settings" },
  { event: "category_created", label: "Category" },
  { event: "item_created", label: "Item" },
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
      // Parse dates and set time boundaries
      dateFrom = new Date(fromParam);
      dateFrom.setHours(0, 0, 0, 0);

      dateTo = new Date(toParam);
      dateTo.setHours(23, 59, 59, 999);
    } else {
      // Default: last 30 days
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

    // Get recent events (last 100)
    const recentEvents = await prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: dateFrom, lte: dateTo },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        event: true,
        sessionId: true,
        userId: true,
        page: true,
        createdAt: true,
      },
    });

    // Get total stats
    const totalEvents = await prisma.analyticsEvent.count({
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    });

    const uniqueSessions = await prisma.analyticsEvent.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: dateFrom, lte: dateTo } },
    });

    const linkedSessions = await prisma.analyticsEvent.groupBy({
      by: ["userId"],
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

    // Get country and device stats from meta field
    const eventsWithMeta = await prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: dateFrom, lte: dateTo },
        meta: { not: Prisma.JsonNull },
      },
      select: {
        sessionId: true,
        meta: true,
      },
      distinct: ["sessionId"], // One entry per session
    });

    // Aggregate by country
    const countryMap = new Map<string, number>();
    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();
    const osMap = new Map<string, number>();

    for (const event of eventsWithMeta) {
      const meta = event.meta as {
        geo?: { country?: string };
        device?: { device?: string; browser?: string; os?: string };
      } | null;

      if (meta?.geo?.country) {
        const country = meta.geo.country;
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      }

      if (meta?.device) {
        const { device, browser, os } = meta.device;
        if (device) {
          deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
        }
        if (browser) {
          browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
        }
        if (os) {
          osMap.set(os, (osMap.get(os) || 0) + 1);
        }
      }
    }

    // Convert to sorted arrays
    const sortByCount = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10

    const geoStats = {
      countries: sortByCount(countryMap),
      devices: sortByCount(deviceMap),
      browsers: sortByCount(browserMap),
      os: sortByCount(osMap),
    };

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
        uniqueSessions: uniqueSessions.length,
        linkedSessions: linkedSessions.length,
      },
      eventsByDay: eventsByDay.map((row) => ({
        date: row.date,
        count: Number(row.count),
      })),
      geoStats,
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
