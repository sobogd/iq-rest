import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { getRestaurantCapsById } from "./entitlements";

// Blocks a capability-specific surface for restaurants that aren't entitled to
// it. Place AFTER the auth guard (AuthGuard / UserOrDeviceGuard) so
// `req.authUser.restaurantId` is already populated — works for both
// cookie-session admins and paired-device (WAITER/RESERVATION) callers.
//
// à-la-carte (billing-features-constructor): orders/KDS and reservations are
// INDEPENDENT add-ons — a venue may hold one without the other. Each surface
// must gate on its OWN capability, never a shared "has PRO" flag: gating
// reservations on `caps.orders` would lock a reservations-only buyer out of
// their own bookings (and leak reservations to an orders-only buyer). Orders and
// KDS still move together (`flagsFromSelection` sets featOrders==featKds), so
// `orders` covers both.
async function assertCapability(
  prisma: PrismaService,
  req: Request,
  cap: "orders" | "reservations",
): Promise<boolean> {
  const restaurantId = (req as { authUser?: { restaurantId?: string } }).authUser?.restaurantId;
  if (!restaurantId) throw new ForbiddenException("feature_requires_pro");
  const caps = await getRestaurantCapsById(prisma, restaurantId);
  if (!caps[cap]) throw new ForbiddenException("feature_requires_pro");
  return true;
}

// Orders + KDS surface (caps.orders).
@Injectable()
export class ProFeatureGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    return assertCapability(this.prisma, ctx.switchToHttp().getRequest<Request>(), "orders");
  }
}

// Reservations surface (caps.reservations) — a separate à-la-carte add-on.
@Injectable()
export class ReservationFeatureGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    return assertCapability(this.prisma, ctx.switchToHttp().getRequest<Request>(), "reservations");
  }
}
