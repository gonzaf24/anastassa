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
    title: {
      absolute: 'Anastassa',
    },
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
    <section className="flex flex-col gap-8 md:gap-12 pb-20 pt-4 md:pt-10 w-full px-4 md:px-0">
      <header className="w-full flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-gray-900">Colección</h1>
        <div className="w-12 h-[1px] bg-gray-300"></div>
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ClothingStore',
            name: 'Anastassa',
            url: process.env.BASE_URL || 'https://anastassa.com',
            logo: `${process.env.BASE_URL || 'https://anastassa.com'}/anastassa-logo-alt.png`,
            description: texts.description,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'UY',
              addressRegion: 'Montevideo',
            },
          }),
        }}
      />
      <ProductList />
    </section>
  );
}
