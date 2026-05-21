import { collaborators } from '@/lib/data/collaborators';
import { StudioNav } from '@/components/pages/StudioNav';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function CollaboratoriPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <div>
        {collaborators.map((c, i) => (
          <div
            key={`${c.nome}-${i}`}
            className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8"
            style={{
              borderTop: '1px solid #EEEEEE',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <div style={{ flex: 1 }}>
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#000',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  {c.nome}
                </a>
              ) : (
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{c.nome}</span>
              )}
            </div>
            <span style={{ fontSize: '13px', color: '#888888', minWidth: '180px' }}>{c.settore}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#888888' }}>{c.citta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
