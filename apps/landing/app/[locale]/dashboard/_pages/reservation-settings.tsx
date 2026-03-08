"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { toast } from "sonner";
import { Loader2, ChevronDown } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

interface ReservationSettingsPageProps {
  initialRestaurant: {
    reservationsEnabled: boolean;
    reservationMode: string;
    reservationSlotMinutes: number;
    workingHoursStart: string;
    workingHoursEnd: string;
  } | null;
}

export function ReservationSettingsPage({ initialRestaurant }: ReservationSettingsPageProps) {
  const t = useTranslations("reservationSettings");
  const { translations } = useDashboard();

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
        track(DashboardEvent.CLICKED_SAVE_RESERVATION_SETTINGS);
        toast.success(t("saved"));
        setInitialValues({
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        });
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "reservation-settings" });
        toast.error(data.error || t("saveError"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "reservation-settings" });
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i.toString().padStart(2, "0");
    return `${h}:00`;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <PageHeader title={translations.pages.reservations} backHref="/dashboard/reservations">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
          </Button>
        </PageHeader>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          {/* Enable reservations */}
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <label htmlFor="reservations-enabled" className="flex items-center justify-between h-11 px-4 cursor-pointer">
              <span className="text-sm font-medium">{t("reservationsEnabled")}</span>
              <Switch
                id="reservations-enabled"
                checked={reservationsEnabled}
                onCheckedChange={(v) => { setReservationsEnabled(v); track(DashboardEvent.TOGGLED_RESERVATIONS_ENABLED); }}
              />
            </label>
          </div>

          {/* Confirmation mode */}
          <div className={!reservationsEnabled ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("reservationMode")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <label htmlFor="mode-auto" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("modeAuto")}</span>
                <Switch
                  id="mode-auto"
                  checked={reservationMode === "auto"}
                  onCheckedChange={(v) => { if (v) { setReservationMode("auto"); track(DashboardEvent.CHANGED_RESERVATION_MODE); } }}
                  disabled={!reservationsEnabled}
                />
              </label>
              <div className="border-t border-border mx-4" />
              <label htmlFor="mode-manual" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("modeManual")}</span>
                <Switch
                  id="mode-manual"
                  checked={reservationMode === "manual"}
                  onCheckedChange={(v) => { if (v) { setReservationMode("manual"); track(DashboardEvent.CHANGED_RESERVATION_MODE); } }}
                  disabled={!reservationsEnabled}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">
              {reservationMode === "auto" ? t("modeAutoDescription") : t("modeManualDescription")}
            </p>
          </div>

          {/* Duration */}
          <div className={!reservationsEnabled ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("slotDuration")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <div className="flex items-center justify-between h-11 px-4">
                <span className="text-sm">{t("slotDuration")}</span>
                <div className="relative">
                  <select
                    value={reservationSlotMinutes.toString()}
                    onChange={(e) => { setReservationSlotMinutes(parseInt(e.target.value)); track(DashboardEvent.CHANGED_SLOT_DURATION); }}
                    disabled={!reservationsEnabled}
                    className="appearance-none bg-transparent text-sm text-muted-foreground pr-5 cursor-pointer focus:outline-none"
                  >
                    <option value="60">60 {t("minutes")}</option>
                    <option value="90">90 {t("minutes")}</option>
                    <option value="120">120 {t("minutes")}</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Working hours */}
          <div className={!reservationsEnabled ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("workingHours")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <div className="flex items-center justify-between h-11 px-4">
                <span className="text-sm">{t("workingHours")}</span>
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <select
                      value={workingHoursStart}
                      onChange={(e) => { setWorkingHoursStart(e.target.value); track(DashboardEvent.CHANGED_WORKING_HOURS_START); }}
                      disabled={!reservationsEnabled}
                      className="appearance-none bg-transparent text-sm text-muted-foreground pr-5 cursor-pointer focus:outline-none"
                    >
                      {hours.map((h) => <option key={`s-${h}`} value={h}>{h}</option>)}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                  </div>
                  <span className="text-muted-foreground">—</span>
                  <div className="relative">
                    <select
                      value={workingHoursEnd}
                      onChange={(e) => { setWorkingHoursEnd(e.target.value); track(DashboardEvent.CHANGED_WORKING_HOURS_END); }}
                      disabled={!reservationsEnabled}
                      className="appearance-none bg-transparent text-sm text-muted-foreground pr-5 cursor-pointer focus:outline-none"
                    >
                      {hours.map((h) => <option key={`e-${h}`} value={h}>{h}</option>)}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </DashboardContent>
      </div>
    </div>
  );
}
