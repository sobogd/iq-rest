"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageLoader } from "../_ui/page-loader";
import { FormInput } from "../_ui/form-input";
import { FormSelect } from "../_ui/form-select";
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
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";

const CURRENCIES = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
];

interface Restaurant {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  currency: string;
}

export function SettingsPage() {
  const t = useTranslations("dashboard.general");
  const { returnToOnboarding } = useDashboard();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [currency, setCurrency] = useState("EUR");

  const [originalName, setOriginalName] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");
  const [originalCurrency, setOriginalCurrency] = useState("EUR");

  const [validationError, setValidationError] = useState<string | null>(null);
  const [showSlugChangedDialog, setShowSlugChangedDialog] = useState(false);
  const [newSlugUrl, setNewSlugUrl] = useState("");

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRestaurant() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setRestaurant(data);
          setName(data.title || "");
          setDescription(data.description || "");
          setSlug(data.slug || "");
          setCurrency(data.currency || "EUR");
          setOriginalName(data.title || "");
          setOriginalDescription(data.description || "");
          setOriginalSlug(data.slug || "");
          setOriginalCurrency(data.currency || "EUR");
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
      name !== originalName ||
      description !== originalDescription ||
      slug !== originalSlug ||
      currency !== originalCurrency
    );
  }, [name, description, slug, currency, originalName, originalDescription, originalSlug, originalCurrency]);

  function handleSlugChange(value: string) {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(cleanSlug);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError(t("nameRequired"));
      return;
    }

    if (!slug.trim()) {
      setValidationError(t("slugRequired"));
      return;
    }

    setSaving(true);
    const slugWasChanged = slug !== originalSlug;

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name.trim(),
          description: description.trim() || null,
          slug: slug.trim(),
          currency,
        }),
      });

      if (res.ok) {
        toast.success(t("saved"));

        setOriginalName(name);
        setOriginalDescription(description);
        setOriginalSlug(slug);
        setOriginalCurrency(currency);

        if (slugWasChanged && slug.trim()) {
          setNewSlugUrl(`https://iq-rest.com/m/${slug.trim()}`);
          setShowSlugChangedDialog(true);
        } else {
          returnToOnboarding();
        }
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

  function handleViewSite() {
    window.open(newSlugUrl, "_blank");
    setShowSlugChangedDialog(false);
    returnToOnboarding();
  }

  function handleCloseSlugDialog() {
    setShowSlugChangedDialog(false);
    returnToOnboarding();
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <form id="settings-form" onSubmit={handleSubmit} className="flex-1 overflow-auto p-6 space-y-4 max-w-md">
        <div className="space-y-2">
          <FormInput
            id="name"
            label={`${t("name")}:`}
            value={name}
            onChange={setName}
            placeholder={t("namePlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("nameHint")}
          </p>
        </div>

        <div className="space-y-2">
          <FormInput
            id="description"
            label={`${t("description")}:`}
            value={description}
            onChange={setDescription}
            placeholder={t("descriptionPlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("descriptionHint")}
          </p>
        </div>

        <div className="space-y-2">
          <FormInput
            id="slug"
            label={`${t("slug")}:`}
            value={slug}
            onChange={handleSlugChange}
            placeholder={t("slugPlaceholder")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("slugHint", { slug: slug || t("slugPlaceholder") })}
          </p>
        </div>

        <FormSelect
          id="currency"
          label={`${t("currency")}:`}
          value={currency}
          onChange={setCurrency}
          placeholder={t("currencyPlaceholder")}
          options={CURRENCIES.map((c) => ({
            value: c.code,
            label: `${c.code} (${c.symbol})`,
          }))}
        />
      </form>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        <Button type="submit" form="settings-form" disabled={saving || !hasChanges}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {t("save")}
        </Button>
      </div>

      <Dialog open={showSlugChangedDialog} onOpenChange={(open) => !open && handleCloseSlugDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("slugChangedTitle")}</DialogTitle>
            <DialogDescription>
              {t("slugChangedDescription")}<br /><a href={newSlugUrl} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{newSlugUrl}</a>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseSlugDialog}>
              {t("close")}
            </Button>
            <Button onClick={handleViewSite}>
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("view")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("validationErrorTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
