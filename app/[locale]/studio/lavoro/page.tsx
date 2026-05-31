import { StudioNav } from '@/components/pages/StudioNav';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function LavoroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'studio' });

  const eyebrow: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '12px',
  };

  const introMain = locale === 'it'
    ? 'dare-architettura è cresciuto grazie alle persone che ci hanno affiancato. Ogni progetto porta con sé il contributo di chi ha lavorato al nostro fianco.'
    : 'dare-architettura grew thanks to the people who supported us. Every project carries the contribution of those who worked by our side.';

  const introSecondary = locale === 'it'
    ? 'Se sei un giovane architetto con spirito ambizioso e creativo, questa è la tua opportunità di lasciare il segno.'
    : 'If you are a young architect with an ambitious and creative spirit, this is your chance to make your mark.';

  const cosaCerchiamoLabel = locale === 'it' ? 'Cosa cerchiamo' : 'What we look for';
  const cosaCerchiamo = locale === 'it'
    ? ['Laurea in architettura', 'Capacità nella rappresentazione 3D', 'Spirito ambizioso e creativo']
    : ['Architecture degree', '3D representation skills', 'Ambitious and creative spirit'];

  const lavoroLabel = locale === 'it' ? 'Il lavoro' : 'The position';
  const lavoro = locale === 'it'
    ? ['Durata: 3–6 mesi', 'Disponibilità: minimo 4 giorni a settimana', 'Sede: Ferrara']
    : ['Duration: 3–6 months', 'Availability: at least 4 days a week', 'Location: Ferrara'];

  const candidatiLabel = locale === 'it' ? 'Candidati' : 'Apply';
  const inviaCv = locale === 'it' ? 'Invia il tuo CV e portfolio a:' : 'Send your CV and portfolio to:';

  const alumniLabel = locale === 'it' ? 'architetti passati dallo studio dal 2009' : 'architects who passed through the studio since 2009';

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

      {/* INTRO */}
      <div style={{ maxWidth: '600px', marginBottom: '48px' }}>
        <p style={{ fontSize: '20px', lineHeight: 1.6, color: '#000', marginBottom: '16px' }}>
          {introMain}
        </p>
        <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#888' }}>
          {introSecondary}
        </p>
      </div>

      {/* ALUMNI COUNT */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '48px', fontWeight: 500, color: '#000', lineHeight: 1 }}>54</p>
        <p
          style={{
            fontSize: '13px',
            color: '#888',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}
        >
          {alumniLabel}
        </p>
      </div>

      {/* REQUIREMENTS */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: '32px', marginBottom: '48px' }}
      >
        <div>
          <p style={eyebrow}>{cosaCerchiamoLabel}</p>
          {cosaCerchiamo.map((item, i) => (
            <div
              key={i}
              style={{
                fontSize: '15px',
                color: '#000',
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          <p style={eyebrow}>{lavoroLabel}</p>
          {lavoro.map((item, i) => (
            <div
              key={i}
              style={{
                fontSize: '15px',
                color: '#000',
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA — Email (inline body-sized) */}
      <div
        style={{
          borderTop: '1px solid #000',
          paddingTop: '32px',
          marginBottom: '60px',
        }}
      >
        <p style={eyebrow}>{candidatiLabel}</p>
        <p style={{ fontSize: '15px', color: '#000', lineHeight: 1.6 }}>
          {inviaCv}{' '}
          <a
            href="mailto:job@dare-architettura.net"
            style={{
              fontSize: '15px',
              fontWeight: 400,
              color: '#000',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationThickness: '1px',
              textDecorationColor: '#000',
              textUnderlineOffset: '4px',
            }}
          >
            job@dare-architettura.net
          </a>
        </p>
      </div>
    </div>
  );
}
