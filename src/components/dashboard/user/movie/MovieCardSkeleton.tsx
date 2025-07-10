import { Card, CardContent } from "@/components/ui/card";

export default function MovieCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-0">
        <div className="aspect-[2/3] bg-muted rounded-lg" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-muted rounded" />
          <div className="h-3 bg-muted rounded w-2/3" />
          <div className="flex gap-1">
            <div className="h-5 bg-muted rounded w-12" />
            <div className="h-5 bg-muted rounded w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
