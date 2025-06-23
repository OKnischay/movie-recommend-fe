import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Clock, Heart, Zap } from "lucide-react"

export function QuickActions() {
  const quickActions = [
    {
      icon: Sparkles,
      title: "Surprise Me",
      description: "Get a random recommendation",
      color: "from-purple-500 to-pink-500",
      badge: "AI Pick",
    },
    {
      icon: TrendingUp,
      title: "What's Hot",
      description: "Trending movies this week",
      color: "from-orange-500 to-red-500",
      badge: "Popular",
    },
    {
      icon: Clock,
      title: "Quick Watch",
      description: "Movies under 90 minutes",
      color: "from-blue-500 to-cyan-500",
      badge: "Short",
    },
    {
      icon: Heart,
      title: "Feel Good",
      description: "Uplifting & positive movies",
      color: "from-green-500 to-emerald-500",
      badge: "Mood",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Zap className="w-3 h-3 mr-1" />
          12 new recommendations
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-muted/50"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {action.badge}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
