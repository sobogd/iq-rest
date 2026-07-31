import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { getRestaurantCapsById } from "./entitlements";

// Blocks PRO-only surfaces (orders, kitchen, reservations) for restaurants that
// aren't entitled. Place AFTER the auth guard (AuthGuard / UserOrDeviceGuard)
// so `req.authUser.restaurantId` is already populated — works for both
// cookie-session admins and paired-device (WAITER/RESERVATION) callers.
@Injectable()
export class ProFeatureGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const restaurantId = (req as { authUser?: { restaurantId?: string } }).authUser
      ?.restaurantId;
    if (!restaurantId) throw new ForbiddenException("feature_requires_pro");
    // Account-level entitlement (§3): orders/KDS/reservations are the PRO-tier
    // bundle — they move together (all true for PRO/trial, all false for BASIC /
    // inactive), so `orders` stands for "has PRO features".
    const caps = await getRestaurantCapsById(this.prisma, restaurantId);
    if (!caps.orders) {
      throw new ForbiddenException("feature_requires_pro");
    }
    return true;
  }
}
