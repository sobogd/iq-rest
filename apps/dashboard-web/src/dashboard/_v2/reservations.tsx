"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
 ChevronLeftIcon,
 ChevronRightIcon,
 UsersIcon,
} from "./icons";
import { Modal, PageHeaderSlot } from "./ui";
import { primaryBtn } from "./tokens";
import { cachedDateFormat, formatTime, isSameDay } from "./helpers";
import { patchReservation, type ApiReservation } from "./api";
import { useDashboardRouter } from "../_spa/router";
import type { Booking, Restaurant, TableEntity } from "./types";
import { track } from "@/lib/dashboard-events";

type ViewMode = "month" | "day";

const STATUS_BAR: Record<Booking["status"], string> = {
 pending: "bg-amber-500/85 text-white border border-amber-600 hover:bg-amber-500",
 confirmed: "bg-emerald-500/85 text-white border border-emerald-600 hover:bg-emerald-500",
 completed: "bg-secondary text-foreground/70 border border-border hover:bg-muted",
 cancelled: "bg-secondary text-muted-foreground border border-border",
};

export function ReservationsPage({
 restaurant,
 bookings,
 setBookings,
 tables,
 month,
 dayDate,
 kioskLayout = false,
 demoMode = false,
}: {
 restaurant: Restaurant;
 bookings: Booking[];
 setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
 tables: TableEntity[];
 // Month grid the URL points at (YYYY-MM); absent ⇒ current month. Router-
 // driven so prev/next are bookmarkable and drilling into a day then going
 // back restores the same month.
 month?: string;
 // When set (YYYY-MM-DD), the page renders the single-day view for that date
 // — driven by the SPA router (`reservations.day`). Absent ⇒ month view.
 dayDate?: string;
 // Reservation kiosk: drop the centered max-width container so the day /
 // month views stretch edge-to-edge on the tablet, mirroring OrdersPage.
 kioskLayout?: boolean;
 // Public landing demo: accept/reject runs on local state only — no API.
 // A reload resets the board.
 demoMode?: boolean;
}) {
 // Full-bleed everywhere; the kiosk shell adds its own padding below.
 const wrapWidth = "w-full";
 const t = useTranslations("dashboard.reservations");
 const tc = useTranslations("dashboard.common");
 const locale = useLocale();
 const router = useDashboardRouter();
 const qc = useQueryClient();
 // Kiosk primary controls get 44px touch targets (HIG); admin keeps the
 // standard 36px header-button size.
 const navBtnSize = kioskLayout ? "h-[44px] w-[44px]" : "h-[36px] w-[36px]";

 // View is router-driven: a `dayDate` prop means we're on the day page.
 const view: ViewMode = dayDate ? "day" : "month";
 // Both the month grid and the focused day come from the URL, so back /
 // bookmark / reload all restore faithfully. Default month = current.
 const monthFocus = useMemo(() => (month ? parseYM(month) : monthStart(new Date())), [month]);
 const dayFocus = useMemo(() => (dayDate ? parseYMD(dayDate) : monthFocus), [dayDate, monthFocus]);
 // Selection is by id and the shown booking is re-derived from `bookings`
 // every render — an SSE/poll update (status changed on another device)
 // must reach an already-open modal, otherwise stale footer actions could
 // e.g. re-confirm a booking that was just cancelled elsewhere.
 const [selectedId, setSelectedId] = useState<string | null>(null);
 const selectedBooking = selectedId
  ? bookings.find((b) => b.id === selectedId) ?? null
  : null;
 // Keep the last-shown booking during the modal's close animation — clearing
 // the selection must not unmount the modal instantly, or its exit animation
 // never plays.
 const lastBookingRef = useRef<Booking | null>(null);
 if (selectedBooking) lastBookingRef.current = selectedBooking;
 const shownBooking = selectedBooking ?? lastBookingRef.current;
 // Booking deleted while its modal is open → close it.
 useEffect(() => {
  if (selectedId && !bookings.some((b) => b.id === selectedId)) setSelectedId(null);
 }, [selectedId, bookings]);

 const monthBookings = useMemo(
  () =>
   bookings.filter((b) => {
    if (b.status === "cancelled") return false;
    const d = new Date(b.datetime);
    return d.getFullYear() === monthFocus.getFullYear() && d.getMonth() === monthFocus.getMonth();
   }),
  [bookings, monthFocus],
 );

 const dayBookings = useMemo(
  () => bookings.filter((b) => b.status !== "cancelled" && isSameDay(new Date(b.datetime), dayFocus)),
  [bookings, dayFocus],
 );

 // Empty state — render late so all hooks above run unconditionally.
 if (tables.length === 0) {
  // Kiosk/demo hosts don't render settings routes — the CTA would silently
  // rewrite the URL and do nothing, so show a plain message there.
  const showCta = !kioskLayout && !demoMode;
  return (
   <CtaWrapper>
    <CtaState
     title={t("noTablesTitle")}
     body={t("noTablesBody")}
     cta={showCta ? t("noTablesCta") : undefined}
     onClick={showCta ? () => router.push({ name: "settings.tables" }) : undefined}
    />
   </CtaWrapper>
  );
 }

 // Locale-aware, via the app locale (not the runtime default). Month → "Июнь
 // 2020" (capitalized); day → "10 июня 2020" (no weekday, starts with a digit).
 const title = view === "month"
  ? capitalize(cachedDateFormat(locale, { month: "long", year: "numeric" }, monthFocus))
  : cachedDateFormat(locale, { day: "numeric", month: "long", year: "numeric" }, dayFocus);

 const count = view === "month" ? monthBookings.length : dayBookings.length;
 const subtitle = count === 0
  ? t("noBookingsHere")
  : count === 1 ? t("subtitleOne", { count }) : t("subtitleOther", { count });

 function shift(delta: number) {
  if (view === "month") {
   const next = new Date(monthFocus);
   next.setMonth(monthFocus.getMonth() + delta);
   router.replace({ name: "reservations", month: fmtYM(next) });
  } else {
   // Day nav replaces the URL (no history entry per day) so back → month.
   const next = new Date(dayFocus);
   next.setDate(dayFocus.getDate() + delta);
   router.replace({ name: "reservations.day", date: fmtYMD(next) });
  }
 }

 // Back from the day page to its month grid. Forward-push the month view (the
 // codebase's back convention — window.history.back races with the framework
 // history and needs two clicks). The day's own month keeps context.
 function backToMonth() {
  router.push({ name: "reservations", month: fmtYM(dayFocus) });
 }

 async function setBookingStatus(id: string, status: Booking["status"]) {
  if (status === "confirmed") track("dash_booking_accept");
  else if (status === "cancelled") track("dash_booking_reject");
  const prevStatus = bookings.find((b) => b.id === id)?.status;
  setBookings((bks) => bks.map((b) => (b.id === id ? { ...b, status } : b)));
  if (demoMode) return;
  try {
   await patchReservation(id, { status });
   // Re-assert locally after the round-trip: a snapshot refresh that raced
   // the PATCH may have flipped the row back to its pre-patch status.
   setBookings((bks) => bks.map((b) => (b.id === id ? { ...b, status } : b)));
   // Write through to the TanStack cache — otherwise the shell's merge
   // effect re-applies the stale cached copy on the next unrelated tick
   // (visible pending→confirmed→pending flicker until the next refetch).
   qc.setQueryData<ApiReservation[] | undefined>(["reservations"], (cur) =>
    cur ? cur.map((r) => (r.id === id ? { ...r, status } : r)) : cur,
   );
  } catch {
   // Revert only this booking — restoring the whole pre-patch array would
   // wipe every SSE/merge update that arrived while the request flew.
   setBookings((bks) =>
    bks.map((b) => (b.id === id && prevStatus ? { ...b, status: prevStatus } : b)),
   );
   toast.error(t("error"));
  }
 }

 const headerRow = (
  <div className="w-full flex items-center gap-3">
   {/* Day page: back replaces the chrome burger (page-hdr-back hides it),
       mirroring the menu item detail header. Month keeps the burger. */}
   {view === "day" ? (
    <button
     type="button"
     onClick={backToMonth}
     aria-label={tc("back")}
     className={"page-hdr-back inline-flex items-center justify-center rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors shrink-0 " + navBtnSize}
    >
     <ChevronLeftIcon size={18} />
    </button>
   ) : null}
   <span className="min-w-0 flex-1 text-base font-bold text-foreground truncate">{title}</span>
   <div className="flex items-center gap-1 shrink-0">
    <NavBtn sizeCls={navBtnSize} onClick={() => shift(-1)} aria-label={t("prev")}>
     <ChevronLeftIcon size={18} />
    </NavBtn>
    <NavBtn sizeCls={navBtnSize} onClick={() => shift(1)} aria-label={t("next")}>
     <ChevronRightIcon size={18} />
    </NavBtn>
   </div>
  </div>
 );

 return (
  <>
   {/* View toggle + prev/next. Admin: portaled into the chrome page header.
       Kiosk: kept in-flow as a sticky bar (there is no chrome header there);
       --kiosk-notch covers the phone-frame demo cutout. */}
   {kioskLayout ? (
    <div
     className="bg-subheader min-h-14 sticky z-10 px-4 md:px-6 flex items-center border-b border-border md:border-border/60"
     style={{ top: 0, paddingTop: "var(--kiosk-notch, 0px)" }}
    >
     {headerRow}
    </div>
   ) : (
    <PageHeaderSlot>{headerRow}</PageHeaderSlot>
   )}

   <div className={wrapWidth + (kioskLayout ? " px-4 pt-8 md:pt-8 md:px-6" : "")}>
    {view === "month" ? (
     // Kiosk subtracts more: its sticky sub-header (min-h-14) + pt-8 live
     // in-flow (the admin chrome header is out-of-flow), otherwise the grid
     // + pending sidebar overflow the viewport on ≥1230px tablets.
     <div
      className={
       "min-[1230px]:flex min-[1230px]:gap-5 " +
       (kioskLayout
        ? "min-[1230px]:h-[calc(100dvh-var(--topbar-h,0px)-10rem)]"
        : "min-[1230px]:h-[calc(100dvh-var(--topbar-h,0px)-5rem)]")
      }
     >
      {/* Desktop left: calendar fills the full viewport height and takes the
          remaining width; the page never scrolls — only the pending list on the
          right does (see below). */}
      <div className="min-[1230px]:flex-1 min-[1230px]:min-w-0 min-[1230px]:h-full">
       <MonthView
        focusDate={monthFocus}
        bookings={monthBookings}
        timezone={restaurant.bookingSettings.timezone}
        onClickDay={(d) => {
         track("dash_booking_drill_to_day");
         router.push({ name: "reservations.day", date: fmtYMD(d) });
        }}
       />
      </div>
      {/* Desktop right: fixed-width pending list, scrolls internally. */}
      <div className="hidden min-[1230px]:block min-[1230px]:w-[360px] min-[1230px]:shrink-0 min-[1230px]:h-full min-[1230px]:overflow-y-auto">
       <PendingList
        bookings={bookings}
        tables={tables}
        onClickBooking={(b) => setSelectedId(b.id)}
       />
      </div>
      {/* Below 1230px: pending list stacks below the calendar. */}
      <div className="mt-5 min-[1230px]:hidden">
       <PendingList
        bookings={bookings}
        tables={tables}
        onClickBooking={(b) => setSelectedId(b.id)}
       />
      </div>
     </div>
    ) : (
     <>
      <div>
       <DayView
        focusDate={dayFocus}
        bookings={dayBookings}
        tables={tables}
        schedule={restaurant.bookingSettings.schedule}
        onClickBooking={(b) => setSelectedId(b.id)}
       />
      </div>
     </>
    )}
   </div>

   {shownBooking ? (
    <BookingDetailModal
     open={!!selectedBooking}
     booking={shownBooking}
     tables={tables}
     kioskLayout={kioskLayout}
     onClose={() => setSelectedId(null)}
     onStatusChange={async (status) => {
      const id = shownBooking.id;
      setSelectedId(null);
      await setBookingStatus(id, status);
     }}
    />
   ) : null}
  </>
 );
}

// Router-aware wrapper for hosts that mount ReservationsPage directly instead
// of through the SPA shell (the reservation kiosk + landing demo). It derives
// `dayDate` from the current SPA-router view so drilling into a day works there
// too. The admin shell passes `dayDate` explicitly and doesn't need this.
export function ReservationsRouted(props: {
 restaurant: Restaurant;
 bookings: Booking[];
 setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
 tables: TableEntity[];
 kioskLayout?: boolean;
 demoMode?: boolean;
}) {
 const { view } = useDashboardRouter();
 const month = view.name === "reservations" ? view.month : undefined;
 const dayDate = view.name === "reservations.day" ? view.date : undefined;
 return <ReservationsPage {...props} month={month} dayDate={dayDate} />;
}

// ---------- Sub-header buttons ----------

function NavBtn({ children, onClick, sizeCls = "h-[36px] w-[36px]", ...rest }: { children: React.ReactNode; onClick: () => void; sizeCls?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
 return (
  <button
   type="button"
   onClick={onClick}
   className={sizeCls + " rounded-lg bg-muted hover:bg-muted/70 inline-flex items-center justify-center text-foreground transition-colors shrink-0"}
   {...rest}
  >
   {children}
  </button>
 );
}

// ---------- Empty / disabled states ----------

function CtaWrapper({ children }: { children: React.ReactNode }) {
 return (
  <div>
   {children}
  </div>
 );
}

export function CtaState({ title, body, cta, onClick }: { title: string; body: string; cta?: string; onClick?: () => void }) {
 return (
  <div className="bg-card border border-border rounded-2xl px-6 py-12 flex flex-col items-center text-center">
   <div className="text-sm font-medium text-foreground mb-2">{title}</div>
   <p className={"text-xs text-muted-foreground max-w-md leading-snug" + (cta ? " mb-6" : "")}>{body}</p>
   {cta && onClick ? (
    <button
     type="button"
     onClick={onClick}
     className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary-gradient text-primary-foreground text-xs font-medium transition-colors"
    >
     {cta}
    </button>
   ) : null}
  </div>
 );
}

// ---------- Pending list ----------

function PendingList({
 bookings,
 tables,
 onClickBooking,
}: {
 bookings: Booking[];
 tables: TableEntity[];
 onClickBooking: (b: Booking) => void;
}) {
 const t = useTranslations("dashboard.reservations");
 const locale = useLocale();
 const items = useMemo(() => {
  return bookings
   .filter((b) => b.status === "pending")
   .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
 }, [bookings]);

 if (items.length === 0) {
  return (
   <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-[hsl(var(--menu-card-bg))] border border-border rounded-xl px-6 py-10 text-center">
    <div>
     <div className="text-sm font-medium text-foreground mb-1">{t("pendingEmptyTitle")}</div>
     <div className="text-sm text-muted-foreground">{t("pendingEmptyBody")}</div>
    </div>
   </div>
  );
 }

 return (
  // One card holding a flat, borderless row list — mirrors a menu category.
  <div className="w-full rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
   <div className="pb-3 text-base font-medium tracking-tight text-foreground">
    {t("pendingHeader", { count: items.length })}
   </div>
   <div>
    {items.map((b) => {
     const dt = new Date(b.datetime);
     const tbl = tables.find((tt) => tt.id === b.tableId);
     return (
      <div
       key={b.id}
       data-testid="pending-booking"
       role="button"
       tabIndex={0}
       onClick={() => onClickBooking(b)}
       onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         onClickBooking(b);
        }
       }}
       className="flex items-center gap-3 py-3 -mx-2 px-2 rounded-lg select-none cursor-pointer transition-colors md:hover:bg-primary/5"
      >
       <span className="flex-1 min-w-0 text-sm text-foreground tabular-nums truncate">
        {cachedDateFormat(locale, { day: "numeric", month: "long" }, dt)}
        {" "}
        {formatTime(dt)}
       </span>
       <span className="shrink-0 text-sm text-muted-foreground tabular-nums truncate">
        {tbl ? t("tableLabel", { number: tbl.number }) : t("notAssigned")}
        {" · "}
        {b.guests === 1 ? t("guestOne", { count: b.guests }) : t("guestOther", { count: b.guests })}
       </span>
      </div>
     );
    })}
   </div>
  </div>
 );
}

// ---------- Month view ----------

function MonthView({
 focusDate,
 bookings,
 timezone,
 onClickDay,
}: {
 focusDate: Date;
 bookings: Booking[];
 // Restaurant timezone — "today" must highlight the venue's today, not the
 // browser's (matters for an owner checking from another timezone).
 timezone?: string | null;
 onClickDay: (d: Date) => void;
}) {
 const t = useTranslations("dashboard.reservations");
 const locale = useLocale();
 const today = todayMidnight(timezone);

 // An all-day kiosk crosses midnight without any re-render trigger — re-arm
 // a timer for shortly after local midnight so the "today" ring moves on.
 const todayKey = fmtYMD(today);
 const [, setMidnightTick] = useState(0);
 useEffect(() => {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 30);
  const id = window.setTimeout(() => setMidnightTick((v) => v + 1), next.getTime() - now.getTime());
  return () => window.clearTimeout(id);
 }, [todayKey]);

 // Build day cells for the visible month only. Leading empty slots are
 // inserted so weekdays line up; trailing empty cells are not needed —
 // weekday alignment is what matters visually.
 const cells = useMemo(() => {
  const year = focusDate.getFullYear();
  const month = focusDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = (firstOfMonth.getDay() + 6) % 7; // ISO weekday: Mon=0
  type Cell = { kind: "empty" } | { kind: "day"; date: Date; items: Booking[] };
  // Single pass: bucket bookings by local day (one Date per booking) instead
  // of filtering the whole list per cell (31 × N Date allocations).
  const byDay = new Map<number, Booking[]>();
  for (const b of bookings) {
   const d = new Date(b.datetime);
   if (d.getFullYear() !== year || d.getMonth() !== month) continue;
   const day = d.getDate();
   const list = byDay.get(day);
   if (list) list.push(b);
   else byDay.set(day, [b]);
  }
  for (const list of byDay.values()) {
   list.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }
  const list: Cell[] = [];
  for (let i = 0; i < leadingEmpty; i++) list.push({ kind: "empty" });
  for (let d = 1; d <= daysInMonth; d++) {
   list.push({ kind: "day", date: new Date(year, month, d), items: byDay.get(d) ?? [] });
  }
  // Pad to whole weeks — trailing empties for clean grid.
  while (list.length % 7 !== 0) list.push({ kind: "empty" });
  return list;
 }, [focusDate, bookings]);

 const weekdayLabels = useMemo(() => {
  // ISO week starting Mon. Use a known Monday and step.
  const start = new Date(2024, 0, 1); // 2024-01-01 is Monday.
  return Array.from({ length: 7 }, (_, i) => {
   const d = new Date(start);
   d.setDate(start.getDate() + i);
   return d.toLocaleDateString(locale, { weekday: "short" });
  });
 }, [locale]);

 const weeks = Math.max(1, cells.length / 7);

 return (
  <div className="flex flex-col min-[1230px]:h-full min-[1230px]:min-h-[420px]">
   <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[11px] font-medium text-muted-foreground/50 uppercase tracking-wider">
    {weekdayLabels.map((w, i) => (
     <div key={i}>{w}</div>
    ))}
   </div>
   <div
    className="grid grid-cols-7 gap-2 flex-1 min-h-0"
    style={{ gridTemplateRows: `repeat(${weeks}, minmax(0, 1fr))` }}
   >
    {cells.map((cell, i) => {
     if (cell.kind === "empty") {
      return <div key={i} className="aspect-square sm:aspect-auto" />;
     }
     const isToday = isSameDay(cell.date, today);
     const cellDate = cell.date;
     const cellItems = cell.items;
     return (
      <button
       key={i}
       type="button"
       onClick={() => onClickDay(cellDate)}
       className={
        "relative aspect-square sm:aspect-[5/4] min-[1230px]:aspect-auto min-[1230px]:h-full rounded-lg border bg-[hsl(var(--menu-card-bg))] p-1.5 flex flex-col gap-0.5 overflow-hidden text-left transition-colors hover:border-primary/60 hover:bg-muted/40 " +
        (isToday ? "border-primary/60" : "border-border")
       }
      >
       {/* Mobile: a dot in the top-right corner if any bookings. */}
       {cellItems.length > 0 ? (
        <span className="sm:hidden absolute top-1 right-1 block w-1.5 h-1.5 rounded-full bg-primary" />
       ) : null}
       {/* Day number: centered on mobile, top-left on wider screens. */}
       <div className={"flex-1 flex items-center justify-center sm:block sm:flex-none text-sm tabular-nums " + (isToday ? "font-bold text-primary" : "text-foreground")}>
        {cellDate.getDate()}
       </div>
       {/* Wide screens: no per-booking detail, just a count badge. */}
       {cellItems.length > 0 ? (
        <div className="hidden sm:flex flex-1 items-end">
         <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-primary text-sm font-medium px-2 py-0.5 tabular-nums">
          <UsersIcon size={14} />
          {cellItems.length}
         </span>
        </div>
       ) : null}
      </button>
     );
    })}
   </div>
  </div>
 );
}

// ---------- Day view ----------

const TABLE_ROW_PX = 52;
// Minimum horizontal density of the day grid. Below this the timeline gets a
// horizontal scroll instead of squeezing 1h bookings to ~20px untappable
// slivers on phones.
const MIN_PX_PER_HOUR = 64;

function DayView({
 focusDate,
 bookings,
 tables,
 schedule,
 onClickBooking,
}: {
 focusDate: Date;
 bookings: Booking[];
 tables: TableEntity[];
 schedule: import("./types").ReservationSchedule;
 onClickBooking: (b: Booking) => void;
}) {
 const t = useTranslations("dashboard.reservations");

 const sortedTables = useMemo(
  () => [...tables].sort((a, b) => a.number - b.number),
  [tables],
 );

 // Pick today's schedule slot. Mon=0...Sun=6 (matches save format).
 const weekdayIdx = (focusDate.getDay() + 6) % 7;
 const day = schedule[weekdayIdx];
 // For closed days the grid still renders — using the nearest open day's
 // working hours as the visible range — and the whole day is striped so the
 // user sees the day is off but in the same context as open days.
 const isClosed = !!day?.closed;
 const baseDay = day && !day.closed
  ? day
  : findNearestOpenDay(schedule, weekdayIdx) || day;

 const dayStart = baseDay ? parseHour(baseDay.from) : 9;
 const dayEnd = baseDay ? Math.max(parseHourCeil(baseDay.to), dayStart + 1) : 24;
 const lunchStart = !isClosed && day?.lunchFrom ? parseHour(day.lunchFrom) : null;
 const lunchEnd = !isClosed && day?.lunchTo ? parseHourCeil(day.lunchTo) : null;

 const hours: number[] = [];
 for (let h = dayStart; h < dayEnd; h++) hours.push(h);

 const DAY_START_HOUR = dayStart;
 const DAY_END_HOUR = dayEnd;

 // Build map tableId → bookings sorted by start time. Bookings without a
 // table OR pointing at a soft-deleted table collect into an extra
 // "not assigned" row — hiding them while still counting them in the
 // header ("3 bookings", 2 visible) confused staff.
 const tableIds = new Set(tables.map((tb) => tb.id));
 const byTable = new Map<string, Booking[]>();
 const orphaned: Booking[] = [];
 for (const b of bookings) {
  if (!b.tableId || !tableIds.has(b.tableId)) {
   orphaned.push(b);
   continue;
  }
  const list = byTable.get(b.tableId) || [];
  list.push(b);
  byTable.set(b.tableId, list);
 }
 for (const list of byTable.values()) {
  list.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
 }
 orphaned.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

 const totalMinutes = (DAY_END_HOUR - DAY_START_HOUR) * 60;
 const pct = (min: number) => ((min - DAY_START_HOUR * 60) / totalMinutes) * 100;

 const stripesBg =
  "repeating-linear-gradient(45deg, rgba(148,163,184,0.2) 0 4px, transparent 4px 10px)";

 // Row body shared by real tables and the "not assigned" bucket.
 const renderRow = (key: string, label: string, items: Booking[]) => {
   // Two bookings on the same table at overlapping times must not stack on top
   // of each other (the back one becomes invisible and untappable). Greedy
   // interval colouring on start-sorted items assigns each to the first lane
   // whose previous booking has already ended; the row grows taller so every
   // lane stays a tappable height.
   const laneEnds: number[] = [];
   const placed = items.map((b) => {
     const dt = new Date(b.datetime);
     const startMin = dt.getHours() * 60 + dt.getMinutes();
     const endMin = startMin + b.duration;
     let lane = laneEnds.findIndex((e) => e <= startMin);
     if (lane === -1) {
       lane = laneEnds.length;
       laneEnds.push(endMin);
     } else {
       laneEnds[lane] = endMin;
     }
     return { b, startMin, lane };
   });
   const laneCount = Math.max(1, laneEnds.length);
   const rowHeight = Math.max(TABLE_ROW_PX, laneCount * 30);
   const laneSlot = rowHeight / laneCount;
   return (
  <div key={key} className="relative bg-[hsl(var(--menu-card-bg))] border border-border rounded-xl overflow-hidden" style={{ height: rowHeight }}>
    {/* Hour grid lines */}
    {hours.map((h, i) => (
     <div
      key={h}
      className="absolute top-0 bottom-0 border-l border-border/40 first:border-l-0"
      style={{ left: `${(i / (DAY_END_HOUR - DAY_START_HOUR)) * 100}%` }}
     />
    ))}
    {/* Closed day — stripes over the entire row. */}
    {isClosed ? (
     <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: stripesBg }}
     />
    ) : null}
    {/* Lunch break — diagonal stripes (visible on dark theme). */}
    {!isClosed && lunchStart !== null && lunchEnd !== null && day?.lunchFrom && day?.lunchTo ? (() => {
     const lLeft = pct(parseLooseMinutes(day.lunchFrom));
     const lWidth = pct(parseLooseMinutes(day.lunchTo)) - lLeft;
     return (
      <div
       className="absolute top-0 bottom-0 pointer-events-none"
       style={{
        left: `${Math.max(0, lLeft)}%`,
        width: `${Math.max(0, lWidth)}%`,
        backgroundImage: stripesBg,
       }}
      />
     );
    })() : null}
    {/* Row label — at the start of the row, muted, behind bookings. */}
    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-sm font-medium text-muted-foreground/50 tabular-nums">
     {label}
    </div>
    {placed.map(({ b, startMin, lane }) => {
      const left = pct(startMin);
      const width = (b.duration / totalMinutes) * 100;
      if (left + width <= 0 || left >= 100) return null;
      // A bar starting before the visible range is clipped on the left —
      // its width must shrink by the clipped amount, otherwise the end
      // time visually shifts right.
      const clampedLeft = Math.max(0, left);
      const clampedWidth = Math.min(100 - clampedLeft, width - (clampedLeft - left));
      return (
       <button
        key={b.id}
        type="button"
        onClick={() => onClickBooking(b)}
        className={
         "absolute rounded-md px-3 text-sm font-medium text-left truncate transition-colors " +
         STATUS_BAR[b.status]
        }
        style={{
         left: `${clampedLeft}%`,
         width: `${clampedWidth}%`,
         top: lane * laneSlot + 3,
         height: laneSlot - 6,
        }}
       >
        <span>{b.guestName}</span>
       </button>
      );
     })}
   </div>
   );
  };

 // One scroll container for both axes: horizontal overflow keeps 1h bookings
 // at a tappable width on phones (MIN_PX_PER_HOUR floor), and the sticky hour
 // strip stays visible while the table rows scroll vertically inside it.
 return (
  <div className="overflow-auto max-h-[calc(100dvh-var(--topbar-h,0px)-11rem)]">
   <div className="space-y-2" style={{ minWidth: (DAY_END_HOUR - DAY_START_HOUR) * MIN_PX_PER_HOUR }}>
    {/* Hour strip — one label per grid line. First label sits to the RIGHT of
        the left (Y) axis, last one to the LEFT of the right axis, the rest are
        centered on their grid lines. */}
    <div className="relative h-10 sticky top-0 z-20 bg-background">
     {[...hours, DAY_END_HOUR].map((h, i, arr) => {
      const isFirst = i === 0;
      const isLast = i === arr.length - 1;
      const leftPct = (i / (arr.length - 1)) * 100;
      const transform = isFirst
       ? "rotate(180deg)"
       : isLast
        ? "translateX(-100%) rotate(180deg)"
        : "translateX(-50%) rotate(180deg)";
      return (
       <span
        key={h}
        className="absolute top-0 text-xs text-muted-foreground/50 tabular-nums"
        style={{ left: `${leftPct}%`, writingMode: "vertical-rl", transform }}
       >
        {String(h).padStart(2, "0")}:00
       </span>
      );
     })}
    </div>

    {/* One card per table, plus a bucket row for bookings whose table is
        missing (unassigned or soft-deleted). */}
    {sortedTables.map((tbl) => renderRow(tbl.id, t("tableLabel", { number: tbl.number }), byTable.get(tbl.id) || []))}
    {orphaned.length > 0 ? renderRow("__orphaned__", t("notAssigned"), orphaned) : null}
   </div>
  </div>
 );
}

// ---------- Detail modal ----------

function BookingDetailModal({
 open,
 booking,
 tables,
 kioskLayout = false,
 onClose,
 onStatusChange,
}: {
 open: boolean;
 booking: Booking;
 tables: TableEntity[];
 // Kiosk: 44px touch targets for the host's primary daily actions.
 kioskLayout?: boolean;
 onClose: () => void;
 onStatusChange: (status: Booking["status"]) => void;
}) {
 const t = useTranslations("dashboard.reservations");
 const locale = useLocale();
 const dt = new Date(booking.datetime);
 const table = tables.find((tb) => tb.id === booking.tableId);
 const btnH = kioskLayout ? "h-[44px]" : "h-[36px]";

 const footer = booking.status === "pending" ? (
  <div className="flex gap-2 justify-end">
   <button
    type="button"
    data-testid="booking-reject"
    onClick={() => onStatusChange("cancelled")}
    className={btnH + " px-[16px] text-[14px] font-semibold text-white bg-red-600 rounded-lg transition-colors inline-flex items-center"}
   >
    <span className="truncate">{t("reject")}</span>
   </button>
   <button
    type="button"
    data-testid="booking-confirm"
    onClick={() => onStatusChange("confirmed")}
    className={btnH + " px-[16px] text-[14px] font-semibold text-white bg-emerald-600 rounded-lg transition-colors hover:bg-emerald-500 inline-flex items-center"}
   >
    <span className="truncate">{t("confirm")}</span>
   </button>
  </div>
 ) : booking.status === "confirmed" ? (
  <div className="flex gap-2 justify-end">
   <button
    type="button"
    data-testid="booking-complete"
    onClick={() => onStatusChange("completed")}
    className={primaryBtn + " inline-flex items-center" + (kioskLayout ? " h-[44px]" : "")}
   >
    <span className="truncate">{t("markComplete")}</span>
   </button>
  </div>
 ) : null;

 return (
  <Modal open={open} onClose={onClose} title={t("bookingDetailsTitle")} size="sm" footer={footer}>
   <div className="space-y-4">
    <div className="text-base font-semibold tabular-nums">
     {capitalize(cachedDateFormat(locale, { weekday: "long", day: "numeric", month: "long" }, dt))} · {formatTime(dt)}
    </div>

    <div>
     <div className="text-sm font-medium text-foreground">{booking.guestName}</div>
     {/* break-all — long emails otherwise clip inside the max-w-sm card. */}
     <div className="text-sm text-muted-foreground break-all">
      {booking.guestEmail}
      {booking.guestPhone ? ` · ${booking.guestPhone}` : ""}
     </div>
    </div>

    <div className="text-sm text-muted-foreground">
     {booking.guests === 1 ? t("guestOne", { count: booking.guests }) : t("guestOther", { count: booking.guests })}
     {" · "}
     {table ? t("tableLabel", { number: table.number }) : t("notAssigned")}
    </div>

    {booking.notes ? (
     <div className="text-sm text-muted-foreground px-3 py-2 bg-secondary rounded-md leading-relaxed">
      {booking.notes}
     </div>
    ) : null}
   </div>
  </Modal>
 );
}

// ---------- Helpers ----------

function findNearestOpenDay(
 schedule: import("./types").ReservationSchedule,
 fromIdx: number,
): import("./types").ScheduleDay | null {
 // Walk forwards through the week starting from fromIdx+1 (skip current day).
 for (let step = 1; step <= 7; step++) {
  const idx = (fromIdx + step) % 7;
  const d = schedule[idx];
  if (d && !d.closed) return d;
 }
 return null;
}

function parseLooseMinutes(hhmm: string): number {
 const [h, m] = hhmm.split(":").map(Number);
 return h * 60 + (m || 0);
}

function parseHour(hhmm: string): number {
 const [h] = hhmm.split(":").map(Number);
 return Math.max(0, Math.min(24, h));
}

function parseHourCeil(hhmm: string): number {
 const [h, m] = hhmm.split(":").map(Number);
 return Math.max(0, Math.min(24, h + (m > 0 ? 1 : 0)));
}

// Midnight of "today" — in the restaurant's timezone when provided, so the
// calendar highlights the venue's today even for a remote owner. Falls back
// to browser-local on a missing/invalid timezone.
function todayMidnight(timeZone?: string | null) {
 if (timeZone) {
  try {
   // en-CA gives YYYY-MM-DD directly.
   const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
   }).format(new Date());
   const [y, m, d] = ymd.split("-").map(Number);
   return new Date(y, m - 1, d, 0, 0, 0, 0);
  } catch {
   // fall through to browser-local
  }
 }
 const d = new Date();
 d.setHours(0, 0, 0, 0);
 return d;
}

function capitalize(s: string) {
 return s.charAt(0).toUpperCase() + s.slice(1);
}

// Local-time YYYY-MM-DD codec for the day-view URL (never UTC — bookings are
// bucketed by the venue's local calendar day).
function fmtYMD(d: Date): string {
 const p = (n: number) => String(n).padStart(2, "0");
 return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function parseYMD(s: string): Date {
 const [y, m, d] = s.split("-").map(Number);
 const parsed = new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
 // Garbage URL param → fall back to today instead of an Invalid Date view.
 return isNaN(parsed.getTime()) ? todayMidnight() : parsed;
}

// Local-time YYYY-MM codec for the month-grid URL param.
function monthStart(d: Date): Date {
 return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

function fmtYM(d: Date): string {
 return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function parseYM(s: string): Date {
 const [y, m] = s.split("-").map(Number);
 const parsed = new Date(y, (m || 1) - 1, 1, 0, 0, 0, 0);
 // Garbage URL param → fall back to the current month instead of an
 // "Invalid Date" title + NaN prev/next URLs.
 return isNaN(parsed.getTime()) ? monthStart(new Date()) : parsed;
}
