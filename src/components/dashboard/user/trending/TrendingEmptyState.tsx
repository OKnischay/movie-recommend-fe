import { TrendingUp, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrendingEmptyStateProps {
  hasMovies: boolean
  onResetFilters: () => void
  onRefresh: () => void
}

export const TrendingEmptyState = ({
  hasMovies,
  onResetFilters,
  onRefresh
}: TrendingEmptyStateProps) => (
  <div className="text-center py-12">
    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-lg font-semibold mb-2">No trending movies found</h3>
    <p className="text-muted-foreground mb-4">
      {hasMovies
        ? "Try adjusting your filters to see more results."
        : "No trending movies available at the moment."}
    </p>
    <div className="flex justify-center space-x-4">
      <Button variant="outline" onClick={onResetFilters}>
        <Filter className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
      <Button onClick={onRefresh}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh Data
      </Button>
    </div>
  </div>
)