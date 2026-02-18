"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSwitch } from "../_ui/form-switch";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { AlertCircle, Save, Loader2 } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

interface ReservationSettingsPageProps {
  initialRestaurant: {
    reservationsEnabled: boolean;
    reservationMode: string;
    reservationSlotMinutes: number;
    workingHoursStart: string;
    workingHoursEnd: string;
  } | null;
  initialSubscription: {
    subscriptionStatus: SubscriptionStatus;
    plan: PlanType;
  } | null;
}

export function ReservationSettingsPage({ initialRestaurant, initialSubscription }: ReservationSettingsPageProps) {
  const t = useTranslations("reservationSettings");
  const { translations } = useDashboard();
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [reservationsEnabled, setReservationsEnabled] = useState(initialRestaurant?.reservationsEnabled ?? false);
  const [reservationMode, setReservationMode] = useState(initialRestaurant?.reservationMode ?? "manual");
  const [reservationSlotMinutes, setReservationSlotMinutes] = useState(initialRestaurant?.reservationSlotMinutes ?? 90);
  const [workingHoursStart, setWorkingHoursStart] = useState(initialRestaurant?.workingHoursStart ?? "10:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState(initialRestaurant?.workingHoursEnd ?? "22:00");

  const [initialValues, setInitialValues] = useState({
    reservationsEnabled: initialRestaurant?.reservationsEnabled ?? false,
    reservationMode: initialRestaurant?.reservationMode ?? "manual",
    reservationSlotMinutes: initialRestaurant?.reservationSlotMinutes ?? 90,
    workingHoursStart: initialRestaurant?.workingHoursStart ?? "10:00",
    workingHoursEnd: initialRestaurant?.workingHoursEnd ?? "22:00",
  });

  const subscriptionStatus = initialSubscription?.subscriptionStatus ?? "INACTIVE";
  const currentPlan = initialSubscription?.plan ?? "FREE";

  useEffect(() => {
    track(DashboardEvent.SHOWED_RESERVATION_SETTINGS);
  }, []);

  const hasChanges =
    reservationsEnabled !== initialValues.reservationsEnabled ||
    reservationMode !== initialValues.reservationMode ||
    reservationSlotMinutes !== initialValues.reservationSlotMinutes ||
    workingHoursStart !== initialValues.workingHoursStart ||
    workingHoursEnd !== initialValues.workingHoursEnd;

  async function handleSave() {
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
        toast.success(t("saved"));

        if (reservationsEnabled !== initialValues.reservationsEnabled) {
          if (reservationsEnabled) {

          } else {

          }
        }
        if (reservationMode !== initialValues.reservationMode) {
          if (reservationMode === "manual") {

          } else {

          }
        }
        setInitialValues({
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        });
      } else {
        const data = await res.json();
        toast.error(data.error || t("saveError"));
      }
    } catch {
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  const hasActiveSubscription = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.reservations} backHref="/dashboard/reservations" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto flex flex-col min-h-full">
          <div className="space-y-6 flex-1">
        {!hasActiveSubscription && (
          <div className="rounded-xl border border-amber-500/50 bg-amber-500/10 p-4">
            <div className="flex gap-3 md:gap-4 md:items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
                <p className="text-sm">
                  {t("subscriptionRequired")}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-500/50 hover:bg-amber-500/10 self-end md:self-auto shrink-0"
                  onClick={() => router.push("/dashboard/billing")}
                >
                  {t("subscribe")}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={!hasActiveSubscription ? "opacity-50" : ""}>
          <FormSwitch
            id="reservationsEnabled"
            label={`${t("reservationsEnabled")}:`}
            checked={reservationsEnabled}
            onCheckedChange={hasActiveSubscription ? (v) => { track(DashboardEvent.TOGGLED_RESERVATIONS_ENABLED); setReservationsEnabled(v); } : () => {}}
            activeText={t("enabled")}
            inactiveText={t("disabled")}
            disabled={!hasActiveSubscription}
          />
        </div>

        {reservationsEnabled && (
          <>
            <div className="space-y-2">
              <Label>{t("reservationMode")}:</Label>
              <Select value={reservationMode} onValueChange={(v) => { track(DashboardEvent.CHANGED_RESERVATION_MODE); setReservationMode(v); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">{t("modeAuto")}</SelectItem>
                  <SelectItem value="manual">{t("modeManual")}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {reservationMode === "auto" ? t("modeAutoDescription") : t("modeManualDescription")}
              </p>
            </div>

            <div className="space-y-2">
              <Label>{t("slotDuration")}:</Label>
              <Select
                value={reservationSlotMinutes.toString()}
                onValueChange={(v) => { track(DashboardEvent.CHANGED_SLOT_DURATION); setReservationSlotMinutes(parseInt(v)); }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 {t("minutes")}</SelectItem>
                  <SelectItem value="90">90 {t("minutes")}</SelectItem>
                  <SelectItem value="120">120 {t("minutes")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("workingHours")}:</Label>
              <div className="flex items-center gap-2">
                <Select value={workingHoursStart} onValueChange={(v) => { track(DashboardEvent.CHANGED_WORKING_HOURS_START); setWorkingHoursStart(v); }}>
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
                <Select value={workingHoursEnd} onValueChange={(v) => { track(DashboardEvent.CHANGED_WORKING_HOURS_END); setWorkingHoursEnd(v); }}>
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
        </div>
          <div className="pt-4 pb-2">
            <Button onClick={() => { track(DashboardEvent.CLICKED_SAVE_RESERVATION_SETTINGS); handleSave(); }} disabled={saving || !hasChanges} variant="destructive" className="w-full h-12 rounded-2xl shadow-md">
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t("save")}
            </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
