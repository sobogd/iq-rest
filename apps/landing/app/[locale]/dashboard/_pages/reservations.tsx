"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { Check, X, Loader2, Settings, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useDashboard } from "../_context/dashboard-context";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

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
  initialSubscription: {
    plan: PlanType;
    subscriptionStatus: SubscriptionStatus;
    billingCycle: string | null;
    currentPeriodEnd: string | null;
    paymentProcessing: boolean;
  } | null;
}

export function ReservationsPage({ initialReservations, initialSubscription }: ReservationsPageProps) {
  const t = useTranslations("reservations");
  const tSettings = useTranslations("reservationSettings");
  const { translations } = useDashboard();
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [updating, setUpdating] = useState<string | null>(null);

  const subscriptionStatus = initialSubscription?.subscriptionStatus ?? "INACTIVE";
  const currentPlan = initialSubscription?.plan ?? "FREE";
  const hasActiveSubscription = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  const fetchReservations = useCallback(async () => {
    try {
      const res = await fetch("/api/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      toast.error(t("error"));
    }
  }, [t]);

  useEffect(() => {
    track(DashboardEvent.SHOWED_RESERVATIONS);
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchReservations, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchReservations]);

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
        toast.error(t("error"));
      } else {
        toast.success(status === "confirmed" ? t("confirmed") : t("cancelled"));
      }
    } catch {
      setReservations(prevReservations);
      toast.error(t("error"));
    } finally {
      setUpdating(null);
    }
  }

  function renderReservationCard(reservation: Reservation) {
    const date = getDateFromReservation(reservation.date);
    const isUpdating = updating === reservation.id;

    return (
      <div
        key={reservation.id}
        className="bg-muted/30 rounded-xl p-4 space-y-2"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{reservation.guestName}</div>
            <div className="text-sm text-muted-foreground/60 truncate">
              {reservation.guestEmail}
              {reservation.guestPhone && ` • ${reservation.guestPhone}`}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium">{reservation.startTime}</div>
            <div className="text-sm text-muted-foreground">
              {format(date, "dd.MM.yyyy")}
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {t("table")} {reservation.table.number}
          {reservation.table.zone && ` (${reservation.table.zone})`} • {reservation.guestsCount} {t("guests")}
        </div>

        {reservation.notes && (
          <div className="text-sm text-muted-foreground italic">
            {reservation.notes}
          </div>
        )}

        {reservation.status === "pending" && (
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={() => { track(DashboardEvent.CLICKED_CONFIRM_RESERVATION); handleUpdateStatus(reservation.id, "confirmed"); }}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-1" />
              )}
              {t("confirm")}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { track(DashboardEvent.CLICKED_REJECT_RESERVATION); handleUpdateStatus(reservation.id, "cancelled"); }}
              disabled={isUpdating}
            >
              <X className="h-4 w-4 mr-1" />
              {t("reject")}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // No active subscription — show only the amber banner
  if (!hasActiveSubscription) {
    return (
      <div className="flex flex-col h-full">
        <PageHeader title={translations.pages.reservations} />
        <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto">
          <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4">
            <div className="flex gap-3 md:gap-4 md:items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
                <p className="text-sm">
                  {tSettings("subscriptionRequired")}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/50 hover:bg-amber-500/10 self-end md:self-auto shrink-0"
                  onClick={() => router.push("/dashboard/billing")}
                >
                  {tSettings("subscribe")}
                </Button>
              </div>
            </div>
          </div>
          </div>
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
          className="flex items-center justify-center h-10 w-10"
        >
          <Settings className="h-5 w-5" />
        </button>
      </PageHeader>
      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-4">

        {activeReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground">{t("noReservations")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedReservations.pending.length > 0 && (
              <div>
                <h3 className="text-base font-semibold px-1 mb-3">{t("awaitingResponse")}</h3>
                <div className="space-y-2">
                  {groupedReservations.pending.map(renderReservationCard)}
                </div>
              </div>
            )}

            {groupedReservations.today.length > 0 && (
              <div>
                <h3 className="text-base font-semibold px-1 mb-3">{t("today")}</h3>
                <div className="space-y-2">
                  {groupedReservations.today.map(renderReservationCard)}
                </div>
              </div>
            )}

            {groupedReservations.tomorrow.length > 0 && (
              <div>
                <h3 className="text-base font-semibold px-1 mb-3">{t("tomorrow")}</h3>
                <div className="space-y-2">
                  {groupedReservations.tomorrow.map(renderReservationCard)}
                </div>
              </div>
            )}

            {groupedReservations.other.length > 0 && (
              <div>
                <h3 className="text-base font-semibold px-1 mb-3">{t("otherReservations")}</h3>
                <div className="space-y-2">
                  {groupedReservations.other.map(renderReservationCard)}
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>

    </div>
  );
}
