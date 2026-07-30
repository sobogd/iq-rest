import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { restaurantHasProAccess, PRO_ACCESS_SELECT } from "./entitlements";

export const FREE_AI_IMAGE_QUOTA = 5;

/** A restaurant gets UNLIMITED AI image generation only when it has an ACTIVE
 *  non-FREE (BASIC/PRO) subscription. Trial restaurants do NOT get unlimited
 *  images — they share the same free quota of `FREE_AI_IMAGE_QUOTA` (5) as FREE
 *  plans and must upgrade to keep generating past the limit. */
export function isPaidActive(r: {
  plan: string | null;
  subscriptionStatus: string | null;
}): boolean {
  return r.subscriptionStatus === "ACTIVE" && !!r.plan && r.plan !== "FREE";
}

// Unlimited-AI entitlement including account-level PRO: a restaurant's OWN
// active BASIC/PRO sub (isPaidActive) OR an inherited PRO from another of the
// owner's restaurants. So a PRO owner's secondary (FREE-row) venues also get
// unlimited AI images, matching the "PRO = everything on every venue" promise.
async function hasUnlimitedAi(
  prisma: PrismaService,
  restaurant: {
    id: string;
    plan: string | null;
    subscriptionStatus: string | null;
    trialEndsAt?: Date | null;
    currentPeriodEnd?: Date | null;
    legacyFullAccess?: boolean | null;
  },
): Promise<boolean> {
  if (isPaidActive(restaurant)) return true;
  return restaurantHasProAccess(prisma, restaurant);
}

// Atomically reserve a free-quota slot before doing the expensive Gemini call.
// Paid plans skip the reservation (no quota); free plans bump the counter
// inside a conditional updateMany so two concurrent requests can't both pass
// the limit check before either has incremented.
export async function consumeAiImageQuota(
  prisma: PrismaService,
  restaurantId: string,
): Promise<{ isPaid: boolean }> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: PRO_ACCESS_SELECT,
  });
  if (!restaurant) throw new ForbiddenException("Not found");
  if (await hasUnlimitedAi(prisma, restaurant)) return { isPaid: true };

  const reserved = await prisma.restaurant.updateMany({
    where: { id: restaurantId, imageGenerationsUsed: { lt: FREE_AI_IMAGE_QUOTA } },
    data: { imageGenerationsUsed: { increment: 1 } },
  });
  if (reserved.count === 0) {
    throw new ForbiddenException("ai_quota_exceeded");
  }
  return { isPaid: false };
}

export async function incrementAiImageUsage(_prisma: PrismaService, _restaurantId: string) {
  // intentionally empty — already incremented in consumeAiImageQuota
}

export async function refundAiImageUsage(prisma: PrismaService, restaurantId: string) {
  await prisma.restaurant.updateMany({
    where: { id: restaurantId, imageGenerationsUsed: { gt: 0 } },
    data: { imageGenerationsUsed: { decrement: 1 } },
  });
}

export async function getAiImageUsage(prisma: PrismaService, restaurantId: string) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { imageGenerationsUsed: true, ...PRO_ACCESS_SELECT },
  });
  const paid = restaurant ? await hasUnlimitedAi(prisma, restaurant) : false;
  return {
    aiImagesUsed: restaurant?.imageGenerationsUsed ?? 0,
    aiImagesLimit: paid ? null : FREE_AI_IMAGE_QUOTA,
  };
}
