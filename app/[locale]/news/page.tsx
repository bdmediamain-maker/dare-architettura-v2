import { getTranslations } from 'next-intl/server';
import { NewsArchive } from '@/components/pages/NewsArchive';

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <div className="min-h-screen">
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: '#000',
          marginBottom: '64px',
        }}
      >
        {t('news')}
      </h1>
      <NewsArchive locale={locale} />
    </div>
  );
}
