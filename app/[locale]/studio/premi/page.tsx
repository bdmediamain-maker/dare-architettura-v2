import { StudioNav } from '@/components/pages/StudioNav';
import { AwardsList } from '@/components/pages/AwardsList';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function PremiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'studio' });

  return (
    <div className="min-h-screen">
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: '#000',
          marginBottom: '48px',
        }}
      >
        {t('premi')}
      </h1>

      <StudioNav locale={locale} />

      <AwardsList />
    </div>
  );
}
