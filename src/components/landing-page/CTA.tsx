import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Mail } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Discover Your Next
              <span className="text-primary block">Favorite Movie?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Join thousands of movie enthusiasts who trust our AI-powered recommendations to find their perfect film
              matches.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input type="email" placeholder="Enter your email address" className="pl-10 h-12" />
              </div>
              <Button size="lg" className="h-12 px-8">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">Free to start. No credit card required. Cancel anytime.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold">🎬 Instant Access</h3>
              <p className="text-sm text-muted-foreground">
                Start getting recommendations immediately after signing up
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🤖 Smart Learning</h3>
              <p className="text-sm text-muted-foreground">Our AI gets smarter with every rating and interaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">📱 Cross-Platform</h3>
              <p className="text-sm text-muted-foreground">Access your recommendations on web, mobile, and tablet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
