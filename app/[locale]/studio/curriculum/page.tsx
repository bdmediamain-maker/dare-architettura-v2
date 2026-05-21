import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { curriculum } from '@/lib/data/curriculum';
import { StudioNav } from '@/components/pages/StudioNav';

export default async function CurriculumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bio = locale === 'it'
    ? "Rudy Davi, architetto fondatore dello studio. Laureato con lode allo IUAV di Venezia con una tesi sul nuovo studio di registrazione degli U2 a Dublino. Dal 2005 al 2009 ha lavorato ad Amsterdam presso lo studio Snitker/Borst e successivamente Dok architecten. Nel 2009 fonda lo studio dare-architettura a Ferrara."
    : "Rudy Davi, founding architect of the studio. Graduated with honors from IUAV Venice with a thesis on the new U2 recording studio in Dublin. From 2005 to 2009 he worked in Amsterdam at Snitker/Borst studio and later at Dok architecten. In 2009 he founded the dare-architettura studio in Ferrara.";

  return (
    <div className="min-h-screen">
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          color: '#000',
          marginBottom: '8px',
        }}
      >
        Rudy Davi
      </h1>
      <p
        style={{
          fontSize: '22px',
          fontWeight: 500,
          color: '#888888',
          marginBottom: '48px',
        }}
      >
        {locale === 'it' ? 'Architetto fondatore' : 'Founding architect'}
      </p>

      <StudioNav locale={locale} />

      {/* Bio */}
      <div
        className="flex flex-col md:flex-row md:items-start gap-8 md:gap-[120px]"
        style={{ marginTop: '48px', marginBottom: '80px' }}
      >
        {/* Photo — mobile: top centered max 160px; desktop: right 200px */}
        <div className="order-first md:order-last w-full md:w-[200px] flex-shrink-0 flex flex-col items-center md:items-stretch">
          <Image
            src="/images/rudy-davi.png"
            alt="Rudy Davi — Architetto"
            width={200}
            height={240}
            className="max-w-[160px] md:max-w-none w-full h-auto"
            style={{
              filter: 'grayscale(1)',
              border: '1px solid #000',
            }}
          />
          <p
            className="text-center md:text-left"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '12px',
            }}
          >
            Rudy Davi — Ferrara, 1978
          </p>
        </div>

        {/* Bio text — left column, max 480px on desktop */}
        <div className="flex-1 md:max-w-[480px]">
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.7, color: '#000' }}>{bio}</p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        {curriculum.map((entry, i) => (
          <div
            key={`${entry.anno}-${i}`}
            className="flex flex-col md:flex-row gap-4 md:gap-8"
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
              {entry.anno}
            </span>
            <p style={{ fontSize: '15px', color: '#000', lineHeight: 1.7, flex: 1 }}>{entry.testo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
