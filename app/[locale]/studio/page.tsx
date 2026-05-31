import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { StudioNav } from '@/components/pages/StudioNav';
import { projects } from '@/lib/data/projects';

export default async function StudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tStudio = await getTranslations({ locale, namespace: 'studio' });

  const filosofia = locale === 'it'
    ? "uno studio di architettura basato sul binomio osare-dare. L'osare mantiene viva la persona. Il dare soddisfa le esigenze del committente. Il giusto connubio che nutre i sogni che si vanno ad esaudire con il coordinato ed attento dialogo tra architettura e committenza."
    : "an architecture studio built on the dare-give duality. Daring keeps the person alive. Giving meets the client's needs. The right combination that nurtures the dreams to be fulfilled through coordinated and attentive dialogue between architecture and clients.";

  const services = locale === 'it'
    ? [
        { num: '01', nome: 'Progettazione architettonica',  desc: 'Residenziale e pubblica, dalla concept alla realizzazione' },
        { num: '02', nome: 'Progettazione urbanistica',     desc: 'Piani urbanistici, masterplan e rigenerazione urbana' },
        { num: '03', nome: 'Interni e arredi su misura',    desc: 'Spazi commerciali e residenziali, dal disegno alla posa' },
        { num: '04', nome: 'Progettazione energetica',      desc: 'Certificazioni APE, riqualificazione e efficientamento' },
        { num: '05', nome: 'Direzione lavori',              desc: 'Supervisione completa del cantiere fino al collaudo' },
        { num: '06', nome: 'Coordinamento sicurezza',       desc: 'In fase di progettazione ed esecuzione, PSC e POS' },
        { num: '07', nome: 'Progettazione BIM',             desc: 'Building Information Modeling per progetti integrati' },
      ]
    : [
        { num: '01', nome: 'Architecture',                  desc: 'Residential and public, from concept to delivery' },
        { num: '02', nome: 'Urban planning',                desc: 'Masterplans and urban regeneration' },
        { num: '03', nome: 'Interiors and custom furniture',desc: 'Commercial and residential, from drawing to installation' },
        { num: '04', nome: 'Energy design',                 desc: 'APE certifications, retrofits and efficiency' },
        { num: '05', nome: 'Construction management',       desc: 'Full site supervision through completion' },
        { num: '06', nome: 'Safety coordination',           desc: 'In design and execution, PSC and POS' },
        { num: '07', nome: 'BIM design',                    desc: 'Building Information Modeling for integrated projects' },
      ];

  const eyebrow: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '16px',
  };

  const metaLabel: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 400,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '2px',
  };
  const metaValue: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    color: '#000',
  };

  return (
    <div>
      {/* Section 1: Header */}
      <div style={{ paddingTop: '40px' }}>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#000',
            marginBottom: '4px',
          }}
        >
          {t('studio')}
        </h1>
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
          {tStudio('sottotitolo')}
        </p>
        <StudioNav locale={locale} />
      </div>

      {/* Section 2: Studio photo on the LEFT (full, not cropped) + text on the right */}
      <div
        className="grid grid-cols-1 md:grid-cols-[55%_45%]"
        style={{ gap: '40px', marginTop: '24px', alignItems: 'start' }}
      >
        {/* LEFT: studio photo — original aspect ratio, no crop, no border */}
        <div>
          <Image
            src="/images/studio.jpg"
            alt={locale === 'it' ? 'Studio dare-architettura' : 'dare-architettura studio'}
            width={1531}
            height={1027}
            sizes="(max-width: 768px) 100vw, 55vw"
            quality={95}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>

        {/* RIGHT: chi siamo + manifesto + mini stats */}
        <div>
          <p style={eyebrow}>{locale === 'it' ? 'Chi siamo' : 'Who we are'}</p>
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '20px',
              lineHeight: 1.65,
              color: '#000',
            }}
          >
            {filosofia}
          </p>

          {/* Mini stats row */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid #ddd',
              display: 'flex',
              gap: '40px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={metaLabel}>{locale === 'it' ? 'Fondato' : 'Founded'}</p>
              <p style={metaValue}>2009</p>
            </div>
            <div>
              <p style={metaLabel}>{locale === 'it' ? 'Sede' : 'Based in'}</p>
              <p style={metaValue}>Ferrara</p>
            </div>
            <div>
              <p style={metaLabel}>{locale === 'it' ? 'Progetti' : 'Projects'}</p>
              <p style={metaValue}>{projects.length}+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Servizi — numbered, two-column grid */}
      <div
        style={{
          borderTop: '1px solid #eee',
          marginTop: '48px',
          paddingTop: '32px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '20px',
          }}
        >
          {locale === 'it' ? 'Servizi' : 'Services'}
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '0 48px' }}
        >
          {services.map((service) => (
            <div
              key={service.num}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '18px 0',
                borderBottom: '1px solid #eee',
                alignItems: 'baseline',
              }}
            >
              {/* Number — GRIDA */}
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#000',
                  fontFamily: 'monospace',
                  minWidth: '40px',
                  lineHeight: 1,
                }}
              >
                {service.num}
              </span>

              {/* Name + description */}
              <div>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000',
                    marginBottom: '3px',
                  }}
                >
                  {service.nome}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#888',
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: '60px' }} />
    </div>
  );
}
