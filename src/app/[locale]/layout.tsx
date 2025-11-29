import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import "../globals.css";

const figtree = localFont({
  src: [
    {
      path: '../fonts/Figtree-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Figtree-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Figtree-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Figtree-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-figtree', // Nombre de la variable CSS
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // En Next.js 15, params es una promesa que debemos esperar
  const { locale } = await params;

  // Validar que el idioma sea uno de los permitidos (en, es, pt)
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Obtener los mensajes (textos) del servidor
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={figtree.variable}>
      <body className="antialiased bg-gray-50 text-slate-900" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}