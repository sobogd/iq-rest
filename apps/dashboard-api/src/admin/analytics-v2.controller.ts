import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Prisma } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AdminGuard } from "./admin.guard";

// Admin read surface for the cookieless analytics-v2 pipeline (sessions_new /
// events_new). Lives in the admin module because AdminGuard needs AuthModule,
// which itself depends on AnalyticsV2Module for the conversion hook.

const MAX_ROWS = 2000;
const DEFAULT_DAYS = 30;
/** Postgres caps bind parameters at 65535 — refuse oversized batches loudly
 *  instead of letting the driver fail somewhere deep inside deleteMany. */
const MAX_DELETE_IDS = 5000;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** Same rule the live sender uses (analytics-v2/conversion-v2.service.ts):
 *  the demo account is flagged in the DB, but its per-visitor aliases
 *  (demo+<something>@…) are not. Duplicated rather than imported so the admin
 *  read surface cannot drag the conversion pipeline into its module graph. */
function isDemoEmail(email: string | null | undefined): boolean {
  return !!email && (email === "demo@iq-rest.com" || email.startsWith("demo+"));
}

interface SessionListRow {
  id: string;
  firstAt: Date;
  lastAt: Date;
  device: string | null;
  os: string | null;
  country: string;
  region: string;
  city: string;
  lang: string | null;
  from: string | null;
  ref: string | null;
  aid: string | null;
  atype: string | null;
  aidField: string | null;
  clickAt: Date | null;
  userId: string | null;
  mergeCount: number;
  event_count: number;
  page_count: number;
  first_page: string | null;
  has_modal: boolean;
  has_register: boolean;
  restaurant_ids: (string | null)[] | null;
  user_email: string | null;
  user_is_demo: boolean | null;
  /** All-time visit count of the account, this visit included (1 if signed out). */
  user_visits: number;
  conv_status: string | null;
  conv_network: string | null;
}

@Controller("admin/v2")
@UseGuards(AdminGuard)
export class AnalyticsV2AdminController {
  constructor(private readonly prisma: PrismaService) {}

  /** Session list over a window. One query: session row + event aggregates +
   *  resolved account/venue + the conversion outcome (success wins over the
   *  newest error, so a retried send shows as sent). */
  @Get("sessions")
  async sessions(
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("restaurantId") restaurantId?: string,
  ) {
    // Window: `from` inclusive, `to` exclusive, both matched on s."firstAt".
    // A date-only `to` ("2026-08-10") parses as UTC midnight, so an exclusive
    // bound would swallow the whole named day — push it to the next UTC
    // midnight so that day is fully covered. Full ISO stamps (what the UI
    // sends) are used verbatim.
    const toDate = to ? new Date(to) : new Date();
    if (Number.isNaN(toDate.getTime())) throw new BadRequestException("from/to invalid");
    if (to && DATE_ONLY.test(to)) toDate.setUTCHours(24, 0, 0, 0);
    const fromDate = from ? new Date(from) : new Date(toDate.getTime() - DEFAULT_DAYS * 864e5);
    // A typo in a date must not read as "no traffic at all".
    if (Number.isNaN(fromDate.getTime())) throw new BadRequestException("from/to invalid");
    // Optional venue filter: keep visits that touched the venue at least once.
    const venueFilter = restaurantId
      ? Prisma.sql`AND EXISTS (SELECT 1 FROM events_new ve WHERE ve."sessionId" = s.id AND ve."restaurantId" = ${restaurantId})`
      : Prisma.empty;

    const rows = await this.prisma.$queryRaw<SessionListRow[]>(Prisma.sql`
      SELECT
        s.id, s."firstAt", s."lastAt", s.device, s.os, s.country, s.region, s.city,
        s.lang, s."from", s.ref, s.aid, s.atype, s."aidField", s."clickAt",
        s."userId", s."mergeCount",
        ev.event_count,
        ev.page_count,
        ev.first_page,
        ev.has_modal,
        ev.has_register,
        -- Venues in first-touch order, so restaurants[0] is the venue the visit
        -- opened on. array_agg(DISTINCT …) would order them lexicographically
        -- by id, i.e. arbitrarily, and the detail endpoint orders by event time.
        (
          SELECT array_agg(v."restaurantId" ORDER BY v.first_at ASC)
          FROM (
            SELECT e2."restaurantId", MIN(e2.at) AS first_at
            FROM events_new e2
            WHERE e2."sessionId" = s.id AND e2."restaurantId" IS NOT NULL
            GROUP BY e2."restaurantId"
          ) v
        ) AS restaurant_ids,
        u.email AS user_email,
        u."isDemo" AS user_is_demo,
        -- All-time, matching the detail endpoint. A window/venue-scoped count
        -- meant something different in each screen, and now that a visit is cut
        -- after 30 idle minutes the number people want is "how often has this
        -- account been here", not "how many rows survived the current filter".
        CASE WHEN s."userId" IS NULL THEN 1
             ELSE (SELECT COUNT(*)::int FROM sessions_new uv WHERE uv."userId" = s."userId")
        END AS user_visits,
        cs.status AS conv_status,
        cs.network AS conv_network
      FROM sessions_new s
      LEFT JOIN LATERAL (
        SELECT
          -- The ::int casts are load-bearing: a bare bigint arrives as a BigInt
          -- and JSON.stringify throws on it, 500-ing the whole endpoint.
          COUNT(*)::int AS event_count,
          COUNT(DISTINCT e.page)::int AS page_count,
          (array_agg(e.page ORDER BY e.at ASC))[1] AS first_page,
          -- COUNT over an empty set is 0, so those need no default — but
          -- bool_or over an empty set is NULL, and the UI types these boolean.
          COALESCE(bool_or(e.action = 'Show' AND e.name LIKE 'Auth Modal%'), false) AS has_modal,
          COALESCE(bool_or(e.action = 'Register'), false) AS has_register
        FROM events_new e
        WHERE e."sessionId" = s.id
      ) ev ON TRUE
      LEFT JOIN users u ON u.id = s."userId"
      LEFT JOIN LATERAL (
        SELECT c.status, c.network
        FROM conversion_sends_new c
        WHERE c."sessionId" = s.id
        ORDER BY (c.status = 'success') DESC, c."createdAt" DESC
        LIMIT 1
      ) cs ON TRUE
      WHERE s."firstAt" >= ${fromDate} AND s."firstAt" < ${toDate}
      ${venueFilter}
      ORDER BY s."lastAt" DESC
      LIMIT ${MAX_ROWS}
    `);

    // Venue titles for every venue touched by the listed visits.
    const venueIds = [...new Set(rows.flatMap((r) => r.restaurant_ids ?? []).filter((v): v is string => !!v))];
    const venues = venueIds.length
      ? await this.prisma.restaurant.findMany({
          where: { id: { in: venueIds } },
          select: { id: true, title: true },
        })
      : [];
    const venueTitle = new Map(venues.map((v) => [v.id, v.title]));

    return {
      // There is no pagination here on purpose, but the cut must be visible:
      // a silently trimmed list reads as "that was all the traffic".
      limit: MAX_ROWS,
      truncated: rows.length >= MAX_ROWS,
      sessions: rows.map((r) => ({
        id: r.id,
        firstAt: r.firstAt.toISOString(),
        lastAt: r.lastAt.toISOString(),
        device: r.device,
        os: r.os,
        country: r.country,
        region: r.region,
        city: r.city,
        lang: r.lang,
        from: r.from,
        ref: r.ref,
        aid: r.aid,
        atype: r.atype,
        aidField: r.aidField,
        clickAt: r.clickAt ? r.clickAt.toISOString() : null,
        eventCount: r.event_count,
        pageCount: r.page_count,
        firstPage: r.first_page,
        hasModal: r.has_modal,
        hasRegister: r.has_register,
        mergeCount: r.mergeCount,
        userId: r.userId,
        userEmail: r.user_email,
        isDemo: r.user_is_demo === true || isDemoEmail(r.user_email),
        userVisits: r.user_visits,
        restaurants: (r.restaurant_ids ?? [])
          .filter((v): v is string => !!v)
          .map((id) => ({ id, title: venueTitle.get(id) ?? id })),
        convStatus: r.conv_status,
        convNetwork: r.conv_network,
      })),
    };
  }

  /** One session: every field plus its full event timeline and the raw
   *  conversion-send journal (Meta/Google responses). */
  @Get("sessions/:id")
  async session(@Param("id") id: string) {
    const session = await this.prisma.sessionNew.findUnique({ where: { id } });
    if (!session) throw new NotFoundException("session not found");

    const [events, sends, user] = await Promise.all([
      this.prisma.eventNew.findMany({
        where: { sessionId: id },
        orderBy: { at: "asc" },
        select: { id: true, page: true, action: true, name: true, at: true, restaurantId: true },
      }),
      this.prisma.conversionSendNew.findMany({
        where: { sessionId: id },
        orderBy: { createdAt: "asc" },
      }),
      session.userId
        ? this.prisma.user.findUnique({
            where: { id: session.userId },
            select: { email: true, isDemo: true },
          })
        : null,
    ]);

    // Other visits of the same human — the only cross-day link we have, and
    // only because they signed in. Anonymous visits from other salt-days are
    // unlinkable by construction. The list is capped for the UI, but the count
    // is queried separately: it is the same all-time number the session list
    // shows, and `take + 1` would silently top out at 51.
    const otherVisits = session.userId
      ? await this.prisma.sessionNew.findMany({
          where: { userId: session.userId, id: { not: id } },
          orderBy: { firstAt: "desc" },
          select: { id: true, firstAt: true, country: true, city: true, device: true },
          take: 50,
        })
      : [];
    const userVisits = session.userId
      ? await this.prisma.sessionNew.count({ where: { userId: session.userId } })
      : 1;

    const venueIds = [...new Set(events.map((e) => e.restaurantId).filter((v): v is string => !!v))];
    const venues = venueIds.length
      ? await this.prisma.restaurant.findMany({
          where: { id: { in: venueIds } },
          select: { id: true, title: true },
        })
      : [];
    const venueTitle = new Map(venues.map((v) => [v.id, v.title]));

    // Same tie-break as the list query: the newest success wins (a retried send
    // must read as sent), otherwise the newest failure. `sends` is ascending.
    const successes = sends.filter((x) => x.status === "success");
    const convOutcome = successes[successes.length - 1] ?? sends[sends.length - 1] ?? null;

    // The detail must carry the SAME shape the list does — the UI types both as
    // one TrafficSession, so a field present only in the list reads back as
    // undefined here. The aggregates come from the events already loaded.
    const { visitKey: _visitKey, ...rest } = session;
    return {
      session: {
        ...rest,
        firstAt: session.firstAt.toISOString(),
        lastAt: session.lastAt.toISOString(),
        clickAt: session.clickAt ? session.clickAt.toISOString() : null,
        // The hash is the raw visit key — of no use in the UI and better not
        // echoed around; expose only a short prefix for eyeballing duplicates.
        hash: session.hash.slice(0, 12),
        userEmail: user?.email ?? null,
        isDemo: user?.isDemo === true || isDemoEmail(user?.email),
        userVisits,
        eventCount: events.length,
        pageCount: new Set(events.map((e) => e.page)).size,
        firstPage: events[0]?.page ?? null,
        hasModal: events.some((e) => e.action === "Show" && e.name.startsWith("Auth Modal")),
        hasRegister: events.some((e) => e.action === "Register"),
        // venueIds keeps the order of `events` (ascending `at`), i.e. first
        // venue touched first — the same rule the session list applies.
        restaurants: venueIds.map((vid) => ({ id: vid, title: venueTitle.get(vid) ?? vid })),
        convStatus: convOutcome?.status ?? null,
        convNetwork: convOutcome?.network ?? null,
      },
      events: events.map((e) => ({
        ...e,
        at: e.at.toISOString(),
        restaurantTitle: e.restaurantId ? (venueTitle.get(e.restaurantId) ?? e.restaurantId) : null,
      })),
      sends: sends.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() })),
      otherVisits: otherVisits.map((v) => ({ ...v, firstAt: v.firstAt.toISOString() })),
    };
  }

  /** Delete sessions (events cascade). Used to drop the admin's own visits. */
  @Post("sessions/delete")
  @HttpCode(HttpStatus.OK)
  async deleteSessions(@Body() body: { ids?: unknown }) {
    const ids = Array.isArray(body?.ids)
      ? body.ids.filter((v): v is string => typeof v === "string" && v.length > 0)
      : [];
    if (ids.length === 0) return { deleted: 0 };
    if (ids.length > MAX_DELETE_IDS) {
      throw new BadRequestException(`too many ids (max ${MAX_DELETE_IDS})`);
    }
    // conversion_sends_new has no FK (it is a journal), so clear it explicitly —
    // in the SAME transaction as the sessions, or a failure on the second step
    // leaves live visits with their send history already destroyed.
    const [, res] = await this.prisma.$transaction([
      this.prisma.conversionSendNew.deleteMany({ where: { sessionId: { in: ids } } }),
      this.prisma.sessionNew.deleteMany({ where: { id: { in: ids } } }),
    ]);
    return { deleted: res.count };
  }
}
