import { request } from "@playwright/test";
import { Client } from "pg";

// Reserved autotest email domain. The backend forces OTP "000000" and skips
// real emails for this domain in non-production (see auth.service.ts).
export const E2E_DOMAIN = "e2e.iqrest.test";

const BASE = () => process.env.BASE_URL || "http://localhost:8002";
const DB = () => process.env.E2E_DATABASE_URL as string;

export interface Provisioned {
  email: string;
  restaurantId: string;
  slug: string | null;
  cookies: Array<{
    name: string; value: string; domain: string; path: string;
    expires: number; httpOnly: boolean; secure: boolean;
    sameSite: "Strict" | "Lax" | "None";
  }>;
}

// Look up a restaurant's id + slug by the owner email (for the UI happy-path,
// which authenticates through the landing rather than provisioning directly).
export async function restaurantByEmail(email: string): Promise<{ id: string; slug: string | null }> {
  const db = new Client({ connectionString: DB() });
  await db.connect();
  try {
    const r = await db.query(
      `SELECT r.id, r.slug FROM restaurants r
         JOIN restaurant_users ru ON ru."restaurantId" = r.id
         JOIN users u ON u.id = ru."userId"
        WHERE u.email = $1
        ORDER BY r."createdAt" DESC LIMIT 1`,
      [email],
    );
    if (!r.rows.length) throw new Error(`no restaurant for ${email}`);
    return { id: r.rows[0].id, slug: r.rows[0].slug };
  } finally {
    await db.end();
  }
}

// Hard-delete every autotest restaurant (owner email on the reserved
// `@e2e.iqrest.test` domain) and ALL its data, then the autotest users. Used by
// global-setup (tidy leftovers before a run) and global-teardown (remove what
// the run just created). Nothing outside the reserved domain is touched.
//
// Most child tables cascade on `restaurants` delete (tables, orders, categories,
// items, reservations, devices→pairing_codes, page_views, support_messages,
// restaurant_users). Analytics tables (usage_events, capi_sends, …) carry a
// plain `restaurantId` with NO foreign key, so they don't cascade — we clear
// every table that has a `restaurantId` column explicitly first, then delete the
// restaurant rows (cascading the rest), then the users (cascading sessions).
export async function purgeAutotestData(dbUrl: string): Promise<number> {
  const db = new Client({ connectionString: dbUrl });
  await db.connect();
  try {
    const like = `%@${E2E_DOMAIN}`;
    const r = await db.query(
      `SELECT DISTINCT r.id FROM restaurants r
         JOIN restaurant_users ru ON ru."restaurantId" = r.id
         JOIN users u ON u.id = ru."userId"
        WHERE u.email LIKE $1`,
      [like],
    );
    const ids: string[] = r.rows.map((x: { id: string }) => x.id);
    if (ids.length) {
      const cols = await db.query(
        `SELECT table_name FROM information_schema.columns
          WHERE column_name = 'restaurantId' AND table_schema = 'public'`,
      );
      // Every restaurantId-bearing table. Inter-child FKs are all Cascade/SetNull
      // (reservations→tables, items→categories, …), so deletion order is safe.
      for (const row of cols.rows as Array<{ table_name: string }>) {
        await db.query(`DELETE FROM "${row.table_name}" WHERE "restaurantId" = ANY($1::text[])`, [ids]);
      }
      await db.query(`DELETE FROM restaurants WHERE id = ANY($1::text[])`, [ids]);
    }
    // Sessions cascade on user delete.
    await db.query(`DELETE FROM users WHERE email LIKE $1`, [like]);
    return ids.length;
  } finally {
    await db.end();
  }
}

// Hard-delete all categories + items for a restaurant (e.g. wipe the demo menu
// before building from scratch).
export async function clearMenu(restaurantId: string): Promise<void> {
  const db = new Client({ connectionString: DB() });
  await db.connect();
  try {
    await db.query(`DELETE FROM items WHERE "restaurantId" = $1`, [restaurantId]);
    await db.query(`DELETE FROM categories WHERE "restaurantId" = $1`, [restaurantId]);
  } finally {
    await db.end();
  }
}

// Create a brand-new restaurant via REAL onboarding (send-otp → verify-otp with
// the fixed autotest OTP), optionally seed the demo menu (which enables es +
// ships translations). Returns the auth cookies for the test's browser context.
export async function provisionRestaurant(opts: { demo?: boolean } = {}): Promise<Provisioned> {
  const email = `e2e+${Date.now()}-${Math.random().toString(36).slice(2, 8)}@${E2E_DOMAIN}`;
  const ctx = await request.newContext({ baseURL: BASE() });

  const send = await ctx.post("/api/auth/send-otp", {
    data: { email, locale: "en", signupContext: { restaurantName: "E2E Bistro" } },
  });
  if (!send.ok()) throw new Error(`send-otp failed: ${send.status()} ${await send.text()}`);

  const verify = await ctx.post("/api/auth/verify-otp", { data: { email, code: "000000" } });
  if (!verify.ok()) throw new Error(`verify-otp failed: ${verify.status()} ${await verify.text()}`);

  const db = new Client({ connectionString: DB() });
  await db.connect();
  let restaurantId: string;
  let slug: string | null;
  try {
    const r = await db.query(
      `SELECT r.id, r.slug FROM restaurants r
         JOIN restaurant_users ru ON ru."restaurantId" = r.id
         JOIN users u ON u.id = ru."userId"
        WHERE u.email = $1
        ORDER BY r."createdAt" DESC LIMIT 1`,
      [email],
    );
    if (!r.rows.length) throw new Error("no restaurant seeded for e2e account");
    restaurantId = r.rows[0].id;
    slug = r.rows[0].slug;
    // Default English + Spanish as the second language, onboarding modals done
    // (they overlay the menu and block clicks otherwise).
    await db.query(
      `UPDATE restaurants
          SET "onboardingNameDone" = true, "onboardingFillDone" = true,
              "defaultLanguage" = 'en', languages = ARRAY['en','es']
        WHERE id = $1`,
      [restaurantId],
    );
  } finally {
    await db.end();
  }

  if (opts.demo) {
    // Seeds a demo menu with categories/items + translations and re-sets
    // languages to [en, es]. Uses the session cookie already on ctx.
    const fill = await ctx.post("/api/onboarding/fill-demo");
    if (!fill.ok()) throw new Error(`fill-demo failed: ${fill.status()} ${await fill.text()}`);
  }

  const state = await ctx.storageState();
  await ctx.dispose();

  // Also carry the active-restaurant cookie so the SPA sends X-Restaurant-Id.
  const cookies = [
    ...state.cookies,
    {
      name: "iqr_active_restaurant_id", value: restaurantId,
      domain: "localhost", path: "/",
      expires: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
      httpOnly: false, secure: false, sameSite: "Lax" as const,
    },
  ];
  return { email, restaurantId, slug, cookies };
}
