'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects } from '@/lib/data/featured';

const ROTATE_MS = 6000;
const FADE_MS = 1500;

export function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % featuredProjects.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const current = featuredProjects[index];

  return (
    <>
      {/* Image layer: continuously zoom + crossfade between featured images */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: FADE_MS / 1000, ease: 'easeInOut' },
              scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${current.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform, opacity',
            }}
          />
        </AnimatePresence>
      </div>

      {/* Translucent white overlay for text readability */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'rgba(255,255,255,0.78)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
