'use server';
import { QueryResultRow, sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { CategoryProps, ProductProps } from './definitions';
import { mapProductsDataToProducts } from './mapping-data';

export const fetchCategoriesData = async () => {
  noStore();
  try {
    const data = await sql`SELECT * FROM categories ORDER BY position ASC`;
    return data.rows as CategoryProps[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchProductsData = async () => {
  noStore();
  try {
    const data = await sql`SELECT products.*, categories.name
                            FROM products
                            JOIN categories ON products.category_id = categories.id
                            ORDER BY products.category_id ASC;`;
    const products: ProductProps[] = data.rows.map((row: QueryResultRow) => mapProductsDataToProducts(row));

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};
