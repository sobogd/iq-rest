import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  notch?: boolean;
}

const DESIGN_WIDTH = 350;
const DESIGN_HEIGHT = 667;
const BEZEL_PX = (DESIGN_WIDTH * 2.5) / 100;
const OUTER_WIDTH = DESIGN_WIDTH + 2 * BEZEL_PX;
const OUTER_HEIGHT = DESIGN_HEIGHT + 2 * BEZEL_PX;
const BEZEL_CQW = (BEZEL_PX / OUTER_WIDTH) * 100;

export function PhoneFrame({ children, className = "", notch = false }: PhoneFrameProps) {
  const inset = `${BEZEL_CQW}cqw`;
  const hasPosition = /(?:^|\s)(absolute|fixed|sticky|relative)(?:\s|$)/.test(className);
  return (
    <div
      className={`${hasPosition ? "" : "relative"} ${className}`}
      style={{ aspectRatio: `${OUTER_WIDTH} / ${OUTER_HEIGHT}`, containerType: "inline-size" }}
      data-nosnippet
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-[14%/8%] bg-black"
        style={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06)" }}
      />
      <div
        className="absolute overflow-hidden bg-white rounded-[12%/7%]"
        style={{
          top: inset,
          bottom: inset,
          left: inset,
          right: inset,
          containerType: "inline-size",
          isolation: "isolate",
          transform: "translateZ(0)",
        }}
      >
        <div
          className="absolute origin-top-left [--bleed:0px] sm:[--bleed:2px]"
          style={{
            top: "calc(var(--bleed) * -1)",
            left: "calc(var(--bleed) * -1)",
            width: `calc(${DESIGN_WIDTH}px + 2 * var(--bleed))`,
            height: `calc(${DESIGN_HEIGHT}px + 2 * var(--bleed))`,
            transform: `scale(calc(100cqw / ${DESIGN_WIDTH}px))`,
          }}
        >
          {children}
        </div>
        {notch ? (
          <div
            className="absolute top-[1.4%] left-1/2 -translate-x-1/2 z-[60] bg-black rounded-full"
            style={{ width: "32%", height: "4%" }}
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}
