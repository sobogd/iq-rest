"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPicker } from "@/components/map-picker";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

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
    <div className="flex flex-col h-full">
      <div className="shrink-0">
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

      <form id="contacts-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          {/* Contacts */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{translations.pages.contacts}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Phone */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="phone" className="text-sm text-muted-foreground shrink-0 mr-3">{t("phone")}</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_PHONE)}
                  placeholder={t("phonePlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* Instagram */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="instagram" className="text-sm text-muted-foreground shrink-0 mr-3">{t("instagram")}</label>
                <input
                  id="instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_INSTAGRAM)}
                  placeholder={t("instagramPlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* WhatsApp */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="whatsapp" className="text-sm text-muted-foreground shrink-0 mr-3">{t("whatsapp")}</label>
                <input
                  id="whatsapp"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_WHATSAPP)}
                  placeholder={t("whatsappPlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("phoneHint")}</p>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("location")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <MapPicker
                lat={lat}
                lng={lng}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("locationHint")}</p>
          </div>

        </DashboardContent>
      </form>
    </div>
  );
}
