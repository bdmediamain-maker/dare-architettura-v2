import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Loader from '@/components/_archive/Loader_letters_v1';
import { Sidebar } from '@/components/_archive/Sidebar_v2';

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Loader />
      <div className="flex min-h-screen bg-white">
        <Sidebar locale={locale} />
        <main className="flex-1 lg:ml-[280px] pt-[80px] lg:pt-20 px-6 py-12 lg:px-16 lg:py-20">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
