"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { ItemWithCategory, Category } from "@/types";

interface ItemsListProps {
  initialData: ItemWithCategory[];
  translations: {
    noItems: string;
    moveUp: string;
    moveDown: string;
    edit: string;
  };
}

export function ItemsList({ initialData, translations: t }: ItemsListProps) {
  const [items, setItems] = useState<ItemWithCategory[]>(initialData);
  const [reordering, setReordering] = useState<{ id: string; direction: "up" | "down" } | null>(null);

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

  async function handleToggleActive(itemId: string, currentActive: boolean, itemName: string) {
    const newActive = !currentActive;

    // Optimistic update
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
        // Revert on failure
        setItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
        );
        toast.error("Failed to update item");
      } else {
        toast.success(newActive ? `${itemName} enabled` : `${itemName} disabled`);
      }
    } catch {
      // Revert on error
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
      );
      toast.error("Failed to update item");
    }
  }

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

    setReordering({ id: itemId, direction });

    try {
      const res = await fetch("/api/items/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, direction }),
      });

      if (res.ok) {
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
    } catch (error) {
      console.error("Failed to reorder item:", error);
    } finally {
      setReordering(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-sm text-muted-foreground">{t.noItems}</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {sortedGroupedItems.map(([categoryId, group], groupIndex) => (
        <div key={categoryId} className={groupIndex > 0 ? "mt-6" : ""}>
          <h3 className="text-lg font-semibold px-1 mb-3">{group.category.name}</h3>
          <div className="space-y-1">
            {group.items
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item, index) => (
              <Link
                key={item.id}
                href={`/dashboard/items/${item.id}`}
                className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div onClick={(e) => e.preventDefault()}>
                    <Switch
                      checked={item.isActive}
                      onCheckedChange={() => handleToggleActive(item.id, item.isActive, item.name)}
                      className="scale-75"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm truncate">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      €{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 ml-2" onClick={(e) => e.preventDefault()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.preventDefault();
                      handleReorder(item.id, "up");
                    }}
                    disabled={index === 0 || !!reordering}
                  >
                    {reordering?.id === item.id && reordering.direction === "up" ? (
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
                      handleReorder(item.id, "down");
                    }}
                    disabled={index === group.items.length - 1 || !!reordering}
                  >
                    {reordering?.id === item.id && reordering.direction === "down" ? (
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
