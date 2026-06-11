"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle theme" className="border-0 md:border">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      className="border-0 md:border"
    >
      {resolvedTheme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          <span className="sr-only">Switch to light theme</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          <span className="sr-only">Switch to dark theme</span>
        </>
      )}
    </Button>
  );
}
