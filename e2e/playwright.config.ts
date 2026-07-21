import { defineConfig, devices } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

// ── Local-stack config ──────────────────────────────────────────────────────
// The happy-path runs against the LOCAL dev stack (`./scripts/dev.sh`, ports
// 8001-8005, local Postgres) — no Docker. Resolve the defaults here (module
// scope runs in every worker) so `npm test` just works with the stack up.
//
// DB URL comes from apps/dashboard-api/.env (DATABASE_URL) unless E2E_DATABASE_URL
// is already set. Ports default to the dev-stack layout.
function readEnvVar(file: string, key: string): string | undefined {
  try {
    const txt = fs.readFileSync(file, "utf8");
    const m = txt.match(new RegExp(`^${key}=(.*)$`, "m"));
    if (!m) return undefined;
    return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

const dbFromEnv = readEnvVar(path.resolve(__dirname, "../apps/dashboard-api/.env"), "DATABASE_URL");
process.env.E2E_DATABASE_URL ||= dbFromEnv || "postgresql://postgres:postgres@localhost:5432/iq_rest";
process.env.BASE_URL ||= "http://localhost:8002"; // dashboard-web (Vite SPA)
process.env.LANDING_URL ||= "http://localhost:8001"; // landing (Next)
process.env.PUBLIC_MENU_URL ||= "http://localhost:8005"; // public-menu (Vite SPA)

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./global-setup.ts",
  // Removes the autotest restaurant + all its data after the run (also cleaned
  // at the start of the next run by global-setup).
  globalTeardown: "./global-teardown.ts",
  workers: 1,
  fullyParallel: false,
  forbidOnly: true,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  // One long happy-path (real backend + real Gemini). It sets its own timeout
  // and disables retries (a retry would reuse dirty DB state).
  projects: [
    {
      name: "happy-path",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
