import { ProductProps } from './definitions';

// Función para mapear los datos de un lugar a un objeto Place
export const mapProductsDataToProducts = (productsData: any): ProductProps => ({
  id: productsData.id,
  categoryId: productsData.category_id,
  categoryName: productsData.name,
  description: productsData.description,
  photos: productsData?.photos
    ?.toString()
    ?.split(',')
    .map((url: string) => url.trim()),
  ref: productsData.ref,
});
