import { ImageComposition } from "./image-composition";

export function HeroImages() {
  return (
    <ImageComposition
      images={{
        left: { src: "/samples/sample-main.webp", alt: "Menu preview" },
        center: { src: "/samples/sample-main-page.webp", alt: "Main page preview" },
        right: { src: "/samples/sample-contacts.webp", alt: "Contacts preview" },
      }}
    />
  );
}
