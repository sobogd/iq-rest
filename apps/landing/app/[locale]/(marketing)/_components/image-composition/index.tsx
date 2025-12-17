import { HeroLayout } from "./hero-layout";
import { TrioLayout } from "./trio-layout";
import { DuoLayout } from "./duo-layout";
import { HorizontalLayout } from "./horizontal-layout";
import type { ImageCompositionImages } from "./types";

type LayoutVariant = "hero" | "horizontal" | "duo" | "trio";

interface ImageCompositionProps {
  images: ImageCompositionImages;
  layout?: LayoutVariant;
  className?: string;
  priority?: boolean;
}

export function ImageComposition({
  images,
  layout = "hero",
  className = "",
  priority = false,
}: ImageCompositionProps) {
  const props = { images, className, priority };

  switch (layout) {
    case "trio":
      return <TrioLayout {...props} />;
    case "duo":
      return <DuoLayout {...props} />;
    case "horizontal":
      return <HorizontalLayout {...props} />;
    default:
      return <HeroLayout {...props} />;
  }
}

// Re-export types for external use
export type { ImageCompositionImages, LayoutVariant };
