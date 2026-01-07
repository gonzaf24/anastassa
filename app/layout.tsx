import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import Link from 'next/link';
import Script from 'next/script';
import { ReactNode } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { AppProvider } from './context/app-context';
import { Providers } from './providers';
import { Menu as AdminMenu } from './ui/admin/menu';
import { Menu as UserMenu } from './ui/menu';
import { Navbar } from './ui/navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | Anastassa',
    default: 'Anastassa',
  },
  description: 'Ropa de mujer, Montevideo - Canelones - Punta del este, Uruguay',
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: process.env.BASE_URL,
    siteName: 'Anastassa',
  },
};

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await auth();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
        {/* Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <Script id="json-ld-organization" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Anastassa",
              "url": "${process.env.BASE_URL || 'https://anastassa.com'}",
              "logo": "${process.env.BASE_URL || 'https://anastassa.com'}/anastassa-logo-alt.png",
              "sameAs": [
                "https://instagram.com/anastassa__"
              ]
            }
          `}
        </Script>
        <meta name="google-site-verification" content="IFAEhM0QwYMKh_rfGoyXigK5JGTto6HbwSmPgVzzIbw" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          <Providers>
            <AppProvider>
              <div className="relative flex flex-col min-h-screen">
                <Navbar session={session} />
                <main className="container mx-auto max-w-7xl pt-0 px-6 sm:px-0 flex-grow flex flex-row gap-8 min-h-[calc(100vh-100px)]">
                  <div className="hidden sm:flex flex-col gap-6 max-w-[200px] w-full bg-[#faf9f6] border-r border-[#e5e5e5] py-6 pr-4 pl-4 sticky top-[100px] h-[calc(100vh-100px)] rounded-r-xl">
                    <UserMenu />
                    {session && <AdminMenu />}

                    <div className="mt-auto pb-4">
                      <Link
                        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm uppercase tracking-wider"
                        href="https://instagram.com/anastassa__"
                        rel="noreferrer"
                        target="_blank"
                        title="Instagram"
                      >
                        <img alt="Likedin" className="w-4 h-4 opacity-70" src="/instagram.svg" width={16} height={16} />
                        anastassa__
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-4 pb-12">{children}</div>
                </main>
              </div>
            </AppProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
