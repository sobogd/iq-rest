export interface RestaurantPayload {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  accentColor: string;
  currency: string;
  source: string | null;
  hideTitle: boolean;
  address: string | null;
  phone: string | null;
  instagram: string | null;
  whatsapp: string | null;
  languages: string[];
  defaultLanguage: string;
  menuLayout?: string;
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
  // Per-restaurant billing (2026-05-28): trial / plan come directly off the
  // restaurant. A FREE restaurant whose trialEndsAt is in the past is
  // overlay-blocked for diners.
  plan: string | null;
  subscriptionStatus: string;
  trialEndsAt: string | null;
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
