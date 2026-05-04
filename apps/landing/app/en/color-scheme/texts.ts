import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Branded Restaurant Menu — Custom Color Scheme & Theme",
    description:
      "Match your restaurant brand with custom accent colors. Light and dark themes auto-switch with the guest's phone. Branded QR menu in seconds. 14-day trial.",
    canonical: "https://iq-rest.com/en/color-scheme",
    ogLocale: "en_US",
    ogTitle: "Custom Color Scheme — Branded Restaurant Menu in Seconds",
    ogDescription:
      "Pick your accent color, get a branded restaurant menu. Auto light/dark mode adapts to each guest's phone. No design tools needed.",
  },

  hero: {
    title: "Your menu. Your colors. Your brand.",
    subtitle:
      "Pick an accent color, drop in your logo, and your QR menu instantly looks like a real brand instead of a template. Light and dark themes auto-switch with each guest's phone — your menu always looks intentional.",
    trustLine: "4.9 · 500+ restaurants in 30+ countries",
  },

  seo: {
    description:
      "A custom color scheme is the difference between a generic QR menu and a branded restaurant experience. IQ Rest lets you pick your exact accent color (or paste a hex code from your brand guidelines), drop in your logo, and the entire menu — buttons, links, highlights, category labels — adopts your brand color in seconds.",
    fullDescription:
      "Most QR menu builders give you a fixed color scheme: blue or red, take it or leave it. IQ Rest treats your brand like it matters — pick any accent color from a color picker or paste in your exact hex code from your brand guidelines (the same orange as your sign, the same green as your logo). Every accent on the menu — primary buttons, links, category highlights, the active state in your language picker — adopts that color instantly.\n\nLight and dark mode are handled automatically. When a guest's phone is in dark mode (most phones at dinner), your menu shows in dark mode with your accent color punched up. When they're outside in bright sunlight in light mode, the menu adapts. You don't pick light or dark — you pick a brand color, and the menu does the right thing on each device.\n\nYour logo sits at the top of the menu, on the QR sticker print template, on the order receipt, and on the reservation confirmation email. Every guest touchpoint feels like the same brand because it is the same brand. No designer required, no Photoshop session, no expensive 'restaurant branding package' — just a color picker and a logo upload.",
    benefitsHeading: "Why a branded color scheme converts better than a default theme",
    benefits: [
      "Pick any accent color — color picker or paste a hex code",
      "Auto light/dark mode that adapts to each guest's phone",
      "Logo placement on menu, QR sticker, receipts and emails",
      "Branded look from minute one — no Photoshop or designer needed",
      "Switch colors anytime for seasonal promos (Valentine's red, Christmas green)",
      "Color stays accessible — contrast ratios auto-adjust for readability",
    ],
  },

  pricing: {
    heading: "One plan.",
    headingAccent: "Your brand colors.",
    sub: "Custom color scheme plus QR menu, online ordering, AI translation and reservations — all in one flat price. Branding without a designer.",
  },

  faq: {
    sub: "Everything restaurant owners ask about branding the menu. Don't see yours? Ping us on WhatsApp — real humans reply.",
    items: [
      {
        q: "Can I match my exact brand color from my logo or sign?",
        a: "Yes — paste in your exact hex code (e.g., #C24A2D) and the menu uses that exact color for every accent. We auto-generate a darker shade for hover states and a lighter shade for backgrounds, so a single brand color gets a full UI palette without you doing anything.",
      },
      {
        q: "Does the menu support light and dark mode?",
        a: "Yes, automatically. The menu detects each guest's phone theme and switches between light and dark mode in real time. Your accent color stays the same; the surrounding UI inverts. Most restaurants never set light vs dark — they pick a color and let the menu adapt.",
      },
      {
        q: "Can I change my color scheme later?",
        a: "Anytime. Open the design settings, pick a new color, save. Every page across your QR menu, reservation flow, and ordering UI updates within seconds. Useful for seasonal promotions (red for Valentine's, green for Christmas, gold for new year) — change for a week, change back.",
      },
      {
        q: "Where does my logo appear?",
        a: "At the top of your QR menu (next to your restaurant name), on the QR-code sticker print template (so the sticker on tables matches your brand), on order confirmation receipts, and in reservation confirmation emails. Upload it once in PNG or SVG, it's used everywhere automatically.",
      },
      {
        q: "What if my brand color is hard to read against the menu background?",
        a: "The system auto-checks contrast and gently darkens or lightens your color for text use cases (so a pale yellow brand color won't appear as unreadable text), while keeping your exact color for accents like buttons and highlights. You don't need to think about WCAG — the menu does it for you.",
      },
    ],
  },

  finalCta: {
    heading: "Pick a color.",
    headingAccent: "Look like a real brand.",
    sub: "Custom color scheme, branded receipts, auto light/dark mode. 14-day free trial, no designer, no credit card.",
  },
};
