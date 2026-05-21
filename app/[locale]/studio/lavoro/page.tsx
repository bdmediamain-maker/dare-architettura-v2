import { StudioNav } from '@/components/pages/StudioNav';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function LavoroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'studio' });

  const intro = locale === 'it'
    ? "Siamo sempre alla ricerca di giovani architetti motivati e creativi. Invia portfolio e curriculum a:"
    : "We are always looking for motivated and creative young architects. Send your portfolio and CV to:";

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
        {t('lavoro')}
      </h1>

      <StudioNav locale={locale} />

      <div style={{ maxWidth: '680px' }}>
        <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.7, color: '#000', marginBottom: '24px' }}>
          {intro}
        </p>
        <a
          href="mailto:studio@dare-architettura.net"
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: '#000',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          studio@dare-architettura.net
        </a>
      </div>
    </div>
  );
}
