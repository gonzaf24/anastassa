import { parseCategoryParam } from '@/app/lib/utils';
import CategoryProductsList from '../ui/category-products-list';

const texts = {
  title: 'Anastassa',
  description: 'Ropa de mujer, Montevideo - Canelones - Punta del este, Uruguay',
};

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { textPart } = parseCategoryParam(params.category);
  const title = textPart;
  const description = `${textPart} - ${texts.description}`;
  const image = `${process.env.BASE_URL}/anastassa-logo-alt.png`;
  const url = `${process.env.BASE_URL}/${params.category}`;

  return {
    title: title,
    description: description,
    url: url,
    openGraph: {
      images: [
        {
          url: image,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [
        {
          url: image,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { numberPart, textPart } = parseCategoryParam(params.category);

  return (
    <section className="flex flex-col gap-8 md:gap-12 pb-20 pt-4 md:pt-10 w-full px-4 md:px-0">
      <header className="w-full flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-gray-900">{textPart}</h1>
        <div className="w-12 h-[1px] bg-gray-300"></div>
      </header>
      <CategoryProductsList categoryId={numberPart} />
    </section>
  );
}
