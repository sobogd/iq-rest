"use client";

import { useSearchParams } from "next/navigation";

interface SkeletonHeaderProps {
  absolute?: boolean;
}

export function SkeletonHeader({ absolute }: SkeletonHeaderProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  return (
    <header
      className={`shrink-0 flex flex-col justify-end px-5 z-10 ${absolute ? "absolute top-0 inset-x-0" : ""}`}
      style={{
        height: isPreview ? 81 : 56,
        paddingTop: isPreview ? 25 : 0,
        backgroundColor: "var(--menu-accent, #000000)",
      }}
    >
      <div className="h-14 max-w-[440px] w-full flex items-center relative mx-auto">
        <div className="h-6 w-6 rounded bg-white/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-24 rounded bg-white/20" />
        </div>
      </div>
    </header>
  );
}
