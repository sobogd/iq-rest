"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category } from "@/types";

interface CategoriesListProps {
  initialData: Category[];
  translations: {
    delete: string;
    noCategories: string;
    deleteConfirm: string;
    cancel: string;
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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);

  async function handleReorder(categoryId: string, direction: "up" | "down") {
    const currentIndex = categories.findIndex((c) => c.id === categoryId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Boundary check
    if (swapIndex < 0 || swapIndex >= categories.length) return;

    // Optimistic update - swap items immediately
    const newCategories = [...categories];
    [newCategories[currentIndex], newCategories[swapIndex]] = [
      newCategories[swapIndex],
      newCategories[currentIndex],
    ];
    setCategories(newCategories);
    setReordering(categoryId);

    try {
      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, direction }),
      });

      if (!res.ok) {
        // Revert on error
        setCategories(categories);
      }
    } catch (error) {
      console.error("Failed to reorder category:", error);
      // Revert on error
      setCategories(categories);
    } finally {
      setReordering(null);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    // Optimistic delete
    const previousCategories = categories;
    setCategories(categories.filter((c) => c.id !== deleteId));
    setDeleting(true);

    try {
      const res = await fetch(`/api/categories/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        // Revert on error
        setCategories(previousCategories);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      // Revert on error
      setCategories(previousCategories);
    } finally {
      setDeleting(false);
      setDeleteId(null);
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
    <>
      <div className="divide-y py-4 pb-24">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="flex items-center justify-between px-6 py-2.5"
          >
            <div
              className="flex items-center gap-2.5 flex-1 cursor-pointer"
              onClick={() => handleEdit(category.id)}
            >
              {reordering === category.id ? (
                <div className="h-2 w-2 animate-spin rounded-full border border-primary border-t-transparent" />
              ) : (
                <span
                  className={`h-2 w-2 rounded-full ${
                    category.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
              <span className="text-sm">{category.name}</span>
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleReorder(category.id, "up")}
                disabled={index === 0 || reordering === category.id}
              >
                <ArrowUp className="!size-[17px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleReorder(category.id, "down")}
                disabled={index === categories.length - 1 || reordering === category.id}
              >
                <ArrowDown className="!size-[17px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteId(category.id)}
              >
                <Trash2 className="!size-3.5" />
              </Button>
            </div>

            {/* Mobile dropdown */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 focus-visible:ring-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleReorder(category.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="!size-[17px] mr-2" />
                    {t.moveUp}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleReorder(category.id, "down")}
                    disabled={index === categories.length - 1}
                  >
                    <ArrowDown className="!size-[17px] mr-2" />
                    {t.moveDown}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteId(category.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="!size-3.5 mr-2" />
                    {t.delete}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.delete}</DialogTitle>
            <DialogDescription>{t.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
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
    </>
  );
}
