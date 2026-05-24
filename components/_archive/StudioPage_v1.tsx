import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { StudioNav } from '@/components/pages/StudioNav';

export default async function StudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });

  const filosofia = locale === 'it'
    ? "uno studio di architettura basato sul binomio osare-dare. L'osare mantiene viva la persona. Il dare soddisfa le esigenze del committente. Il giusto connubio che nutre i sogni che si vanno ad esaudire con il coordinato ed attento dialogo tra architettura e committenza."
    : "an architecture studio built on the dare-give duality. Daring keeps the person alive. Giving meets the client's needs. The right combination that nurtures the dreams to be fulfilled through coordinated and attentive dialogue between architecture and clients.";

  const servizi = locale === 'it'
    ? [
        'Progettazione architettonica privata e pubblica',
        'Progettazione urbanistica',
        'Progettazione interni e arredi su misura',
        'Progettazione energetica e certificazioni APE',
        'Direzione lavori',
        'Coordinamento sicurezza in fase di progettazione ed esecuzione',
        'Progettazione BIM (Building Information Model)',
      ]
    : [
        'Private and public architecture',
        'Urban planning',
        'Interiors and custom furniture',
        'Energy design and APE certifications',
        'Construction management',
        'Safety coordination in design and execution',
        'BIM (Building Information Model) design',
      ];

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
        {t('studio')}
      </h1>

      <StudioNav locale={locale} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Manifesto + Studio photo */}
        <div>
          <p style={{ fontStyle: 'italic', fontSize: '24px', fontWeight: 300, lineHeight: 1.5, color: '#000', maxWidth: '580px' }}>
            {filosofia}
          </p>

          {/* Studio photo */}
          <div style={{ marginTop: '38px', marginBottom: '38px' }}>
            <Image
              src="/images/studio.jpg"
              alt={locale === 'it' ? 'Studio dare-architettura — Ferrara' : 'dare-architettura studio — Ferrara'}
              width={720}
              height={480}
              style={{
                width: '100%',
                height: 'auto',
                border: '1px solid #000',
              }}
            />
            <p style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '12px',
            }}>
              {locale === 'it' ? 'Studio' : 'Studio'} — Via Saraceno 74, Ferrara
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
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
            {locale === 'it' ? 'Servizi' : 'Services'}
          </p>
          <ul>
            {servizi.map((s, i) => (
              <li
                key={i}
                style={{
                  borderTop: '1px solid #EEEEEE',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  fontSize: '15px',
                  color: '#000',
                  lineHeight: 1.6,
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
