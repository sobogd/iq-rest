import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "AI Menu Photo Optimization — Fast, Stunning Restaurant Images",
    description:
      "Upload any phone photo, get a stunning menu image. AI-powered optimization for fast loading, perfect cropping, brand-consistent look. 14-day free trial.",
    canonical: "https://iq-rest.com/en/ai-images",
    ogLocale: "en_US",
    ogTitle: "AI Image Optimization for Restaurant Menus — Phone Photos, Pro Look",
    ogDescription:
      "Snap a dish, upload, done. AI auto-crops, color-corrects and compresses your menu photos. Fast loading, stunning results — no Lightroom needed.",
  },

  hero: {
    title: "Phone photos. Pro-looking menu.",
    subtitle:
      "Snap a dish from any angle, upload, and our AI auto-crops, color-corrects, and compresses it into a fast-loading menu image — without losing the food. Stunning quality on any device, no Lightroom or designer required.",
    trustLine: "500+ restaurants in 30+ countries",
  },

  seo: {
    description:
      "Most restaurant menus look amateur because the photos do. IQ Rest's AI image optimization fixes that automatically — every dish photo you upload is auto-cropped to a clean square, color-corrected for warmth, compressed without quality loss, and converted to next-gen formats (WebP, AVIF) for fast loading on any phone. Your menu looks like a designer touched every photo, except no one did.",
    fullDescription:
      "Restaurant owners take their own dish photos with a phone — and that's a good thing, because authentic looks beat stock photos. The problem is that raw phone photos are often too dark, too tight, oddly cropped, or 5MB heavy. IQ Rest fixes all of that on upload.\n\nWhen you upload a dish photo, the AI does five things in seconds: auto-crops to a centered square (the food fills the frame, no awkward whitespace), warms up the colors slightly (food looks more appetizing without becoming fake), compresses without visible quality loss, generates multiple sizes (thumbnail, mobile, retina), and converts to modern formats so the menu loads in under a second on any phone.\n\nYou see a preview before saving and can opt out of any adjustment if you prefer the original. Most restaurants leave it on auto and never look back. The result: a menu that loads instantly even on bad WiFi, photos that look like a real designer touched them, and zero time spent in Lightroom or paying a photographer.",
    benefitsHeading: "Why AI image optimization makes your menu feel pro",
    benefits: [
      "Auto-crop to centered square — food fills the frame, no awkward edges",
      "Color correction tuned for food — appetizing without looking fake",
      "Lossless compression — beautiful at 100KB instead of 5MB",
      "WebP and AVIF auto-conversion — fast load on any phone",
      "Multiple sizes auto-generated — retina, mobile, thumbnail",
      "Preview before saving — opt out per photo if you prefer the original",
    ],
  },

  pricing: {
    heading: "One plan.",
    headingAccent: "AI photos included.",
    sub: "AI image optimization plus QR ordering, AI translation and reservations — all in one flat price. No premium photo tier, ever.",
  },

  faq: {
    sub: "Everything restaurant owners ask about menu photos. Don't see yours? Ping us on WhatsApp — real humans reply.",
    items: [
      {
        q: "What kind of photos work best as menu images?",
        a: "Phone photos taken from above, with the dish in the center, in natural light if possible. Avoid harsh flash and tight close-ups (you want a bit of plate visible). The AI handles the rest — cropping, color, compression. We've seen iPhone photos look better than DSLR photos after our auto-optimization, because the AI knows what 'food on a menu' is supposed to look like.",
      },
      {
        q: "Will compression reduce my photo quality?",
        a: "Visually, no. The AI compression is lossless to the human eye — your 5MB photo becomes a 100KB WebP that looks identical on a phone screen. Faster load times, less mobile data, no visible difference. We A/B-tested this with real restaurant owners and nobody could tell which was the original.",
      },
      {
        q: "Can I turn off auto-optimization for a specific photo?",
        a: "Yes. When you upload a photo, you see a preview of the optimized version next to the original. If you prefer the raw photo (e.g., for a hero shot you spent time editing), uncheck 'auto-optimize' for that photo. The setting is per-photo, so your hero shot stays untouched while every other dish gets optimized.",
      },
      {
        q: "Does this work on slow internet (e.g., hotel WiFi or rural 3G)?",
        a: "That's the whole point. After AI optimization, an average dish photo is around 80–150KB instead of multi-megabytes — your menu loads in under a second on a 3G connection. Tourists scanning on hotel WiFi see your full menu before they finish unfolding their napkin.",
      },
      {
        q: "Do I need to take new photos or can I use existing ones?",
        a: "Existing photos work perfectly. Upload a folder of phone photos from last summer and our AI processes each one — cropping, color, compression, format conversion. You can upload 50 photos at once and have your full menu visualized in 10 minutes.",
      },
    ],
  },

  finalCta: {
    heading: "Phone photos in.",
    headingAccent: "Pro menu out.",
    sub: "AI auto-cropping, color correction, and compression for every dish photo. 14-day free trial, no credit card, no Lightroom.",
  },
};
