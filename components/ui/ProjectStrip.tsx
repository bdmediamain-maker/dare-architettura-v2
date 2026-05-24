'use client';

import { useLocale } from 'next-intl';

// Real project photos from dare-architettura.net (K2 cache _XL.jpg).
// Slugs match the entries in /lib/data/projects.ts so links resolve to /[locale]/(progetti|projects)/<slug>.
const featured = [
  {
    titolo: 'Casa Bagaro',
    anno: 2023,
    slug: 'it-ferrara-casa-bagaro',
    src: 'https://www.dare-architettura.net/media/k2/items/cache/93ba6c299f04f710c35672b0f157402a_XL.jpg',
  },
  {
    titolo: 'Scala Montecatino',
    anno: 2019,
    slug: 'it-ferrara-scala-montecatino',
    src: 'https://www.dare-architettura.net/media/k2/items/cache/b48f2c03bbd159814922841bfb3fe7d7_XL.jpg',
  },
  {
    titolo: 'Casa Vignolo',
    anno: 2017,
    slug: 'it-ferrara-casa-vignolo',
    src: 'https://www.dare-architettura.net/media/k2/items/cache/68497d6cb194485d2759fde9466457b7_XL.jpg',
  },
  {
    titolo: 'Cimitero Zevio',
    anno: 2022,
    slug: 'ampliamento-cimitero-zevio',
    src: 'https://www.dare-architettura.net/media/k2/items/cache/d197c421d422f5cbf569ea13f09ef700_XL.jpg',
  },
  {
    titolo: 'Municipio Codigoro',
    anno: 2021,
    slug: 'codigoro',
    src: 'https://www.dare-architettura.net/media/k2/items/cache/85217272b4e7187cce0880e98f060661_XL.jpg',
  },
];

// Duplicate the array so the -50% translate creates a seamless loop
const doubled = [...featured, ...featured];

export function ProjectStrip() {
  const locale = useLocale();
  const projectsSegment = locale === 'it' ? 'progetti' : 'projects';

  return (
    <div
      style={{
        marginTop: '96px',
        height: '80px',
        overflow: 'hidden',
        position: 'relative',
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
      onMouseEnter={(e) => {
        const track = e.currentTarget.querySelector('.strip-track') as HTMLDivElement | null;
        if (track) track.style.animationPlayState = 'paused';
      }}
      onMouseLeave={(e) => {
        const track = e.currentTarget.querySelector('.strip-track') as HTMLDivElement | null;
        if (track) track.style.animationPlayState = 'running';
      }}
    >
      <div
        className="strip-track"
        style={{
          display: 'flex',
          gap: '4px',
          height: '100%',
          width: 'max-content',
          animation: 'scrollStrip 30s linear infinite',
          willChange: 'transform',
        }}
      >
        {doubled.map((project, i) => (
          <a
            key={`${project.slug}-${i}`}
            href={`/${locale}/${projectsSegment}/${project.slug}`}
            style={{
              width: '140px',
              height: '80px',
              flexShrink: 0,
              position: 'relative',
              display: 'block',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.strip-overlay') as HTMLElement | null;
              if (overlay) overlay.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.strip-overlay') as HTMLElement | null;
              if (overlay) overlay.style.opacity = '0';
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.src}
              alt={project.titolo}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              className="strip-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 300ms ease',
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 600,
                  textAlign: 'center',
                  padding: '4px 8px',
                  lineHeight: 1.3,
                }}
              >
                {project.titolo}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
