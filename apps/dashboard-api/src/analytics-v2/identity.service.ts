import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { hashSessionToken } from "../common/session-utils";
import { readCookie } from "./session-hash";

// Who is behind an ingest call. Deliberately does NOT go through AuthService:
// analytics has no business triggering auth side effects, and pulling in the
// whole service for a read-only identity lookup is unwarranted coupling. Two
// indexed lookups at worst, both memoised.
//
// This is attribution, not authorisation: a bad cookie can only mis-attribute
// the caller's own events, never expose anything. Every exclusion decision is
// therefore taken on DB-resolved identity, never on a cookie value — cookies
// here are client-writable, so trusting `iqr_email` would let anyone opt their
// own traffic out of the metrics by typing one line in a console.

const TOKEN_TTL_MS = 5 * 60_000;
const MEMBER_TTL_MS = 5 * 60_000;
const MAX_ENTRIES = 5_000;

export interface VisitIdentity {
  /** null = anonymous (or an admin/impersonated call the caller must drop). */
  userId: string | null;
  /** Active venue, membership-validated. */
  restaurantId: string | null;
  /** True when the call must be discarded entirely (admin / impersonation). */
  skip: boolean;
}

interface CacheEntry<T> {
  value: T;
  exp: number;
}

interface TokenIdentity {
  userId: string;
  email: string;
}

@Injectable()
export class VisitorIdentityService {
  private readonly tokens = new Map<string, CacheEntry<TokenIdentity | null>>();
  private readonly members = new Map<string, CacheEntry<string | null>>();
  /** Internal accounts whose traffic must never be recorded. */
  private readonly excludedEmails: Set<string>;
  private readonly excludedUserIds: Set<string>;
  private readonly adminDomain: string;

  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    this.excludedEmails = new Set(
      (config.get<string>("ANALYTICS_EXCLUDE_EMAILS") || "support@iq-rest.com")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    );
    this.excludedUserIds = new Set(
      // Default keeps the internal account that was hardcoded here before, so
      // moving this to config does not silently start recording its traffic.
      (config.get<string>("ANALYTICS_EXCLUDE_USER_IDS") || "cmi5yzq780001vx0hiz2ti7fo")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    this.adminDomain = (config.get<string>("ADMIN_EMAIL_DOMAIN") || "iq-rest.com").toLowerCase();
  }

  private get<T>(map: Map<string, CacheEntry<T>>, key: string): T | undefined {
    const hit = map.get(key);
    if (!hit) return undefined;
    if (hit.exp <= Date.now()) {
      map.delete(key);
      return undefined;
    }
    return hit.value;
  }

  private put<T>(map: Map<string, CacheEntry<T>>, key: string, value: T, ttl: number): void {
    // Plain size cap — the maps hold at most a few thousand short strings and
    // a stale drop only costs one extra query.
    if (map.size >= MAX_ENTRIES) map.clear();
    map.set(key, { value, exp: Date.now() + ttl });
  }

  private isAdminEmail(email: string): boolean {
    const lower = email.toLowerCase();
    return lower.endsWith(`@${this.adminDomain}`);
  }

  private isExcluded(who: TokenIdentity): boolean {
    return this.excludedUserIds.has(who.userId) || this.excludedEmails.has(who.email.toLowerCase());
  }

  /** Resolve once per ingest batch, never per event. */
  async resolve(req: Request): Promise<VisitIdentity> {
    // Admin impersonation: the events belong to nobody real. The marker cookie
    // is client-writable, so it only counts when the token inside it really
    // resolves to an admin account.
    const impersonation = readCookie(req, "iqr_admin_original_session");
    if (impersonation) {
      const original = await this.identityForToken(impersonation, undefined);
      if (original && this.isAdminEmail(original.email)) {
        return { userId: null, restaurantId: null, skip: true };
      }
    }

    const token = readCookie(req, "iqr_session");
    if (!token) return { userId: null, restaurantId: null, skip: false };

    const who = await this.identityForToken(token, readCookie(req, "iqr_email"));
    if (!who) return { userId: null, restaurantId: null, skip: false };
    if (this.isExcluded(who)) return { userId: null, restaurantId: null, skip: true };

    const restaurantId = await this.activeRestaurant(who.userId, readCookie(req, "iqr_active_restaurant_id"));
    return { userId: who.userId, restaurantId, skip: false };
  }

  private async identityForToken(token: string, email: string | undefined): Promise<TokenIdentity | null> {
    const tokenHash = hashSessionToken(token);
    const cached = this.get(this.tokens, tokenHash);
    if (cached !== undefined) return cached;

    const row = await this.prisma.session.findUnique({
      where: { tokenHash },
      select: { expiresAt: true, user: { select: { id: true, email: true } } },
    });
    let who: TokenIdentity | null = null;
    if (row?.user && (row.expiresAt === null || row.expiresAt > new Date())) {
      who = { userId: row.user.id, email: row.user.email };
    } else if (email) {
      // Pre-multi-session accounts still authenticate off User.sessionToken.
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, sessionToken: true },
      });
      if (user?.sessionToken === tokenHash) who = { userId: user.id, email: user.email };
    }

    this.put(this.tokens, tokenHash, who, TOKEN_TTL_MS);
    return who;
  }

  /** The active-restaurant cookie survives account switches in the same
   *  browser, so trust it only against a real membership row; otherwise fall
   *  back to the user's first venue (a dashboard action always has one). */
  private async activeRestaurant(userId: string, cookie: string | undefined): Promise<string | null> {
    const key = `${userId}|${cookie ?? ""}`;
    const cached = this.get(this.members, key);
    if (cached !== undefined) return cached;

    let restaurantId: string | null = null;
    if (cookie) {
      const member = await this.prisma.restaurantUser.findFirst({
        where: { userId, restaurantId: cookie },
        select: { id: true },
      });
      if (member) restaurantId = cookie;
    }
    if (!restaurantId) {
      const first = await this.prisma.restaurantUser.findFirst({
        where: { userId },
        orderBy: { addedAt: "asc" },
        select: { restaurantId: true },
      });
      restaurantId = first?.restaurantId ?? null;
    }

    this.put(this.members, key, restaurantId, MEMBER_TTL_MS);
    return restaurantId;
  }
}
