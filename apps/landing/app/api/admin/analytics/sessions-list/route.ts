import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;
    const period = searchParams.get("period") || "today";

    const now = new Date();
    let dateFrom: Date;
    let dateTo: Date | undefined;

    if (period === "yesterday") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      dateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === "7days") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const where = {
      createdAt: dateTo ? { gte: dateFrom, lt: dateTo } : { gte: dateFrom },
    };

    const total = await prisma.session.count({ where });
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const pageParam = searchParams.get("page");
    const page = pageParam !== null
      ? Math.max(0, Math.min(Number(pageParam), totalPages - 1))
      : 0;

    const sessionsList = await prisma.session.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        country: true,
        gclid: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { events: true } },
      },
    });

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

    return NextResponse.json({ sessions, total, page, totalPages });
  } catch (error) {
    console.error("Sessions list API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
