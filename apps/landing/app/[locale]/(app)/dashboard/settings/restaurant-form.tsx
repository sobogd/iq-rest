"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { Upload, X, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPicker } from "@/components/map-picker";

interface RestaurantFormProps {
  translations: {
    title: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    slug: string;
    slugPlaceholder: string;
    source: string;
    uploadMedia: string;
    removeMedia: string;
    coordinates: string;
    xPlaceholder: string;
    yPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    instagram: string;
    instagramPlaceholder: string;
    whatsapp: string;
    whatsappPlaceholder: string;
    save: string;
    saving: string;
    saved: string;
    basicInfo: string;
    contacts: string;
    reservations: string;
    reservationsEnabled: string;
    reservationsEnabledActive: string;
    reservationsEnabledInactive: string;
    reservationMode: string;
    reservationModeAuto: string;
    reservationModeManual: string;
    reservationSlotMinutes: string;
    workingHours: string;
    workingHoursStart: string;
    workingHoursEnd: string;
    minutes: string;
  };
}

export function RestaurantForm({ translations: t }: RestaurantFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromOnboarding = searchParams.get("from") === "onboarding";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [source, setSource] = useState("");
  // Default to Eiffel Tower coordinates
  const [lat, setLat] = useState<number | undefined>(48.8584);
  const [lng, setLng] = useState<number | undefined>(2.2945);
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Reservation settings
  const [reservationsEnabled, setReservationsEnabled] = useState(false);
  const [reservationMode, setReservationMode] = useState("manual");
  const [reservationSlotMinutes, setReservationSlotMinutes] = useState(90);
  const [workingHoursStart, setWorkingHoursStart] = useState("10:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("22:00");

  useEffect(() => {
    fetchRestaurant();
  }, []);

  async function fetchRestaurant() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setSlug(data.slug || "");
          setSource(data.source || "");
          setLat(data.y ? parseFloat(data.y) : undefined);
          setLng(data.x ? parseFloat(data.x) : undefined);
          setPhone(data.phone || "");
          setInstagram(data.instagram || "");
          setWhatsapp(data.whatsapp || "");
          // Reservation settings
          setReservationsEnabled(data.reservationsEnabled || false);
          setReservationMode(data.reservationMode || "manual");
          setReservationSlotMinutes(data.reservationSlotMinutes || 90);
          setWorkingHoursStart(data.workingHoursStart || "10:00");
          setWorkingHoursEnd(data.workingHoursEnd || "22:00");
        }
      }
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type - images and videos
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV");
      return;
    }

    // Validate file size (max 50MB for videos, 5MB for images)
    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(file.type.startsWith("video/") ? "Video must be less than 50MB" : "Image must be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setSource(data.url);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to upload");
      }
    } catch {
      setError("Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemoveMedia() {
    setSource("");
  }

  const handleLocationSelect = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  }, []);

  function isVideo(url: string) {
    return /\.(mp4|webm|mov)$/i.test(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          slug: slug.trim() || null,
          source: source || null,
          x: lng?.toString() || null,
          y: lat?.toString() || null,
          phone: phone.trim() || null,
          instagram: instagram.trim() || null,
          whatsapp: whatsapp.trim() || null,
          reservationsEnabled,
          reservationMode,
          reservationSlotMinutes,
          workingHoursStart,
          workingHoursEnd,
        }),
      });

      if (res.ok) {
        if (fromOnboarding) {
          router.push("/dashboard");
        } else {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-20">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">{t.title}:</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.titlePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t.description}:</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">{t.slug}:</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={t.slugPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label>{t.source}:</Label>
        {source ? (
          <div className="relative">
            <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
              {isVideo(source) ? (
                <video
                  src={source}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={source}
                  alt="Background media"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 left-36 h-6 w-6"
              onClick={handleRemoveMedia}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">AI enhancing...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t.uploadMedia}</span>
              </div>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={handleMediaUpload}
          disabled={uploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.phone}:</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram">{t.instagram}:</Label>
        <Input
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder={t.instagramPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">{t.whatsapp}:</Label>
        <Input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder={t.whatsappPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label>{t.coordinates}:</Label>
        <div className="rounded-lg overflow-hidden border">
          <MapPicker
            lat={lat}
            lng={lng}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reservationsEnabled">{t.reservations}:</Label>
        <label
          htmlFor="reservationsEnabled"
          className="flex items-center justify-between h-10 px-3 rounded-md border border-input bg-background cursor-pointer"
        >
          <span className="text-sm">
            {reservationsEnabled ? t.reservationsEnabledActive : t.reservationsEnabledInactive}
          </span>
          <Switch
            id="reservationsEnabled"
            checked={reservationsEnabled}
            onCheckedChange={setReservationsEnabled}
            className="scale-75"
          />
        </label>
      </div>

      {reservationsEnabled && (
        <>
          <div className="space-y-2">
            <Label>{t.reservationMode}:</Label>
            <Select value={reservationMode} onValueChange={setReservationMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">{t.reservationModeAuto}</SelectItem>
                <SelectItem value="manual">{t.reservationModeManual}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t.reservationSlotMinutes}:</Label>
            <Select
              value={reservationSlotMinutes.toString()}
              onValueChange={(v) => setReservationSlotMinutes(parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60 {t.minutes}</SelectItem>
                <SelectItem value="90">90 {t.minutes}</SelectItem>
                <SelectItem value="120">120 {t.minutes}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t.workingHours}:</Label>
            <div className="flex items-center gap-2">
              <Select value={workingHoursStart} onValueChange={setWorkingHoursStart}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    return (
                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
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
                      <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
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

      {/* Fixed Save Button */}
      <div className="fixed bottom-6 right-6">
        <Button type="submit" disabled={saving || uploading} className="shadow-lg">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span className="ml-1.5">{saving ? t.saving : saved ? t.saved : t.save}</span>
        </Button>
      </div>
    </form>
  );
}
