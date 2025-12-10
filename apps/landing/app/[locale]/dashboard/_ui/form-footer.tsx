"use client";

import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormFooterProps {
  saving: boolean;
  hasChanges: boolean;
  saveText: string;
}

export function FormFooter({ saving, hasChanges, saveText }: FormFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
      <Button type="submit" disabled={saving || !hasChanges}>
        {saving ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        {saveText}
      </Button>
    </div>
  );
}
