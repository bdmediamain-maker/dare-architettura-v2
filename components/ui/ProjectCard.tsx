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
      <div className="relative bg-white">
        {/* TOP: pictogram area — hover photo overlays ONLY this region */}
        <div
          style={{
            aspectRatio: '4/3',
            position: 'relative',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {/* Default: pictogram (or thumbnail) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
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

          {/* Hover overlay — STAYS INSIDE the pictogram area only */}
          {overlaySrc && (
            <div
              aria-hidden={!hovered}
              style={{
                position: 'absolute',
                inset: 0,
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
            </div>
          )}
        </div>

        {/* DIVIDER — always visible */}
        <div style={{ borderTop: '1px solid #000' }} />

        {/* BOTTOM: text — NEVER covered by hover photo. Gray fill on hover. */}
        <div
          style={{
            padding: '12px 16px',
            background: hovered ? '#e0e0e0' : '#FFFFFF',
            transition: 'background 200ms ease',
          }}
        >
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
    </Link>
  );
}
