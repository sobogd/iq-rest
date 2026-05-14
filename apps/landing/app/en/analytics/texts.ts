import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Restaurant Menu Analytics — QR Scans, Top Dishes, Tourist Languages",
    description:
      "See exactly how guests use your QR menu. Daily scans, top-viewed dishes, language preferences, peak hours. Data-driven decisions for your restaurant.",
    canonical: "https://iq-rest.com/en/analytics",
    ogLocale: "en_US",
    ogTitle: "Restaurant Analytics — Track QR Menu Scans, Dishes & Languages",
    ogDescription:
      "Know which dishes your guests actually look at, when peak hours are, and which tourist nationality is in your dining room tonight. 14-day free trial.",
  },

  hero: {
    title: "Stop guessing. Know what guests actually do.",
    subtitle:
      "See restaurant menu analytics in real time — QR scans per hour, the dishes guests linger on, the languages tourists use, the slowest weekday — and use that data to print fewer menus, schedule smarter, push the right specials.",
    trustLine: "500+ restaurants in 30+ countries",
  },

  seo: {
    description:
      "Restaurant analytics that don't require a data team. IQ Rest tracks every scan, view, language switch and order from your QR menu, and surfaces the patterns that matter: top-viewed dishes, peak scan hours, busiest day of the week, language breakdown of your tourist crowd. Make data-driven decisions without ever opening a spreadsheet.",
    fullDescription:
      "Most restaurants run on instinct — 'we feel like Tuesdays are slow', 'I think the pasta is selling well'. Instinct is good, but data is better. IQ Rest tracks every interaction with your QR menu so you don't have to guess: how many times your QR was scanned today, which dishes guests viewed for longest, which dishes they added to cart but didn't order, which language tourists used.\n\nThe analytics dashboard surfaces the answers in three views: today (live scans, current orders, what's being ordered right now), this week (top 10 dishes, busy hours, language breakdown, no-shows on reservations), and trends (month-over-month growth, seasonality, weekday patterns). You can drill into any dish to see how often it's viewed vs ordered (a dish viewed 200 times but ordered 5 times has a copy or photo problem), or any language to see what tourist mix you're actually serving.\n\nThe goal is decisions, not dashboards: 'next Tuesday is historically slow → run a happy hour push notification', 'Italian tourists order pasta 3x more than locals → put pasta first when language=it', 'this dish has 90% view-rate but 5% order-rate → improve the photo'. Real changes, real revenue, no MBA required.",
    benefitsHeading: "Why restaurants love IQ Rest analytics over Google Analytics",
    benefits: [
      "Live QR scan counter — see your evening filling up in real time",
      "Top-viewed and top-ordered dishes — spot what's working and what isn't",
      "Language breakdown — know which tourists are in your dining room",
      "Peak hours and weekday patterns — schedule smarter, prep smarter",
      "View-to-order conversion per dish — fix bad photos and weak descriptions",
      "Reservation analytics — booking sources, no-show rate, party-size mix",
    ],
  },

  pricing: {
    heading: "One plan.",
    headingAccent: "Full analytics included.",
    sub: "Restaurant analytics, QR ordering, AI translation and reservations — all in one flat price. No premium tier for data, ever.",
  },

  faq: {
    sub: "Everything restaurant owners ask about menu analytics. Don't see yours? Ping us on WhatsApp — real humans reply.",
    items: [
      {
        q: "What can I actually see in the analytics dashboard?",
        a: "Live QR scans (today, this week, this month), top-viewed dishes, top-ordered dishes, view-to-order conversion per dish, language breakdown of guests, peak hours by day of week, average order value, busiest tables, reservation no-show rate, and trends over time. All on one dashboard, no setup needed.",
      },
      {
        q: "How do I use this to actually grow revenue?",
        a: "Three patterns work for most restaurants: (1) reorder the menu so top-converting dishes appear first; (2) fix the photo or description on dishes with high views but low orders; (3) push a happy-hour or special on historically slow weekdays/hours. We've seen restaurants increase weekday revenue by 15–30% from these three changes alone.",
      },
      {
        q: "Is this anonymous or are you tracking individuals?",
        a: "Anonymous and aggregated. We track menu views and orders by session, not by identifiable user. No emails, no phone numbers, no IP addresses stored long-term. The dashboard shows you patterns ('200 scans on Friday'), not people. Fully GDPR-compliant by design.",
      },
      {
        q: "Can I export the data?",
        a: "Yes. Export any view as CSV (top dishes, daily scans, hourly breakdown, etc.) and open in Excel or Google Sheets. Useful for sharing with investors, accountants, or for combining with your POS data.",
      },
      {
        q: "Do I need any technical setup to get analytics?",
        a: "Zero. Analytics are on by default the moment your QR menu is live — every scan, view and order is tracked automatically. The dashboard is part of the standard subscription, not an upsell, and you'll see useful data within your first day of guests scanning.",
      },
    ],
  },

  finalCta: {
    heading: "Stop guessing.",
    headingAccent: "Start measuring.",
    sub: "Live QR scan analytics, top dishes, peak hours, tourist language breakdown. 14-day free trial, no credit card.",
  },
};
