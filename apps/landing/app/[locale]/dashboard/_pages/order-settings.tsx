"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

interface OrderSettingsPageProps {
  initialRestaurant: {
    ordersEnabled: boolean;
    orderNameEnabled: boolean;
    orderPhoneEnabled: boolean;
    orderAddressEnabled: boolean;
    orderMode: string;
    whatsapp: string | null;
  } | null;
}

export function OrderSettingsPage({ initialRestaurant }: OrderSettingsPageProps) {
  const t = useTranslations("dashboard.design");
  const { translations } = useDashboard();

  const [saving, setSaving] = useState(false);

  const hasWhatsApp = Boolean(initialRestaurant?.whatsapp?.trim());

  const [ordersEnabled, setOrdersEnabled] = useState(initialRestaurant?.ordersEnabled ?? false);
  const [orderName, setOrderName] = useState(initialRestaurant?.orderNameEnabled ?? true);
  const [orderPhone, setOrderPhone] = useState(initialRestaurant?.orderPhoneEnabled ?? false);
  const [orderAddress, setOrderAddress] = useState(initialRestaurant?.orderAddressEnabled ?? false);
  const [orderMode, setOrderMode] = useState(initialRestaurant?.orderMode ?? "internal");

  const [initialValues, setInitialValues] = useState({
    ordersEnabled: initialRestaurant?.ordersEnabled ?? false,
    orderName: initialRestaurant?.orderNameEnabled ?? true,
    orderPhone: initialRestaurant?.orderPhoneEnabled ?? false,
    orderAddress: initialRestaurant?.orderAddressEnabled ?? false,
    orderMode: initialRestaurant?.orderMode ?? "internal",
  });

  useEffect(() => {
    track(DashboardEvent.SHOWED_ORDER_SETTINGS);
  }, []);

  const hasChanges =
    ordersEnabled !== initialValues.ordersEnabled ||
    orderName !== initialValues.orderName ||
    orderPhone !== initialValues.orderPhone ||
    orderAddress !== initialValues.orderAddress ||
    orderMode !== initialValues.orderMode;

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ordersEnabled,
          orderNameEnabled: orderName,
          orderPhoneEnabled: orderPhone,
          orderAddressEnabled: orderAddress,
          orderMode,
        }),
      });

      if (res.ok) {
        track(DashboardEvent.CLICKED_SAVE_ORDER_SETTINGS);
        toast.success(t("saved"));
        setInitialValues({
          ordersEnabled,
          orderName,
          orderPhone,
          orderAddress,
          orderMode,
        });
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "order-settings" });
        toast.error(data.error || t("saveError"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "order-settings" });
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <PageHeader title={translations.pages.orders} backHref="/dashboard/orders">
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

          {/* Enable orders */}
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <label htmlFor="orders-enabled" className="flex items-center justify-between h-11 px-4 cursor-pointer">
              <span className="text-sm font-medium">{t("ordersOn")}</span>
              <Switch
                id="orders-enabled"
                checked={ordersEnabled}
                onCheckedChange={(v) => { setOrdersEnabled(v); track(DashboardEvent.TOGGLED_ORDERS_ENABLED); }}
              />
            </label>
          </div>

          {/* Order mode */}
          <div className={!ordersEnabled ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("orderMode")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <label htmlFor="order-mode-internal" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("orderModeInternal")}</span>
                <Switch
                  id="order-mode-internal"
                  checked={orderMode === "internal" || orderMode === "both"}
                  onCheckedChange={(v) => {
                    const hasWa = orderMode === "whatsapp" || orderMode === "both";
                    const newMode = v ? (hasWa ? "both" : "internal") : (hasWa ? "whatsapp" : "internal");
                    setOrderMode(newMode);
                    track(DashboardEvent.CHANGED_ORDER_MODE);
                  }}
                  disabled={!ordersEnabled}
                />
              </label>
              <div className="border-t border-border mx-4" />
              <label htmlFor="order-mode-whatsapp" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("orderModeWhatsapp")}</span>
                <Switch
                  id="order-mode-whatsapp"
                  checked={orderMode === "whatsapp" || orderMode === "both"}
                  onCheckedChange={(v) => {
                    if (!hasWhatsApp && v) return;
                    const hasInt = orderMode === "internal" || orderMode === "both";
                    const newMode = v ? (hasInt ? "both" : "whatsapp") : (hasInt ? "internal" : "internal");
                    setOrderMode(newMode);
                    track(DashboardEvent.CHANGED_ORDER_MODE);
                  }}
                  disabled={!ordersEnabled || !hasWhatsApp}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("orderModeHint")}</p>
          </div>

          {/* Required fields */}
          <div className={!ordersEnabled ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("ordersFieldsHint")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <label htmlFor="order-name" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("ordersNameOn")}</span>
                <Switch
                  id="order-name"
                  checked={orderName}
                  onCheckedChange={(v) => { setOrderName(v); track(DashboardEvent.TOGGLED_ORDER_NAME); }}
                  disabled={!ordersEnabled}
                />
              </label>
              <div className="border-t border-border mx-4" />
              <label htmlFor="order-phone" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("ordersPhoneOn")}</span>
                <Switch
                  id="order-phone"
                  checked={orderPhone}
                  onCheckedChange={(v) => { setOrderPhone(v); track(DashboardEvent.TOGGLED_ORDER_PHONE); }}
                  disabled={!ordersEnabled}
                />
              </label>
              <div className="border-t border-border mx-4" />
              <label htmlFor="order-address" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("ordersAddressOn")}</span>
                <Switch
                  id="order-address"
                  checked={orderAddress}
                  onCheckedChange={(v) => { setOrderAddress(v); track(DashboardEvent.TOGGLED_ORDER_ADDRESS); }}
                  disabled={!ordersEnabled}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("ordersFieldsDescription")}</p>
          </div>

        </DashboardContent>
      </div>
    </div>
  );
}
