import Carousel from "@/components/carousel";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="w-[150px] sm:w-[225px] hover:scale-105 transition-all cursor-pointer">
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
