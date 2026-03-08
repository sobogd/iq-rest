"use client";

import { ImageComposition } from "./image-composition";
import { analytics } from "@/lib/analytics";
import sampleMain from "@/public/samples/sample-main.webp";
import sampleMainPage from "@/public/samples/sample-main-page.webp";
import sampleContacts from "@/public/samples/sample-contacts.webp";

export function HeroImages() {
  const handleClick = () => {
    analytics.marketing.heroImagesClick();
    window.dispatchEvent(new Event("open-demo-modal"));
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <ImageComposition
        images={{
          left: { src: sampleMain, alt: "QR menu preview showing restaurant dishes" },
          center: { src: sampleMainPage, alt: "Restaurant website homepage with QR menu" },
          right: { src: sampleContacts, alt: "Restaurant contact page with map and info" },
        }}
        priority
      />
    </div>
  );
}
