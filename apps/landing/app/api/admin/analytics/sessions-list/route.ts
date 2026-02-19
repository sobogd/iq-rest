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
    const filterDevice = searchParams.get("device") || null;
    const filterBrowser = searchParams.get("browser") || null;

    // Build where clause
    const where: Record<string, unknown> = {};
    if (filterCountry) where.country = filterCountry;
    if (filterKeyword) where.keyword = { contains: filterKeyword, mode: "insensitive" };
    if (filterBot === "true") where.isBot = true;
    if (filterBot === "false") where.isBot = false;
    if (filterAds === "true") where.gclid = { not: null };
    if (filterAds === "false") where.gclid = null;
    if (filterDevice) where.device = filterDevice;
    if (filterBrowser) where.browser = filterBrowser;

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
          userId: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { events: true } },
        },
      }),
      prisma.session.count({ where }),
    ]);

    const sessions = sessionsList.map((s) => {
      const durationMs = s.updatedAt.getTime() - s.createdAt.getTime();
      return {
        sessionId: s.id,
        firstEvent: s.createdAt.toISOString(),
        duration: Math.round(durationMs / 1000),
        eventCount: s._count.events,
        country: s.country,
        source: s.gclid ? "Ads" : "Direct",
        hasUser: !!s.userId,
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
