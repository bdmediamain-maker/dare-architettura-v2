'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects } from '@/lib/data/featured';

// Slower, more cinematic cycle
const ROTATE_MS = 7000;
const FADE_S = 2.5;

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
      {/* Image layer — covers FULL viewport including behind the navbar */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: [1, 1.15, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: FADE_S, ease: 'easeInOut' },
              scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
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

      {/* Lighter white overlay (30%) — photos clearly visible, text readability via text-shadow */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'rgba(255,255,255,0.30)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle vignette to fade edges */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Image dots — bottom-left, above project name */}
      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '40px',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}
      >
        {featuredProjects.map((_, i) => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: i === index ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Current project name — bottom-left */}
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '40px',
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)',
            zIndex: 10,
            textShadow: '0 0 10px rgba(255,255,255,0.8)',
            margin: 0,
          }}
        >
          {current.title}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar — 2px at the very bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(0,0,0,0.1)',
          zIndex: 10,
        }}
      >
        <motion.div
          key={index}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
          style={{
            height: '100%',
            background: 'rgba(0,0,0,0.4)',
          }}
        />
      </div>
    </>
  );
}
