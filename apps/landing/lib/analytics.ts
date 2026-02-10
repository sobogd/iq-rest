// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Marketing events
export const marketing = {
  clickCTA: (location: string) => trackEvent("click_cta", { location }),
  clickPricing: (plan: string) => trackEvent("click_pricing", { plan }),
  clickFeature: (feature: string) => trackEvent("click_feature", { feature }),
  clickDemo: () => trackEvent("click_demo"),
  clickSignIn: (location: string) => trackEvent("click_sign_in", { location }),
  viewPricing: () => trackEvent("view_pricing"),
  viewFeatures: () => trackEvent("view_features"),
  viewFAQ: () => trackEvent("view_faq"),
  scrollToSection: (section: string) => trackEvent("scroll_to_section", { section }),
};

// Auth events
export const auth = {
  startSignIn: () => trackEvent("auth_start_sign_in"),
  submitEmail: () => trackEvent("auth_submit_email"),
  verifyCode: () => trackEvent("auth_verify_code"),
  signInSuccess: () => trackEvent("auth_sign_in_success"),
  signOut: () => trackEvent("auth_sign_out"),
};

// Onboarding events
export const onboarding = {
  viewOnboarding: () => trackEvent("onboarding_view"),
  clickStep: (step: string) => trackEvent("onboarding_click_step", { step }),
  completeStep: (step: string) => trackEvent("onboarding_complete_step", { step }),
  completeAllRequired: () => trackEvent("onboarding_complete_required"),
  viewMenu: () => trackEvent("onboarding_view_menu"),
  navigateNext: (fromStep: string, toStep: string) => trackEvent("onboarding_navigate_next", { from_step: fromStep, to_step: toStep }),
  navigatePrev: (fromStep: string, toStep: string) => trackEvent("onboarding_navigate_prev", { from_step: fromStep, to_step: toStep }),
};

// Dashboard navigation events
export const dashboard = {
  viewPage: (page: string) => trackEvent("dashboard_view_page", { page }),
  navigateTo: (fromPage: string, toPage: string) => trackEvent("dashboard_navigate", { from_page: fromPage, to_page: toPage }),
  returnToOnboarding: (fromPage: string) => trackEvent("dashboard_return_to_onboarding", { from_page: fromPage }),
  openSidebar: () => trackEvent("dashboard_open_sidebar"),
  closeSidebar: () => trackEvent("dashboard_close_sidebar"),
};

// Category events
export const category = {
  create: () => trackEvent("category_create"),
  update: () => trackEvent("category_update"),
  delete: () => trackEvent("category_delete"),
  toggleActive: (active: boolean) => trackEvent("category_toggle_active", { active }),
  reorder: () => trackEvent("category_reorder"),
  openForm: (isEdit: boolean) => trackEvent("category_open_form", { is_edit: isEdit }),
};

// Item events
export const item = {
  create: (hasImage: boolean, hasAllergens: boolean) =>
    trackEvent("item_create", { has_image: hasImage, has_allergens: hasAllergens }),
  update: (hasImage: boolean, hasAllergens: boolean) =>
    trackEvent("item_update", { has_image: hasImage, has_allergens: hasAllergens }),
  delete: () => trackEvent("item_delete"),
  toggleActive: (active: boolean) => trackEvent("item_toggle_active", { active }),
  reorder: () => trackEvent("item_reorder"),
  openForm: (isEdit: boolean) => trackEvent("item_open_form", { is_edit: isEdit }),
  uploadImage: () => trackEvent("item_upload_image"),
  removeImage: () => trackEvent("item_remove_image"),
  selectAllergen: (allergen: string) => trackEvent("item_select_allergen", { allergen }),
};

// Settings events
export const settings = {
  updateGeneral: () => trackEvent("settings_update_general"),
  changeSlug: (newSlug: string) => trackEvent("settings_change_slug", { new_slug: newSlug }),
  changeCurrency: (currency: string) => trackEvent("settings_change_currency", { currency }),
};

// Design events
export const design = {
  update: () => trackEvent("design_update"),
  uploadBackground: (type: "image" | "video") => trackEvent("design_upload_background", { type }),
  removeBackground: () => trackEvent("design_remove_background"),
  changeAccentColor: (color: string) => trackEvent("design_change_accent_color", { color }),
  selectPresetColor: (color: string) => trackEvent("design_select_preset_color", { color }),
};

// Contacts events
export const contacts = {
  update: () => trackEvent("contacts_update"),
  addPhone: () => trackEvent("contacts_add_phone"),
  addInstagram: () => trackEvent("contacts_add_instagram"),
  addWhatsapp: () => trackEvent("contacts_add_whatsapp"),
  setLocation: () => trackEvent("contacts_set_location"),
};

// Languages events
export const languages = {
  enable: (language: string) => trackEvent("language_enable", { language }),
  disable: (language: string) => trackEvent("language_disable", { language }),
  setDefault: (language: string) => trackEvent("language_set_default", { language }),
};

// Reservations events
export const reservations = {
  enable: () => trackEvent("reservations_enable"),
  disable: () => trackEvent("reservations_disable"),
  updateSettings: () => trackEvent("reservations_update_settings"),
  setMode: (mode: string) => trackEvent("reservations_set_mode", { mode }),
  setDuration: (minutes: number) => trackEvent("reservations_set_duration", { minutes }),
  setWorkingHours: () => trackEvent("reservations_set_working_hours"),
};

// Tables events
export const tables = {
  create: (capacity: number) => trackEvent("table_create", { capacity }),
  update: () => trackEvent("table_update"),
  delete: () => trackEvent("table_delete"),
  toggleActive: (active: boolean) => trackEvent("table_toggle_active", { active }),
};

// Billing events
export const billing = {
  viewPlans: () => trackEvent("billing_view_plans"),
  selectPlan: (plan: string, interval: string) =>
    trackEvent("billing_select_plan", { plan, interval }),
  startCheckout: (plan: string) => trackEvent("billing_start_checkout", { plan }),
  cancelSubscription: () => trackEvent("billing_cancel_subscription"),
};

// QR Code events
export const qrCode = {
  view: () => trackEvent("qr_code_view"),
  download: (format: string) => trackEvent("qr_code_download", { format }),
  copy: () => trackEvent("qr_code_copy"),
};

// Support events
export const support = {
  openChat: () => trackEvent("support_open_chat"),
  sendMessage: () => trackEvent("support_send_message"),
};

// Export all as analytics object for convenience
export const analytics = {
  trackEvent,
  marketing,
  auth,
  onboarding,
  dashboard,
  category,
  item,
  settings,
  design,
  contacts,
  languages,
  reservations,
  tables,
  billing,
  qrCode,
  support,
};
