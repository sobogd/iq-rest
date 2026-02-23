"use client";

import { ImageComposition } from "./image-composition";
import { analytics } from "@/lib/analytics";
import sampleMain from "@/public/samples/sample-main.webp";
import sampleMainPage from "@/public/samples/sample-main-page.webp";
import sampleContacts from "@/public/samples/sample-contacts.webp";

export function HeroImages() {
  const handleClick = () => {
    analytics.marketing.heroImagesClick();
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const phone = document.getElementById("demo-phone");
      if (!phone) return;
      const phoneBottom = phone.getBoundingClientRect().bottom + window.scrollY;
      const top = phoneBottom - window.innerHeight + 40;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      const section = document.getElementById("demo");
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
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
