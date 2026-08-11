import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChartColumn,
  ChefHat,
  ClipboardList,
  Clock,
  Globe,
  Languages,
  LayoutGrid,
  Mail,
  Map,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  Receipt,
  Rocket,
  ShieldAlert,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Timer,
  Users,
  WheatOff,
  type LucideIcon,
} from "lucide-react";

// Content is JSON, and JSON can't hold a component reference — pages name an
// icon by its canonical lucide-react export name, this map resolves it back
// to the component at render time. Add an icon here the first time a JSON
// file references it (the name must match the lucide-react export exactly).
export const ICONS = {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ChartColumn,
  ChefHat,
  ClipboardList,
  Clock,
  Globe,
  Languages,
  LayoutGrid,
  Mail,
  Map,
  MessageCircle,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  Receipt,
  Rocket,
  ShieldAlert,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Timer,
  Users,
  WheatOff,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export function getIcon(key: IconKey): LucideIcon {
  return ICONS[key];
}
