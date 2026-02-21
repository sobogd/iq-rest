"use client";

import { ALLERGENS, type AllergenCode } from "@/lib/allergens";

interface FormAllergensProps {
  label: string;
  value: string[];
  onChange: (allergens: string[]) => void;
  allergenNames: Record<AllergenCode, string>;
  disabled?: boolean;
}

export function FormAllergens({
  label,
  value,
  onChange,
  allergenNames,
  disabled = false,
}: FormAllergensProps) {
  const handleToggle = (code: string) => {
    if (disabled) return;
    if (value.includes(code)) {
      onChange(value.filter((c) => c !== code));
    } else {
      onChange([...value, code]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {ALLERGENS.map((allergen) => {
          const isSelected = value.includes(allergen.code);
          return (
            <button
              key={allergen.code}
              type="button"
              onClick={() => handleToggle(allergen.code)}
              disabled={disabled}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              <span className="text-base leading-none">{allergen.icon}</span>
              <span>{allergenNames[allergen.code] || allergen.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
