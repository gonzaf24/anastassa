// import { db } from '@vercel/postgres';
// import bcrypt from 'bcrypt';
// import { CategoriesData, ProductsData } from '../lib/hardcoded-data';
// import { users } from '../lib/placeholder-data';

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//      CREATE TABLE IF NOT EXISTS users (
//        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//        name VARCHAR(255) NOT NULL,
//        email TEXT NOT NULL UNIQUE,
//        password TEXT NOT NULL
//      );
//    `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//          INSERT INTO users (id, name, email, password)
//          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//          ON CONFLICT (id) DO NOTHING;
//        `;
//     })
//   );

//   return insertedUsers;
// }

// async function seedCategories() {
//   try {
//     // Crear la secuencia "categories_id_seq" si no existe
//     const createIdSequence = await client.sql`
//     CREATE SEQUENCE categories_id_seq
//     INCREMENT 1
//     MINVALUE 100
//     MAXVALUE 999999
//     START 100
//     CACHE 1;
//   `;

//     // Crear la tabla "categories" si no existe
//     const createCategoryTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS categories (
//       id INTEGER DEFAULT nextval('categories_id_seq') PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       position INTEGER NOT NULL
//     );
//   `;

//     console.log(`Created "categories" table`);

//     // Insertar datos en la tabla "categories"
//     const insertedCategories = await Promise.all(
//       CategoriesData.map(async (category) => {
//         return client.sql`
//           INSERT INTO categories (name , position)
//           VALUES (
//             ${category.name},
//             ${category.position}
//           )
//           ON CONFLICT (id) DO NOTHING;
//           `;
//       })
//     );

//     console.log(`Seeded ${insertedCategories.length} categories`);

//     return {
//       createIdSequence,
//       createCategoryTable,
//     };
//   } catch (error) {
//     console.error('Error creating tables:', error);
//     throw error;
//   }
// }

// async function seedProducts() {
//   try {
//     // Crear la secuencia "custom_id_seq" si no existe
//     const createIdSequence = await client.sql`
//     CREATE SEQUENCE product_id_seq
//     INCREMENT 1
//     MINVALUE 1000
//     MAXVALUE 999999
//     START 1000
//     CACHE 1;
//   `;

//     // Crear la tabla "products" si no existe
//     const createProductTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS products (
//       id INTEGER DEFAULT nextval('product_id_seq') PRIMARY KEY,
//       category_id INTEGER REFERENCES categories(id),
//       description TEXT,
//       ref INTEGER NOT NULL,
//       photos TEXT[],
//       date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//     console.log(`Created "products" table`);

//     // Insertar datos en la tabla "products"
//     const insertedProducts = await Promise.all(
//       ProductsData.map(async (product) => {
//         return client.sql`
//           INSERT INTO products (category_id, description, ref, photos)
//           VALUES (
//             ${product.categoryId},
//             ${product.description},
//             ${product.ref},
//             ARRAY[${product.photos.map((photo) => `'${photo}'`).join(', ')}]::TEXT[]
//           )
//           ON CONFLICT (id) DO NOTHING;
//           `;
//       })
//     );

//     console.log(`Seeded ${insertedProducts.length} products`);

//     return {
//       createIdSequence,
//       createProductTable,
//     };
//   } catch (error) {
//     console.error('Error creating tables:', error);
//     throw error;
//   }
// }

// export async function GET() {
//   /*  return Response.json({
//     message:
//       'Uncomment this file and remove this line. You can delete this file when you are finished.',
//   }); */
//   try {
//     await client.sql`BEGIN`;
//     await seedUsers();
//     await seedCategories();
//     await seedProducts();
//     await client.sql`COMMIT`;

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }
