"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MapPicker } from "@/components/map-picker";
import { Star } from "lucide-react";

const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

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
    address: string;
    addressPlaceholder: string;
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
    languages: string;
    defaultLanguage: string;
    selectLanguages: string;
  };
}

export function RestaurantForm({ translations: t }: RestaurantFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [source, setSource] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [languages, setLanguages] = useState<string[]>(["en"]);
  const [defaultLanguage, setDefaultLanguage] = useState("en");

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
          setAddress(data.address || "");
          setLat(data.y ? parseFloat(data.y) : undefined);
          setLng(data.x ? parseFloat(data.x) : undefined);
          setPhone(data.phone || "");
          setInstagram(data.instagram || "");
          setWhatsapp(data.whatsapp || "");
          setLanguages(data.languages?.length ? data.languages : ["en"]);
          setDefaultLanguage(data.defaultLanguage || "en");
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
          address: address.trim() || null,
          x: lng?.toString() || null,
          y: lat?.toString() || null,
          phone: phone.trim() || null,
          instagram: instagram.trim() || null,
          whatsapp: whatsapp.trim() || null,
          languages,
          defaultLanguage,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
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
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">{t.title} *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.titlePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t.description}</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">{t.slug}</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder={t.slugPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label>{t.source}</Label>
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
                <span className="text-sm text-muted-foreground">Uploading...</span>
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
        <Label htmlFor="address">{t.address}</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t.addressPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label>{t.coordinates}</Label>
        <div className="rounded-lg overflow-hidden border">
          <MapPicker
            lat={lat}
            lng={lng}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.phone}</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.phonePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram">{t.instagram}</Label>
        <Input
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder={t.instagramPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">{t.whatsapp}</Label>
        <Input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder={t.whatsappPlaceholder}
        />
      </div>

      <div className="space-y-3">
        <Label>{t.languages}</Label>
        <p className="text-sm text-muted-foreground">{t.selectLanguages}</p>
        <div className="space-y-2">
          {AVAILABLE_LANGUAGES.map((lang) => {
            const isEnabled = languages.includes(lang.code);
            const isDefault = defaultLanguage === lang.code;
            return (
              <div
                key={lang.code}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLanguages([...languages, lang.code]);
                      } else {
                        const newLangs = languages.filter((l) => l !== lang.code);
                        setLanguages(newLangs.length ? newLangs : ["en"]);
                        if (defaultLanguage === lang.code) {
                          setDefaultLanguage(newLangs[0] || "en");
                        }
                      }
                    }}
                  />
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => isEnabled && setDefaultLanguage(lang.code)}
                  className={`p-1 rounded transition-all ${
                    isEnabled ? "hover:bg-muted cursor-pointer" : "cursor-default"
                  }`}
                  title={isEnabled ? t.defaultLanguage : ""}
                  disabled={!isEnabled}
                >
                  <Star
                    className={`h-5 w-5 transition-all ${
                      !isEnabled
                        ? "opacity-0"
                        : isDefault
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-400"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? t.saving : saved ? t.saved : t.save}
        </Button>
      </div>
    </form>
  );
}
