import { ChevronDown } from "lucide-react";

interface ScrollToFeaturesProps {
  label: string;
}

export function ScrollToFeatures({ label }: ScrollToFeaturesProps) {
  return (
    <a
      href="#features"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <span className="text-sm">{label}</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </a>
  );
}
