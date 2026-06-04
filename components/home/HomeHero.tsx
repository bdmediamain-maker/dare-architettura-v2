'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

// Latest novità — TEMP hardcoded. Replace with Sanity data when connected.
const latestProject = {
  titolo: 'Tabià',
  descrizione: {
    it: 'dare-architettura ha partecipato al concorso di progettazione per la realizzazione del nuovo rifugio Spruggi Tonini in provincia di Trento.',
    en: 'dare-architettura took part in the design competition for the new Spruggi Tonini mountain refuge in the province of Trento.',
  },
  immagini: [
    '/images/projects/it-auronzo-bivacco-fanton/01.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/02.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/03.jpg',
    '/images/projects/it-auronzo-bivacco-fanton/04.jpg',
  ],
};

const infoItemsByLocale: Record<string, { label: string; value: string }[]> = {
  it: [
    { label: 'FONDATO', value: '2009' },
    { label: 'SEDE', value: 'Ferrara, Italia' },
    { label: 'CONTATTO', value: 'studio@dare-architettura.net' },
  ],
  en: [
    { label: 'FOUNDED', value: '2009' },
    { label: 'BASED IN', value: 'Ferrara, Italy' },
    { label: 'CONTACT', value: 'studio@dare-architettura.net' },
  ],
};

export function HomeHero() {
  const locale = useLocale();
  const infoItems = infoItemsByLocale[locale] ?? infoItemsByLocale.it;
  const descrizione =
    locale === 'en' ? latestProject.descrizione.en : latestProject.descrizione.it;
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
        position: 'relative',
        paddingTop: '20px',
      }}
    >
      {/* Center: image + project info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Image — smaller */}
        <div
          style={{
            width: '45%',
            maxWidth: '600px',
            aspectRatio: '16/10',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
          }}
          className="max-md:!w-[75%]"
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
              bottom: '10px',
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

        {/* Project info */}
        <div
          style={{
            maxWidth: '600px',
            textAlign: 'center',
            padding: '64px 24px 0',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '26px',
              fontWeight: 600,
              color: '#000',
              marginBottom: '10px',
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
              lineHeight: 1.6,
            }}
          >
            {descrizione}
          </motion.p>
        </div>
      </div>

      {/* Bottom-center: FONDATO / SEDE / CONTATTO — vertical, centered, same width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          alignItems: 'center',
          textAlign: 'center',
          width: '260px',
        }}
        className="max-md:hidden"
      >
        {infoItems.map((item) => (
          <div key={item.label} style={{ width: '100%' }}>
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
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#000',
              }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
