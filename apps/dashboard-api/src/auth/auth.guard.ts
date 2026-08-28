import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import {
  ADMIN_ORIG_EMAIL_COOKIE,
  ADMIN_ORIG_SESSION_COOKIE,
  EMAIL_COOKIE,
  SESSION_COOKIE,
  refreshAuthCookies,
} from "../common/session-utils";

const ACTIVE_RESTAURANT_COOKIE = "iqr_active_restaurant_id";
const ACTIVE_RESTAURANT_HEADER = "x-restaurant-id";

export interface AuthedRequest extends Request {
  authUser: {
    userId: string;
    email: string;
    onboardingStep: number;
    restaurantId: string;
    primaryRestaurantId: string;
    // True when the active restaurant attachment was created by someone else
    // (RestaurantUser.addedBy is non-null). The original creator of a
    // restaurant has addedBy = null. Gates billing/delete on attached-as-
    // manager restaurants.
    viaGrant: boolean;
    // Ephemeral demo account — gates billing (can't pay) and surfaces the
    // "save your menu" banner client-side.
    isDemo: boolean;
    // True only inside a validated admin-impersonation session. Gates
    // admin-only edits (e.g. public-menu custom texts).
    isImpersonating: boolean;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();
    const cookies = req.cookies as Record<string, string | undefined> | undefined;
    const session = cookies?.[SESSION_COOKIE];
    const email = cookies?.[EMAIL_COOKIE];
    if (!session || !email) throw new UnauthorizedException();
    const adminOrigSession = cookies?.[ADMIN_ORIG_SESSION_COOKIE];
    const adminOrigEmail = cookies?.[ADMIN_ORIG_EMAIL_COOKIE];
    const user = await this.auth.resolveSession(session, email, {
      adminOrigSession,
      adminOrigEmail,
    });

    const requested =
      (req.headers[ACTIVE_RESTAURANT_HEADER] as string | undefined) ||
      cookies?.[ACTIVE_RESTAURANT_COOKIE];
    const { activeId, primaryId, viaGrant } =
      await this.resolveActiveRestaurant(user.userId, requested);

    // Sliding session: a login lasts until an explicit logout, so every
    // authenticated request pushes the cookie expiry back out and clears any
    // leftover expiry on the session row. Doing it here (rather than only at
    // login) is what upgrades sessions issued under the old 7-day cookie
    // without asking anyone to sign in again.
    refreshAuthCookies(
      ctx.switchToHttp().getResponse<Response>(),
      cookies,
      this.config.get<string>("COOKIE_DOMAIN") || undefined,
    );
    void this.auth.extendSession(adminOrigSession || session);

    (req as AuthedRequest).authUser = {
      userId: user.userId,
      email: user.email,
      onboardingStep: user.onboardingStep,
      restaurantId: activeId,
      primaryRestaurantId: primaryId,
      viaGrant,
      isDemo: user.isDemo,
      isImpersonating: user.isImpersonating,
    };
    return true;
  }

  /** Resolve the active restaurant from the user's flat RestaurantUser
   *  attachments. Requires at least one row — a newly-signed-up user without
   *  any seeded restaurant gets 401 here, which is fine since onboarding seeds
   *  the first restaurant + RestaurantUser inside verifyOtp/verifyGoogle/
   *  verifyApple before the SPA ever hits an authed endpoint. */
  private async resolveActiveRestaurant(
    userId: string,
    requested: string | undefined,
  ): Promise<{ activeId: string; primaryId: string; viaGrant: boolean }> {
    const rus = await this.prisma.restaurantUser.findMany({
      where: { userId },
      select: {
        addedBy: true,
        addedAt: true,
        restaurant: { select: { id: true, createdAt: true } },
      },
      orderBy: { addedAt: "asc" },
    });
    if (rus.length === 0) throw new UnauthorizedException("No restaurant for user");
    const primaryId = rus[0].restaurant.id;
    const chosen =
      (requested && rus.find((ru) => ru.restaurant.id === requested)) || rus[0];
    return {
      activeId: chosen.restaurant.id,
      primaryId,
      viaGrant: !!chosen.addedBy,
    };
  }
}
