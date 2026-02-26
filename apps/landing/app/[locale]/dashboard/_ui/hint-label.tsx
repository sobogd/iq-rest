import { HelpCircle } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface HintLabelProps {
  htmlFor?: string;
  label: string;
  hint: string;
  children?: React.ReactNode;
}

export function HintLabel({ htmlFor, label, hint, children }: HintLabelProps) {
  return (
    <div className="flex items-center gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="text-xs text-muted-foreground">
          {hint}
        </PopoverContent>
      </Popover>
      {children}
    </div>
  );
}
