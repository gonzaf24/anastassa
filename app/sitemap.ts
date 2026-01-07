import { fetchCategoriesData } from '@/app/lib/actions';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || 'https://anastassa.com';

  // Static pages
  const routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  const categories = await fetchCategoriesData();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/${category.name.trim().replace(/\s+/g, '-')}-${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...categoryRoutes];
}
