"use client"

import Link from "next/link"
import { Smartphone } from "lucide-react"
import packageJson from "@/package.json"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const appVersion = `v${packageJson.version}`

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span
            className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-primary/15 via-primary/5 to-transparent text-primary shadow-sm transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <Smartphone className="size-4" />
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-primary/15" />
          </span>
          <span className="text-base sm:text-lg font-display">iDev Lookup</span>
          <span
            className="version-badge-pulse inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-semibold tabular-nums tracking-wide text-primary backdrop-blur-sm dark:border-primary/50 dark:bg-primary/15"
            title={`iDev Lookup ${appVersion}`}
          >
            {appVersion}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle className="inline-flex" />
        </div>
      </div>
    </header>
  )
}
