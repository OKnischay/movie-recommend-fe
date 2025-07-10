export default function PlaceholderSVG({ title }: { title?: string }) {
  return (
    <svg width="300" height="450" viewBox="0 0 300 450" className="w-full h-full object-cover">
      <rect width="300" height="450" fill="#e5e5e5" />
      <text x="150" y="200" textAnchor="middle" fill="#666" fontSize="14" fontFamily="Arial">No Poster</text>
      <text x="150" y="220" textAnchor="middle" fill="#666" fontSize="12" fontFamily="Arial">Available</text>
      <text x="150" y="250" textAnchor="middle" fill="#888" fontSize="10" fontFamily="Arial">
        {title ? (title.length > 20 ? title.substring(0, 20) + "..." : title) : "Movie Title"}
      </text>
    </svg>
  );
}