import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getProjectBySlug, projects, categories } from '@/lib/data/projects';
import { ProjectGallery } from '@/components/ui/ProjectGallery';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'progetti' });

  const projectIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const projectsPath = locale === 'it' ? 'progetti' : 'projects';

  const categoryLabels: Record<string, string> = locale === 'it'
    ? {
        tutti: t('tutti'),
        residenziale: 'Residenziale',
        pubblico: 'Pubblico',
        commerciale: 'Commerciale',
        'urbano-paesaggio': 'Urbano-Paesaggio',
        design: 'Design',
        concorsi: 'Concorsi',
      }
    : {
        tutti: t('tutti'),
        residenziale: 'Residential',
        pubblico: 'Public',
        commerciale: 'Commercial',
        'urbano-paesaggio': 'Urban-Landscape',
        design: 'Design',
        concorsi: 'Competitions',
      };

  const fields: { key: string; value: string | number | null | undefined }[] = [
    { key: locale === 'it' ? 'Luogo' : 'Location', value: project.luogo },
    { key: locale === 'it' ? 'Categoria' : 'Category', value: categoryLabels[project.categoria] },
    { key: t('stato'), value: project.stato },
    { key: t('committente'), value: project.committente },
    { key: t('architetto'), value: project.architetto },
    { key: t('team'), value: project.team },
    { key: t('strutture'), value: project.strutture },
    { key: t('costruttore'), value: project.costruttore },
    { key: t('superficie'), value: project.superficie },
    { key: t('importo'), value: project.importo },
    { key: t('anno_incarico'), value: project.anno_incarico },
    { key: t('anno_costruzione'), value: project.anno_costruzione },
    { key: t('fotografie'), value: project.fotografie },
  ].filter(f => f.value);

  const prevLabel = locale === 'it' ? '← progetto precedente' : '← previous project';
  const nextLabel = locale === 'it' ? 'progetto successivo →' : 'next project →';

  return (
    <article className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        {/* Left: category filter — sticky on desktop */}
        <aside
          className="lg:w-[160px] flex-shrink-0 lg:sticky"
          style={{ top: '120px', alignSelf: 'flex-start', zIndex: 1 }}
        >
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
            {locale === 'it' ? 'Categorie' : 'Categories'}
          </p>
          <ul className="flex flex-row lg:flex-col gap-4 lg:gap-3 overflow-x-auto lg:overflow-visible">
            {categories.map(cat => {
              const active = project.categoria === cat.key;
              return (
                <li key={cat.key}>
                  <Link
                    href={`/${locale}/${projectsPath}?cat=${cat.key}`}
                    style={{
                      fontSize: '13px',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#000' : '#888888',
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:!text-black transition-colors"
                  >
                    {categoryLabels[cat.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Center: project body */}
        <div className="flex-1 max-w-[720px]" style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: '38px', fontWeight: 600, letterSpacing: '-0.01em', color: '#000', lineHeight: 1.2 }}>
            {project.titolo}
          </h1>
          <h2 style={{ fontSize: '20px', fontWeight: 400, color: '#888', marginTop: '8px' }}>
            {project.sottotitolo}
          </h2>

          <div style={{ width: '80px', height: '1px', backgroundColor: '#000', margin: '32px 0' }} />

          {/* Clickable gallery with lightbox — same-height tiles, variable width */}
          <ProjectGallery images={project.immagini} title={project.titolo} />

          {project.descrizione && (
            <p
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#555',
                lineHeight: 1.7,
                textAlign: 'justify',
                whiteSpace: 'pre-line',
                maxWidth: '100%',
              }}
            >
              {project.descrizione}
            </p>
          )}

          {project.premio && (
            <div style={{ marginTop: '48px', borderTop: '1px solid #000', paddingTop: '24px' }}>
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
                {locale === 'it' ? 'Riconoscimento' : 'Award'}
              </p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>{project.premio}</p>
            </div>
          )}
        </div>

        {/* Right: tech sheet — sticky on desktop with internal scroll fallback */}
        <aside
          className="lg:w-[220px] flex-shrink-0 lg:sticky"
          style={{
            top: '120px',
            alignSelf: 'flex-start',
            zIndex: 1,
            maxHeight: 'calc(100vh - 140px)',
            overflowY: 'auto',
          }}
        >
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
            {locale === 'it' ? 'Scheda tecnica' : 'Specifications'}
          </p>
          <dl>
            {fields.map((field, i) => (
              <div key={`${field.key}-${i}`} style={{ marginBottom: '14px' }}>
                <dt
                  style={{
                    fontSize: '9px',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#bbb',
                    marginBottom: '2px',
                  }}
                >
                  {field.key}
                </dt>
                <dd
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#333',
                    lineHeight: 1.45,
                  }}
                >
                  {String(field.value)}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {/* Bottom navigation */}
      <div
        style={{
          borderTop: '1px solid #000',
          marginTop: '120px',
          paddingTop: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {prevProject ? (
          <Link
            href={`/${locale}/${projectsPath}/${prevProject.slug}`}
            style={{ fontSize: '13px', color: '#000' }}
            className="hover:underline underline-offset-4"
          >
            {prevLabel}
            <br />
            <span style={{ color: '#888888', fontSize: '13px' }}>
              {prevProject.titolo} — {prevProject.anno}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/${locale}/${projectsPath}/${nextProject.slug}`}
            style={{ fontSize: '13px', color: '#000', textAlign: 'right' }}
            className="hover:underline underline-offset-4"
          >
            {nextLabel}
            <br />
            <span style={{ color: '#888888', fontSize: '13px' }}>
              {nextProject.titolo} — {nextProject.anno}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
