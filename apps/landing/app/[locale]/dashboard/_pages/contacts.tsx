"use client";

import { useState, useMemo, useCallback } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormInput } from "../_ui/form-input";
import { MapPicker } from "@/components/map-picker";
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";

interface ContactsPageProps {
  initialRestaurant: {
    phone: string | null;
    instagram: string | null;
    whatsapp: string | null;
    x: string | null;
    y: string | null;
  } | null;
}

export function ContactsPage({ initialRestaurant }: ContactsPageProps) {
  const t = useTranslations("dashboard.contacts");
  const { translations, returnToOnboarding } = useDashboard();

  const [saving, setSaving] = useState(false);

  const initPhone = initialRestaurant?.phone || "";
  const initInstagram = initialRestaurant?.instagram || "";
  const initWhatsapp = initialRestaurant?.whatsapp || "";
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
        toast.success(t("saved"));

        if (phone && phone !== originalPhone) 
        if (instagram && instagram !== originalInstagram) 
        if (whatsapp && whatsapp !== originalWhatsapp) 
        if (lat && lng && (lat !== originalLat || lng !== originalLng)) 
        setOriginalPhone(phone);
        setOriginalInstagram(instagram);
        setOriginalWhatsapp(whatsapp);
        setOriginalLat(lat);
        setOriginalLng(lng);
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

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.contacts} />
      <form id="contacts-form" onSubmit={handleSubmit} className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <FormInput
                id="phone"
                label={`${t("phone")}:`}
                value={phone}
                onChange={setPhone}
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

        <div className="sticky bottom-0 flex justify-end gap-2 pt-4 pb-2">
          <Button type="submit" disabled={saving || !hasChanges} variant="destructive" className="h-10 rounded-xl shadow-md">
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {t("save")}
          </Button>
        </div>
      </form>
    </div>
  );
}
