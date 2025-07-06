import { TrendingUp } from "lucide-react"
import { TrendingFilters } from "./TrendingFilters"
import { TrendingFiltersProps } from "./TrendingFilters"

interface TrendingHeaderProps extends TrendingFiltersProps {
  lastUpdated: Date
}

export const TrendingHeader = ({
  lastUpdated,
  ...filterProps
}: TrendingHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold flex items-center">
        <TrendingUp className="mr-3 h-8 w-8 text-primary" />
        Trending Movies
      </h1>
      <p className="text-muted-foreground mt-2">
        Discover what's popular right now across the platform
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        Last updated: {lastUpdated.toLocaleString()}
      </p>
    </div>
    <TrendingFilters {...filterProps} />
  </div>
)