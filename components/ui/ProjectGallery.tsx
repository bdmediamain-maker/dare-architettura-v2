'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

type Orientation = 'h' | 'v';

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [orientations, setOrientations] = useState<Record<number, Orientation>>({});

  if (!images || images.length === 0) return null;

  const handleLoad = (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOrientations((prev) => ({
      ...prev,
      [i]: img.naturalWidth >= img.naturalHeight ? 'h' : 'v',
    }));
  };

  return (
    <>
      <div style={{ marginTop: '32px' }}>
        {images.map((src, i) => {
          const isVertical = orientations[i] === 'v';
          // For vertical images, rotate alignment in a 3-step cycle
          let align: 'flex-start' | 'center' | 'flex-end' = 'flex-start';
          if (isVertical) {
            const mod = i % 3;
            align = mod === 0 ? 'flex-start' : mod === 1 ? 'center' : 'flex-end';
          }

          return (
            <div
              key={`${src}-${i}`}
              style={{
                width: '100%',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: align,
              }}
            >
              <button
                onClick={() => {
                  setStartIndex(i);
                  setOpen(true);
                }}
                aria-label={`Open image ${i + 1}`}
                style={{
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  width: isVertical ? '60%' : '100%',
                  maxWidth: '100%',
                }}
              >
                <Image
                  src={src}
                  alt={`${title} ${i + 1}`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 720px"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onLoad={(e) => handleLoad(i, e)}
                />
              </button>
            </div>
          );
        })}
      </div>

      <Lightbox
        images={images}
        alt={title}
        open={open}
        startIndex={startIndex}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
