"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { format, addDays, startOfWeek, isBefore, isAfter, isSameDay, addWeeks } from "date-fns";
import { Check, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
  availableTables: number;
}

interface ReserveFormProps {
  restaurantId: string;
  slotMinutes: number;
  mode: string;
  slug: string;
  translations: {
    title: string;
    selectDate: string;
    selectTime: string;
    selectGuests: string;
    selectTable: string;
    yourDetails: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    successAuto: string;
    successManual: string;
    error: string;
    guests: string;
    table: string;
    capacity: string;
    noAvailableTables: string;
    back: string;
    noTimeSlotsAvailable: string;
    loadingAvailability: string;
  };
}

export function ReserveForm({
  restaurantId,
  slotMinutes,
  mode,
  slug,
  translations: t,
}: ReserveFormProps) {
  const [guestsCount, setGuestsCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Availability state
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [slotsLoaded, setSlotsLoaded] = useState(false);

  // Week navigation state
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Refs for scrolling
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Calculate date range (2 months = ~8 weeks)
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(() => addDays(today, 60), [today]); // 2 months ahead
  const currentWeekStart = useMemo(() => startOfWeek(today, { weekStartsOn: 1 }), [today]); // Monday

  // Generate week dates for current week offset
  const weekDates = useMemo(() => {
    const weekStart = addWeeks(currentWeekStart, currentWeekOffset);
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [currentWeekStart, currentWeekOffset]);

  // Get month/year for header (use middle of week to avoid edge cases)
  const weekMiddle = weekDates[3];
  const monthYearLabel = weekMiddle.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  // Check if we can navigate
  const canGoPrev = currentWeekOffset > 0;
  const canGoNext = useMemo(() => {
    const nextWeekStart = addWeeks(currentWeekStart, currentWeekOffset + 1);
    return isBefore(nextWeekStart, maxDate);
  }, [currentWeekStart, currentWeekOffset, maxDate]);

  // Fetch time slots when date is selected
  const fetchTimeSlots = useCallback(async (date: Date) => {
    if (!date || !guestsCount) {
      setTimeSlots([]);
      setSlotsLoaded(false);
      return;
    }

    setLoadingSlots(true);
    setSlotsLoaded(false);

    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const res = await fetch(
        `/api/public/reservations/availability?slug=${slug}&date=${dateStr}&guests=${guestsCount}`
      );

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

      // Scroll after loading is complete
      setTimeout(() => {
        timeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [guestsCount, slug]);

  function handleGuestsSelect(count: number) {
    setGuestsCount(count);
    setSelectedDate(null);
    setSelectedTime("");
    setSlotsLoaded(false);

    setTimeout(() => {
      dateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime("");
    setSlotsLoaded(false);

    // Fetch slots with the date directly
    fetchTimeSlots(date);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);

    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!selectedDate || !selectedTime || !name.trim() || !email.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/public/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: selectedTime,
          duration: slotMinutes,
          guestName: name.trim(),
          guestEmail: email.trim(),
          guestsCount,
          notes: notes.trim() || null,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create reservation");
      }
    } catch {
      setError("Failed to create reservation");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-black">{t.success}</h3>
        <p className="text-gray-600">
          {mode === "auto" ? t.successAuto : t.successManual}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-[100px]">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Select guests */}
      <div className="space-y-3">
        <label className="text-base font-semibold text-black">{t.selectGuests}:</label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => handleGuestsSelect(n)}
              className={cn(
                "h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center",
                guestsCount === n
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-black hover:border-black hover:bg-black hover:text-white"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select date with weekly navigation */}
      {guestsCount > 0 && (
        <div ref={dateRef} className="space-y-3">
          <label className="text-base font-semibold text-black">{t.selectDate}:</label>

          {/* Week navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              disabled={!canGoPrev || loadingSlots}
              onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
              className={cn(
                "p-2 rounded-lg border-2 transition-colors",
                canGoPrev && !loadingSlots
                  ? "border-gray-200 hover:border-black hover:bg-black hover:text-white"
                  : "border-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-gray-600 capitalize">
              {monthYearLabel}
            </span>
            <button
              type="button"
              disabled={!canGoNext || loadingSlots}
              onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
              className={cn(
                "p-2 rounded-lg border-2 transition-colors",
                canGoNext && !loadingSlots
                  ? "border-gray-200 hover:border-black hover:bg-black hover:text-white"
                  : "border-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Days of the week in column */}
          <div className="flex flex-col gap-2">
            {weekDates.map((date) => {
              const isSelected = selectedDate && isSameDay(selectedDate, date);
              const isLoading = isSelected && loadingSlots;
              const isPast = isBefore(date, today) && !isSameDay(date, today);
              const isFuture = isAfter(date, maxDate);
              const isDisabled = isPast || isFuture || loadingSlots;

              // Format: "Пт, 6 дек" or "Fri, Dec 6" depending on user's locale
              const dateLabel = date.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
              });

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  className={cn(
                    "h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center px-4 capitalize",
                    isSelected
                      ? "border-black bg-black text-white"
                      : isPast || isFuture
                      ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 bg-white text-black hover:border-black hover:bg-black hover:text-white",
                    loadingSlots && !isSelected && !isPast && !isFuture && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    dateLabel
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Select time */}
      {selectedDate && slotsLoaded && (
        <div ref={timeRef} className="space-y-3">
          <label className="text-base font-semibold text-black">{t.selectTime}:</label>
          {timeSlots.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t.noTimeSlotsAvailable}</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={cn(
                    "h-11 rounded-lg border-2 text-sm font-semibold transition-colors flex items-center justify-center",
                    selectedTime === slot.time
                      ? "border-black bg-black text-white"
                      : slot.available
                      ? "border-gray-200 bg-white text-black hover:border-black hover:bg-black hover:text-white"
                      : "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Enter details */}
      {selectedTime && (
        <div ref={detailsRef} className="space-y-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <label htmlFor="name" className="text-base font-semibold text-black">
              {t.name}:
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              required
              className="h-12 border-2 border-gray-200 focus:border-black text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-base font-semibold text-black">
              {t.email}:
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="h-12 border-2 border-gray-200 focus:border-black text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-base font-semibold text-black">
              {t.notes}:
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              rows={3}
              className="border-2 border-gray-200 focus:border-black resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim() || !email.trim()}
            className={cn(
              "w-full h-14 rounded-lg font-bold text-lg transition-colors",
              !submitting && name.trim() && email.trim()
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </div>
      )}
    </form>
  );
}
