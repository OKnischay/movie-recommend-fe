import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Film, Clock, Heart, Star, TrendingUp, Calendar, Award, Target, Zap } from "lucide-react"
import { AdvancedInsights } from "./Insights"

export function UserStats() {
  // Mock user data - replace with actual API data
  const userStats = {
    moviesWatched: 127,
    hoursWatched: 284,
    favoriteGenre: "Sci-Fi",
    averageRating: 4.2,
    watchlistCount: 23,
    streak: 7,
    level: "Movie Buff",
    nextLevel: "Cinephile",
    levelProgress: 68,
  }

  const recentActivity = [
    { type: "watched", movie: "Inception", time: "2 hours ago", rating: 5 },
    { type: "added", movie: "The Matrix", time: "1 day ago" },
    { type: "rated", movie: "Interstellar", time: "2 days ago", rating: 4 },
  ]

  const achievements = [
    { name: "First Watch", icon: Film, unlocked: true },
    { name: "Genre Explorer", icon: Target, unlocked: true },
    { name: "Rating Master", icon: Star, unlocked: false },
    { name: "Binge Watcher", icon: Clock, unlocked: true },
  ]

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Alex Johnson</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {userStats.level}
                </Badge>
                <span className="text-xs text-muted-foreground">Level 5</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {userStats.nextLevel}</span>
              <span>{userStats.levelProgress}%</span>
            </div>
            <Progress value={userStats.levelProgress} className="h-2" />
          </div>
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Film className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.moviesWatched}</div>
            <div className="text-xs text-muted-foreground">Movies Watched</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.hoursWatched}h</div>
            <div className="text-xs text-muted-foreground">Hours Watched</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.watchlistCount}</div>
            <div className="text-xs text-muted-foreground">In Watchlist</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Genre */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Your Taste Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Favorite Genre</span>
            <Badge variant="secondary">{userStats.favoriteGenre}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Average Rating</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{userStats.averageRating}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <span className="capitalize">{activity.type}</span>{" "}
                <span className="font-medium">{activity.movie}</span>
                {activity.rating && (
                  <div className="flex items-center space-x-1 ml-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{activity.rating}</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-3 rounded-lg border ${
                  achievement.unlocked ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-muted opacity-50"
                }`}
              >
                <achievement.icon
                  className={`w-6 h-6 mb-1 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="text-xs text-center font-medium">{achievement.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced AI Insights */}
      <AdvancedInsights />
    </div>
  )
}
