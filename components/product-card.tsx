export default function ProductCard({
  product,
  onProductSelect,
}: {
  product: any;
  onProductSelect: any;
}) {
  return (
    <div
      className="z-0 m-auto flex flex-col p-0 h-auto gap-0 bg-transparent w-[150px] sm:w-[225px] sm:hover:scale-105 sm:transition-all cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => onProductSelect(product)}
      onKeyDown={() => {}}
    >
      <img
        alt="Imagen prenda"
        className="min-h-[250px] sm:min-h-[400px] h-auto w-full object-cover rounded-t-lg border-none border-opacity-10 shadow-inner shadow-slate-700 focus-within:outline-none"
        src={product.photos[0]}
      />
      <div className="flex flex-col gap-2 border-2 p-2 border-t-0">
        <p className="uppercase font-bold text-tiny text-[#ef8482]">
          REF: {product.ref}
        </p>
        <p className="text-tiny font-bold w-full text-left uppercase text-ellipsis whitespace-nowrap	overflow-hidden">
          {product.title}
        </p>
      </div>
    </div>
  );
}
