"use client";

import type { ReactNode } from "react";
import { ChevronLeftIcon } from "./icons";
import { useSidebar } from "./sidebar";

/**
 * Every dashboard screen renders through Page: a fixed header (burger on
 * mobile, title, page actions) plus the single scrollable body. The sidebar
 * and this body are the only two scroll containers in the app — the document
 * itself never scrolls, so sticky sub-bars inside `children` anchor to
 * `top-0` of the body, no viewport math needed.
 */
export function Page({
  title,
  subtitle,
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
  subtitle?: ReactNode;
  actions?: ReactNode;
  onBack?: () => void;
  children: ReactNode;
  fill?: boolean;
  grid?: boolean;
  bodyClassName?: string;
}) {
  return (
    <>
      <PageHeaderBar title={title} subtitle={subtitle} actions={actions} onBack={onBack} />
      <div
        data-scroll-pane="page"
        className={
          (fill
            ? "flex-1 min-h-0 flex flex-col "
            : grid
              ? "flex-1 min-h-0 overflow-y-auto grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 items-start gap-4 p-4 md:p-6 "
              : "flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 p-4 md:p-6 ") + bodyClassName
        }
      >
        {children}
      </div>
    </>
  );
}

function PageHeaderBar({
  title,
  subtitle,
  actions,
  onBack,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  onBack?: () => void;
}) {
  const { setOpen } = useSidebar();
  return (
    <header className="shrink-0 h-14 flex items-center gap-2 px-3 md:px-6 border-b border-border bg-nav/90 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden shrink-0 h-10 w-10 -ml-1 flex items-center justify-center text-foreground"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
          className="shrink-0 h-9 w-9 -ml-1 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
        >
          <ChevronLeftIcon size={18} />
        </button>
      ) : null}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <h1 className="text-base font-medium text-foreground truncate leading-tight">{title}</h1>
        {subtitle ? (
          <p className="text-xs text-muted-foreground truncate leading-tight">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0 flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
