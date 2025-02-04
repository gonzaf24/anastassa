'use server';

import { signIn } from '@/auth';
import { QueryResultRow, sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { CategoryProps, ProductProps } from './definitions';
import { mapProductsDataToProducts } from './mapping-data';

const CreateCategoryFormSchema = z.object({
  name: z.string().nonempty({
    message: 'Please enter a name.',
  }),
  position: z.string().nonempty({ message: 'Position is required' }),
});

const UpdateCategorySchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  name: z.string().nonempty({
    message: 'Please enter a name.',
  }),
  position: z.string().nonempty({ message: 'Position is required' }),
});

const CreateProductFormSchema = z.object({
  categoryId: z.string().nonempty({
    message: 'Please select a category.',
  }),
  ref: z.string().nonempty({
    message: 'Please enter a reference.',
  }),
  description: z.string().nonempty({ message: 'Description is required' }),
});

// Validación del formulario de actualización de producto
const UpdateProductFormSchema = z.object({
  productId: z.string().nonempty({ message: 'Product ID is required' }),
  categoryId: z.string().nonempty({ message: 'Please select a category.' }),
  ref: z.string().nonempty({ message: 'Please enter a reference.' }),
  description: z.string().nonempty({ message: 'Description is required' }),
});

export type CategoryState = {
  errors?: {
    name?: string[];
    position?: string[];
  };
  message?: string | null;
};

export type ProductState = {
  errors?: {
    categoryId?: string[];
    ref?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function createCategory(prevState: CategoryState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCategoryFormSchema.safeParse({
    name: formData.get('name'),
    position: formData.get('position'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }
  // Prepare data for insertion into the database
  const { name, position } = validatedFields.data;
  // Insert data into the database
  try {
    await sql`
      INSERT INTO categories (name, position)
      VALUES (${name}, ${position})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateCategory(prevState: CategoryState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = UpdateCategorySchema.safeParse({
    name: formData.get('name'),
    position: formData.get('position'),
    id: formData.get('id'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }
  // Prepare data for insertion into the database
  const { name, position, id } = validatedFields.data;
  // Update data in the database
  try {
    await sql`
      UPDATE categories
      SET name = ${name}, position = ${position}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Update Category.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteCategory(id: number) {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Delete Category.',
    };
  }
  revalidatePath('/admin');
  redirect('/admin');
}

export async function createProduct(prevState: ProductState, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateProductFormSchema.safeParse({
    ref: formData.get('ref'),
    description: formData.get('description'),
    categoryId: formData.get('category_id'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const productData = {
    photos: formData.getAll('photos') || '',
  };
  // Prepare data for insertion into the database
  const { ref, description, categoryId } = validatedFields.data;

  const { photos } = productData;
  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (
        category_id, 
        ref, 
        description, 
        photos
      ) VALUES (
        ${categoryId},
        ${ref}, 
        ${description},
        ARRAY[${photos.map((url) => `${url}`).join(',')}]::text[]
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateProduct(prevState: ProductState, formData: FormData) {
  // Validar campos usando Zod
  const validatedFields = UpdateProductFormSchema.safeParse({
    productId: formData.get('product_id') as string, // Asegúrate de que es string
    categoryId: formData.get('category_id') as string, // Convertir a string
    ref: formData.get('ref') as string, // Convertir a string
    description: formData.get('description') as string, // Convertir a string
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    };
  }

  const productData = {
    photos: formData.getAll('photos') as string[], // Convertir a array de strings
  };

  const { productId, categoryId, ref, description } = validatedFields.data;
  const { photos } = productData;

  try {
    // Actualizar el producto
    await sql`
      UPDATE products
      SET category_id = ${categoryId}, 
          ref = ${ref}, 
          description = ${description},
          photos = CASE
            WHEN ${photos.length} = 0 THEN NULL
            ELSE ARRAY[${photos.map((url) => `${url}`).join(',')}]::text[]
          END
      WHERE id = ${productId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }

  // Revalidar la caché y redirigir
  revalidatePath('/admin');
  redirect('/admin');
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function deleteProduct(productId: number) {
  try {
    await sql`DELETE FROM products WHERE id = ${productId}`;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Delete Product.',
    };
  }
  revalidatePath('/admin');
  redirect('/admin');
}

export const fetchCategoriesData = async () => {
  try {
    const data = await sql`SELECT * FROM categories ORDER BY position ASC`;
    return data.rows as CategoryProps[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchProductsData = async () => {
  try {
    const data = await sql`SELECT products.*, categories.name
                            FROM products
                            JOIN categories ON products.category_id = categories.id
                            ORDER BY products.category_id ASC , products.ref ASC`;
    const products: ProductProps[] = data.rows.map((row: QueryResultRow) => mapProductsDataToProducts(row));

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (categoryId: number) => {
  try {
    const data = await sql`SELECT products.*, categories.name
                            FROM products
                            JOIN categories ON products.category_id = categories.id
                            WHERE products.category_id = ${categoryId}
                            ORDER BY products.ref ASC`;
    const products: ProductProps[] = data.rows.map((row: QueryResultRow) => mapProductsDataToProducts(row));
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
};
