'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Latest novità — TEMP hardcoded. Replace with Sanity data when connected.
const latestProject = {
  titolo: 'Tabià',
  descrizione:
    'dare-architettura ha partecipato al concorso di progettazione per la realizzazione del nuovo rifugio Spruggi Tonini in provincia di Trento.',
  immagini: [
    '/images/projects/it-auronzo-bivacco-fanton/01.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/02.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/03.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/04.jpg',
  ],
};

export function HomeHero() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Cycle through photos of THIS project only
  useEffect(() => {
    if (latestProject.immagini.length <= 1) return;
    const id = setInterval(() => {
      setCurrentPhoto((p) => (p + 1) % latestProject.immagini.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Preload
  useEffect(() => {
    latestProject.immagini.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      style={{
        background: '#fff',
        height: 'calc(100vh - 140px)',
        overflow: 'hidden',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Image — centered, ~1/3 of page */}
      <div
        style={{
          width: '60%',
          maxWidth: '800px',
          aspectRatio: '16/10',
          position: 'relative',
          overflow: 'hidden',
          margin: '0 auto',
        }}
        className="max-md:!w-[85%]"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto}
            src={latestProject.immagini[currentPhoto]}
            alt={latestProject.titolo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              willChange: 'opacity',
            }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Photo dots */}
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
          {latestProject.immagini.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              aria-label={`Foto ${i + 1}`}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                padding: 0,
                border: 'none',
                background:
                  i === currentPhoto ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      {/* Project info below the image */}
      <div
        style={{
          maxWidth: '600px',
          textAlign: 'center',
          padding: '32px 24px 0',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#000',
            marginBottom: '12px',
          }}
        >
          {latestProject.titolo}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontSize: '15px',
            color: '#555',
            lineHeight: 1.65,
          }}
        >
          {latestProject.descrizione}
        </motion.p>
      </div>

      <div style={{ flex: 1, minHeight: '40px' }} />

      {/* Bottom info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          display: 'flex',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        className="max-md:hidden"
      >
        {[
          { label: 'FONDATO', value: '2009' },
          { label: 'SEDE', value: 'Ferrara, Italia' },
          { label: 'CONTATTO', value: 'studio@dare-architettura.net' },
        ].map((item, i, arr) => {
          const isLast = i === arr.length - 1;
          return (
            <div
              key={i}
              style={{
                textAlign: 'center',
                borderLeft: '1px solid #ddd',
                borderRight: isLast ? '1px solid #ddd' : 'none',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}
            >
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  marginBottom: '3px',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#000' }}>{item.value}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
