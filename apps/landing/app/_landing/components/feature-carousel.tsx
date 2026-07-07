"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Responsive "slides per view" + edge peek fraction. The peek reveals a
// slice of the previous/next card so guests see the row is scrollable.
// Denominator of a slide width = n + 2*peek (n full cards + two peek slivers).
function viewSpec(width: number): { n: number; peek: number } {
  // peek 0 → no half-visible neighbours; show exactly n full cards, navigate
  // with the arrows only.
  if (width >= 1024) return { n: 3, peek: 0 };
  if (width >= 640) return { n: 2, peek: 0 };
  return { n: 1, peek: 0 };
}

const SWIPE_RATIO = 0.18; // drag past this fraction of a slide → advance

interface FeatureCarouselProps {
  /** Pre-rendered feature cards (built on the server so Lucide icon
   *  components never cross the client boundary). */
  cards: ReactNode[];
  /** Aria labels for the arrow buttons (locale chrome could feed these; we
   *  keep sensible English defaults since the admin/UI convention is EN). */
  prevLabel?: string;
  nextLabel?: string;
}

// Infinite, arrow-driven carousel of feature cards. Renders the rows tripled
// ([rows, rows, rows]) and starts in the middle copy, so left/right never hit
// an edge — after each transition we snap the index back into the middle band
// with animation disabled, which is invisible to the eye. Card width + track
// offset are computed in px from the measured viewport so peek/translate stay
// perfectly consistent across breakpoints.
export function FeatureCarousel({
  cards,
  prevLabel = "Previous features",
  nextLabel = "Next features",
}: FeatureCarouselProps) {
  const len = cards.length;
  const all = [...cards, ...cards, ...cards];

  const viewportRef = useRef<HTMLDivElement>(null);
  const [spec, setSpec] = useState<{ n: number; peek: number }>({ n: 1, peek: 0.16 });
  const [slideW, setSlideW] = useState(0);
  // Position within the tripled array; middle copy starts at `len`.
  const [index, setIndex] = useState(len);
  const [anim, setAnim] = useState(true);
  const [drag, setDrag] = useState(0); // live pointer delta in px
  // Progressive enhancement: SSR / no-JS renders a plain responsive grid of
  // all cards (SEO-complete, works with JS disabled or before hydration). Once
  // mounted, we switch to the single-row carousel.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Measure viewport → derive slides-per-view, peek and px slide width. Runs
  // once the carousel markup exists (mounted), and again on resize.
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const s = viewSpec(w);
      setSpec(s);
      setSlideW(w / (s.n + 2 * s.peek));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  const move = useCallback((dir: number) => {
    setAnim(true);
    setIndex((i) => i + dir);
  }, []);

  // After the sliding transition, if we drifted out of the middle copy jump
  // back by one full length with animation off (seamless infinite loop).
  const onTransitionEnd = useCallback(() => {
    setIndex((i) => {
      if (i < len) {
        setAnim(false);
        return i + len;
      }
      if (i >= len * 2) {
        setAnim(false);
        return i - len;
      }
      return i;
    });
  }, [len]);

  // Re-enable animation on the frame after a seamless snap.
  useEffect(() => {
    if (anim) return;
    const id = requestAnimationFrame(() => setAnim(true));
    return () => cancelAnimationFrame(id);
  }, [anim]);

  // Pointer / touch swipe on the viewport.
  const dragState = useRef<{ x: number; active: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { x: e.clientX, active: true };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current?.active) return;
    setAnim(false);
    setDrag(e.clientX - dragState.current.x);
  };
  const endDrag = () => {
    if (!dragState.current?.active) return;
    const d = drag;
    dragState.current = null;
    setDrag(0);
    setAnim(true);
    if (slideW > 0 && Math.abs(d) > slideW * SWIPE_RATIO) {
      move(d < 0 ? 1 : -1);
    }
  };

  // Track offset: shift right by the peek sliver so a neighbour card shows on
  // the left, then slide by index. Add the live drag delta while swiping.
  const offset = -((index - spec.peek) * slideW) + drag;

  // Pre-hydration / no-JS fallback: static responsive grid with every card
  // (same card design, 1/2/3 per row). Also the permanent layout if JS fails.
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {cards.map((card, i) => (
          <div key={i} className="h-full">
            {card}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={viewportRef}
        className="overflow-hidden touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="flex items-stretch"
          style={{
            transform: `translate3d(${offset}px,0,0)`,
            transition: anim ? "transform 450ms cubic-bezier(0.4,0,0.2,1)" : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {all.map((card, i) => (
            <div
              key={i}
              aria-hidden={i < len || i >= len * 2}
              className="shrink-0 box-border px-2 sm:px-3"
              style={slideW > 0 ? { width: slideW } : undefined}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => move(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-border/60 bg-background text-foreground/80 hover:text-foreground hover:ring-border transition-colors active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => move(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-border/60 bg-background text-foreground/80 hover:text-foreground hover:ring-border transition-colors active:scale-95"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
