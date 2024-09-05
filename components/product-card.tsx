import Carousel from "@/components/carousel";

export default function ProductCard({
  product,
  onProductSelect,
}: {
  product: any;
  onProductSelect: any;
}) {
  return (
    <div
      className="z-0 flex flex-col p-0 h-auto gap-0 bg-transparent w-[150px] sm:w-[225px] hover:scale-105 transition-all cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onProductSelect(product)}
      onKeyDown={() => {}}
    >
      <Carousel photos={product.photos} />
      <p className="relative p-2 pt-6 text-tiny font-bold border-2 w-full text-left uppercase text-ellipsis whitespace-nowrap	overflow-hidden">
        {product.title}
        <span className="absolute top-1 left-2 text-tiny text-[#ef8482]">
          ref:{product.ref}
        </span>
      </p>
    </div>
  );
}
