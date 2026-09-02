// PM2 ecosystem for the iq-rest monorepo — local dev.
// Ports + URLs come from the unified root .env (single source of truth).
// Start via:  ./scripts/dev.sh   (regenerates per-app .env, kills ports, starts all 5)

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const ROOT = __dirname;
const E = process.env;

// translator is a separate repo/product (not part of this monorepo) — its own
// port and env, not sourced from the iq-rest root .env. Loaded explicitly
// (rather than relying on Next's own .env.local pickup) because the pm2
// daemon inherits DATABASE_URL from the shell that first started it (set for
// the iq-rest apps), and an already-set process.env var wins over .env.local.
const TRANSLATOR_PORT = 8010;
const TRANSLATOR_DIR = path.join(ROOT, "..", "translator");
const TRANSLATOR_ENV = require("dotenv").parse(
  require("fs").readFileSync(path.join(TRANSLATOR_DIR, ".env.local")),
);

const base = {
  script: "npm",
  args: "run dev",
  autorestart: true,
  watch: false, // each service runs its own watch/HMR
  max_restarts: 5,
  min_uptime: "10s",
  kill_timeout: 5000,
  merge_logs: true,
  time: true,
};

module.exports = {
  apps: [
    {
      ...base,
      name: "dashboard-api",
      cwd: `${ROOT}/apps/dashboard-api`,
      env: { PORT: E.DASHBOARD_API_PORT },
    },
    {
      ...base,
      name: "public-menu-api",
      cwd: `${ROOT}/apps/public-menu-api`,
      env: { PORT: E.PUBLIC_MENU_API_PORT },
    },
    {
      ...base,
      name: "dashboard-web",
      cwd: `${ROOT}/apps/dashboard-web`,
      args: `run dev -- --port ${E.DASHBOARD_WEB_PORT} --host`,
      // vite.config reads VITE_DEV_API_PROXY from process.env at eval time
      env: { VITE_DEV_API_PROXY: E.DASHBOARD_API_URL },
    },
    {
      ...base,
      name: "public-menu",
      cwd: `${ROOT}/apps/public-menu`,
      args: `run dev -- --port ${E.PUBLIC_MENU_PORT} --host`,
      env: { VITE_DEV_API_PROXY: E.PUBLIC_MENU_API_URL },
    },
    {
      ...base,
      name: "landing",
      cwd: `${ROOT}/apps/landing`,
      args: `run dev -- -p ${E.LANDING_PORT}`,
    },
    {
      ...base,
      name: "translator",
      cwd: TRANSLATOR_DIR,
      args: `run dev -- -p ${TRANSLATOR_PORT}`,
      env: { ...TRANSLATOR_ENV, PORT: String(TRANSLATOR_PORT) },
    },
  ],
};
