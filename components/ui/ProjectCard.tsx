'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  slug: string;
  titolo: string;
  sottotitolo: string | null;
  anno: number | null;
  pictogram: string | null;
  thumbnail: string | null;
  luogo: string | null;
  categoria_label: string;
  locale: string;
}

export function ProjectCard({
  slug,
  titolo,
  sottotitolo,
  anno,
  pictogram,
  thumbnail,
  luogo,
  categoria_label,
  locale,
}: ProjectCardProps) {
  const projectsPath = locale === 'it' ? 'progetti' : 'projects';
  const [hovered, setHovered] = useState(false);
  const overlaySrc = thumbnail || pictogram;

  return (
    <Link
      href={`/${locale}/${projectsPath}/${slug}`}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative bg-white"
        style={{ overflow: 'hidden' }}
      >
        {/* Pictogram + info — default state */}
        <div>
          <div
            style={{
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              background: '#fff',
            }}
          >
            {pictogram ? (
              <div style={{ position: 'relative', width: '70%', height: '100%' }}>
                <Image
                  src={pictogram}
                  alt={titolo}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ) : thumbnail ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={thumbnail}
                  alt={titolo}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#F8F8F8' }} />
            )}
          </div>

          <div style={{ borderTop: '1px solid #000', padding: '12px 16px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#aaa', marginBottom: '2px' }}>
              {anno ?? '—'}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#000', marginBottom: '2px' }}>
              {titolo}
            </p>
            <p style={{ fontSize: '12px', fontWeight: 400, color: '#888' }}>
              {luogo || sottotitolo || categoria_label}
            </p>
          </div>
        </div>

        {/* Hover overlay — real photo + title at bottom */}
        {overlaySrc && (
          <div
            aria-hidden={!hovered}
            style={{
              position: 'absolute',
              inset: 0,
              border: 'none',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
            }}
          >
            <Image
              src={overlaySrc}
              alt={titolo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 16px 16px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
              }}
            >
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>
                {titolo}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '2px' }}>
                {luogo || sottotitolo || categoria_label}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
