import { Injectable } from "@nestjs/common";
import { Prisma, type SessionNew } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { visitKey } from "./session-hash";
import type { VisitSeed } from "./request-facts";

// One visit = one row. A visit starts anonymous (keyed by the day-scoped device
// hash) and is promoted in place the moment a session cookie resolves, so the
// events fired before signing in stay on the same row.
//
// Visits of the same human on other days are separate rows sharing a userId —
// the admin groups them. Anonymous rows from other salt-days stay unlinkable by
// construction: the salt that produced their hash is gone.

/**
 * A visit ends after this much silence. Without it a "visit" was the whole
 * salt-day: a morning ad click and an unrelated evening registration from the
 * same NAT'd ip+ua landed on one row, and the evening registration was reported
 * to the ad network under the morning click id.
 */
export const VISIT_IDLE_MS = 30 * 60_000;

export type { VisitSeed } from "./request-facts";

/** First-touch attribution — may arrive on a later event than the first. */
export interface VisitAttribution {
  from: string | null;
  ref: string | null;
  theme: string | null;
  aid: { aid: string; atype: "F" | "G"; aidField: string } | null;
}

@Injectable()
export class VisitService {
  constructor(private readonly prisma: PrismaService) {}

  /** Find, promote or create the live visit row for this device hash + identity.
   *  `seed` is only used when a row has to be created. */
  async resolveVisit(hash: string, userId: string | null, seed: VisitSeed, now: Date): Promise<SessionNew> {
    // Only rows still inside the idle window can continue; anything older is a
    // finished visit and must not absorb new events (or lend out its click id).
    const liveSince = new Date(now.getTime() - VISIT_IDLE_MS);
    const rows = await this.prisma.sessionNew.findMany({
      where: { hash, lastAt: { gte: liveSince } },
      orderBy: { firstAt: "asc" },
    });
    const mine = rows.find((r) => r.userId === userId) ?? null;
    const anon = userId ? (rows.find((r) => r.userId === null) ?? null) : null;

    if (mine) {
      // Signed out mid-visit and back in: fold the stray anonymous row in.
      if (anon) return this.fold(anon, mine, now);
      await this.touch(mine.id, now);
      return { ...mine, lastAt: now };
    }

    if (anon && userId) {
      // Promote in place — keeps firstAt (the ad click) and every pre-login
      // event on the row. Keyed off the visit's own start so two racing
      // promotions produce the same key and one of them loses cleanly.
      const key = visitKey(hash, userId, anon.firstAt);
      try {
        return await this.prisma.sessionNew.update({
          where: { id: anon.id },
          data: { userId, visitKey: key, lastAt: now },
        });
      } catch (e) {
        if (!isUniqueViolation(e)) throw e;
        // A concurrent batch promoted it first.
        const won = await this.prisma.sessionNew.findUnique({ where: { visitKey: key } });
        if (won) return won;
      }
    }

    const key = visitKey(hash, userId, now);
    try {
      return await this.prisma.sessionNew.create({
        data: { visitKey: key, hash, userId, ...seed, firstAt: now, lastAt: now },
      });
    } catch (e) {
      if (!isUniqueViolation(e)) throw e;
      const won = await this.prisma.sessionNew.findUnique({ where: { visitKey: key } });
      if (won) return won;
      throw e;
    }
  }

  /**
   * Continue the exact visit a client-echoed token points at. Bypasses the
   * device hash entirely — this is the fix for mid-visit hash flaps (mobile
   * network prefix / Cloudflare region changing between batches). Returns null
   * when the row is gone, idle-expired, or belongs to a DIFFERENT signed-in
   * account than the caller (signed out mid-visit, or a shared browser switched
   * accounts) — the caller then falls back to the hash path.
   */
  async continueVisit(sessionId: string, userId: string | null, now: Date): Promise<SessionNew | null> {
    const row = await this.prisma.sessionNew.findUnique({ where: { id: sessionId } });
    if (!row || row.lastAt.getTime() < now.getTime() - VISIT_IDLE_MS) return null;

    if (row.userId === userId) {
      await this.touch(row.id, now);
      return { ...row, lastAt: now };
    }

    if (row.userId === null && userId) {
      // Signed in mid-visit: promote in place, exactly like the hash path.
      const key = visitKey(row.hash, userId, row.firstAt);
      try {
        return await this.prisma.sessionNew.update({
          where: { id: row.id },
          data: { userId, visitKey: key, lastAt: now },
        });
      } catch (e) {
        if (!isUniqueViolation(e)) throw e;
        const won = await this.prisma.sessionNew.findUnique({ where: { visitKey: key } });
        if (won) return won;
        return null;
      }
    }

    return null;
  }

  /** Move an anonymous row's events onto the signed-in row and drop it. */
  private async fold(anon: SessionNew, target: SessionNew, now: Date): Promise<SessionNew> {
    const [, , merged] = await this.prisma.$transaction([
      this.prisma.eventNew.updateMany({
        where: { sessionId: anon.id },
        data: { sessionId: target.id },
      }),
      // The journal has no FK, so its rows would be orphaned by the delete
      // below — and an orphaned success row stops blocking a re-send, which
      // means the same registration could be reported twice.
      this.prisma.conversionSendNew.updateMany({
        where: { sessionId: anon.id },
        data: { sessionId: target.id },
      }),
      this.prisma.sessionNew.update({
        where: { id: target.id },
        data: {
          lastAt: now,
          mergeCount: { increment: 1 },
          firstAt: anon.firstAt < target.firstAt ? anon.firstAt : target.firstAt,
          // Attribution the anonymous half carried and the signed-in row lacks.
          ...(target.from === null && anon.from !== null ? { from: anon.from } : {}),
          ...(target.ref === null && anon.ref !== null ? { ref: anon.ref } : {}),
          ...(target.theme === null && anon.theme !== null ? { theme: anon.theme } : {}),
          ...(target.aid === null && anon.aid !== null
            ? { aid: anon.aid, atype: anon.atype, aidField: anon.aidField, clickAt: anon.clickAt }
            : {}),
        },
      }),
      // deleteMany, not delete: two concurrent batches can both decide to fold,
      // and `delete` on an already-deleted row aborts the whole transaction
      // (P2025) — losing the second batch's events.
      this.prisma.sessionNew.deleteMany({ where: { id: anon.id } }),
    ]);
    return merged;
  }

  /** updateMany, not update: a concurrent batch may have folded this row away
   *  between the read and the write, and `update` would throw P2025 and 500 a
   *  request whose only job was to bump a timestamp. */
  private async touch(id: string, now: Date): Promise<void> {
    await this.prisma.sessionNew.updateMany({ where: { id }, data: { lastAt: now } });
  }

  /** First-write-wins enrichment: a later event in the same visit may be the
   *  first to carry a click id / from / ref. Never overwrites a set value. */
  async enrich(session: SessionNew, attr: VisitAttribution, now: Date): Promise<void> {
    // Each field is written under a "still empty" condition instead of being
    // decided from the `session` object, which was read before any concurrent
    // batch got its write in. Otherwise two batches racing to be first with a
    // click id both see null and the loser overwrites the winner.
    if (attr.aid && !session.aid) {
      await this.prisma.sessionNew.updateMany({
        where: { id: session.id, aid: null },
        data: { aid: attr.aid.aid, atype: attr.aid.atype, aidField: attr.aid.aidField, clickAt: now },
      });
    }
    if (attr.from && !session.from) {
      await this.prisma.sessionNew.updateMany({
        where: { id: session.id, from: null },
        data: { from: attr.from },
      });
    }
    if (attr.ref && !session.ref) {
      await this.prisma.sessionNew.updateMany({
        where: { id: session.id, ref: null },
        data: { ref: attr.ref },
      });
    }
    if (attr.theme && !session.theme) {
      await this.prisma.sessionNew.updateMany({
        where: { id: session.id, theme: null },
        data: { theme: attr.theme },
      });
    }
  }
}

function isUniqueViolation(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";
}
