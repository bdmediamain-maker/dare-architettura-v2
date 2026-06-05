import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/ui/Navbar';
import { PageTransition } from '@/components/ui/PageTransition';

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
      <Navbar locale={locale} />
      <main className="pt-[130px] lg:pt-[140px] px-6 py-12 lg:px-16 lg:py-20">
        <PageTransition>{children}</PageTransition>
      </main>
    </NextIntlClientProvider>
  );
}
