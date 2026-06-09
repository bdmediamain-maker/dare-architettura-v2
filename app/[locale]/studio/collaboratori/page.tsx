import { StudioNav } from '@/components/pages/StudioNav';
import { CollaboratoriList } from '@/components/pages/CollaboratoriList';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function CollaboratoriPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
        {t('collaboratori')}
      </h1>

      <StudioNav locale={locale} />

      <CollaboratoriList locale={locale} />
    </div>
  );
}
