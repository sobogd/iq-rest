// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isTrackingDisabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("analytics_disabled") === "true";
}

function trackEvent(eventName: string) {
  if (typeof window !== "undefined" && window.gtag && !isTrackingDisabled()) {
    window.gtag("event", eventName);
  }
}

function pageView(slug: string) {
  if (isTrackingDisabled()) return;
  const eventName = `page_view_${slug.replace(/-/g, "_")}`;
  trackEvent(eventName);
}

export function disableTracking() {
  if (typeof window !== "undefined") {
    localStorage.setItem("analytics_disabled", "true");
  }
}

export function enableTracking() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("analytics_disabled");
  }
}

// Marketing events
export const marketing = {
  ctaHeaderClick: () => trackEvent("marketing_cta_header_click"),
  ctaHeroClick: () => trackEvent("marketing_cta_hero_click"),
  ctaFeaturesClick: () => trackEvent("marketing_cta_features_click"),
  ctaPricingClick: () => trackEvent("marketing_cta_pricing_click"),
  ctaFooterClick: () => trackEvent("marketing_cta_footer_click"),
  pricingFreeClick: () => trackEvent("marketing_pricing_free_click"),
  pricingBasicClick: () => trackEvent("marketing_pricing_basic_click"),
  pricingProClick: () => trackEvent("marketing_pricing_pro_click"),
  demoClick: () => trackEvent("marketing_demo_click"),
  signInHeaderClick: () => trackEvent("marketing_signin_header_click"),
  signInHeroClick: () => trackEvent("marketing_signin_hero_click"),
  pricingView: () => trackEvent("marketing_pricing_view"),
  featuresView: () => trackEvent("marketing_features_view"),
  faqView: () => trackEvent("marketing_faq_view"),
  mobileMenuOpen: () => trackEvent("marketing_mobile_menu_open"),
  mobileMenuNavClick: (section: string) => trackEvent(`marketing_mobile_menu_nav_${section}_click`),
};

// Auth events
export const auth = {
  signInStart: () => trackEvent("auth_signin_start"),
  emailSubmit: () => trackEvent("auth_email_submit"),
  codeVerify: () => trackEvent("auth_code_verify"),
  signUp: () => trackEvent("auth_signup"),
  signOut: () => trackEvent("auth_signout"),
};

// Onboarding events
export const onboarding = {
  view: () => trackEvent("onboarding_view"),
  stepTitleClick: () => trackEvent("onboarding_step_title_click"),
  stepSlugClick: () => trackEvent("onboarding_step_slug_click"),
  stepCategoriesClick: () => trackEvent("onboarding_step_categories_click"),
  stepItemsClick: () => trackEvent("onboarding_step_items_click"),
  stepContactsClick: () => trackEvent("onboarding_step_contacts_click"),
  stepLanguagesClick: () => trackEvent("onboarding_step_languages_click"),
  stepDesignClick: () => trackEvent("onboarding_step_design_click"),
  stepReservationsClick: () => trackEvent("onboarding_step_reservations_click"),
  allComplete: () => trackEvent("onboarding_all_complete"),
  menuView: () => trackEvent("onboarding_menu_view"),
  navigateNext: () => trackEvent("onboarding_navigate_next"),
  navigatePrev: () => trackEvent("onboarding_navigate_prev"),
};

// Dashboard navigation events
export const dashboard = {
  pageQrMenuView: () => trackEvent("dashboard_page_qrmenu_view"),
  pageHomeView: () => trackEvent("dashboard_page_home_view"),
  pageAnalyticsView: () => trackEvent("dashboard_page_analytics_view"),
  pageCategoriesView: () => trackEvent("dashboard_page_categories_view"),
  pageItemsView: () => trackEvent("dashboard_page_items_view"),
  pageSettingsView: () => trackEvent("dashboard_page_settings_view"),
  pageDesignView: () => trackEvent("dashboard_page_design_view"),
  pageContactsView: () => trackEvent("dashboard_page_contacts_view"),
  pageLanguagesView: () => trackEvent("dashboard_page_languages_view"),
  pageReservationsView: () => trackEvent("dashboard_page_reservations_view"),
  pageReservationSettingsView: () => trackEvent("dashboard_page_reservation_settings_view"),
  pageTablesView: () => trackEvent("dashboard_page_tables_view"),
  pageBillingView: () => trackEvent("dashboard_page_billing_view"),
  pageSupportView: () => trackEvent("dashboard_page_support_view"),
  returnToOnboarding: () => trackEvent("dashboard_return_to_onboarding"),
  sidebarOpen: () => trackEvent("dashboard_sidebar_open"),
  sidebarClose: () => trackEvent("dashboard_sidebar_close"),
};

// Category events
export const category = {
  create: () => trackEvent("category_create"),
  update: () => trackEvent("category_update"),
  delete: () => trackEvent("category_delete"),
  activate: () => trackEvent("category_activate"),
  deactivate: () => trackEvent("category_deactivate"),
  reorder: () => trackEvent("category_reorder"),
  formOpenNew: () => trackEvent("category_form_open_new"),
  formOpenEdit: () => trackEvent("category_form_open_edit"),
};

// Item events
export const item = {
  create: () => trackEvent("item_create"),
  createWithImage: () => trackEvent("item_create_with_image"),
  createWithAllergens: () => trackEvent("item_create_with_allergens"),
  update: () => trackEvent("item_update"),
  delete: () => trackEvent("item_delete"),
  activate: () => trackEvent("item_activate"),
  deactivate: () => trackEvent("item_deactivate"),
  reorder: () => trackEvent("item_reorder"),
  formOpenNew: () => trackEvent("item_form_open_new"),
  formOpenEdit: () => trackEvent("item_form_open_edit"),
  imageUpload: () => trackEvent("item_image_upload"),
  imageRemove: () => trackEvent("item_image_remove"),
};

// Settings events
export const settings = {
  save: () => trackEvent("settings_save"),
  slugChange: () => trackEvent("settings_slug_change"),
  currencyChange: () => trackEvent("settings_currency_change"),
};

// Design events
export const design = {
  save: () => trackEvent("design_save"),
  backgroundUploadImage: () => trackEvent("design_background_upload_image"),
  backgroundUploadVideo: () => trackEvent("design_background_upload_video"),
  backgroundRemove: () => trackEvent("design_background_remove"),
  accentColorChange: () => trackEvent("design_accent_color_change"),
  presetColorSelect: () => trackEvent("design_preset_color_select"),
};

// Contacts events
export const contacts = {
  save: () => trackEvent("contacts_save"),
  phoneAdd: () => trackEvent("contacts_phone_add"),
  instagramAdd: () => trackEvent("contacts_instagram_add"),
  whatsappAdd: () => trackEvent("contacts_whatsapp_add"),
  locationSet: () => trackEvent("contacts_location_set"),
};

// Languages events
export const languages = {
  enable: (lang: string) => trackEvent(`languages_${lang}_enable`),
  disable: (lang: string) => trackEvent(`languages_${lang}_disable`),
  setDefault: (lang: string) => trackEvent(`languages_${lang}_set_default`),
};

// Reservations events
export const reservations = {
  enable: () => trackEvent("reservations_enable"),
  disable: () => trackEvent("reservations_disable"),
  save: () => trackEvent("reservations_save"),
  modeManual: () => trackEvent("reservations_mode_manual"),
  modeAuto: () => trackEvent("reservations_mode_auto"),
};

// Tables events
export const tables = {
  create: () => trackEvent("tables_create"),
  update: () => trackEvent("tables_update"),
  delete: () => trackEvent("tables_delete"),
  activate: () => trackEvent("tables_activate"),
  deactivate: () => trackEvent("tables_deactivate"),
};

// Billing events
export const billing = {
  plansView: () => trackEvent("billing_plans_view"),
  planFreeSelect: () => trackEvent("billing_plan_free_select"),
  planBasicMonthlySelect: () => trackEvent("billing_plan_basic_monthly_select"),
  planBasicYearlySelect: () => trackEvent("billing_plan_basic_yearly_select"),
  planProMonthlySelect: () => trackEvent("billing_plan_pro_monthly_select"),
  planProYearlySelect: () => trackEvent("billing_plan_pro_yearly_select"),
  checkoutStart: () => trackEvent("billing_checkout_start"),
  subscriptionCancel: () => trackEvent("billing_subscription_cancel"),
};

// QR Code events
export const qrCode = {
  view: () => trackEvent("qrcode_view"),
  downloadPng: () => trackEvent("qrcode_download_png"),
  print: () => trackEvent("qrcode_print"),
};

// Support events
export const support = {
  chatOpen: () => trackEvent("support_chat_open"),
  messageSend: () => trackEvent("support_message_send"),
};

// Section visibility events
export const section = {
  show: (name: string) => trackEvent(`show_${name.replace(/-/g, "_")}`),
  timeSpent: (name: string, seconds: number) => {
    const bucket = seconds < 5 ? "under_5s" : seconds < 15 ? "5_15s" : seconds < 30 ? "15_30s" : "over_30s";
    trackEvent(`time_${name.replace(/-/g, "_")}_${bucket}`);
  },
};

// Export all as analytics object for convenience
export const analytics = {
  trackEvent,
  pageView,
  section,
  disableTracking,
  enableTracking,
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
