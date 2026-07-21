"use client";

// Standalone form components for category / dish / option editing.
// Each one lives in its own Next.js route and uses router.push for navigation.

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
 ArrowDownIcon,
 ArrowUpIcon,
 CopyIcon,
 EyeIcon,
 FlameIcon,
 PlateForkKnifeIcon,
 PlusIcon,
 SlidersIcon,
 SplitIcon,
 TrashIcon,
} from "./icons";
import {
 ConfirmDialog,
 EditPageHeader,
 Modal,
 PhotoPicker,
 Select,
 ToggleSwitch,
 TranslatedInput,
 UnsavedChangesDialog,
} from "./ui";
import { formInputClass, primaryBtn, secondaryBtn } from "./tokens";
import { notify } from "./notice";
import { useFlip } from "./use-flip";
import {
 ALLERGENS,
 AVAILABLE_LANGUAGES,
 emptyMl,
 getMlWithFallback,
} from "./i18n";
import { AllergenIcon } from "./allergen-icon";
import { DietIcon } from "./diet-icon";
import { DIETS } from "@/lib/diets";
import { moveItem, newId, currencySymbolOf, parseDecimal, sanitizePriceInput } from "./helpers";
import { buildCategoryTranslations, buildItemTranslations } from "./mappers";
import {
 createCategory,
 createItem,
 deleteCategory,
 deleteItem,
 duplicateCategory,
 duplicateItem,
 updateCategory,
 updateItem,
} from "./api";
import { useRestaurant } from "./restaurant-context";
import { useHistoryModal } from "./use-history-modal";
import type { Category, Dish, DishOption, Ml, OptionVariant } from "./types";
import { track } from "@/lib/dashboard-events";
import { showApiError } from "@/lib/show-api-error";

// ── Category form ──

export function CategoryForm({
 category,
 onSavedRedirect,
 onBack,
 onDeletedRedirect,
 isGroup,
 parentGroupId,
 availableGroups = [],
}: {
 category: Category | null;
 onSavedRedirect: () => void;
 onBack: () => void;
 onDeletedRedirect: () => void;
 isGroup?: boolean;
 parentGroupId?: string | null;
 availableGroups?: Category[];
}) {
 const t = useTranslations("dashboard.categoryForm");
 const tc = useTranslations("dashboard.common");
 const restaurant = useRestaurant();
 const { defaultLang, languages } = restaurant;
 const isNew = category === null;
 // For an existing category — derive group-ness from the row. For new — from props.
 const editingGroup = category?.isGroup ?? !!isGroup;
 const initialParentId = category?.parentId ?? parentGroupId ?? null;

 const [lang, setLang] = useState<string>(defaultLang);
 const initialForm = useMemo<{ name: Ml; parentId: string | null }>(
 () => ({
 name: category ? category.name : emptyMl(languages),
 parentId: initialParentId,
 }),
 // We only need to compute initial once — category / languages / parentId are
 // stable for the lifetime of a CategoryForm mount.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 [],
 );
 const [form, setForm] = useState<{ name: Ml; parentId: string | null }>(initialForm);
 const [saving, setSaving] = useState(false);
 const [deleting, setDeleting] = useState(false);
 const [duplicating, setDuplicating] = useState(false);
 const [duplicateConfirmOpen, setDuplicateConfirmOpen] = useState(false);
 const [confirmOpen, setConfirmOpen] = useState(false);
 const [unsavedOpen, setUnsavedOpen] = useState(false);
 const [saveErrorOpen, setSaveErrorOpen] = useState(false);
 const isDirty =
 JSON.stringify(form.name) !== JSON.stringify(initialForm.name) ||
 form.parentId !== initialForm.parentId;
 const langMetas = useMemo(() => {
 const enabled = AVAILABLE_LANGUAGES.filter((l) => languages.includes(l.code));
 const def = enabled.find((l) => l.code === defaultLang);
 if (!def) return enabled;
 return [def, ...enabled.filter((l) => l.code !== defaultLang)];
 }, [languages, defaultLang]);

 useEffect(() => {
 window.scrollTo({ top: 0, behavior: "auto" });
 }, []);

 const namePrimary = (form.name[defaultLang] || "").trim();
 const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

 async function save() {
 track("dash_category_click_save");
 if (saving) return;
 if (namePrimary.length === 0) {
 setAlert({
 title: t("nameRequiredTitle"),
 message: t("nameRequiredMessage"),
 });
 return;
 }
 const trimmed: Ml = {};
 languages.forEach((l) => {
 trimmed[l] = (form.name[l] || "").trim();
 });
 const translations = buildCategoryTranslations(trimmed, defaultLang);
 setSaving(true);
 try {
 if (isNew) {
 await createCategory({
 name: trimmed[defaultLang],
 translations,
 isGroup: editingGroup,
 parentId: editingGroup ? null : form.parentId,
 });
 } else if (category) {
 await updateCategory(category.id, {
 name: trimmed[defaultLang],
 translations,
 ...(editingGroup ? {} : { parentId: form.parentId }),
 });
 }
 onSavedRedirect();
 } catch (err) {
 track("dash_category_save_error", { error: String(err) });
 setSaveErrorOpen(true);
 setSaving(false);
 }
 }

 async function confirmDelete() {
 track("dash_category_click_delete");
 if (!category) return;
 setDeleting(true);
 try {
 await deleteCategory(category.id);
 onDeletedRedirect();
 } catch (err) {
 showApiError(err, "dash_category_delete");
 setDeleting(false);
 setConfirmOpen(false);
 }
 }

 // Duplicate the persisted category/group with everything below it, then bounce
 // back to the menu list (same redirect as delete) where the "(Copy)" appears.
 // Operates on the saved row — any unsaved edits in the form are ignored, just
 // like Delete does.
 async function handleDuplicate() {
 track("dash_category_click_duplicate");
 if (!category || duplicating || saving) return;
 setDuplicating(true);
 try {
 await duplicateCategory(category.id);
 onDeletedRedirect();
 } catch (err) {
 showApiError(err, "dash_category_duplicate");
 setDuplicating(false);
 setDuplicateConfirmOpen(false);
 }
 }

 const titleText = isNew
 ? (editingGroup ? t("newGroupTitle", { defaultValue: t("newTitle") }) : t("newTitle"))
 : (getMlWithFallback(form.name, lang, defaultLang) || tc("untitled"));

 return (
 <div>
 <EditPageHeader
 onBack={() => {
 track("dash_category_click_back");
 if (isDirty && !saving) { setUnsavedOpen(true); return; }
 onBack();
 }}
 title={titleText}
 lang={lang}
 onLangChange={setLang}
 languages={langMetas}
 onSave={save}
 canSave={!saving}
 saving={saving}
 onLangsOpen={() => track("dash_category_click_langs")}
 onLangSelect={() => track("dash_category_click_lang")}
 actionMenu={
 !isNew ? (
 <>
 <button
 type="button"
 data-testid="form-duplicate"
 onClick={() => setDuplicateConfirmOpen(true)}
 disabled={saving || duplicating}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
 aria-label={editingGroup ? t("duplicateButtonGroup", { defaultValue: "Duplicate group" }) : t("duplicateButton", { defaultValue: "Duplicate category" })}
 title={editingGroup ? t("duplicateButtonGroup", { defaultValue: "Duplicate group" }) : t("duplicateButton", { defaultValue: "Duplicate category" })}
 >
 <CopyIcon size={18} />
 <span className="hidden md:inline">{tc("duplicate", { defaultValue: "Duplicate" })}</span>
 </button>
 <button
 type="button"
 data-testid="form-delete"
 onClick={() => setConfirmOpen(true)}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap shrink-0"
 aria-label={editingGroup ? t("deleteButtonGroup") : t("deleteButton")}
 title={editingGroup ? t("deleteButtonGroup") : t("deleteButton")}
 >
 <TrashIcon size={18} />
 <span className="hidden md:inline">{tc("delete")}</span>
 </button>
 </>
 ) : undefined
 }
 />

 <div className="">
 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-5 md:p-6">
 <TranslatedInput
 id="cat-name"
 label={t("nameLabel")}
 value={form.name}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={(v) => setForm((f) => ({ ...f, name: v }))}
 placeholder={t("namePlaceholder")}
 onFocus={() => track("dash_category_focus_name_input")}
 />

 {!editingGroup && availableGroups.length > 0 ? (
 <div className="mt-4">
 <label htmlFor="cat-parent" className="block text-sm font-medium text-foreground mb-2.5">
 {t("parentGroupLabel", { defaultValue: "Group" })}:
 </label>
 <Select<string | null>
 id="cat-parent"
 title={t("parentGroupLabel", { defaultValue: "Group" })}
 value={form.parentId}
 onChange={(next) => setForm((f) => ({ ...f, parentId: next }))}
 placeholder={t("noGroup", { defaultValue: "No group" })}
 options={[
 { value: null, label: t("noGroup", { defaultValue: "No group" }) },
 ...availableGroups.map((g) => ({
 value: g.id as string | null,
 label: getMlWithFallback(g.name, defaultLang, defaultLang) || tc("untitled"),
 })),
 ]}
 />
 </div>
 ) : null}
 </div>
 </div>

 <ConfirmDialog
 open={confirmOpen}
 title={editingGroup ? t("deleteTitleGroup") : t("deleteTitle")}
 message={
 deleting
 ? tc("deleting")
 : editingGroup
 ? t("deleteMessageGroup")
 : t("deleteMessage")
 }
 onConfirm={confirmDelete}
 onCancel={() => (deleting ? null : setConfirmOpen(false))}
 />

 <ConfirmDialog
 open={duplicateConfirmOpen}
 confirmStyle="primary"
 confirmLabel={tc("duplicate", { defaultValue: "Duplicate" })}
 title={
 editingGroup
 ? t("duplicateConfirmTitleGroup", { defaultValue: "Duplicate group?" })
 : t("duplicateConfirmTitle", { defaultValue: "Duplicate category?" })
 }
 message={
 duplicating
 ? tc("duplicating", { defaultValue: "Duplicating…" })
 : editingGroup
 ? t("duplicateConfirmMessageGroup", { defaultValue: "A copy of this group with all its categories and dishes will be created." })
 : t("duplicateConfirmMessage", { defaultValue: "A copy of this category with all its dishes will be created." })
 }
 onConfirm={handleDuplicate}
 onCancel={() => (duplicating ? null : setDuplicateConfirmOpen(false))}
 />

 <ConfirmDialog
 open={alert !== null}
 singleButton
 title={alert?.title}
 message={alert?.message}
 onCancel={() => setAlert(null)}
 />

 <UnsavedChangesDialog
 open={unsavedOpen}
 saving={saving}
 onDiscard={() => { setUnsavedOpen(false); onBack(); }}
 onSave={() => { setUnsavedOpen(false); void save(); }}
 onClose={() => setUnsavedOpen(false)}
 />

 <ConfirmDialog
 open={saveErrorOpen}
 singleButton
 title={tc("saveErrorTitle")}
 message={tc("saveErrorMessage")}
 confirmLabel={tc("close")}
 onCancel={() => setSaveErrorOpen(false)}
 />

 {saving ? (
 <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
 <div className="flex flex-col items-center gap-3 text-center">
 <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
 <div className="text-sm text-muted-foreground">
 {editingGroup
 ? (languages.length > 1 ? t("savingAndTranslatingGroupOverlay") : t("savingGroupOverlay"))
 : (languages.length > 1 ? t("savingAndTranslatingOverlay") : t("savingOverlay"))}
 </div>
 </div>
 </div>
 ) : null}

 {duplicating ? (
 <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
 <div className="flex flex-col items-center gap-3 text-center">
 <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
 <div className="text-sm text-muted-foreground">
 {tc("duplicating", { defaultValue: "Duplicating…" })}
 </div>
 </div>
 </div>
 ) : null}
 </div>
 );
}

// ── Dish form ──

interface DishFormState {
 categoryId: string | null;
 name: Ml;
 description: Ml;
 price: string;
 photoUrl: string | null;
 visible: boolean;
 allergens: string[];
 diets: string[];
 options: DishOption[];
}

function mlEqual(a: Ml, b: Ml): boolean {
 const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
 for (const k of keys) {
 if ((a[k] || "") !== (b[k] || "")) return false;
 }
 return true;
}

function arrEqual(a: string[], b: string[]): boolean {
 if (a.length !== b.length) return false;
 for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
 return true;
}

function isDishFormDirty(a: DishFormState, b: DishFormState): boolean {
 if (a.categoryId !== b.categoryId) return true;
 if (a.price !== b.price) return true;
 if (a.photoUrl !== b.photoUrl) return true;
 if (a.visible !== b.visible) return true;
 if (!arrEqual(a.allergens, b.allergens)) return true;
 if (!arrEqual(a.diets, b.diets)) return true;
 if (!mlEqual(a.name, b.name)) return true;
 if (!mlEqual(a.description, b.description)) return true;
 if (!optionsEqual(a.options, b.options)) return true;
 return false;
}

function optionsEqual(a: DishOption[], b: DishOption[]): boolean {
 if (a.length !== b.length) return false;
 for (let i = 0; i < a.length; i++) {
 const x = a[i];
 const y = b[i];
 if (x.id !== y.id) return false;
 if (x.type !== y.type) return false;
 if (!!x.required !== !!y.required) return false;
 if (!mlEqual(x.name || {}, y.name || {})) return false;
 const xv = x.variants || [];
 const yv = y.variants || [];
 if (xv.length !== yv.length) return false;
 for (let j = 0; j < xv.length; j++) {
 if (xv[j].id !== yv[j].id) return false;
 if (String(xv[j].priceDelta) !== String(yv[j].priceDelta)) return false;
 if (!mlEqual(xv[j].name || {}, yv[j].name || {})) return false;
 }
 }
 return true;
}

// Pick whichever language has content for the AI prompt. Default-lang first,
// then any other non-empty value. Without the fallback a user who typed the
// dish name only in their non-default language would send an empty prompt
// to the image generator.
function pickAnyMlValue(ml: Ml, preferred: string): string {
 const first = (ml[preferred] || "").trim();
 if (first) return first;
 for (const v of Object.values(ml)) {
 const trimmed = (v || "").trim();
 if (trimmed) return trimmed;
 }
 return "";
}

export function DishForm({
 dish,
 categoryId,
 categoryName,
 categories = [],
 onSavedRedirect,
 onBack,
 onDeletedRedirect,
 optionRoutePrefix,
 onOpenOption,
 onPersisted,
 onOptionsRefresh,
}: {
 dish: Dish | null;
 // null only for an orphaned dish opened from the synthetic "No category"
 // bucket. New dishes always carry a real category from the item.new route.
 categoryId: string | null;
 categoryName: string;
 // All categories + groups — feeds the category picker (leaf categories only,
 // each labelled with its parent group in the option description).
 categories?: Category[];
 onSavedRedirect: (newId: string) => void;
 onBack: () => void;
 onDeletedRedirect: () => void;
 optionRoutePrefix?: (dishId: string) => string;
 onOpenOption?: (dishId: string, optionId: string | null) => void;
 onPersisted?: (id: string) => void | Promise<void>;
 onOptionsRefresh?: () => void | Promise<void>;
}) {
 const t = useTranslations("dashboard.dishForm");
 const tc = useTranslations("dashboard.common");
 const tAllergens = useTranslations("dashboard.allergens");
 const tDiets = useTranslations("dashboard.diets");
 const router = useRouter();
 const restaurant = useRestaurant();
 const { defaultLang, languages, currency } = restaurant;
 const currencySymbol = currencySymbolOf(currency);
 const isNew = dish === null;

 const [lang, setLang] = useState<string>(defaultLang);
 const initialForm = useMemo<DishFormState>(() => ({
 // New dishes start with no category — the user must pick one explicitly.
 categoryId: dish ? dish.categoryId : null,
 name: dish ? dish.name : emptyMl(languages),
 description: dish && dish.description ? dish.description : emptyMl(languages),
 price: dish ? dish.price : "",
 photoUrl: dish?.photoUrl ?? null,
 visible: dish ? dish.visible : true,
 allergens: dish?.allergens ?? [],
 diets: dish?.diets ?? [],
 options: dish?.options ?? [],
 }), [dish, languages]);
 const [form, setForm] = useState<DishFormState>(initialForm);
 // Resync the form ONLY when the parent swaps to a different dish id. Keying the
 // effect on `initialForm` identity used to reset the form on any parent-driven
 // `dish` reference change (background refetch / auto-translate reload) with the
 // same id — silently discarding the user's unsaved edits. A ref feeds the
 // latest computed initial state without retriggering the reset.
 const dishKey = dish?.id ?? null;
 const initialFormRef = useRef(initialForm);
 initialFormRef.current = initialForm;
 useEffect(() => {
 setForm(initialFormRef.current);
 }, [dishKey]);
 const [saving, setSaving] = useState(false);
 const [deleting, setDeleting] = useState(false);
 const [duplicating, setDuplicating] = useState(false);
 const [duplicateConfirmOpen, setDuplicateConfirmOpen] = useState(false);
 const [confirmOpen, setConfirmOpen] = useState(false);
 const [unsavedOpen, setUnsavedOpen] = useState(false);
 const [saveErrorOpen, setSaveErrorOpen] = useState(false);
 const [optionModal, setOptionModal] = useState<
 { kind: "new" } | { kind: "edit"; id: string } | null
 >(null);
 // Retain the last request so the modal keeps its content while it plays the
 // close animation (Modal stays mounted; `open` drives enter/exit).
 const optionModalRef = useRef(optionModal);
 if (optionModal) optionModalRef.current = optionModal;
 const activeOptionModal = optionModal ?? optionModalRef.current;
 // History-backed option modal: phone / browser Back closes it. The embedded
 // OptionForm reports its dirty state + save action up here so a hardware Back
 // on an unsaved option prompts instead of silently discarding.
 const optionDirtyRef = useRef(false);
 const optionSubmitRef = useRef<null | (() => void)>(null);
 const [optionUnsavedOpen, setOptionUnsavedOpen] = useState(false);
 useHistoryModal({
 open: optionModal !== null,
 hash: "option",
 onClose: () => setOptionModal(null),
 guard: () => optionDirtyRef.current,
 onBlocked: () => setOptionUnsavedOpen(true),
 });
 // Cheap-and-correct dirty check: only the fields that the form actually
 // owns. Previously this serialised the whole state twice on every render.
 const isDirty = useMemo(() => isDishFormDirty(form, initialForm), [form, initialForm]);
 const langMetas = useMemo(() => {
 const enabled = AVAILABLE_LANGUAGES.filter((l) => languages.includes(l.code));
 const def = enabled.find((l) => l.code === defaultLang);
 if (!def) return enabled;
 return [def, ...enabled.filter((l) => l.code !== defaultLang)];
 }, [languages, defaultLang]);

 // Category picker options: leaf categories only, ordered exactly like the menu
 // list — ungrouped categories first, then each group (by sortOrder) followed
 // by its own categories. Each option is described by its parent group (or
 // "no group" at the top level).
 const categoryOptions = useMemo(() => {
 const bySort = (a: Category, b: Category) => a.sortOrder - b.sortOrder;
 const leaves = categories.filter((c) => !c.isGroup);
 const groups = categories.filter((c) => c.isGroup).sort(bySort);
 const ordered: Category[] = [
 ...leaves.filter((c) => (c.parentId ?? null) === null).sort(bySort),
 ...groups.flatMap((g) => leaves.filter((c) => c.parentId === g.id).sort(bySort)),
 ];
 return ordered.map((c) => {
 const group = c.parentId ? groups.find((g) => g.id === c.parentId) : null;
 return {
 value: c.id as string | null,
 label: getMlWithFallback(c.name, defaultLang, defaultLang) || tc("untitled"),
 desc: group
 ? getMlWithFallback(group.name, defaultLang, defaultLang)
 : t("noGroup"),
 };
 });
 }, [categories, defaultLang, t, tc]);

 useEffect(() => {
 if (typeof window !== "undefined" && window.location.hash === "#options") {
 const el = document.getElementById("options-section");
 if (el) {
 el.scrollIntoView({ block: "start", behavior: "auto" });
 return;
 }
 }
 window.scrollTo({ top: 0, behavior: "auto" });
 }, []);

 const namePrimary = (form.name[defaultLang] || "").trim();
 const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

 function validateForm(): { title: string; message: string } | null {
 const missing: string[] = [];
 if (!form.categoryId) missing.push("category");
 if (namePrimary.length === 0) missing.push("name");
 const priceTrim = form.price.trim();
 if (priceTrim.length === 0 || isNaN(parseDecimal(priceTrim))) missing.push("price");
 if (missing.length === 0) return null;
 if (missing.length === 1) {
 const field = missing[0];
 if (field === "category") {
 return { title: t("categoryRequiredTitle"), message: t("categoryRequiredMessage") };
 }
 return {
 title: field === "name" ? t("nameRequiredTitle") : t("priceRequiredTitle"),
 message:
 field === "name"
 ? t("nameRequiredMessage")
 : t("priceRequiredMessage"),
 };
 }
 return {
 title: t("missingTitle"),
 message: t("missingMessage"),
 };
 }

 function toggleAllergen(code: string) {
 setForm((f) => ({
 ...f,
 allergens: f.allergens.includes(code)
 ? f.allergens.filter((a) => a !== code)
 : [...f.allergens, code],
 }));
 }

 function toggleDiet(code: string) {
 setForm((f) => ({
 ...f,
 diets: f.diets.includes(code)
 ? f.diets.filter((d) => d !== code)
 : [...f.diets, code],
 }));
 }

 async function persist(redirectAfter: "list" | "stay" = "list"): Promise<string | null> {
 if (saving) return null;
 const validation = validateForm();
 if (validation) {
 setAlert(validation);
 return null;
 }
 const priceNum = parseDecimal(form.price);
 const translations = buildItemTranslations(form.name, form.description, defaultLang);
 const descPrimary = (form.description[defaultLang] || "").trim() || null;
 setSaving(true);
 try {
 let savedId: string;
 if (isNew) {
 if (!form.categoryId) {
 // Category is required to create a dish. The picker defaults to the
 // route's category, so a null here means the user cleared it.
 setSaving(false);
 return null;
 }
 const created = await createItem({
 name: namePrimary,
 description: descPrimary,
 price: priceNum,
 imageUrl: form.photoUrl,
 categoryId: form.categoryId,
 isActive: form.visible,
 translations,
 allergens: form.allergens,
 diets: form.diets,
 options: form.options.length > 0 ? form.options : null,
 });
 savedId = created.id;
 } else if (dish) {
 await updateItem(dish.id, {
 name: namePrimary,
 description: descPrimary,
 price: priceNum,
 imageUrl: form.photoUrl,
 // Orphaned dish (no category): leave it orphaned rather than send a
 // null the API would reject — editing name/price/etc still works.
 ...(form.categoryId ? { categoryId: form.categoryId } : {}),
 isActive: form.visible,
 translations,
 allergens: form.allergens,
 diets: form.diets,
 options: form.options,
 });
 savedId = dish.id;
 } else {
 setSaving(false);
 return null;
 }
 if (redirectAfter === "list") {
 notify(tc("savedTitle"), tc("savedMessage"));
 onSavedRedirect(savedId);
 } else {
 setSaving(false);
 }
 return savedId;
 } catch (err) {
 track("dash_item_save_error", { error: String(err) });
 setSaveErrorOpen(true);
 setSaving(false);
 return null;
 }
 }

 async function save() {
 track("dash_item_click_save");
 await persist("list");
 }

 // Options live entirely in form state until the user hits the dish's
 // Save button. Tapping "add option" or an existing row just opens the
 // modal — no server round-trip per option. Used to fire `updateItem`
 // before opening, which meant every option click cost a full dish
 // auto-translate cycle.
 function handleAddOption() {
 track("dash_item_click_add_option");
 setOptionModal({ kind: "new" });
 }

 function handleEditOption(optId: string) {
 track("dash_item_click_edit_option");
 setOptionModal({ kind: "edit", id: optId });
 }

 // Keep legacy hooks alive so the prop signature stays compatible with
 // callers that still pass them (DishForm consumers in the legacy SPA
 // shell). They're no-ops in the new in-form-state flow.
 void optionRoutePrefix;
 void onOpenOption;
 void onPersisted;
 void onOptionsRefresh;
 void router;

 async function confirmDelete() {
 track("dash_item_click_delete");
 if (!dish) return;
 setDeleting(true);
 try {
 await deleteItem(dish.id);
 onDeletedRedirect();
 } catch (err) {
 showApiError(err, "dash_item_delete");
 setDeleting(false);
 setConfirmOpen(false);
 }
 }

 // Duplicate the persisted dish (unsaved edits ignored, like Delete) and go
 // back to the menu list where the "(Copy)" appears.
 async function handleDuplicate() {
 track("dash_item_click_duplicate");
 if (!dish || duplicating || saving) return;
 setDuplicating(true);
 try {
 await duplicateItem(dish.id);
 onDeletedRedirect();
 } catch (err) {
 showApiError(err, "dash_item_duplicate");
 setDuplicating(false);
 setDuplicateConfirmOpen(false);
 }
 }

 const renderAddOption = () => (
 <button
 type="button"
 data-testid="option-add"
 onClick={handleAddOption}
 disabled={saving}
 className={secondaryBtn + " inline-flex items-center gap-1.5 shrink-0"}
 >
 {saving ? (
 <div className="w-3.5 h-3.5 border-2 border-muted-foreground/40 border-t-muted-foreground rounded-full animate-spin" />
 ) : (
 <PlusIcon size={18} />
 )}
 <span className="hidden md:inline">{t("addOption")}</span>
 </button>
 );

 const titleText = isNew
 ? t("newTitle")
 : (getMlWithFallback(form.name, lang, defaultLang) || tc("untitled"));
 const divider = <div className="border-t border-border my-5" />;

 return (
 <div>
 <EditPageHeader
 onBack={() => {
 track("dash_item_click_back");
 if (isDirty && !saving) { setUnsavedOpen(true); return; }
 onBack();
 }}
 title={titleText}
 lang={lang}
 onLangChange={setLang}
 languages={langMetas}
 onSave={save}
 canSave={!saving}
 saving={saving}
 onLangsOpen={() => track("dash_item_click_langs")}
 onLangSelect={() => track("dash_item_click_lang")}
 actionMenu={
 !isNew ? (
 <>
 <button
 type="button"
 data-testid="form-duplicate"
 onClick={() => setDuplicateConfirmOpen(true)}
 disabled={saving || duplicating}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
 aria-label={t("duplicateButton", { defaultValue: "Duplicate dish" })}
 title={t("duplicateButton", { defaultValue: "Duplicate dish" })}
 >
 <CopyIcon size={18} />
 <span className="hidden md:inline">{tc("duplicate", { defaultValue: "Duplicate" })}</span>
 </button>
 <button
 type="button"
 data-testid="form-delete"
 onClick={() => setConfirmOpen(true)}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap shrink-0"
 aria-label={t("deleteButton")}
 title={t("deleteButton")}
 >
 <TrashIcon size={18} />
 <span className="hidden md:inline">{tc("delete")}</span>
 </button>
 </>
 ) : undefined
 }
 />

 <div className="space-y-3">
 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
 <div className="flex flex-col-reverse md:flex-row-reverse gap-4 md:gap-5">
 <div className="w-full md:w-[7.6rem] shrink-0">
 <PhotoPicker
 url={form.photoUrl}
 showLabel
 onChange={(url) => setForm((f) => ({ ...f, photoUrl: url }))}
 onAddClick={() => track("dash_item_click_add_photo")}
 onRemoveClick={() => track("dash_item_click_delete_photo")}
 inputId="dish-photo"
 width="w-full"
 height="h-28 md:h-auto md:aspect-square"
 />
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:items-start mb-4">
 {categoryOptions.length > 0 ? (
 <div className="w-full md:w-1/4 shrink-0">
 <label htmlFor="dish-category" className="block text-sm font-medium text-foreground mb-2.5">
 {t("categoryLabel")}:
 </label>
 <Select<string | null>
 id="dish-category"
 title={t("categoryLabel")}
 value={form.categoryId}
 onChange={(next) => setForm((f) => ({ ...f, categoryId: next }))}
 options={categoryOptions}
 placeholder={t("categoryLabel")}
 />
 </div>
 ) : null}
 <div className="w-full md:flex-1 min-w-0">
 <TranslatedInput
 id="dish-name"
 label={t("nameLabel")}
 value={form.name}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={(v) => setForm((f) => ({ ...f, name: v }))}
 placeholder={t("namePlaceholder")}
 onFocus={() => track("dash_item_focus_name_input")}
 />
 </div>
 <div className="w-full md:w-1/4 shrink-0">
 <label htmlFor="dish-price" className="block text-sm font-medium text-foreground mb-2.5">
 {t("priceLabel")}:
 </label>
 <div className="relative">
 <input
 id="dish-price"
 type="text"
 inputMode="decimal"
 placeholder={t("pricePlaceholder")}
 value={form.price}
 onChange={(e) => setForm((f) => ({ ...f, price: sanitizePriceInput(e.target.value) }))}
 onFocus={() => track("dash_item_focus_price_input")}
 className={formInputClass + " pl-3 pr-8 tabular-nums"}
 />
 <span className="absolute top-1 right-1 w-8 h-8 inline-flex items-center justify-center text-sm text-muted-foreground pointer-events-none">
 {currencySymbol}
 </span>
 </div>
 </div>
 </div>
 <TranslatedInput
 id="dish-desc"
 label={t("descLabel")}
 value={form.description}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={(v) => setForm((f) => ({ ...f, description: v }))}
 placeholder={t("descPlaceholder")}
 multiline
 onFocus={() => track("dash_item_focus_description_input")}
 />
 </div>
 </div>
 </div>

 <div className="grid gap-3 md:grid-cols-2">
 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
 <div className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2.5">
 <FlameIcon size={16} className="text-muted-foreground" />
 {t("allergensLabel")}:
 </div>
 <div className="flex flex-wrap gap-1.5">
 {ALLERGENS.map((a) => {
 const checked = form.allergens.includes(a.code);
 return (
 <button
 key={a.code}
 type="button"
 onClick={() => {
 track(form.allergens.includes(a.code) ? "dash_item_click_allergen_off" : "dash_item_click_allergen_on");
 toggleAllergen(a.code);
 }}
 className={
 "inline-flex items-center gap-1.5 h-8 px-2.5 text-sm font-medium rounded-md transition-colors " +
 (checked
 ? "bg-foreground text-background"
 : "bg-secondary text-muted-foreground")
 }
 >
 <AllergenIcon code={a.code} className="w-3.5 h-3.5" />
 {tAllergens(a.code as never)}
 </button>
 );
 })}
 </div>
 </div>

 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
 <div className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2.5">
 <PlateForkKnifeIcon size={16} className="text-muted-foreground" />
 {t("dietsLabel")}:
 </div>
 <div className="flex flex-wrap gap-1.5">
 {DIETS.map((d) => {
 const checked = form.diets.includes(d.code);
 return (
 <button
 key={d.code}
 type="button"
 onClick={() => {
 track(form.diets.includes(d.code) ? "dash_item_click_diet_off" : "dash_item_click_diet_on");
 toggleDiet(d.code);
 }}
 className={
 "inline-flex items-center gap-1.5 h-8 px-2.5 text-sm font-medium rounded-md transition-colors " +
 (checked
 ? "bg-foreground text-background"
 : "bg-secondary text-muted-foreground")
 }
 >
 <DietIcon code={d.code} className="w-3.5 h-3.5" />
 {tDiets(d.code as never)}
 </button>
 );
 })}
 </div>
 </div>
 </div>

 <div className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
 <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
 <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
 <EyeIcon size={16} className="text-muted-foreground" />
 {t("visibleLabel")}:
 </div>
 <ToggleSwitch
 checked={form.visible}
 size="sm"
 onChange={() => {
 track("dash_item_click_visible_toggle");
 setForm((f) => ({ ...f, visible: !f.visible }));
 }}
 />
 </label>
 </div>

 <div id="options-section" className="rounded-2xl bg-[hsl(var(--menu-card-bg))] border border-border p-4 sm:p-5">
 <div className="flex items-center justify-between gap-3">
 <div className="flex items-center gap-1.5 text-base font-medium text-foreground">
 <SlidersIcon size={16} className="text-muted-foreground" />
 {t("optionsLabel")}:
 </div>
 {renderAddOption()}
 </div>
 {form.options.length > 0 ? (
 <div className="mt-4">
 <DishOptionsInline
 options={form.options}
 defaultLang={defaultLang}
 disabled={saving}
 onReorder={(next) => setForm((f) => ({ ...f, options: next }))}
 onEditOption={handleEditOption}
 />
 </div>
 ) : null}
 </div>

 </div>

 <ConfirmDialog
 open={confirmOpen}
 title={t("deleteTitle")}
 message={deleting ? tc("deleting") : t("deleteMessage")}
 onConfirm={confirmDelete}
 onCancel={() => (deleting ? null : setConfirmOpen(false))}
 />

 <ConfirmDialog
 open={duplicateConfirmOpen}
 confirmStyle="primary"
 confirmLabel={tc("duplicate", { defaultValue: "Duplicate" })}
 title={t("duplicateConfirmTitle", { defaultValue: "Duplicate dish?" })}
 message={
 duplicating
 ? tc("duplicating", { defaultValue: "Duplicating…" })
 : t("duplicateConfirmMessage", { defaultValue: "A copy of this dish will be created." })
 }
 onConfirm={handleDuplicate}
 onCancel={() => (duplicating ? null : setDuplicateConfirmOpen(false))}
 />

 <ConfirmDialog
 open={alert !== null}
 singleButton
 title={alert?.title}
 message={alert?.message}
 onCancel={() => setAlert(null)}
 />

 <UnsavedChangesDialog
 open={unsavedOpen}
 saving={saving}
 onDiscard={() => { setUnsavedOpen(false); onBack(); }}
 onSave={() => { setUnsavedOpen(false); void save(); }}
 onClose={() => setUnsavedOpen(false)}
 />

 <ConfirmDialog
 open={saveErrorOpen}
 singleButton
 title={tc("saveErrorTitle")}
 message={tc("saveErrorMessage")}
 confirmLabel={tc("close")}
 onCancel={() => setSaveErrorOpen(false)}
 />

 {activeOptionModal ? (
 <Modal
 open={optionModal !== null}
 onClose={() => setOptionModal(null)}
 title={activeOptionModal.kind === "new"
 ? t("newOptionTitle", { defaultValue: "New option" })
 : t("editOptionTitle", { defaultValue: "Edit option" })}
 size="lg"
 >
 <OptionForm
 key={activeOptionModal.kind === "edit" ? activeOptionModal.id : "new"}
 embedded
 lang={lang}
 currentOptions={form.options}
 currentDishName={form.name}
 option={
 activeOptionModal.kind === "edit"
 ? form.options.find((o) => o.id === activeOptionModal.id) || null
 : null
 }
 onBack={() => setOptionModal(null)}
 onLocalSave={(nextOptions) => {
 setForm((f) => ({ ...f, options: nextOptions }));
 setOptionModal(null);
 }}
 onLocalDelete={(nextOptions) => {
 setForm((f) => ({ ...f, options: nextOptions }));
 setOptionModal(null);
 }}
 onDirtyChange={(d) => { optionDirtyRef.current = d; }}
 bindSubmit={(fn) => { optionSubmitRef.current = fn; }}
 />
 </Modal>
 ) : null}

 <UnsavedChangesDialog
 open={optionUnsavedOpen}
 saving={false}
 onDiscard={() => { setOptionUnsavedOpen(false); setOptionModal(null); }}
 onSave={() => { setOptionUnsavedOpen(false); optionSubmitRef.current?.(); }}
 onClose={() => setOptionUnsavedOpen(false)}
 />
 {saving ? (
 <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
 <div className="flex flex-col items-center gap-3 text-center">
 <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
 <div className="text-sm text-muted-foreground">
 {languages.length > 1 ? t("savingAndTranslatingOverlay") : t("savingOverlay")}
 </div>
 </div>
 </div>
 ) : null}
 {duplicating ? (
 <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center px-6">
 <div className="flex flex-col items-center gap-3 text-center">
 <div className="w-10 h-10 border-[3px] border-input border-t-foreground rounded-full animate-spin" />
 <div className="text-sm text-muted-foreground">
 {tc("duplicating", { defaultValue: "Duplicating…" })}
 </div>
 </div>
 </div>
 ) : null}
 </div>
 );
}

// ── Options list (rendered inline inside DishForm) ──

function DishOptionsInline({
 options,
 defaultLang,
 disabled,
 onReorder,
 onEditOption,
}: {
 options: DishOption[];
 defaultLang: string;
 disabled: boolean;
 onReorder: (next: DishOption[]) => void;
 onEditOption: (optionId: string) => void;
}) {
 const flipRef = useFlip<HTMLDivElement>([options.map((o) => o.id).join(",")]);

 function moveOption(idx: number, dir: number) {
 if (disabled) return;
 onReorder(moveItem(options, idx, dir));
 }

 return (
 <div ref={flipRef}>
 {options.map((opt, idx) => (
 <div key={opt.id} data-flip-id={opt.id}>
 <OptionRow
 option={opt}
 defaultLang={defaultLang}
 isFirst={idx === 0}
 isLast={idx === options.length - 1}
 onEdit={() => !disabled && onEditOption(opt.id)}
 onMoveUp={() => moveOption(idx, -1)}
 onMoveDown={() => moveOption(idx, 1)}
 />
 </div>
 ))}
 </div>
 );
}

function OptionRow({
 option,
 defaultLang,
 isFirst,
 isLast,
 onEdit,
 onMoveUp,
 onMoveDown,
}: {
 option: DishOption;
 defaultLang: string;
 isFirst: boolean;
 isLast: boolean;
 onEdit: () => void;
 onMoveUp: () => void;
 onMoveDown: () => void;
}) {
 const tc = useTranslations("dashboard.common");
 const to = useTranslations("dashboard.optionForm");
 const typeLabel = option.type === "multi" ? to("typeMulti") : to("typeSingle");
 const reqLabel = option.required ? to("required") : to("optional");
 const variantsCount = option.variants?.length || 0;
 return (
 <div
 data-testid="option-row"
 role="button"
 tabIndex={0}
 onClick={onEdit}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 onEdit();
 }
 }}
 className="flex items-center gap-3 py-2 -mx-2 px-2 rounded-lg select-none cursor-pointer transition-colors md:hover:bg-primary/5"
 >
 <span className="flex-1 min-w-0 flex items-center gap-1.5 text-sm text-muted-foreground">
 <span className="shrink-0 tabular-nums">{variantsCount}×</span>
 <span className="shrink-0">·</span>
 <span className="min-w-0 truncate font-medium text-foreground">
 {getMlWithFallback(option.name, defaultLang, defaultLang) || to("untitledOption")}
 </span>
 <span className="hidden md:flex items-center gap-1.5 shrink-0">
 <span>·</span>
 <span>{typeLabel}</span>
 <span>·</span>
 <span>{reqLabel}</span>
 </span>
 </span>
 <span onClick={(e) => e.stopPropagation()} className="shrink-0 inline-flex items-center gap-2.5">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
 disabled={isFirst}
 className="py-1 text-muted-foreground/60 enabled:md:hover:text-foreground transition-colors disabled:opacity-40"
 aria-label={tc("moveUp")}
 >
 <ArrowUpIcon size={17} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
 disabled={isLast}
 className="py-1 text-muted-foreground/60 enabled:md:hover:text-foreground transition-colors disabled:opacity-40"
 aria-label={tc("moveDown")}
 >
 <ArrowDownIcon size={17} />
 </button>
 </span>
 </div>
 );
}

// ── Option form ──

interface OptionFormState {
 name: Ml;
 type: "single" | "multi";
 required: boolean;
 variants: OptionVariant[];
}

export function OptionForm({
 dish,
 option,
 onSavedRedirect,
 onBack,
 onDeletedRedirect,
 embedded,
 lang: langProp,
 currentOptions,
 currentDishName,
 onLocalSave,
 onLocalDelete,
 onDirtyChange,
 bindSubmit,
}: {
 // Standalone path (legacy SPA shell) still uses `dish` for the server
 // round-trip; the embedded path inside DishForm uses `currentOptions`
 // and the on-local-* callbacks so options are buffered in form state
 // until the user hits the dish's main Save button.
 dish?: Dish;
 option: DishOption | null;
 onSavedRedirect?: () => void;
 onBack: () => void;
 onDeletedRedirect?: () => void;
 embedded?: boolean;
 lang?: string;
 currentOptions?: DishOption[];
 currentDishName?: Ml;
 onLocalSave?: (nextOptions: DishOption[]) => void;
 onLocalDelete?: (nextOptions: DishOption[]) => void;
 // Embedded modal only: report the form's dirty state up to the owner (so a
 // hardware Back can prompt) and register the save action (so the owner's
 // unsaved dialog can trigger it).
 onDirtyChange?: (dirty: boolean) => void;
 bindSubmit?: (submit: () => void) => void;
}) {
 const t = useTranslations("dashboard.optionForm");
 const tc = useTranslations("dashboard.common");
 const restaurant = useRestaurant();
 const { defaultLang, languages, currency } = restaurant;
 const currencySymbol = currencySymbolOf(currency);
 const isNew = option === null;

 const [internalLang, setInternalLang] = useState<string>(defaultLang);
 const lang = langProp ?? internalLang;
 // When `langProp` is supplied the parent owns the language; writing to the
 // internal state would dead-end. Skip the update so the dropdown reads its
 // value from props on every render.
 const setLang = langProp !== undefined ? () => {} : setInternalLang;
 const [form, setForm] = useState<OptionFormState>(() => ({
 name: option ? option.name : emptyMl(languages),
 type: option ? option.type : "single",
 required: option ? !!option.required : false,
 variants: option?.variants ?? [],
 }));
 const [saving, setSaving] = useState(false);
 const [deleting, setDeleting] = useState(false);
 const [confirmOpen, setConfirmOpen] = useState(false);
 // null = closed; otherwise a create/edit request for the variant sub-modal.
 const [variantModal, setVariantModal] = useState<
 { kind: "new" } | { kind: "edit"; id: string } | null
 >(null);
 // Retained so the sub-modal keeps its content through the close animation.
 const variantModalRef = useRef(variantModal);
 if (variantModal) variantModalRef.current = variantModal;
 const activeVariantModal = variantModal ?? variantModalRef.current;
 const langMetas = useMemo(() => {
 const enabled = AVAILABLE_LANGUAGES.filter((l) => languages.includes(l.code));
 const def = enabled.find((l) => l.code === defaultLang);
 if (!def) return enabled;
 return [def, ...enabled.filter((l) => l.code !== defaultLang)];
 }, [languages, defaultLang]);

 useEffect(() => {
 if (embedded) return;
 window.scrollTo({ top: 0, behavior: "auto" });
 }, [embedded]);

 const namePrimary = (form.name[defaultLang] || "").trim();
 // A variant counts as valid if it has a name in ANY enabled locale, not only
 // the default one — filtering on defaultLang alone silently dropped variants a
 // user filled in a non-default language on save (data loss).
 const validVariants = form.variants.filter((v) =>
 Object.values(v.name || {}).some((s) => (s || "").trim().length > 0),
 );
 const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

 // Dirty-tracking for the embedded history-Back guard (see DishForm). Compare
 // the buffered form against the option we opened with; reuse optionsEqual by
 // wrapping each side in a single-element array with a shared id.
 const curOption: DishOption = {
 id: "x", name: form.name, type: form.type, required: form.required, variants: form.variants,
 };
 const baseOption: DishOption = {
 id: "x",
 name: (option ? option.name : {}) as Ml,
 type: option ? option.type : "single",
 required: option ? !!option.required : false,
 variants: option?.variants ?? [],
 };
 const isDirty = !optionsEqual([curOption], [baseOption]);
 useEffect(() => { onDirtyChange?.(isDirty); }, [isDirty, onDirtyChange]);
 // Register the latest save() each render so the owner's unsaved dialog can
 // trigger it.
 useEffect(() => { bindSubmit?.(save); });

 function validateForm(): { title: string; message: string } | null {
 if (namePrimary.length === 0 && validVariants.length === 0) {
 return {
 title: t("missingTitle"),
 message: t("missingMessage"),
 };
 }
 if (namePrimary.length === 0) {
 return {
 title: t("nameRequiredTitle"),
 message: t("nameRequiredMessage"),
 };
 }
 if (validVariants.length === 0) {
 return {
 title: t("variantRequiredTitle"),
 message: t("variantRequiredMessage"),
 };
 }
 return null;
 }

 const variantsFlipRef = useFlip<HTMLDivElement>([form.variants.map((v) => v.id).join(",")]);

 function moveVariant(idx: number, dir: number) {
 setForm((f) => ({ ...f, variants: moveItem(f.variants, idx, dir) }));
 }
 // Variants are edited in a sub-modal (name + price delta + translations) and
 // buffered here by id — no server round-trip until the dish is saved.
 function saveVariant(v: OptionVariant) {
 setForm((f) => {
 const exists = f.variants.some((x) => x.id === v.id);
 return {
 ...f,
 variants: exists ? f.variants.map((x) => (x.id === v.id ? v : x)) : [...f.variants, v],
 };
 });
 setVariantModal(null);
 }
 function deleteVariant(id: string) {
 setForm((f) => ({ ...f, variants: f.variants.filter((x) => x.id !== id) }));
 setVariantModal(null);
 }

 const renderAddVariant = () => (
 <button
 type="button"
 data-testid="variant-add"
 disabled={saving}
 onClick={() => setVariantModal({ kind: "new" })}
 className={secondaryBtn + " inline-flex items-center gap-1.5 shrink-0"}
 >
 <PlusIcon size={18} />
 <span className="hidden md:inline">{tc("add")}</span>
 </button>
 );

 // Source-of-truth for the dish's existing options. Embedded mode reads
 // it from props (buffered DishForm state); legacy mode reads from the
 // server-side `dish` row.
 const baseOptions: DishOption[] = currentOptions ?? dish?.options ?? [];

 async function save() {
 if (saving) return;
 const validation = validateForm();
 if (validation) {
 setAlert(validation);
 return;
 }
 setSaving(true);
 const normalisedVariants = validVariants.map((v) => {
 // Coerce to a canonical 2-decimal string. parseDecimal handles comma
 // separators; NaN (empty / garbage like "1.2.3" / ".") falls back to 0 so
 // the public menu never does price math on a malformed delta.
 const parsed = parseDecimal(v.priceDelta as unknown as string);
 const num = Number.isFinite(parsed) ? parsed : 0;
 return { ...v, priceDelta: num.toFixed(2) };
 });
 const data: Omit<DishOption, "id"> = {
 name: form.name,
 type: form.type,
 required: form.required,
 variants: normalisedVariants,
 };
 let nextOptions: DishOption[];
 if (isNew) {
 nextOptions = [...baseOptions, { id: newId(), ...data }];
 } else if (option) {
 nextOptions = baseOptions.map((o) => (o.id === option.id ? { ...o, ...data } : o));
 } else {
 nextOptions = baseOptions;
 }
 // Embedded inside DishForm — hand the new options array back to the
 // parent and exit immediately. The eventual server round-trip happens
 // when the user saves the dish as a whole.
 if (onLocalSave) {
 onLocalSave(nextOptions);
 setSaving(false);
 return;
 }
 // Legacy standalone path — persist directly via dish update.
 if (!dish) {
 setSaving(false);
 return;
 }
 try {
 await persistDishOptions(dish, nextOptions, defaultLang);
 onSavedRedirect?.();
 } catch (err) {
 showApiError(err, isNew ? "dash_option_create" : "dash_option_update");
 setSaving(false);
 }
 }

 async function confirmDelete() {
 if (!option) return;
 setDeleting(true);
 const nextOptions = baseOptions.filter((o) => o.id !== option.id);
 if (onLocalDelete) {
 onLocalDelete(nextOptions);
 setDeleting(false);
 setConfirmOpen(false);
 return;
 }
 if (!dish) {
 setDeleting(false);
 setConfirmOpen(false);
 return;
 }
 try {
 await persistDishOptions(dish, nextOptions, defaultLang);
 onDeletedRedirect?.();
 } catch (err) {
 showApiError(err, "dash_option_delete");
 setDeleting(false);
 setConfirmOpen(false);
 }
 }

 const titleText = isNew
 ? t("newTitle")
 : (getMlWithFallback(form.name, lang, defaultLang) || t("untitledOption"));
 const divider = <div className="border-t border-border my-5" />;
 const dishName = dish
 ? getMlWithFallback(dish.name, defaultLang, defaultLang)
 : currentDishName
 ? getMlWithFallback(currentDishName, defaultLang, defaultLang)
 : "";

 return (
 <div>
 {!embedded ? (
 <EditPageHeader
 onBack={onBack}
 title={titleText}
 lang={lang}
 onLangChange={setLang}
 languages={langMetas}
 onSave={save}
 canSave={!saving}
 saving={saving}
 />
 ) : null}

 <div className={embedded
 ? ""
 : "rounded-2xl bg-nav border border-border p-5 md:p-6"}>
 <TranslatedInput
 id="opt-name"
 label={t("nameLabel")}
 value={form.name}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={(v) => setForm((f) => ({ ...f, name: v }))}
 placeholder={t("namePlaceholder")}
 />

 {divider}

 <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
 <div className="text-sm font-medium text-foreground">{t("multiLabel")}:</div>
 <ToggleSwitch
 checked={form.type === "multi"}
 size="sm"
 testId="opt-multi"
 onChange={() => {
 setForm((f) => ({ ...f, type: f.type === "multi" ? "single" : "multi" }));
 }}
 />
 </label>

 <div className="h-4" />

 <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
 <div className="text-sm font-medium text-foreground">{t("requiredLabel")}:</div>
 <ToggleSwitch
 checked={form.required}
 size="sm"
 testId="opt-required"
 onChange={() => {
 setForm((f) => ({ ...f, required: !f.required }));
 }}
 />
 </label>

 {divider}

 <div className="mb-6">
 <div className="flex items-center justify-between gap-3">
 <div className="flex items-center gap-1.5 text-base font-medium text-foreground">
 <SplitIcon size={16} className="text-muted-foreground" />
 {t("variantsLabel")}:
 </div>
 {renderAddVariant()}
 </div>
 {form.variants.length > 0 ? (
 <div className="mt-2.5" ref={variantsFlipRef}>
 {form.variants.map((variant, idx) => (
 <div key={variant.id} data-flip-id={variant.id}>
 <VariantRow
 variant={variant}
 defaultLang={defaultLang}
 currencySymbol={currencySymbol}
 isFirst={idx === 0}
 isLast={idx === form.variants.length - 1}
 onEdit={() => setVariantModal({ kind: "edit", id: variant.id })}
 onMoveUp={() => moveVariant(idx, -1)}
 onMoveDown={() => moveVariant(idx, 1)}
 />
 </div>
 ))}
 </div>
 ) : null}
 </div>
 </div>

 {embedded ? (
 <div className="sticky -bottom-5 -mx-5 -mb-5 px-5 py-3 bg-card border-t border-border flex items-center justify-between gap-2 z-10">
 {!isNew ? (
 <button
 type="button"
 onClick={() => setConfirmOpen(true)}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap"
 aria-label={tc("delete")}
 title={tc("delete")}
 >
 <TrashIcon size={16} />
 <span className="hidden md:inline">{tc("delete")}</span>
 </button>
 ) : <span />}
 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={onBack}
 className={secondaryBtn}
 >
 {tc("cancel")}
 </button>
 <button
 type="button"
 data-testid="option-save"
 onClick={save}
 disabled={saving}
 className={primaryBtn}
 >
 {saving ? tc("saving") : tc("save")}
 </button>
 </div>
 </div>
 ) : !isNew ? (
 <div className="mt-6 flex justify-center">
 <button
 type="button"
 onClick={() => setConfirmOpen(true)}
 className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-red-600 rounded-lg transition-colors"
 >
 <TrashIcon size={13} />
 {t("deleteButton")}
 </button>
 </div>
 ) : null}

 <ConfirmDialog
 open={confirmOpen}
 title={t("deleteTitle")}
 message={deleting ? tc("deleting") : t("deleteMessage")}
 onConfirm={confirmDelete}
 onCancel={() => (deleting ? null : setConfirmOpen(false))}
 />

 <ConfirmDialog
 open={alert !== null}
 singleButton
 title={alert?.title}
 message={alert?.message}
 onCancel={() => setAlert(null)}
 />

 {activeVariantModal ? (
 <VariantFormModal
 key={activeVariantModal.kind === "edit" ? activeVariantModal.id : "new"}
 open={variantModal !== null}
 variant={
 activeVariantModal.kind === "edit"
 ? form.variants.find((v) => v.id === activeVariantModal.id) ?? null
 : null
 }
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 currencySymbol={currencySymbol}
 onClose={() => setVariantModal(null)}
 onSave={saveVariant}
 onDelete={
 activeVariantModal.kind === "edit"
 ? () => deleteVariant(activeVariantModal.id)
 : undefined
 }
 />
 ) : null}
 </div>
 );
}

function VariantRow({
 variant,
 defaultLang,
 currencySymbol,
 isFirst,
 isLast,
 onEdit,
 onMoveUp,
 onMoveDown,
}: {
 variant: OptionVariant;
 defaultLang: string;
 currencySymbol: string;
 isFirst: boolean;
 isLast: boolean;
 onEdit: () => void;
 onMoveUp: () => void;
 onMoveDown: () => void;
}) {
 const tc = useTranslations("dashboard.common");
 const t = useTranslations("dashboard.optionForm");
 const name = getMlWithFallback(variant.name, defaultLang, defaultLang) || t("variantNamePlaceholder");
 const raw = String(variant.priceDelta ?? "0");
 const num = parseDecimal(raw);
 const deltaLabel = !isNaN(num) && num !== 0 ? (num > 0 ? "+" : "") + raw + currencySymbol : "";
 return (
 <div
 role="button"
 tabIndex={0}
 onClick={onEdit}
 onKeyDown={(e) => {
 if (e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 onEdit();
 }
 }}
 data-testid="variant-row"
 className="flex items-center gap-3 py-2 -mx-2 px-2 rounded-lg select-none cursor-pointer transition-colors md:hover:bg-primary/5"
 >
 <span className="flex-1 min-w-0 flex items-center gap-1.5 text-sm text-muted-foreground">
 <span className="min-w-0 truncate font-medium text-foreground">{name}</span>
 {deltaLabel ? (
 <>
 <span className="shrink-0">·</span>
 <span className="shrink-0 tabular-nums">{deltaLabel}</span>
 </>
 ) : null}
 </span>
 <span onClick={(e) => e.stopPropagation()} className="shrink-0 inline-flex items-center gap-2.5">
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
 disabled={isFirst}
 className="py-1 text-muted-foreground/60 enabled:md:hover:text-foreground transition-colors disabled:opacity-40"
 aria-label={tc("moveUp")}
 >
 <ArrowUpIcon size={17} />
 </button>
 <button
 type="button"
 onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
 disabled={isLast}
 className="py-1 text-muted-foreground/60 enabled:md:hover:text-foreground transition-colors disabled:opacity-40"
 aria-label={tc("moveDown")}
 >
 <ArrowDownIcon size={17} />
 </button>
 </span>
 </div>
 );
}

// Variant sub-modal (opened from the option modal): name (translatable) +
// price delta, buffered back into the option's variants list on save.
function VariantFormModal({
 open,
 variant,
 lang,
 defaultLang,
 languages,
 currencySymbol,
 onClose,
 onSave,
 onDelete,
}: {
 open: boolean;
 variant: OptionVariant | null;
 lang: string;
 defaultLang: string;
 languages: string[];
 currencySymbol: string;
 onClose: () => void;
 onSave: (v: OptionVariant) => void;
 onDelete?: () => void;
}) {
 const tc = useTranslations("dashboard.common");
 const t = useTranslations("dashboard.optionForm");
 const isNew = variant === null;
 const [name, setName] = useState<Ml>(() => (variant ? variant.name : emptyMl(languages)));
 const [priceDelta, setPriceDelta] = useState<string>(() =>
 variant ? String(variant.priceDelta ?? "0") : "0",
 );
 const [alert, setAlert] = useState<string | null>(null);
 const [unsavedOpen, setUnsavedOpen] = useState(false);
 const namePrimary = (name[defaultLang] || "").trim();

 // The modal instance is reused across "add" clicks (kept mounted through its
 // exit animation, key stays "new"), so state would otherwise carry the last
 // variant's data into the next add. Reset each time it reopens for a new one.
 useEffect(() => {
 if (open && isNew) {
 setName(emptyMl(languages));
 setPriceDelta("0");
 setAlert(null);
 }
 }, [open, isNew, languages]);

 // History-backed modal: the phone / browser Back button closes this variant
 // form. A dirty form vetoes a hardware Back and shows the unsaved dialog; UI
 // buttons (Cancel / Save / Delete) flip `open` themselves and the hook then
 // reconciles the history entry.
 const baseName = variant ? variant.name : {};
 const baseDelta = variant ? String(variant.priceDelta ?? "0") : "0";
 const isDirty = !mlEqual(name, baseName) || String(priceDelta).trim() !== baseDelta;
 const isDirtyRef = useRef(isDirty);
 isDirtyRef.current = isDirty;
 useHistoryModal({
 open,
 hash: "variant",
 onClose,
 guard: () => isDirtyRef.current,
 onBlocked: () => setUnsavedOpen(true),
 });

 function handleSave() {
 if (namePrimary.length === 0) {
 setAlert(t("nameRequiredMessage"));
 return;
 }
 const normalised = String(priceDelta || "0").replace(",", ".").trim() || "0";
 onSave({ id: variant?.id ?? newId(), name, priceDelta: normalised });
 }

 const title = isNew
 ? t("addVariant")
 : getMlWithFallback(name, lang, defaultLang) || t("addVariant");

 return (
 <Modal
 open={open}
 onClose={onClose}
 title={title}
 size="md"
 footer={
 <div className="flex items-center justify-between gap-2">
 {!isNew && onDelete ? (
 <button
 type="button"
 onClick={onDelete}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors whitespace-nowrap"
 aria-label={tc("delete")}
 title={tc("delete")}
 >
 <TrashIcon size={16} className="shrink-0" />
 <span className="hidden md:inline truncate">{tc("delete")}</span>
 </button>
 ) : <span />}
 <div className="flex items-center gap-2">
 <button type="button" onClick={onClose} className={secondaryBtn + " inline-flex items-center"}>
 <span className="truncate">{tc("cancel")}</span>
 </button>
 <button type="button" data-testid="variant-save" onClick={handleSave} className={primaryBtn + " inline-flex items-center"}>
 <span className="truncate">{tc("save")}</span>
 </button>
 </div>
 </div>
 }
 >
 <TranslatedInput
 id={`vf-${variant?.id ?? "new"}`}
 label={t("nameLabel")}
 value={name}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={setName}
 placeholder={t("variantNameExample")}
 />

 <div className="h-4" />

 <label className="block text-sm font-medium text-foreground mb-2.5">{t("priceModifier")}:</label>
 <div className="relative w-32">
 <input
 type="text"
 inputMode="decimal"
 data-testid="variant-price"
 value={priceDelta}
 onChange={(e) => setPriceDelta(sanitizePriceInput(e.target.value))}
 placeholder="2.00"
 className={formInputClass + " pl-3 pr-8 tabular-nums"}
 />
 <span className="absolute top-1 right-1 w-8 h-8 inline-flex items-center justify-center text-sm text-muted-foreground pointer-events-none">
 {currencySymbol}
 </span>
 </div>

 <ConfirmDialog
 open={alert !== null}
 singleButton
 title={t("nameRequiredTitle")}
 message={alert || ""}
 onCancel={() => setAlert(null)}
 />

 <UnsavedChangesDialog
 open={unsavedOpen}
 saving={false}
 onDiscard={() => { setUnsavedOpen(false); onClose(); }}
 onSave={() => { setUnsavedOpen(false); handleSave(); }}
 onClose={() => setUnsavedOpen(false)}
 />
 </Modal>
 );
}

async function persistDishOptions(dish: Dish, nextOptions: DishOption[], defaultLang: string) {
 const namePrimary = (dish.name[defaultLang] || "").trim();
 const descPrimary = (dish.description[defaultLang] || "").trim() || null;
 const translations = buildItemTranslations(dish.name, dish.description, defaultLang);
 await updateItem(dish.id, {
 name: namePrimary,
 description: descPrimary,
 // parseDecimal handles comma-decimal locales and rejects NaN — parseFloat
 // silently mangles "9,90" to 9 and drops everything after the comma.
 price: parseDecimal(dish.price),
 imageUrl: dish.photoUrl,
 ...(dish.categoryId ? { categoryId: dish.categoryId } : {}),
 isActive: dish.visible,
 translations,
 allergens: dish.allergens,
 diets: dish.diets,
 options: nextOptions,
 });
}

