import { TrendingUp, Globe, Clock } from "lucide-react"
import { TrendingStatCard } from "./TrendingStatsCard"
import { TrendingStats } from "@/types/movies"

interface TrendingStatsProps {
  stats: TrendingStats
}

export const TrendingStatistics = ({ stats }: TrendingStatsProps) => (
  <div className="grid gap-4 md:grid-cols-4 py-6">
    {/* <TrendingStatCard
      title="Total Views"
      value={stats.totalViews}
      description="This week"
      icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
    /> */}
    <TrendingStatCard
      title="Average Rating"
      value={stats.avgRating}
      description="Trending movies"
      icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
    />
    <TrendingStatCard
      title="Top Genre"
      value={stats.topGenre}
      description="Most popular"
      icon={<Globe className="h-4 w-4 text-muted-foreground" />}
    />
    <TrendingStatCard
      title="Trending Movies"
      value={stats.moviesCount.toString()}
      description="In current view"
      icon={<Clock className="h-4 w-4 text-muted-foreground" />}
    />
  </div>
)