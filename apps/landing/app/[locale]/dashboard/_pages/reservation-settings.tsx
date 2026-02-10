"use client";

import { useEffect, useState } from "react";
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
import { PageLoader } from "../_ui/page-loader";
import { FormSwitch } from "../_ui/form-switch";
import { useDashboard } from "../_context/dashboard-context";
import { analytics } from "@/lib/analytics";
import { toast } from "sonner";
import { AlertCircle, Save, Loader2 } from "lucide-react";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

export function ReservationSettingsPage() {
  const t = useTranslations("reservationSettings");
  const { setActivePage, returnToOnboarding } = useDashboard();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");

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

  useEffect(() => {
    fetchSettings();
    fetchSubscriptionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

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
        analytics.reservations.save();
        if (reservationsEnabled !== initialValues.reservationsEnabled) {
          if (reservationsEnabled) {
            analytics.reservations.enable();
          } else {
            analytics.reservations.disable();
          }
        }
        if (reservationMode !== initialValues.reservationMode) {
          if (reservationMode === "manual") {
            analytics.reservations.modeManual();
          } else {
            analytics.reservations.modeAuto();
          }
        }
        setInitialValues({
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        });
        returnToOnboarding();
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

  if (loading) {
    return <PageLoader />;
  }

  const hasProSubscription = subscriptionStatus === "ACTIVE" && currentPlan === "PRO";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {!hasProSubscription && (
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
                  onClick={() => setActivePage("billing")}
                >
                  {t("subscribe")}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className={!hasProSubscription ? "opacity-50" : ""}>
          <FormSwitch
            id="reservationsEnabled"
            label={`${t("reservationsEnabled")}:`}
            checked={reservationsEnabled}
            onCheckedChange={hasProSubscription ? setReservationsEnabled : () => {}}
            activeText={t("enabled")}
            inactiveText={t("disabled")}
            disabled={!hasProSubscription}
          />
        </div>

        {reservationsEnabled && (
          <>
            <div className="space-y-2">
              <Label>{t("reservationMode")}:</Label>
              <Select value={reservationMode} onValueChange={setReservationMode}>
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
                onValueChange={(v) => setReservationSlotMinutes(parseInt(v))}
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
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        <Button onClick={handleSave} disabled={saving || !hasChanges}>
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
