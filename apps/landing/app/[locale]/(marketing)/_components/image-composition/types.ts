import type { StaticImageData } from "next/image";

export interface ImageData {
  src: string | StaticImageData;
  alt: string;
}

export interface ImageCompositionImages {
  left: ImageData;
  center: ImageData;
  right: ImageData;
}

export interface BaseLayoutProps {
  images: ImageCompositionImages;
  className?: string;
  priority?: boolean;
}
