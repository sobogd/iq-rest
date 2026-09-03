"use client";

import type { ReactNode } from "react";
import { ArrowLeftIcon } from "./icons";
import { useSidebar } from "./sidebar";
import { headerBtnSurface, headerIconBtn } from "./tokens";

/**
 * Every dashboard screen renders through Page: a fixed header (burger on
 * mobile, one self-sufficient title, page actions) plus the single scrollable
 * body. There is no subtitle slot — a title that needs one is a bad title. The sidebar
 * and this body are the only two scroll containers in the app — the document
 * itself never scrolls, so sticky sub-bars inside `children` anchor to
 * `top-0` of the body, no viewport math needed.
 */
export function Page({
  title,
  actions,
  onBack,
  children,
  /** Body fills the viewport and does not scroll (kanban, chat, floor plan). */
  fill,
  /** Form screens: cards flow into 2-3 columns on wide displays instead of
   *  stretching a single column (and its inputs) across the whole screen. */
  grid,
  bodyClassName = "",
}: {
  title: ReactNode;
  actions?: ReactNode;
  onBack?: () => void;
  children: ReactNode;
  fill?: boolean;
  grid?: boolean;
  bodyClassName?: string;
}) {
  return (
    <>
      <PageHeaderBar title={title} actions={actions} onBack={onBack} />
      <div
        data-scroll-pane="page"
        className={
          (fill
            ? "flex-1 min-h-0 flex flex-col "
            : grid
              ? "flex-1 min-h-0 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 "
              : "flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 p-4 md:p-6 ") + bodyClassName
        }
      >
        {children}
      </div>
    </>
  );
}

/** Burger and back are header controls like any other, so they wear the shared
 *  token rather than a copy of it. No negative margin — the fill makes the
 *  button's edge visible, so hanging it into the bar's padding would read as a
 *  misalignment rather than the optical correction it was for a surfaceless
 *  glyph. */
const leadingBtn = headerIconBtn + " shrink-0 " + headerBtnSurface;

function PageHeaderBar({
  title,
  actions,
  onBack,
}: {
  title: ReactNode;
  actions?: ReactNode;
  onBack?: () => void;
}) {
  const { setOpen } = useSidebar();
  return (
    <header className="shrink-0 relative h-14 flex items-center gap-2 px-4 md:px-6 bg-nav/90 backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border">
      {/* On a phone the bar carries exactly one leading control: back when the
          screen has a parent, the burger otherwise. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className={(onBack ? "hidden" : "md:hidden") + " " + leadingBtn}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className={leadingBtn}
        >
          <ArrowLeftIcon size={14} />
        </button>
      ) : null}
      <h1 className="min-w-0 flex-1 text-sm font-medium text-foreground truncate leading-5">
        {title}
      </h1>
      {actions ? <div className="shrink-0 flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
