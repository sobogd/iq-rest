"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  rightElement?: React.ReactNode;
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  type = "text",
  disabled,
  rightElement,
}: FormInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>{label}</Label>
      {rightElement ? (
        <div className="flex gap-2">
          <Input
            id={inputId}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
          />
          {rightElement}
        </div>
      ) : (
        <Input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </div>
  );
}
