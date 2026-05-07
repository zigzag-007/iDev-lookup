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
  const label = isDark ? "Dark" : "Light"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
          !isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
        aria-hidden="true"
      >
        <Sun className="size-3.5" />
      </span>
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full transition-colors",
          isDark ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
        aria-hidden="true"
      >
        <Moon className="size-3.5" />
      </span>
      <span className="pr-2">{label}</span>
    </button>
  )
}
