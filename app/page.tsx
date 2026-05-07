import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LookupSection } from "@/components/lookup-section"
import { FeatureCards } from "@/components/feature-cards"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1">
        <LookupSection />
        <FeatureCards />
      </main>
      <SiteFooter />
    </div>
  )
}
