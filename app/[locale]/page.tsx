import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond } from 'next/font/google';
import { HeroBackground } from '@/components/home/HeroBackground';
import { ProjectStrip } from '@/components/ui/ProjectStrip';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic'],
  display: 'swap',
});

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
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });

  const manifestoLead = locale === 'it'
    ? "uno studio di architettura basato sul binomio osare-dare."
    : "an architecture studio built on the dare-give duality.";
  const manifestoBody = locale === 'it'
    ? "L'osare mantiene viva la persona. Il dare soddisfa le esigenze del committente."
    : "Daring keeps the person alive. Giving meets the client's needs.";

  const labels = locale === 'it'
    ? { fondato: 'FONDATO', sede: 'SEDE', contatto: 'CONTATTO' }
    : { fondato: 'FOUNDED', sede: 'BASED IN', contatto: 'CONTACT' };

  const tagline = t('hero_pre');

  return (
    <>
      <HeroBackground />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 40px 40px',
          // counter the layout's main padding so the hero spans the full width
          margin: '-110px -24px -48px -24px',
        }}
        className="lg:!-mx-16 lg:!-my-20"
      >
        {/* Hero wordmark — now in ITALIC */}
        <section
          className="flex flex-col items-center justify-center text-center"
          style={{ overflowX: 'hidden' }}
        >
          <h1
            className={cormorant.className}
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(48px, 8vw, 120px)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              color: '#000',
              textAlign: 'center',
            }}
          >
            dare
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '0.17em',
                height: 0,
                borderTop: '5px solid #000',
                verticalAlign: 'middle',
                margin: '0 0.05em',
                transform: 'translateY(calc(0.05em - 2px))',
              }}
            />
            architettura
          </h1>
          <div style={{ width: '120px', height: '1px', backgroundColor: '#000', margin: '24px auto 16px' }} />
          <p style={{ fontStyle: 'italic', fontSize: '22px', fontWeight: 300, color: '#000', marginBottom: '32px' }}>
            {tagline}
          </p>
        </section>

        {/* Manifesto */}
        <section
          style={{
            maxWidth: '680px',
            margin: '24px auto 32px',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontStyle: 'italic', fontSize: '22px', lineHeight: 1.6, color: '#000' }}>
            <strong style={{ fontWeight: 600 }}>{manifestoLead}</strong>{' '}
            <span style={{ fontWeight: 400, color: '#555' }}>{manifestoBody}</span>
          </p>
        </section>

        {/* Meta info + scrolling project strip */}
        <section style={{ marginTop: '24px', padding: '0 24px', width: '100%' }}>
          {(() => {
            const items = [
              { label: labels.fondato, value: '2009' },
              { label: labels.sede, value: locale === 'it' ? 'Ferrara, Italia' : 'Ferrara, Italy' },
              { label: labels.contatto, value: 'studio@dare-architettura.net' },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {items.map((item, i) => {
                  const isLast = i === items.length - 1;
                  return (
                    <div
                      key={i}
                      className={`text-center border-t md:border-t-0 md:border-l border-black pt-6 md:pt-0 md:pl-6${
                        isLast ? ' md:border-r md:pr-6' : ''
                      }`}
                    >
                      <p
                        style={{
                          fontSize: '10px',
                          fontWeight: 400,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#aaa',
                          marginBottom: '2px',
                        }}
                      >
                        {item.label}
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>{item.value}</p>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Scrolling project strip — aligned with the info row borders */}
          <div className="max-w-4xl mx-auto">
            <ProjectStrip />
          </div>
        </section>
      </div>
    </>
  );
}
