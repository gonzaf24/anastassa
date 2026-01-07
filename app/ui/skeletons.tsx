// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton for the menu categories with a minimalist style
export function MenuSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={`${shimmer} relative h-10 w-full rounded-lg bg-gray-50 overflow-hidden`} />
        ))}
    </div>
  );
}

// Skeleton for individual product cards (Minimalist & Responsive)
export function ProductCardSkeleton() {
  return (
    <div className={`${shimmer} relative flex flex-col gap-0 overflow-hidden bg-transparent w-full`}>
      {/* Image Placeholder - Aspect Ratio 3/4 */}
      <div className="relative w-full aspect-[3/4] bg-gray-100 mb-2 overflow-hidden" />

      {/* Text Placeholders */}
      <div className="flex flex-col gap-2 p-1">
        <div className="h-2 w-10 bg-gray-100 rounded-sm" />
        <div className="h-2 w-3/4 bg-gray-100 rounded-sm" />
      </div>
    </div>
  );
}

// Skeleton for the entire product list (Grid Layout)
export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 w-full">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
}
