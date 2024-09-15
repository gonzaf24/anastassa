'use client';
import React, { useState } from 'react';

import ProductCard from '@/app/ui/product-card';
import { ProductDrawer } from '@/app/ui/product-drawer';

export type ProductsProps = {
  id: number;
  photos: string[];
  ref: number;
  title: string;
};

export default function ProductList({
  products,
}: {
  products: ProductsProps[];
}) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<ProductsProps | undefined>(undefined);

  const onProductClick = (product: any) => {
    setProduct(product);
    setOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-4 sm:gap-10">
      {products.map((product) => (
        <ProductCard
          key={product.ref}
          product={product}
          onProductSelect={onProductClick}
        />
      ))}
      {product && (
        <ProductDrawer open={open} product={product} setOpen={setOpen} />
      )}
    </div>
  );
}
