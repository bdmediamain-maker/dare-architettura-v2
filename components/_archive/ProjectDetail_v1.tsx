import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getProjectBySlug, projects, categories } from '@/lib/data/projects';

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
      }
    : {
        tutti: t('tutti'),
        residenziale: 'Residential',
        pubblico: 'Public',
        commerciale: 'Commercial',
        'urbano-paesaggio': 'Urban-Landscape',
        design: 'Design',
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
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: category filter */}
        <aside className="lg:w-[160px] flex-shrink-0">
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
        <div className="flex-1 max-w-[720px]">
          <h1 style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '-0.01em', color: '#000', lineHeight: 1.2 }}>
            {project.titolo}
          </h1>
          <h2 style={{ fontSize: '22px', fontWeight: 500, color: '#888888', marginTop: '16px' }}>
            {project.sottotitolo}
          </h2>

          <div style={{ width: '80px', height: '1px', backgroundColor: '#000', margin: '32px 0' }} />

          {/* Image gallery — vertical stack, real colours */}
          {project.immagini && project.immagini.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              {project.immagini.map((src, i) => (
                <div key={i} style={{ marginBottom: '32px' }}>
                  <Image
                    src={src}
                    alt={`${project.titolo} — ${locale === 'it' ? 'immagine' : 'image'} ${i + 1}`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1024px) 100vw, 720px"
                    style={{
                      width: '100%',
                      height: 'auto',
                      border: '1px solid #eee',
                    }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          )}

          {project.descrizione && (
            <p style={{ fontSize: '18px', fontWeight: 400, color: '#000', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
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

        {/* Right: tech sheet */}
        <aside className="lg:w-[220px] flex-shrink-0">
          <div className="lg:sticky lg:top-24">
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
                <div
                  key={`${field.key}-${i}`}
                  style={{
                    borderTop: '1px solid #EEEEEE',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                  }}
                >
                  <dt
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#888888',
                      marginBottom: '4px',
                    }}
                  >
                    {field.key}
                  </dt>
                  <dd style={{ fontSize: '13px', color: '#000' }}>{String(field.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
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
