import type { LucideIcon } from "lucide-react";
import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ListPlus } from "lucide-react";

export const PAIN_BULLETS = [
  "No printed menus — update prices instantly",
  "No commissions — orders go straight to you",
  "No missed calls — bookings 24/7",
  "35 languages — never lose a tourist again",
];

export const VERTICALS = ["Restaurants", "Cafés", "Bars", "Hotels", "Pizzerias"];

export const FEATURES: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: ScanLine,
    title: "Keep 100% of every order",
    desc: "Guests scan, order and pay — straight to you. No app downloads, no 30% delivery cut. Every order hits your dashboard with the table number in real time.",
  },
  {
    Icon: Languages,
    title: "Sell to tourists in their language",
    desc: "One tap translates your full menu into 35 languages. AI nails culinary context — guests order more when they actually understand the dish.",
  },
  {
    Icon: CalendarCheck,
    title: "Stop missing bookings while you cook",
    desc: "Guests book tables 24/7, no phone calls. Auto or manual confirmation, email reminders included — fewer no-shows, zero hassle.",
  },
  {
    Icon: Palette,
    title: "Look unforgettable in 1 second",
    desc: "Drop in a video of your kitchen or a hero food shot as your menu background. Guests stop scrolling. Your brand sticks.",
  },
  {
    Icon: Smartphone,
    title: "Update in seconds, not days",
    desc: "Change prices, swap photos, add today's specials — from your phone, between tables. Live for guests instantly. Never reprint a menu again.",
  },
  {
    Icon: ListPlus,
    title: "If you can text, you can use it",
    desc: "Tap to add a dish. Drag to reorder. Toggle off when sold out. No manuals, no tutorials, no learning curve.",
  },
];

export const STEPS: { n: string; t: string; d: string }[] = [
  { n: "1", t: "Sign up", d: "Email or Google. No credit card. Done in 10 seconds." },
  { n: "2", t: "Name your restaurant", d: "Just type the name. It shows on top of your menu." },
  { n: "3", t: "Add your first dish", d: "Category, dish name, price, photo. That's it." },
  { n: "4", t: "Pick a cover & print your QR", d: "Choose a background. Get your QR. Stick it on tables." },
];
