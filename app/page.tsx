import ProductList from './ui/product-list';
import { productos } from "@/app/lib/hardcoded-data";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center pb-20 gap-4 py-0 md:pt-0 sm:pr-6">
      <p className="text-lg font-bold border-2 w-full text-center uppercase">
        TODAS LAS PRENDAS
      </p>
      <ProductList products={productos} />
    </section>
  );
}
