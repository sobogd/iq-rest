"use client";

export function MenuLoader() {
  const color = "var(--menu-accent, #000000)";

  return (
    <div className="h-dvh flex items-center justify-center bg-white">
      <svg
        className="h-7 w-7 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
