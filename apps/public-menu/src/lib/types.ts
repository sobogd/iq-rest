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
  reservationsEnabled: boolean;
  ordersEnabled: boolean;
  orderMode: string;
  x: string | null;
  y: string | null;
  company: {
    id: string;
    plan: string;
    subscriptionStatus: string;
    trialEndsAt: string | null;
  };
}

export interface CategoryPayload {
  id: string;
  name: string;
  translations: Record<string, { name?: string }> | null;
  sortOrder: number;
}

export interface ItemPayload {
  id: string;
  categoryId: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
  translations: Record<string, { name?: string; description?: string }> | null;
  sortOrder: number;
}

export interface MenuPayload {
  restaurant: RestaurantPayload;
  categories: CategoryPayload[];
  items: ItemPayload[];
}
