import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AnalyticsClient } from "./analytics-client";
import { DashboardContainer } from "@/components/dashboard-container";

const PLAN_LIMITS: Record<string, number> = {
  FREE: 500,
  BASIC: 2000,
  PRO: Infinity,
};

function getLast7Days(viewsByDay: { date: Date; count: bigint }[]) {
  const result: { date: string; count: number }[] = [];
  const dataMap = new Map(
    viewsByDay.map((v) => [v.date.toISOString().split("T")[0], Number(v.count)])
  );

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      count: dataMap.get(dateStr) || 0,
    });
  }

  return result;
}

async function getAnalyticsData() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  const company = user?.companies[0]?.company;
  if (!company) return null;

  // Get date ranges
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get stats
  const [monthlyViews, weeklyViews, todayViews, uniqueSessions, viewsByPage, viewsByLanguage, viewsByDay] = await Promise.all([
    // Monthly views
    prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfMonth },
      },
    }),
    // Weekly views
    prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfWeek },
      },
    }),
    // Today views
    prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfToday },
      },
    }),
    // Unique sessions this week
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        companyId: company.id,
        createdAt: { gte: startOfWeek },
      },
    }),
    // Views by page this week
    prisma.pageView.groupBy({
      by: ["page"],
      where: {
        companyId: company.id,
        createdAt: { gte: startOfWeek },
      },
      _count: {
        page: true,
      },
    }),
    // Views by language this week
    prisma.pageView.groupBy({
      by: ["language"],
      where: {
        companyId: company.id,
        createdAt: { gte: startOfWeek },
      },
      _count: {
        language: true,
      },
    }),
    // Views by day (last 7 days)
    prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM page_views
      WHERE "companyId" = ${company.id}
        AND "createdAt" >= ${startOfWeek}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
  ]);

  const limit = PLAN_LIMITS[company.plan] || 500;

  return {
    plan: company.plan,
    limit: limit === Infinity ? null : limit,
    monthlyViews,
    weeklyViews,
    todayViews,
    uniqueSessions: uniqueSessions.length,
    viewsByPage: viewsByPage.map((v) => ({
      page: v.page,
      count: v._count.page,
    })),
    viewsByLanguage: viewsByLanguage.map((v) => ({
      language: v.language,
      count: v._count.language,
    })),
    viewsByDay: getLast7Days(viewsByDay),
  };
}

export default async function AnalyticsPage() {
  const t = await getTranslations("analytics");
  const data = await getAnalyticsData();

  if (!data) {
    return (
      <DashboardContainer>
        <p className="text-muted-foreground">{t("unauthorized")}</p>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <AnalyticsClient data={data} />
    </DashboardContainer>
  );
}
