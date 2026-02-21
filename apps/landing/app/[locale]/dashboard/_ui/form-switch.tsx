"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FormSwitchProps {
  id?: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  activeText: string;
  inactiveText: string;
  disabled?: boolean;
}

export function FormSwitch({
  id,
  label,
  checked,
  onCheckedChange,
  activeText,
  inactiveText,
  disabled,
}: FormSwitchProps) {
  const switchId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <Label htmlFor={switchId}>{label}</Label>
      <label
        htmlFor={switchId}
        className="flex items-center justify-between h-12 px-4 rounded-xl border border-border bg-muted/30 cursor-pointer"
      >
        <span className="text-base md:text-sm">{checked ? activeText : inactiveText}</span>
        <Switch
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
