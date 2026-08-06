import { ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export const FREE_AI_IMAGE_QUOTA = 5;

// AI-image generation is capped at FREE_AI_IMAGE_QUOTA for EVERY venue — there is
// no unlimited tier anymore (the `aiUnlimited` entitlement was removed; it was
// never sold). `isPaid` in the return shape stays for call-site compatibility
// but is always false now.
export async function consumeAiImageQuota(
  prisma: PrismaService,
  restaurantId: string,
): Promise<{ isPaid: boolean }> {
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
    select: { imageGenerationsUsed: true },
  });
  return {
    aiImagesUsed: restaurant?.imageGenerationsUsed ?? 0,
    aiImagesLimit: FREE_AI_IMAGE_QUOTA,
  };
}
