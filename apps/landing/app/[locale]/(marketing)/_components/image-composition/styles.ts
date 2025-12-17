// Shared shadow styles for image compositions
export const SHADOW_STYLES = {
  main: "drop-shadow(0 25px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 10px rgba(0,0,0,0.25))",
  side: "drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 6px 6px rgba(0,0,0,0.2))",
  duo: "drop-shadow(0 15px 25px rgba(0,0,0,0.35)) drop-shadow(0 8px 8px rgba(0,0,0,0.2))",
} as const;

// Base classes for GPU-accelerated animations
export const ANIMATION_BASE = "will-change-transform";
