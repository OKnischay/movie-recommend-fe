import { MovieCarousel } from "@/components/dashboard/user/MovieCarousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, Clock, Users } from "lucide-react"

// Mock data - replace with actual API data
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    genre: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    year: 2010,
    poster: "/placeholder.svg?height=300&width=200",
    matchScore: 94,
    reason: "Based on your love for mind-bending plots",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: ["Action", "Crime"],
    rating: 9.0,
    year: 2008,
    poster: "/placeholder.svg?height=300&width=200",
    matchScore: 92,
    reason: "You rated similar superhero movies highly",
  },
  {
    id: 3,
    title: "Interstellar",
    genre: ["Sci-Fi", "Drama"],
    rating: 8.6,
    year: 2014,
    poster: "/placeholder.svg?height=300&width=200",
    matchScore: 89,
    reason: "Perfect for your sci-fi preferences",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    rating: 8.9,
    year: 1994,
    poster: "/placeholder.svg?height=300&width=200",
    matchScore: 87,
    reason: "Classic that matches your taste",
  },
  {
    id: 5,
    title: "The Matrix",
    genre: ["Sci-Fi", "Action"],
    rating: 8.7,
    year: 1999,
    poster: "/placeholder.svg?height=300&width=200",
    matchScore: 91,
    reason: "Action-packed sci-fi you'll love",
  },
]

export function RecommendationSections() {
  const sections = [
    {
      title: "Perfect Matches for You",
      subtitle: "AI-curated based on your unique taste",
      icon: Sparkles,
      badge: "Personalized",
      movies: mockMovies,
      showMatchScore: true,
    },
    {
      title: "Trending This Week",
      subtitle: "What everyone's watching right now",
      icon: TrendingUp,
      badge: "Hot",
      movies: mockMovies.slice(1),
      showMatchScore: false,
    },
    {
      title: "Recently Added",
      subtitle: "Fresh content just for you",
      icon: Clock,
      badge: "New",
      movies: mockMovies.slice(2),
      showMatchScore: true,
    },
    {
      title: "Because You Watched Inception",
      subtitle: "More mind-bending thrillers",
      icon: Users,
      badge: "Similar",
      movies: mockMovies.slice(0, 3),
      showMatchScore: true,
    },
  ]

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {section.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="group">
              View All
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <MovieCarousel movies={section.movies} showMatchScore={section.showMatchScore} />
        </div>
      ))}
    </div>
  )
}
