import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StarRating from "./StarRating";
import { DashboardMovie } from "@/types/movies";

export default function MovieRatingDialog({
  open,
  onClose,
  onSubmit,
  movie,
  userRating,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  movie: DashboardMovie;
  userRating: number;
}) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate "{movie.title}"</DialogTitle>
          <DialogDescription>How would you rate this movie?</DialogDescription>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center space-y-4">
          <StarRating rating={userRating} onRatingChange={onSubmit} size={32} />
          <p className="text-sm text-muted-foreground">Click on a star to rate this movie</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
