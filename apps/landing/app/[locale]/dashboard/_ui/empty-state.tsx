"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  message: string;
  buttonText: string;
  onAdd: () => void;
  disabled?: boolean;
}

export function EmptyState({ message, buttonText, onAdd, disabled }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button onClick={onAdd} disabled={disabled}>
        <Plus className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
}
