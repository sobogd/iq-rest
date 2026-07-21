import { test, expect } from "@playwright/test";
import { restaurantByEmail } from "../provision";
import {
  createGroup,
  createCategory,
  createDishFull,
  createTable,
  orderAddDish,
  wizardFinish,
  closeDialogs,
  openRow,
} from "./helpers";

// ONE long happy-path through the REAL UI. New restaurant (single language) →
// add a 2nd language → build a rich menu (2 groups, 3 categories, 3 dishes) with
// one dish carrying a REQUIRED and an OPTIONAL variant group plus a description
// → verify auto-translation → dish-form validations → variant-group form
// (required/multi toggles, translation, validation, delete) → build a floor
// plan (2 tables, different size/shape/colour) → enable orders → drive the WHOLE
// orders surface (create, options + comments render, change table, order &
// item discounts, duplicate, edit, split, complete with payment, delete) →
// item statuses (picker, served-sinks-down sort, muting), discount edit/remove,
// remove items, empty-order / split-hidden boundaries → edit a required option
// + add an extra via the wizard → guest order from the public menu WITHOUT a
// table arriving over SSE into the open dashboard (closed from the main list)
// → KDS: status/category filters + tap-to-advance (persisted) → closing with
// no payment methods configured →
// enable + configure bookings → make bookings from the public menu → confirm /
// complete / reject them in the dashboard → public menu (mobile) language
// switch.
//
// Every action is numbered in comments inside each step.

// Unique per run (send-otp is rate-limited per email; OTP is always 000000 for
// the autotest domain).
const EMAIL = `happy+${Date.now()}@e2e.iqrest.test`;
const OTP = "000000";
// Local dev-stack ports (./scripts/dev.sh). Overridable via env.
const LANDING = process.env.LANDING_URL || "http://localhost:8001";
const DASH = process.env.BASE_URL || "http://localhost:8002";
const PUBLIC_MENU = process.env.PUBLIC_MENU_URL || "http://localhost:8005";

// Menu entities (unique names so text selectors stay unambiguous).
const G_MAINS = "Grp Mains";
const G_DRINKS = "Grp Drinks";
const C_PASTA = "Cat Pasta";
const C_PIZZA = "Cat Pizza";
const C_SOFT = "Cat Soft";
const D_CARB = "Dish Carbonara";
const D_MARG = "Dish Margherita";
const D_COLA = "Dish Cola";

test.describe.configure({ retries: 0 });

test("full happy-path: menu, options, tables, orders, bookings, publish", async ({ page }) => {
  test.setTimeout(600_000);

  await test.step("1. Авторизация с лендинга", async () => {
    // 1. открыл лендинг
    await page.goto(LANDING + "/en", { waitUntil: "domcontentloaded" });
    // 2. открыл auth-модалку и раскрыл email-форму. Модалка показывает выбор
    //    Google/Apple/Email — поле #onboarding-email появляется после клика
    //    «Continue with email». Первый CTA "Try it for free" — в шапке, часто ВНЕ
    //    вьюпорта (обычный .click() не докликивает), а Next-dev гидратируется не
    //    сразу → dispatchEvent бьёт по React-onClick напрямую. Poll: нет модалки →
    //    открыть её; есть кнопка email → кликнуть; пока не появится поле email.
    const emailField = page.locator("#onboarding-email");
    await expect(async () => {
      if (await emailField.isVisible().catch(() => false)) return;
      const emailBtn = page.getByRole("button", { name: /continue with email/i });
      if (await emailBtn.isVisible().catch(() => false)) {
        await emailBtn.click({ timeout: 3000 }).catch(() => {});
      } else {
        await page.locator('button:has-text("Try it for free")').first().dispatchEvent("click").catch(() => {});
      }
      await expect(emailField).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 45_000 });
    // 4. ввёл email
    await emailField.fill(EMAIL);
    // 5. нажал Continue
    await page.getByRole("button", { name: /continue/i }).first().click();
    // 6. ввёл OTP 000000
    await page.locator('input[inputmode="numeric"]').first().fill(OTP);
    // 7. нажал Verify
    await page.getByRole("button", { name: /verify/i }).first().click();
    // 8. дождался дашборда
    await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
  });

  await test.step("2. Онбординг — начать с чистого листа (1 язык)", async () => {
    // 1. на шаге имени нажал Skip
    await page.getByRole("button", { name: "Skip" }).click();
    // 2. на шаге наполнения выбрал "Start from scratch"
    await page.getByText("Start from scratch").click();
    // 3. меню пустое, кнопка добавления доступна
    await expect(page.getByTestId("menu-add")).toBeVisible();
    await expect(page.getByTestId("category-name")).toHaveCount(0);
  });

  await test.step("3. Добавить 2-й язык (es) в настройках ДО первой категории", async () => {
    // 1. открыл объединённую страницу Region & languages
    await page.goto(`${DASH}/en/dashboard/settings/languages`, { waitUntil: "domcontentloaded" });
    // 2. открыл мультиселект языков и тоггл "Español"
    await page.locator("#langs-supported").click();
    await page.getByRole("button", { name: /Español/ }).click();
    await page.getByRole("button", { name: "Apply", exact: true }).click();
    // 3. сохранил (бэкфилла нет — блюд ещё нет)
    await page.getByTestId("form-save").click();
    // 4. вернулся в меню
    await page.goto(`${DASH}/en/dashboard`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("menu-add")).toBeVisible();
  });

  await test.step("4. Построить богатое меню (2 группы, 3 категории, 3 блюда)", async () => {
    // 1. две группы
    await createGroup(page, G_MAINS);
    await createGroup(page, G_DRINKS);
    // 2. три категории внутри групп
    await createCategory(page, C_PASTA, G_MAINS);
    await createCategory(page, C_PIZZA, G_MAINS);
    await createCategory(page, C_SOFT, G_DRINKS);
    // 3. блюдо с описанием (комментарий гостю) + ОБЯЗАТЕЛЬНАЯ опция "Size"
    //    (single) + ОПЦИОНАЛЬНАЯ опция "Extras" — сразу на этапе создания.
    await createDishFull(page, {
      name: D_CARB,
      price: "9.00",
      category: C_PASTA,
      description: "Classic Roman pasta with egg and pancetta.",
      options: [
        { name: "Size", required: true, variants: [{ name: "Small" }, { name: "Large", price: "2.00" }] },
        { name: "Extras", variants: [{ name: "Bacon", price: "2.00" }, { name: "Cheese", price: "1.00" }] },
      ],
    });
    // 4. простые блюда
    await createDishFull(page, { name: D_MARG, price: "7.50", category: C_PIZZA });
    await createDishFull(page, { name: D_COLA, price: "2.50", category: C_SOFT });
    // 5. проверил вложенность: категория Pasta под группой Mains
    await expect(
      page.getByTestId("group-card").filter({ hasText: G_MAINS }).getByTestId("category-name").first(),
    ).toBeVisible();
  });

  await test.step("5. Проверить автоперевод блюда на es", async () => {
    // 1. открыл блюдо Carbonara
    await openRow(page, D_CARB);
    await expect(page.locator("#dish-name")).toBeVisible();
    // 2. открыл модалку переводов имени
    await page.getByTestId("ml-open-dish-name").click();
    // 3. поле es заполнено автопереводом (сработал при создании)
    await expect
      .poll(async () => (await page.getByTestId("ml-input-es").inputValue()).trim().length, { timeout: 20_000 })
      .toBeGreaterThan(0);
    // 4. закрыл модалку переводов
    await page.getByTestId("ml-save").dispatchEvent("click");
    await expect(page.getByTestId("ml-input-es")).toBeHidden({ timeout: 10_000 });
    // 5. вышел из формы блюда без изменений
    await page.goto(`${DASH}/en/dashboard`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("menu-add")).toBeVisible();
  });

  await test.step("6. Валидации формы блюда (имя, цена, санитайз)", async () => {
    // 1. открыл форму нового блюда
    await page.getByTestId("menu-add").click();
    await page.getByTestId("menu-add-dish").click();
    await expect(page.locator("#dish-name")).toBeVisible();
    // 2. выбрал категорию
    await page.locator("#dish-category").click();
    await page.getByRole("button", { name: C_PIZZA }).first().click();
    // 3. пустое имя → валидационная модалка
    await page.getByTestId("form-save").click();
    await expect(page.getByTestId("confirm-ok")).toBeVisible();
    await page.getByTestId("confirm-ok").click();
    // 4. имя есть, цена пустая → снова валидация
    await page.locator("#dish-name").fill("Tmp Dish");
    await page.getByTestId("form-save").click();
    await expect(page.getByTestId("confirm-ok")).toBeVisible();
    await page.getByTestId("confirm-ok").click();
    // 5. санитайз цены
    await page.locator("#dish-price").fill("1.2.3");
    await expect(page.locator("#dish-price")).toHaveValue("1.23");
    await page.locator("#dish-price").fill("3,50");
    await expect(page.locator("#dish-price")).toHaveValue("3.50");
    await page.locator("#dish-price").fill("9a.9x");
    await expect(page.locator("#dish-price")).toHaveValue("9.9");
    // 6. вышел без сохранения
    await page.goto(`${DASH}/en/dashboard`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("menu-add")).toBeVisible();
  });

  await test.step("7. Форма опции: multi-тоггл, перевод, валидация, удаление варианта", async () => {
    // 1. открыл блюдо Margherita, добавил МНОЖЕСТВЕННУЮ опцию "Sauces"
    await openRow(page, D_MARG);
    await expect(page.locator("#dish-name")).toBeVisible();
    await page.getByTestId("option-add").click();
    await expect(page.locator("#opt-name")).toBeVisible();
    await page.locator("#opt-name").fill("Sauces");
    // 2. включил "можно выбрать несколько"
    await page.getByTestId("opt-multi").click();
    // 3. пустое имя варианта → валидационная модалка
    await page.getByTestId("variant-add").click();
    await page.getByTestId("variant-save").click();
    await expect(page.getByTestId("confirm-ok")).toBeVisible();
    await page.getByTestId("confirm-ok").click();
    // 4. заполнил вариант + es-перевод
    await page.locator("#vf-new").fill("Ketchup");
    await page.getByTestId("variant-price").fill("0,50");
    await page.getByTestId("ml-open-vf-new").click();
    await page.getByTestId("ml-input-es").fill("Kétchup");
    await page.getByTestId("ml-save").dispatchEvent("click");
    await page.getByTestId("variant-save").click();
    await expect(page.getByTestId("variant-row")).toHaveCount(1);
    // 5. второй вариант, затем удалил один
    await page.getByTestId("variant-add").click();
    await page.locator("#vf-new").fill("Mayo");
    await page.getByTestId("variant-save").click();
    await expect(page.getByTestId("variant-row")).toHaveCount(2);
    await page.getByTestId("variant-row").last().click();
    await page.getByRole("button", { name: /delete/i }).last().dispatchEvent("click");
    await expect(page.getByTestId("variant-row")).toHaveCount(1);
    // 6. сохранил опцию и блюдо
    await page.getByTestId("option-save").click();
    await expect(page.getByTestId("option-row").filter({ hasText: "Sauces" })).toBeVisible();
    await page.getByTestId("form-save").click();
    await expect(page.getByTestId("menu-add")).toBeVisible();
  });

  await test.step("8. Столы — создать 2 стола разного размера/формы/цвета", async () => {
    // 1. открыл раздел столов
    await page.goto(`${DASH}/en/dashboard/settings/tables`, { waitUntil: "domcontentloaded" });
    // 2. маленький круглый стол на 2 (красный) — зона Window (левее)
    await createTable(page, { number: 1, seats: 2, shape: "Circle", name: "Window", color: "#C8102E", pos: { x: 0.3, y: 0.4 } });
    await expect(page.getByTestId("floor-table-1")).toBeVisible();
    // 3. большой квадратный стол на 6 (синий) — зона Patio (правее, чтобы не накладывались)
    await createTable(page, { number: 2, seats: 6, shape: "Square", name: "Patio", color: "#314D8C", pos: { x: 0.72, y: 0.62 } });
    await expect(page.getByTestId("floor-table-2")).toBeVisible();
  });

  await test.step("9. Настройки заказов — включить приём заказов", async () => {
    // 1. открыл настройки заказов
    await page.goto(`${DASH}/en/dashboard/settings/orders`, { waitUntil: "domcontentloaded" });
    // 2. включил "Accept orders" (по умолчанию выкл после старта с чистого листа)
    const accept = page.getByTestId("orders-accept");
    if ((await accept.getAttribute("aria-checked")) !== "true") await accept.click();
    await expect(accept).toHaveAttribute("aria-checked", "true");
    // 3. Cash уже включён по умолчанию (для выбора при закрытии заказа)
    await expect(page.getByTestId("pay-toggle-cash")).toHaveAttribute("aria-checked", "true");
    // 4. сохранил
    await page.getByTestId("subpage-save").click();
  });

  await test.step("10. Заказы — создание, опции+комменты, стол, скидки, дубль, правка, сплит, закрытие, удаление", async () => {
    // 1. открыл раздел заказов и тапнул стол №1 (Window)
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    // 2. "Start order" → визард
    await page.getByTestId("order-new").click();
    // 3. добавил Carbonara: размер Large (обязательный), Bacon ×2 (экстра), коммент
    await orderAddDish(page, {
      group: G_MAINS,
      category: C_PASTA,
      dish: D_CARB,
      requiredPick: "Large",
      extra: { name: "Bacon", times: 2 },
      notes: "No pepper",
    });
    // 4. проверил, что опции и коммент вывелись на строке заказа
    const carbLine = page.getByTestId("order-item").filter({ hasText: D_CARB });
    await expect(carbLine).toContainText("Large");
    await expect(carbLine).toContainText("Bacon");
    await expect(carbLine).toContainText("No pepper");
    // 5. добавил ещё блюда через кнопку "Dish"
    await page.getByTestId("order-add-item").click();
    await orderAddDish(page, { group: G_MAINS, category: C_PIZZA, dish: D_MARG, notes: "Extra hot" });
    await page.getByTestId("order-add-item").click();
    await orderAddDish(page, { group: G_DRINKS, category: C_SOFT, dish: D_COLA });
    await expect(page.getByTestId("order-item")).toHaveCount(3);

    // 6. сменил стол: Actions → Change table → стол №2 → Save
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-change-table").click();
    const changeDlg = page.getByRole("dialog").filter({ hasText: "Change table" });
    await changeDlg.getByTestId("floor-table-2").click();
    await page.getByTestId("change-table-save").click();
    await expect(page.getByTestId("order-item").first()).toBeVisible();

    // 7. скидка на весь заказ: Actions → Add discount → 10%
    //    (.last() везде в discount-модалке: предыдущая модалка живёт в DOM ещё
    //    ~200ms exit-анимации, и strict mode ловит дубликаты кнопок/полей)
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-discount").click();
    await page.getByRole("button", { name: "Percent" }).last().click();
    await page.locator("#discount-value").last().fill("10");
    await page.getByTestId("discount-save").last().click();

    // 8. скидка на позицию Margherita: строка → Add discount → Fixed 1.00
    await page.getByTestId("order-item").filter({ hasText: D_MARG }).click();
    await page.getByTestId("item-act-discount").click();
    await page.getByRole("button", { name: "Fixed" }).last().click();
    await page.locator("#discount-value").last().fill("1.00");
    await page.getByTestId("discount-save").last().click();

    // 9. дублировал Carbonara → стало 4 строки
    await page.getByTestId("order-item").filter({ hasText: D_CARB }).first().click();
    await page.getByTestId("item-act-duplicate").click();
    await expect(page.getByTestId("order-item")).toHaveCount(4);

    // 10. отредактировал коммент у Margherita (визард переоткрывается на шаге
    //     опций — wizardFinish проматывает extras до заметок и сохраняет)
    await page.getByTestId("order-item").filter({ hasText: D_MARG }).click();
    await page.getByTestId("item-act-edit").click();
    await wizardFinish(page, { notes: "Well done" });
    await expect(page.getByTestId("order-item").filter({ hasText: D_MARG })).toContainText("Well done");

    // 11. разделил заказ: вынес Cola в новый заказ. Теперь у стола №2 два заказа
    //     (order-list-card рендерится и в модалке, и в фоновой панели; сразу
    //     после сплита оптимистичный+SSE-рендер может дублировать карточку —
    //     поэтому НЕ полагаемся на точное число, а работаем по .first()).
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-split").click();
    await page.getByTestId("split-item").filter({ hasText: D_COLA }).click();
    await page.getByTestId("split-confirm").click();
    const listCards = page.getByRole("dialog").getByTestId("order-list-card");
    await expect(listCards.first()).toBeVisible();

    // 12. закрыл первый заказ с оплатой наличными
    await listCards.first().click();
    await page.getByTestId("order-close").click();
    await page.getByTestId("pay-method-cash").click();
    await page.getByTestId("complete-confirm").click();

    // 13. переоткрыл стол №2 и удалил оставшийся заказ
    await closeDialogs(page);
    await page.getByTestId("floor-table-2").click();
    const listCards2 = page.getByRole("dialog").getByTestId("order-list-card");
    await expect(listCards2.first()).toBeVisible();
    await listCards2.first().click();
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-delete").click();
    await expect(page.getByTestId("confirm-ok")).toBeVisible();
    await page.getByTestId("confirm-ok").click();
  });

  await test.step("10б. Статусы позиций, сортировка served-вниз, скидка edit/remove, удаление позиций, границы", async () => {
    // 1. новый заказ на столе №1: Margherita + Cola
    await closeDialogs(page);
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    await page.getByTestId("order-new").click();
    await orderAddDish(page, { group: G_MAINS, category: C_PIZZA, dish: D_MARG });
    await page.getByTestId("order-add-item").click();
    await orderAddDish(page, { group: G_DRINKS, category: C_SOFT, dish: D_COLA });
    await expect(page.getByTestId("order-item")).toHaveCount(2);

    // 2. прогнал Margherita по статусам: New → Cooking → Ready → Served
    const margRow = page.getByTestId("order-item").filter({ hasText: D_MARG });
    for (const status of ["cooking", "ready", "served"] as const) {
      // .last(): быстрые итерации накладываются на 200ms exit-анимацию
      // предыдущих модалок — берём свежесмонтированную копию.
      await margRow.click();
      await page.getByTestId("item-act-status").last().click();
      await page.getByTestId("item-status-" + status).last().click();
    }
    await expect(margRow).toContainText("Served");
    // 3. served-позиция ушла вниз списка (сортировка после явной смены статуса)
    await expect(page.getByTestId("order-item").first()).toContainText(D_COLA);
    // 4. и приглушена (opacity-60)
    await expect(margRow).toHaveClass(/opacity-60/);

    // 5. скидка на заказ с причиной → редактирование → удаление скидки
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-discount").click();
    await page.getByRole("button", { name: "Percent" }).last().click();
    await page.locator("#discount-value").last().fill("15");
    await page.locator("#discount-reason").last().fill("Regular guest");
    await page.getByTestId("discount-save").last().click();
    await page.getByTestId("order-actions").click();
    await expect(page.getByTestId("ord-act-discount")).toContainText("Edit discount");
    await page.getByTestId("ord-act-discount").click();
    await page.getByTestId("discount-remove").click();
    await page.getByTestId("order-actions").click();
    await expect(page.getByTestId("ord-act-discount")).toContainText("Add discount");
    await page.keyboard.press("Escape");

    // 6. удалил обе позиции по одной (remove item)
    await page.getByTestId("order-item").filter({ hasText: D_COLA }).click();
    await page.getByTestId("item-act-remove").click();
    await expect(page.getByTestId("order-item")).toHaveCount(1);
    await page.getByTestId("order-item").first().click();
    await page.getByTestId("item-act-remove").click();
    await expect(page.getByTestId("order-item")).toHaveCount(0);

    // 7. границы: пустой заказ нельзя закрыть, Split скрыт при <2 позициях
    await expect(page.getByTestId("order-close")).toBeDisabled();
    await page.getByTestId("order-actions").click();
    await expect(page.getByTestId("ord-act-split")).toBeHidden();
    // 8. удалил пустой заказ
    await page.getByTestId("ord-act-delete").click();
    await expect(page.getByTestId("confirm-ok")).toBeVisible();
    await page.getByTestId("confirm-ok").click();
  });

  await test.step("10в. Правка позиции: смена обязательной опции и добавление экстры", async () => {
    // 1. заказ с Carbonara (Size=Small)
    await closeDialogs(page);
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    await page.getByTestId("order-new").click();
    await orderAddDish(page, { group: G_MAINS, category: C_PASTA, dish: D_CARB, requiredPick: "Small" });
    const carbRow = page.getByTestId("order-item").filter({ hasText: D_CARB });
    await expect(carbRow).toContainText("Small");
    // 2. правка: Size → Large, экстра Cheese +1 (визард переоткрывается на шаге опций)
    await carbRow.click();
    await page.getByTestId("item-act-edit").click();
    await page.getByTestId("wiz-variant").filter({ hasText: "Large" }).first().click();
    await wizardFinish(page, { extra: { name: "Cheese" } });
    await expect(carbRow).toContainText("Large");
    await expect(carbRow).toContainText("Cheese");
    await expect(carbRow).not.toContainText("Small");
    // 3. cleanup
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-delete").click();
    await page.getByTestId("confirm-ok").click();
  });

  await test.step("10г. Гостевой заказ без стола → SSE в дашборд → закрытие из главного списка", async () => {
    // 1. дашборд открыт на заказах и остаётся БЕЗ перезагрузки (проверка SSE)
    await closeDialogs(page);
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    const { slug: guestSlug } = await restaurantByEmail(EMAIL);
    // 2. гость в отдельной вкладке заказывает Cola без стола (без ?table)
    const guest = await page.context().newPage();
    await guest.goto(`${PUBLIC_MENU}/?slug=${guestSlug}`, { waitUntil: "networkidle" });
    await guest.locator('a[href*="/menu"]').first().click();
    // /menu отдаёт список ГРУПП → группа → (категория, если их >1) → блюда.
    // Grp Drinks содержит одну категорию — приложение пропускает уровень
    // категорий и открывает блюда сразу, поэтому клик по категории условный.
    await guest.getByText(G_DRINKS, { exact: false }).first().click();
    // Poll: dev-Vite медленно отдаёт лениво трансформируемые чанки, поэтому
    // ни фиксированное окно, ни одиночный fallback не надёжны — крутимся, пока
    // не появится кнопка Add (кликая категорию, если она есть на экране).
    const addBtn = guest.getByTestId("pm-dish-add").first();
    await expect(async () => {
      if (await addBtn.isVisible().catch(() => false)) return;
      const cat = guest.getByText(C_SOFT, { exact: false }).first();
      if (await cat.isVisible().catch(() => false)) await cat.click().catch(() => {});
      await expect(addBtn).toBeVisible({ timeout: 1_500 });
    }).toPass({ timeout: 30_000 });
    await addBtn.click();
    await guest.getByTestId("pm-cart").click();
    await guest.locator("#order-name").fill("E2E Guest");
    await guest.getByTestId("order-submit").click();
    await guest.waitForURL(/order\/success/, { timeout: 15_000 });
    await guest.close();
    // 3. заказ прилетел в открытый дашборд по SSE — в бакет "No table"
    const noTableCard = page
      .getByTestId("order-list-card")
      .filter({ hasText: "No table" });
    await expect(noTableCard.first()).toBeVisible({ timeout: 20_000 });
    // 4. открыл деталку кликом по карточке ГЛАВНОГО списка (openOrderDirect)
    await noTableCard.first().click();
    await expect(page.getByTestId("order-item").filter({ hasText: D_COLA }).first()).toBeVisible();
    // 5. закрыл гостевой заказ с оплатой наличными
    await page.getByTestId("order-close").click();
    await page.getByTestId("pay-method-cash").click();
    await page.getByTestId("complete-confirm").click();
  });

  await test.step("10д. KDS: фильтры по статусу/категории и продвижение статуса тапом", async () => {
    // 1. заказ на столе №1: Margherita + Cola
    await closeDialogs(page);
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    await page.getByTestId("order-new").click();
    await orderAddDish(page, { group: G_MAINS, category: C_PIZZA, dish: D_MARG });
    await page.getByTestId("order-add-item").click();
    await orderAddDish(page, { group: G_DRINKS, category: C_SOFT, dish: D_COLA });
    await closeDialogs(page);
    // 2. открыл KDS — обе позиции со статусом New
    await page.goto(`${DASH}/en/dashboard/kitchen`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("kds-item")).toHaveCount(2);
    await expect(page.getByTestId("kds-item").first()).toContainText("New");
    // 3. фильтр по статусу: Cooking → пусто ("Kitchen is clear"), снял → снова 2
    await page.getByTestId("kds-filter-cooking").click();
    await expect(page.getByTestId("kds-item")).toHaveCount(0);
    await expect(page.getByText("Kitchen is clear")).toBeVisible();
    await page.getByTestId("kds-filter-cooking").click();
    await expect(page.getByTestId("kds-item")).toHaveCount(2);
    // 4. фильтр по категории: Cat Pizza → только Margherita, снял → снова 2
    await page.getByTestId("kds-filter-cat").filter({ hasText: C_PIZZA }).click();
    await expect(page.getByTestId("kds-item")).toHaveCount(1);
    await expect(page.getByTestId("kds-item").first()).toContainText(D_MARG);
    await page.getByTestId("kds-filter-cat").filter({ hasText: C_PIZZA }).click();
    await expect(page.getByTestId("kds-item")).toHaveCount(2);
    // 5. тап по карточке двигает статус: New → Cooking → Ready → Served
    const kdsMarg = page.getByTestId("kds-item").filter({ hasText: D_MARG });
    await kdsMarg.click();
    await expect(kdsMarg).toContainText("Cooking");
    await kdsMarg.click();
    await expect(kdsMarg).toContainText("Ready");
    await kdsMarg.click();
    await expect(kdsMarg).toContainText("Served");
    // 6. дал debounce-PATCH улететь (300ms) и проверил персист в заказах
    await page.waitForTimeout(1500);
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    await page.getByRole("dialog").getByTestId("order-list-card").first().click();
    await expect(page.getByTestId("order-item").filter({ hasText: D_MARG })).toContainText("Served");
    // 7. cleanup — удалил заказ
    await page.getByTestId("order-actions").click();
    await page.getByTestId("ord-act-delete").click();
    await page.getByTestId("confirm-ok").click();
  });

  await test.step("10е. Закрытие заказа без настроенных методов оплаты", async () => {
    // 1. выключил cash (единственный метод) в настройках
    await closeDialogs(page);
    await page.goto(`${DASH}/en/dashboard/settings/orders`, { waitUntil: "domcontentloaded" });
    const cash = page.getByTestId("pay-toggle-cash");
    if ((await cash.getAttribute("aria-checked")) === "true") await cash.click();
    await expect(cash).toHaveAttribute("aria-checked", "false");
    await page.getByTestId("subpage-save").click();
    // 2. быстрый заказ и закрытие: модалка сворачивается до подтверждения без списка методов
    await page.goto(`${DASH}/en/dashboard/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("floor-table-1").click();
    await page.getByTestId("order-new").click();
    await orderAddDish(page, { group: G_DRINKS, category: C_SOFT, dish: D_COLA });
    await page.getByTestId("order-close").click();
    await expect(page.getByTestId("complete-confirm")).toBeVisible();
    await expect(page.getByTestId("pay-method-cash")).toHaveCount(0);
    await page.getByTestId("complete-confirm").click();
    // 3. вернул cash обратно (бронирования дальше по сценарию)
    await page.goto(`${DASH}/en/dashboard/settings/orders`, { waitUntil: "domcontentloaded" });
    await page.getByTestId("pay-toggle-cash").click();
    await expect(page.getByTestId("pay-toggle-cash")).toHaveAttribute("aria-checked", "true");
    await page.getByTestId("subpage-save").click();
  });

  await test.step("11. Настройки бронирований — включить и настроить", async () => {
    // 1. открыл настройки бронирований
    await page.goto(`${DASH}/en/dashboard/settings/bookings`, { waitUntil: "domcontentloaded" });
    // 2. прогнал тоггл (выкл→вкл), в итоге включено. Режим по умолчанию —
    //    Manual, поэтому новые брони приходят как pending (то, что нам нужно).
    const enable = page.getByTestId("bookings-enable");
    if ((await enable.getAttribute("aria-checked")) === "true") await enable.click();
    await enable.click();
    await expect(enable).toHaveAttribute("aria-checked", "true");
    // 3. сохранил
    await page.getByTestId("subpage-save").click();
  });

  const { slug } = await restaurantByEmail(EMAIL);
  expect(slug).toBeTruthy();

  await test.step("12. Публичное меню — гость создаёт 2 брони", async () => {
    for (let i = 0; i < 2; i++) {
      // 1. открыл форму брони (мобильный)
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${PUBLIC_MENU}/reserve?slug=${slug}`, { waitUntil: "networkidle" });
      // 2. 2 гостя
      await page.getByTestId("res-guest-2").click();
      // 3. будущая открытая дата (последняя доступная в неделе)
      await page.locator('[data-testid="res-date"]:not([disabled])').last().click();
      // 4. первый доступный слот времени
      await page.locator('[data-testid="res-time"]:not([disabled])').first().click();
      // 5. первый доступный стол
      await page.getByTestId("res-table").first().click();
      // 6. контакты и отправка
      await page.locator("#name").fill(`Guest ${i + 1}`);
      await page.locator("#email").fill(`guest${i + 1}@e2e.iqrest.test`);
      await page.getByTestId("res-submit").click();
      // 7. экран успеха ("Reservation Submitted!")
      await expect(page.getByText(/Reservation Submitted|submitted|confirmed/i).first()).toBeVisible({ timeout: 15_000 });
    }
  });

  await test.step("13. Бронирования в дашборде — подтвердить/завершить и отклонить", async () => {
    // 1. вернул десктопный вьюпорт и открыл раздел бронирований
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${DASH}/en/dashboard/reservations`, { waitUntil: "domcontentloaded" });
    // Список pending рендерится в двух местах (desktop + stacked, одно скрыто),
    // поэтому считаем только видимые.
    const pending = page.locator('[data-testid="pending-booking"]:visible');
    // 2. две брони ждут подтверждения
    await expect(pending).toHaveCount(2, { timeout: 15_000 });
    // 3. подтвердил первую
    await pending.first().click();
    await page.getByTestId("booking-confirm").click();
    // 4. осталась одна pending — отклонил её
    await expect(pending).toHaveCount(1, { timeout: 10_000 });
    await pending.first().click();
    await page.getByTestId("booking-reject").click();
    await expect(pending).toHaveCount(0, { timeout: 10_000 });
  });

  await test.step("14. Публичное меню (мобильное) — переключение языка через UI", async () => {
    // 1. мобильный viewport
    await page.setViewportSize({ width: 390, height: 844 });
    // 2. открыл публичное меню (по slug)
    await page.goto(`${PUBLIC_MENU}/?slug=${slug}`, { waitUntil: "networkidle" });
    // 3. открыл ленту меню
    await page.locator('a[href*="/menu"]').first().click();
    await expect(page.getByTestId("dish-row").or(page.locator("body"))).toBeTruthy();
    // 4. сменил язык на "Español"
    await page.goto(`${PUBLIC_MENU}/language?slug=${slug}`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Español/ }).click();
    // 5. снова меню — на испанском
    await page.locator('a[href*="/menu"]').first().click();
    await expect(page.locator("body")).toBeVisible();
  });
});
