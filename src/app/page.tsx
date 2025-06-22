import { CTA } from "@/components/landing-page/CTA";
import { Features } from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { Stats } from "@/components/landing-page/Stats";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
