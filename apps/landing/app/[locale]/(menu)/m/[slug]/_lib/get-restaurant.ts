import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Cached restaurant query — deduplicated within a single request via React.cache().
 * Layout, page, and track can all call this without causing duplicate DB queries.
 */
export const getRestaurantBySlug = cache(async (slug: string) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      hideTitle: true,
      slug: true,
      source: true,
      address: true,
      phone: true,
      instagram: true,
      whatsapp: true,
      accentColor: true,
      currency: true,
      languages: true,
      defaultLanguage: true,
      reservationsEnabled: true,
      ordersEnabled: true,
      orderMode: true,
      companyId: true,
      x: true,
      y: true,
      reservationMode: true,
      reservationSlotMinutes: true,
      company: {
        select: {
          id: true,
          plan: true,
          subscriptionStatus: true,
          trialEndsAt: true,
          scanLimit: true,
          orderLimit: true,
        },
      },
      _count: {
        select: {
          tables: {
            where: { isActive: true },
          },
        },
      },
    },
  });

  return restaurant;
});
