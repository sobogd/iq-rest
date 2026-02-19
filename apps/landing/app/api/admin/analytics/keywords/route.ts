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

    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get("period") || "today";
    const company = searchParams.get("company"); // "true" | "false" | null

    // Date range
    const now = new Date();
    let dateFrom: Date;
    if (period === "yesterday") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    } else if (period === "7days") {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else {
      dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    let dateTo: Date | undefined;
    if (period === "yesterday") {
      dateTo = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const where: Record<string, unknown> = {
      keyword: { not: null },
      createdAt: dateTo
        ? { gte: dateFrom, lt: dateTo }
        : { gte: dateFrom },
    };

    if (company === "true") where.companyId = { not: null };
    if (company === "false") where.companyId = null;

    const results = await prisma.session.groupBy({
      by: ["keyword"],
      where,
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
    });

    const keywords = results.map((r) => ({
      keyword: r.keyword!,
      count: r._count.id,
    }));

    return NextResponse.json({ keywords });
  } catch (error) {
    console.error("Admin keywords error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
