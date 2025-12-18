"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, Save, X, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { PageLoader } from "../_ui/page-loader";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormSwitch } from "../_ui/form-switch";
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
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";

interface Table {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  translations?: Record<string, { zone?: string }> | null;
}

export function TablesPage() {
  const t = useTranslations("reservations");

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<Table[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTables() {
    try {
      const response = await fetch("/api/tables");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setTables(data.sort((a: Table, b: Table) => a.sortOrder - b.sortOrder));
    } catch (error) {
      console.error("Failed to fetch tables:", error);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(tableId: string, currentActive: boolean, tableNumber: number) {
    const newActive = !currentActive;

    setTables((prev) =>
      prev.map((table) => (table.id === tableId ? { ...table, isActive: newActive } : table))
    );

    try {
      const res = await fetch(`/api/tables/${tableId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setTables((prev) =>
          prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
        );
        toast.error(t("error"));
      } else {
        toast.success(newActive ? `${t("table")} ${tableNumber} ${t("active").toLowerCase()}` : `${t("table")} ${tableNumber} ${t("inactive").toLowerCase()}`);
      }
    } catch {
      setTables((prev) =>
        prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
      );
      toast.error(t("error"));
    }
  }

  function handleStartSortMode() {
    setOriginalOrder([...tables]);
    setSortMode(true);
  }

  function handleCancelSortMode() {
    setTables(originalOrder);
    setSortMode(false);
  }

  function handleMoveTable(tableId: string, direction: "up" | "down") {
    const currentIndex = tables.findIndex((t) => t.id === tableId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= tables.length) return;

    const newTables = [...tables];
    [newTables[currentIndex], newTables[swapIndex]] = [
      newTables[swapIndex],
      newTables[currentIndex],
    ];
    setTables(newTables);
  }

  async function handleSaveSortOrder() {
    setSavingSort(true);

    try {
      const sortOrder = tables.map((table, index) => ({
        id: table.id,
        sortOrder: index,
      }));

      const res = await fetch("/api/tables/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: sortOrder }),
      });

      if (res.ok) {
        toast.success(t("save"));
        setSortMode(false);
      } else {
        toast.error(t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setSavingSort(false);
    }
  }

  function handleEditTable(table: Table) {
    setEditingTable(table);
    setShowForm(true);
  }

  function handleAddTable() {
    setEditingTable(null);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    setEditingTable(null);
  }

  function handleFormSaved() {
    setShowForm(false);
    setEditingTable(null);
    fetchTables();
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        {tables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground mb-4">{t("noTables")}</p>
            <Button onClick={handleAddTable}>
              <Plus className="h-4 w-4 mr-2" />
              {t("addTable")}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {tables.map((table, index) => (
              <div
                key={table.id}
                onClick={() => !sortMode && handleEditTable(table)}
                className={`flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl transition-colors ${
                  sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {!sortMode && (
                    <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                      <Switch
                        checked={table.isActive}
                        onCheckedChange={() =>
                          handleToggleActive(table.id, table.isActive, table.number)
                        }
                      />
                    </div>
                  )}
                  <span className="text-sm font-medium">{t("table")} {table.number}</span>
                </div>

                {!sortMode && (
                  <span className="text-sm text-muted-foreground ml-2">
                    {table.capacity} {t("guests").slice(0, 3)}.
                  </span>
                )}

                {sortMode && (
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleMoveTable(table.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleMoveTable(table.id, "down")}
                      disabled={index === tables.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {tables.length > 0 && (
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
          {sortMode ? (
            <>
              <Button onClick={handleCancelSortMode} variant="outline" disabled={savingSort}>
                <X className="h-4 w-4 mr-2" />
                {t("cancel")}
              </Button>
              <Button onClick={handleSaveSortOrder} disabled={savingSort}>
                {savingSort ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {t("save")}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleStartSortMode} variant="outline">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {t("sort") || "Sort"}
              </Button>
              <Button onClick={handleAddTable}>
                <Plus className="h-4 w-4 mr-2" />
                {t("addTable")}
              </Button>
            </>
          )}
        </div>
      )}

      {showForm && (
        <TableFormSheet
          table={editingTable}
          onClose={handleFormClose}
          onSaved={handleFormSaved}
        />
      )}
    </div>
  );
}

interface TableFormSheetProps {
  table: Table | null;
  onClose: () => void;
  onSaved: () => void;
}

function TableFormSheet({ table, onClose, onSaved }: TableFormSheetProps) {
  const t = useTranslations("reservations");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [number, setNumber] = useState(table?.number?.toString() || "1");
  const [capacity, setCapacity] = useState(table?.capacity?.toString() || "4");
  const [zone, setZone] = useState(table?.zone || "");
  const [imageUrl, setImageUrl] = useState(table?.imageUrl || "");
  const [isActive, setIsActive] = useState(table?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tableTranslations, setTableTranslations] = useState<Record<string, { zone?: string }>>(
    (table?.translations as Record<string, { zone?: string }>) || {}
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEdit = !!table;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setValidationError("Invalid file type. Allowed: JPEG, PNG, WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError("Image must be less than 5MB");
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
        setValidationError(data.error || "Failed to upload");
      }
    } catch {
      setValidationError("Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleTranslationChange(lang: string, value: string) {
    setTableTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], zone: value },
    }));
  }

  async function handleDelete() {
    if (!table) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/tables/${table.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t("delete"));
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numberValue = parseInt(number) || 0;
    const capacityValue = parseInt(capacity) || 0;

    if (numberValue < 1) {
      setValidationError(t("tableNumber") + " must be at least 1");
      return;
    }

    if (capacityValue < 1) {
      setValidationError(t("capacity") + " must be at least 1");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/tables/${table.id}` : "/api/tables";
      const method = isEdit ? "PUT" : "POST";

      const cleanTranslations: Record<string, { zone: string }> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = tableTranslations[lang];
          if (trans?.zone?.trim()) {
            cleanTranslations[lang] = { zone: trans.zone.trim() };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: numberValue,
          capacity: capacityValue,
          zone: zone.trim() || null,
          imageUrl: imageUrl || null,
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        toast.success(isEdit ? t("save") : t("addTable"));
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          <div className="flex h-14 items-center border-b px-6 shrink-0">
            <SheetTitle className="text-base font-semibold">
              {isEdit ? t("editTable") : t("newTable")}
            </SheetTitle>
          </div>

          {loadingRestaurant ? (
            <PageLoader />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                <FormSwitch
                  id="isActive"
                  label={`${t("isActive")}:`}
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  activeText={t("active")}
                  inactiveText={t("inactive")}
                />

                <FormInput
                  id="number"
                  label={`${t("tableNumber")}:`}
                  value={number}
                  onChange={(value) => setNumber(value.replace(/[^0-9]/g, ""))}
                  placeholder={t("tableNumberPlaceholder")}
                />

                <FormInput
                  id="capacity"
                  label={`${t("capacity")}:`}
                  value={capacity}
                  onChange={(value) => setCapacity(value.replace(/[^0-9]/g, ""))}
                  placeholder={t("capacityPlaceholder")}
                />

                <FormInput
                  id="zone"
                  label={`${t("zone")}${otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:`}
                  value={zone}
                  onChange={setZone}
                  placeholder={t("zonePlaceholder")}
                />

                {otherLanguages.map((lang) => (
                  <FormInputTranslate
                    key={lang}
                    id={`zone-${lang}`}
                    label={`${t("zone")} (${LANGUAGE_NAMES[lang] || lang}):`}
                    value={tableTranslations[lang]?.zone || ""}
                    onChange={(value) => handleTranslationChange(lang, value)}
                    placeholder={t("zonePlaceholder")}
                    sourceText={zone}
                    sourceLanguage={restaurant?.defaultLanguage || "en"}
                    targetLanguage={lang}
                    translateErrorMessage={t("error")}
                  />
                ))}

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("image")}:</label>
                  {imageUrl ? (
                    <div className="relative">
                      <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
                        <Image
                          src={imageUrl}
                          alt="Table"
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
                        onClick={() => setImageUrl("")}
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
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{t("uploadImage")}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0">
                {isEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={saving || deleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t("delete")}
                  </Button>
                )}
                <Button type="submit" disabled={saving || deleting || uploading}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {t("save")}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("delete")}</DialogTitle>
            <DialogDescription>{t("deleteConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              <X className="h-4 w-4 mr-2" />
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("error")}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>{t("close")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
