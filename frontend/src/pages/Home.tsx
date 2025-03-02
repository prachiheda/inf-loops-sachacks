import { RoboAssistant } from "../components/robo-assistant"
import { Features } from "../components/features"
import { HeroSection } from "../components/hero-section"
import { Testimonials } from "../components/testimonials"
import { PricingSection } from "../components/pricing-section"
import { Footer } from "../components/footer"

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Features />
        <RoboAssistant />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
} 