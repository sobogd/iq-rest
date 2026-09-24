// Shared types for the new dashboard.
// Multilingual fields are stored as { [lang]: string } objects.

export type Ml = Record<string, string>;

export interface OptionVariant {
 id: string;
 name: Ml;
 priceDelta: string;
}

export interface DishOption {
 id: string;
 name: Ml;
 type: "single" | "multi";
 required: boolean;
 variants: OptionVariant[];
}

export interface Dish {
 id: string;
 name: Ml;
 description: Ml;
 price: string;
 visible: boolean;
 allergens: string[];
 diets: string[];
 options: DishOption[];
 photoUrl: string | null;
 sortOrder: number;
 categoryId: string | null;
}

export interface Category {
 id: string;
 name: Ml;
 sortOrder: number;
 dishes: Dish[];
 isGroup: boolean;
 parentId: string | null;
 children?: Category[];
}

export interface TableEntity {
 id: string;
 number: number;
 name: string;
 description: string;
 capacity: number;
 x: number | null;
 y: number | null;
 shape: "circle" | "rect";
 rotation: number;
 width: number | null;
 height: number | null;
 photoUrl: string | null;
 color: string | null;
 sortOrder: number;
}

export interface OrderItemOptionSnapshot {
 optionName: Ml;
 variantName: Ml;
 priceDelta: string;
 quantity?: number;
}

export type OrderItemStatus = "pending" | "cooking" | "ready" | "served";

export type DiscountType = "percent" | "fixed";

export interface Discount {
 type: DiscountType;
 value: number;
 reason?: string;
}

export interface OrderItem {
 id: string;
 dishId: string;
 dishNameSnapshot: Ml;
 basePriceSnapshot: string;
 options: OrderItemOptionSnapshot[];
 notes: string;
 status: OrderItemStatus;
 createdAt: string;
 discount?: Discount | null;
}

export interface Order {
 id: string;
 tableId: string | null;
 tableNumber: number | null;
 dailyNumber: number;
 guestName: string;
 // Diner email, empty unless the venue collects it (`orderEmailEnabled`).
 guestEmail: string;
 createdAt: string;
 status: "active" | "completed" | "cancelled";
 items: OrderItem[];
 total: number;
 paymentMethodId?: string | null;
 statusBeforeClose?: string | null;
 discount?: Discount | null;
}

export interface Booking {
 id: string;
 guestName: string;
 guestEmail: string;
 guestPhone: string | null;
 datetime: string;
 // Slot length in minutes. Inherited from restaurant.reservationSlotMinutes
 // when the booking was created.
 duration: number;
 guests: number;
 tableId: string | null;
 status: "pending" | "confirmed" | "cancelled" | "completed";
 notes: string;
}

export interface RestaurantContacts {
 phone: string;
 instagram: string;
 whatsapp: string;
}

export interface RestaurantLocation {
 address: string;
 lat: number | null;
 lng: number | null;
 // Google Places ID captured by the map picker. Null when user clicked the
 // map without picking a search result.
 placeId: string | null;
}

export interface ScheduleDay {
 closed: boolean;
 from: string;
 to: string;
 lunchFrom: string | null;
 lunchTo: string | null;
}

// Length 7. Index 0=Mon ... 6=Sun.
export type ReservationSchedule = ScheduleDay[];

// One bookable date in event mode: a restaurant-local date plus its own window.
//
// Event bookings are seat-based and table-free, so a date may also cap how many
// guests it can hold. `capacity` null / 0 ⇒ unlimited.
export interface EventDate {
 date: string;
 from: string;
 to: string;
 capacity: number | null;
}

export interface BookingSettings {
 enabled: boolean;
 approval: "manual" | "auto";
 duration: number;
 schedule: ReservationSchedule;
 timezone: string;
 // Event mode: the owner's explicit bookable dates. Non-empty ⇒ guests can
 // book ONLY these dates and `schedule` above is ignored. Empty ⇒ weekly mode.
 eventDates: EventDate[];
 // Event mode only: most guests one booking may hold. Null ⇒ no limit. The
 // control is hidden while event mode is off and the column is cleared on save.
 maxGuestsPerBooking: number | null;
}

export interface OrderSettings {
 acceptOrders: boolean;
 modes: { internal: boolean; whatsapp: boolean };
 requiredFields: { name: boolean; phone: boolean; address: boolean; email: boolean };
}

export interface SubscriptionInfo {
 plan: "yearly" | "monthly" | null;
 status: "active" | "cancelled" | null;
 renewsAt: string | null;
}

export interface Restaurant {
 id: string;
 name: string;
 subtitle: string;
 showTitleOnHomepage: boolean;
 // Hero description + logo visibility (independent of the title toggle).
 showDescriptionOnHomepage: boolean;
 logoUrl: string | null;
 showLogoOnHomepage: boolean;
 logoScale: "small" | "medium" | "large";
 menuLayout: "flat" | "drill";
 titleScale: "small" | "medium" | "large";
 languageSwitcher: "inline" | "top";
 paymentMethods: string[];
 slug: string;
 currency: string;
 billingCurrency?: string;
 backgroundUrl: string | null;
 backgroundType: "image" | "video" | null;
 accentColor: string;
 contacts: RestaurantContacts;
 location: RestaurantLocation;
 languages: string[];
 defaultLang: string;
 menuUrl: string;
 published: boolean;
 bookingSettings: BookingSettings;
 orderSettings: OrderSettings;
 subscription: SubscriptionInfo;
}
