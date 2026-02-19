/**
 * One-time script to link orphaned dashboard sessions to users.
 *
 * Strategy: match orphan sessions (no userId, have dashboard events)
 * to users by IP address correlation with already-linked sessions.
 * Falls back to auth_signup timestamp correlation.
 *
 * Usage: npx tsx scripts/link-orphan-dashboard-sessions.ts [--dry-run]
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const isDryRun = process.argv.includes("--dry-run");

const DASHBOARD_EVENTS = [
  "showed_home",
  "showed_menu",
  "showed_design",
  "showed_contacts",
  "showed_billing",
  "showed_settings",
  "showed_analytics",
  "showed_qr_menu",
  "showed_support",
  "showed_reservations",
  "showed_item_form",
  "showed_category_form",
];

async function main() {
  console.log(
    isDryRun ? "=== DRY RUN ===" : "=== LINKING ORPHAN DASHBOARD SESSIONS ==="
  );

  // Find orphan sessions with dashboard events
  const orphans = await prisma.session.findMany({
    where: {
      userId: null,
      events: {
        some: {
          event: { in: DASHBOARD_EVENTS },
        },
      },
    },
    include: {
      events: {
        orderBy: { createdAt: "asc" },
        select: { event: true, createdAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`Found ${orphans.length} orphan session(s) with dashboard events\n`);

  let linkedByIp = 0;
  let linkedBySignup = 0;
  let skipped = 0;

  for (const session of orphans) {
    let matched = false;

    // Strategy 1: match by IP
    if (session.ip) {
      const linkedSession = await prisma.session.findFirst({
        where: {
          ip: session.ip,
          userId: { not: null },
        },
        select: { userId: true, companyId: true },
      });

      if (linkedSession) {
        console.log(
          `IP MATCH: ${session.id} (${session.ip}, ${session.country})` +
            ` → userId ${linkedSession.userId}` +
            (session.gclid ? ` [gclid: ${session.gclid.slice(0, 20)}...]` : "") +
            ` (${session.events.length} events)`
        );

        if (!isDryRun) {
          // Merge events into existing user session if one exists, otherwise just set userId
          const existingUserSession = await prisma.session.findFirst({
            where: { userId: linkedSession.userId },
            orderBy: { createdAt: "asc" },
          });

          if (existingUserSession && existingUserSession.id !== session.id) {
            // Move events to existing session
            await prisma.analyticsEvent.updateMany({
              where: { sessionId: session.id },
              data: { sessionId: existingUserSession.id },
            });

            // Merge first-touch data
            await prisma.session.update({
              where: { id: existingUserSession.id },
              data: {
                gclid: existingUserSession.gclid ?? session.gclid,
                keyword: existingUserSession.keyword ?? session.keyword,
                country: existingUserSession.country ?? session.country,
              },
            });

            // Delete orphan
            await prisma.session.delete({ where: { id: session.id } });
            console.log(`  → Merged into ${existingUserSession.id} & deleted orphan`);
          } else {
            await prisma.session.update({
              where: { id: session.id },
              data: {
                userId: linkedSession.userId,
                companyId: linkedSession.companyId,
              },
            });
            console.log(`  → Linked directly`);
          }
        }
        linkedByIp++;
        matched = true;
      }
    }

    // Strategy 2: auth_signup timestamp correlation
    if (!matched) {
      const signupEvent = session.events.find((e) => e.event === "auth_signup");
      if (signupEvent) {
        const windowMs = 60_000;
        const from = new Date(signupEvent.createdAt.getTime() - windowMs);
        const to = new Date(signupEvent.createdAt.getTime() + windowMs);

        const candidates = await prisma.user.findMany({
          where: { createdAt: { gte: from, lte: to } },
          include: { companies: { select: { companyId: true } } },
        });

        const unlinked = [];
        for (const u of candidates) {
          const existing = await prisma.session.findFirst({
            where: { userId: u.id },
          });
          if (!existing) unlinked.push(u);
        }

        if (unlinked.length === 1) {
          const user = unlinked[0];
          console.log(
            `SIGNUP MATCH: ${session.id} → ${user.email}` +
              (session.gclid ? ` [gclid: ${session.gclid.slice(0, 20)}...]` : "") +
              ` (${session.events.length} events)`
          );

          if (!isDryRun) {
            await prisma.session.update({
              where: { id: session.id },
              data: {
                userId: user.id,
                companyId: user.companies[0]?.companyId || null,
              },
            });
            console.log(`  → Linked directly`);
          }
          linkedBySignup++;
          matched = true;
        }
      }
    }

    if (!matched) {
      console.log(
        `SKIP: ${session.id} (${session.ip || "no IP"}, ${session.country || "?"})` +
          (session.gclid ? ` [gclid: ${session.gclid.slice(0, 20)}...]` : "") +
          ` (${session.events.length} events)`
      );
      skipped++;
    }
  }

  console.log("\n=== SUMMARY ===");
  console.log(`Linked by IP: ${linkedByIp}`);
  console.log(`Linked by signup: ${linkedBySignup}`);
  console.log(`Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
