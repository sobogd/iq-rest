// Runs once before the happy-path. Fails fast if the LOCAL dev stack is down,
// then removes any leftover autotest data from a previous run so the DB is tidy.
// Nothing but `@e2e.iqrest.test` accounts are ever touched (see purgeAutotestData).
import { request, type FullConfig } from "@playwright/test";
import { purgeAutotestData } from "./provision";

async function waitForApi(base: string) {
  const ctx = await request.newContext({ baseURL: base });
  for (let i = 0; i < 30; i++) {
    try {
      const r = await ctx.get("/api/health");
      if (r.ok()) { await ctx.dispose(); return; }
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  await ctx.dispose();
  throw new Error(`API not reachable via ${base}/api/health — is the local stack up? (cd iq-rest && ./scripts/dev.sh)`);
}

export default async function globalSetup(_config: FullConfig) {
  const base = process.env.BASE_URL || "http://localhost:8002";
  const dbUrl = process.env.E2E_DATABASE_URL;
  if (!dbUrl) throw new Error("E2E_DATABASE_URL not set (resolved from apps/dashboard-api/.env in playwright.config.ts)");
  await waitForApi(base);
  const n = await purgeAutotestData(dbUrl);
  // eslint-disable-next-line no-console
  console.log(`[global-setup] stack healthy; purged ${n} leftover autotest restaurant(s)`);
}
