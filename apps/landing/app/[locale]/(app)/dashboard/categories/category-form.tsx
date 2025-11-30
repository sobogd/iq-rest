"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Category {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface CategoryFormProps {
  category?: Category;
  translations: {
    name: string;
    namePlaceholder: string;
    description_label: string;
    descriptionPlaceholder: string;
    isActive: string;
    save: string;
    saving: string;
    cancel: string;
    delete?: string;
    deleteConfirm?: string;
  };
}

export function CategoryForm({ category, translations: t }: CategoryFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!category;

  async function handleDelete() {
    if (!category) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/categories`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete category");
      }
    } catch {
      setError("Failed to delete category");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/categories/${category.id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          isActive,
        }),
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/categories`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category");
      }
    } catch {
      setError("Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">{t.name}</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t.description_label}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <Label htmlFor="isActive">{t.isActive}</Label>
      </div>

      <div className="pt-2 flex items-center gap-3">
        {isEdit && t.delete && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            disabled={saving || deleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <Button type="submit" disabled={saving || deleting}>
          <Save className="h-4 w-4 mr-1.5" />
          {saving ? t.saving : t.save}
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.delete}</DialogTitle>
            <DialogDescription>{t.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
