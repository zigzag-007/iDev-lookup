import * as React from "react"
import { Download, Search, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "blue" | "green" | "purple"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  tone: Tone
}

const FEATURES: Feature[] = [
  {
    icon: <Search className="size-5" aria-hidden="true" />,
    title: "Identify Any iDevice",
    description:
      "Enter an identifier like iPhone9,2 to get detailed information about the device including model, EMC, and more.",
    tone: "blue",
  },
  {
    icon: <Download className="size-5" aria-hidden="true" />,
    title: "Direct Links",
    description:
      "Jump directly to EveryMac, firmware files on IPSW.me, or run advanced checks with FMI.",
    tone: "green",
  },
  {
    icon: <ShieldCheck className="size-5" aria-hidden="true" />,
    title: "FMI Checker",
    description:
      "Run deeper checks on your device using the FMI Checker for more technical details.",
    tone: "purple",
  },
]

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-tile-blue text-tile-blue-foreground",
  green: "bg-tile-green text-tile-green-foreground",
  purple: "bg-tile-purple text-tile-purple-foreground",
}

export function FeatureCards() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="rounded-xl border border-border bg-card p-5 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-lg",
                  TONE_CLASSES[feature.tone],
                )}
              >
                {feature.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty">
                  {feature.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
