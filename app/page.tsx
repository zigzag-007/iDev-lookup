import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LookupSection } from "@/components/lookup-section"
import { FeatureCards } from "@/components/feature-cards"
import { CursorGlow } from "@/components/cursor-glow"

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="ambient-grid pointer-events-none absolute inset-0 -z-10 opacity-80"
      />
      <div
        aria-hidden="true"
        className="ambient-aurora pointer-events-none absolute inset-0 -z-10 opacity-90"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-[120px]" />
        <div className="absolute top-64 -left-20 h-80 w-80 rounded-full bg-violet-500/12 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-cyan-400/12 blur-[120px]" />
      </div>
      <CursorGlow />
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col">
        <LookupSection />
        <FeatureCards />
      </main>
      <SiteFooter />
    </div>
  )
}
