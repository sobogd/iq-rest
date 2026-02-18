import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function trackPageView(slug: string, page: string, language: string) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sqr_session_id")?.value;
    if (!sessionId) return;

    const headerStore = await headers();
    const userAgent = headerStore.get("user-agent") || null;
    const referer = headerStore.get("referer") || null;
    const ip = cookieStore.get("geo_ip")?.value || null;

    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: { companyId: true },
    });

    if (!restaurant) return;

    await prisma.pageView.create({
      data: {
        companyId: restaurant.companyId,
        sessionId,
        page,
        language,
        referrer: referer,
        userAgent,
        ip,
      },
    });
  } catch (error) {
    console.error("Track page view error:", error);
  }
}
