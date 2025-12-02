"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [categories, setCategories] = useState<Category[]>(initialData);
  const [reordering, setReordering] = useState<{ id: string; direction: "up" | "down" } | null>(null);

  async function handleReorder(categoryId: string, direction: "up" | "down") {
    const currentIndex = categories.findIndex((c) => c.id === categoryId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Boundary check
    if (swapIndex < 0 || swapIndex >= categories.length) return;

    setReordering({ id: categoryId, direction });

    try {
      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, direction }),
      });

      if (res.ok) {
        // Move item only after successful response
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

  function handleEdit(categoryId: string) {
    router.push(`/${locale}/dashboard/categories/${categoryId}`);
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-sm text-muted-foreground">{t.noCategories}</p>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-2">
      {categories.map((category, index) => (
        <div
          key={category.id}
          className="flex items-center justify-between px-4 py-3 bg-card rounded-lg border cursor-pointer"
          onClick={() => handleEdit(category.id)}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span
              className={`h-2 w-2 min-h-2 min-w-2 shrink-0 rounded-full ${
                category.isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="text-sm">{category.name}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReorder(category.id, "up")}
              disabled={index === 0 || !!reordering}
            >
              {reordering?.id === category.id && reordering.direction === "up" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              ) : (
                <ArrowUp className="!size-[17px]" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleReorder(category.id, "down")}
              disabled={index === categories.length - 1 || !!reordering}
            >
              {reordering?.id === category.id && reordering.direction === "down" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
              ) : (
                <ArrowDown className="!size-[17px]" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
