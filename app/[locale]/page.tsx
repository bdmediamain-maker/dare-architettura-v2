import { getTranslations } from 'next-intl/server';
import { LockBodyScroll } from '@/components/ui/LockBodyScroll';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return locale === 'it'
    ? {
        title: 'dare-architettura — Studio di Architettura Ferrara',
        description: 'Studio di architettura basato sul binomio osare-dare. Ferrara, dal 2009.',
      }
    : {
        title: 'dare-architettura — Architecture Studio Ferrara',
        description: 'Architecture studio built on the dare-give duality. Ferrara, since 2009.',
      };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const manifesto = locale === 'it'
    ? "uno studio di architettura basato sul binomio osare-dare. L'osare mantiene viva la persona. Il dare soddisfa le esigenze del committente."
    : "an architecture studio built on the dare-give duality. Daring keeps the person alive. Giving meets the client's needs.";

  const labels = locale === 'it'
    ? { fondato: 'FONDATO', sede: 'SEDE', contatto: 'CONTATTO' }
    : { fondato: 'FOUNDED', sede: 'BASED IN', contatto: 'CONTACT' };

  const tagline = t('hero_pre');

  return (
    <>
      <LockBodyScroll />
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px 40px',
      }}
    >
      {/* Wordmark hero */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{ overflowX: 'hidden' }}
      >
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: '#000',
          }}
        >
          DARE
        </h1>
        <p
          style={{
            fontSize: 'clamp(28px, 4.5vw, 72px)',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: '#000',
            marginTop: '8px',
          }}
        >
          ARCHITETTURA
        </p>
        <div style={{ width: '120px', height: '1px', backgroundColor: '#000', margin: '20px auto' }} />
        <p style={{ fontStyle: 'italic', fontSize: '24px', fontWeight: 300, color: '#000', marginBottom: '40px' }}>
          {tagline}
        </p>
      </section>

      {/* Manifesto */}
      <section
        style={{
          maxWidth: '680px',
          margin: '40px auto 40px',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '22px', fontWeight: 400, lineHeight: 1.5, color: '#000' }}>
          {manifesto}
        </p>
      </section>

      {/* Meta info */}
      <section style={{ marginTop: '32px', paddingBottom: '40px', padding: '0 24px', width: '100%' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { label: labels.fondato, value: '2009' },
            { label: labels.sede, value: locale === 'it' ? 'Ferrara, Italia' : 'Ferrara, Italy' },
            { label: labels.contatto, value: 'studio@dare-architettura.net' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center border-t md:border-t-0 md:border-l border-black pt-6 md:pt-0 md:pl-6"
            >
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#888888',
                  marginBottom: '8px',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '16px', color: '#000' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
