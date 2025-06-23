import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Zap, Target, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "NLP Review Analysis",
    description:
      "Advanced Natural Language Processing analyzes your written reviews to understand nuanced preferences beyond simple ratings.",
  },
  {
    icon: Target,
    title: "Hybrid Filtering Engine",
    description:
      "Combines Content-Based and Collaborative Filtering for superior accuracy, using both movie attributes and user behavior patterns.",
  },
  {
    icon: Users,
    title: "Collaborative Intelligence",
    description:
      "Learns from users with similar tastes and preferences to discover movies you might have missed but will love.",
  },
  {
    icon: Zap,
    title: "Content-Based Matching",
    description:
      "Analyzes movie attributes like genre, director, cast, and plot themes to find films that match your specific interests.",
  },
  {
    icon: Shield,
    title: "Location-Aware Recommendations",
    description:
      "Considers your location for regional preferences, local cinema availability, and culturally relevant content suggestions.",
  },
  {
    icon: Sparkles,
    title: "Sentiment Understanding",
    description:
      "Goes beyond ratings to understand the emotional context of your reviews and what truly resonates with you.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/50">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Our recommendation system combines cutting-edge AI with user-friendly features to deliver an unparalleled
            movie discovery experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon && <feature.icon className="w-6 h-6 text-primary" />}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
