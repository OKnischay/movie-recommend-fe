import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Zap, Target, Shield, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart AI Algorithm",
    description:
      "Advanced machine learning models analyze your preferences and viewing patterns to deliver highly accurate recommendations.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Our algorithm considers genre preferences, mood, ratings, and even the time of day to suggest the perfect movie.",
  },
  {
    icon: Users,
    title: "Social Integration",
    description:
      "Connect with friends, see what they're watching, and get recommendations based on your social circle's preferences.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Recommendations update instantly as you rate movies, ensuring your suggestions get better with every interaction.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data is encrypted and secure. We never share your viewing habits or personal information with third parties.",
  },
  {
    icon: Sparkles,
    title: "Mood-Based Suggestions",
    description: "Tell us your mood, and we'll recommend movies that perfectly match how you're feeling right now.",
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
                  <feature.icon className="w-6 h-6 text-primary" />
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
