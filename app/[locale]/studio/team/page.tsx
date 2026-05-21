import { teamAttuale, teamAlumni } from '@/lib/data/team';
import { StudioNav } from '@/components/pages/StudioNav';
import { getTranslations } from 'next-intl/server';

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
        {t('team')}
      </h1>

      <StudioNav locale={locale} />

      {/* Current */}
      <div style={{ marginBottom: '80px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#888888',
            marginBottom: '32px',
          }}
        >
          {locale === 'it' ? 'Attuale' : 'Current'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamAttuale.map(member => (
            <div key={member.nome}>
              <h3 style={{ fontSize: '22px', fontWeight: 500, color: '#000', marginBottom: '8px' }}>
                {member.nome}
              </h3>
              <p style={{ fontSize: '13px', color: '#888888' }}>{member.ruolo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni */}
      <div style={{ borderTop: '1px solid #000', paddingTop: '48px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#888888',
            marginBottom: '24px',
          }}
        >
          {locale === 'it' ? 'Hanno collaborato' : 'Have collaborated'}
        </p>
        <p style={{ fontSize: '15px', color: '#000', lineHeight: 1.8, maxWidth: '720px' }}>
          {teamAlumni.join(', ')}.
        </p>
      </div>
    </div>
  );
}
