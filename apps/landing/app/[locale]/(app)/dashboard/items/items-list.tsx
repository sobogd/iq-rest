"use client";

import { useState, useMemo } from "react";
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
import type { ItemWithCategory, Category } from "@/types";

interface ItemsListProps {
  initialData: ItemWithCategory[];
  translations: {
    delete: string;
    noItems: string;
    deleteConfirm: string;
    cancel: string;
    moveUp: string;
    moveDown: string;
    edit: string;
  };
}

export function ItemsList({ initialData, translations: t }: ItemsListProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [items, setItems] = useState<ItemWithCategory[]>(initialData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);

  // Group items by category and sort by category sortOrder
  const sortedGroupedItems = useMemo(() => {
    const groupedItems = items.reduce(
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
      {} as Record<string, { category: Pick<Category, "id" | "name" | "sortOrder">; items: ItemWithCategory[] }>
    );

    return Object.entries(groupedItems).sort(
      ([, a], [, b]) => a.category.sortOrder - b.category.sortOrder
    );
  }, [items]);

  async function handleReorder(itemId: string, direction: "up" | "down") {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    // Find items in the same category
    const categoryItems = items
      .filter((i) => i.categoryId === item.categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const currentIndex = categoryItems.findIndex((i) => i.id === itemId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Boundary check
    if (swapIndex < 0 || swapIndex >= categoryItems.length) return;

    // Optimistic update - swap items immediately
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
    setReordering(itemId);

    try {
      const res = await fetch("/api/items/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, direction }),
      });

      if (!res.ok) {
        // Revert on error
        setItems(items);
      }
    } catch (error) {
      console.error("Failed to reorder item:", error);
      // Revert on error
      setItems(items);
    } finally {
      setReordering(null);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    // Optimistic delete
    const previousItems = items;
    setItems(items.filter((i) => i.id !== deleteId));
    setDeleting(true);

    try {
      const res = await fetch(`/api/items/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        // Revert on error
        setItems(previousItems);
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      // Revert on error
      setItems(previousItems);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  function handleEdit(itemId: string) {
    router.push(`/${locale}/dashboard/items/${itemId}`);
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-sm text-muted-foreground">{t.noItems}</p>
      </div>
    );
  }

  return (
    <>
      <div className="py-4 pb-24">
        {sortedGroupedItems.map(([categoryId, group], groupIndex) => (
          <div key={categoryId} className={groupIndex > 0 ? "mt-4" : ""}>
            <div className="px-6 py-3">
              <span className="text-base font-medium text-muted-foreground">
                {group.category.name}
              </span>
            </div>
            <div>
              {group.items
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-6 py-3 ${
                    index < group.items.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div
                    className="flex items-center gap-2.5 flex-1 cursor-pointer"
                    onClick={() => handleEdit(item.id)}
                  >
                    {reordering === item.id ? (
                      <div className="h-2 w-2 animate-spin rounded-full border border-primary border-t-transparent" />
                    ) : (
                      <span
                        className={`h-2 w-2 rounded-full ${
                          item.isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                    <span className="text-sm">{item.name}</span>
                  </div>

                  {/* Desktop actions */}
                  <div className="hidden md:flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReorder(item.id, "up")}
                      disabled={index === 0 || reordering === item.id}
                    >
                      <ArrowUp className="!size-[17px]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReorder(item.id, "down")}
                      disabled={
                        index === group.items.length - 1 ||
                        reordering === item.id
                      }
                    >
                      <ArrowDown className="!size-[17px]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                    >
                      <Trash2 className="!size-3.5" />
                    </Button>
                  </div>

                  {/* Mobile dropdown */}
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 focus-visible:ring-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleReorder(item.id, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="!size-[17px] mr-2" />
                          {t.moveUp}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleReorder(item.id, "down")}
                          disabled={index === group.items.length - 1}
                        >
                          <ArrowDown className="!size-[17px] mr-2" />
                          {t.moveDown}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteId(item.id)}
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
