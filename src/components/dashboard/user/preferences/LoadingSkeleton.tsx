import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const GenreCardSkeleton = () => (
  <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card">
    <Skeleton className="h-4 w-4 rounded" />
    <Skeleton className="h-4 w-20" />
  </div>
)

export const PreferencesLoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <main className="container max-w-6xl py-8">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Tab Navigation Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-12 w-64 rounded-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <GenreCardSkeleton key={i} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
)
