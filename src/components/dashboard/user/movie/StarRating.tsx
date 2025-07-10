import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  rating,
  onRatingChange,
  size = 10,
  interactive = true,
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}) {
  const [hover, setHover] = useState(0);
  const stars = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={(e) => {
            e.stopPropagation();
            if (interactive && onRatingChange) onRatingChange(star);
          }}
          className={`cursor-pointer ${
            star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          }`}
        />
      ))}
    </div>
  );
}
