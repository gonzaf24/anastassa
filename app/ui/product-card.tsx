// ProductCard.tsx

export default function ProductCard({ product, onProductSelect }: { product: any; onProductSelect: any }) {
  // Use a placeholder if no photos or convert to Next/Image safe URL later
  // Ideally, images should work with Next/Image if domain is configured.
  // Using standard img tag fallback if domains aren't set up yet, but let's try to use object-cover
  // and aspect ratio div.

  return (
    <div
      className="group flex flex-col gap-3 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onProductSelect(product)}
      onKeyDown={(e) => e.key === 'Enter' && onProductSelect(product)}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          alt={product.description || 'Prenda'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
          src={product.photos[0]}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 w-full uppercase tracking-wide">
          {product.description}
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest">REF: {product.ref}</p>
      </div>
    </div>
  );
}
