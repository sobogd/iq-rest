import { type Page, expect } from "@playwright/test";

// Shared menu-flow actions. All specs share one seeded test restaurant (global
// setup resets its menu once per run), so use UNIQUE names per test to stay
// order-independent.

export async function gotoMenu(page: Page) {
  await page.goto("/en/dashboard");
  await expect(page.getByTestId("menu-add")).toBeVisible();
}

export async function createCategory(page: Page, name: string, group?: string) {
  await page.getByTestId("menu-add").click();
  await page.getByTestId("menu-add-category").click();
  await page.locator("#cat-name").fill(name);
  // Optionally nest under a group (the parent picker only renders when groups exist).
  if (group) {
    await page.locator("#cat-parent").click();
    await page.getByRole("button", { name: group }).first().click();
  }
  await page.getByTestId("form-save").click();
  await expect(page.getByTestId("menu-add")).toBeVisible();
  await expect(page.getByText(name, { exact: false }).first()).toBeVisible();
}

export async function createGroup(page: Page, name: string) {
  await page.getByTestId("menu-add").click();
  await page.getByTestId("menu-add-group").click();
  await page.locator("#cat-name").fill(name);
  await page.getByTestId("form-save").click();
  await expect(page.getByTestId("menu-add")).toBeVisible();
  await expect(page.getByText(name, { exact: false }).first()).toBeVisible();
}

// Create a dish. Requires at least one leaf category to exist; picks `category`
// explicitly in the form (a new dish carries no category by default).
export async function createDish(
  page: Page,
  opts: { name: string; price?: string; category: string },
) {
  await page.getByTestId("menu-add").click();
  await page.getByTestId("menu-add-dish").click();
  await page.locator("#dish-name").fill(opts.name);
  if (opts.price !== undefined) await page.locator("#dish-price").fill(opts.price);
  await page.locator("#dish-category").click();
  // .first(): a retried test can leave a duplicate same-named category in the
  // shared DB — either instance is a valid pick.
  await page.getByRole("button", { name: opts.category }).first().click();
  await page.getByTestId("form-save").click();
  await expect(page.getByTestId("menu-add")).toBeVisible();
  await expect(page.getByText(opts.name, { exact: false }).first()).toBeVisible();
}

// Open a category/dish editor by clicking its row (the whole row is a button).
export async function openRow(page: Page, name: string) {
  await page.getByText(name, { exact: false }).first().click();
}

// ── Dish options (variant groups) ──
//
// Add ONE variant group to a dish whose form is already open. `required` flips
// the "Guest must make a choice" toggle (opt-required); `multi` flips "Guest can
// choose several variants" (opt-multi). Each variant is name + optional extra
// charge (priceDelta). Leaves the dish form open (option-save returns to it).
export interface OptionSpec {
  name: string;
  required?: boolean;
  multi?: boolean;
  variants: Array<{ name: string; price?: string }>;
}

export async function addDishOption(page: Page, opt: OptionSpec) {
  await page.getByTestId("option-add").click();
  await expect(page.locator("#opt-name")).toBeVisible();
  await page.locator("#opt-name").fill(opt.name);
  if (opt.required) await page.getByTestId("opt-required").click();
  if (opt.multi) await page.getByTestId("opt-multi").click();
  for (const v of opt.variants) {
    await page.getByTestId("variant-add").click();
    await page.locator("#vf-new").fill(v.name);
    if (v.price) await page.getByTestId("variant-price").fill(v.price);
    await page.getByTestId("variant-save").click();
  }
  await expect(page.getByTestId("variant-row")).toHaveCount(opt.variants.length);
  await page.getByTestId("option-save").click();
  // The option form reuses one React instance for every "new" group (key="new"),
  // so it MUST fully unmount before the next option-add or its variants/required
  // leak into the next group. Wait for the form to close (name field gone).
  await expect(page.locator("#opt-name")).toBeHidden();
  // Back on the dish form — the new group shows as an option-row.
  await expect(page.getByTestId("option-row").filter({ hasText: opt.name })).toBeVisible();
}

// Create a dish with a description (the guest-facing "comment") and any number
// of option groups (required and/or optional) — all in the first build pass, so
// the order flow later has both an obligatory choice and optional extras.
export async function createDishFull(
  page: Page,
  opts: {
    name: string;
    price: string;
    category: string;
    description?: string;
    options?: OptionSpec[];
  },
) {
  await page.getByTestId("menu-add").click();
  await page.getByTestId("menu-add-dish").click();
  await expect(page.locator("#dish-name")).toBeVisible();
  await page.locator("#dish-name").fill(opts.name);
  await page.locator("#dish-price").fill(opts.price);
  if (opts.description) await page.locator("#dish-desc").fill(opts.description);
  await page.locator("#dish-category").click();
  await page.getByRole("button", { name: opts.category }).first().click();
  for (const o of opts.options ?? []) await addDishOption(page, o);
  await page.getByTestId("form-save").click();
  // Saving a dish with options + description also fires auto-translation
  // (a blocking overlay); give the return to the menu extra headroom.
  await expect(page.getByTestId("menu-add")).toBeVisible({ timeout: 45_000 });
  await expect(page.getByText(opts.name, { exact: false }).first()).toBeVisible();
}

// ── Tables (floor plan) ──
//
// Create one table via the real form on the tables settings page. Number
// auto-increments; we set seats (stepper), shape (select), zone name (input)
// and colour (swatch, aria-label = hex). Saves via the header (form-save),
// which clears the selection back to the placeholder.
export async function createTable(
  page: Page,
  opts: {
    number: number; // the auto-assigned table number (1-based, in creation order)
    seats: number;
    shape: string;
    name: string;
    color: string;
    // Where to drop the table on the floor map (0..1 of width/height). New
    // tables all spawn at the centre, so distinct positions keep them from
    // overlapping — otherwise their markers stack and can't be clicked later.
    pos: { x: number; y: number };
  },
) {
  // Either the empty-state button (first table) or the header button.
  const addBtn = page.getByTestId("table-add-empty").or(page.getByTestId("table-add"));
  await addBtn.first().click();
  await expect(page.getByTestId("table-name")).toBeVisible();
  await page.getByTestId("table-name").fill(opts.name);
  // Shape select (same custom-Select pattern as #dish-category).
  await page.locator("#table-shape").click();
  await page.getByRole("button", { name: opts.shape, exact: true }).first().click();
  // Seats: step from the current value to the target.
  const cur = parseInt((await page.getByTestId("table-seats-value").innerText()).trim(), 10) || 2;
  for (let i = cur; i < opts.seats; i++) await page.getByTestId("table-seats-inc").click();
  for (let i = cur; i > opts.seats; i--) await page.getByTestId("table-seats-dec").click();
  await expect(page.getByTestId("table-seats-value")).toHaveText(String(opts.seats));
  // Colour swatch — aria-label is the hex value.
  await page.getByRole("button", { name: opts.color, exact: true }).click();
  // Drag the (selected, draggable) marker to its spot so tables don't pile up.
  await dragTableTo(page, opts.number, opts.pos.x, opts.pos.y);
  await page.getByTestId("form-save").click();
}

// Press Escape until no modal dialog is open (each Modal closes on Escape).
export async function closeDialogs(page: Page) {
  for (let i = 0; i < 4; i++) {
    if (await page.getByRole("dialog").first().isVisible().catch(() => false)) {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
    } else break;
  }
}

// Drag a selected table's floor-map marker to (tx, ty) as a fraction of the map.
export async function dragTableTo(page: Page, number: number, tx: number, ty: number) {
  const map = page.locator(".floor-map").first();
  const mapBox = await map.boundingBox();
  const marker = page.getByTestId("floor-table-" + number);
  const mb = await marker.boundingBox();
  if (!mapBox || !mb) throw new Error("floor map / marker not measurable");
  await page.mouse.move(mb.x + mb.width / 2, mb.y + mb.height / 2);
  await page.mouse.down();
  // A couple of intermediate steps so the drag registers as a move (not a tap).
  await page.mouse.move(mapBox.x + mapBox.width * tx, mapBox.y + mapBox.height * ty, { steps: 10 });
  await page.mouse.up();
}

// ── Order flow (add one dish through the wizard) ──
//
// Assumes the add-item wizard modal is already open (Start/New order or the
// order's "Dish" button). Walks group → category → dish, then the option
// substeps: a required single-select is picked by variant name; optional
// "extras" get their quantity bumped; finally an optional note, then Add.
export async function orderAddDish(
  page: Page,
  opts: {
    group?: string;
    category: string;
    dish: string;
    requiredPick?: string; // variant name for a required single-select group
    extra?: { name: string; times?: number }; // optional extra to +qty
    notes?: string;
  },
) {
  if (opts.group && (await page.getByTestId("wiz-group").first().isVisible().catch(() => false))) {
    await page.getByTestId("wiz-group").filter({ hasText: opts.group }).first().click();
  }
  await page.getByTestId("wiz-category").filter({ hasText: opts.category }).first().click();
  await page.getByTestId("wiz-dish").filter({ hasText: opts.dish }).first().click();
  // Required single-select group → clicking the variant auto-advances.
  if (opts.requiredPick) {
    await page.getByTestId("wiz-variant").filter({ hasText: opts.requiredPick }).first().click();
  }
  await wizardFinish(page, { extra: opts.extra, notes: opts.notes });
}

// Advance the dish wizard from wherever it is (after any required picks) through
// every optional "extras" substep to the notes step, then Add/Save. Bumps one
// named extra's quantity if asked. Robust to dishes that have extra groups but
// no requested bump (just Continues past them) — also used by the edit flow,
// which re-enters the wizard at the first substep.
export async function wizardFinish(
  page: Page,
  opts: { extra?: { name: string; times?: number }; notes?: string },
) {
  if (opts.extra) {
    const row = page.getByTestId("wiz-extra-row").filter({ hasText: opts.extra.name });
    if (await row.first().isVisible().catch(() => false)) {
      for (let i = 0; i < (opts.extra.times ?? 1); i++) {
        await row.first().getByRole("button", { name: "Increase" }).click();
      }
    }
  }
  // Click Continue through any extras substeps until the notes field appears.
  for (let guard = 0; guard < 6; guard++) {
    if (await page.locator("#item-notes").isVisible().catch(() => false)) break;
    const cont = page.getByTestId("wiz-continue");
    if (await cont.isVisible().catch(() => false)) {
      await cont.click();
      continue;
    }
    break;
  }
  if (opts.notes) {
    await expect(page.locator("#item-notes")).toBeVisible();
    await page.locator("#item-notes").fill(opts.notes);
  }
  await page.getByTestId("wiz-add").click();
}
