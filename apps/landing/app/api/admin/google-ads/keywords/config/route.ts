import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const resourceName = request.nextUrl.searchParams.get("resourceName");
    if (!resourceName) {
      return NextResponse.json({ error: "Missing resourceName" }, { status: 400 });
    }

    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = 20;

    const [config, logs, totalLogs] = await Promise.all([
      prisma.keywordBidConfig.findUnique({
        where: { resourceName },
      }),
      prisma.bidChangeLog.findMany({
        where: { resourceName },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.bidChangeLog.count({
        where: { resourceName },
      }),
    ]);

    return NextResponse.json({
      config,
      logs,
      totalLogs,
      page,
      totalPages: Math.ceil(totalLogs / pageSize),
    });
  } catch (error) {
    console.error("Admin keyword config error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const resourceName = request.nextUrl.searchParams.get("resourceName");
    if (!resourceName) {
      return NextResponse.json({ error: "Missing resourceName" }, { status: 400 });
    }

    const body = await request.json();
    const { maxBidMicros, isActive, keyword, matchType, campaignName, adGroupName } = body;

    if (typeof maxBidMicros !== "number" || maxBidMicros < 0) {
      return NextResponse.json({ error: "Invalid maxBidMicros" }, { status: 400 });
    }

    const config = await prisma.keywordBidConfig.upsert({
      where: { resourceName },
      create: {
        resourceName,
        keyword: keyword || "",
        matchType: matchType || "",
        campaignName: campaignName || "",
        adGroupName: adGroupName || "",
        maxBidMicros,
        isActive: isActive ?? true,
      },
      update: {
        maxBidMicros,
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Admin keyword config update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
