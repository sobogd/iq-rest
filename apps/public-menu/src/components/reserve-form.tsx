import { useState, useCallback, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { format, addDays, startOfWeek, isBefore, isAfter, isSameDay, addWeeks } from "date-fns";
import { Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { useForwardedSearch } from "../lib/forward-search";

interface TimeSlot {
  time: string;
  available: boolean;
  availableTables: number;
}

interface TableInfo {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  translations: Record<string, { zone?: string }> | null;
  imageUrl: string | null;
  available: boolean;
}

function cls(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function getTranslatedZone(table: TableInfo, locale: string): string | null {
  const translated = table.translations?.[locale]?.zone;
  return translated || table.zone;
}

/** Build a Date at the device's local midnight from a restaurant-local
 *  YYYY-MM-DD string. Used for event dates so that `format(date, "yyyy-MM-dd")`
 *  on submit round-trips to exactly the string we started from. */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Today as a restaurant-local YYYY-MM-DD string.
 *
 *  Event dates are restaurant-local, so "is this day still bookable" must be
 *  answered on the restaurant's clock, not the guest's: a diner in Tokyo must
 *  still see the event's first day while it is still running in Rome. Falls
 *  back to the device clock if the time zone is missing or unknown. */
function todayInTz(tz: string | undefined): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: tz || "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  } catch {
    return format(new Date(), "yyyy-MM-dd");
  }
}

export function ReserveForm() {
  const { restaurant } = useMenu();
  const { t, i18n } = useTranslation();
  const accentColor = restaurant.accentColor || "#000000";
  const slug = restaurant.slug;
  const restaurantId = restaurant.id;
  const slotMinutes = restaurant.reservationSlotMinutes;
  const mode = restaurant.reservationMode;
  const locale = i18n.language;
  const search = useForwardedSearch();

  // Schedule from restaurant payload: schedule[0] = Monday … schedule[6] = Sunday.
  // Map JS getDay() (0=Sun) → schedule index (0=Mon).
  const schedule = restaurant.reservationSchedule;
  const dayIsClosed = (date: Date) => {
    if (!Array.isArray(schedule) || schedule.length !== 7) return false;
    const idx = (date.getDay() + 6) % 7;
    return !!schedule[idx]?.closed;
  };

  const [guestsCount, setGuestsCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [tablesLoaded, setTablesLoaded] = useState(false);

  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => addDays(today, 60), [today]);
  const currentWeekStart = useMemo(() => startOfWeek(today, { weekStartsOn: 1 }), [today]);

  // Event mode: the owner listed the exact bookable dates ("reservations only on
  // 6-8 October"). While that list is non-empty the weekly strip is replaced by
  // those dates and the 60-day horizon below does not apply — the list is
  // already bounded by the owner, and events are usually planned further ahead
  // than two months. Dates already past are dropped here (on the restaurant's
  // clock, not the device's); if nothing is left the form says there is nothing
  // to book. The public API refuses past dates anyway — this is what keeps them
  // out of the picker.
  const eventMode = Array.isArray(restaurant.reservationDates) && restaurant.reservationDates.length > 0;
  const eventDates = useMemo(() => {
    const raw = Array.isArray(restaurant.reservationDates) ? restaurant.reservationDates : [];
    const todayStr = todayInTz(restaurant.timezone);
    return raw.filter((d) => d.date >= todayStr).sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [restaurant.reservationDates, restaurant.timezone]);

  const weekDates = useMemo(() => {
    const weekStart = addWeeks(currentWeekStart, currentWeekOffset);
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [currentWeekStart, currentWeekOffset]);

  const monthYearLabel = weekDates[3].toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const canGoPrev = currentWeekOffset > 0;
  const canGoNext = useMemo(() => {
    const nextWeekStart = addWeeks(currentWeekStart, currentWeekOffset + 1);
    return isBefore(nextWeekStart, maxDate);
  }, [currentWeekStart, currentWeekOffset, maxDate]);

  const fetchTimeSlots = useCallback(
    async (date: Date) => {
      if (!date || !guestsCount) {
        setTimeSlots([]);
        setSlotsLoaded(false);
        return;
      }
      setLoadingSlots(true);
      setSlotsLoaded(false);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const res = await fetch(`/api/public/reservations/availability?slug=${slug}&date=${dateStr}&guests=${guestsCount}`);
        if (res.ok) {
          const data = await res.json();
          setTimeSlots(data.timeSlots || []);
        } else {
          setTimeSlots([]);
        }
      } catch {
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
        setSlotsLoaded(true);
        setTimeout(() => timeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    },
    [guestsCount, slug],
  );

  const fetchTables = useCallback(
    async (date: Date, time: string) => {
      if (!date || !time || !guestsCount) {
        setTables([]);
        setTablesLoaded(false);
        return;
      }
      setLoadingTables(true);
      setTablesLoaded(false);
      try {
        const dateStr = format(date, "yyyy-MM-dd");
        const res = await fetch(
          `/api/public/reservations/availability?slug=${slug}&date=${dateStr}&time=${time}&guests=${guestsCount}`,
        );
        if (res.ok) {
          const data = await res.json();
          const list: TableInfo[] = data.tables || [];
          setTables(list);
          // A single free table means there is nothing to choose: pre-select it
          // so the picker is skipped and the guest lands straight on the details
          // form. The POST can send this id like a hand-picked one.
          const free = list.filter((t) => t.available);
          if (free.length === 1) setSelectedTableId(free[0].id);
        } else {
          setTables([]);
        }
      } catch {
        setTables([]);
      } finally {
        setLoadingTables(false);
        setTablesLoaded(true);
        setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    },
    [guestsCount, slug],
  );

  function handleGuestsSelect(count: number) {
    setGuestsCount(count);
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedTableId("");
    setSlotsLoaded(false);
    setTablesLoaded(false);
    setTimeout(() => dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime("");
    setSelectedTableId("");
    setSlotsLoaded(false);
    setTablesLoaded(false);
    void fetchTimeSlots(date);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setSelectedTableId("");
    setTablesLoaded(false);
    if (eventMode) {
      // Event mode is seat-based: there is no table to pick, so the guest goes
      // straight to their details (the API returns no table list at all).
      setTablesLoaded(true);
      setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      return;
    }
    if (selectedDate) void fetchTables(selectedDate, time);
  }

  function handleTableSelect(tableId: string) {
    setSelectedTableId(tableId);
    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Event mode has no table to select, so it only needs date + time; weekly
    // mode additionally requires the guest's table pick.
    const tableMissing = !eventMode && !selectedTableId;
    if (!selectedDate || !selectedTime || tableMissing || !name.trim() || !email.trim()) {
      setError(t("publicReserve.fillRequired"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          // Event mode creates a table-less booking, so the key is omitted and
          // the API takes its seat-based branch.
          ...(selectedTableId ? { tableId: selectedTableId } : {}),
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: selectedTime,
          duration: slotMinutes,
          guestName: name.trim(),
          guestEmail: email.trim(),
          guestPhone: phone.trim() || null,
          guestsCount,
          notes: notes.trim() || null,
          locale,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || t("publicReserve.error"));
      }
    } catch {
      setError(t("publicReserve.error"));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: accentColor }}>
          <Check className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black">{t("publicReserve.success")}</h3>
        <p className="text-gray-600">{mode === "auto" ? t("publicReserve.successAuto") : t("publicReserve.successManual")}</p>
        <Link
          to="/"
          search={search}
          className="inline-block mt-4 px-5 py-3 rounded-lg text-white font-semibold"
          style={{ backgroundColor: accentColor }}
        >
          {t("publicMenu.order.backHome", { defaultValue: "Back to home" })}
        </Link>
      </div>
    );
  }

  const availableTables = tables.filter((t) => t.available);
  const inputCls = "w-full h-12 px-4 border-2 border-gray-200 rounded-lg text-base bg-white text-black focus:outline-none";
  const textareaCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base bg-white text-black focus:outline-none resize-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-[100px]">
      {error ? (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
      ) : null}

      <div className="space-y-3">
        <label className="text-base font-semibold text-black">{t("publicReserve.selectGuests")}:</label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleGuestsSelect(n)}
              className="h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center"
              style={
                guestsCount === n
                  ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                  : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
              }
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {guestsCount > 0 ? (
        <div ref={dateRef} className="space-y-3">
          <label className="text-base font-semibold text-black">{t("publicReserve.selectDate")}:</label>
          {eventMode ? (
            /* Event mode: one chip per owner-listed date, with that date's own
               hours. No week navigation — there is nothing to navigate to. */
            <div className="flex flex-col gap-2">
              {eventDates.length === 0 ? (
                <p className="text-center text-gray-500 py-4">{t("publicReserve.noTimeSlotsAvailable")}</p>
              ) : (
                eventDates.map((d) => {
                  const date = parseLocalDate(d.date);
                  const isSelected = selectedDate && isSameDay(selectedDate, date);
                  const isLoading = isSelected && loadingSlots;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      disabled={loadingSlots}
                      onClick={() => handleDateSelect(date)}
                      className="h-14 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-between px-4"
                      style={
                        isSelected
                          ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                          : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
                      }
                    >
                      <span className="capitalize">
                        {date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
                      </span>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <span
                          className="text-xs font-normal"
                          style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#6b7280" }}
                        >
                          {d.from} — {d.to}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  disabled={!canGoPrev || loadingSlots}
                  onClick={() => setCurrentWeekOffset((p) => p - 1)}
                  className={cls(
                    "p-2 rounded-lg border-2 transition-colors",
                    canGoPrev && !loadingSlots
                      ? "border-gray-200 text-black hover:border-black hover:bg-black hover:text-white"
                      : "border-gray-100 text-gray-300 cursor-not-allowed",
                  )}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium text-gray-600 capitalize">{monthYearLabel}</span>
                <button
                  type="button"
                  disabled={!canGoNext || loadingSlots}
                  onClick={() => setCurrentWeekOffset((p) => p + 1)}
                  className={cls(
                    "p-2 rounded-lg border-2 transition-colors",
                    canGoNext && !loadingSlots
                      ? "border-gray-200 text-black hover:border-black hover:bg-black hover:text-white"
                      : "border-gray-100 text-gray-300 cursor-not-allowed",
                  )}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {weekDates.map((date) => {
                  const isSelected = selectedDate && isSameDay(selectedDate, date);
                  const isLoading = isSelected && loadingSlots;
                  const isPast = isBefore(date, today) && !isSameDay(date, today);
                  const isFuture = isAfter(date, maxDate);
                  const isClosed = dayIsClosed(date);
                  const isDisabled = isPast || isFuture || isClosed || loadingSlots;
                  const dateLabel = date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleDateSelect(date)}
                      className="h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center px-4 capitalize"
                      style={
                        isSelected
                          ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                          : isPast || isFuture || isClosed
                          ? { borderColor: "#f3f4f6", backgroundColor: "#f9fafb", color: "#d1d5db" }
                          : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
                      }
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : dateLabel}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ) : null}

      {selectedDate && slotsLoaded ? (
        <div ref={timeRef} className="space-y-3">
          <label className="text-base font-semibold text-black">{t("publicReserve.selectTime")}:</label>
          {timeSlots.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t("publicReserve.noTimeSlotsAvailable")}</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available || loadingTables}
                  onClick={() => handleTimeSelect(slot.time)}
                  className="h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center"
                  style={
                    selectedTime === slot.time
                      ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                      : slot.available && !loadingTables
                      ? { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
                      : { borderColor: "#f3f4f6", backgroundColor: "#f9fafb", color: "#d1d5db" }
                  }
                >
                  {selectedTime === slot.time && loadingTables ? <Loader2 className="h-4 w-4 animate-spin" /> : slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Event mode has no tables, so the picker is skipped entirely there. */}
      {/* With exactly one free table the picker is pointless — fetchTables has
          already selected it — so it only renders for 0 ("no tables" notice)
          or 2+ (an actual choice). */}
      {!eventMode && selectedTime && tablesLoaded && availableTables.length !== 1 ? (
        <div ref={tableRef} className="space-y-3">
          <label className="text-base font-semibold text-black">{t("publicReserve.selectTable")}:</label>
          {availableTables.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t("publicReserve.noAvailableTables")}</p>
          ) : (
            <div className="flex flex-col gap-3">
              {availableTables.map((table) => (
                <div key={table.id} className="flex items-center gap-3">
                  {table.imageUrl ? (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img src={table.imageUrl} alt={`${t("publicReserve.table")} ${table.number}`} className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleTableSelect(table.id)}
                    className="flex-1 h-16 rounded-lg border-2 transition-colors flex flex-col justify-center px-4 text-left"
                    style={
                      selectedTableId === table.id
                        ? { borderColor: accentColor, backgroundColor: accentColor, color: "#fff" }
                        : { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }
                    }
                  >
                    <span className="text-sm font-semibold">
                      {getTranslatedZone(table, locale) || `${t("publicReserve.table")} ${table.number}`}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: selectedTableId === table.id ? "rgba(255,255,255,0.7)" : "#6b7280" }}
                    >
                      {table.capacity} {t("publicReserve.guests")}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {(eventMode ? !!selectedTime : !!selectedTableId) ? (
        <div ref={detailsRef} className="space-y-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <label htmlFor="name" className="text-base font-semibold text-black">{t("publicReserve.name")}:</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("publicReserve.namePlaceholder")} required autoComplete="off" className={inputCls} style={{ borderColor: name ? accentColor : undefined }} />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-base font-semibold text-black">{t("publicReserve.email")}:</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("publicReserve.emailPlaceholder")} required autoComplete="off" className={inputCls} style={{ borderColor: email ? accentColor : undefined }} />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-base font-semibold text-black">{t("publicReserve.phone")}: <span className="text-sm font-normal text-gray-500">({t("publicReserve.phoneOptional")})</span></label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("publicReserve.phonePlaceholder")} autoComplete="off" className={inputCls} style={{ borderColor: phone ? accentColor : undefined }} />
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-base font-semibold text-black">{t("publicReserve.notes")}:</label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("publicReserve.notesPlaceholder")} rows={3} autoComplete="off" className={textareaCls} style={{ borderColor: notes ? accentColor : undefined }} />
          </div>
          <button
            type="submit"
            disabled={submitting || !name.trim() || !email.trim()}
            className="w-full h-14 rounded-lg font-bold text-lg transition-colors"
            style={
              !submitting && name.trim() && email.trim()
                ? { backgroundColor: accentColor, color: "#fff" }
                : { backgroundColor: "#e5e7eb", color: "#9ca3af" }
            }
          >
            {submitting ? t("publicReserve.submitting") : t("publicReserve.submit")}
          </button>
        </div>
      ) : null}
    </form>
  );
}
