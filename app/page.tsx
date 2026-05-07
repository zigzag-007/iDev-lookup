import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LookupSection } from "@/components/lookup-section"
import { FeatureCards } from "@/components/feature-cards"

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute top-64 -left-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[110px]" />
      </div>
      <SiteHeader />
      <main id="main" className="flex-1">
        <LookupSection />
        <FeatureCards />
      </main>
      <SiteFooter />
    </div>
  )
}
