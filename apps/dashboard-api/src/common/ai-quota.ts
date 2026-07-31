import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { getRestaurantCapsById } from "./entitlements";

export const FREE_AI_IMAGE_QUOTA = 5;

// Unlimited-AI entitlement is now the account-level `aiUnlimited` capability
// (§3): PAID PRO only (active PRO, PRO-in-grace, or a planOverride='PRO' venue).
// A TRIAL does NOT get it and a BASIC venue does NOT get it — both share the 5
// free-quota. Account-level PRO inheritance is native (the resolver reads the
// account subscription), so no owner-scan here anymore.
async function hasUnlimitedAi(
  prisma: PrismaService,
  restaurantId: string,
): Promise<boolean> {
  const caps = await getRestaurantCapsById(prisma, restaurantId);
  return caps.aiUnlimited;
}

// Atomically reserve a free-quota slot before doing the expensive Gemini call.
// Paid plans skip the reservation (no quota); free plans bump the counter
// inside a conditional updateMany so two concurrent requests can't both pass
// the limit check before either has incremented.
export async function consumeAiImageQuota(
  prisma: PrismaService,
  restaurantId: string,
): Promise<{ isPaid: boolean }> {
  if (await hasUnlimitedAi(prisma, restaurantId)) return { isPaid: true };

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
  const [restaurant, paid] = await Promise.all([
    prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { imageGenerationsUsed: true },
    }),
    hasUnlimitedAi(prisma, restaurantId),
  ]);
  return {
    aiImagesUsed: restaurant?.imageGenerationsUsed ?? 0,
    aiImagesLimit: paid ? null : FREE_AI_IMAGE_QUOTA,
  };
}
