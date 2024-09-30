import ProductList from './ui/product-list';

const texts = {
  title: 'Anastassa',
  description: 'Ropa de mujer, Montevideo - Canelones - Punta del este, Uruguay',
};

export async function generateMetadata() {
  const title = texts.title;
  const description = texts.description;
  const image = `${process.env.BASE_URL}/anastassa-logo-alt.png`;
  const url = `${process.env.BASE_URL}`;

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

export default async function Page() {
  return (
    <section className="max-height flex flex-col pb-20 gap-4 py-0 md:pt-0 sm:pr-6">
      <p className="text-lg font-bold border-2 w-full text-center uppercase">TODAS LAS PRENDAS</p>
      <ProductList />
    </section>
  );
}
