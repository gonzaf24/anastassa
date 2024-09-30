import { parseCategoryParam } from '@/app/lib/utils';
import CategoryProductsList from '../ui/category-products-list';

const texts = {
  title: 'Anastassa',
  description: 'Ropa de mujer, Uruguay',
};

export async function generateMetadata({ params }: { params: { category: string } }) {
  const { numberPart, textPart } = parseCategoryParam(params.category);
  const descriptionText = texts.description;
  const title = texts.title;
  const description = `${textPart} - ${descriptionText}`;
  const image = `${process.env.BASE_URL}/opengraph_image.png`;
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

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { numberPart, textPart } = parseCategoryParam(params.category);

  return (
    <section className="max-height flex flex-col items-center justify-start pb-20 gap-4 py-0 md:pt-0 sm:pr-6">
      <p className="text-lg bg-white font-bold border-2 w-full text-center">{textPart}</p>
      <CategoryProductsList categoryId={numberPart} />
    </section>
  );
}
