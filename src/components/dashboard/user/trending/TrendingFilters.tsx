import { Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface TrendingFiltersProps {
  loading: boolean
  genreFilter: string
  allGenres: string[]
  onGenreFilterChange: (value: string) => void
  onRefresh: () => void
}

export const TrendingFilters = ({
  loading,
  genreFilter,
  allGenres,
  onGenreFilterChange,
  onRefresh
}: TrendingFiltersProps) => (
  <div className="flex items-center space-x-4">
    <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
      Refresh
    </Button>

    <Select value={genreFilter} onValueChange={onGenreFilterChange}>
      <SelectTrigger className="w-32">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {allGenres.map((genre) => (
          <SelectItem key={genre} value={genre.toLowerCase()}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)