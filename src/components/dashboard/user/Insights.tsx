import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, MapPin, TrendingUp, Star } from "lucide-react"

export function AdvancedInsights() {
  // Mock data - replace with actual API data
  const insights = {
    nlpAnalysis: {
      sentimentScore: 0.78,
      dominantEmotions: ["excitement", "nostalgia", "suspense"],
      reviewKeywords: ["cinematography", "plot twist", "character development"],
    },
    filteringBreakdown: {
      collaborative: 45,
      contentBased: 35,
      nlp: 20,
    },
    locationInsights: {
      region: "North America",
      localPreferences: ["Superhero", "Thriller", "Comedy"],
      nearbyTheaters: 12,
    },
    tasteProfile: {
      complexity: "Sophisticated",
      adventurousness: 82,
      genreDiversity: 76,
    },
  }

  return (
    <div className="space-y-6">
      {/* NLP Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Brain className="w-4 h-4 mr-2 text-purple-600" />
            Review Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sentiment Score</span>
              <span className="font-medium">{Math.round(insights.nlpAnalysis.sentimentScore * 100)}%</span>
            </div>
            <Progress value={insights.nlpAnalysis.sentimentScore * 100} className="h-2" />
          </div>

          <div>
            <span className="text-sm font-medium">Key Emotions</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {insights.nlpAnalysis.dominantEmotions.map((emotion) => (
                <Badge key={emotion} variant="secondary" className="text-xs capitalize">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium">Review Keywords</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {insights.nlpAnalysis.reviewKeywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtering Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            Recommendation Mix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collaborative Filtering</span>
              <span className="font-medium">{insights.filteringBreakdown.collaborative}%</span>
            </div>
            <Progress value={insights.filteringBreakdown.collaborative} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Content-Based</span>
              <span className="font-medium">{insights.filteringBreakdown.contentBased}%</span>
            </div>
            <Progress value={insights.filteringBreakdown.contentBased} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>NLP Analysis</span>
              <span className="font-medium">{insights.filteringBreakdown.nlp}%</span>
            </div>
            <Progress value={insights.filteringBreakdown.nlp} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Location Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-green-600" />
            Location Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Region</span>
            <Badge variant="secondary">{insights.locationInsights.region}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Nearby Theaters</span>
            <span className="text-sm font-medium">{insights.locationInsights.nearbyTheaters}</span>
          </div>

          <div>
            <span className="text-sm font-medium">Regional Preferences</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {insights.locationInsights.localPreferences.map((pref) => (
                <Badge key={pref} variant="outline" className="text-xs">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Taste Profile */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-600" />
            Taste Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Complexity</span>
            <Badge variant="secondary">{insights.tasteProfile.complexity}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Adventurousness</span>
              <span className="font-medium">{insights.tasteProfile.adventurousness}%</span>
            </div>
            <Progress value={insights.tasteProfile.adventurousness} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Genre Diversity</span>
              <span className="font-medium">{insights.tasteProfile.genreDiversity}%</span>
            </div>
            <Progress value={insights.tasteProfile.genreDiversity} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
