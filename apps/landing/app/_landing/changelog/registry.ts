import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { LandingTexts } from "../types";
import type { ChangelogTexts } from "./types";

export interface EntryComponentProps {
  texts: ChangelogTexts;
  headerTexts: LandingTexts["header"];
  footerTexts: LandingTexts["footer"];
  locale: string;
}

type EntryRegistry = Record<string, ComponentType<EntryComponentProps>>;

// Lazy import each entry component so locale bundles stay lean.
export const ENTRY_REGISTRY: EntryRegistry = {
  "ai-dish-photos-restaurant-menu": dynamic(() => import("./entries/ai-dish-photos-restaurant-menu").then((m) => m.Entry)),
  "ai-restaurant-cover-background": dynamic(() => import("./entries/ai-restaurant-cover-background").then((m) => m.Entry)),
  "three-step-signup-wizard-restaurant-menu": dynamic(() => import("./entries/three-step-signup-wizard-restaurant-menu").then((m) => m.Entry)),
  "ai-built-sample-menu-on-signup": dynamic(() => import("./entries/ai-built-sample-menu-on-signup").then((m) => m.Entry)),
  "interactive-menu-tour-first-visit": dynamic(() => import("./entries/interactive-menu-tour-first-visit").then((m) => m.Entry)),
  "custom-landing-page-per-country": dynamic(() => import("./entries/custom-landing-page-per-country").then((m) => m.Entry)),
  "sign-in-with-google-restaurant-dashboard": dynamic(() => import("./entries/sign-in-with-google-restaurant-dashboard").then((m) => m.Entry)),
  "multilingual-email-notifications-35-languages": dynamic(() => import("./entries/multilingual-email-notifications-35-languages").then((m) => m.Entry)),
  "ios-native-feel-mobile-restaurant-management": dynamic(() => import("./entries/ios-native-feel-mobile-restaurant-management").then((m) => m.Entry)),
  "gdpr-cookie-consent-banner-restaurant-website": dynamic(() => import("./entries/gdpr-cookie-consent-banner-restaurant-website").then((m) => m.Entry)),
  "privacy-terms-in-modals-no-page-jumps": dynamic(() => import("./entries/privacy-terms-in-modals-no-page-jumps").then((m) => m.Entry)),
  "auto-catalan-language-catalonia-visitors": dynamic(() => import("./entries/auto-catalan-language-catalonia-visitors").then((m) => m.Entry)),
  "trial-expired-modal-keep-menu-public": dynamic(() => import("./entries/trial-expired-modal-keep-menu-public").then((m) => m.Entry)),
  "item-renamed-to-dish-clearer-menu-editor": dynamic(() => import("./entries/item-renamed-to-dish-clearer-menu-editor").then((m) => m.Entry)),
  "auto-default-category-restaurant-menu-onboarding": dynamic(() => import("./entries/auto-default-category-restaurant-menu-onboarding").then((m) => m.Entry)),
  "skip-restaurant-name-step-onboarding": dynamic(() => import("./entries/skip-restaurant-name-step-onboarding").then((m) => m.Entry)),
  "try-menu-before-signup-anonymous-onboarding": dynamic(() => import("./entries/try-menu-before-signup-anonymous-onboarding").then((m) => m.Entry)),
  "save-menu-progress-via-email-link": dynamic(() => import("./entries/save-menu-progress-via-email-link").then((m) => m.Entry)),
  "one-click-stripe-checkout-returning-users": dynamic(() => import("./entries/one-click-stripe-checkout-returning-users").then((m) => m.Entry)),
  "dashboard-ui-redesign-consistent-cards-navigation": dynamic(() => import("./entries/dashboard-ui-redesign-consistent-cards-navigation").then((m) => m.Entry)),
  "ai-menu-scanner-create-digital-qr-menu": dynamic(() => import("./entries/ai-menu-scanner-create-digital-qr-menu").then((m) => m.Entry)),
  "redesigned-dashboard-qr-menu-management": dynamic(() => import("./entries/redesigned-dashboard-qr-menu-management").then((m) => m.Entry)),
  "reservation-emails-analytics-digital-qr-menu": dynamic(() => import("./entries/reservation-emails-analytics-digital-qr-menu").then((m) => m.Entry)),
  "multi-currency-geo-pricing-qr-menu": dynamic(() => import("./entries/multi-currency-geo-pricing-qr-menu").then((m) => m.Entry)),
  "support-qr-menu-restaurant-cafe": dynamic(() => import("./entries/support-qr-menu-restaurant-cafe").then((m) => m.Entry)),
  "detailed-analytics-restaurant-qr-menu-website": dynamic(() => import("./entries/detailed-analytics-restaurant-qr-menu-website").then((m) => m.Entry)),
  "instant-qr-menu-restaurant-website-generator": dynamic(() => import("./entries/instant-qr-menu-restaurant-website-generator").then((m) => m.Entry)),
  "subscription-plans-qr-menu-restaurant-website": dynamic(() => import("./entries/subscription-plans-qr-menu-restaurant-website").then((m) => m.Entry)),
  "public-restaurant-qr-menu-website": dynamic(() => import("./entries/public-restaurant-qr-menu-website").then((m) => m.Entry)),
  "add-items-restaurant-qr-menu-website": dynamic(() => import("./entries/add-items-restaurant-qr-menu-website").then((m) => m.Entry)),
  "qr-menu-restaurant-categories": dynamic(() => import("./entries/qr-menu-restaurant-categories").then((m) => m.Entry)),
  "easy-qr-menu-cafe-control-panel": dynamic(() => import("./entries/easy-qr-menu-cafe-control-panel").then((m) => m.Entry)),
  "faq-page-organization": dynamic(() => import("./entries/faq-page-organization").then((m) => m.Entry)),
  "free-restaurant-website-improvements": dynamic(() => import("./entries/free-restaurant-website-improvements").then((m) => m.Entry)),
  "user-authentication-interface": dynamic(() => import("./entries/user-authentication-interface").then((m) => m.Entry)),
};
