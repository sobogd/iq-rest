export interface RestaurantPayload {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  accentColor: string;
  currency: string;
  source: string | null;
  hideTitle: boolean;
  // Hero element visibility + logo (all independent; see routes/index.tsx).
  hideDescription?: boolean;
  logoUrl?: string | null;
  hideLogo?: boolean;
  logoScale?: "small" | "medium" | "large";
  address: string | null;
  phone: string | null;
  instagram: string | null;
  whatsapp: string | null;
  languages: string[];
  defaultLanguage: string;
  // Per-restaurant overrides for the diner-SPA UI i18n strings. Shape:
  // { [locale]: { [i18nKey]: string } }. Merged into i18next on load
  // (see __root.tsx); an absent key falls back to the built-in translation.
  customTexts?: Record<string, Record<string, string>> | null;
  menuLayout?: string;
  titleScale?: "small" | "medium" | "large";
  languageSwitcher?: "inline" | "top";
  reservationsEnabled: boolean;
  reservationMode: string;
  reservationSlotMinutes: number;
  reservationSchedule: Array<{ closed: boolean; from: string; to: string; lunchFrom: string | null; lunchTo: string | null }> | null;
  ordersEnabled: boolean;
  orderMode: string;
  orderNameEnabled: boolean;
  orderPhoneEnabled: boolean;
  orderAddressEnabled: boolean;
  x: string | null;
  y: string | null;
  googlePlaceId: string | null;
  // PRO-feature entitlement: orders + reservations are PRO-only. When false the
  // diner sees a menu-only experience (no order/booking surfaces).
  proFeatures: boolean;
  // Account entitlement (§3), resolved server-side. false → the diner sees the
  // paywall overlay (inactive account: no active sub, expired/never trial, not
  // covered by account PRO or a planOverride venue). Replaces the client-side
  // trial/PAST_DUE re-derivation.
  menuOnline: boolean;
}

export interface CategoryPayload {
  id: string;
  name: string;
  translations: Record<string, { name?: string }> | null;
  sortOrder: number;
  isGroup?: boolean;
  parentId?: string | null;
}

export interface ItemPayload {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
  diets: string[];
  translations: Record<string, { name?: string; description?: string }> | null;
  sortOrder: number;
}

export interface TablePayload {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  translations: Record<string, { zone?: string }> | null;
  imageUrl: string | null;
}

export interface MenuPayload {
  restaurant: RestaurantPayload;
  categories: CategoryPayload[];
  items: ItemPayload[];
  tables: TablePayload[];
}
