"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
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
  };
}

export function TablesList({ initialData, translations: t }: TablesListProps) {
  const [tables, setTables] = useState<Table[]>(initialData);

  async function handleToggleActive(tableId: string, currentActive: boolean, tableNumber: number) {
    const newActive = !currentActive;

    // Optimistic update
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
        toast.success(newActive ? `Table ${tableNumber} enabled` : `Table ${tableNumber} disabled`);
      }
    } catch {
      setTables((prev) =>
        prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
      );
      toast.error("Failed to update table");
    }
  }

  if (tables.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <p className="text-sm text-muted-foreground text-center px-4">{t.noTables}</p>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-1">
      {tables.map((table) => (
        <Link
          key={table.id}
          href={`/dashboard/reservations/tables/${table.id}`}
          className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div onClick={(e) => e.preventDefault()}>
              <Switch
                checked={table.isActive}
                onCheckedChange={() => handleToggleActive(table.id, table.isActive, table.number)}
                className="scale-75"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                Table {table.number}
                {table.zone && <span className="text-muted-foreground font-normal"> • {table.zone}</span>}
              </span>
              <span className="text-xs text-muted-foreground">
                {table.capacity} {t.guests}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
