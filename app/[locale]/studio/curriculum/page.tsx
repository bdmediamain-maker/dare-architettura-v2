import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { curriculum } from '@/lib/data/curriculum';
import { StudioNav } from '@/components/pages/StudioNav';

// Split a timeline entry into "title" (first clause) + "detail" (rest)
function splitEntry(text: string): { title: string; detail: string } {
  const m = text.match(/^([^.;]+[.;])\s*(.*)$/);
  if (m && m[2].length > 0) {
    return { title: m[1].trim(), detail: m[2].trim() };
  }
  return { title: text.trim(), detail: '' };
}

export default async function CurriculumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bioRest = locale === 'it'
    ? " (Ferrara, 1978), architetto fondatore dello studio. Laureato con lode allo IUAV di Venezia con una tesi sul nuovo studio di registrazione degli U2 a Dublino. Dal 2005 al 2009 ha lavorato ad Amsterdam presso lo studio Snitker/Borst e successivamente Dok architecten. Nel 2009 fonda lo studio dare-architettura a Ferrara."
    : " (Ferrara, 1978), founding architect of the studio. Graduated with honors from IUAV Venice with a thesis on the new U2 recording studio in Dublin. From 2005 to 2009 he worked in Amsterdam at Snitker/Borst studio and later at Dok architecten. In 2009 he founded the dare-architettura studio in Ferrara.";

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

      {/* Bio: photo LEFT + text RIGHT */}
      <div
        className="flex flex-col md:flex-row md:items-start gap-8 md:gap-[64px]"
        style={{ marginTop: '48px', marginBottom: '80px' }}
      >
        <div className="w-full md:w-[200px] flex-shrink-0 flex flex-col items-center md:items-stretch">
          <Image
            src="/images/rudy-davi.png"
            alt="Rudy Davi"
            width={200}
            height={240}
            className="max-w-[160px] md:max-w-none w-full h-auto"
            style={{
              filter: 'grayscale(1)',
              display: 'block',
            }}
          />
        </div>

        <div className="flex-1 md:max-w-[520px]">
          <p style={{ fontSize: '17px', fontWeight: 400, lineHeight: 1.7, color: '#000' }}>
            <strong style={{ fontWeight: 600 }}>Rudy Davi</strong>{bioRest}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div>
        {curriculum.map((entry, i) => {
          const { title, detail } = splitEntry(entry.testo);
          return (
            <div
              key={`${entry.anno}-${i}`}
              className="flex flex-col md:flex-row gap-3 md:gap-6"
              style={{
                borderBottom: '1px solid #eee',
                paddingTop: '16px',
                paddingBottom: '16px',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#000',
                  minWidth: '56px',
                  flexShrink: 0,
                }}
              >
                {entry.anno}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#000', marginBottom: detail ? '2px' : 0, lineHeight: 1.5 }}>
                  {title}
                </p>
                {detail && (
                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#888', lineHeight: 1.5 }}>
                    {detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
