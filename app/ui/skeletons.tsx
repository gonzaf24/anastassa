// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton for the menu categories with a custom background color and darker shimmer
export function MenuSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="h-8 w-full p-4 rounded-none bg-[#ef8482] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-600/60 before:to-transparent"
          />
        ))}
    </div>
  );
}

// Skeleton for individual product cards
export function ProductCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex flex-col justify-between overflow-hidden rounded-lg bg-gray-100 p-4 shadow-sm w-[150px] md:w-[225px] h-[250px] md:h-[300px]`}
    >
      <div className="h-[180px] md:h-[220px] w-full bg-gray-200 mb-4" />
      <div className="flex flex-col gap-3">
        <div className="h-4 w-10 bg-gray-200" />
        <div className="h-4 w-3/4 bg-gray-200" />
      </div>
    </div>
  );
}

// Skeleton for the entire product list
export function ProductListSkeleton() {
  return (
    <div className="flex flex-wrap m-auto gap-4 sm:gap-10 justify-center md:justify-start md:items-start">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
}
