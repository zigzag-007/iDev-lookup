"use client"

import Link from "next/link"
import { Smartphone } from "lucide-react"
import packageJson from "@/package.json"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const appVersion = `v${packageJson.version}`

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#home"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span
            className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground"
            aria-hidden="true"
          >
            <Smartphone className="size-4" />
          </span>
          <span className="text-base sm:text-lg">iDev Lookup</span>
          <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
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
