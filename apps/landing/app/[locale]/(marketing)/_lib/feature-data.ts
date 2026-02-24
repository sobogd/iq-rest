// Feature images configuration — array of image sets, one per feature section
export const FEATURE_IMAGES: Record<string, { src: string; alt: string }[][]> = {
  reservations: [
    [
      { src: "/samples/sample-reservation-1.webp", alt: "Restaurant table reservation form on mobile QR menu" },
      { src: "/samples/sample-reservation-2.webp", alt: "Online booking confirmation for restaurant table" },
      { src: "/samples/sample-reservation-3.webp", alt: "Guest reservation details in restaurant booking system" },
    ],
  ],
  "custom-design": [
    [
      { src: "/samples/sample-background-1.webp", alt: "Restaurant QR menu with custom video background" },
      { src: "/samples/sample-background-2.webp", alt: "Digital menu with photo background for restaurant branding" },
    ],
  ],
  "color-scheme": [
    [
      { src: "/samples/sample-red-color.webp", alt: "QR menu with red accent color scheme for restaurant" },
      { src: "/samples/sample-green-color.webp", alt: "Restaurant digital menu with green brand colors" },
      { src: "/samples/sample-blue-color.webp", alt: "Blue themed QR menu design for cafe" },
    ],
  ],
  "easy-menu": [
    [
      { src: "/samples/sample-list-categories.webp", alt: "Restaurant menu category management dashboard" },
      { src: "/samples/sample-list-items.webp", alt: "Easy drag-and-drop menu item editor for restaurants" },
    ],
  ],
  multilingual: [
    [
      { src: "/samples/sample-lang-settings.webp", alt: "Multilingual restaurant menu language settings" },
      { src: "/samples/sample-langs.webp", alt: "25+ language options for restaurant QR menu" },
    ],
  ],
  "ai-translation": [
    [
      { src: "/samples/sample-edit-table.webp", alt: "AI translation for restaurant table descriptions" },
      { src: "/samples/sample-edit-item.webp", alt: "Automatic menu item translation with AI" },
      { src: "/samples/sample-edit-category.webp", alt: "AI-powered category translation for digital menu" },
    ],
  ],
  "mobile-management": [
    [
      { src: "/samples/sample-analytics-1.webp", alt: "Restaurant menu analytics on mobile phone" },
      { src: "/samples/sample-design-settings.webp", alt: "Mobile-friendly menu design settings" },
      { src: "/samples/sample-qr-settings.webp", alt: "QR code customization from smartphone" },
    ],
  ],
  "online-orders": [
    [
      { src: "/samples/order_public_3.webp", alt: "Order confirmation screen" },
      { src: "/samples/order_public_2.webp", alt: "Selecting items from restaurant menu" },
      { src: "/samples/order_public_1.webp", alt: "Customer browsing QR menu to place order" },
    ],
    [
      { src: "/samples/order_1.webp", alt: "Orders list in restaurant dashboard" },
      { src: "/samples/order_2.webp", alt: "Order details with table number" },
    ],
  ],
  analytics: [
    [
      { src: "/samples/sample-analytics-1.webp", alt: "Restaurant analytics dashboard" },
      { src: "/samples/sample-analytics-2.webp", alt: "QR menu scan statistics" },
    ],
  ],
};

// Valid feature IDs
export const VALID_FEATURE_IDS = [
  "instant-setup",
  "mobile-management",
  "ai-translation",
  "multilingual",
  "ai-images",
  "easy-menu",
  "analytics",
  "reservations",
  "custom-design",
  "color-scheme",
  "personal-support",
  "online-orders",
] as const;

export type FeatureId = (typeof VALID_FEATURE_IDS)[number];

// Map feature ID to its translation namespace
export const FEATURE_NAMESPACE: Record<string, string> = {
  "instant-setup": "instantSetupPage",
  "mobile-management": "mobileManagementPage",
  "ai-translation": "aiTranslationPage",
  "multilingual": "multilingualPage",
  "ai-images": "aiImagesPage",
  "easy-menu": "easyMenuPage",
  "analytics": "analyticsPage",
  "reservations": "reservationsPage",
  "custom-design": "customDesignPage",
  "color-scheme": "colorSchemePage",
  "personal-support": "personalSupportPage",
  "online-orders": "onlineOrders",
};
