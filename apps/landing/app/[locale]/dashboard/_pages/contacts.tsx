"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageLoader } from "../_ui/page-loader";
import { FormInput } from "../_ui/form-input";
import { MapPicker } from "@/components/map-picker";
import { useTranslations } from "next-intl";

export function ContactsPage() {
  const t = useTranslations("dashboard.contacts");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);

  const [originalPhone, setOriginalPhone] = useState("");
  const [originalInstagram, setOriginalInstagram] = useState("");
  const [originalWhatsapp, setOriginalWhatsapp] = useState("");
  const [originalLat, setOriginalLat] = useState<number | undefined>(undefined);
  const [originalLng, setOriginalLng] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  async function fetchRestaurant() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setPhone(data.phone || "");
          setInstagram(data.instagram || "");
          setWhatsapp(data.whatsapp || "");
          setLat(data.y ? parseFloat(data.y) : undefined);
          setLng(data.x ? parseFloat(data.x) : undefined);
          setOriginalPhone(data.phone || "");
          setOriginalInstagram(data.instagram || "");
          setOriginalWhatsapp(data.whatsapp || "");
          setOriginalLat(data.y ? parseFloat(data.y) : undefined);
          setOriginalLng(data.x ? parseFloat(data.x) : undefined);
        }
      }
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

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
        setOriginalPhone(phone);
        setOriginalInstagram(instagram);
        setOriginalWhatsapp(whatsapp);
        setOriginalLat(lat);
        setOriginalLng(lng);
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

  return (
    <div className="flex flex-col h-full">
      <form id="contacts-form" onSubmit={handleSubmit} className="flex-1 overflow-auto p-6">
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
      </form>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        <Button type="submit" form="contacts-form" disabled={saving || !hasChanges}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
