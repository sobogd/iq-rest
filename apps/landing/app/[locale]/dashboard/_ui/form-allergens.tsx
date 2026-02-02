"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ALLERGENS, type AllergenCode } from "@/lib/allergens";

interface FormAllergensProps {
  label: string;
  value: string[];
  onChange: (allergens: string[]) => void;
  allergenNames: Record<AllergenCode, string>;
}

export function FormAllergens({
  label,
  value,
  onChange,
  allergenNames,
}: FormAllergensProps) {
  const handleToggle = (code: string) => {
    if (value.includes(code)) {
      onChange(value.filter((c) => c !== code));
    } else {
      onChange([...value, code]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        {ALLERGENS.map((allergen) => (
          <label
            key={allergen.code}
            className="flex items-center justify-between h-11 px-3 rounded-md bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{allergen.icon}</span>
              <span className="text-sm">
                {allergenNames[allergen.code] || allergen.code}
              </span>
            </span>
            <Switch
              checked={value.includes(allergen.code)}
              onCheckedChange={() => handleToggle(allergen.code)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
