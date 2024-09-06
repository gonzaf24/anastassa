import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Link from "next/link";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Menu } from "@/components/menu";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-0 px-6 sm:px-0 flex-grow flex flex-row gap-4 ">
              <div className="hidden sm:flex flex-col gap-4 max-w-[200px] w-full bg-[#ef8482]">
                <Menu />
              </div>
              <div className="flex flex-col w-full  gap-4">{children}</div>
            </main>
            <footer className="w-full flex items-center justify-center py-3 gap-2">
              <Link
                className="flex items-center gap-1 text-current text-default-600"
                href="https://instagram.com/anastassa__"
                rel="noreferrer"
                target="_blank"
                title="Instagram"
              >
                <img
                  alt="Anastassa instagram"
                  className="w-4 h-4"
                  src="/instagram.svg"
                />
                anastassa__
              </Link>
              <span className="text-[#ef8482]">|</span>
              <span className="flex items-center gap-1 text-current text-default-600">
                <img alt="Email" className="w-5 h-5" src="/email.svg" />
                info@anastassa.com
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
