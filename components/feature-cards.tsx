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
    title: "Identify any Apple device",
    description:
      "Enter an identifier like iPhone18,3 to get detailed information about the device including model, EMC, and more.",
    tone: "blue",
  },
  {
    icon: <Download className="size-5" aria-hidden="true" />,
    title: "Direct firmware links",
    description:
      "Jump straight to EveryMac, the signed IPSW on IPSW.me, or run advanced checks with FMI in one tap.",
    tone: "green",
  },
  {
    icon: <ShieldCheck className="size-5" aria-hidden="true" />,
    title: "FMI status check",
    description:
      "Run deeper Find My iPhone status and activation lock checks for any supported Apple device.",
    tone: "purple",
  },
]

const TONE_CLASSES: Record<Tone, string> = {
  blue: "bg-tile-blue text-tile-blue-foreground ring-1 ring-inset ring-tile-blue-foreground/15",
  green:
    "bg-tile-green text-tile-green-foreground ring-1 ring-inset ring-tile-green-foreground/15",
  purple:
    "bg-tile-purple text-tile-purple-foreground ring-1 ring-inset ring-tile-purple-foreground/15",
}

const DELAY_CLASSES = ["delay-75", "delay-150", "delay-225"] as const

export function FeatureCards() {
  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature, idx) => (
          <li
            key={feature.title}
            className={cn(
              "glass-panel card-spotlight hover-lift animate-fade-up rounded-2xl border border-border bg-card p-5 sm:p-6",
              DELAY_CLASSES[idx],
            )}
          >
            <div className="flex items-start gap-4">
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm",
                  TONE_CLASSES[feature.tone],
                )}
              >
                {feature.icon}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
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
