// import React, { useState } from "react";
// import { DashboardMovie } from "@/types/movies";
// import PlaceholderSVG from "./PlaceholderSVG";

// export default function MoviePoster({
//   movie,
//   onError,
//   onLoad,
// }: {
//   movie: DashboardMovie;
//   onError: (id: number) => void;
//   onLoad: (id: number) => void;
// }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   const handleLoad = () => {
//     setIsLoading(false);
//     setHasError(false);
//     onLoad(movie.id);
//   };

//   const handleError = () => {
//     setIsLoading(false);
//     setHasError(true);
//     onError(movie.id);
//   };

//   const valid = movie.poster && !movie.poster.includes("null") && !movie.poster.includes("placeholder");
//   if (!valid || hasError) return <PlaceholderSVG title={movie.title} />;

//   return (
//     <div className="relative w-full h-full">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       )}
//       <img
//         src={movie.poster}
//         alt={movie.title}
//         className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"}`}
//         onLoad={handleLoad}
//         onError={handleError}
//         loading="lazy"
//       />
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import type { DashboardMovie } from "@/types/movies";
import { useState } from "react";

interface MoviePosterProps {
  movie: DashboardMovie;
}

export function MoviePoster({ movie }: MoviePosterProps) {
  const [error, setError] = useState(false);

  if (!movie.poster || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span className="text-xs text-gray-500 text-center px-2">
          {movie.title}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={movie.poster}
      alt={`${movie.title} poster`}
      fill
      className="object-cover"
      onError={() => setError(true)}
      unoptimized={movie.poster.startsWith("http")}
    />
  );
}