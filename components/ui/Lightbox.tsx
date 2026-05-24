'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface LightboxProps {
  images: string[];
  alt?: string;
  open: boolean;
  startIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, alt, open, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDist, setLastTouchDist] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      resetZoom();
    },
    [resetZoom],
  );

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, [open, startIndex]);

  const prev = useCallback(
    () => goTo((index - 1 + images.length) % images.length),
    [goTo, index, images.length],
  );
  const next = useCallback(
    () => goTo((index + 1) % images.length),
    [goTo, index, images.length],
  );

  // Keyboard nav + Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, prev, next]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Swipe nav (single-finger only; pinch handled separately)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = null;
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (zoom > 1) {
      // Don't swipe-nav while the image is zoomed
      touchStartX.current = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: '#fff',
              fontSize: '28px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              lineHeight: 1,
              zIndex: 2,
            }}
          >
            ✕
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              style={{
                position: 'absolute',
                left: '24px',
                color: '#fff',
                fontSize: '36px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                lineHeight: 1,
                zIndex: 2,
              }}
            >
              ‹
            </button>
          )}

          {/* Image container */}
          <div
            style={{
              position: 'relative',
              width: '90vw',
              height: '85vh',
              overflow: 'hidden',
              touchAction: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((prevZoom) => {
                const delta = e.deltaY > 0 ? -0.2 : 0.2;
                const newZoom = prevZoom + delta;
                if (newZoom <= 1) {
                  setPan({ x: 0, y: 0 });
                  return 1;
                }
                return Math.min(newZoom, 5);
              });
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (zoom > 1) {
                resetZoom();
              } else {
                setZoom(2.5);
              }
            }}
            onMouseDown={(e) => {
              if (zoom > 1) {
                e.stopPropagation();
                setIsDragging(true);
                setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
              }
            }}
            onMouseMove={(e) => {
              if (isDragging && zoom > 1) {
                setPan({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y,
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => {
              if (e.touches.length === 2) {
                e.stopPropagation();
                const dist = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY,
                );
                setLastTouchDist(dist);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length === 2) {
                e.stopPropagation();
                const dist = Math.hypot(
                  e.touches[0].clientX - e.touches[1].clientX,
                  e.touches[0].clientY - e.touches[1].clientY,
                );
                if (lastTouchDist > 0) {
                  const ratio = dist / lastTouchDist;
                  setZoom((prevZoom) => {
                    const newZoom = prevZoom * ratio;
                    if (newZoom <= 1) {
                      setPan({ x: 0, y: 0 });
                      return 1;
                    }
                    return Math.min(newZoom, 5);
                  });
                }
                setLastTouchDist(dist);
              }
            }}
            onTouchEnd={() => setLastTouchDist(0)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease',
                  cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                  userSelect: 'none',
                }}
              >
                <Image
                  src={images[index]}
                  alt={alt ? `${alt} ${index + 1}` : `image ${index + 1}`}
                  fill
                  sizes="90vw"
                  style={{ objectFit: 'contain', pointerEvents: 'none' }}
                  draggable={false}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: '24px',
                color: '#fff',
                fontSize: '36px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                lineHeight: 1,
                zIndex: 2,
              }}
            >
              ›
            </button>
          )}

          {/* Counter */}
          <p
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: '13px',
              zIndex: 2,
            }}
          >
            {index + 1} / {images.length}
          </p>

          {/* Zoom indicator */}
          {zoom > 1 && (
            <p
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '13px',
                opacity: 0.7,
                zIndex: 2,
              }}
            >
              {Math.round(zoom * 100)}%
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
