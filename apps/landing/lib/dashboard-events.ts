// Dashboard analytics events — flat enum, no meta params
// Naming: showed_* (page view), clicked_* (button), focused_* (input), changed_* (select), toggled_* (switch)

export enum DashboardEvent {
  // Auth
  SHOWED_LOGIN = "showed_login",
  FOCUSED_LOGIN_EMAIL = "focused_login_email",
  CLICKED_LOGIN_CONTINUE = "clicked_login_continue",
  AUTH_SIGNUP = "auth_signup",
  SHOWED_OTP = "showed_otp",
  FOCUSED_OTP_INPUT = "focused_otp_input",
  CLICKED_VERIFY_OTP = "clicked_verify_otp",
  CLICKED_CHANGE_EMAIL = "clicked_change_email",

  // Onboarding
  SHOWED_ONBOARDING_NAME = "showed_onboarding_name",
  FOCUSED_ONBOARDING_NAME = "focused_onboarding_name",
  CLICKED_ONBOARDING_CONTINUE = "clicked_onboarding_continue",
  SHOWED_ONBOARDING_TYPE = "showed_onboarding_type",
  CLICKED_ONBOARDING_TYPE = "clicked_onboarding_type",
  CLICKED_ONBOARDING_SCRATCH = "clicked_onboarding_scratch",

  // Home
  SHOWED_HOME = "showed_home",
  CLICKED_VIEW_MENU = "clicked_view_menu",
  CLICKED_HELP = "clicked_help",
  CLICKED_CHECKLIST_NAME = "clicked_checklist_name",
  CLICKED_CHECKLIST_TEMPLATE = "clicked_checklist_template",
  CLICKED_CHECKLIST_MENU = "clicked_checklist_menu",
  CLICKED_CHECKLIST_CONTACTS = "clicked_checklist_contacts",
  CLICKED_CHECKLIST_BRAND = "clicked_checklist_brand",
  CLICKED_NAV_MENU = "clicked_nav_menu",
  CLICKED_NAV_CONTACTS = "clicked_nav_contacts",
  CLICKED_NAV_SETTINGS = "clicked_nav_settings",
  CLICKED_NAV_DESIGN = "clicked_nav_design",
  CLICKED_NAV_QR = "clicked_nav_qr",
  CLICKED_NAV_ANALYTICS = "clicked_nav_analytics",
  CLICKED_NAV_TABLES = "clicked_nav_tables",
  CLICKED_NAV_RESERVATIONS = "clicked_nav_reservations",
  CLICKED_NAV_BILLING = "clicked_nav_billing",
  CLICKED_LOGOUT = "clicked_logout",

  // Menu
  SHOWED_MENU = "showed_menu",
  CLICKED_ADD_ITEM = "clicked_add_item",
  CLICKED_ADD_CATEGORY = "clicked_add_category",
  CLICKED_SORT_MENU = "clicked_sort_menu",
  SORTED_CATEGORY = "sorted_category",
  SORTED_ITEM = "sorted_item",
  CLICKED_CATEGORY_ROW = "clicked_category_row",
  CLICKED_ITEM_ROW = "clicked_item_row",
  TOGGLED_MENU_ITEM_ACTIVE = "toggled_menu_item_active",

  // Category Form
  SHOWED_CATEGORY_FORM = "showed_category_form",
  FOCUSED_CATEGORY_NAME = "focused_category_name",
  TOGGLED_CATEGORY_ACTIVE = "toggled_category_active",
  CLICKED_SAVE_CATEGORY = "clicked_save_category",
  CLICKED_DELETE_CATEGORY = "clicked_delete_category",

  // Item Form
  SHOWED_ITEM_FORM = "showed_item_form",
  FOCUSED_ITEM_NAME = "focused_item_name",
  FOCUSED_ITEM_PRICE = "focused_item_price",
  FOCUSED_ITEM_DESCRIPTION = "focused_item_description",
  CHANGED_ITEM_CATEGORY = "changed_item_category",
  TOGGLED_ITEM_ACTIVE = "toggled_item_active",
  CLICKED_UPLOAD_ITEM_IMAGE = "clicked_upload_item_image",
  CLICKED_SAVE_ITEM = "clicked_save_item",
  CLICKED_DELETE_ITEM = "clicked_delete_item",
  TOGGLED_ITEM_MORE_DETAILS = "toggled_item_more_details",

  // Tables
  SHOWED_TABLES = "showed_tables",
  CLICKED_ADD_TABLE = "clicked_add_table",
  CLICKED_SORT_TABLES = "clicked_sort_tables",
  SORTED_TABLE = "sorted_table",
  CLICKED_TABLE_ROW = "clicked_table_row",
  TOGGLED_TABLES_LIST_ACTIVE = "toggled_tables_list_active",

  // Table Form
  SHOWED_TABLE_FORM = "showed_table_form",
  FOCUSED_TABLE_NUMBER = "focused_table_number",
  FOCUSED_TABLE_CAPACITY = "focused_table_capacity",
  FOCUSED_TABLE_ZONE = "focused_table_zone",
  TOGGLED_TABLE_ACTIVE = "toggled_table_active",
  CLICKED_UPLOAD_TABLE_IMAGE = "clicked_upload_table_image",
  CLICKED_SAVE_TABLE = "clicked_save_table",
  CLICKED_DELETE_TABLE = "clicked_delete_table",

  // Contacts
  SHOWED_CONTACTS = "showed_contacts",
  FOCUSED_PHONE = "focused_phone",
  FOCUSED_INSTAGRAM = "focused_instagram",
  FOCUSED_WHATSAPP = "focused_whatsapp",
  CLICKED_MAP = "clicked_map",
  CLICKED_SAVE_CONTACTS = "clicked_save_contacts",

  // Settings
  SHOWED_SETTINGS = "showed_settings",
  FOCUSED_RESTAURANT_NAME = "focused_restaurant_name",
  FOCUSED_RESTAURANT_DESCRIPTION = "focused_restaurant_description",
  FOCUSED_RESTAURANT_SLUG = "focused_restaurant_slug",
  CHANGED_CURRENCY = "changed_currency",
  TOGGLED_LANGUAGE = "toggled_language",
  CLICKED_SET_DEFAULT_LANGUAGE = "clicked_set_default_language",
  CLICKED_SAVE_SETTINGS = "clicked_save_settings",

  // Design
  SHOWED_DESIGN = "showed_design",
  TOGGLED_HIDE_TITLE = "toggled_hide_title",
  CLICKED_UPLOAD_BACKGROUND = "clicked_upload_background",
  CLICKED_REMOVE_BACKGROUND = "clicked_remove_background",
  CLICKED_PRESET_COLOR = "clicked_preset_color",
  CHANGED_CUSTOM_COLOR = "changed_custom_color",
  CLICKED_SAVE_DESIGN = "clicked_save_design",

  // QR Menu
  SHOWED_QR_MENU = "showed_qr_menu",
  CLICKED_COPY_URL = "clicked_copy_url",
  CHANGED_PAPER_FORMAT = "changed_paper_format",
  CHANGED_QR_PER_PAGE = "changed_qr_per_page",
  FOCUSED_CUSTOM_TEXT = "focused_custom_text",
  CHANGED_TEXT_SIZE = "changed_text_size",
  CLICKED_DOWNLOAD_QR = "clicked_download_qr",
  CLICKED_PRINT_QR = "clicked_print_qr",

  // Reservations
  SHOWED_RESERVATIONS = "showed_reservations",
  CLICKED_RESERVATION_SETTINGS = "clicked_reservation_settings",
  CLICKED_CONFIRM_RESERVATION = "clicked_confirm_reservation",
  CLICKED_REJECT_RESERVATION = "clicked_reject_reservation",

  // Reservation Settings
  SHOWED_RESERVATION_SETTINGS = "showed_reservation_settings",
  TOGGLED_RESERVATIONS_ENABLED = "toggled_reservations_enabled",
  CHANGED_RESERVATION_MODE = "changed_reservation_mode",
  CHANGED_SLOT_DURATION = "changed_slot_duration",
  CHANGED_WORKING_HOURS_START = "changed_working_hours_start",
  CHANGED_WORKING_HOURS_END = "changed_working_hours_end",
  CLICKED_SAVE_RESERVATION_SETTINGS = "clicked_save_reservation_settings",

  // Analytics
  SHOWED_ANALYTICS = "showed_analytics",

  // Billing
  SHOWED_BILLING = "showed_billing",
  CLICKED_PLAN_UPGRADE = "clicked_plan_upgrade",
  CLICKED_MANAGE_SUBSCRIPTION = "clicked_manage_subscription",

  // Support
  SHOWED_SUPPORT = "showed_support",
  FOCUSED_SUPPORT_MESSAGE = "focused_support_message",
  CLICKED_SEND_MESSAGE = "clicked_send_message",

  // AI Translate
  CLICKED_AI_TRANSLATE = "clicked_ai_translate",
  CLICKED_AI_SUBSCRIBE = "clicked_ai_subscribe",
  CLICKED_AI_CANCEL = "clicked_ai_cancel",
}

// Human-readable labels for admin analytics display
export const EVENT_LABELS: Record<string, string> = {
  // Auth
  [DashboardEvent.SHOWED_LOGIN]: "Showed Login",
  [DashboardEvent.FOCUSED_LOGIN_EMAIL]: "Focused Email Input",
  [DashboardEvent.CLICKED_LOGIN_CONTINUE]: "Clicked Continue",
  [DashboardEvent.AUTH_SIGNUP]: "New Signup",
  [DashboardEvent.SHOWED_OTP]: "Showed OTP",
  [DashboardEvent.FOCUSED_OTP_INPUT]: "Focused OTP Input",
  [DashboardEvent.CLICKED_VERIFY_OTP]: "Clicked Verify OTP",
  [DashboardEvent.CLICKED_CHANGE_EMAIL]: "Clicked Change Email",

  // Onboarding
  [DashboardEvent.SHOWED_ONBOARDING_NAME]: "Showed Onboarding Name",
  [DashboardEvent.FOCUSED_ONBOARDING_NAME]: "Focused Restaurant Name",
  [DashboardEvent.CLICKED_ONBOARDING_CONTINUE]: "Clicked Continue",
  [DashboardEvent.SHOWED_ONBOARDING_TYPE]: "Showed Onboarding Type",
  [DashboardEvent.CLICKED_ONBOARDING_TYPE]: "Selected Restaurant Type",
  [DashboardEvent.CLICKED_ONBOARDING_SCRATCH]: "Started From Scratch",

  // Home
  [DashboardEvent.SHOWED_HOME]: "Showed Home",
  [DashboardEvent.CLICKED_VIEW_MENU]: "Clicked View Menu",
  [DashboardEvent.CLICKED_HELP]: "Clicked Help",
  [DashboardEvent.CLICKED_CHECKLIST_NAME]: "Checklist: Name",
  [DashboardEvent.CLICKED_CHECKLIST_TEMPLATE]: "Checklist: Template",
  [DashboardEvent.CLICKED_CHECKLIST_MENU]: "Checklist: Menu",
  [DashboardEvent.CLICKED_CHECKLIST_CONTACTS]: "Checklist: Contacts",
  [DashboardEvent.CLICKED_CHECKLIST_BRAND]: "Checklist: Brand",
  [DashboardEvent.CLICKED_NAV_MENU]: "Nav: Menu",
  [DashboardEvent.CLICKED_NAV_CONTACTS]: "Nav: Contacts",
  [DashboardEvent.CLICKED_NAV_SETTINGS]: "Nav: Settings",
  [DashboardEvent.CLICKED_NAV_DESIGN]: "Nav: Design",
  [DashboardEvent.CLICKED_NAV_QR]: "Nav: QR Menu",
  [DashboardEvent.CLICKED_NAV_ANALYTICS]: "Nav: Analytics",
  [DashboardEvent.CLICKED_NAV_TABLES]: "Nav: Tables",
  [DashboardEvent.CLICKED_NAV_RESERVATIONS]: "Nav: Reservations",
  [DashboardEvent.CLICKED_NAV_BILLING]: "Nav: Billing",
  [DashboardEvent.CLICKED_LOGOUT]: "Clicked Logout",

  // Menu
  [DashboardEvent.SHOWED_MENU]: "Showed Menu",
  [DashboardEvent.CLICKED_ADD_ITEM]: "Clicked Add Item",
  [DashboardEvent.CLICKED_ADD_CATEGORY]: "Clicked Add Category",
  [DashboardEvent.CLICKED_SORT_MENU]: "Clicked Sort Menu",
  [DashboardEvent.SORTED_CATEGORY]: "Sorted Category",
  [DashboardEvent.SORTED_ITEM]: "Sorted Item",
  [DashboardEvent.CLICKED_CATEGORY_ROW]: "Clicked Category Row",
  [DashboardEvent.CLICKED_ITEM_ROW]: "Clicked Item Row",
  [DashboardEvent.TOGGLED_MENU_ITEM_ACTIVE]: "Toggled Menu Item Active",

  // Category Form
  [DashboardEvent.SHOWED_CATEGORY_FORM]: "Showed Category Form",
  [DashboardEvent.FOCUSED_CATEGORY_NAME]: "Focused Category Name",
  [DashboardEvent.TOGGLED_CATEGORY_ACTIVE]: "Toggled Category Active",
  [DashboardEvent.CLICKED_SAVE_CATEGORY]: "Clicked Save Category",
  [DashboardEvent.CLICKED_DELETE_CATEGORY]: "Clicked Delete Category",

  // Item Form
  [DashboardEvent.SHOWED_ITEM_FORM]: "Showed Item Form",
  [DashboardEvent.FOCUSED_ITEM_NAME]: "Focused Item Name",
  [DashboardEvent.FOCUSED_ITEM_PRICE]: "Focused Item Price",
  [DashboardEvent.FOCUSED_ITEM_DESCRIPTION]: "Focused Item Description",
  [DashboardEvent.CHANGED_ITEM_CATEGORY]: "Changed Item Category",
  [DashboardEvent.TOGGLED_ITEM_ACTIVE]: "Toggled Item Active",
  [DashboardEvent.CLICKED_UPLOAD_ITEM_IMAGE]: "Clicked Upload Item Image",
  [DashboardEvent.CLICKED_SAVE_ITEM]: "Clicked Save Item",
  [DashboardEvent.CLICKED_DELETE_ITEM]: "Clicked Delete Item",
  [DashboardEvent.TOGGLED_ITEM_MORE_DETAILS]: "Toggled Item More Details",

  // Tables
  [DashboardEvent.SHOWED_TABLES]: "Showed Tables",
  [DashboardEvent.CLICKED_ADD_TABLE]: "Clicked Add Table",
  [DashboardEvent.CLICKED_SORT_TABLES]: "Clicked Sort Tables",
  [DashboardEvent.SORTED_TABLE]: "Sorted Table",
  [DashboardEvent.CLICKED_TABLE_ROW]: "Clicked Table Row",
  [DashboardEvent.TOGGLED_TABLES_LIST_ACTIVE]: "Toggled Tables List Active",

  // Table Form
  [DashboardEvent.SHOWED_TABLE_FORM]: "Showed Table Form",
  [DashboardEvent.FOCUSED_TABLE_NUMBER]: "Focused Table Number",
  [DashboardEvent.FOCUSED_TABLE_CAPACITY]: "Focused Table Capacity",
  [DashboardEvent.FOCUSED_TABLE_ZONE]: "Focused Table Zone",
  [DashboardEvent.TOGGLED_TABLE_ACTIVE]: "Toggled Table Active",
  [DashboardEvent.CLICKED_UPLOAD_TABLE_IMAGE]: "Clicked Upload Table Image",
  [DashboardEvent.CLICKED_SAVE_TABLE]: "Clicked Save Table",
  [DashboardEvent.CLICKED_DELETE_TABLE]: "Clicked Delete Table",

  // Contacts
  [DashboardEvent.SHOWED_CONTACTS]: "Showed Contacts",
  [DashboardEvent.FOCUSED_PHONE]: "Focused Phone",
  [DashboardEvent.FOCUSED_INSTAGRAM]: "Focused Instagram",
  [DashboardEvent.FOCUSED_WHATSAPP]: "Focused WhatsApp",
  [DashboardEvent.CLICKED_MAP]: "Clicked Map",
  [DashboardEvent.CLICKED_SAVE_CONTACTS]: "Clicked Save Contacts",

  // Settings
  [DashboardEvent.SHOWED_SETTINGS]: "Showed Settings",
  [DashboardEvent.FOCUSED_RESTAURANT_NAME]: "Focused Restaurant Name",
  [DashboardEvent.FOCUSED_RESTAURANT_DESCRIPTION]: "Focused Description",
  [DashboardEvent.FOCUSED_RESTAURANT_SLUG]: "Focused Slug",
  [DashboardEvent.CHANGED_CURRENCY]: "Changed Currency",
  [DashboardEvent.TOGGLED_LANGUAGE]: "Toggled Language",
  [DashboardEvent.CLICKED_SET_DEFAULT_LANGUAGE]: "Set Default Language",
  [DashboardEvent.CLICKED_SAVE_SETTINGS]: "Clicked Save Settings",

  // Design
  [DashboardEvent.SHOWED_DESIGN]: "Showed Design",
  [DashboardEvent.TOGGLED_HIDE_TITLE]: "Toggled Hide Title",
  [DashboardEvent.CLICKED_UPLOAD_BACKGROUND]: "Clicked Upload Background",
  [DashboardEvent.CLICKED_REMOVE_BACKGROUND]: "Clicked Remove Background",
  [DashboardEvent.CLICKED_PRESET_COLOR]: "Clicked Preset Color",
  [DashboardEvent.CHANGED_CUSTOM_COLOR]: "Changed Custom Color",
  [DashboardEvent.CLICKED_SAVE_DESIGN]: "Clicked Save Design",

  // QR Menu
  [DashboardEvent.SHOWED_QR_MENU]: "Showed QR Menu",
  [DashboardEvent.CLICKED_COPY_URL]: "Clicked Copy URL",
  [DashboardEvent.CHANGED_PAPER_FORMAT]: "Changed Paper Format",
  [DashboardEvent.CHANGED_QR_PER_PAGE]: "Changed QR Per Page",
  [DashboardEvent.FOCUSED_CUSTOM_TEXT]: "Focused Custom Text",
  [DashboardEvent.CHANGED_TEXT_SIZE]: "Changed Text Size",
  [DashboardEvent.CLICKED_DOWNLOAD_QR]: "Clicked Download QR",
  [DashboardEvent.CLICKED_PRINT_QR]: "Clicked Print QR",

  // Reservations
  [DashboardEvent.SHOWED_RESERVATIONS]: "Showed Reservations",
  [DashboardEvent.CLICKED_RESERVATION_SETTINGS]: "Clicked Reservation Settings",
  [DashboardEvent.CLICKED_CONFIRM_RESERVATION]: "Clicked Confirm Reservation",
  [DashboardEvent.CLICKED_REJECT_RESERVATION]: "Clicked Reject Reservation",

  // Reservation Settings
  [DashboardEvent.SHOWED_RESERVATION_SETTINGS]: "Showed Reservation Settings",
  [DashboardEvent.TOGGLED_RESERVATIONS_ENABLED]: "Toggled Reservations Enabled",
  [DashboardEvent.CHANGED_RESERVATION_MODE]: "Changed Reservation Mode",
  [DashboardEvent.CHANGED_SLOT_DURATION]: "Changed Slot Duration",
  [DashboardEvent.CHANGED_WORKING_HOURS_START]: "Changed Working Hours Start",
  [DashboardEvent.CHANGED_WORKING_HOURS_END]: "Changed Working Hours End",
  [DashboardEvent.CLICKED_SAVE_RESERVATION_SETTINGS]: "Clicked Save Reservation Settings",

  // Analytics
  [DashboardEvent.SHOWED_ANALYTICS]: "Showed Analytics",

  // Billing
  [DashboardEvent.SHOWED_BILLING]: "Showed Billing",
  [DashboardEvent.CLICKED_PLAN_UPGRADE]: "Clicked Plan Upgrade",
  [DashboardEvent.CLICKED_MANAGE_SUBSCRIPTION]: "Clicked Manage Subscription",

  // Support
  [DashboardEvent.SHOWED_SUPPORT]: "Showed Support",
  [DashboardEvent.FOCUSED_SUPPORT_MESSAGE]: "Focused Support Message",
  [DashboardEvent.CLICKED_SEND_MESSAGE]: "Clicked Send Message",

  // AI Translate
  [DashboardEvent.CLICKED_AI_TRANSLATE]: "Clicked AI Translate",
  [DashboardEvent.CLICKED_AI_SUBSCRIBE]: "Clicked AI Subscribe",
  [DashboardEvent.CLICKED_AI_CANCEL]: "Clicked AI Cancel",
};

// Deduplicate: skip if the same event fired less than 1s ago
const lastFired = new Map<string, number>();

// Thin wrapper — fire-and-forget, no meta
export function track(event: DashboardEvent) {
  if (typeof window === "undefined") return;
  if (typeof localStorage !== "undefined" && localStorage.getItem("analytics_disabled") === "true") return;

  const now = Date.now();
  const last = lastFired.get(event);
  if (last && now - last < 1000) return;
  lastFired.set(event, now);

  const SESSION_ID_KEY = "analytics_session_id";
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, sessionId }),
  }).catch(() => {});
}
