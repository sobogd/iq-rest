import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Logger, NotFoundException, Post, Query } from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../prisma/prisma.service";
import { MailService } from "../mail/mail.service";
import { OrdersNotifierService } from "../orders/orders-notifier.service";
import { ACCOUNT_ENTITLEMENT_SELECT, restaurantCapsFromRow } from "../common/entitlements";

const reservationSchema = z.object({
  restaurantId: z.string().min(1),
  tableId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  guestName: z.string().trim().min(1).max(100),
  guestEmail: z.string().trim().email().max(200),
  guestPhone: z.string().trim().max(40).nullable().optional(),
  guestsCount: z.number().int().min(1).max(50),
  notes: z.string().max(500).nullable().optional(),
  locale: z.string().min(2).max(5).optional(),
});

interface ScheduleDay {
  closed: boolean;
  from: string;
  to: string;
  lunchFrom: string | null;
  lunchTo: string | null;
}

/** One owner-defined bookable date in event mode. */
interface EventDate {
  date: string; // restaurant-local YYYY-MM-DD
  from: string;
  to: string;
  // Seats the date can hold; null / 0 ⇒ unlimited (the event flow has no
  // table-based cap, so without this the owner takes any number of bookings).
  capacity: number | null;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function isTableBooked(
  tableId: string,
  startTime: string,
  slotDuration: number,
  // tableId may be null on existing rows (event-mode bookings have no table);
  // those can never match a real table id and are skipped below.
  rs: { tableId: string | null; startTime: string; duration: number }[],
): boolean {
  const reqStart = timeToMinutes(startTime);
  const reqEnd = reqStart + slotDuration;
  for (const r of rs) {
    if (r.tableId !== tableId) continue;
    const bookedStart = timeToMinutes(r.startTime);
    const bookedEnd = bookedStart + r.duration;
    if (reqStart < bookedEnd && reqEnd > bookedStart) return true;
  }
  return false;
}

/** Party sizes of all reservations overlapping [startTime, startTime+duration).
 *  Event mode is seat-based, so this total is its whole occupancy signal (there
 *  is no per-table check to run). */
function bookedGuests(
  startTime: string,
  slotDuration: number,
  rs: { startTime: string; duration: number; guestsCount: number }[],
): number {
  const reqStart = timeToMinutes(startTime);
  const reqEnd = reqStart + slotDuration;
  let sum = 0;
  for (const r of rs) {
    const bookedStart = timeToMinutes(r.startTime);
    if (reqStart < bookedStart + r.duration && reqEnd > bookedStart) sum += r.guestsCount;
  }
  return sum;
}

/** Return the restaurant's current local date/time as a plain object,
 *  independent of the Node process's TZ. Used so "is slot in the past"
 *  checks compare against the restaurant's clock, not the server's UTC. */
function nowInTz(tz: string): { todayStr: string; currentMinutes: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
    const year = get("year");
    const month = get("month");
    const day = get("day");
    let hour = get("hour");
    if (hour === "24") hour = "00";
    const minute = get("minute");
    return {
      todayStr: `${year}-${month}-${day}`,
      currentMinutes: Number(hour) * 60 + Number(minute),
    };
  } catch {
    const now = new Date();
    return {
      todayStr: `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`,
      currentMinutes: now.getUTCHours() * 60 + now.getUTCMinutes(),
    };
  }
}

function getScheduleDay(
  raw: unknown,
  dateStr: string,
  fallbackFrom: string,
  fallbackTo: string,
): { openWindows: { start: number; end: number }[] } | null {
  // Weekday of the restaurant-local date. The string is parsed as UTC midnight
  // and read back with getUTCDay(), so the server's own TZ can't shift the day.
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  const weekday = (date.getUTCDay() + 6) % 7;

  let day: ScheduleDay;
  if (Array.isArray(raw) && raw.length === 7 && raw[weekday] && typeof raw[weekday] === "object") {
    day = raw[weekday] as ScheduleDay;
  } else {
    day = { closed: false, from: fallbackFrom, to: fallbackTo, lunchFrom: null, lunchTo: null };
  }
  if (day.closed) return null;
  const start = timeToMinutes(day.from);
  const end = timeToMinutes(day.to);
  if (!(start < end)) return null;
  if (day.lunchFrom && day.lunchTo) {
    const lStart = timeToMinutes(day.lunchFrom);
    const lEnd = timeToMinutes(day.lunchTo);
    if (lStart > start && lEnd < end && lStart < lEnd) {
      return { openWindows: [{ start, end: lStart }, { start: lEnd, end }] };
    }
  }
  return { openWindows: [{ start, end }] };
}

/**
 * Normalise the raw `reservationDates` JSON column into typed entries.
 *
 * This is owner-provided data (written by the dashboard, validated there), so
 * anything malformed is dropped rather than thrown — a bad row must not take
 * the whole diner-facing menu down. An empty result means "weekly mode".
 *
 * Dropped entries are logged: when every entry is bad the flow silently falls
 * back to the weekly schedule, and without the warning nobody could tell why
 * the owner's event dates stopped being offered.
 *
 * @param raw    the JSON column as read from the DB (unknown shape).
 * @param logger optional Nest logger; the caller's class name is used.
 * @returns valid entries in the order they appear; possibly empty.
 */
function parseEventDates(raw: unknown, logger?: Logger): EventDate[] {
  if (!Array.isArray(raw)) return [];
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;
  const out: EventDate[] = [];
  let dropped = 0;
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") {
      dropped++;
      continue;
    }
    const e = entry as Record<string, unknown>;
    const date = typeof e.date === "string" ? e.date : "";
    const from = typeof e.from === "string" ? e.from : "";
    const to = typeof e.to === "string" ? e.to : "";
    if (!dateRe.test(date) || !timeRe.test(from) || !timeRe.test(to)) {
      dropped++;
      continue;
    }
    if (!(timeToMinutes(from) < timeToMinutes(to))) {
      dropped++;
      continue;
    }
    // Seats cap: malformed / negative ⇒ null (unlimited) rather than dropping
    // the whole date, so a bad number can't silently close the event day.
    const capacity =
      typeof e.capacity === "number" && Number.isFinite(e.capacity) && e.capacity >= 0
        ? Math.floor(e.capacity)
        : null;
    out.push({ date, from, to, capacity });
  }
  if (dropped > 0) {
    logger?.warn(
      `reservationDates: dropped ${dropped} malformed entr${dropped === 1 ? "y" : "ies"} ` +
        `(${out.length} usable)`,
    );
  }
  return out;
}

/**
 * Bookable windows for one restaurant-local date, or null when closed.
 *
 * Event mode wins over everything: while `reservationDates` is non-empty the
 * weekday schedule is ignored entirely, so a date that isn't on the list is
 * closed even if its weekday is normally open ("reservations only on 6-8
 * October"), and a listed date opens with its own hours even on a normally
 * closed weekday. Otherwise the weekly schedule applies, with the legacy
 * workingHours fallback when `reservationSchedule` isn't a 7-day array.
 */
function resolveDayWindows(
  eventDates: EventDate[],
  scheduleRaw: unknown,
  dateStr: string,
  fallbackFrom: string,
  fallbackTo: string,
): { openWindows: { start: number; end: number }[] } | null {
  if (eventDates.length > 0) {
    const entry = eventDates.find((e) => e.date === dateStr);
    if (!entry) return null;
    return { openWindows: [{ start: timeToMinutes(entry.from), end: timeToMinutes(entry.to) }] };
  }
  return getScheduleDay(scheduleRaw, dateStr, fallbackFrom, fallbackTo);
}

@Controller("public/reservations")
export class ReservationsController {
  private readonly logger = new Logger(ReservationsController.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly notifier: OrdersNotifierService,
  ) {}

  @Get("availability")
  async availability(
    @Query("slug") slug: string,
    @Query("date") dateStr: string,
    @Query("time") time?: string,
    @Query("guests") guestsRaw?: string,
  ) {
    if (!slug || !dateStr) throw new BadRequestException("slug + date required");
    const guestsCount = parseInt(guestsRaw || "2", 10);

    const restaurant = await this.prisma.restaurant.findFirst({
      where: { slug },
      select: {
        reservationsEnabled: true,
        reservationSlotMinutes: true,
        workingHoursStart: true,
        workingHoursEnd: true,
        reservationSchedule: true,
        reservationDates: true,
        timezone: true,
        ...ACCOUNT_ENTITLEMENT_SELECT,
      },
    });
    if (!restaurant) throw new NotFoundException("not_found");
    // Reservations are PRO-only; a BASIC restaurant exposes no booking surface.
    if (
      !restaurantCapsFromRow(restaurant).reservations ||
      !restaurant.reservationsEnabled
    )
      throw new BadRequestException("reservations_disabled");

    // Event mode is seat-based and table-free: the owner takes more bookings
    // than there are tables (standing events, general admission). Weekly mode
    // stays table-based. The two branches differ only in how a slot's remaining
    // capacity is computed — windows and past-slot skipping are shared below.
    const eventDates = parseEventDates(restaurant.reservationDates, this.logger);
    const isEvent = eventDates.length > 0;

    const tables = await this.prisma.table.findMany({
      where: { restaurantId: restaurant.id, isActive: true, deletedAt: null },
      select: { id: true, number: true, capacity: true, zone: true, translations: true, imageUrl: true },
      orderBy: { sortOrder: "asc" },
    });
    const suitable = tables.filter((t) => t.capacity >= guestsCount);
    // Weekly mode can't seat the party without a big-enough table; event mode
    // ignores table capacity entirely, so this early exit only applies there.
    if (!isEvent && suitable.length === 0) {
      return { timeSlots: [], tables: [], message: "No tables available for the requested number of guests" };
    }

    const reservationDate = new Date(dateStr);
    const existing = await this.prisma.reservation.findMany({
      where: { restaurantId: restaurant.id, date: reservationDate, status: { in: ["pending", "confirmed"] } },
      // guestsCount is only read in event mode (seat counting); weekly mode
      // uses tableId/startTime/duration for the per-table overlap check.
      select: { tableId: true, startTime: true, duration: true, guestsCount: true },
    });
    const slotDuration = restaurant.reservationSlotMinutes;
    // Seats this event date holds; null ⇒ unlimited.
    const eventCapacity = isEvent
      ? (eventDates.find((e) => e.date === dateStr)?.capacity ?? null)
      : null;
    // The restaurant's local clock drives both "is this date still in the
    // future" and "is this slot today but already past" below.
    const { todayStr, currentMinutes } = nowInTz(restaurant.timezone || "UTC");
    // A date that has already started is unbookable, in event mode as well as
    // weekly: a direct call for yesterday must not come back with slots just
    // because the guest-facing picker never offers such a day.
    const day =
      dateStr >= todayStr
        ? resolveDayWindows(
            eventDates,
            restaurant.reservationSchedule,
            dateStr,
            restaurant.workingHoursStart,
            restaurant.workingHoursEnd,
          )
        : null;

    const timeSlots: { time: string; available: boolean; availableTables: number }[] = [];
    if (day) {
      // Compare "is slot in the past" against the restaurant's local clock,
      // not the server's UTC. Italian restaurant at 19:55 (UTC+2 summer) ≠
      // 17:55 UTC — without tz-aware now, 18:00 would still look "future".
      const isToday = dateStr === todayStr;
      for (const window of day.openWindows) {
        for (let m = window.start; m + slotDuration <= window.end; m += 30) {
          if (isToday && m <= currentMinutes) continue;
          const timeStr = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
          if (isEvent) {
            // Unlimited cap (null/0) ⇒ every non-past slot is bookable;
            // otherwise the party has to fit into the seats left.
            const seatsLeft =
              eventCapacity && eventCapacity > 0 ? eventCapacity - bookedGuests(timeStr, slotDuration, existing) : null;
            timeSlots.push({
              time: timeStr,
              available: seatsLeft === null || seatsLeft >= guestsCount,
              availableTables: 0,
            });
          } else {
            const free = suitable.filter((t) => !isTableBooked(t.id, timeStr, slotDuration, existing)).length;
            timeSlots.push({ time: timeStr, available: free > 0, availableTables: free });
          }
        }
      }
    }

    let tablesAvailability: Array<{
      id: string;
      number: number;
      capacity: number;
      zone: string | null;
      translations: Record<string, { zone?: string }> | null;
      imageUrl: string | null;
      available: boolean;
    }> = [];
    // Event mode returns no table list at all: the diner skips the picker and
    // the booking is created without a table.
    if (time && !isEvent) {
      tablesAvailability = suitable.map((t) => ({
        ...t,
        translations: t.translations as Record<string, { zone?: string }> | null,
        available: !isTableBooked(t.id, time, slotDuration, existing),
      }));
    }
    return { timeSlots, tables: tablesAvailability, slotDuration };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown) {
    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException(parsed.error.issues[0]?.message || "invalid input");
    const { restaurantId, tableId, date, startTime, guestName, guestEmail, guestPhone, guestsCount, notes, locale } = parsed.data;

    // Owner emails come from RestaurantUser (the flat-access model).
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        title: true,
        defaultLanguage: true,
        reservationsEnabled: true,
        reservationSlotMinutes: true,
        reservationMode: true,
        reservationDates: true,
        timezone: true,
        restaurantUsers: { select: { user: { select: { email: true } } } },
        ...ACCOUNT_ENTITLEMENT_SELECT,
      },
    });
    if (!restaurant) throw new NotFoundException("not_found");
    // Reservations are PRO-only; reject bookings for BASIC restaurants.
    if (
      !restaurantCapsFromRow(restaurant).reservations ||
      !restaurant.reservationsEnabled
    )
      throw new BadRequestException("reservations_disabled");

    const reservationDate = new Date(date);
    const slotDuration = restaurant.reservationSlotMinutes;

    // A date before the restaurant's local today is refused in both modes: the
    // guest-facing picker hides such days, but that is cosmetics — a hand-made
    // POST must not end up as a reservation in the past.
    if (date < nowInTz(restaurant.timezone || "UTC").todayStr) {
      throw new BadRequestException("date_not_available");
    }

    // Event mode: the owner listed the bookable dates together with each day's
    // window, so a request for another date — or for a time outside that day's
    // window — is refused even though the guest-facing picker already hides it
    // (a direct POST must not slip past the restriction). Weekly mode keeps the
    // old behaviour of validating neither the schedule nor the time: there the
    // availability endpoint is what shapes the flow.
    const eventDates = parseEventDates(restaurant.reservationDates, this.logger);
    const isEvent = eventDates.length > 0;
    // Seats the requested date holds; null / 0 ⇒ unlimited.
    let eventCapacity: number | null = null;
    if (isEvent) {
      const entry = eventDates.find((e) => e.date === date);
      if (!entry) throw new BadRequestException("date_not_available");
      // Same day, and the whole sitting has to fit the window: the picker only
      // offers slots that end by `to`, so anything else is a hand-made request.
      const startMin = timeToMinutes(startTime);
      if (startMin < timeToMinutes(entry.from) || startMin + slotDuration > timeToMinutes(entry.to)) {
        throw new BadRequestException("time_not_available");
      }
      eventCapacity = entry.capacity;
    }

    const status = restaurant.reservationMode === "auto" ? "confirmed" : "pending";

    const existing = await this.prisma.reservation.findMany({
      where: { restaurantId, date: reservationDate, status: { in: ["pending", "confirmed"] } },
      select: { tableId: true, startTime: true, duration: true, guestsCount: true },
    });

    // Event mode: no table is assigned (seat-based, more bookings than tables),
    // so only the day's seat cap is enforced. Weekly mode picks/validates a
    // concrete table as before. `tableNumber` feeds the mail and stays null for
    // event bookings.
    let chosenTableId: string | null = null;
    let tableNumber: number | null = null;
    if (isEvent) {
      if (eventCapacity && eventCapacity > 0) {
        // Guard the seat cap on create too: the picker already hides full
        // slots, but a hand-made POST must not oversell the event.
        if (bookedGuests(startTime, slotDuration, existing) + guestsCount > eventCapacity) {
          throw new BadRequestException("no_tables_at_time");
        }
      }
    } else {
      const tables = await this.prisma.table.findMany({
        where: { restaurantId, isActive: true, deletedAt: null, capacity: { gte: guestsCount } },
        select: { id: true, number: true, capacity: true },
      });
      if (tableId) {
        const tbl = tables.find((t) => t.id === tableId);
        if (!tbl) throw new BadRequestException("table_not_suitable");
        if (isTableBooked(tableId, startTime, slotDuration, existing)) {
          throw new BadRequestException("table_taken");
        }
        chosenTableId = tableId;
      } else {
        const free = tables.find((t) => !isTableBooked(t.id, startTime, slotDuration, existing));
        if (!free) throw new BadRequestException("no_tables_at_time");
        chosenTableId = free.id;
      }
      tableNumber = tables.find((t) => t.id === chosenTableId)?.number ?? null;
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        restaurantId,
        tableId: chosenTableId,
        date: reservationDate,
        startTime,
        duration: slotDuration,
        guestName,
        guestEmail,
        guestPhone: guestPhone || null,
        guestsCount,
        notes: notes || null,
        status,
      },
    });

    {
      const ownerEmails = restaurant.restaurantUsers
        .map((ru) => ru.user.email)
        .filter((e): e is string => !!e);
      const lang = locale || restaurant.defaultLanguage || "en";
      const baseParams = {
        restaurantTitle: restaurant.title,
        date,
        startTime,
        guestsCount,
        tableNumber,
        notes: notes || null,
        status,
        locale: lang,
      };
      this.mail
        .sendGuestEmail({ ...baseParams, email: guestEmail, guestName })
        .catch((err) => this.logger.warn(`guest email failed: ${err?.message || err}`));
      if (ownerEmails.length > 0) {
        this.mail
          .sendOwnerEmail({
            ...baseParams,
            guestName,
            ownerEmails,
            guestEmail,
            guestPhone: guestPhone || null,
          })
          .catch((err) => this.logger.warn(`owner email failed: ${err?.message || err}`));
      }
    }

    // Fire-and-forget SSE notify so a paired RESERVATION kiosk shows the
    // new booking live. Never blocks or fails the diner's request.
    void this.notifier.publishBookingCreated(restaurantId, reservation);

    return reservation;
  }
}
