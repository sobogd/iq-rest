"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormInput } from "../_ui/form-input";
import { MapPicker } from "@/components/map-picker";
import { useTranslations, useLocale } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface ContactsPageProps {
  initialRestaurant: {
    phone: string | null;
    instagram: string | null;
    whatsapp: string | null;
    x: string | null;
    y: string | null;
    checklistContactsSaved: boolean;
  } | null;
}

export function ContactsPage({ initialRestaurant }: ContactsPageProps) {
  const t = useTranslations("dashboard.contacts");
  const locale = useLocale();
  const { translations } = useDashboard();

  const [saving, setSaving] = useState(false);

  const isSampleContacts = !initialRestaurant?.checklistContactsSaved;
  const initPhone = isSampleContacts ? "" : (initialRestaurant?.phone || "");
  const initInstagram = isSampleContacts ? "" : (initialRestaurant?.instagram || "");
  const initWhatsapp = isSampleContacts ? "" : (initialRestaurant?.whatsapp || "");
  const initLat = initialRestaurant?.y ? parseFloat(initialRestaurant.y) : undefined;
  const initLng = initialRestaurant?.x ? parseFloat(initialRestaurant.x) : undefined;

  const [phone, setPhone] = useState(initPhone);
  const [instagram, setInstagram] = useState(initInstagram);
  const [whatsapp, setWhatsapp] = useState(initWhatsapp);
  const [lat, setLat] = useState<number | undefined>(initLat);
  const [lng, setLng] = useState<number | undefined>(initLng);

  const [originalPhone, setOriginalPhone] = useState(initPhone);
  const [originalInstagram, setOriginalInstagram] = useState(initInstagram);
  const [originalWhatsapp, setOriginalWhatsapp] = useState(initWhatsapp);
  const [originalLat, setOriginalLat] = useState<number | undefined>(initLat);
  const [originalLng, setOriginalLng] = useState<number | undefined>(initLng);

  useEffect(() => {
    track(DashboardEvent.SHOWED_CONTACTS);
  }, []);

  const hasChanges = useMemo(() => {
    return (
      phone !== originalPhone ||
      instagram !== originalInstagram ||
      whatsapp !== originalWhatsapp ||
      lat !== originalLat ||
      lng !== originalLng
    );
  }, [phone, instagram, whatsapp, lat, lng, originalPhone, originalInstagram, originalWhatsapp, originalLat, originalLng]);

  const handleLocationSelect = useCallback((newLat: number, newLng: number) => {
    track(DashboardEvent.CLICKED_MAP);
    setLat(newLat);
    setLng(newLng);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim() || null,
          instagram: instagram.trim() || null,
          whatsapp: whatsapp.trim() || null,
          x: lng?.toString() || null,
          y: lat?.toString() || null,
        }),
      });

      if (res.ok) {
        track(DashboardEvent.CLICKED_SAVE_CONTACTS);
        toast.success(t("saved"));
        window.location.href = `/${locale}/dashboard`;
        return;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "contacts" });
        toast.error(data.error || t("saveError"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "contacts" });
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.contacts} />
      <form id="contacts-form" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto flex flex-col min-h-full">
          <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <FormInput
                id="phone"
                label={`${t("phone")}:`}
                value={phone}
                onChange={setPhone}
                onFocus={() => track(DashboardEvent.FOCUSED_PHONE)}
                placeholder={t("phonePlaceholder")}
              />
              <p className="text-xs text-muted-foreground px-1">
                {t("phoneHint")}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                id="instagram"
                label={`${t("instagram")}:`}
                value={instagram}
                onChange={setInstagram}
                onFocus={() => track(DashboardEvent.FOCUSED_INSTAGRAM)}
                placeholder={t("instagramPlaceholder")}
              />
              <p className="text-xs text-muted-foreground px-1">
                {t("instagramHint")}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                id="whatsapp"
                label={`${t("whatsapp")}:`}
                value={whatsapp}
                onChange={setWhatsapp}
                onFocus={() => track(DashboardEvent.FOCUSED_WHATSAPP)}
                placeholder={t("whatsappPlaceholder")}
              />
              <p className="text-xs text-muted-foreground px-1">
                {t("whatsappHint")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("location")}:</label>
            <div className="rounded-lg overflow-hidden border">
              <MapPicker
                lat={lat}
                lng={lng}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <p className="text-xs text-muted-foreground px-1">
              {t("locationHint")}
            </p>
          </div>
        </div>
        </div>
          <div className="pt-4 pb-2">
            <Button type="submit" disabled={saving || !hasChanges} variant="destructive" className="w-full h-12 rounded-2xl shadow-md">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t("save")}
            </Button>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
}
