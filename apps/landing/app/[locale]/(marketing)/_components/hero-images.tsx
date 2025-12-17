import { ImageComposition } from "./image-composition";

export function HeroImages() {
  return (
    <ImageComposition
      images={{
        left: { src: "/samples/sample-main.webp", alt: "QR menu preview showing restaurant dishes" },
        center: { src: "/samples/sample-main-page.webp", alt: "Restaurant website homepage with QR menu" },
        right: { src: "/samples/sample-contacts.webp", alt: "Restaurant contact page with map and info" },
      }}
      priority
    />
  );
}
