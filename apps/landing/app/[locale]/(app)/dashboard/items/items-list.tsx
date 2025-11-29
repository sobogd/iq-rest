"use client";

import { useEffect, useState } from "react";
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

interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
  category: Category;
}

interface ItemsListProps {
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

export function ItemsList({ translations: t }: ItemsListProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/items");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReorder(itemId: string, direction: "up" | "down") {
    setReordering(itemId);
    try {
      const res = await fetch("/api/items/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, direction }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          // Update only items from the same category
          const item = items.find((i) => i.id === itemId);
          if (item) {
            setItems((prev) =>
              prev
                .filter((i) => i.categoryId !== item.categoryId)
                .concat(data)
                .sort((a, b) => {
                  if (a.categoryId !== b.categoryId) {
                    return a.category.sortOrder - b.category.sortOrder;
                  }
                  return a.sortOrder - b.sortOrder;
                })
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to reorder item:", error);
    } finally {
      setReordering(null);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/items/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== deleteId));
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  function handleEdit(itemId: string) {
    router.push(`/${locale}/dashboard/items/${itemId}`);
  }

  // Group items by category and sort by category sortOrder
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
    {} as Record<string, { category: Category; items: Item[] }>
  );

  const sortedGroupedItems = Object.entries(groupedItems).sort(
    ([, a], [, b]) => a.category.sortOrder - b.category.sortOrder
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {items.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
          <p className="text-sm text-muted-foreground">{t.noItems}</p>
        </div>
      ) : (
        <div className="py-4 pb-24">
          {sortedGroupedItems.map(([categoryId, group], groupIndex) => (
            <div key={categoryId} className={groupIndex > 0 ? "mt-4" : ""}>
              <div className="px-6 py-3">
                <span className="text-base font-medium text-muted-foreground">
                  {group.category.name}
                </span>
              </div>
              <div>
                {group.items.map((item, index) => (
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
      )}

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
