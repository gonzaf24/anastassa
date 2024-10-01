'use client';
import ProductCard from '@/app/ui/product-card';
import { ProductDrawer } from '@/app/ui/product-drawer';
import { useState } from 'react';
import { useAppContext } from '../context/app-context';
import { ProductsProps } from './category-products-list';
import { ProductListSkeleton } from './skeletons';

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const { products, isLoadingProducts } = useAppContext(); // Asumimos que el contexto maneja el estado de carga
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps | undefined>(undefined);

  const onProductClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Mostramos el Skeleton mientras los productos están cargando
  if (isLoadingProducts) {
    return <ProductListSkeleton />;
  }

  // Verifica si el número de productos es impar, y si es así, agrega un producto vacío
  const isImpar = products.length % 2 !== 0;

  // Mostrar la lista de productos cuando la carga haya terminado
  return (
    <div className="flex flex-wrap w-full gap-4 sm:gap-10 justify-center md:justify-start md:items-start">
      {products.map((product) => (
        <ProductCard key={product.ref} product={product} onProductSelect={onProductClick} />
      ))}
      {isImpar && <div className="w-[150px] md:w-[225px]"></div>} {/* Espacio vacío en el grid */}
      {selectedProduct && <ProductDrawer open={open} product={selectedProduct} setOpen={setOpen} />}
    </div>
  );
}
