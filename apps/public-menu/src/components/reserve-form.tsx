import { useState, useCallback, useRef, useMemo } from "react";
import { format, addDays, startOfWeek, isBefore, isAfter, isSameDay, addWeeks } from "date-fns";
import { Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { getPreview } from "../lib/forward-search";

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

export function ReserveForm() {
  const { restaurant } = useMenu();
  const { t, i18n } = useTranslation();
  const accentColor = restaurant.accentColor || "#000000";
  const slug = restaurant.slug;
  const restaurantId = restaurant.id;
  const slotMinutes = restaurant.reservationSlotMinutes;
  const mode = restaurant.reservationMode;
  const locale = i18n.language;
  const isPreview = getPreview() === "1";

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
          setTables(data.tables || []);
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
    if (selectedDate) void fetchTables(selectedDate, time);
  }

  function handleTableSelect(tableId: string) {
    setSelectedTableId(tableId);
    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!selectedDate || !selectedTime || !selectedTableId || !name.trim() || !email.trim()) {
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
          tableId: selectedTableId,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: selectedTime,
          duration: slotMinutes,
          guestName: name.trim(),
          guestEmail: email.trim(),
          guestPhone: phone.trim() || null,
          guestsCount,
          notes: notes.trim() || null,
          locale,
          isPreview,
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

      {selectedTime && tablesLoaded ? (
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

      {selectedTableId ? (
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
