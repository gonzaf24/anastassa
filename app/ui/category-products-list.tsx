'use client';
import ProductCard from '@/app/ui/product-card';
import { ProductDrawer } from '@/app/ui/product-drawer';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/app-context';
import { ProductProps } from '../lib/definitions';
import { ProductListSkeleton } from './skeletons';

export type ProductsProps = {
  id: number;
  photos: string[];
  ref: number;
  categoryId: number;
  description: string;
};

export default function CategoryProductsList({ categoryId }: { categoryId: number }) {
  const [open, setOpen] = useState(false);
  const { getCategoryProducts, isLoadingCategoryProducts } = useAppContext(); // Asumimos que el contexto maneja el estado de carga
  const [selectedPoduct, setSelectedProduct] = useState<ProductsProps | undefined>(undefined);
  const [categoryProducts, setCategoryProducts] = useState<ProductProps[]>([]);

  // Cargar los productos de la categoría
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const products = await getCategoryProducts(categoryId);
        setCategoryProducts(products);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };
    fetchCategoryProducts();
  }, [categoryId]);

  const onProductClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Mostramos el Skeleton mientras los productos están cargando
  if (isLoadingCategoryProducts) {
    return (
      <div className="flex flex-wrap sm:gap-10 justify-center items-center md:justify-start md:items-start">
        <ProductListSkeleton />
      </div>
    );
  }

  // Verifica si el número de productos es impar, y si es así, agrega un producto vacío
  const isImpar = categoryProducts.length % 2 !== 0;

  // Mostrar la lista de productos cuando la carga haya terminado
  return (
    <div className="flex flex-wrap w-full gap-4 sm:gap-10 justify-center items-center md:justify-start md:items-start">
      {categoryProducts.map((product) => (
        <ProductCard key={product.ref} product={product} onProductSelect={onProductClick} />
      ))}
      {isImpar && <div className="w-[150px] md:w-[225px]"></div>}
      {selectedPoduct && <ProductDrawer open={open} product={selectedPoduct} setOpen={setOpen} />}
    </div>
  );
}
