"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { Category } from "@/types";

interface CategoriesListProps {
  initialData: Category[];
  translations: {
    noCategories: string;
    moveUp: string;
    moveDown: string;
    edit: string;
  };
}

export function CategoriesList({ initialData, translations: t }: CategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>(initialData);
  const [reordering, setReordering] = useState<{ id: string; direction: "up" | "down" } | null>(null);

  async function handleToggleActive(categoryId: string, currentActive: boolean, categoryName: string) {
    const newActive = !currentActive;

    // Optimistic update
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, isActive: newActive } : c))
    );

    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setCategories((prev) =>
          prev.map((c) => (c.id === categoryId ? { ...c, isActive: currentActive } : c))
        );
        toast.error("Failed to update category");
      } else {
        toast.success(newActive ? `${categoryName} enabled` : `${categoryName} disabled`);
      }
    } catch {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, isActive: currentActive } : c))
      );
      toast.error("Failed to update category");
    }
  }

  async function handleReorder(categoryId: string, direction: "up" | "down") {
    const currentIndex = categories.findIndex((c) => c.id === categoryId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= categories.length) return;

    setReordering({ id: categoryId, direction });

    try {
      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, direction }),
      });

      if (res.ok) {
        const newCategories = [...categories];
        [newCategories[currentIndex], newCategories[swapIndex]] = [
          newCategories[swapIndex],
          newCategories[currentIndex],
        ];
        setCategories(newCategories);
      }
    } catch (error) {
      console.error("Failed to reorder category:", error);
    } finally {
      setReordering(null);
    }
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-sm text-muted-foreground">{t.noCategories}</p>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-1">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={`/dashboard/categories/${category.id}`}
          className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div onClick={(e) => e.preventDefault()}>
              <Switch
                checked={category.isActive}
                onCheckedChange={() => handleToggleActive(category.id, category.isActive, category.name)}
                className="scale-75"
              />
            </div>
            <span className="text-sm truncate">{category.name}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-2" onClick={(e) => e.preventDefault()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                handleReorder(category.id, "up");
              }}
              disabled={index === 0 || !!reordering}
            >
              {reordering?.id === category.id && reordering.direction === "up" ? (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                handleReorder(category.id, "down");
              }}
              disabled={index === categories.length - 1 || !!reordering}
            >
              {reordering?.id === category.id && reordering.direction === "down" ? (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}
