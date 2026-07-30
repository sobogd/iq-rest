import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { restaurantHasProAccess, PRO_ACCESS_SELECT } from "./entitlements";

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
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: PRO_ACCESS_SELECT,
    });
    if (!restaurant || !(await restaurantHasProAccess(this.prisma, restaurant))) {
      throw new ForbiddenException("feature_requires_pro");
    }
    return true;
  }
}
