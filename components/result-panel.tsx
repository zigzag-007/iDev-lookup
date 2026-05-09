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

const SKELETON_WIDTHS: Record<string, string> = {
  Device: "w-36",
  Identifier: "w-24",
  Family: "w-20",
  Model: "w-24",
  EMC: "w-16",
  EveryMac: "w-44",
  Firmware: "w-56",
  "Signed iOS": "w-20",
}

const ROW_CLASS =
  "-mx-2 grid grid-cols-[7rem_1fr] items-center gap-3 px-2 py-[0.4375rem] sm:grid-cols-[8rem_1fr] sm:gap-4"
const DT_CLASS =
  "text-xs font-medium uppercase tracking-wider text-muted-foreground"

function Row({ label, children }: RowProps) {
  return (
    <div className={cn(ROW_CLASS, "rounded-lg transition-colors hover:bg-accent/40")}>
      <dt className={DT_CLASS}>{label}</dt>
      <dd className="min-w-0 flex h-[1.3125rem] items-center text-sm font-medium text-foreground tabular-nums break-words">
        {children}
      </dd>
    </div>
  )
}

function SkeletonRow({ label }: { label: string }) {
  const w = SKELETON_WIDTHS[label] ?? "w-32"
  return (
    <div className={ROW_CLASS}>
      <dt className={DT_CLASS}>{label}</dt>
      <dd className="min-w-0 flex h-[1.3125rem] items-center">
        <span
          className={cn("skeleton-shimmer block h-3.5 rounded-full", w)}
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
      className={cn(
        "glass-panel card-spotlight flex h-full min-h-[24rem] flex-col rounded-2xl border border-border bg-card p-4 sm:p-5",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-border/70 pb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full transition-colors",
              loading
                ? "animate-pulse bg-primary"
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
        <div className="flex h-5 items-center">
          {loading ? (
            <Loader2
              className="size-4 animate-spin text-muted-foreground"
              aria-hidden="true"
            />
          ) : record ? (
            <span className="inline-flex h-5 items-center rounded-full border border-success/30 bg-success/10 px-2 text-[10px] font-semibold uppercase tracking-wider text-success">
              Live
            </span>
          ) : null}
        </div>
      </header>

      {loading ? (
        <dl className="divide-y divide-border/40 pt-1">
          <SkeletonRow label="Device" />
          <SkeletonRow label="Identifier" />
          <SkeletonRow label="Family" />
          <SkeletonRow label="Model" />
          <SkeletonRow label="EMC" />
          <SkeletonRow label="EveryMac" />
          <SkeletonRow label="Firmware" />
          <SkeletonRow label="Signed iOS" />
        </dl>
      ) : record ? (
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
      ) : (
        <div className="flex flex-1 items-center justify-center py-6 text-center">
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            Enter an Apple device identifier on the left to see detailed model
            information here.
          </p>
        </div>
      )}
    </section>
  )
}
