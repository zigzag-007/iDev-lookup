"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

/**
 * Compact pill-style theme toggle that mirrors the reference image.
 * Two segments: Sun + Moon, with the active one filled.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // Render a stable skeleton during SSR / pre-mount to avoid hydration flicker
  const isDark = mounted ? resolvedTheme === "dark" : false
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark ? "true" : "false"}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative inline-flex h-10 w-[116px] items-center rounded-full border border-border/80 bg-card/80 px-1 text-sm text-foreground shadow-sm backdrop-blur transition-all",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 w-14 rounded-full bg-primary/15 ring-1 ring-primary/20 transition-transform duration-300",
          isDark ? "translate-x-[56px]" : "translate-x-0",
        )}
      />
      <span
        className={cn(
          "relative z-10 flex w-14 items-center justify-center gap-1.5 rounded-full font-medium transition-colors",
          !isDark ? "text-foreground" : "text-muted-foreground",
        )}
        aria-hidden="true"
      >
        <Sun className="size-3.5" />
        <span className="text-xs">Light</span>
      </span>
      <span
        className={cn(
          "relative z-10 flex w-14 items-center justify-center gap-1.5 rounded-full font-medium transition-colors",
          isDark ? "text-foreground" : "text-muted-foreground",
        )}
        aria-hidden="true"
      >
        <Moon className="size-3.5" />
        <span className="text-xs">Dark</span>
      </span>
    </button>
  )
}
