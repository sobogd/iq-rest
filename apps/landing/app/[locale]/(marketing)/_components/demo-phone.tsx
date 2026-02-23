"use client";

export function DemoPhone() {
  return (
    <div
      className="relative"
      style={{
        width: "clamp(0px, min(calc(70svh * 8 / 16), 80dvw), 350px)",
        height: "min(70svh, calc(min(80dvw, 350px) * 16 / 8))",
      }}
    >
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] p-2 shadow-2xl">
        <div className="relative w-full h-full bg-[#1a1a1a] rounded-[32px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-10" />

          {/* Screen — scrolling disabled so page scroll works over iframe */}
          <iframe
            src="/m/love-eatery?preview=1"
            scrolling="no"
            className="absolute border-0 origin-top-left"
            style={{
              width: "143%",
              height: "143%",
              transform: "scale(0.7)",
              touchAction: "pan-y",
            }}
            title="Menu Preview"
            loading="lazy"
          />
        </div>
      </div>

      {/* Overlay to hide white edge artifacts */}
      <div
        className="absolute inset-0 rounded-[40px] pointer-events-none z-20"
        style={{
          boxShadow: "inset 0 0 0 10px #1a1a1a",
        }}
      />

      {/* Side buttons - Volume */}
      <div className="absolute left-[-2px] top-[18%] w-[2px] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute left-[-2px] top-[25%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />
      <div className="absolute left-[-2px] top-[35%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />

      {/* Side button - Power */}
      <div className="absolute right-[-2px] top-[28%] w-[2px] h-[12%] bg-[#2a2a2a] rounded-r-sm" />
    </div>
  );
}
