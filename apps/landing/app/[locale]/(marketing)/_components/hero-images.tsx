import { ImageComposition } from "./image-composition";
import sampleMain from "@/public/samples/sample-main.webp";
import sampleMainPage from "@/public/samples/sample-main-page.webp";
import sampleContacts from "@/public/samples/sample-contacts.webp";

export function HeroImages() {
  return (
    <ImageComposition
      images={{
        left: { src: sampleMain, alt: "QR menu preview showing restaurant dishes" },
        center: { src: sampleMainPage, alt: "Restaurant website homepage with QR menu" },
        right: { src: sampleContacts, alt: "Restaurant contact page with map and info" },
      }}
      priority
    />
  );
}
