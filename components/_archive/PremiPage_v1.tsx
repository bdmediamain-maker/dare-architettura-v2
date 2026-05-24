import { awards } from '@/lib/data/awards';
import { StudioNav } from '@/components/pages/StudioNav';
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

      <div>
        {awards.map((award, i) => (
          <div
            key={`${award.anno}-${i}`}
            className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
            style={{
              borderTop: '1px solid #000',
              paddingTop: '24px',
              paddingBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#888888',
                width: '80px',
                flexShrink: 0,
              }}
            >
              {award.anno}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#000',
                width: '140px',
                flexShrink: 0,
              }}
            >
              {award.risultato}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{award.nome}</p>
              <p style={{ fontSize: '13px', color: '#888888', marginTop: '4px' }}>{award.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
