import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";
import { getStripe } from "../common/stripe";
import type { SubscriptionStatus } from "@iq-rest/db";

// Stripe subscription.status → our SubscriptionStatus (mirrors the mapping in
// stripe.controller applySubscription).
function mapStripeStatus(s: string): SubscriptionStatus {
  switch (s) {
    case "active":
    case "trialing":
      return "ACTIVE";
    case "past_due":
      return "PAST_DUE";
    case "canceled":
    case "unpaid":
      return "CANCELED";
    case "incomplete":
    case "incomplete_expired":
      return "EXPIRED";
    default:
      return "INACTIVE";
  }
}

/**
 * Nightly self-heal for the account Subscription table (billing→Account model).
 *
 * Webhooks are the primary path, but a missed/half-processed event can leave a
 * Subscription's status/period drifted from Stripe. This cron pulls the live
 * subscription for every row that carries a Stripe id and reconciles status +
 * currentPeriodEnd. Idempotent; per-sub errors are isolated so one bad sub can't
 * abort the run. dashboard-api runs as a single fork in prod, so no double-fire.
 */
@Injectable()
export class StripeReconcileService {
  private readonly logger = new Logger(StripeReconcileService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async reconcile(): Promise<void> {
    const subs = await this.prisma.subscription.findMany({
      where: { stripeSubscriptionId: { not: null } },
      select: {
        id: true,
        status: true,
        currentPeriodEnd: true,
        pastDueSince: true,
        stripeSubscriptionId: true,
      },
    });
    if (subs.length === 0) return;

    const stripe = getStripe();
    let healed = 0;
    for (const sub of subs) {
      try {
        const live = (await stripe.subscriptions.retrieve(
          sub.stripeSubscriptionId as string,
        )) as unknown as {
          status: string;
          current_period_end?: number;
          items?: { data?: Array<{ current_period_end?: number }> };
        };
        const status = mapStripeStatus(live.status);
        const periodTs = live.items?.data?.[0]?.current_period_end ?? live.current_period_end;
        const currentPeriodEnd =
          typeof periodTs === "number" && periodTs > 0 ? new Date(periodTs * 1000) : null;
        // PAST_DUE grace anchor (pastDueSince): keep an existing one; stamp now
        // only when THIS reconcile is the one catching the ACTIVE→PAST_DUE
        // transition (a webhook was missed). An already-PAST_DUE row with a null
        // anchor is left untouched — the one-off Stripe backfill fills the real
        // first-failure date; inventing "now" here would race it and be wrong
        // (the entitlements grace falls back to the period-start heuristic mean-
        // while, so access is still bounded).
        let pastDueSince: Date | null;
        if (status === "PAST_DUE") {
          pastDueSince = sub.pastDueSince ?? (sub.status !== "PAST_DUE" ? new Date() : null);
        } else {
          pastDueSince = null;
        }
        const drift =
          status !== sub.status ||
          (currentPeriodEnd?.getTime() ?? 0) !== (sub.currentPeriodEnd?.getTime() ?? 0) ||
          (pastDueSince?.getTime() ?? 0) !== (sub.pastDueSince?.getTime() ?? 0);
        if (drift) {
          await this.prisma.subscription.update({
            where: { id: sub.id },
            data: { status, currentPeriodEnd, pastDueSince, updatedFromStripeAt: new Date() },
          });
          healed++;
        }
      } catch (err) {
        const code = (err as { code?: string })?.code;
        if (code === "resource_missing") {
          // Subscription deleted at Stripe → mark canceled + drop the dangling id.
          await this.prisma.subscription
            .update({
              where: { id: sub.id },
              data: {
                status: "CANCELED",
                pastDueSince: null,
                stripeSubscriptionId: null,
                updatedFromStripeAt: new Date(),
              },
            })
            .catch(() => undefined);
          healed++;
        } else {
          this.logger.warn(
            `reconcile ${sub.stripeSubscriptionId}: ${(err as Error)?.message ?? err}`,
          );
        }
      }
    }
    if (healed > 0) {
      this.logger.log(`stripe reconcile: healed ${healed}/${subs.length} subscriptions`);
    }
  }
}
