import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Heart, Cpu, Film } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and tell us about your favorite genres, actors, and movies you've enjoyed.",
  },
  {
    icon: Heart,
    step: "02",
    title: "Rate & Review",
    description: "Rate movies you've watched and our algorithm learns your unique taste preferences.",
  },
  {
    icon: Cpu,
    step: "03",
    title: "AI Analysis",
    description: "Our advanced algorithm processes your data and finds patterns in your viewing behavior.",
  },
  {
    icon: Film,
    step: "04",
    title: "Get Recommendations",
    description: "Receive personalized movie suggestions that match your taste and current mood.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Our intelligent recommendation system works in four simple steps to understand your preferences and deliver
            perfect movie matches.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Badge variant="secondary" className="mb-4 text-sm font-semibold">
                    {step.step}
                  </Badge>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
