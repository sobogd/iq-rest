"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Table {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}

interface TablesListProps {
  initialData: Table[];
  translations: {
    noTables: string;
    guests: string;
    table: string;
  };
}

export function TablesList({ initialData, translations: t }: TablesListProps) {
  const [tables, setTables] = useState<Table[]>(
    [...initialData].sort((a, b) => a.sortOrder - b.sortOrder)
  );
  const [reordering, setReordering] = useState<{ id: string; direction: "up" | "down" } | null>(null);

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
        toast.error("Failed to update table");
      } else {
        toast.success(newActive ? `${t.table} ${tableNumber} enabled` : `${t.table} ${tableNumber} disabled`);
      }
    } catch {
      setTables((prev) =>
        prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
      );
      toast.error("Failed to update table");
    }
  }

  async function handleReorder(tableId: string, direction: "up" | "down") {
    const sortedTables = [...tables].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sortedTables.findIndex((t) => t.id === tableId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= sortedTables.length) return;

    setReordering({ id: tableId, direction });

    try {
      const res = await fetch("/api/tables/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableId, direction }),
      });

      if (res.ok) {
        const currentTable = sortedTables[currentIndex];
        const swapTable = sortedTables[swapIndex];
        const newTables = tables.map((t) => {
          if (t.id === tableId) {
            return { ...t, sortOrder: swapTable.sortOrder };
          }
          if (t.id === swapTable.id) {
            return { ...t, sortOrder: currentTable.sortOrder };
          }
          return t;
        });
        setTables(newTables);
      }
    } catch (error) {
      console.error("Failed to reorder table:", error);
    } finally {
      setReordering(null);
    }
  }

  if (tables.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <p className="text-sm text-muted-foreground">{t.noTables}</p>
      </div>
    );
  }

  const sortedTables = [...tables].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="pb-24 space-y-1">
      {sortedTables.map((table, index) => (
        <Link
          key={table.id}
          href={`/dashboard/tables/${table.id}`}
          className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div onClick={(e) => e.preventDefault()}>
              <Switch
                checked={table.isActive}
                onCheckedChange={() => handleToggleActive(table.id, table.isActive, table.number)}
                className="scale-75"
              />
            </div>
            <div className="flex flex-col">
              {table.zone ? (
                <>
                  <span className="text-sm font-medium">{table.zone}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.table} {table.number} • {table.capacity} {t.guests}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">{t.table} {table.number}</span>
                  <span className="text-xs text-muted-foreground">
                    {table.capacity} {t.guests}
                  </span>
                </>
              )}
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
                handleReorder(table.id, "up");
              }}
              disabled={index === 0 || !!reordering}
            >
              {reordering?.id === table.id && reordering.direction === "up" ? (
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
                handleReorder(table.id, "down");
              }}
              disabled={index === sortedTables.length - 1 || !!reordering}
            >
              {reordering?.id === table.id && reordering.direction === "down" ? (
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
