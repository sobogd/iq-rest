export const RESTAURANT = {
  title: "Noir & Ember",
  description: "Cocktail bar & cocina",
  accentColor: "#000000",
  currency: "EUR",
  videoSrc: "https://nbg1.your-objectstorage.com/sobogd/files/restaurants/cmi5yzq5v0000vx0hbjmbks82/1771406329199-k748qy.mp4",
  phone: "+34637621754",
  whatsapp: "+34637621754",
  instagram: "instagram",
  hasReservations: true,
  hasMultipleLanguages: true,
  hasContacts: true,
} as const;

export interface MockCategory {
  id: string;
}

export interface MockItem {
  id: string;
  categoryId: string;
  price: number;
  imageUrl?: string;
  allergens?: string[];
}

export const CATEGORIES: MockCategory[] = [
  { id: "c1" },
  { id: "c2" },
  { id: "c3" },
  { id: "c4" },
  { id: "c5" },
  { id: "c6" },
  { id: "c7" },
];

export const ITEMS: MockItem[] = [
  {
    id: "i1",
    categoryId: "c1",
    price: 18.5,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-steak-tartar-de-buey-1778342626492-ppf0yn.webp",
    allergens: ["eggs", "gluten", "mustard", "sulphites"],
  },
  {
    id: "i2",
    categoryId: "c1",
    price: 16,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-burrata-con-trufa-negra-1778342648771-e2nq8b.webp",
    allergens: ["dairy", "gluten", "sulphites"],
  },
  {
    id: "i3",
    categoryId: "c1",
    price: 19,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-tataki-de-atun-rojo-1778342666692-bohb4o.webp",
    allergens: ["fish", "soybeans", "sesame", "gluten"],
  },
  {
    id: "i4",
    categoryId: "c2",
    price: 42,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-chuleton-madurado-400g-1778342757733-rosblf.webp",
    allergens: ["dairy", "sulphites", "celery"],
  },
  {
    id: "i5",
    categoryId: "c2",
    price: 32,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-bacalao-negro-al-miso-1778342789206-wyxdgo.webp",
    allergens: ["fish", "soybeans", "sesame", "gluten", "sulphites"],
  },
  { id: "i6", categoryId: "c5", price: 13, allergens: ["sulphites"] },
  { id: "i7", categoryId: "c5", price: 12, allergens: ["sulphites"] },
  { id: "i8", categoryId: "c5", price: 12.5, allergens: ["eggs"] },
  { id: "i9", categoryId: "c5", price: 13, allergens: ["eggs", "sulphites"] },
  { id: "i10", categoryId: "c5", price: 13.5, allergens: ["sulphites"] },
  { id: "i11", categoryId: "c6", price: 6.5, allergens: ["sulphites"] },
  { id: "i12", categoryId: "c6", price: 5.5, allergens: ["sulphites"] },
  { id: "i13", categoryId: "c6", price: 6, allergens: ["sulphites"] },
  { id: "i14", categoryId: "c6", price: 14, allergens: ["sulphites"] },
  {
    id: "i15",
    categoryId: "c7",
    price: 9.5,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-coulant-de-chocolate-negro-1778343210436-aym6r6.webp",
    allergens: ["gluten", "eggs", "dairy", "soybeans"],
  },
  {
    id: "i16",
    categoryId: "c7",
    price: 8,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-tarta-de-queso-vasca-1778343228534-pfiitj.webp",
    allergens: ["gluten", "eggs", "dairy"],
  },
  {
    id: "i17",
    categoryId: "c7",
    price: 8.5,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-tiramisu-noir-1778343259241-qy6v7k.webp",
    allergens: ["gluten", "eggs", "dairy", "nuts", "sulphites"],
  },
  {
    id: "i18",
    categoryId: "c7",
    price: 7.5,
    imageUrl: "https://nbg1.your-objectstorage.com/sobogd/temp/cmi5yzq5v0000vx0hbjmbks82/import-crema-catalana-1778343273378-7lv8kg.webp",
    allergens: ["eggs", "dairy"],
  },
];

export function formatPrice(amount: number, currency: string = "EUR"): string {
  const symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  return `${symbol}${amount.toFixed(2)}`;
}
