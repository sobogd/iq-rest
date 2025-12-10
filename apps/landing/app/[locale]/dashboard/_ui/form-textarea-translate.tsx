"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FormTextareaTranslateProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  translateErrorMessage?: string;
}

export function FormTextareaTranslate({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  rows = 2,
  sourceText,
  sourceLanguage,
  targetLanguage,
  translateErrorMessage = "Translation failed",
}: FormTextareaTranslateProps) {
  const [translating, setTranslating] = useState(false);
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

  async function handleTranslate() {
    if (!sourceText.trim()) return;

    setTranslating(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage,
          sourceLanguage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.translatedText);
      } else {
        toast.error(translateErrorMessage);
      }
    } catch {
      toast.error(translateErrorMessage);
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={textareaId}>{label}</Label>
      <div className="flex gap-2">
        <Textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className="resize-none flex-1"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleTranslate}
          disabled={translating || !sourceText.trim() || disabled}
          className="shrink-0 h-11 w-11 bg-muted/30 hover:bg-muted/50 self-start"
        >
          {translating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
