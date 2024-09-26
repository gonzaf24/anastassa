import { fetchCategoriesData, fetchProductsData } from '@/app/lib/data';
import Tabs from '@/app/ui/admin/tabs';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  const categories = await fetchCategoriesData();
  const products = await fetchProductsData();

  return (
    <main className="w-full">
      <p className="text-lg font-bold border-2 w-full text-center uppercase mb-4">ADMINISTRACION</p>
      <Tabs categories={categories} products={products} />
    </main>
  );
}
