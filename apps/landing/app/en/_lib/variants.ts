export type HeroVariant = {
  headline: string;
  headlineAccent: string;
  sub: string;
  cta: string;
};

export const HERO_VARIANTS: HeroVariant[] = [
  {
    headline: "Stop reprinting menus.",
    headlineAccent: "Stop paying 30% to delivery apps.",
    sub: "QR menu, direct orders, reservations & multilingual website. Live in 2 minutes — no credit card.",
    cta: "Start free trial →",
  },
  {
    headline: "Your restaurant deserves more than",
    headlineAccent: "paper menus and missed calls.",
    sub: "Direct orders, instant menu updates and 24/7 reservations. Set it up in 2 minutes.",
    cta: "Get my QR menu →",
  },
  {
    headline: "One QR code.",
    headlineAccent: "Zero commissions. No more printed menus.",
    sub: "QR menu, online orders and reservations — all in one place. 14-day free trial, no card required.",
    cta: "Start free trial →",
  },
  {
    headline: "Get direct orders.",
    headlineAccent: "Skip the commission.",
    sub: "Guests scan, order and pay — straight to you, no Uber Eats cut. Live in 2 minutes.",
    cta: "Try it free for 14 days",
  },
  {
    headline: "More orders. More bookings.",
    headlineAccent: "No paper, no apps.",
    sub: "QR menu + reservations + multilingual website on autopilot. Free 14-day trial.",
    cta: "Get started free →",
  },
  {
    headline: "Tourists can't read your menu?",
    headlineAccent: "Fix it in 2 minutes.",
    sub: "AI translates your entire menu into 35 languages. Plus QR ordering and reservations included.",
    cta: "Start free trial →",
  },
  {
    headline: "From paper menu to QR code,",
    headlineAccent: "before your espresso gets cold.",
    sub: "QR menu, direct orders and 24/7 reservations. Live in 2 minutes — no credit card.",
    cta: "Start my free trial →",
  },
  {
    headline: "Refreshingly simple QR menu.",
    headlineAccent: "Quietly powerful underneath.",
    sub: "Direct orders, AI translation, reservations and a website — all from one tap on your phone.",
    cta: "Start my free trial →",
  },
];

export function pickRandomVariant(): HeroVariant {
  return HERO_VARIANTS[Math.floor(Math.random() * HERO_VARIANTS.length)];
}
