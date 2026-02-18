import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { isAdminEmail } from "@/lib/admin";
import { UAParser } from "ua-parser-js";

// ---- Restaurant ----
export async function getRestaurant(companyId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
  });
  if (!restaurant) return null;
  return {
    ...restaurant,
    createdAt: restaurant.createdAt.toISOString(),
    updatedAt: restaurant.updatedAt.toISOString(),
  };
}

// ---- Subscription Status ----
export async function getSubscriptionStatus(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });
  if (!company) return null;
  return {
    plan: company.plan,
    billingCycle: company.billingCycle,
    subscriptionStatus: company.subscriptionStatus,
    currentPeriodEnd: company.currentPeriodEnd?.toISOString() ?? null,
    paymentProcessing: company.paymentProcessing,
  };
}

// ---- Categories ----
export async function getCategories(companyId: string) {
  const categories = await prisma.category.findMany({
    where: { companyId },
    orderBy: { sortOrder: "asc" },
  });
  return categories.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));
}

// ---- Items ----
export async function getItems(companyId: string) {
  const items = await prisma.item.findMany({
    where: { companyId },
    orderBy: { sortOrder: "asc" },
    include: {
      category: {
        select: { id: true, name: true, sortOrder: true },
      },
    },
  });
  return items.map((item) => ({
    ...item,
    price: Number(item.price),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

// ---- Tables ----
export async function getTables(companyId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
  });
  if (!restaurant) return [];

  const tables = await prisma.table.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { sortOrder: "asc" },
  });
  return tables.map((t) => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));
}

// ---- Reservations ----
export async function getReservations(companyId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: { id: true },
  });
  if (!restaurant) return [];

  const reservations = await prisma.reservation.findMany({
    where: { restaurantId: restaurant.id },
    include: {
      table: {
        select: { number: true, zone: true },
      },
    },
    orderBy: [{ date: "desc" }, { startTime: "desc" }],
  });
  return reservations.map((r) => ({
    ...r,
    date: r.date.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

// ---- Support Messages ----
export async function getSupportMessages(companyId: string) {
  const messages = await prisma.supportMessage.findMany({
    where: { companyId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      message: true,
      isAdmin: true,
      createdAt: true,
    },
  });
  return messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));
}

// ---- Scan Usage (lightweight) ----
export async function getScanUsage(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { plan: true },
  });
  if (!company) return null;

  const PLAN_LIMITS: Record<string, number> = {
    FREE: 500,
    BASIC: Infinity,
    PRO: Infinity,
  };

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthlyViews = await prisma.pageView.count({
    where: { companyId, createdAt: { gte: startOfMonth } },
  });

  const limit = PLAN_LIMITS[company.plan] || 500;

  return {
    used: monthlyViews,
    limit: limit === Infinity ? null : limit,
  };
}

// ---- Dashboard Analytics ----
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

export async function getDashboardAnalytics(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { plan: true },
  });
  if (!company) return null;

  const PLAN_LIMITS: Record<string, number> = {
    FREE: 500,
    BASIC: 2000,
    PRO: Infinity,
  };

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [monthlyViews, weeklyViews, todayViews, uniqueSessions, viewsByPage, viewsByLanguage, viewsByDay] = await Promise.all([
    prisma.pageView.count({
      where: { companyId, createdAt: { gte: startOfMonth } },
    }),
    prisma.pageView.count({
      where: { companyId, createdAt: { gte: startOfWeek } },
    }),
    prisma.pageView.count({
      where: { companyId, createdAt: { gte: startOfToday } },
    }),
    prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { companyId, createdAt: { gte: startOfWeek } },
    }),
    prisma.pageView.groupBy({
      by: ["page"],
      where: { companyId, createdAt: { gte: startOfWeek } },
      _count: { page: true },
    }),
    prisma.pageView.groupBy({
      by: ["language"],
      where: { companyId, createdAt: { gte: startOfWeek } },
      _count: { language: true },
    }),
    prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT DATE("createdAt") as date, COUNT(*) as count
      FROM page_views
      WHERE "companyId" = ${companyId}
        AND "createdAt" >= ${startOfWeek}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
  ]);

  // Get device stats from userAgent (last 7 days, one per session)
  const viewsWithUA = await prisma.pageView.findMany({
    where: {
      companyId,
      createdAt: { gte: startOfWeek },
      userAgent: { not: null },
    },
    select: { sessionId: true, userAgent: true },
    distinct: ["sessionId"],
  });

  const deviceMap = new Map<string, number>();
  const browserMap = new Map<string, number>();
  const osMap = new Map<string, number>();

  for (const view of viewsWithUA) {
    if (!view.userAgent) continue;
    const result = UAParser(view.userAgent);
    const device = result.device.type || "desktop";
    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    osMap.set(os, (osMap.get(os) || 0) + 1);
  }

  const sortByCount = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

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
    deviceStats: {
      devices: sortByCount(deviceMap),
      browsers: sortByCount(browserMap),
      os: sortByCount(osMap),
    },
  };
}

// ---- Checklist Status ----
export async function getChecklistStatus(companyId: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { companyId },
    select: {
      title: true,
      checklistMenuEdited: true,
      checklistContactsSaved: true,
      checklistBrandCustomized: true,
      startedFromScratch: true,
    },
  });

  return {
    nameSet: Boolean(restaurant?.title),
    templateChosen: true, // guaranteed by onboarding
    menuEdited: restaurant?.checklistMenuEdited ?? false,
    contactsAdded: restaurant?.checklistContactsSaved ?? false,
    brandCustomized: restaurant?.checklistBrandCustomized ?? false,
    startedFromScratch: restaurant?.startedFromScratch ?? false,
  };
}

// ---- Admin Helpers ----
export async function checkIsAdmin() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;
  return isAdminEmail(userEmail);
}
