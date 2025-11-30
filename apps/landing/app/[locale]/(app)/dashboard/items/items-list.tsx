"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

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
        // Move item only after successful response
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
    <div className="px-4 py-4 pb-24">
      {sortedGroupedItems.map(([categoryId, group], groupIndex) => (
        <div key={categoryId} className={groupIndex > 0 ? "mt-6" : ""}>
          <div className="px-1 py-2">
            <span className="text-sm font-medium text-muted-foreground">
              {group.category.name}
            </span>
          </div>
          <div className="space-y-2">
            {group.items
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-4 py-3 bg-card rounded-lg border cursor-pointer"
                onClick={() => handleEdit(item.id)}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span
                    className={`h-2 w-2 min-h-2 min-w-2 shrink-0 rounded-full ${
                      item.isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleReorder(item.id, "up")}
                    disabled={index === 0 || !!reordering}
                  >
                    {reordering?.id === item.id && reordering.direction === "up" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    ) : (
                      <ArrowUp className="!size-[17px]" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleReorder(item.id, "down")}
                    disabled={index === group.items.length - 1 || !!reordering}
                  >
                    {reordering?.id === item.id && reordering.direction === "down" ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    ) : (
                      <ArrowDown className="!size-[17px]" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
