'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '48px',
        }}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => { setStartIndex(i); setOpen(true); }}
            style={{
              height: '300px',
              cursor: 'pointer',
              flexGrow: 1,
              padding: 0,
              border: 'none',
              background: 'transparent',
              position: 'relative',
              minWidth: '200px',
            }}
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              width={600}
              height={300}
              sizes="(max-width: 768px) 50vw, 33vw"
              style={{
                height: '300px',
                width: 'auto',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </button>
        ))}
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
