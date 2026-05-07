"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Smartphone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#everymac", label: "EveryMac" },
  { href: "#firmware", label: "Firmware" },
  { href: "#fmi", label: "FMI Checker" },
  { href: "#about", label: "About" },
] as const

export function SiteHeader() {
  const [active, setActive] = React.useState<string>("#home")
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="#home"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={() => setActive("#home")}
        >
          <span
            className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground"
            aria-hidden="true"
          >
            <Smartphone className="size-4" />
          </span>
          <span className="text-base sm:text-lg">iDev Lookup</span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden md:flex md:flex-1 md:items-center md:justify-center"
        >
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen ? "true" : "false"}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActive(link.href)
                      setMobileOpen(false)
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-2 sm:hidden">
              <ThemeToggle className="w-full justify-center" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
