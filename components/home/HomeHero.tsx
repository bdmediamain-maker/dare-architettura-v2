'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const featuredImages = [
  '/images/projects/it-ferrara-casa-bagaro/01.jpg',
  '/images/projects/it-ferrara-scala-montecatino/01.jpg',
  '/images/projects/it-pompos-iat-info-point/01.jpg',
  '/images/projects/it-auronzo-bivacco-fanton/01.jpg',
  '/images/projects/codigoro/01.jpg',
];

const featuredTitles = [
  'Casa Bagaro',
  'Scala Montecatino',
  'IAT Pomposa',
  'Bivacco Fanton',
  'Municipio Codigoro',
];

const INITIAL_MASK =
  'radial-gradient(circle 220px at -500px -500px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EXPAND_MS = 1500;
const SHRINK_MS = 1000;

function softMask(x: number, y: number) {
  return `radial-gradient(circle 220px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 75%, rgba(0,0,0,0) 100%)`;
}

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const lastMousePos = useRef({ x: -500, y: -500 });
  const isRevealedRef = useRef(false);

  const [currentImage, setCurrentImage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Keep isRevealedRef in sync
  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  // Detect mobile / touch
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth < 768 ||
          (typeof window !== 'undefined' && 'ontouchstart' in window),
      );
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload images
  useEffect(() => {
    featuredImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Cycle images every 7s (pause while revealed)
  useEffect(() => {
    if (isRevealed) return;
    const id = setInterval(() => {
      setCurrentImage((p) => (p + 1) % featuredImages.length);
    }, 7000);
    return () => clearInterval(id);
  }, [isRevealed]);

  // Mousemove tracking — soft mask spotlight, instant. Frozen during reveal.
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      if (isRevealedRef.current) return;
      if (!revealRef.current) return;
      const mask = softMask(e.clientX, e.clientY);
      revealRef.current.style.maskImage = mask;
      revealRef.current.style.webkitMaskImage = mask;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  // Click — HYBRID: switch mask→clip-path for the expansion, then back to mask
  const handleClick = useCallback(() => {
    if (isMobile) return;
    const reveal = revealRef.current;
    const overlay = overlayRef.current;
    if (!reveal || !overlay) return;

    const x = lastMousePos.current.x;
    const y = lastMousePos.current.y;

    if (!isRevealed) {
      setIsRevealed(true);
      isRevealedRef.current = true;

      // Switch from mask-image to clip-path for the smooth expand
      reveal.style.maskImage = 'none';
      reveal.style.webkitMaskImage = 'none';
      reveal.style.transition = 'none';
      reveal.style.clipPath = `circle(220px at ${x}px ${y}px)`;
      // Force reflow so the next transition actually animates
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      reveal.offsetHeight;

      reveal.style.transition = `clip-path ${EXPAND_MS}ms ${EASE}`;
      reveal.style.clipPath = `circle(150vmax at ${x}px ${y}px)`;

      overlay.style.transition = `opacity ${EXPAND_MS}ms ${EASE}`;
      overlay.style.opacity = '0';

      // Auto-close after 5s
      window.setTimeout(() => {
        if (!revealRef.current || !overlayRef.current) return;
        const r = revealRef.current;
        const o = overlayRef.current;

        // Shrink to viewport CENTER (not click position)
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        r.style.transition = `clip-path ${SHRINK_MS}ms ${EASE}`;
        r.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

        o.style.transition = `opacity ${SHRINK_MS}ms ${EASE}`;
        o.style.opacity = '1';

        // After shrink, switch BACK to mask-image for soft spotlight (reset at center)
        window.setTimeout(() => {
          if (!revealRef.current) return;
          const rr = revealRef.current;
          setIsRevealed(false);
          isRevealedRef.current = false;

          rr.style.transition = 'none';
          rr.style.clipPath = 'none';
          const mcx = window.innerWidth / 2;
          const mcy = window.innerHeight / 2;
          const mask = softMask(mcx, mcy);
          rr.style.maskImage = mask;
          rr.style.webkitMaskImage = mask;
        }, SHRINK_MS);
      }, 5000);
    } else {
      // Manual close: shrink to viewport CENTER (not click position)
      const r = reveal;
      const o = overlay;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      r.style.transition = `clip-path ${SHRINK_MS}ms ${EASE}`;
      r.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

      o.style.transition = `opacity ${SHRINK_MS}ms ${EASE}`;
      o.style.opacity = '1';

      window.setTimeout(() => {
        if (!revealRef.current) return;
        const rr = revealRef.current;
        setIsRevealed(false);
        isRevealedRef.current = false;
        rr.style.transition = 'none';
        rr.style.clipPath = 'none';
        const mcx = window.innerWidth / 2;
        const mcy = window.innerHeight / 2;
        const mask = softMask(mcx, mcy);
        rr.style.maskImage = mask;
        rr.style.webkitMaskImage = mask;
      }, SHRINK_MS);
    }
  }, [isMobile, isRevealed]);

  // Escape closes reveal (manual close path)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRevealed) handleClick();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isRevealed, handleClick]);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: isMobile ? 'auto' : 'crosshair',
        background: '#fff',
        zIndex: 0,
      }}
    >
      {/* LAYER 0: full photo — always present */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={`base-${currentImage}`}
            src={featuredImages[currentImage]}
            alt=""
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
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
      </div>

      {/* LAYER 1: white overlay — opacity controlled only via ref (no React state) */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.88)',
          pointerEvents: 'none',
          opacity: 1,
          willChange: 'opacity',
        }}
      />

      {/* LAYER 2: reveal layer — soft mask spotlight (hover) ↔ clip-path circle (click) */}
      {!isMobile && (
        <div
          ref={revealRef}
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            maskImage: INITIAL_MASK,
            WebkitMaskImage: INITIAL_MASK,
            willChange: 'mask-image, clip-path',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`reveal-${currentImage}`}
              src={featuredImages[currentImage]}
              alt=""
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
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
        </div>
      )}

      {/* LAYER 3: text content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: '#000',
            userSelect: 'none',
          }}
        >
          dare-architettura
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '80px',
            height: '1px',
            background: '#000',
            margin: '24px 0',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: '#888',
          }}
        >
          osare per sognare...è vivere
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={{ maxWidth: '600px', marginTop: '32px' }}
        >
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#000' }}>
            uno studio di architettura basato sul binomio osare-dare.
          </p>
          <p style={{ fontSize: '15px', fontWeight: 400, color: '#555', marginTop: '4px' }}>
            L&apos;osare mantiene viva la persona. Il dare soddisfa le esigenze del committente.
          </p>
        </motion.div>
      </div>

      {/* LAYER 4: bottom info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          zIndex: 10,
          pointerEvents: 'none',
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
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#000' }}>{item.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* LAYER 5: image dots + project name + progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '110px',
          left: '40px',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}
      >
        {featuredImages.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(i);
            }}
            aria-label={`Image ${i + 1}`}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              padding: 0,
              border: 'none',
              background: i === currentImage ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)',
              transition: 'background 0.3s ease',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentImage}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '92px',
            left: '40px',
            fontSize: '11px',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            zIndex: 10,
            margin: 0,
          }}
        >
          {featuredTitles[currentImage]}
        </motion.p>
      </AnimatePresence>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(0,0,0,0.08)',
          zIndex: 10,
        }}
      >
        <motion.div
          key={currentImage}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 7, ease: 'linear' }}
          style={{ height: '100%', background: 'rgba(0,0,0,0.3)' }}
        />
      </div>
    </div>
  );
}
