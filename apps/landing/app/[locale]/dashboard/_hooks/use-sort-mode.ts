"use client";

import { useState, useCallback } from "react";

interface SortableItem {
  id: string;
  sortOrder: number;
}

export function useSortMode<T extends SortableItem>(
  items: T[],
  setItems: (items: T[]) => void,
  onSave: (items: T[]) => Promise<boolean>
) {
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<T[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  const startSortMode = useCallback(() => {
    setOriginalOrder([...items]);
    setSortMode(true);
  }, [items]);

  const cancelSortMode = useCallback(() => {
    setItems(originalOrder);
    setSortMode(false);
  }, [originalOrder, setItems]);

  const moveItem = useCallback(
    (itemId: string, direction: "up" | "down") => {
      const currentIndex = items.findIndex((item) => item.id === itemId);
      const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (swapIndex < 0 || swapIndex >= items.length) return;

      const newItems = [...items];
      [newItems[currentIndex], newItems[swapIndex]] = [
        newItems[swapIndex],
        newItems[currentIndex],
      ];
      setItems(newItems);
    },
    [items, setItems]
  );

  const saveSortOrder = useCallback(async () => {
    setSavingSort(true);
    const success = await onSave(items);
    if (success) {
      setSortMode(false);
    }
    setSavingSort(false);
    return success;
  }, [items, onSave]);

  return {
    sortMode,
    savingSort,
    startSortMode,
    cancelSortMode,
    moveItem,
    saveSortOrder,
  };
}
