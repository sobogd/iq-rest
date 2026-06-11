#!/usr/bin/env node
// Generate per-app .env files from the unified root .env (single source of truth).
// Run automatically by scripts/dev.sh before starting the services.
// All local wiring is localhost-based — no iq-rest.com hardcode anywhere.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseEnv(text) {
  const out = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1);
    // strip a single layer of surrounding quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const E = parseEnv(readFileSync(join(ROOT, ".env"), "utf8"));

// Helper: quote values that contain characters dotenv/next might choke on.
const q = (v = "") => (/[\s#"']/.test(v) ? `"${v.replace(/"/g, '\\"')}"` : v);

function write(appPath, vars, file = ".env") {
  const body =
    Object.entries(vars)
      .map(([k, v]) => `${k}=${q(v ?? "")}`)
      .join("\n") + "\n";
  const target = join(ROOT, "apps", appPath, file);
  writeFileSync(target, body, { mode: 0o600 });
  console.log(`  wrote apps/${appPath}/${file} (${Object.keys(vars).length} vars)`);
}

const localhost = (port) => `http://localhost:${port}`;

// ----------------------------- dashboard-api -----------------------------
write("dashboard-api", {
  PORT: E.DASHBOARD_API_PORT,
  NODE_ENV: "development",
  DATABASE_URL: E.DATABASE_URL,
  JWT_SECRET: E.JWT_SECRET,
  JWT_EXPIRES_IN: E.JWT_EXPIRES_IN,
  COOKIE_NAME: E.COOKIE_NAME,
  COOKIE_DOMAIN: "", // empty => host-only cookie on localhost (required for local auth)
  COOKIE_SECURE: "false",
  ANALYTICS_COOKIE_DOMAIN: "",
  CORS_ORIGINS: [
    localhost(E.DASHBOARD_WEB_PORT),
    localhost(E.LANDING_PORT),
    localhost(E.PUBLIC_MENU_PORT),
  ].join(","),
  GOOGLE_CLIENT_ID: E.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: E.GOOGLE_CLIENT_SECRET,
  SMTP_HOST: E.SMTP_HOST,
  SMTP_PORT: E.SMTP_PORT,
  SMTP_USER: E.SMTP_USER,
  SMTP_PASS: E.SMTP_PASS,
  FROM_EMAIL: E.FROM_EMAIL,
  S3_HOST: E.S3_HOST,
  S3_KEY: E.S3_KEY,
  S3_TOKEN: E.S3_TOKEN,
  S3_NAME: E.S3_NAME,
  S3_REGION: E.S3_REGION,
  GEMINI_API_KEY: E.GEMINI_API_KEY,
  STRIPE_SECRET_KEY: E.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: E.STRIPE_WEBHOOK_SECRET,
  APP_URL: E.DASHBOARD_URL,
  LANDING_URL: E.LANDING_URL,
  DASHBOARD_URL: E.DASHBOARD_URL,
  API_PUBLIC_URL: E.DASHBOARD_API_URL,
  PUBLIC_MENU_URL: E.PUBLIC_MENU_URL,
  ADMIN_EMAIL_DOMAIN: E.ADMIN_EMAIL_DOMAIN,
  GOOGLE_ADS_CLIENT_ID: E.GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET: E.GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN: E.GOOGLE_ADS_REFRESH_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID: E.GOOGLE_ADS_CUSTOMER_ID,
  GOOGLE_ADS_DEVELOPER_TOKEN: E.GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CONVERSION_ACTION_ID: E.GOOGLE_ADS_CONVERSION_ACTION_ID,
  GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS: E.GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS,
  GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION: E.GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION,
  GOOGLE_ADS_LOGIN_CUSTOMER_ID: E.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  FB_ADS_TOKEN: E.FB_ADS_TOKEN,
  FB_ADS_PIXEL_ID: E.FB_ADS_PIXEL_ID,
  META_DEVELOPER_TOKEN: E.META_DEVELOPER_TOKEN,
  META_APP_SECRET: E.META_APP_SECRET,
  WHATSAPP_TOKEN: E.WHATSAPP_TOKEN,
  WHATSAPP_PHONE_NUMBER_ID: E.WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_VERIFY_TOKEN: E.WHATSAPP_VERIFY_TOKEN,
  WHATSAPP_APP_SECRET: E.WHATSAPP_APP_SECRET,
  WHATSAPP_APP_ID: E.WHATSAPP_APP_ID,
});

// --------------------------- public-menu-api ----------------------------
write("public-menu-api", {
  PORT: E.PUBLIC_MENU_API_PORT,
  NODE_ENV: "development",
  DATABASE_URL: E.DATABASE_URL,
  CORS_ORIGINS: localhost(E.PUBLIC_MENU_PORT),
  CORS_PATTERN: "^https?://([a-z0-9-]+\\.)?iq-rest\\.com(:\\d+)?$",
  SMTP_HOST: E.SMTP_HOST,
  SMTP_PORT: E.SMTP_PORT,
  SMTP_USER: E.SMTP_USER,
  SMTP_PASS: E.SMTP_PASS,
  FROM_EMAIL: E.FROM_EMAIL,
  DASHBOARD_URL: E.DASHBOARD_URL,
});

// ---------------------------- dashboard-web -----------------------------
write("dashboard-web", {
  VITE_APP_URL: E.DASHBOARD_URL,
  VITE_LANDING_URL: E.LANDING_URL,
  VITE_PUBLIC_MENU_URL: E.PUBLIC_MENU_URL,
  VITE_API_URL: "", // empty => SPA uses the Vite dev proxy at /api
  VITE_DEV_API_PROXY: E.DASHBOARD_API_URL,
  VITE_ADMIN_EMAIL_DOMAIN: E.ADMIN_EMAIL_DOMAIN,
  VITE_GOOGLE_MAPS_API_KEY: E.GOOGLE_MAPS_API_KEY,
  VITE_OPTIONS_ENABLED: E.VITE_OPTIONS_ENABLED,
});

// ----------------------------- public-menu ------------------------------
write("public-menu", {
  VITE_DEV_API_PROXY: E.PUBLIC_MENU_API_URL,
});

// ------------------------------- landing --------------------------------
write("landing", {
  NODE_ENV: "development",
  DATABASE_URL: E.DATABASE_URL,
  SMTP_HOST: E.SMTP_HOST,
  SMTP_PORT: E.SMTP_PORT,
  SMTP_USER: E.SMTP_USER,
  SMTP_PASS: E.SMTP_PASS,
  FROM_EMAIL: E.FROM_EMAIL,
  TO_EMAIL: E.TO_EMAIL,
  S3_HOST: E.S3_HOST,
  S3_KEY: E.S3_KEY,
  S3_TOKEN: E.S3_TOKEN,
  S3_NAME: E.S3_NAME,
  S3_REGION: E.S3_REGION,
  NEXT_PUBLIC_MAPS_API_KEY: E.GOOGLE_MAPS_API_KEY,
  STRIPE_SECRET_KEY: E.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: E.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_APP_URL: E.LANDING_URL,
  GEMINI_API_KEY: E.GEMINI_API_KEY,
  GOOGLE_ADS_CLIENT_ID: E.GOOGLE_ADS_CLIENT_ID,
  GOOGLE_ADS_CLIENT_SECRET: E.GOOGLE_ADS_CLIENT_SECRET,
  GOOGLE_ADS_REFRESH_TOKEN: E.GOOGLE_ADS_REFRESH_TOKEN,
  GOOGLE_ADS_CUSTOMER_ID: E.GOOGLE_ADS_CUSTOMER_ID,
  GOOGLE_ADS_DEVELOPER_TOKEN: E.GOOGLE_ADS_DEVELOPER_TOKEN,
  GOOGLE_ADS_CONVERSION_ACTION_ID: E.GOOGLE_ADS_CONVERSION_ACTION_ID,
  GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS: E.GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS,
  GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION: E.GOOGLE_ADS_CONVERSION_ACTION_ID_SUBSCRIPTION,
  GOOGLE_ADS_LOGIN_CUSTOMER_ID: E.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  TURNSTILE_SECRET_KEY: E.TURNSTILE_SECRET_KEY,
});
write(
  "landing",
  {
    NEXT_PUBLIC_DASHBOARD_API_BASE: E.DASHBOARD_API_URL,
    NEXT_PUBLIC_DASHBOARD_BASE: E.DASHBOARD_URL,
  },
  ".env.local"
);

console.log("==> Per-app .env files generated from root .env");
