'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const featuredImages = [
  'https://www.dare-architettura.net/media/k2/items/cache/93ba6c299f04f710c35672b0f157402a_XL.jpg',
  'https://www.dare-architettura.net/media/k2/items/cache/b48f2c03bbd159814922841bfb3fe7d7_XL.jpg',
  'https://www.dare-architettura.net/media/k2/items/cache/68497d6cb194485d2759fde9466457b7_XL.jpg',
  'https://www.dare-architettura.net/media/k2/items/cache/d197c421d422f5cbf569ea13f09ef700_XL.jpg',
  'https://www.dare-architettura.net/media/k2/items/cache/85217272b4e7187cce0880e98f060661_XL.jpg',
];

export function HomeHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ w: 1920, h: 1080 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect viewport / mobile + listen for resize
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setViewport({ w, h });
      setIsMobile(w < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Preload remote images so the reveal is instant
  useEffect(() => {
    featuredImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Track mouse position with RAF (desktop only)
  useEffect(() => {
    if (isMobile) return;
    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsHovering(true);
      });
    };
    const onLeave = () => setIsHovering(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Cycle through images every 5 seconds (pause while fully revealed)
  useEffect(() => {
    if (isRevealed) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % featuredImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isRevealed]);

  // Auto-collapse after 3s when revealed
  useEffect(() => {
    if (!isRevealed) return;
    const t = setTimeout(() => setIsRevealed(false), 3000);
    return () => clearTimeout(t);
  }, [isRevealed]);

  // Escape closes reveal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRevealed) setIsRevealed(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isRevealed]);

  const handleClick = useCallback(() => {
    setIsRevealed((v) => !v);
  }, []);

  const circleSize = isRevealed ? Math.max(viewport.w, viewport.h) * 2.5 : 350;

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
        cursor: isMobile ? 'auto' : 'none',
        background: '#111',
        zIndex: 0,
      }}
    >
      {/* LAYER 1: dark background */}
      <div style={{ position: 'absolute', inset: 0, background: '#111', zIndex: 0 }} />

      {/* LAYER 2: project photo — circle mask on desktop, 25% opacity on mobile */}
      {isMobile ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={featuredImages[currentImage]}
              alt="Progetto dare-architettura"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AnimatePresence>
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            clipPath:
              isHovering || isRevealed
                ? `circle(${circleSize / 2}px at ${mousePos.x}px ${mousePos.y}px)`
                : 'circle(0px at 50% 50%)',
            transition: isRevealed
              ? 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'clip-path 0.15s ease-out',
            willChange: 'clip-path',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={featuredImages[currentImage]}
              alt="Progetto dare-architettura"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AnimatePresence>

          {/* Subtle vignette on the photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
              pointerEvents: 'none',
            }}
          />
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
            color: '#fff',
            mixBlendMode: 'difference',
            userSelect: 'none',
          }}
        >
          dare-architettura
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '80px',
            height: '1px',
            background: '#fff',
            margin: '24px 0',
            mixBlendMode: 'difference',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            fontStyle: 'italic',
            fontSize: '18px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            mixBlendMode: 'difference',
          }}
        >
          osare per sognare...è vivere
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{
            maxWidth: '600px',
            marginTop: '32px',
            mixBlendMode: 'difference',
          }}
        >
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#fff' }}>
            uno studio di architettura basato sul binomio osare-dare.
          </p>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              marginTop: '4px',
            }}
          >
            L&apos;osare mantiene viva la persona. Il dare soddisfa le esigenze del committente.
          </p>
        </motion.div>
      </div>

      {/* LAYER 4: bottom info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0',
          zIndex: 10,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
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
                borderLeft: '1px solid rgba(255,255,255,0.3)',
                borderRight: isLast ? '1px solid rgba(255,255,255,0.3)' : 'none',
                paddingLeft: '24px',
                paddingRight: isLast ? '24px' : '24px',
                marginRight: isLast ? 0 : '0',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{item.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* LAYER 5: custom cursor dot (desktop only) */}
      {!isMobile && isHovering && !isRevealed && (
        <motion.div
          animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.8)',
            pointerEvents: 'none',
            zIndex: 20,
            mixBlendMode: 'difference',
          }}
        />
      )}

      {/* LAYER 6: reveal-boundary circle outline */}
      {!isMobile && isHovering && !isRevealed && (
        <motion.div
          animate={{ x: mousePos.x - 175, y: mousePos.y - 175 }}
          transition={{ type: 'spring', stiffness: 150, damping: 25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            pointerEvents: 'none',
            zIndex: 11,
          }}
        />
      )}

      {/* LAYER 7: click-to-reveal hint */}
      {!isMobile && isHovering && !isRevealed && (
        <motion.p
          animate={{ x: mousePos.x + 30, y: mousePos.y + 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.5)',
            pointerEvents: 'none',
            zIndex: 20,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          click to reveal
        </motion.p>
      )}

      {/* Image counter dots (bottom-left) */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '40px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {featuredImages.map((_, i) => (
          <motion.button
            key={i}
            animate={{
              scale: i === currentImage ? 1 : 0.7,
              opacity: i === currentImage ? 1 : 0.3,
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#fff',
              cursor: 'pointer',
              pointerEvents: 'auto',
              border: 'none',
              padding: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(i);
            }}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
