"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { Check, X, Loader2, Settings, PowerOff, Armchair } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useDashboard } from "../_context/dashboard-context";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

interface Reservation {
  id: string;
  date: Date | string;
  startTime: string;
  duration: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  guestsCount: number;
  status: string;
  notes: string | null;
  table: {
    number: number;
    zone: string | null;
  };
}

function getDateFromReservation(date: Date | string): Date {
  if (typeof date === "string") {
    return parseISO(date);
  }
  return date;
}

const POLLING_INTERVAL = 30000;

interface ReservationsPageProps {
  initialReservations: Reservation[];
  reservationsEnabled: boolean;
  hasTables: boolean;
}

export function ReservationsPage({ initialReservations, reservationsEnabled, hasTables }: ReservationsPageProps) {
  const t = useTranslations("reservations");
  const { translations } = useDashboard();
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      track(DashboardEvent.ERROR_FETCH, { page: "reservations" });
      toast.error(t("error"));
    }
  }, [t]);

  useEffect(() => {
    track(DashboardEvent.SHOWED_RESERVATIONS);
  }, []);

  useEffect(() => {
    if (!reservationsEnabled) return;
    const interval = setInterval(fetchReservations, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchReservations, reservationsEnabled]);

  const groupedReservations = useMemo(() => {
    const pending: Reservation[] = [];
    const today: Reservation[] = [];
    const tomorrow: Reservation[] = [];
    const other: Reservation[] = [];

    const sorted = [...reservations].sort((a, b) => {
      const dateA = getDateFromReservation(a.date);
      const dateB = getDateFromReservation(b.date);
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      return a.startTime.localeCompare(b.startTime);
    });

    for (const reservation of sorted) {
      if (reservation.status === "cancelled") {
        continue;
      }

      const date = getDateFromReservation(reservation.date);

      if (reservation.status === "pending") {
        pending.push(reservation);
        continue;
      }

      if (isToday(date)) {
        today.push(reservation);
      } else if (isTomorrow(date)) {
        tomorrow.push(reservation);
      } else {
        other.push(reservation);
      }
    }

    return { pending, today, tomorrow, other };
  }, [reservations]);

  async function handleUpdateStatus(id: string, status: string) {
    setUpdating(id);

    const prevReservations = reservations;
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        setReservations(prevReservations);
        track(DashboardEvent.ERROR_SAVE, { page: "reservations" });
        toast.error(t("error"));
      } else {
        toast.success(status === "confirmed" ? t("confirmed") : t("cancelled"));
      }
    } catch {
      setReservations(prevReservations);
      track(DashboardEvent.ERROR_SAVE, { page: "reservations" });
      toast.error(t("error"));
    } finally {
      setUpdating(null);
    }
  }

  function renderReservation(reservation: Reservation) {
    const date = getDateFromReservation(reservation.date);
    const isUpdating = updating === reservation.id;

    return (
      <div key={reservation.id} className="rounded-xl border border-border bg-muted/30 overflow-hidden">
        {/* Header: name + time */}
        <div className="flex items-center h-11 px-4">
          <span className="text-sm font-medium flex-1 min-w-0 truncate">{reservation.guestName}</span>
          <span className="text-sm font-medium shrink-0 ml-2">{reservation.startTime}</span>
        </div>

        {/* Date */}
        <div className="flex items-center h-11 px-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground flex-1">{format(date, "dd.MM.yyyy")}</span>
          <span className="text-sm text-muted-foreground">
            {t("table")} {reservation.table.number}
            {reservation.table.zone && ` (${reservation.table.zone})`}
          </span>
        </div>

        {/* Guests */}
        <div className="flex items-center h-11 px-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground">{reservation.guestsCount} {t("guests")}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center h-11 px-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground/60 flex-1 min-w-0 truncate">
            {reservation.guestEmail}
            {reservation.guestPhone && ` · ${reservation.guestPhone}`}
          </span>
        </div>

        {/* Notes */}
        {reservation.notes && (
          <div className="flex items-center h-11 px-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground/60 italic truncate">{reservation.notes}</span>
          </div>
        )}

        {/* Actions for pending */}
        {reservation.status === "pending" && (
          <div className="flex items-center gap-2 h-11 px-4 border-t border-border/50">
            <button
              onClick={() => { track(DashboardEvent.CLICKED_CONFIRM_RESERVATION); handleUpdateStatus(reservation.id, "confirmed"); }}
              disabled={isUpdating}
              className="flex items-center text-sm font-medium text-success hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isUpdating ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Check className="h-4 w-4 mr-1.5" />}
              {t("confirm")}
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => { track(DashboardEvent.CLICKED_REJECT_RESERVATION); handleUpdateStatus(reservation.id, "cancelled"); }}
              disabled={isUpdating}
              className="flex items-center text-sm font-medium text-red-400 hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              <X className="h-4 w-4 mr-1.5" />
              {t("reject")}
            </button>
          </div>
        )}
      </div>
    );
  }

  function renderGroup(title: string, items: Reservation[]) {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{title}</p>
        <div className="space-y-3">
          {items.map((r) => renderReservation(r))}
        </div>
      </div>
    );
  }

  const activeReservations = reservations.filter(r => r.status !== "cancelled");

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.reservations}>
        <button
          onClick={() => { track(DashboardEvent.CLICKED_RESERVATION_SETTINGS); router.push("/dashboard/reservation-settings"); }}
          className="flex items-center justify-center h-10 w-10 -mr-2"
        >
          <Settings className="h-5 w-5" />
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-4">

        {!reservationsEnabled ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <PowerOff className="h-10 w-10 text-primary" />
            <p className="text-muted-foreground/60">{t("reservationsDisabled")}</p>
            <button
              onClick={() => { track(DashboardEvent.CLICKED_RESERVATION_SETTINGS); router.push("/dashboard/reservation-settings"); }}
              className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
            >
              <Settings className="h-4 w-4" />
              {t("configureReservations")}
            </button>
          </div>
        ) : activeReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-muted-foreground">{t("noReservations")}</p>
            {!hasTables && (
              <>
                <p className="text-xs text-muted-foreground/60 text-center max-w-xs">{t("noTablesHint")}</p>
                <button
                  onClick={() => router.push("/dashboard/tables/add")}
                  className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
                >
                  <Armchair className="h-4 w-4" />
                  {t("addTable")}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {renderGroup(t("awaitingResponse"), groupedReservations.pending)}
            {renderGroup(t("today"), groupedReservations.today)}
            {renderGroup(t("tomorrow"), groupedReservations.tomorrow)}
            {renderGroup(t("otherReservations"), groupedReservations.other)}
          </div>
        )}
        </DashboardContent>
      </div>

    </div>
  );
}
