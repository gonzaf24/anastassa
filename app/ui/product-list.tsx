'use client';
// ProductList.tsx
import ProductCard from '@/app/ui/product-card';
import { ProductDrawer } from '@/app/ui/product-drawer';
import { useState } from 'react';
import { useAppContext } from '../context/app-context';
import { ProductsProps } from './category-products-list';
import { ProductListSkeleton } from './skeletons';

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const { products, isLoadingProducts } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps | undefined>(undefined);

  const onProductClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  if (isLoadingProducts) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.ref} product={product} onProductSelect={onProductClick} />
        ))}
      </div>
      {selectedProduct && <ProductDrawer open={open} product={selectedProduct} setOpen={setOpen} />}
    </div>
  );
}
