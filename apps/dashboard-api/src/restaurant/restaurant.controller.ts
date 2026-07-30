import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthGuard, type AuthedRequest } from "../auth/auth.guard";
import { RestaurantService } from "./restaurant.service";
import { OnboardingSeedService } from "../onboarding/onboarding-seed.service";
import { PrismaService } from "../prisma/prisma.service";
import { callGeminiImage, uploadGeneratedImage } from "../common/gemini-image";
import { consumeAiImageQuota, getAiImageUsage, refundAiImageUsage } from "../common/ai-quota";
import { ownerHasProAccess, restaurantHasProAccess } from "../common/entitlements";
import { getRequestCurrency } from "../common/geo";

const ACTIVE_RESTAURANT_COOKIE = "iqr_active_restaurant_id";
// 1 year — purely a UI convenience for the browser; AuthGuard validates the
// value against the user's RestaurantUser attachments on every request, so a
// stale cookie is harmless (falls back to primary).
const ACTIVE_COOKIE_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

@Controller()
@UseGuards(AuthGuard)
export class RestaurantController {
  constructor(
    private readonly svc: RestaurantService,
    private readonly prisma: PrismaService,
    private readonly onboarding: OnboardingSeedService,
  ) {}

  // ---- Active restaurant ----

  @Get("restaurant")
  async get(@Req() req: Request) {
    const { restaurantId } = (req as AuthedRequest).authUser;
    return this.svc.getActive(restaurantId);
  }

  @Post("restaurant")
  async upsert(@Req() req: Request, @Body() body: Record<string, unknown>) {
    const { userId, restaurantId } = (req as AuthedRequest).authUser;
    const existing = await this.prisma.restaurant.findUnique({ where: { id: restaurantId } });
    if (!existing && !body.currency) {
      body = { ...body, currency: await getRequestCurrency(req) };
    }
    if (!existing && !body.timezone) {
      const tz = String(req.headers["cf-timezone"] ?? "").trim();
      if (tz) {
        try {
          new Intl.DateTimeFormat("en-US", { timeZone: tz });
          body = { ...body, timezone: tz };
        } catch {
          // invalid header value, fall through to schema default
        }
      }
    }
    return this.svc.upsert(userId, existing?.id ?? null, body);
  }

  @Put("restaurant/languages")
  async setLanguages(
    @Req() req: Request,
    @Body() body: { languages: string[]; defaultLanguage: string },
  ) {
    const { userId, restaurantId } = (req as AuthedRequest).authUser;
    return this.svc.upsert(userId, restaurantId, {
      languages: body.languages,
      defaultLanguage: body.defaultLanguage,
    });
  }

  /** Save the public-menu custom-text overrides for the active restaurant.
   *  Body: { customTexts: { [locale]: { [i18nKey]: string } } }. */
  @Put("restaurant/custom-texts")
  async setCustomTexts(
    @Req() req: Request,
    @Body() body: { customTexts?: unknown },
  ) {
    const { userId, restaurantId, isImpersonating } = (req as AuthedRequest).authUser;
    // Admin-only surface: editable solely from inside an admin-impersonation
    // session, so restaurant owners can't touch the public-menu custom texts.
    if (!isImpersonating) throw new ForbiddenException("Admin only");
    return this.svc.saveCustomTexts(userId, restaurantId, body?.customTexts ?? {});
  }

  /** Gap-fill the custom-text overrides into every enabled language via Gemini
   *  (translates from the default language; never overwrites a manual value). */
  @Post("restaurant/custom-texts/translate")
  async translateCustomTexts(@Req() req: Request) {
    const { userId, restaurantId, isImpersonating } = (req as AuthedRequest).authUser;
    if (!isImpersonating) throw new ForbiddenException("Admin only");
    return this.svc.translateCustomTexts(userId, restaurantId);
  }

  @Post("restaurant/generate-background")
  async generateBackground(@Req() req: Request, @Body() body: { prompt?: string }) {
    const { restaurantId } = (req as AuthedRequest).authUser;
    const { isPaid } = await consumeAiImageQuota(this.prisma, restaurantId);
    const userPrompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    let prompt: string;
    if (userPrompt) {
      prompt = [
        userPrompt,
        "Vertical portrait composition (9:16), suitable as a mobile background.",
        "Dark moody atmosphere — the surface should be dark so white text is readable on top.",
        "Soft, warm, slightly dim lighting. Rich but muted tones.",
        "No people, no hands, no text, no words, no letters, no numbers, no logos, no watermarks, no labels, no signs.",
        "Professional photography.",
      ].join("\n");
    } else {
      const items = await this.prisma.item.findMany({
        where: { restaurantId, isActive: true, deletedAt: null },
        select: { name: true },
        take: 6,
      });
      if (items.length === 0) {
        throw new BadRequestException("No menu items to generate background from");
      }
      const sampleItems = items.map((i) => i.name).join(", ");
      prompt = [
        "Top-down flat lay photograph on an elegant dark dining table.",
        `ONLY these items are on the table, nothing else: ${sampleItems}.`,
        "Style: restaurant cuisine. Each item in its own plate/glass/bowl, beautifully arranged.",
        "Bird's eye view, looking straight down at the table.",
        "Spread across the table with space between them. Elegant plating.",
        "Soft, warm, slightly dim lighting. Rich but muted tones.",
        "Dark moody atmosphere — the table surface should be dark so white text is readable on top.",
        "Do NOT add any items that are not in the list above. No extra food, no desserts, no drinks unless listed.",
        "No people, no hands, no text, no words, no letters, no numbers, no logos, no watermarks, no labels, no signs.",
        "Professional food photography. Vertical portrait (9:16).",
      ].join("\n");
    }

    try {
      const b64 = await callGeminiImage({ prompt, aspectRatio: "9:16", timeoutMs: 50_000 });
      const url = await uploadGeneratedImage(b64, {
        pathPrefix: "restaurants",
        restaurantId,
        filenamePrefix: "bg",
        resize: { w: 1080, h: 1920, fit: "cover" },
        quality: 85,
      });
      return { url };
    } catch (err) {
      if (!isPaid) await refundAiImageUsage(this.prisma, restaurantId);
      throw err;
    }
  }

  @Post("restaurant/dismiss-scan-banner")
  async dismissScanBanner(@Req() req: Request) {
    const { restaurantId } = (req as AuthedRequest).authUser;
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { scanBannerDismissed: true },
    });
    return { ok: true };
  }

  /** Mark a first-login onboarding step as handled so its modal never reappears.
   *  `name` → the owner entered a name or skipped; `fill` → they picked a fill
   *  type (scan / start-from-scratch). The demo choice goes through
   *  /onboarding/fill-demo which sets the fill flag itself. */
  @Post("onboarding/step")
  async onboardingStep(@Req() req: Request, @Body() body: { step?: "name" | "fill" }) {
    const { restaurantId } = (req as AuthedRequest).authUser;
    const data =
      body?.step === "name"
        ? { onboardingNameDone: true }
        : body?.step === "fill"
          ? { onboardingFillDone: true }
          : null;
    if (!data) throw new BadRequestException("step must be 'name' or 'fill'");
    await this.prisma.restaurant.update({ where: { id: restaurantId }, data });
    return { ok: true };
  }

  /** Onboarding "fill with demo data" choice — seed the active restaurant with
   *  demo data (menu + tables + bookings + orders) and mark the fill step done.
   *  Idempotent: the seed aborts if the restaurant already has items, so a
   *  double-click can't duplicate it. */
  @Post("onboarding/fill-demo")
  async fillDemo(@Req() req: Request) {
    const { restaurantId } = (req as AuthedRequest).authUser;
    const result = await this.onboarding.fillDemo(restaurantId);
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { onboardingFillDone: true },
    });
    return { ok: result.ok };
  }

  @Get("restaurant/subscription")
  async subscription(@Req() req: Request) {
    // Per-restaurant billing: the subscription state lives on the ACTIVE
    // restaurant. `canManageBilling` is false for users attached as managers
    // (RestaurantUser.addedBy non-null) — they see the page but can't checkout
    // / cancel on the owner's behalf.
    const { restaurantId, viaGrant, isDemo } = (req as AuthedRequest).authUser;
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        plan: true,
        billingCycle: true,
        subscriptionStatus: true,
        currentPeriodEnd: true,
        paymentProcessing: true,
        trialEndsAt: true,
        stripeSubscriptionId: true,
        legacyFullAccess: true,
      },
    });
    if (!restaurant) return null;
    const usage = await getAiImageUsage(this.prisma, restaurantId);
    return {
      plan: restaurant.plan,
      billingCycle: restaurant.billingCycle,
      subscriptionStatus: restaurant.subscriptionStatus,
      currentPeriodEnd: restaurant.currentPeriodEnd ? restaurant.currentPeriodEnd.toISOString() : null,
      paymentProcessing: restaurant.paymentProcessing,
      trialEndsAt: restaurant.trialEndsAt ? restaurant.trialEndsAt.toISOString() : null,
      // PRO-feature entitlement (orders / kitchen / reservations). The SPA gates
      // those surfaces on this single flag instead of re-deriving plan logic.
      // Account-level: a PRO owner's other (FREE-row) restaurants inherit PRO.
      proFeatures: await restaurantHasProAccess(this.prisma, restaurant),
      aiImagesUsed: usage.aiImagesUsed,
      aiImagesLimit: usage.aiImagesLimit,
      // Demo accounts can't pay — hide the billing UI (the SPA gates on this).
      canManageBilling: !viaGrant && !isDemo,
    };
  }

  // ---- Multi-restaurant endpoints ----

  @Get("restaurants/slug-preview")
  async slugPreview(@Query("name") name = "") {
    const trimmed = (name || "").trim();
    if (!trimmed) return { slug: "" };
    return { slug: await this.svc.previewSlug(trimmed) };
  }

  @Get("restaurants")
  async list(@Req() req: Request) {
    const { userId, restaurantId, viaGrant } = (req as AuthedRequest).authUser;
    const list = await this.svc.listForUser(userId);
    return {
      activeId: restaurantId,
      // Account-level PRO gate for the "+ Add restaurant" button: only an owner
      // who holds PRO on any of their restaurants can create more venues. FREE/
      // BASIC owners are limited to their single restaurant. The SPA hides the
      // add button + shows a paid-only hint when this is false.
      isPaid: await ownerHasProAccess(this.prisma, [userId]),
      canManageBilling: !viaGrant,
      restaurants: list,
    };
  }

  @Post("restaurants")
  async create(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { name: string; duplicateFromId?: string | null },
  ) {
    const { userId, isDemo } = (req as AuthedRequest).authUser;
    // Demo accounts can't create extra restaurants — their data is ephemeral
    // and the multi-restaurant flow is a paid-account feature. The SPA hides
    // the "+ Add restaurant" button for demo users; this is the server-side
    // guard against a hand-crafted request.
    if (isDemo) throw new ForbiddenException("Demo accounts cannot create restaurants");
    const created = await this.svc.createForCompany(userId, body);
    // Auto-switch the cookie so the next request lands on the new restaurant.
    res.cookie(ACTIVE_RESTAURANT_COOKIE, created.id, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: ACTIVE_COOKIE_MAX_AGE_MS,
      path: "/",
    });
    return created;
  }

  @Post("restaurants/active")
  async setActive(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { id: string },
  ) {
    const { userId } = (req as AuthedRequest).authUser;
    if (!body?.id) throw new BadRequestException("id required");
    // Allowed targets: any restaurant the user is attached to via the flat
    // RestaurantUser access model.
    const attached = await this.prisma.restaurantUser.findUnique({
      where: { restaurantId_userId: { restaurantId: body.id, userId } },
      select: { restaurantId: true },
    });
    if (!attached) throw new ForbiddenException("Not your restaurant");
    res.cookie(ACTIVE_RESTAURANT_COOKIE, attached.restaurantId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: ACTIVE_COOKIE_MAX_AGE_MS,
      path: "/",
    });
    return { activeId: attached.restaurantId };
  }

  @Delete("restaurants/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: Request, @Param("id") id: string) {
    // Only the original creator (RestaurantUser.addedBy === null) can delete;
    // attached managers can't. Service throws otherwise.
    const { userId } = (req as AuthedRequest).authUser;
    await this.svc.deleteForUser(userId, id);
  }
}
