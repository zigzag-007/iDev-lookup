"use client"

import Link from "next/link"
import { Smartphone } from "lucide-react"
import packageJson from "@/package.json"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const appVersion = `v${packageJson.version}`

  return (
    <header className="sticky top-0 z-40 w-full shrink-0 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="group flex items-center gap-2.5 tracking-tight"
        >
          <span
            className="relative flex size-8 items-center justify-center rounded-lg border border-border bg-gradient-to-br from-primary/15 via-primary/5 to-transparent text-primary shadow-sm transition-transform duration-300 group-hover:scale-105 sm:size-9 sm:rounded-xl"
            aria-hidden="true"
          >
            <Smartphone className="size-4" />
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-primary/15" />
          </span>
          <span className="font-display text-base leading-none sm:text-lg">
            <span className="font-bold text-foreground">iDev</span>{" "}
            <span className="text-gradient font-semibold">Lookup</span>
          </span>
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
