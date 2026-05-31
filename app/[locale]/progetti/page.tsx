import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsGallery } from '@/components/pages/ProjectsGallery';

export default async function ProgettiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'progetti' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const labels: Record<string, string> = locale === 'it'
    ? {
        tutti: t('tutti'),
        residenziale: 'Residenziale',
        pubblico: 'Pubblico',
        commerciale: 'Commerciale',
        'urbano-paesaggio': 'Urbano-Paesaggio',
        design: 'Design',
        concorsi: 'Concorsi',
      }
    : {
        tutti: t('tutti'),
        residenziale: 'Residential',
        pubblico: 'Public',
        commerciale: 'Commercial',
        'urbano-paesaggio': 'Urban-Landscape',
        design: 'Design',
        concorsi: 'Competitions',
      };

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
        {tNav('progetti')}
      </h1>
      <ProjectsGallery locale={locale} labels={labels} />
    </div>
  );
}
