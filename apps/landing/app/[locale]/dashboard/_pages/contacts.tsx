"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormInput } from "../_ui/form-input";
import { MapPicker } from "@/components/map-picker";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";
import { DashboardCard } from "../_ui/dashboard-card";
import { HintLabel } from "../_ui/hint-label";

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
  const router = useRouter();
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

  const [originalPhone] = useState(initPhone);
  const [originalInstagram] = useState(initInstagram);
  const [originalWhatsapp] = useState(initWhatsapp);
  const [originalLat] = useState<number | undefined>(initLat);
  const [originalLng] = useState<number | undefined>(initLng);

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
        router.push("/dashboard");
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
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background">
        <PageHeader title={translations.pages.contacts}>
          <Button
            type="submit"
            form="contacts-form"
            disabled={saving || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
          </Button>
        </PageHeader>
      </div>

      <form id="contacts-form" onSubmit={handleSubmit} className="px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-4">
          <DashboardCard title={translations.pages.contacts}>
            <div className="space-y-2">
              <HintLabel htmlFor="phone" label={`${t("phone")}:`} hint={t("phoneHint")} />
              <FormInput
                id="phone"
                label=""
                value={phone}
                onChange={setPhone}
                onFocus={() => track(DashboardEvent.FOCUSED_PHONE)}
                placeholder={t("phonePlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <HintLabel htmlFor="instagram" label={`${t("instagram")}:`} hint={t("instagramHint")} />
              <FormInput
                id="instagram"
                label=""
                value={instagram}
                onChange={setInstagram}
                onFocus={() => track(DashboardEvent.FOCUSED_INSTAGRAM)}
                placeholder={t("instagramPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <HintLabel htmlFor="whatsapp" label={`${t("whatsapp")}:`} hint={t("whatsappHint")} />
              <FormInput
                id="whatsapp"
                label=""
                value={whatsapp}
                onChange={setWhatsapp}
                onFocus={() => track(DashboardEvent.FOCUSED_WHATSAPP)}
                placeholder={t("whatsappPlaceholder")}
              />
            </div>
          </DashboardCard>

          <DashboardCard title={t("location")}>
            <div>
              <div className="rounded-md overflow-hidden border">
                <MapPicker
                  lat={lat}
                  lng={lng}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            </div>
          </DashboardCard>

          <div className="flex justify-end">
            <button
              type="submit"
              form="contacts-form"
              disabled={saving || !hasChanges}
              className="flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
            </button>
          </div>
        </DashboardContent>
      </form>
    </div>
  );
}
