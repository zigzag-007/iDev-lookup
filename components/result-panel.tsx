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
    <div className="grid grid-cols-[7rem_1fr] items-center gap-4 py-2 sm:grid-cols-[8rem_1fr]">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-sm font-medium text-foreground break-words">
        {children}
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
        "glass-panel h-full rounded-xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-border pb-3">
        <h2
          id="result-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Result
        </h2>
        {loading ? (
          <Loader2
            className="size-4 animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        ) : null}
      </header>

      {record ? (
        <dl className="divide-y divide-border/60 pt-1">
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
              className="truncate text-foreground hover:text-primary"
              title={record.everyMacUrl}
            >
              {shortHostPath(record.everyMacUrl)}
            </Link>
          </Row>
          <Row label="Firmware">
            <Link
              href={record.signedFirmwareDownloadUrl ?? record.firmwareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              title={record.signedFirmwareDownloadUrl ?? record.firmwareUrl}
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
        <div className="flex h-full min-h-[18rem] items-center justify-center py-10 text-center">
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            {loading
              ? "Resolving identifier…"
              : "Enter an Apple device identifier on the left to see detailed model information here."}
          </p>
        </div>
      )}
    </section>
  )
}
