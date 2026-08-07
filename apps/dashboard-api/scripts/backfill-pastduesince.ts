// One-off backfill: set Subscription.pastDueSince for existing PAST_DUE subs to
// the date their renewal FIRST failed (earliest OPEN invoice in Stripe). Going
// forward the webhook + reconcile stamp this automatically; this closes the gap
// for rows that were already PAST_DUE before the pastDueSince column existed.
//
// Why: the PAST_DUE grace window is now anchored on pastDueSince (exact failure
// moment). Rows without it fall back to the coarse interval heuristic
// (currentPeriodEnd − one interval); this backfill makes them exact.
//
// Usage (through an SSH tunnel to the prod DB, with DATABASE_URL + STRIPE_SECRET_KEY):
//   npx tsx scripts/backfill-pastduesince.ts          # dry-run: prints old→new grace
//   npx tsx scripts/backfill-pastduesince.ts --apply  # writes pastDueSince
//
// Idempotent: rows that already carry a pastDueSince are left untouched.

import { PrismaClient } from "@iq-rest/db";
import Stripe from "stripe";

const APPLY = process.argv.includes("--apply");
const PAST_DUE_GRACE_DAYS = 3; // keep in sync with @iq-rest/entitlements
const DAY_MS = 86_400_000;
const INTERVAL_DAYS: Record<string, number> = { month: 30, MONTHLY: 30, year: 365, YEARLY: 365 };

const prisma = new PrismaClient();

function stripeClient(): InstanceType<typeof Stripe> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key, { typescript: true });
}

function fmt(d: Date | null): string {
  return d ? d.toISOString().slice(0, 16).replace("T", " ") : "—";
}

// The old (heuristic) grace anchor: period start = currentPeriodEnd − one interval.
function heuristicGraceEnd(currentPeriodEnd: Date | null, interval: string | null): Date | null {
  if (!currentPeriodEnd) return null;
  const days = (interval && INTERVAL_DAYS[interval]) || 30;
  return new Date(currentPeriodEnd.getTime() - days * DAY_MS + PAST_DUE_GRACE_DAYS * DAY_MS);
}

// Earliest OPEN (unpaid) invoice for a subscription = the failed renewal that
// put it into PAST_DUE. Returns its creation date, or null if none found.
async function firstFailedInvoiceDate(
  stripe: InstanceType<typeof Stripe>,
  subscriptionId: string,
): Promise<Date | null> {
  let earliest: number | null = null;
  for await (const inv of stripe.invoices.list({ subscription: subscriptionId, status: "open", limit: 100 })) {
    if (typeof inv.created === "number" && (earliest === null || inv.created < earliest)) {
      earliest = inv.created;
    }
  }
  return earliest === null ? null : new Date(earliest * 1000);
}

async function main() {
  const stripe = stripeClient();

  // NB: status is a TEXT column — never filter it in a Prisma WHERE (it 500s on
  // the enum cast). Fetch by the safe stripeSubscriptionId predicate, filter in JS.
  const rows = await prisma.subscription.findMany({
    where: { stripeSubscriptionId: { not: null } },
    select: {
      id: true,
      status: true,
      pastDueSince: true,
      currentPeriodEnd: true,
      interval: true,
      billingCycle: true,
      stripeSubscriptionId: true,
      account: { select: { restaurants: { select: { id: true, title: true }, take: 1, orderBy: { createdAt: "asc" } } } },
    },
  });
  const pastDue = rows.filter((r) => r.status === "PAST_DUE");

  console.log(`PAST_DUE subs: ${pastDue.length} (of ${rows.length} with a Stripe id).\n`);
  console.log(
    `${"venue".padEnd(22)} ${"oldGraceEnd(heur)".padEnd(18)} ${"newAnchor(fail)".padEnd(16)} ${"newGraceEnd".padEnd(16)} old→new inGrace`,
  );

  let toWrite = 0;
  let skippedHasAnchor = 0;
  let noInvoice = 0;
  const now = Date.now();

  for (const r of pastDue) {
    const venue = (r.account?.restaurants[0]?.title ?? r.account?.restaurants[0]?.id ?? "?").slice(0, 22);

    if (r.pastDueSince) {
      skippedHasAnchor++;
      console.log(`  [skip] ${venue} — already anchored (${fmt(r.pastDueSince)})`);
      continue;
    }

    const failDate = await firstFailedInvoiceDate(stripe, r.stripeSubscriptionId as string);
    if (!failDate) {
      noInvoice++;
      console.log(`  [warn] ${venue} — no open invoice found in Stripe; left NULL (falls back to interval heuristic)`);
      continue;
    }

    const oldGraceEnd = heuristicGraceEnd(r.currentPeriodEnd, r.interval ?? r.billingCycle);
    const newGraceEnd = new Date(failDate.getTime() + PAST_DUE_GRACE_DAYS * DAY_MS);
    const oldInGrace = oldGraceEnd ? oldGraceEnd.getTime() > now : false;
    const newInGrace = newGraceEnd.getTime() > now;

    console.log(
      `  [${APPLY ? "set " : "dry "}] ${venue.padEnd(22)} ${fmt(oldGraceEnd).padEnd(18)} ${fmt(failDate).padEnd(16)} ${fmt(newGraceEnd).padEnd(16)} ${oldInGrace}→${newInGrace}`,
    );

    if (APPLY) {
      await prisma.subscription.update({ where: { id: r.id }, data: { pastDueSince: failDate } });
    }
    toWrite++;
  }

  console.log(
    `\nResult — ${APPLY ? "written" : "would write"}: ${toWrite}, already anchored: ${skippedHasAnchor}, no invoice: ${noInvoice}`,
  );
  if (!APPLY) console.log("Re-run with --apply to commit changes.");
}

main()
  .catch((e) => {
    console.error("FAILED:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
