"use client"

import * as React from "react"
import Link from "next/link"
import {
  CheckCircle2,
  Copy,
  Download,
  Heart,
  Loader2,
  Monitor,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react"
import {
  EXAMPLE_IDENTIFIERS,
  FMI_CHECKER_URL,
  type DeviceRecord,
  lookupDevice,
} from "@/lib/idevice-data"
import { ResultPanel } from "@/components/result-panel"
import { cn } from "@/lib/utils"

type Status =
  | { kind: "idle" }
  | { kind: "loading"; identifier: string }
  | { kind: "success"; record: DeviceRecord }
  | { kind: "copied"; record: DeviceRecord; value: string }
  | { kind: "error"; message: string }

const INITIAL_QUERY = "iPhone18,3"

export function LookupSection() {
  const [query, setQuery] = React.useState(INITIAL_QUERY)
  const [record, setRecord] = React.useState<DeviceRecord | null>(null)
  const [status, setStatus] = React.useState<Status>({ kind: "idle" })

  const inputRef = React.useRef<HTMLInputElement>(null)
  const abortRef = React.useRef<AbortController | null>(null)
  const copyResetRef = React.useRef<number | null>(null)

  const performLookup = React.useCallback(async (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      setStatus({ kind: "error", message: "Enter an identifier to look up." })
      setRecord(null)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus({ kind: "loading", identifier: trimmed })

    try {
      const result = await lookupDevice(trimmed, controller.signal)
      if (controller.signal.aborted) return
      setRecord(result)
      setStatus({ kind: "success", record: result })
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return
      setRecord(null)
      setStatus({
        kind: "error",
        message:
          (err as Error)?.message ?? "Lookup failed. Please try again.",
      })
    }
  }, [])

  React.useEffect(() => {
    void performLookup(INITIAL_QUERY)
    return () => {
      abortRef.current?.abort()
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current)
      }
    }
  }, [performLookup])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void performLookup(query)
  }

  const handleClear = () => {
    abortRef.current?.abort()
    setQuery("")
    setRecord(null)
    setStatus({ kind: "idle" })
    inputRef.current?.focus()
  }

  const handleCopy = async () => {
    if (!record?.model) return
    try {
      await navigator.clipboard.writeText(record.model)
      setStatus({ kind: "copied", record, value: record.model })
      if (copyResetRef.current !== null) {
        window.clearTimeout(copyResetRef.current)
      }
      copyResetRef.current = window.setTimeout(() => {
        setStatus({ kind: "success", record })
        copyResetRef.current = null
      }, 1800)
    } catch {
      setStatus({
        kind: "error",
        message: "Could not copy to clipboard.",
      })
    }
  }

  const isLoading = status.kind === "loading"
  const canCopy = !!record?.model && !isLoading

  return (
    <section
      id="home"
      aria-labelledby="lookup-heading"
      className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-5"
    >
      {/* Hero */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
            <Sparkles className="size-3" aria-hidden="true" />
            Apple device intelligence
          </span>
          <h1
            id="lookup-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance"
          >
            iDev <span className="text-gradient">Lookup</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base text-pretty leading-relaxed">
            Resolve identifiers like{" "}
            <span className="font-mono text-foreground/90">iPhone18,3</span>{" "}
            and jump straight to firmware tools, EveryMac, and FMI checks.
          </p>
        </div>
        <p className="inline-flex w-fit animate-fade-up items-center gap-1.5 self-start rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm sm:self-auto delay-150">
          <span className="uppercase tracking-wide text-[10px] text-muted-foreground/80">
            Crafted by
          </span>
          <span className="font-semibold text-foreground">Zig Zag</span>
          <Heart className="author-heart-glow size-3 text-rose-500" aria-hidden="true" />
        </p>
      </div>

      {/* Two-column grid */}
      <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: form + actions */}
        <div className="flex flex-col gap-4 animate-fade-up delay-75">
          <form
            onSubmit={handleSubmit}
            className="glass-panel card-spotlight rounded-2xl border border-border bg-card p-5 sm:p-6"
            noValidate
          >
            <label
              htmlFor="identifier-input"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Identifier
            </label>

            <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-stretch">
              <div className="relative min-w-0 flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  id="identifier-input"
                  name="identifier"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. iPhone18,3"
                  aria-describedby="identifier-help"
                  className="w-full rounded-xl border border-border bg-background/80 py-3 pl-10 pr-3 font-mono text-sm text-foreground shadow-sm outline-none ring-ring/50 transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cta-sheen inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_rgba(59,130,246,0.55)] transition-all hover:bg-primary/90 hover:shadow-[0_10px_28px_-8px_rgba(59,130,246,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70 xl:flex-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Looking…</span>
                    </>
                  ) : (
                    "Look Up"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-all hover:bg-accent hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:flex-none"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!canCopy}
                  className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-all hover:bg-accent hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 xl:flex-none"
                  aria-label="Copy model number to clipboard"
                >
                  <Copy className="size-3.5" aria-hidden="true" />
                  Copy Model
                </button>
              </div>
            </div>

            <div
              id="identifier-help"
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground"
            >
              <span className="text-muted-foreground/80">Try:</span>
              {EXAMPLE_IDENTIFIERS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setQuery(id)
                    void performLookup(id)
                  }}
                  className="rounded-full border border-border/60 bg-background/40 px-2.5 py-0.5 font-mono text-[11px] text-foreground/80 transition-all hover:border-primary/50 hover:bg-primary/8 hover:text-primary"
                >
                  {id}
                </button>
              ))}
            </div>
          </form>

          {/* Status banner */}
          <StatusBanner status={status} />

          {/* Quick action tiles */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <QuickAction
              href={record?.everyMacUrl}
              icon={<Monitor className="size-4" aria-hidden="true" />}
              label="EveryMac Page"
              disabled={!record}
            />
            <QuickAction
              href={record?.firmwareUrl}
              icon={<Download className="size-4" aria-hidden="true" />}
              label="Firmware Page"
              disabled={!record}
            />
            <QuickAction
              href={FMI_CHECKER_URL}
              icon={<ShieldCheck className="size-4" aria-hidden="true" />}
              label="FMI Checker"
            />
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Open in browser for deeper checks.
          </p>
        </div>

        {/* Right: result panel */}
        <div className="animate-fade-up delay-150">
          <ResultPanel record={record} loading={isLoading} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Sub-components ---------- */

function StatusBanner({ status }: { status: Status }) {
  if (status.kind === "idle") return null

  if (status.kind === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="glass-panel animate-scale-in flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
      >
        <Loader2
          className="size-5 shrink-0 animate-spin text-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-foreground">
          Looking up{" "}
          <span className="font-mono text-foreground/90">
            {status.identifier}
          </span>
          …
        </p>
      </div>
    )
  }

  if (status.kind === "success" || status.kind === "copied") {
    const isCopy = status.kind === "copied"
    return (
      <div
        role="status"
        aria-live="polite"
        className="glass-panel animate-scale-in flex items-center gap-3 rounded-xl border border-success/30 bg-card px-4 py-3"
      >
        <CheckCircle2
          className="size-5 shrink-0 text-success"
          aria-hidden="true"
        />
        <p className="text-sm text-foreground">
          {isCopy ? (
            <>
              Copied{" "}
              <span className="font-mono font-medium text-success">
                {status.value}
              </span>{" "}
              to clipboard.
            </>
          ) : (
            <>
              Lookup complete for:{" "}
              <span className="font-medium text-success">
                {status.record.device}
              </span>
            </>
          )}
        </p>
      </div>
    )
  }

  return (
    <div
      role="alert"
      className="animate-scale-in flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3"
    >
      <XCircle
        className="mt-0.5 size-5 shrink-0 text-destructive"
        aria-hidden="true"
      />
      <p className="text-sm text-foreground">{status.message}</p>
    </div>
  )
}

function QuickAction({
  href,
  icon,
  label,
  disabled,
}: {
  href: string | undefined
  icon: React.ReactNode
  label: string
  disabled?: boolean
}) {
  const className = cn(
    "glass-panel card-spotlight hover-lift inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground shadow-sm transition-colors",
    disabled || !href
      ? "cursor-not-allowed opacity-50"
      : "hover:bg-accent/60 hover:text-foreground",
  )

  if (disabled || !href) {
    return (
      <span aria-disabled="true" className={className}>
        {icon}
        {label}
      </span>
    )
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {icon}
      {label}
    </Link>
  )
}
