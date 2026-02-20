"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Loader2, Save, X, Trash2, Upload, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocale } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormTextarea } from "../_ui/form-textarea";
import { FormTextareaTranslate } from "../_ui/form-textarea-translate";
import { FormSwitch } from "../_ui/form-switch";
import { FormSelect } from "../_ui/form-select";
import { FormAllergens } from "../_ui/form-allergens";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LANGUAGE_NAMES } from "../_lib/constants";
import type { AllergenCode } from "@/lib/allergens";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import type { Category } from "@/types";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";

interface TranslationData {
  name?: string;
  description?: string;
}

interface ItemWithTranslations {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
  translations?: Record<string, TranslationData> | null;
  category: Pick<Category, "id" | "name" | "sortOrder">;
}

interface ItemFormPageProps {
  id?: string;
  initialCategoryId?: string;
}

export function ItemFormPage({ id, initialCategoryId }: ItemFormPageProps) {
  const { translations } = useDashboard();
  const router = useRouter();
  const locale = useLocale();
  const t = translations.items;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId || "");
  const [imageUrl, setImageUrl] = useState("");
  const [allergens, setAllergens] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showGenerateLimitDialog, setShowGenerateLimitDialog] = useState(false);
  const [itemTranslations, setItemTranslations] = useState<Record<string, TranslationData>>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");
  const [moreDetailsOpen, setMoreDetailsOpen] = useState(false);

  const isEdit = !!id;
  const hasActiveSubscription = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  useEffect(() => {
    track(DashboardEvent.SHOWED_ITEM_FORM);
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const promises: Promise<Response>[] = [
        fetch("/api/categories"),
        fetch("/api/subscription/status"),
      ];
      if (id) {
        promises.push(fetch(`/api/items/${id}`));
      }

      const results = await Promise.all(promises);
      const [categoriesRes, subscriptionRes, itemRes] = results;

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }

      if (subscriptionRes.ok) {
        const subData = await subscriptionRes.json();
        setSubscriptionStatus(subData.subscriptionStatus);
        setCurrentPlan(subData.plan);
      }

      if (id && itemRes) {
        if (!itemRes.ok) throw new Error("Failed to fetch item");
        const item: ItemWithTranslations = await itemRes.json();
        setName(item.name);
        setDescription(item.description || "");
        setPrice(item.price?.toString() || "");
        setCategoryId(item.categoryId);
        setImageUrl(item.imageUrl || "");
        setAllergens(item.allergens || []);
        setIsActive(item.isActive);
        setItemTranslations(
          (item.translations as Record<string, TranslationData>) || {}
        );
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      track(DashboardEvent.ERROR_FETCH, { page: "item" });
      toast.error(t.fetchError);
      if (id) router.push("/dashboard/menu");
    } finally {
      setLoading(false);
    }
  }

  function handleTranslationChange(lang: string, field: "name" | "description", value: string) {
    setItemTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "item", field: "image_type" });
      setValidationError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "item", field: "image_size" });
      setValidationError("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_UPLOAD, { page: "item" });
        setValidationError(data.error || "Failed to upload image");
      }
    } catch {
      track(DashboardEvent.ERROR_UPLOAD, { page: "item" });
      setValidationError("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
  }

  function isAiImage(url: string) {
    const filename = url.split("/").pop() || "";
    return filename.startsWith("ai-");
  }

  async function handleGenerateImage(sourceImageUrl?: string) {
    track(DashboardEvent.CLICKED_GENERATE_ITEM_IMAGE);
    setGenerating(true);
    try {
      const res = await fetch("/api/items/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          categoryName: categories.find((c) => c.id === categoryId)?.name || undefined,
          accentColor: restaurant?.accentColor || undefined,
          sourceImageUrl: sourceImageUrl || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "limit_reached") {
          setShowGenerateLimitDialog(true);
        } else {
          toast.error(t.generateImageError);
        }
      } else {
        toast.error(t.generateImageError);
      }
    } catch {
      toast.error(t.generateImageError);
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete() {
    if (!id) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t.deleted);
        window.location.href = `/${locale}/dashboard/menu`;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_DELETE, { page: "item" });
        toast.error(data.error || t.deleteError);
      }
    } catch {
      track(DashboardEvent.ERROR_DELETE, { page: "item" });
      toast.error(t.deleteError);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "item", field: "name" });
      setValidationError(t.nameRequired);
      return;
    }

    if (!categoryId) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "item", field: "category" });
      setValidationError(t.categoryRequired);
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "item", field: "price" });
      setValidationError(t.priceRequired);
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/items/${id}` : "/api/items";
      const method = isEdit ? "PUT" : "POST";

      const cleanTranslations: Record<string, TranslationData> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = itemTranslations[lang];
          if (trans?.name?.trim() || trans?.description?.trim()) {
            cleanTranslations[lang] = {
              name: trans.name?.trim() || undefined,
              description: trans.description?.trim() || undefined,
            };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          price: Number(price),
          imageUrl: imageUrl || null,
          allergens,
          categoryId,
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        track(DashboardEvent.CLICKED_SAVE_ITEM);
        toast.success(isEdit ? t.updated : t.created);
        window.location.href = `/${locale}/dashboard/menu`;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "item" });
        toast.error(data.error || t.saveError);
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "item" });
      toast.error(t.saveError);
    } finally {
      setSaving(false);
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  if (loading || loadingRestaurant) {
    return <PageLoader />;
  }

  // Allergens section — shared between add and edit modes
  const allergensSection = (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${!hasActiveSubscription ? "text-muted-foreground" : ""}`}>
        {t.allergens}:
      </label>
      {!hasActiveSubscription ? (
        <div className="space-y-2">
          <p className="text-sm text-amber-500">
            {t.subscribeForAllergens}
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-amber-500/50 hover:bg-amber-500/10"
            onClick={() => router.push("/dashboard/billing")}
          >
            {t.subscribe}
          </Button>
        </div>
      ) : (
        <FormAllergens
          label=""
          value={allergens}
          onChange={setAllergens}
          allergenNames={t.allergenNames as Record<AllergenCode, string>}
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={isEdit ? t.editItem : t.addItem} backHref="/dashboard/menu">
        {isEdit && (
          <button
            type="button"
            onClick={() => { track(DashboardEvent.CLICKED_DELETE_ITEM); setShowDeleteDialog(true); }}
            disabled={saving || deleting}
            className="flex items-center justify-center h-10 w-10 disabled:opacity-30"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </PageHeader>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto flex flex-col min-h-full">
          <div className="space-y-4 flex-1">
          {(!initialCategoryId || isEdit) && (
            <FormSelect
              id="category"
              label={`${t.category}:`}
              value={categoryId}
              onChange={(v) => { track(DashboardEvent.CHANGED_ITEM_CATEGORY); setCategoryId(v); }}
              placeholder={t.categoryPlaceholder}
              options={categoryOptions}
            />
          )}

          <FormInput
            id="name"
            label={`${t.name}:`}
            value={name}
            onChange={setName}
            onFocus={() => track(DashboardEvent.FOCUSED_ITEM_NAME)}
            placeholder={t.namePlaceholder}
          />

          <FormTextarea
            id="description"
            label={`${t.description}:`}
            value={description}
            onChange={setDescription}
            onFocus={() => track(DashboardEvent.FOCUSED_ITEM_DESCRIPTION)}
            placeholder={t.descriptionPlaceholder}
            rows={1}
          />

          <FormInput
            id="price"
            label={`${t.price}:`}
            value={price}
            onFocus={() => track(DashboardEvent.FOCUSED_ITEM_PRICE)}
            onChange={(value) => {
              const cleanValue = value
                .replace(",", ".")
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
              setPrice(cleanValue);
            }}
            placeholder={t.pricePlaceholder}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{t.image}:</label>
              <button
                type="button"
                onClick={() => imageUrl ? (isAiImage(imageUrl) ? handleGenerateImage() : handleGenerateImage(imageUrl)) : handleGenerateImage()}
                disabled={generating || !name.trim()}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 underline disabled:opacity-50 transition-colors"
              >
                {generating ? t.generatingImage : imageUrl ? (isAiImage(imageUrl) ? t.regenerateImage : t.changeBackground) : t.generateImage}
                {generating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            {imageUrl ? (
              <div className="relative">
                <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
                  <Image
                    src={imageUrl}
                    alt="Item image"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 left-36 h-6 w-6"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
                onClick={() => { track(DashboardEvent.CLICKED_UPLOAD_ITEM_IMAGE); fileInputRef.current?.click(); }}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Uploading...
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t.uploadImage}
                    </span>
                  </div>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>

          <Collapsible open={moreDetailsOpen} onOpenChange={(open) => { track(DashboardEvent.TOGGLED_ITEM_MORE_DETAILS); setMoreDetailsOpen(open); }} className="!mt-8">
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${moreDetailsOpen ? "rotate-180" : ""}`} />
                {t.moreDetails}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-6">
              {otherLanguages.map((lang) => (
                <FormInputTranslate
                  key={`name-${lang}`}
                  id={`name-${lang}`}
                  label={`${t.name} (${LANGUAGE_NAMES[lang] || lang}):`}
                  value={itemTranslations[lang]?.name || ""}
                  onChange={(value) => handleTranslationChange(lang, "name", value)}
                  placeholder={t.namePlaceholder}
                  sourceText={name}
                  sourceLanguage={restaurant?.defaultLanguage || "en"}
                  targetLanguage={lang}
                  translateErrorMessage={t.translateError}
                />
              ))}

              {otherLanguages.map((lang) => (
                <FormTextareaTranslate
                  key={`desc-${lang}`}
                  id={`desc-${lang}`}
                  label={`${t.description} (${LANGUAGE_NAMES[lang] || lang}):`}
                  value={itemTranslations[lang]?.description || ""}
                  onChange={(value) => handleTranslationChange(lang, "description", value)}
                  placeholder={t.descriptionPlaceholder}
                  sourceText={description}
                  sourceLanguage={restaurant?.defaultLanguage || "en"}
                  targetLanguage={lang}
                  translateErrorMessage={t.translateError}
                />
              ))}

              {allergensSection}

              <FormSwitch
                id="isActive"
                label={`${t.status}:`}
                checked={isActive}
                onCheckedChange={(v) => { track(DashboardEvent.TOGGLED_ITEM_ACTIVE); setIsActive(v); }}
                activeText={t.active}
                inactiveText={t.inactive}
              />
            </CollapsibleContent>
          </Collapsible>

          </div>
          <div className="pt-4 pb-2">
            <Button type="submit" disabled={saving || deleting || uploading || generating} variant="destructive" className="w-full h-12 rounded-2xl shadow-md">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t.save}
            </Button>
          </div>
          </div>
        </div>
      </form>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.delete}</DialogTitle>
            <DialogDescription>{t.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              <X className="h-4 w-4 mr-2" />
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.validationErrorTitle}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showGenerateLimitDialog} onOpenChange={setShowGenerateLimitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.generateLimitReached}</DialogTitle>
            <DialogDescription>{t.generateLimitDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateLimitDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={() => { track(DashboardEvent.CLICKED_AI_SUBSCRIBE); setShowGenerateLimitDialog(false); router.push("/dashboard/billing"); }}>
              {t.subscribe}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
