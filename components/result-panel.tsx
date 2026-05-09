import * as React from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { type DeviceRecord, shortHostPath } from "@/lib/idevice-data"
import { cn } from "@/lib/utils"

interface ResultPanelProps {
  record: DeviceRecord | null
  loading?: boolean
  className?: string
}

interface RowProps {
  label: string
  children: React.ReactNode
}

function Row({ label, children }: RowProps) {
  return (
    <div className="-mx-2 grid grid-cols-[7rem_1fr] items-center gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-accent/40 sm:grid-cols-[8rem_1fr]">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0 text-sm font-medium text-foreground tabular-nums break-words">
        {children}
      </dd>
    </div>
  )
}

function SkeletonRow({ label, width = "8rem" }: { label: string; width?: string }) {
  return (
    <div className="-mx-2 grid grid-cols-[7rem_1fr] items-center gap-4 px-2 py-2.5 sm:grid-cols-[8rem_1fr]">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="min-w-0">
        <span
          className="skeleton-shimmer block h-3.5 rounded-full"
          style={{ width }}
          aria-hidden="true"
        />
      </dd>
    </div>
  )
}

export function ResultPanel({ record, loading, className }: ResultPanelProps) {
  return (
    <section
      aria-labelledby="result-heading"
      aria-busy={loading || undefined}
      className={cn(
        "glass-panel card-spotlight h-full rounded-2xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              loading
                ? "bg-primary animate-pulse"
                : record
                  ? "bg-success shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                  : "bg-muted-foreground/40",
            )}
            aria-hidden="true"
          />
          <h2
            id="result-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
          >
            Result
          </h2>
        </div>
        {loading ? (
          <Loader2
            className="size-4 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        ) : record ? (
          <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
            Live
          </span>
        ) : null}
      </header>

      {record ? (
        <dl className="divide-y divide-border/40 pt-1">
          <Row label="Device">
            <span className="text-primary">{record.device}</span>
          </Row>
          <Row label="Identifier">
            <span className="font-mono">{record.identifier}</span>
          </Row>
          <Row label="Family">{record.family}</Row>
          <Row label="Model">
            {record.model ? (
              <span className="font-mono text-primary">{record.model}</span>
            ) : (
              <span className="text-muted-foreground">Not detected</span>
            )}
          </Row>
          <Row label="EMC">
            {record.emc ? (
              <span className="font-mono">{record.emc}</span>
            ) : (
              <span className="text-muted-foreground">—</span>
            )}
          </Row>
          <Row label="EveryMac">
            <Link
              href={record.everyMacUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-foreground transition-colors hover:text-primary"
              title={record.everyMacUrl}
            >
              {shortHostPath(record.everyMacUrl)}
            </Link>
          </Row>
          <Row label="Firmware">
            <Link
              href={
                record.signedFirmwareInstallUrl ??
                record.signedFirmwareDownloadUrl ??
                record.firmwareUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:underline"
              title={
                record.signedFirmwareInstallUrl ??
                record.signedFirmwareDownloadUrl ??
                record.firmwareUrl
              }
            >
              {record.signedFirmwareFile ?? `ipsw.me/${record.identifier}/`}
            </Link>
          </Row>
          <Row label="Signed iOS">
            {record.signedIOS ? (
              <span className="text-primary">{record.signedIOS}</span>
            ) : (
              <span className="text-muted-foreground">Not detected</span>
            )}
          </Row>
        </dl>
      ) : loading ? (
        <dl className="divide-y divide-border/40 pt-1">
          <SkeletonRow label="Device" width="9rem" />
          <SkeletonRow label="Identifier" width="6rem" />
          <SkeletonRow label="Family" width="5rem" />
          <SkeletonRow label="Model" width="6rem" />
          <SkeletonRow label="EMC" width="4rem" />
          <SkeletonRow label="EveryMac" width="11rem" />
          <SkeletonRow label="Firmware" width="14rem" />
          <SkeletonRow label="Signed iOS" width="5rem" />
        </dl>
      ) : (
        <div className="flex h-full min-h-[18rem] items-center justify-center py-10 text-center">
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            Enter an Apple device identifier on the left to see detailed model
            information here.
          </p>
        </div>
      )}
    </section>
  )
}
