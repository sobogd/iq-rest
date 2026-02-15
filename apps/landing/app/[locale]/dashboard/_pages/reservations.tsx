"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { Check, X, Loader2, Settings, AlertCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageLoader } from "../_ui/page-loader";
import { FormSwitch } from "../_ui/form-switch";
import { useRouter } from "@/i18n/routing";
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

export function ReservationsPage() {
  const t = useTranslations("reservations");
  const tSettings = useTranslations("reservationSettings");
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Subscription state
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");

  // Settings sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reservationsEnabled, setReservationsEnabled] = useState(false);
  const [reservationMode, setReservationMode] = useState("manual");
  const [reservationSlotMinutes, setReservationSlotMinutes] = useState(90);
  const [workingHoursStart, setWorkingHoursStart] = useState("10:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("22:00");
  const [initialValues, setInitialValues] = useState({
    reservationsEnabled: false,
    reservationMode: "manual",
    reservationSlotMinutes: 90,
    workingHoursStart: "10:00",
    workingHoursEnd: "22:00",
  });

  const hasChanges =
    reservationsEnabled !== initialValues.reservationsEnabled ||
    reservationMode !== initialValues.reservationMode ||
    reservationSlotMinutes !== initialValues.reservationSlotMinutes ||
    workingHoursStart !== initialValues.workingHoursStart ||
    workingHoursEnd !== initialValues.workingHoursEnd;

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
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchReservations();
    fetchSubscriptionStatus();
    fetchSettings();
  }, [fetchReservations]);

  useEffect(() => {
    const interval = setInterval(fetchReservations, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  async function fetchSubscriptionStatus() {
    try {
      const response = await fetch("/api/subscription/status");
      if (response.ok) {
        const data = await response.json();
        setSubscriptionStatus(data.subscriptionStatus);
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
  }

  async function fetchSettings() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const enabled = data.reservationsEnabled || false;
          const mode = data.reservationMode || "manual";
          const slot = data.reservationSlotMinutes || 90;
          const start = data.workingHoursStart || "10:00";
          const end = data.workingHoursEnd || "22:00";

          setReservationsEnabled(enabled);
          setReservationMode(mode);
          setReservationSlotMinutes(slot);
          setWorkingHoursStart(start);
          setWorkingHoursEnd(end);

          setInitialValues({
            reservationsEnabled: enabled,
            reservationMode: mode,
            reservationSlotMinutes: slot,
            workingHoursStart: start,
            workingHoursEnd: end,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  }

  async function handleSaveSettings() {
    setSaving(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        }),
      });

      if (res.ok) {
        toast.success(tSettings("saved"));
        setInitialValues({
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        });
        setSheetOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error || tSettings("saveError"));
      }
    } catch {
      toast.error(tSettings("saveError"));
    } finally {
      setSaving(false);
    }
  }

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
              onClick={() => handleUpdateStatus(reservation.id, "confirmed")}
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
              onClick={() => handleUpdateStatus(reservation.id, "cancelled")}
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

  if (loading) {
    return <PageLoader />;
  }

  // No active subscription — show only the amber banner
  if (!hasActiveSubscription) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-6">
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
    );
  }

  const activeReservations = reservations.filter(r => r.status !== "cancelled");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setSheetOpen(true)}
        >
          <Settings className="h-4 w-4 mr-2" />
          {tSettings("title")}
        </Button>

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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{tSettings("title")}</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <FormSwitch
              id="reservationsEnabled"
              label={`${tSettings("reservationsEnabled")}:`}
              checked={reservationsEnabled}
              onCheckedChange={setReservationsEnabled}
              activeText={tSettings("enabled")}
              inactiveText={tSettings("disabled")}
            />

            {reservationsEnabled && (
              <>
                <div className="space-y-2">
                  <Label>{tSettings("reservationMode")}:</Label>
                  <Select value={reservationMode} onValueChange={setReservationMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">{tSettings("modeAuto")}</SelectItem>
                      <SelectItem value="manual">{tSettings("modeManual")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {reservationMode === "auto" ? tSettings("modeAutoDescription") : tSettings("modeManualDescription")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>{tSettings("slotDuration")}:</Label>
                  <Select
                    value={reservationSlotMinutes.toString()}
                    onValueChange={(v) => setReservationSlotMinutes(parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 {tSettings("minutes")}</SelectItem>
                      <SelectItem value="90">90 {tSettings("minutes")}</SelectItem>
                      <SelectItem value="120">120 {tSettings("minutes")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{tSettings("workingHours")}:</Label>
                  <div className="flex items-center gap-2">
                    <Select value={workingHoursStart} onValueChange={setWorkingHoursStart}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <SelectItem key={`start-${hour}:00`} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <span className="text-muted-foreground">—</span>
                    <Select value={workingHoursEnd} onValueChange={setWorkingHoursEnd}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0");
                          return (
                            <SelectItem key={`end-${hour}:00`} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            <Button onClick={handleSaveSettings} disabled={saving || !hasChanges} className="w-full">
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {tSettings("save")}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
