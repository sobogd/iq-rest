// Runs once after the happy-path (even on failure). Deletes the autotest
// restaurant the run created plus everything linked to it (tables, orders,
// bookings, categories, items, devices, analytics rows) and the autotest user.
// Only `@e2e.iqrest.test` accounts are touched — see purgeAutotestData.
import type { FullConfig } from "@playwright/test";
import { purgeAutotestData } from "./provision";

export default async function globalTeardown(_config: FullConfig) {
  const dbUrl = process.env.E2E_DATABASE_URL;
  if (!dbUrl) return;
  const n = await purgeAutotestData(dbUrl);
  // eslint-disable-next-line no-console
  console.log(`[global-teardown] removed ${n} autotest restaurant(s) + linked data`);
}
