"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, Save, X, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
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
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { analytics } from "@/lib/analytics";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormTextarea } from "../_ui/form-textarea";
import { FormTextareaTranslate } from "../_ui/form-textarea-translate";
import { FormSwitch } from "../_ui/form-switch";
import { FormSelect } from "../_ui/form-select";
import { FormAllergens } from "../_ui/form-allergens";
import { LANGUAGE_NAMES } from "../_lib/constants";
import type { AllergenCode } from "@/lib/allergens";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import type { Category } from "@/types";
import { formatPrice } from "@/lib/currencies";
import type { SubscriptionStatus } from "@prisma/client";
import type { PlanType } from "@/lib/stripe-config";
import { Link } from "@/i18n/routing";

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

export function ItemsPage() {
  const { translations, returnToOnboarding } = useDashboard();
  const t = translations.items;

  const [items, setItems] = useState<ItemWithTranslations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currency, setCurrency] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ItemWithTranslations | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<ItemWithTranslations[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  const groupedItems = useMemo(() => {
    const grouped = items.reduce(
      (acc, item) => {
        const categoryId = item.categoryId;
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: item.category,
            items: [],
          };
        }
        acc[categoryId].items.push(item);
        return acc;
      },
      {} as Record<string, { category: Pick<Category, "id" | "name" | "sortOrder">; items: ItemWithTranslations[] }>
    );

    return Object.entries(grouped).sort(
      ([, a], [, b]) => a.category.sortOrder - b.category.sortOrder
    );
  }, [items]);

  useEffect(() => {
    fetchData();

    // Check if we should open form directly (from onboarding)
    if (sessionStorage.getItem("openFormOnNavigate") === "true") {
      sessionStorage.removeItem("openFormOnNavigate");
      setShowForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    try {
      const [itemsRes, categoriesRes, restaurantRes] = await Promise.all([
        fetch("/api/items"),
        fetch("/api/categories"),
        fetch("/api/restaurant"),
      ]);

      if (!itemsRes.ok) throw new Error("Failed to fetch items");
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

      const [itemsData, categoriesData, restaurantData] = await Promise.all([
        itemsRes.json(),
        categoriesRes.json(),
        restaurantRes.ok ? restaurantRes.json() : null,
      ]);

      setItems(itemsData);
      setCategories(categoriesData);
      if (restaurantData?.currency) {
        setCurrency(restaurantData.currency);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error(t.fetchError);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(
    itemId: string,
    currentActive: boolean,
    itemName: string
  ) {
    const newActive = !currentActive;

    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, isActive: newActive } : i))
    );

    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
        );
        toast.error(t.updateError);
      } else {
        toast.success(newActive ? `${itemName} ${t.enabled}` : `${itemName} ${t.disabled}`);
        if (newActive) {

        } else {

        }
      }
    } catch {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
      );
      toast.error(t.updateError);
    }
  }

  function handleStartSortMode() {
    setOriginalOrder([...items]);
    setSortMode(true);
  }

  function handleCancelSortMode() {
    setItems(originalOrder);
    setSortMode(false);
  }

  function handleMoveItem(itemId: string, direction: "up" | "down") {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const categoryItems = items
      .filter((i) => i.categoryId === item.categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const currentIndex = categoryItems.findIndex((i) => i.id === itemId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= categoryItems.length) return;

    const swapItem = categoryItems[swapIndex];

    const newItems = items.map((i) => {
      if (i.id === itemId) {
        return { ...i, sortOrder: swapItem.sortOrder };
      }
      if (i.id === swapItem.id) {
        return { ...i, sortOrder: item.sortOrder };
      }
      return i;
    });

    setItems(newItems);
  }

  async function handleSaveSortOrder() {
    setSavingSort(true);

    try {
      const categoriesWithItems = new Map<string, { id: string; sortOrder: number }[]>();

      items.forEach((item) => {
        if (!categoriesWithItems.has(item.categoryId)) {
          categoriesWithItems.set(item.categoryId, []);
        }
        categoriesWithItems.get(item.categoryId)!.push({
          id: item.id,
          sortOrder: item.sortOrder,
        });
      });

      const promises = Array.from(categoriesWithItems.entries()).map(([categoryId, categoryItems]) => {
        const sortedItems = [...categoryItems].sort((a, b) => a.sortOrder - b.sortOrder);
        const reindexedItems = sortedItems.map((item, index) => ({
          id: item.id,
          sortOrder: index,
        }));

        return fetch("/api/items/reorder-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryId, items: reindexedItems }),
        });
      });

      const results = await Promise.all(promises);
      const allOk = results.every((res) => res.ok);

      if (allOk) {
        toast.success(t.sortSaved);

        setSortMode(false);
        fetchData();
      } else {
        toast.error(t.sortError);
      }
    } catch {
      toast.error(t.sortError);
    } finally {
      setSavingSort(false);
    }
  }

  function handleEditItem(item: ItemWithTranslations) {
    setEditingItem(item);
    setShowForm(true);
  }

  function handleAddItem() {
    setEditingItem(null);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    setEditingItem(null);
  }

  function handleFormSaved() {
    setShowForm(false);
    setEditingItem(null);
    fetchData();
    returnToOnboarding();
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              {categories.length === 0 ? t.noCategoriesHint : t.noItems}
            </p>
          </div>
        ) : (
          <div>
            {groupedItems.map(([categoryId, group], groupIndex) => (
              <div key={categoryId} className={groupIndex > 0 ? "mt-6" : ""}>
                <h3 className="text-base font-semibold px-1 mb-3">{group.category.name}</h3>
                <div className="space-y-2">
                  {group.items
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => !sortMode && handleEditItem(item)}
                        className={`flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl transition-colors ${
                          sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {!sortMode && (
                            <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                              <Switch
                                checked={item.isActive}
                                onCheckedChange={() =>
                                  handleToggleActive(item.id, item.isActive, item.name)
                                }
                              />
                            </div>
                          )}
                          <span className="text-sm font-medium truncate">{item.name}</span>
                        </div>

                        {!sortMode && (
                          <span className="text-sm text-muted-foreground ml-2">
                            {formatPrice(item.price, currency)}
                          </span>
                        )}

                        {sortMode && (
                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveItem(item.id, "up")}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleMoveItem(item.id, "down")}
                              disabled={index === group.items.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        {sortMode ? (
          <>
            <Button onClick={handleCancelSortMode} variant="outline" disabled={savingSort}>
              <X className="h-4 w-4 mr-2" />
              {t.cancel}
            </Button>
            <Button onClick={handleSaveSortOrder} disabled={savingSort}>
              {savingSort ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t.saveSort}
            </Button>
          </>
        ) : (
          <>
            {items.length > 0 && (
              <Button onClick={handleStartSortMode} variant="outline">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {t.sort}
              </Button>
            )}
            <Button onClick={handleAddItem} disabled={categories.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              {t.addItem}
            </Button>
          </>
        )}
      </div>

      {showForm && (
        <ItemFormSheet
          item={editingItem}
          categories={categories}
          onClose={handleFormClose}
          onSaved={handleFormSaved}
        />
      )}
    </div>
  );
}

interface ItemFormSheetProps {
  item: ItemWithTranslations | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
}

function ItemFormSheet({ item, categories, onClose, onSaved }: ItemFormSheetProps) {
  const { translations, setActivePage } = useDashboard();
  const t = translations.items;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(item?.categoryId || "");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [allergens, setAllergens] = useState<string[]>(item?.allergens || []);
  const [isActive, setIsActive] = useState(item?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemTranslations, setItemTranslations] = useState<Record<string, TranslationData>>(
    (item?.translations as Record<string, TranslationData>) || {}
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>("INACTIVE");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("FREE");

  const isEdit = !!item;
  const hasActiveSubscription = subscriptionStatus === "ACTIVE" && currentPlan !== "FREE";

  useEffect(() => {
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
    fetchSubscriptionStatus();
  }, []);

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
      setValidationError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
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
        setValidationError(data.error || "Failed to upload image");
      }
    } catch {
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

  async function handleDelete() {
    if (!item) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t.deleted);

        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t.deleteError);
      }
    } catch {
      toast.error(t.deleteError);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError(t.nameRequired);
      return;
    }

    if (!categoryId) {
      setValidationError(t.categoryRequired);
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      setValidationError(t.priceRequired);
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/items/${item.id}` : "/api/items";
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
        toast.success(isEdit ? t.updated : t.created);
        if (!isEdit) {
          analytics.dashboard.itemCreated();
        }
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t.saveError);
      }
    } catch {
      toast.error(t.saveError);
    } finally {
      setSaving(false);
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <>
      <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          <div className="flex h-14 items-center border-b px-6 shrink-0">
            <SheetTitle className="text-base font-semibold">
              {isEdit ? t.editItem : t.addItem}
            </SheetTitle>
          </div>

          {loadingRestaurant ? (
            <PageLoader />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                <FormSelect
                  id="category"
                  label={`${t.category}:`}
                  value={categoryId}
                  onChange={setCategoryId}
                  placeholder={t.categoryPlaceholder}
                  options={categoryOptions}
                />

                <FormInput
                  id="name"
                  label={`${t.name}${otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:`}
                  value={name}
                  onChange={setName}
                  placeholder={t.namePlaceholder}
                />

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

                <FormTextarea
                  id="description"
                  label={`${t.description}${otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:`}
                  value={description}
                  onChange={setDescription}
                  placeholder={t.descriptionPlaceholder}
                />

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

                <FormInput
                  id="price"
                  label={`${t.price}:`}
                  value={price}
                  onChange={(value) => {
                    const cleanValue = value
                      .replace(",", ".")
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1");
                    setPrice(cleanValue);
                  }}
                  placeholder={t.pricePlaceholder}
                />

                <FormSwitch
                  id="isActive"
                  label={`${t.status}:`}
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  activeText={t.active}
                  inactiveText={t.inactive}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.image}:</label>
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
                      onClick={() => fileInputRef.current?.click()}
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

                <div>
                  <label className={`text-sm font-medium ${!hasActiveSubscription ? "text-muted-foreground" : ""}`}>
                    {t.allergens}:
                  </label>
                  {!hasActiveSubscription ? (
                    <div className="space-y-2 mt-2">
                      <p className="text-sm text-amber-500">
                        {t.subscribeForAllergens}
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-amber-500/50 hover:bg-amber-500/10"
                        onClick={() => setActivePage("billing")}
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
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0">
                {isEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={saving || deleting || uploading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t.delete}
                  </Button>
                )}
                <Button type="submit" disabled={saving || deleting || uploading}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {t.save}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

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
    </>
  );
}
