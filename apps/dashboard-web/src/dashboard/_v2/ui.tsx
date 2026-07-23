"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { apiUrl } from "@/lib/api";
import { activeRestaurantHeader } from "@/lib/active-restaurant";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
 CheckIcon,
 ChevronLeftIcon,
 ChevronRightIcon,
 CloseIcon,
 CopyIcon,
 DownloadIcon,
 ExternalLinkIcon,
 EyeIcon,
 GlobeIcon,
 HelpCircleIcon,
 ShareIcon,
 SparklesIcon,
} from "./icons";
import { inputClass, formInputClass, labelClass, primaryBtn, secondaryBtn } from "./tokens";
import { AVAILABLE_LANGUAGES, getMl, setMl, translateText } from "./i18n";
import { useLocale } from "@/lib/i18n-compat";
import { useHistoryModal } from "./use-history-modal";
import { isPastDue } from "./billing-status";
import type { Ml } from "./types";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { useScrollLock } from "./use-scroll-lock";
import { track } from "@/lib/dashboard-events";
import { QRCodeCanvas } from "qrcode.react";

// Modal — Escape closes, body scroll lock while open.

// Open-modal stack so Escape only closes the top-most modal (select-style
// action pickers regularly stack on top of the order detail modal).
let modalEscStack: symbol[] = [];

export function Modal({
 open,
 onClose,
 onBack,
 title,
 subtitle,
 children,
 size = "md",
 footer,
 closeOnBackdrop = true,
 hideHeader = false,
 hideClose = false,
}: {
 open: boolean;
 onClose: () => void;
 onBack?: (() => void) | null;
 title?: ReactNode;
 subtitle?: ReactNode;
 children?: ReactNode;
 size?: "sm" | "md" | "lg";
 footer?: ReactNode;
 closeOnBackdrop?: boolean;
 hideHeader?: boolean;
 hideClose?: boolean;
}) {
 // Keep the modal mounted through its exit animation: `render` controls the
 // DOM, `closing` selects enter vs exit. open=false → play the out-animation,
 // then unmount ~200ms later (matches the duration-200 below).
 const [render, setRender] = useState(open);
 const [closing, setClosing] = useState(false);
 // Once the enter animation settles we strip the transform it leaves behind
 // (zoom/slide + fill-mode-forwards keep a non-identity transform on the card
 // forever). A lingering transform forces the card onto its own GPU layer,
 // which disables subpixel font-antialiasing → text renders slightly heavier
 // than the rest of the page. Dropping it once settled matches page rendering.
 const [entered, setEntered] = useState(false);

 // Freeze the visual props as they were while open. Callers often derive
 // size/title/children/footer from view state that resets the moment they
 // close the modal, which used to snap the width and collapse the height
 // mid-exit-animation (an "old TV switching off" jump). During the exit we
 // render this snapshot instead of the live (already reset) props.
 const visualProps = { onBack, title, subtitle, children, size, footer, hideHeader, hideClose };
 const lastOpenPropsRef = useRef(visualProps);
 if (open) lastOpenPropsRef.current = visualProps;
 const p = open ? visualProps : lastOpenPropsRef.current;

 // Animate height changes (content swaps, wizard steps) instead of snapping:
 // measure the natural heights of header + body content + footer and pin the
 // card's height with a CSS transition. max-h-[90dvh] still caps the card —
 // past the cap the body keeps scrolling internally.
 const headerRef = useRef<HTMLDivElement | null>(null);
 const bodyInnerRef = useRef<HTMLDivElement | null>(null);
 const footerRef = useRef<HTMLDivElement | null>(null);
 const [cardH, setCardH] = useState<number | null>(null);
 const hasBody = p.children != null && p.children !== false;
 const hasFooter = !!p.footer;
 useLayoutEffect(() => {
 if (!render) {
 setCardH(null);
 return;
 }
 const parts = [headerRef.current, bodyInnerRef.current, footerRef.current].filter(
 (el): el is HTMLDivElement => !!el,
 );
 if (parts.length === 0) return;
 const update = () => {
 // +2 for the card's own top/bottom border (box-sizing: border-box).
 setCardH(parts.reduce((sum, el) => sum + el.offsetHeight, 2));
 };
 update();
 const ro = new ResizeObserver(update);
 parts.forEach((el) => ro.observe(el));
 return () => ro.disconnect();
 }, [render, p.hideHeader, hasBody, hasFooter]);
 useEffect(() => {
 if (open) {
 setRender(true);
 setClosing(false);
 setEntered(false);
 return;
 }
 setClosing(true);
 const id = window.setTimeout(() => {
 setRender(false);
 setClosing(false);
 }, 200);
 return () => window.clearTimeout(id);
 }, [open]);

 // onClose lives in a ref so the Escape effect depends on [open] only.
 // Callers pass inline arrows — with onClose in the deps every parent
 // re-render (e.g. an SSE orders tick) re-registered all open modals and,
 // since effects run child-first, a modal nested in another modal's children
 // ended up BELOW its parent in the stack → Escape closed the wrong one.
 const onCloseRef = useRef(onClose);
 onCloseRef.current = onClose;
 const escIdRef = useRef<symbol | null>(null);
 if (escIdRef.current === null) escIdRef.current = Symbol("modal");
 useEffect(() => {
 if (!open) return;
 const escId = escIdRef.current!;
 modalEscStack.push(escId);
 function onKey(e: KeyboardEvent) {
 if (e.key === "Escape" && modalEscStack[modalEscStack.length - 1] === escId) onCloseRef.current();
 }
 window.addEventListener("keydown", onKey);
 return () => {
 modalEscStack = modalEscStack.filter((s) => s !== escId);
 window.removeEventListener("keydown", onKey);
 };
 }, [open]);

 // Basic a11y: focus moves into the dialog on open and returns to the
 // previously focused element on close; Tab cycles inside the card.
 const cardRef = useRef<HTMLDivElement | null>(null);
 useEffect(() => {
 if (!open) return;
 const prev = document.activeElement as HTMLElement | null;
 cardRef.current?.focus({ preventScroll: true });
 return () => {
 prev?.focus?.({ preventScroll: true });
 };
 }, [open]);
 function trapTab(e: React.KeyboardEvent) {
 if (e.key !== "Tab") return;
 const el = cardRef.current;
 if (!el) return;
 const focusables = el.querySelectorAll<HTMLElement>(
 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
 );
 if (focusables.length === 0) return;
 const first = focusables[0];
 const last = focusables[focusables.length - 1];
 if (e.shiftKey && document.activeElement === first) {
 e.preventDefault();
 last.focus();
 } else if (!e.shiftKey && document.activeElement === last) {
 e.preventDefault();
 first.focus();
 }
 }

 useScrollLock(render);

 const tc = useTranslations("dashboard.common");
 if (!render) return null;

 const widthCls =
 p.size === "sm" ? "max-w-sm" : p.size === "lg" ? "max-w-2xl" : "max-w-lg";

 // Portal to <body> so a modal opened from inside another modal isn't
 // positioned/clipped by the parent card's transform (the enter/exit zoom
 // animation leaves a transform that turns the parent into the containing
 // block for `position: fixed`) + overflow-hidden.
 return createPortal(
 // pointer-events-none while closing: the exit animation runs 200ms with
 // frozen (stale) content — taps on it must not fire outdated handlers.
 <div
 className={
 "fixed inset-0 z-50 flex items-center justify-center px-4 py-4" +
 (closing ? " pointer-events-none" : "")
 }
 >
 <div
 onClick={closeOnBackdrop ? onClose : undefined}
 aria-hidden="true"
 className={
 "absolute inset-0 bg-black/50 backdrop-blur-sm duration-200 fill-mode-forwards " +
 (closing ? "animate-out fade-out-0" : "animate-in fade-in-0")
 }
 />
 <div
 ref={cardRef}
 role="dialog"
 aria-modal="true"
 tabIndex={-1}
 onKeyDown={trapTab}
 onAnimationEnd={(e) => {
 // Only the card's own enter animation (not a child's, not the exit).
 if (e.target === cardRef.current && !closing) setEntered(true);
 }}
 className={
 "relative w-full " +
 widthCls +
 " bg-card border border-border rounded-2xl max-h-[90dvh] flex flex-col overflow-hidden outline-none duration-200 fill-mode-forwards " +
 (closing
 ? "animate-out fade-out-0 zoom-out-95 slide-out-to-bottom-2"
 : entered
 ? "" // settled: transform dropped → subpixel AA restored
 : "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2")
 }
 style={{ height: cardH ?? undefined, transition: "height 200ms ease" }}
 >
 {p.hideHeader ? null : (
 <div ref={headerRef} className="flex items-center gap-3 px-5 py-3.5 border-b border-border shrink-0">
 {p.onBack ? (
 <button
 type="button"
 onClick={p.onBack}
 className="h-[36px] w-[36px] inline-flex items-center justify-center rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors shrink-0"
 aria-label={tc("back")}
 >
 <ChevronLeftIcon size={18} />
 </button>
 ) : null}
 <div className="min-w-0 flex-1">
 <h3 className="text-base font-bold text-foreground truncate">{p.title}</h3>
 {p.subtitle ? (
 <div className="text-sm text-muted-foreground mt-0.5">{p.subtitle}</div>
 ) : null}
 </div>
 {p.hideClose ? null : (
 <button
 type="button"
 onClick={onClose}
 className="h-[36px] w-[36px] inline-flex items-center justify-center rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors shrink-0"
 aria-label={tc("close")}
 >
 <CloseIcon size={18} />
 </button>
 )}
 </div>
 )}
 {p.children != null && p.children !== false ? (
 <div className="flex-1 min-h-0 overflow-y-auto">
 {/* Padding lives on the measured inner div so its offsetHeight is the
     body's full natural height (the scrolling wrapper flex-shrinks). */}
 <div ref={bodyInnerRef} className="p-5">{p.children}</div>
 </div>
 ) : null}
 {p.footer ? (
 <div
 ref={footerRef}
 className={
 // [&_button]:min-w-0 lets footer buttons shrink inside their flex
 // row so long locale strings truncate (each button wraps its text
 // in a `truncate` span) instead of overflowing the modal.
 "px-5 py-3.5 shrink-0 [&_button]:min-w-0" +
 (p.children != null && p.children !== false ? " border-t border-border" : "")
 }
 >
 {p.footer}
 </div>
 ) : null}
 </div>
 </div>,
 document.body,
 );
}

// Select — input-styled trigger with a chevron, opens a header/footer-less
// modal whose body is a tap-to-select list. Single mode closes on selecting
// an option; `multiple` mode toggles rows into a local draft and only commits
// via the footer Apply button — backdrop click / Escape discards the draft.

export interface SelectOption<T extends string | null> {
 value: T;
 label: string;
 desc?: string;
}

interface SelectBaseProps<T extends string | null> {
 options: SelectOption<T>[];
 placeholder?: string;
 id?: string;
 disabled?: boolean;
 /** When set, the picker modal shows a header (this title + a close button)
  *  instead of the header-less list. */
 title?: string;
 /** Extra Tailwind classes appended to the trigger button. Useful for
  *  width overrides (e.g. `"w-24"`, `"w-auto"`) when the Select sits
  *  inline next to other controls. */
 className?: string;
}

interface SelectSingleProps<T extends string | null> extends SelectBaseProps<T> {
 multiple?: false;
 value: T;
 onChange: (next: T) => void;
}

interface SelectMultiProps<T extends string | null> extends SelectBaseProps<T> {
 multiple: true;
 value: T[];
 onChange: (next: T[]) => void;
}

export function Select<T extends string | null>(
 props: SelectSingleProps<T> | SelectMultiProps<T>,
) {
 const { options, placeholder, id, disabled, className, title } = props;
 const [open, setOpen] = useState(false);
 // Multi mode edits a local draft; committed to the caller only on Apply.
 const [draft, setDraft] = useState<T[]>([]);
 const tc = useTranslations("dashboard.common");
 // Multi mode shows a compact "N selected" count in the trigger; single mode
 // shows the option label.
 const triggerLabel = props.multiple
 ? props.value.length
 ? tc(props.value.length === 1 ? "selectedOne" : "selectedOther", { count: props.value.length })
 : ""
 : options.find((o) => o.value === props.value)?.label || "";
 const showPlaceholder = !triggerLabel && !!placeholder;
 return (
 <>
 <button
 id={id}
 type="button"
 disabled={disabled}
 onClick={() => {
 if (props.multiple) setDraft(props.value);
 setOpen(true);
 }}
 className={formInputClass + " inline-flex items-center justify-between gap-2 text-left disabled:opacity-50" + (className ? " " + className : "")}
 >
 <span
 className={
 "truncate " +
 (showPlaceholder ? "text-muted-foreground" : "text-foreground")
 }
 >
 {triggerLabel || placeholder || tc("untitled")}
 </span>
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0">
 <polyline points="6 9 12 15 18 9" />
 </svg>
 </button>
 <Modal
 open={open}
 onClose={() => setOpen(false)}
 title={title}
 hideHeader={!title}
 size="sm"
 footer={
 props.multiple ? (
 <div className="flex items-center justify-end">
 <button
 type="button"
 onClick={() => {
 props.onChange(draft);
 setOpen(false);
 }}
 className={primaryBtn + " inline-flex items-center gap-1.5"}
 >
 <CheckIcon size={18} className="shrink-0" />
 <span className="truncate">{tc("apply")}</span>
 </button>
 </div>
 ) : undefined
 }
 >
 <div className="-m-5">
 {options.map((o, idx) => {
 const isActive = props.multiple ? draft.includes(o.value) : o.value === props.value;
 return (
 <button
 key={(o.value ?? "__null__") + ":" + idx}
 type="button"
 onClick={() => {
 if (props.multiple) {
 setDraft(
 isActive
 ? draft.filter((v) => v !== o.value)
 : [...draft, o.value],
 );
 return;
 }
 props.onChange(o.value);
 setOpen(false);
 }}
 className={
 "w-full flex items-center gap-3 px-5 py-3 text-left select-none transition-colors md:hover:bg-primary/5 " +
 (isActive ? "bg-primary/5" : "")
 }
 >
 <span className="min-w-0 flex-1">
 <span className={"block text-sm text-foreground" + (isActive ? " font-medium" : "")}>{o.label}</span>
 {o.desc ? <span className="block text-sm text-muted-foreground mt-0.5">{o.desc}</span> : null}
 </span>
 {props.multiple ? (
 isActive ? (
 <CheckIcon size={18} className="shrink-0 text-primary" />
 ) : (
 <span className="w-[18px] shrink-0" />
 )
 ) : isActive ? (
 <CheckIcon size={18} className="shrink-0 text-primary" />
 ) : (
 <ChevronRightIcon size={18} className="shrink-0 text-muted-foreground/60" />
 )}
 </button>
 );
 })}
 </div>
 </Modal>
 </>
 );
}

// UnsavedChangesDialog — leave-prompt for forms with unsaved edits.
// Shared between DishForm + CategoryForm. Buttons match other modal
// footers (justify-end, content-width, h-8 px-3 text-xs).

export function UnsavedChangesDialog({
 open,
 saving,
 onDiscard,
 onSave,
 onClose,
}: {
 open: boolean;
 saving: boolean;
 onDiscard: () => void;
 onSave: () => void | Promise<void>;
 onClose: () => void;
}) {
 const t = useTranslations("dashboard.common");
 return (
 <Modal
 open={open}
 onClose={() => !saving && onClose()}
 title={t("unsavedTitle")}
 size="sm"
 closeOnBackdrop={!saving}
 footer={
 <div className="flex items-center gap-2 justify-end">
 <button
 type="button"
 onClick={onDiscard}
 disabled={saving}
 className={secondaryBtn + " inline-flex items-center gap-1.5"}
 >
 <CloseIcon size={18} className="shrink-0" />
 <span className="truncate">{t("discard")}</span>
 </button>
 <button
 type="button"
 onClick={() => void onSave()}
 disabled={saving}
 className={primaryBtn + " inline-flex items-center gap-1.5"}
 >
 {saving ? (
 <span className="w-3.5 h-3.5 shrink-0 border-2 border-white/40 border-t-white rounded-full animate-spin" />
 ) : (
 <CheckIcon size={18} className="shrink-0" />
 )}
 <span className="truncate">{t("save")}</span>
 </button>
 </div>
 }
 >
 <p className="text-sm text-muted-foreground">{t("unsavedMessage")}</p>
 </Modal>
 );
}

// ConfirmDialog — destructive by default. singleButton turns it into a one-button alert.

export function ConfirmDialog({
 open,
 title,
 message,
 onConfirm,
 onCancel,
 confirmLabel,
 confirmStyle,
 singleButton,
}: {
 open: boolean;
 title?: string;
 message?: string;
 onConfirm?: () => void;
 onCancel: () => void;
 confirmLabel?: string;
 confirmStyle?: "danger" | "primary";
 singleButton?: boolean;
}) {
 const tc = useTranslations("dashboard.common");
 const label = confirmLabel || (singleButton ? tc("ok") : tc("delete"));
 const isDanger = !singleButton && (!confirmStyle || confirmStyle === "danger");
 const confirmCls = isDanger
 ? "h-[36px] px-[16px] text-[14px] font-semibold text-white bg-red-600 rounded-lg transition-colors"
 : primaryBtn;

 return (
 <Modal
 open={open}
 onClose={onCancel}
 title={title || tc("confirm")}
 size="sm"
 footer={
 <div className="flex gap-2 justify-end">
 {!singleButton ? (
 <button
 type="button"
 onClick={onCancel}
 className={secondaryBtn + " inline-flex items-center"}
 >
 <span className="truncate">{tc("cancel")}</span>
 </button>
 ) : null}
 <button
 type="button"
 data-testid="confirm-ok"
 onClick={singleButton ? onCancel : onConfirm}
 className={confirmCls + " inline-flex items-center"}
 >
 <span className="truncate">{label}</span>
 </button>
 </div>
 }
 >
 {message ? (
 <p className="text-sm text-muted-foreground">{message}</p>
 ) : null}
 </Modal>
 );
}

// ToggleSwitch.

export function ToggleSwitch({
 checked,
 onChange,
 size = "md",
 testId,
}: {
 checked: boolean;
 onChange: () => void;
 size?: "md" | "sm";
 testId?: string;
}) {
 const sm = size === "sm";
 return (
 <button
 type="button"
 role="switch"
 data-testid={testId}
 aria-checked={checked}
 onClick={onChange}
 className={
 "shrink-0 relative inline-flex items-center rounded-full transition-colors " +
 (sm ? "h-[24px] w-9 " : "h-6 w-11 ") +
 (checked ? "bg-foreground" : "bg-input")
 }
 >
 <span
 className={
 "inline-block transform rounded-full bg-background transition-transform " +
 (sm
 ? "h-4 w-4 " + (checked ? "translate-x-[20px]" : "translate-x-[3px]")
 : "h-4 w-4 " + (checked ? "translate-x-6" : "translate-x-1"))
 }
 />
 </button>
 );
}

// LanguageSwitcher — pill tabs, only the languages enabled on the restaurant.

interface MiniLang {
 code: string;
 short: string;
 label: string;
}

export function LanguageSwitcher({
 lang,
 onChange,
 languages,
 onOpen,
 onSelect,
}: {
 lang: string;
 onChange: (code: string) => void;
 languages: MiniLang[];
 onOpen?: () => void;
 onSelect?: () => void;
}) {
 const [open, setOpen] = useState(false);
 const ref = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
 if (!open) return;
 function onDocClick(e: MouseEvent) {
 if (!ref.current) return;
 if (!ref.current.contains(e.target as Node)) setOpen(false);
 }
 function onEsc(e: KeyboardEvent) {
 if (e.key === "Escape") setOpen(false);
 }
 document.addEventListener("mousedown", onDocClick);
 document.addEventListener("keydown", onEsc);
 return () => {
 document.removeEventListener("mousedown", onDocClick);
 document.removeEventListener("keydown", onEsc);
 };
 }, [open]);

 if (languages.length <= 1) return null;
 const active = languages.find((l) => l.code === lang) || languages[0];

 return (
 <div ref={ref} className="relative">
 <button
 type="button"
 onClick={() => {
 setOpen((v) => {
 if (!v) onOpen?.();
 return !v;
 });
 }}
 className="inline-flex items-center gap-1 h-8 px-2.5 text-xs font-medium bg-secondary text-foreground rounded-md transition-colors"
 title={active.label}
 aria-haspopup="listbox"
 aria-expanded={open}
 >
 <span className="uppercase">{active.short}</span>
 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="6 9 12 15 18 9" />
 </svg>
 </button>
 {open ? (
 <div
 role="listbox"
 className="absolute right-0 mt-1 z-20 min-w-[180px] max-h-64 overflow-y-auto bg-card border border-border rounded-lg shadow-lg py-1"
 >
 {languages.map((l) => {
 const isActive = l.code === lang;
 return (
 <button
 key={l.code}
 type="button"
 role="option"
 aria-selected={isActive}
 onClick={() => {
 onSelect?.();
 onChange(l.code);
 setOpen(false);
 }}
 className={
 "w-full flex items-center justify-between gap-3 px-3 h-8 text-[12px] text-left transition-colors " +
 (isActive ? "text-foreground" : "text-muted-foreground")
 }
 >
 <span className="truncate">{l.label}</span>
 <span className="uppercase text-[10px] tabular-nums shrink-0">{l.short}</span>
 </button>
 );
 })}
 </div>
 ) : null}
 </div>
 );
}

// AiTranslateButton — invoked from within TranslatedInput when not on default lang.

function AiTranslateButton({
 value,
 lang,
 defaultLang,
 languages,
 onChange,
 disabled,
 inline,
}: {
 value: Ml;
 lang: string;
 defaultLang: string;
 languages: string[];
 onChange: (next: Ml) => void;
 disabled?: boolean;
 inline?: boolean;
}) {
 const [translating, setTranslating] = useState(false);
 const [confirmReplace, setConfirmReplace] = useState(false);
 const tc = useTranslations("dashboard.common");
 const ta = useTranslations("dashboard.ai");

 if (lang === defaultLang) return null;

 const current = getMl(value, lang);
 const sourceText = (() => {
 const def = getMl(value, defaultLang);
 if (def) return { text: def, fromLang: defaultLang };
 for (const code of languages) {
 const v = getMl(value, code);
 if (v && code !== lang) return { text: v, fromLang: code };
 }
 return null;
 })();

 const canTranslate = !!sourceText && !translating && !disabled;

 async function doTranslate() {
 if (!canTranslate || !sourceText) return;
 setTranslating(true);
 try {
 const translated = await translateText(sourceText.text, sourceText.fromLang, lang);
 onChange(setMl(value, lang, translated));
 } catch {
 // Silent fail; the user can retry.
 } finally {
 setTranslating(false);
 }
 }

 function handleClick() {
 if (current.trim().length > 0) {
 setConfirmReplace(true);
 } else {
 doTranslate();
 }
 }

 const inlineCls =
 "flex items-center justify-center w-9 h-10 rounded-lg text-muted-foreground transition-colors disabled:text-muted-foreground/50 disabled:cursor-not-allowed shrink-0";
 const linkCls =
 "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:text-muted-foreground/50 disabled:cursor-not-allowed";

 return (
 <>
 <button
 type="button"
 data-testid={`ml-translate-${lang}`}
 onClick={handleClick}
 disabled={!canTranslate}
 className={inline ? inlineCls : linkCls}
 aria-label={tc("translateWithAi")}
 title={inline && translating ? tc("translating") : (inline ? tc("translateWithAi") : undefined)}
 >
 {inline ? (
 translating ? (
 <div className="w-3 h-3 border-2 border-input border-t-neutral-900 rounded-full animate-spin" />
 ) : (
 <SparklesIcon size={14} />
 )
 ) : (
 <>
 {translating ? (
 <div className="w-3 h-3 border-2 border-input border-t-neutral-900 rounded-full animate-spin" />
 ) : (
 <SparklesIcon size={14} />
 )}
 <span className="underline underline-offset-2">
 {translating ? tc("translating") : tc("translate")}
 </span>
 </>
 )}
 </button>

 <ConfirmDialog
 open={confirmReplace}
 title={ta("translateReplaceTitle")}
 message={ta("translateReplaceMessage")}
 confirmLabel={tc("replace")}
 confirmStyle="primary"
 onConfirm={() => {
 setConfirmReplace(false);
 doTranslate();
 }}
 onCancel={() => setConfirmReplace(false)}
 />
 </>
 );
}

// Textarea that grows to fit its content. Starts at the height of a regular
// input (h-10) and expands one line at a time. On md+ it keeps a min height
// matching the dish photo column so the form stays balanced.
export function AutoGrowTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
 const ref = useRef<HTMLTextAreaElement | null>(null);

 useEffect(() => {
 const el = ref.current;
 if (!el) return;
 el.style.height = "auto";
 // scrollHeight reports content + padding only; with border-box sizing
 // we still owe the element its border width (otherwise the bottom row
 // is clipped by 2 px and the bottom padding visually shrinks).
 const borderY = el.offsetHeight - el.clientHeight;
 el.style.height = el.scrollHeight + borderY + "px";
 }, [props.value]);

 const baseCls = formInputClass + " h-10 py-2 resize-none overflow-hidden";
 return (
 <textarea
 {...props}
 ref={ref}
 rows={1}
 className={baseCls + (props.className ? " " + props.className : "")}
 />
 );
}

// TranslatedInput — text/textarea bound to a multilingual field.

export function TranslatedInput({
 id,
 label,
 value,
 lang,
 defaultLang,
 languages,
 onChange,
 placeholder,
 type = "text",
 multiline,
 hint,
 translatable = true,
 onFocus,
}: {
 id: string;
 label?: string;
 value: Ml;
 lang: string;
 defaultLang: string;
 languages: string[];
 onChange: (next: Ml) => void;
 placeholder?: string;
 type?: string;
 multiline?: boolean;
 hint?: string;
 translatable?: boolean;
 onFocus?: () => void;
}) {
 const current = getMl(value, lang);
 const fallback = lang !== defaultLang ? getMl(value, defaultLang) : "";
 const showFallback = lang !== defaultLang && !current && fallback;

 const showTranslate = translatable && lang !== defaultLang;
 // "Translations" opens the all-languages editor. Only meaningful with >1
 // language, and only on labelled fields (variant rows have no label row).
 const showAllLangs = !!label && languages.length > 1;
 const [allLangsOpen, setAllLangsOpen] = useState(false);

 const tc = useTranslations("dashboard.common");
 const tAll = useTranslations("dashboard.allLangsModal");
 const inputProps = {
 id,
 value: current,
 onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
 onChange(setMl(value, lang, e.target.value)),
 onFocus,
 placeholder: showFallback ? tc("willUse") + ": " + fallback : (placeholder || ""),
 className: formInputClass,
 };

 return (
 <div>
 {(label || showTranslate || showAllLangs) ? (
 <div className="flex items-center justify-between gap-2 mb-2.5">
 {label ? (
 <label htmlFor={id} className="block text-sm font-medium text-foreground">
 {label}:
 </label>
 ) : (
 <span />
 )}
 <div className="flex items-center gap-3 shrink-0">
 {showTranslate ? (
 <AiTranslateButton
 value={value}
 lang={lang}
 defaultLang={defaultLang}
 languages={languages}
 onChange={onChange}
 />
 ) : null}
 {showAllLangs ? (
 <button
 type="button"
 data-testid={`ml-open-${id}`}
 onClick={() => setAllLangsOpen(true)}
 className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors"
 >
 <GlobeIcon size={16} />
 <span className="underline underline-offset-2">{tAll("title")}</span>
 </button>
 ) : null}
 </div>
 </div>
 ) : null}
 {multiline ? (
 <AutoGrowTextarea {...inputProps} />
 ) : (
 <input
 {...inputProps}
 type={type}
 inputMode={type === "decimal" ? "decimal" : undefined}
 />
 )}
 {hint ? <p className="text-[11px] text-muted-foreground mt-1">{hint}</p> : null}
 <AllLanguagesModal
 open={allLangsOpen}
 onClose={() => setAllLangsOpen(false)}
 title={label || ""}
 value={value}
 defaultLang={defaultLang}
 languages={languages}
 onChange={onChange}
 multiline={!!multiline}
 placeholder={placeholder}
 />
 </div>
 );
}

// AllLanguagesModal — admin-only side-quest UI. Lets the user edit one
// multilingual field across every restaurant language in a single modal,
// instead of toggling the top-level language selector and re-opening
// the form. Triggered by the globe icon inside TranslatedInput.

// HelpButton — small "?" icon that toggles a popover with the given text.
// Closes on outside click / Escape. Used inside modal titles to expose
// long explainer copy without bloating the header.

export function HelpButton({ text }: { text: string }) {
 const [open, setOpen] = useState(false);
 const btnRef = useRef<HTMLButtonElement | null>(null);
 const popRef = useRef<HTMLDivElement | null>(null);
 const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

 useEffect(() => {
 if (!open) return;
 // Anchor the popover to the button's screen rect. Recompute on resize
 // and scroll so it stays glued even when the modal's body scrolls.
 // Clamps horizontally so the popover never spills past the viewport.
 function compute() {
 const el = btnRef.current;
 if (!el) return;
 const r = el.getBoundingClientRect();
 const popWidth = Math.min(288, window.innerWidth - 16);
 const pad = 8;
 const center = r.left + r.width / 2;
 const left = Math.max(
 pad,
 Math.min(center - popWidth / 2, window.innerWidth - popWidth - pad),
 );
 setPos({ top: r.bottom + 8, left });
 }
 compute();
 window.addEventListener("resize", compute);
 window.addEventListener("scroll", compute, true);
 function onDown(e: MouseEvent) {
 const t = e.target as Node;
 if (btnRef.current?.contains(t)) return;
 if (popRef.current?.contains(t)) return;
 setOpen(false);
 }
 function onKey(e: KeyboardEvent) {
 if (e.key === "Escape") setOpen(false);
 }
 window.addEventListener("mousedown", onDown);
 window.addEventListener("keydown", onKey);
 return () => {
 window.removeEventListener("resize", compute);
 window.removeEventListener("scroll", compute, true);
 window.removeEventListener("mousedown", onDown);
 window.removeEventListener("keydown", onKey);
 };
 }, [open]);

 return (
 <>
 <button
 ref={btnRef}
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 setOpen((v) => !v);
 }}
 className="w-4 h-4 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
 aria-label="Help"
 >
 <HelpCircleIcon size={14} />
 </button>
 {open && pos
 ? createPortal(
 <div
 ref={popRef}
 role="tooltip"
 style={{ top: pos.top, left: pos.left }}
 className="fixed z-[60] w-72 max-w-[calc(100vw-1rem)] p-3 rounded-lg bg-card border border-border shadow-lg text-xs text-foreground font-normal leading-snug normal-case"
 >
 {text}
 </div>,
 document.body,
 )
 : null}
 </>
 );
}

function AllLanguagesModal({
 open,
 onClose,
 title,
 value,
 defaultLang,
 languages,
 onChange,
 multiline,
 placeholder,
}: {
 open: boolean;
 onClose: () => void;
 title: string;
 value: Ml;
 defaultLang: string;
 languages: string[];
 onChange: (next: Ml) => void;
 multiline?: boolean;
 placeholder?: string;
}) {
 const tc = useTranslations("dashboard.common");
 const uiLocale = useLocale();
 // Localised language name in the current UI locale (e.g. "Italian" / "Itali-
 // ano" / "итальянский" for code "it"). Falls back to the raw code if the
 // platform's Intl.DisplayNames doesn't know the code.
 const displayNames = (() => {
 try {
 return new Intl.DisplayNames([uiLocale], { type: "language" });
 } catch {
 return null;
 }
 })();
 const langLabel = (code: string): string => {
 const name = displayNames?.of(code);
 if (!name || name === code) return code.toUpperCase();
 return name.charAt(0).toUpperCase() + name.slice(1);
 };

 // Default language is the source — the user fills it in the main input,
 // not in this modal. The list shows the *other* enabled languages only.
 const ordered = (() => {
 const set = new Set(languages);
 const langs: string[] = [];
 for (const meta of AVAILABLE_LANGUAGES) {
 if (meta.code !== defaultLang && set.has(meta.code)) langs.push(meta.code);
 }
 return langs;
 })();

 const ta = useTranslations("dashboard.allLangsModal");
 // Translations apply live to the parent as you type, so there's nothing to
 // buffer — Back just closes. The hook adds a history entry on open so the
 // phone Back button closes this modal instead of leaving the page under it;
 // when `onClose` flips `open` to false (Save / Escape / backdrop) the hook
 // reconciles that history entry itself. No dirty guard (nothing unsaved).
 useHistoryModal({ open, hash: "translations", onClose });
 return (
 <Modal
 open={open}
 onClose={onClose}
 title={ta("title")}
 size="md"
 footer={
 <div className="flex gap-2 justify-end">
 <button type="button" data-testid="ml-save" onClick={onClose} className={primaryBtn}>
 {tc("save")}
 </button>
 </div>
 }
 >
 <div className="space-y-4">
 {ordered.map((code) => {
 const v = getMl(value, code);
 return (
 <div key={code}>
 <div className="flex items-center justify-between gap-2 mb-2.5">
 <div className="text-sm font-medium text-foreground">
 {langLabel(code)}:
 </div>
 <AiTranslateButton
 value={value}
 lang={code}
 defaultLang={defaultLang}
 languages={languages}
 onChange={onChange}
 />
 </div>
 {multiline ? (
 <AutoGrowTextarea
 data-testid={`ml-input-${code}`}
 value={v}
 onChange={(e) => onChange(setMl(value, code, e.target.value))}
 placeholder={placeholder || ""}
 className={formInputClass}
 />
 ) : (
 <input
 type="text"
 data-testid={`ml-input-${code}`}
 value={v}
 onChange={(e) => onChange(setMl(value, code, e.target.value))}
 placeholder={placeholder || ""}
 className={formInputClass}
 />
 )}
 </div>
 );
 })}
 </div>
 </Modal>
 );
}

// PageHeader.

export function PageHeader({
 title,
 subtitle,
 action,
}: {
 title: string;
 subtitle?: string;
 action?: ReactNode;
}) {
 return (
 <div className="mb-5 flex items-start justify-between gap-3">
 <div className="min-w-0">
 <h2 className="text-xl font-medium text-foreground">{title}</h2>
 {subtitle ? (
 <p className="text-[13px] text-muted-foreground leading-snug mt-1">{subtitle}</p>
 ) : null}
 </div>
 {action}
 </div>
 );
}

// Subscription chip — shows current plan / trial state. Click goes to billing.

export function SubscriptionChip({
 sub,
 onClick,
}: {
 sub: { plan: string | null; subscriptionStatus: string | null; trialEndsAt: string | null } | null;
 onClick: () => void;
}) {
 const tsub = useTranslations("dashboard.subscriptionChip");
 let label = tsub("plan");
 let cls = "bg-secondary text-foreground border-border";

 if (sub) {
 const isActive = sub.subscriptionStatus === "ACTIVE" && sub.plan && sub.plan !== "FREE";
 // A paid plan whose payment failed — never a "trial", show a past-due chip.
 const pastDue = isPastDue(sub);
 const paidPlan = !!sub.plan && sub.plan !== "FREE";
 const trialEndsAt = sub.trialEndsAt ? new Date(sub.trialEndsAt) : null;
 const trialing = !isActive && !paidPlan && trialEndsAt !== null && trialEndsAt > new Date();
 const trialExpired = !isActive && !paidPlan && trialEndsAt !== null && trialEndsAt <= new Date();

 if (isActive && sub.plan) {
 label = sub.plan.charAt(0) + sub.plan.slice(1).toLowerCase();
 cls = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
 } else if (pastDue) {
 label = tsub("pastDue");
 cls = "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30";
 } else if (trialing && trialEndsAt) {
 const daysLeft = Math.max(1, Math.ceil((trialEndsAt.getTime() - Date.now()) / 86400000));
 label = tsub("trialDays", { days: daysLeft });
 cls = "bg-primary/10 text-primary border-primary/30";
 } else if (trialExpired) {
 label = tsub("trialExpired");
 cls = "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30";
 } else {
 label = tsub("free");
 cls = "bg-secondary text-muted-foreground border-border";
 }
 }

 return (
 <button
 type="button"
 onClick={onClick}
 className={"shrink-0 inline-flex items-center gap-1 h-8 px-2.5 text-xs font-medium rounded-md " + cls}
 >
 {label}
 </button>
 );
}

// EmptyState.

export function EmptyState({
 title,
 subtitle,
 action,
}: {
 title: string;
 subtitle?: string;
 action?: ReactNode;
}) {
 return (
 <div className="bg-card border border-border rounded-xl p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center text-center">
 <h3 className="text-sm font-medium text-foreground">{title}</h3>
 {subtitle ? (
 <p className="text-xs text-muted-foreground leading-snug mt-1.5 max-w-sm">{subtitle}</p>
 ) : null}
 {action ? <div className="mt-5 w-full max-w-xs">{action}</div> : null}
 </div>
 );
}

// Section card for edit pages.

export function Section({
 title,
 description,
 children,
 className = "",
}: {
 title?: string;
 description?: string;
 children: ReactNode;
 className?: string;
}) {
 return (
 <section className={"bg-card border border-border rounded-xl p-4 md:p-5 " + className}>
 {title || description ? (
 <div className="mb-4">
 {title ? <h3 className="text-sm font-medium text-foreground">{title}</h3> : null}
 {description ? (
 <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
 ) : null}
 </div>
 ) : null}
 {children}
 </section>
 );
}

// Sticky bar used on edit/sub pages.

export function SubpageStickyBar({
 onBack,
 onSave,
 canSave,
 hideSave,
 title,
 children,
}: {
 onBack: () => void;
 onSave?: () => void | Promise<void>;
 canSave?: boolean;
 hideSave?: boolean;
 title?: ReactNode;
 children?: ReactNode;
}) {
 const tc = useTranslations("dashboard.common");
 const [saving, setSaving] = useState(false);
 async function handleSave() {
 if (saving || !onSave) return;
 setSaving(true);
 try {
 await onSave();
 } finally {
 setSaving(false);
 }
 }
 return (
 <PageHeaderSlot>
 <div className="w-full flex items-center justify-between gap-3">
 <div className="flex items-center gap-2.5 min-w-0">
 <button
 type="button"
 onClick={onBack}
 className="inline-flex items-center gap-1 h-8 px-2.5 text-xs font-medium text-muted-foreground bg-secondary rounded-md shrink-0"
 >
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
 {tc("back")}
 </button>
 {title ? <span className="text-base font-medium text-foreground truncate min-w-0">{title}</span> : null}
 </div>
 <div className="flex items-center gap-2">
 {children}
 {!hideSave ? (
 <button
 type="button"
 data-testid="subpage-save"
 onClick={handleSave}
 disabled={!canSave || saving}
 className="h-8 px-2.5 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-md transition-colors inline-flex items-center gap-1"
 >
 {saving ? (
 <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
 ) : (
 <CheckIcon size={14} />
 )}
 {tc("save")}
 </button>
 ) : null}
 </div>
 </div>
 </PageHeaderSlot>
 );
}

// The DOM ids pages portal their header/footer rows into. Live here (not
// chrome.tsx) so chrome can import UI pieces without an import cycle.
export const PAGE_HEADER_SLOT_ID = "page-header-slot";
export const PAGE_FOOTER_SLOT_ID = "page-footer-slot";

function useSlotEl(id: string): HTMLElement | null {
 const [el, setEl] = useState<HTMLElement | null>(null);
 useEffect(() => {
 setEl(document.getElementById(id));
 }, [id]);
 return el;
}

// Portal into the chrome's page header (see PageHeaderBar in chrome.tsx).
// While no page renders this, the header shows the section title instead.
export function PageHeaderSlot({ children }: { children: ReactNode }) {
 const el = useSlotEl(PAGE_HEADER_SLOT_ID);
 if (!el) return null;
 return createPortal(children, el);
}

// Portal into the chrome's page footer (see PageFooterBar in chrome.tsx).
// The footer bar only shows while some page renders this.
export function PageFooterSlot({ children }: { children: ReactNode }) {
 const el = useSlotEl(PAGE_FOOTER_SLOT_ID);
 if (!el) return null;
 return createPortal(children, el);
}

// ActionMenu — portal dropdown identical to the menu "Add" dropdown: a
// full-screen blur backdrop, a crisp clone of the trigger floating above it,
// and an auto-width panel that animates in/out. Reusable anywhere: pass a
// trigger icon (+ optional label) and a list of items. variant="primary" is
// the gradient pill (like Add); variant="icon" is a plain square icon button
// (like the header kebab). Options can be marked danger for destructive rows.
export type ActionMenuItem = {
  title: string;
  desc?: string;
  onClick: () => void;
  danger?: boolean;
};

export function ActionMenu({
  items,
  icon: Icon,
  label,
  variant = "icon",
  ariaLabel,
  onOpen,
}: {
  items: ActionMenuItem[];
  icon: (props: { size?: number; className?: string }) => ReactNode;
  label?: string;
  variant?: "icon" | "primary";
  ariaLabel?: string;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // Play the exit animation, then unmount.
  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 150);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = () => close();
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open, close]);

  const primary = variant === "primary";
  const triggerBase = primary
    ? "inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg whitespace-nowrap"
    : "inline-flex items-center justify-center h-[36px] w-[36px] rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors";

  const inner = (
    <>
      <Icon size={18} />
      {label ? <span className="hidden md:inline">{label}</span> : null}
    </>
  );

  return (
    <div className="relative shrink-0">
      <button
        ref={btnRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          if (open) {
            close();
            return;
          }
          setRect(btnRef.current?.getBoundingClientRect() ?? null);
          setOpen(true);
          onOpen?.();
        }}
        className={triggerBase + (primary ? " hover:opacity-90 transition-colors shrink-0" : " shrink-0") + (open ? " invisible" : "")}
      >
        {inner}
      </button>
      {open && rect
        ? createPortal(
            <>
              <div
                className={
                  "fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm duration-200 fill-mode-forwards " +
                  (closing ? "animate-out fade-out-0" : "animate-in fade-in-0")
                }
                onClick={close}
              />
              <button
                type="button"
                aria-label={ariaLabel}
                onClick={close}
                style={{ position: "fixed", top: Math.round(rect.top), left: Math.round(rect.left) }}
                className={"z-[101] tracking-tight antialiased " + triggerBase}
              >
                {inner}
              </button>
              <div
                style={{ position: "fixed", top: Math.round(rect.bottom) + 16, right: Math.max(8, Math.round(window.innerWidth - rect.right)) }}
                className={
                  "z-[101] tracking-tight antialiased flex flex-col w-max max-w-[calc(100vw-1.5rem)] rounded-xl bg-nav border border-border shadow-xl overflow-hidden py-1 origin-top-right duration-150 fill-mode-forwards " +
                  (closing
                    ? "animate-out fade-out-0 slide-out-to-top-1"
                    : "animate-in fade-in-0 slide-in-from-top-1")
                }
              >
                {items.map((it, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setClosing(false);
                      it.onClick();
                    }}
                    className={
                      "text-left px-4 py-2.5 transition-colors whitespace-nowrap " +
                      (it.danger ? "hover:bg-red-500/10" : "hover:bg-secondary")
                    }
                  >
                    <div className={"text-sm font-medium " + (it.danger ? "text-red-600" : "text-foreground")}>
                      {it.title}
                    </div>
                    {it.desc ? (
                      <div className="text-xs text-muted-foreground leading-snug mt-0.5">{it.desc}</div>
                    ) : null}
                  </button>
                ))}
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}

// EditPageHeader — bigger heading + sticky save bar (used for dish/option pages).

export function EditPageHeader({
 onBack,
 title,
 titleIcon,
 hideBack,
 breadcrumb,
 lang,
 onLangChange,
 languages,
 onSave,
 canSave,
 saving,
 onLangsOpen,
 onLangSelect,
 actionMenu,
}: {
 onBack: () => void;
 title: string;
 /** Icon shown left of the title on desktop, hidden on mobile
  *  (same pattern as the menu-page header). */
 titleIcon?: ReactNode;
 /** Hide the back button entirely (the mobile burger stays visible since
  *  no .page-hdr-back element is rendered). */
 hideBack?: boolean;
 breadcrumb?: string;
 lang?: string;
 onLangChange?: (code: string) => void;
 languages?: MiniLang[];
 onSave?: () => void;
 canSave?: boolean;
 saving?: boolean;
 onLangsOpen?: () => void;
 onLangSelect?: () => void;
 actionMenu?: ReactNode;
}) {
 const tc = useTranslations("dashboard.common");
 return (
 <PageHeaderSlot>
 <div className="w-full flex items-center gap-3">
 {/* page-hdr-back: CSS hides the mobile burger while a back button exists */}
 {!hideBack ? (
 <button
 type="button"
 onClick={onBack}
 aria-label={tc("back")}
 className="page-hdr-back inline-flex items-center justify-center h-[36px] w-[36px] rounded-lg text-foreground bg-muted hover:bg-muted/70 transition-colors shrink-0"
 >
 <ChevronLeftIcon size={18} />
 </button>
 ) : null}
 <span className="relative -top-px min-w-0 flex-1 flex items-center gap-2 text-base font-bold text-foreground">
 {titleIcon ? <span className="shrink-0 hidden md:block">{titleIcon}</span> : null}
 <span className="truncate">{title}</span>
 </span>
 {/* Buttons grouped with the same gap as the menu-page header (gap-2),
     independent of the back↔title spacing. */}
 <div className="flex items-center gap-2 shrink-0">
 {actionMenu}
 {onSave ? (
 <button
 type="button"
 data-testid="form-save"
 onClick={onSave}
 disabled={!canSave || saving}
 className="inline-flex items-center justify-center gap-1.5 h-[36px] w-[36px] px-0 md:w-auto md:px-[16px] text-[14px] font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 disabled:opacity-60"
 >
 {saving ? (
 <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
 ) : (
 <CheckIcon size={18} />
 )}
 <span className="hidden md:inline">{tc("save")}</span>
 </button>
 ) : null}
 </div>
 </div>
 </PageHeaderSlot>
 );
}

// PreviewButton + ShareButton (used on Menu page sticky bar).

export function PreviewButton({
 url,
 onOpen,
}: {
 url: string;
 onOpen?: () => void;
}) {
 const t = useTranslations("dashboard.preview");
 const [open, setOpen] = useState(false);
 const fullUrl = url.startsWith("http") ? url : "https://" + url;
 return (
 <>
 <button
 type="button"
 onClick={() => {
 onOpen?.();
 setOpen(true);
 }}
 className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-lg transition-colors"
 >
 <EyeIcon size={14} />
 {t("preview")}
 </button>
 <MenuPreviewModal menuUrl={fullUrl} open={open} onOpenChange={setOpen} />
 </>
 );
}

export function ShareButton({
 onClick,
}: {
 onClick: () => void;
}) {
 const t = useTranslations("dashboard.preview");
 return (
 <button
 type="button"
 onClick={onClick}
 className="inline-flex items-center gap-1 h-8 px-2.5 text-xs font-medium text-muted-foreground bg-secondary rounded-md"
 >
 <ShareIcon size={14} />
 {t("share")}
 </button>
 );
}

// ShareModal — QR + link + actions.

export function ShareModal({
 open,
 onClose,
 url,
 restaurantName,
}: {
 open: boolean;
 onClose: () => void;
 url: string;
 restaurantName: string;
}) {
 const tc = useTranslations("dashboard.common");
 const tp = useTranslations("dashboard.preview");
 const [copied, setCopied] = useState(false);
 const fullUrl = url && url.startsWith("http") ? url : "https://" + (url || "");
 const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

 function copyLink() {
 track("dash_menu_share_copy");
 if (navigator.clipboard?.writeText) {
 navigator.clipboard
 .writeText(fullUrl)
 .then(() => {
 setCopied(true);
 setTimeout(() => setCopied(false), 1800);
 })
 .catch(() => {});
 }
 }

 function downloadQr() {
 track("dash_menu_share_download");
 const canvas = qrCanvasRef.current;
 if (!canvas) return;
 canvas.toBlob((blob) => {
 if (!blob) return;
 const objectUrl = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = objectUrl;
 a.download = "menu-qr.png";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
 }, "image/png");
 }

 function openInNewTab() {
 track("dash_menu_share_open_menu");
 window.open(fullUrl, "_blank", "noopener,noreferrer");
 }

 const handleClose = () => {
 track("dash_menu_share_close");
 onClose();
 };

 return (
 <Modal open={open} onClose={handleClose} size="sm" title={tp("shareTitle", { name: restaurantName || tp("shareYourMenu") })}>
 <div className="flex justify-center">
 <div
 className="w-[180px] h-[180px] p-5 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
 onClick={() => track("dash_menu_share_qr_image")}
 >
 <QRCodeCanvas
 value={fullUrl}
 size={140}
 marginSize={2}
 level="M"
 style={{ width: 140, height: 140, display: "block" }}
 />
 </div>
 {/* Hidden high-res canvas for download */}
 <div style={{ position: "absolute", left: -99999, top: -99999, opacity: 0, pointerEvents: "none" }} aria-hidden>
 <QRCodeCanvas
 ref={qrCanvasRef}
 value={fullUrl}
 size={640}
 marginSize={2}
 level="M"
 />
 </div>
 </div>
 <p className="text-xs text-muted-foreground text-center mt-3">
 {tp("tip")}
 </p>
 <div className="mt-5 flex items-center justify-between gap-2 p-3 bg-secondary border border-border rounded-lg">
 <span
 className="text-xs text-muted-foreground truncate"
 onClick={() => track("dash_menu_share_link_input")}
 >{fullUrl.replace(/^https?:\/\//, "")}</span>
 <button
 type="button"
 onClick={copyLink}
 className="text-xs font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-1 flex-shrink-0"
 >
 {copied ? <CheckIcon size={12} /> : <CopyIcon size={12} />}
 {copied ? tc("copied") : tc("copy")}
 </button>
 </div>
 <div className="grid grid-cols-2 gap-2 mt-4">
 <button
 type="button"
 onClick={downloadQr}
 className="h-10 px-3 text-sm font-medium text-foreground bg-card border border-input rounded-lg transition-colors flex items-center justify-center gap-1.5"
 >
 <DownloadIcon size={14} />
 {tc("downloadQr")}
 </button>
 <button
 type="button"
 onClick={openInNewTab}
 className="h-10 px-3 text-sm font-medium text-foreground bg-card border border-input rounded-lg transition-colors flex items-center justify-center gap-1.5"
 >
 <ExternalLinkIcon size={14} />
 {tc("openMenu")}
 </button>
 </div>
 </Modal>
 );
}

// TableQrModal — per-table QR.

export function TableQrModal({
 open,
 onClose,
 tableNumber,
 tableLabel,
 menuUrl,
}: {
 open: boolean;
 onClose: () => void;
 tableNumber: number | null;
 tableLabel: string;
 menuUrl: string;
}) {
 const tc = useTranslations("dashboard.common");
 const tp = useTranslations("dashboard.preview");
 const tt = useTranslations("dashboard.tables");
 const [copied, setCopied] = useState(false);
 const tableQrCanvasRef = useRef<HTMLCanvasElement | null>(null);
 if (tableNumber === null) return null;
 const baseUrl = menuUrl && menuUrl.startsWith("http") ? menuUrl : "https://" + (menuUrl || "");
 const fullUrl = baseUrl + "?table=" + tableNumber;

 function copyLink() {
 if (navigator.clipboard?.writeText) {
 navigator.clipboard
 .writeText(fullUrl)
 .then(() => {
 setCopied(true);
 setTimeout(() => setCopied(false), 1800);
 })
 .catch(() => {});
 }
 }

 function downloadQr() {
 const canvas = tableQrCanvasRef.current;
 if (!canvas) return;
 canvas.toBlob((blob) => {
 if (!blob) return;
 const objectUrl = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = objectUrl;
 a.download = "table-" + tableNumber + "-qr.png";
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
 }, "image/png");
 }

 function openInNewTab() {
 window.open(fullUrl, "_blank", "noopener,noreferrer");
 }

 return (
 <Modal open={open} onClose={onClose} title={tt("qrModalTitle", { number: tableNumber, label: tableLabel ? " · " + tableLabel : "" })}>
 <div className="flex justify-center">
 <div className="p-3 bg-card border border-border rounded-xl">
 <QRCodeCanvas
 value={fullUrl}
 size={192}
 marginSize={2}
 level="M"
 style={{ width: 192, height: 192, display: "block" }}
 />
 </div>
 {/* Hidden high-res canvas for download */}
 <div style={{ position: "absolute", left: -99999, top: -99999, opacity: 0, pointerEvents: "none" }} aria-hidden>
 <QRCodeCanvas
 ref={tableQrCanvasRef}
 value={fullUrl}
 size={640}
 marginSize={2}
 level="M"
 />
 </div>
 </div>
 <p className="text-xs text-muted-foreground text-center mt-3">
 {tp("tableTip")}
 </p>
 <div className="mt-5">
 <label className={labelClass}>{tc("tableLink")}</label>
 <div className="flex gap-2">
 <input
 type="text"
 readOnly
 value={fullUrl}
 onFocus={(e) => e.target.select()}
 className={inputClass + " font-mono text-xs"}
 />
 <button
 type="button"
 onClick={copyLink}
 className={
 "shrink-0 h-10 px-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 " +
 (copied
 ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
 : "text-foreground bg-card border border-input")
 }
 >
 {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
 {copied ? tc("copied") : tc("copy")}
 </button>
 </div>
 </div>
 <div className="flex gap-2 mt-4">
 <button
 type="button"
 onClick={downloadQr}
 className={secondaryBtn + " flex-1 inline-flex items-center justify-center gap-1.5"}
 >
 <DownloadIcon size={14} />
 {tc("download")}
 </button>
 <button
 type="button"
 onClick={openInNewTab}
 className={primaryBtn + " flex-1 inline-flex items-center justify-center gap-1.5"}
 >
 <ExternalLinkIcon size={14} />
 {tc("open")}
 </button>
 </div>
 </Modal>
 );
}

// File upload helper — POST to /api/upload, returns the public URL.

export async function uploadFile(file: File): Promise<string> {
 const fd = new FormData();
 fd.append("file", file);
 const res = await fetch(apiUrl("/api/upload"), {
        credentials: "include", method: "POST", body: fd });
 if (!res.ok) throw new Error("Upload failed");
 const data = await res.json();
 return data.url as string;
}

// PhotoPicker — reusable inline upload control with hover-overlay remove + AI generate slot.

export function PhotoPicker({
 url,
 onChange,
 inputId,
 height = "h-10",
 width = "min-w-[150px]",
 fileInputRef,
 onAddClick,
 onRemoveClick,
 showLabel,
}: {
 url: string | null;
 onChange: (url: string | null) => void;
 inputId: string;
 height?: string;
 width?: string;
 fileInputRef?: React.RefObject<HTMLInputElement | null>;
 onAddClick?: () => void;
 onRemoveClick?: () => void;
 showLabel?: boolean;
}) {
 const tph = useTranslations("dashboard.photo");
 const ta = useTranslations("dashboard.ai");
 const [uploading, setUploading] = useState(false);
 const localRef = useRef<HTMLInputElement | null>(null);
 const ref = fileInputRef ?? localRef;

 async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
 const file = e.target.files?.[0];
 if (!file) return;
 setUploading(true);
 try {
 const uploadedUrl = await uploadFile(file);
 onChange(uploadedUrl);
 } catch {
 // Silent; the upload error surfaces via missing photo.
 } finally {
 setUploading(false);
 if (ref.current) ref.current.value = "";
 }
 }

 function remove() {
 onRemoveClick?.();
 onChange(null);
 if (ref.current) ref.current.value = "";
 }

 return (
 <>
 {showLabel ? (
 <div className="mb-2.5">
 <label className="block text-sm font-medium text-foreground">{tph("label")}:</label>
 </div>
 ) : null}
 <label
 htmlFor={inputId}
 onClick={() => { if (!url) onAddClick?.(); }}
 className={
 "relative flex flex-col items-center justify-center gap-1 " + width + " " + height +
 " border rounded-lg cursor-pointer transition-all overflow-hidden " +
 (url
 ? "border-input p-0"
 : "border-input bg-secondary text-muted-foreground px-3 text-center")
 }
 >
 {uploading ? (
 <div className="w-4 h-4 border-2 border-input border-t-neutral-900 rounded-full animate-spin" />
 ) : url ? (
 <>
 <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
 <button
 type="button"
 onClick={(e) => {
 e.preventDefault();
 remove();
 }}
 className="absolute top-1.5 right-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white transition-colors"
 aria-label={tph("removePhoto")}
 >
 <CloseIcon size={16} />
 </button>
 </>
 ) : (
 <>
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="3" width="18" height="18" rx="2" />
 <circle cx="9" cy="9" r="2" />
 <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
 </svg>
 <span className="text-sm font-medium leading-none">{tph("addPhoto")}</span>
 </>
 )}
 <input
 id={inputId}
 ref={ref}
 type="file"
 accept="image/*"
 className="hidden"
 onChange={handleFile}
 />
 </label>
 </>
 );
}

