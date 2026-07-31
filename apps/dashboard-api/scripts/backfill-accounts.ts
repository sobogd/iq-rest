/**
 * Backfill accounts / account_members / subscriptions from the current
 * per-restaurant billing columns. Phase 1 of the billing→Account migration.
 *
 * IDEMPOTENT + DRY-RUN by default. Writes nothing unless `--apply` is passed.
 *
 *   # dry run (prints the full plan, no writes):
 *   DATABASE_URL=<dsn> npx ts-node --transpile-only \
 *     apps/dashboard-api/scripts/backfill-accounts.ts
 *
 *   # apply:
 *   DATABASE_URL=<dsn> npx ts-node --transpile-only \
 *     apps/dashboard-api/scripts/backfill-accounts.ts --apply
 *
 * Model built:
 *   - One Account per owner (a User with a RestaurantUser where addedBy IS NULL).
 *   - Every restaurant the owner owns is linked (restaurants.accountId).
 *   - AccountMembers mirror RestaurantUser: addedBy NULL → role "owner",
 *     non-null → role "manager".
 *   - legacyFullAccess=true restaurants → planOverride='PRO' (per-venue bypass).
 *   - One Subscription per account, mirroring the owner's live billing:
 *       * any active/grace PRO row      → plan PRO, appliesToRestaurantId null
 *       * else any active/past_due BASIC → plan BASIC, appliesToRestaurantId = primary
 *       * else no paid state             → no Subscription (trial/inactive lives on Account)
 *   - Account.stripeCustomerId / billingCurrency taken from the primary sub row.
 *
 * Deliberately Stripe-free: the two owners whose live sub has a NULL restaurant
 * customer (ug2ukf5p / bbqpark) get a NULL Account.stripeCustomerId here; the
 * Phase-2 reconcile (which already talks to Stripe) fills it from the sub. Those
 * are flagged in the report. The dual-write window keeps the old columns
 * authoritative, so nothing here changes live entitlement.
 */
import { PrismaClient } from "@iq-rest/db";

const APPLY = process.argv.includes("--apply");
const prisma = new PrismaClient();

const DAY_MS = 86_400_000;
const PAST_DUE_GRACE_DAYS = 3;
const now = new Date();

type R = {
  id: string;
  slug: string | null;
  plan: string | null;
  subscriptionStatus: string | null;
  billingCycle: string | null;
  billingCurrency: string;
  currentPeriodEnd: Date | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  trialEndsAt: Date | null;
  legacyFullAccess: boolean;
  accountId: string | null;
  createdAt: Date;
};

function inPastDueGrace(r: R): boolean {
  if (r.subscriptionStatus !== "PAST_DUE" || !r.currentPeriodEnd) return false;
  return r.currentPeriodEnd.getTime() + PAST_DUE_GRACE_DAYS * DAY_MS > now.getTime();
}
const isProLive = (r: R) =>
  r.plan === "PRO" && (r.subscriptionStatus === "ACTIVE" || inPastDueGrace(r));
const isBasicLive = (r: R) =>
  r.plan === "BASIC" && (r.subscriptionStatus === "ACTIVE" || r.subscriptionStatus === "PAST_DUE");

const warnings: string[] = [];
const line = (s = "") => process.stdout.write(s + "\n");

async function main() {
  line(`\n=== backfill-accounts (${APPLY ? "APPLY" : "DRY-RUN"}) @ ${now.toISOString()} ===\n`);

  // Owner memberships: RestaurantUser rows with addedBy IS NULL.
  const owners = await prisma.restaurantUser.findMany({
    where: { addedBy: null },
    select: { userId: true, restaurantId: true },
  });
  // restaurantId -> ownerUserId (gate1 guarantees exactly one owner per venue)
  const ownerOf = new Map<string, string>();
  const ownerRestaurants = new Map<string, string[]>();
  for (const o of owners) {
    if (ownerOf.has(o.restaurantId))
      warnings.push(`restaurant ${o.restaurantId} has >1 owner (addedBy null) — using first`);
    else ownerOf.set(o.restaurantId, o.userId);
  }
  for (const [rid, uid] of ownerOf) {
    if (!ownerRestaurants.has(uid)) ownerRestaurants.set(uid, []);
    ownerRestaurants.get(uid)!.push(rid);
  }

  // Every restaurant + owner-less detection.
  const allRestaurants = (await prisma.restaurant.findMany({
    select: {
      id: true, slug: true, plan: true, subscriptionStatus: true, billingCycle: true,
      billingCurrency: true, currentPeriodEnd: true, stripeSubscriptionId: true,
      stripeCustomerId: true, trialEndsAt: true, legacyFullAccess: true, accountId: true,
      createdAt: true,
    },
  })) as R[];
  const byId = new Map(allRestaurants.map((r) => [r.id, r]));
  const orphans = allRestaurants.filter((r) => !ownerOf.has(r.id));
  for (const o of orphans) warnings.push(`orphan restaurant (no owner): ${o.slug ?? o.id} — accountId NOT set`);

  // All members (owner + managers) for every owner's restaurants.
  const allMembers = await prisma.restaurantUser.findMany({
    select: { userId: true, restaurantId: true, addedBy: true },
  });

  let accountsCreated = 0, accountsReused = 0, membersUpserted = 0, restLinked = 0;
  let overridesSet = 0, subsCreated = 0;
  const subByPlan: Record<string, number> = {};

  for (const [ownerId, rids] of ownerRestaurants) {
    const owned = rids.map((id) => byId.get(id)!).filter(Boolean);

    // ── resolve subscription mirror ──────────────────────────────────────────
    const proRows = owned.filter(isProLive);
    const basicRows = owned.filter(isBasicLive);
    let primary: R | null = null;
    let plan: string | null = null;
    if (proRows.length) {
      plan = "PRO";
      primary = proRows.find((r) => r.stripeSubscriptionId) ?? proRows[0];
      if (proRows.length > 1) warnings.push(`owner ${ownerId}: ${proRows.length} live PRO venues — using ${primary.slug}`);
    } else if (basicRows.length) {
      plan = "BASIC";
      const active = basicRows.filter((r) => r.subscriptionStatus === "ACTIVE");
      const pool = active.length ? active : basicRows;
      primary = pool.find((r) => r.stripeSubscriptionId) ?? pool[0];
      if (basicRows.length > 1)
        warnings.push(
          `owner ${ownerId}: ${basicRows.length} live BASIC venues (${basicRows.map((r) => r.slug).join(", ")}) — ` +
            `sub applies to ${primary.slug}; the rest go INACTIVE at Phase 3 (NEEDS OWNER DECISION)`,
        );
    }
    if (primary && plan === "BASIC" && !primary.stripeSubscriptionId)
      warnings.push(`owner ${ownerId}: BASIC sub for ${primary.slug} has NO stripeSubscriptionId (manual/legacy state)`);
    if (primary && !primary.stripeCustomerId && primary.stripeSubscriptionId)
      warnings.push(`owner ${ownerId}: live sub ${primary.slug} has NULL restaurant customer — Account.stripeCustomerId left null (Phase-2 reconcile fills)`);

    // account fields
    const trialEndsAt = owned.reduce<Date | null>(
      (max, r) => (r.trialEndsAt && (!max || r.trialEndsAt > max) ? r.trialEndsAt : max),
      null,
    );
    const trialUsed = owned.some((r) => r.trialEndsAt != null);
    const billingCurrency = primary?.billingCurrency ?? "EUR";
    const stripeCustomerId = primary?.stripeCustomerId ?? null;
    const venueLimit = Math.max(4, owned.length);
    const overrideVenues = owned.filter((r) => r.legacyFullAccess);

    line(
      `owner ${ownerId}: venues=${owned.length} [${owned.map((r) => r.slug).join(", ")}]` +
        ` sub=${plan ?? "—"}${plan === "BASIC" ? ` →${primary!.slug}` : ""}` +
        ` cust=${stripeCustomerId ?? "—"} cur=${billingCurrency}` +
        (trialEndsAt ? ` trialEndsAt=${trialEndsAt.toISOString().slice(0, 10)}` : "") +
        (overrideVenues.length ? ` override=[${overrideVenues.map((r) => r.slug).join(",")}]` : ""),
    );

    if (plan) subByPlan[plan] = (subByPlan[plan] ?? 0) + 1;

    if (!APPLY) {
      accountsCreated++; // counted as would-create
      if (plan) subsCreated++;
      overridesSet += overrideVenues.length;
      restLinked += owned.length;
      continue;
    }

    // ── APPLY (idempotent, per-owner transaction) ────────────────────────────
    await prisma.$transaction(async (tx) => {
      // find existing account via the owner membership
      const existingOwnerMember = await tx.accountMember.findFirst({
        where: { userId: ownerId, role: "owner" },
        select: { accountId: true },
      });
      let accountId: string;
      if (existingOwnerMember) {
        accountId = existingOwnerMember.accountId;
        accountsReused++;
        await tx.account.update({
          where: { id: accountId },
          data: { stripeCustomerId, billingCurrency, trialEndsAt, trialUsed, venueLimit },
        });
      } else {
        const acc = await tx.account.create({
          data: { stripeCustomerId, billingCurrency, trialEndsAt, trialUsed, venueLimit },
        });
        accountId = acc.id;
        accountsCreated++;
      }

      // members: owner + managers of the owned restaurants
      const memberRows = allMembers.filter((m) => rids.includes(m.restaurantId));
      const roleByUser = new Map<string, string>();
      for (const m of memberRows) {
        const role = m.addedBy === null ? "owner" : "manager";
        // owner role wins over manager if a user appears as both
        if (roleByUser.get(m.userId) !== "owner") roleByUser.set(m.userId, role);
      }
      for (const [userId, role] of roleByUser) {
        await tx.accountMember.upsert({
          where: { accountId_userId: { accountId, userId } },
          create: { accountId, userId, role },
          update: { role },
        });
        membersUpserted++;
      }

      // link restaurants + planOverride
      for (const r of owned) {
        await tx.restaurant.update({
          where: { id: r.id },
          data: { accountId, planOverride: r.legacyFullAccess ? "PRO" : null },
        });
        restLinked++;
        if (r.legacyFullAccess) overridesSet++;
      }

      // subscription (upsert by accountId)
      if (plan && primary) {
        await tx.subscription.upsert({
          where: { accountId },
          create: {
            accountId,
            plan,
            billingCycle: primary.billingCycle,
            status: primary.subscriptionStatus ?? "INACTIVE",
            currentPeriodEnd: primary.currentPeriodEnd,
            stripeSubscriptionId: primary.stripeSubscriptionId,
            appliesToRestaurantId: plan === "BASIC" ? primary.id : null,
          },
          update: {
            plan,
            billingCycle: primary.billingCycle,
            status: primary.subscriptionStatus ?? "INACTIVE",
            currentPeriodEnd: primary.currentPeriodEnd,
            stripeSubscriptionId: primary.stripeSubscriptionId,
            appliesToRestaurantId: plan === "BASIC" ? primary.id : null,
          },
        });
        subsCreated++;
      }
    });
  }

  // ── report ────────────────────────────────────────────────────────────────
  line(`\n─── summary (${APPLY ? "APPLIED" : "DRY-RUN"}) ───`);
  line(`owners processed:        ${ownerRestaurants.size}`);
  line(`accounts created:        ${accountsCreated}${APPLY ? ` (reused ${accountsReused})` : ""}`);
  line(`restaurants linked:      ${restLinked}`);
  line(`members upserted:        ${membersUpserted}`);
  line(`planOverride='PRO' set:  ${overridesSet}`);
  line(`subscriptions:           ${subsCreated}  ${JSON.stringify(subByPlan)}`);
  line(`orphan restaurants:      ${orphans.length}`);

  line(`\n─── WARNINGS (${warnings.length}) ───`);
  for (const w of warnings) line("  ⚠ " + w);
  if (!warnings.length) line("  none");

  // post-apply invariants
  if (APPLY) {
    const [restNoAcct, accountsN, subsN, membersN] = await Promise.all([
      prisma.restaurant.count({ where: { accountId: null } }),
      prisma.account.count(),
      prisma.subscription.count(),
      prisma.accountMember.count(),
    ]);
    line(`\n─── post-apply invariants ───`);
    line(`restaurants with NULL accountId: ${restNoAcct}  (expected = orphans = ${orphans.length})`);
    line(`accounts=${accountsN} subscriptions=${subsN} account_members=${membersN}`);
  }
  line("");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
