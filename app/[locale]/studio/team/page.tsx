import { teamAttuale, teamAlumni } from '@/lib/data/team';
import { StudioNav } from '@/components/pages/StudioNav';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'studio' });

  // Sort alumni alphabetically by LAST name
  const alumniSorted = [...teamAlumni].sort((a, b) => {
    const lastA = a.split(' ').pop() || '';
    const lastB = b.split(' ').pop() || '';
    return lastA.localeCompare(lastB, 'it');
  });

  const alumniCount = teamAlumni.length;

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
        {t('team')}
      </h1>

      <StudioNav locale={locale} />

      {/* Current */}
      <div style={{ marginBottom: '8px' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#888',
            marginBottom: '32px',
          }}
        >
          {locale === 'it' ? 'Attuale' : 'Current'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamAttuale.map(member => (
            <div key={member.nome}>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#000' }}>
                {member.nome}
              </p>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#888', marginTop: '2px' }}>{member.ruolo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni — big number hero */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '16px',
          marginTop: '48px',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontSize: '64px',
            fontWeight: 600,
            color: '#000',
            lineHeight: 1,
            fontFamily: 'monospace',
          }}
        >
          {alumniCount}
        </span>
        <div>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#000',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {locale === 'it' ? 'architetti' : 'architects'}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 400, color: '#888' }}>
            {locale === 'it'
              ? 'hanno collaborato con lo studio dal 2009'
              : 'have collaborated with the studio since 2009'}
          </p>
        </div>
      </div>

      {/* Hairline */}
      <div style={{ borderBottom: '1px solid #000', marginBottom: '24px' }} />

      {/* Alumni grid — 3 cols desktop, 2 tablet, 1 mobile */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '0 32px' }}
      >
        {alumniSorted.map((name, i) => {
          const parts = name.split(' ');
          const firstName = parts.slice(0, -1).join(' ');
          const lastName = parts[parts.length - 1];
          return (
            <div
              key={`${name}-${i}`}
              style={{
                padding: '10px 0',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{lastName}</span>
              <span style={{ fontSize: '13px', fontWeight: 400, color: '#888' }}>{firstName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
