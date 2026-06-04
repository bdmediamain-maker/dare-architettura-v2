'use client';

import { useState, useEffect } from 'react';

// Studio photo gallery — 3 distinct shots that cycle automatically.
const studioPhotos = [
  '/images/studio.jpg',
  '/images/studio-2.jpg',
  '/images/studio-3.jpg',
];

interface StudioPhotoSliderProps {
  alt?: string;
}

export function StudioPhotoSlider({ alt = 'Studio dare-architettura' }: StudioPhotoSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (studioPhotos.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % studioPhotos.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {studioPhotos.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      ))}

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 2,
        }}
      >
        {studioPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              background:
                i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
