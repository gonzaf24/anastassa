'use server';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { CategoryProps } from './definitions';

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
