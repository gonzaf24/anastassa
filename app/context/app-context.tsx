'use client';

import { fetchCategoriesData, fetchProductsByCategory, fetchProductsData } from '@/app/lib/actions';
import { CategoryProps, ProductProps } from '@/app/lib/definitions';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

interface AppContextType {
  categories: CategoryProps[];
  isLoadingCategories: boolean;
  refreshCategories: () => Promise<void>;
  products: ProductProps[];
  isLoadingProducts: boolean;
  refreshProducts: () => Promise<void>;
  getCategoryProducts: (categoryId: number) => Promise<ProductProps[]>;
  isLoadingCategoryProducts: boolean;
}

const AppContext = createContext<AppContextType>({
  categories: [],
  isLoadingCategories: false,
  refreshCategories: async () => {},
  products: [],
  isLoadingProducts: false,
  refreshProducts: async () => {},
  getCategoryProducts: async () => [],
  isLoadingCategoryProducts: false,
});

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }
  return context;
};

export const AppProvider: FC<ProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [isLoadingCategoryProducts, setIsLoadingCategoryProducts] = useState<boolean>(false);

  // Función para refrescar las categorías
  const refreshCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const fetchedCategories = await fetchCategoriesData();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Función para refrescar los productos
  const refreshProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const fetchedProducts = await fetchProductsData();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Función para obtener productos por categoría
  const getCategoryProducts = async (categoryId: number): Promise<ProductProps[]> => {
    setIsLoadingCategoryProducts(true);
    try {
      return await fetchProductsByCategory(categoryId);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      return [];
    } finally {
      setIsLoadingCategoryProducts(false);
    }
  };

  // Efecto para cargar las categorías y productos al montar el componente
  useEffect(() => {
    refreshCategories();
    refreshProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        categories,
        isLoadingCategories,
        refreshCategories,
        products,
        isLoadingProducts,
        refreshProducts,
        getCategoryProducts,
        isLoadingCategoryProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
