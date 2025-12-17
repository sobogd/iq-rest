export interface ImageData {
  src: string;
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
