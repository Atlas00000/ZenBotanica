import { Hero } from "@/components/hero"
import { WellnessBenefits } from "@/components/wellness-benefits"
import { EnhancedProductShowcase } from "@/components/enhanced-product-showcase"
import { TeaSelectionGuide } from "@/components/tea-selection-guide"
import { MindfulMoments } from "@/components/mindful-moments"
import { WellnessJourney } from "@/components/wellness-journey"
import { CalmingQuotes } from "@/components/calming-quotes"
import { ProductRecommendations } from "@/components/product-recommendations"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <WellnessBenefits />
      <EnhancedProductShowcase />
      <TeaSelectionGuide />
      <MindfulMoments />
      <WellnessJourney />
      <CalmingQuotes />
      <ProductRecommendations />
      <Footer />
    </main>
  )
}
