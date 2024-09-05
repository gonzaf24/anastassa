"use client";
import React, { useState } from "react";

import ProductCard from "@/components/product-card";
import { ProductDrawer } from "@/components/product-drawer";
import { ProductsProps } from "@/app/definitions";

export default function ProductList({
  products,
}: {
  products: ProductsProps[];
}) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState<ProductsProps | undefined>(undefined);

  const onProductClick = (product: any) => {
    console.log(product);
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
