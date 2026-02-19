/**
 * One-time script to retroactively link orphaned sessions to users.
 *
 * The bug: linkSession() fetch was cancelled by immediate window.location.href redirect,
 * so sessions with registration events were never linked to users.
 *
 * Strategy: match sessions that have `auth_signup` event but no userId
 * to Users by timestamp correlation (auth_signup event time ≈ User.createdAt).
 *
 * Usage: npx tsx scripts/link-orphan-sessions.ts [--dry-run]
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const isDryRun = process.argv.includes("--dry-run");

async function main() {
  console.log(isDryRun ? "=== DRY RUN ===" : "=== LINKING ORPHAN SESSIONS ===");

  // Find sessions with auth_signup event but no userId
  const orphanEvents = await prisma.analyticsEvent.findMany({
    where: {
      event: "auth_signup",
      session: { userId: null },
    },
    include: {
      session: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`Found ${orphanEvents.length} orphan session(s) with auth_signup event\n`);

  let linked = 0;
  let skipped = 0;
  let ambiguous = 0;

  for (const evt of orphanEvents) {
    const session = evt.session;
    const signupTime = evt.createdAt;

    // Find users created within ±60 seconds of the auth_signup event
    const windowMs = 60_000;
    const from = new Date(signupTime.getTime() - windowMs);
    const to = new Date(signupTime.getTime() + windowMs);

    const candidates = await prisma.user.findMany({
      where: {
        createdAt: { gte: from, lte: to },
      },
      include: {
        companies: { select: { companyId: true } },
      },
    });

    // Filter out users that already have a linked session
    const unlinkedCandidates = [];
    for (const user of candidates) {
      const existingSession = await prisma.session.findFirst({
        where: { userId: user.id },
      });
      if (!existingSession) {
        unlinkedCandidates.push(user);
      }
    }

    if (unlinkedCandidates.length === 1) {
      const user = unlinkedCandidates[0];
      const companyId = user.companies[0]?.companyId || null;

      console.log(
        `MATCH: session ${session.id} (${signupTime.toISOString()})` +
          ` → user ${user.email} (${user.createdAt.toISOString()})` +
          (session.gclid ? ` [gclid: ${session.gclid}]` : "")
      );

      if (!isDryRun) {
        await prisma.session.update({
          where: { id: session.id },
          data: { userId: user.id, companyId },
        });
        console.log("  ✓ Linked\n");
      } else {
        console.log("  (dry run — not linking)\n");
      }
      linked++;
    } else if (unlinkedCandidates.length === 0) {
      console.log(
        `SKIP: session ${session.id} (${signupTime.toISOString()})` +
          ` — no unlinked user found in ±60s window` +
          (session.gclid ? ` [gclid: ${session.gclid}]` : "")
      );
      skipped++;
    } else {
      console.log(
        `AMBIGUOUS: session ${session.id} (${signupTime.toISOString()})` +
          ` — ${unlinkedCandidates.length} candidates: ${unlinkedCandidates.map((u) => u.email).join(", ")}` +
          (session.gclid ? ` [gclid: ${session.gclid}]` : "")
      );
      ambiguous++;
    }
  }

  console.log("\n=== SUMMARY ===");
  console.log(`Linked: ${linked}`);
  console.log(`Skipped (user already linked): ${skipped}`);
  console.log(`Ambiguous (multiple candidates): ${ambiguous}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
