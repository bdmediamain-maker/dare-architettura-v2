'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { awards } from '@/lib/data/awards';

export function AwardsList() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Award rows — full width, single column */}
      <div style={{ maxWidth: '900px' }}>
        {awards.map((award, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={`${award.anno}-${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5"
              style={{
                borderBottom: '1px solid #eee',
                paddingTop: '18px',
                paddingBottom: '18px',
                paddingLeft: '12px',
                paddingRight: '12px',
                margin: '0 -12px',
                transition: 'background 200ms ease',
                background: isHovered ? '#F8F8F8' : 'transparent',
                cursor: 'default',
              }}
            >
              {/* Year — GRIDA */}
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#000',
                  minWidth: '56px',
                  flexShrink: 0,
                }}
              >
                {award.anno}
              </span>
              {/* Result badge */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#000',
                  background: '#f0f0f0',
                  padding: '4px 10px',
                  minWidth: '100px',
                  textAlign: 'center',
                  flexShrink: 0,
                }}
              >
                {award.risultato}
              </span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000',
                    marginBottom: '2px',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                >
                  {award.nome}
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: '-2px',
                      height: '1px',
                      background: '#000',
                      width: isHovered ? '100%' : '0%',
                      transition: 'width 350ms ease',
                    }}
                  />
                </p>
                <p style={{ fontSize: '13px', fontWeight: 400, color: '#888' }}>{award.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed image container — visible only on hover.
          Hidden on mobile (<1024px) via the `awards-hover-image` CSS class. */}
      {hovered !== null && awards[hovered]?.image && (
        <div
          className="awards-hover-image"
          style={{
            position: 'fixed',
            right: 'calc((100vw - 900px) / 2)',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '420px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={awards[hovered].image as string}
                alt={awards[hovered].nome}
                width={420}
                height={315}
                sizes="420px"
                style={{ width: '100%', height: 'auto', filter: 'grayscale(1)' }}
              />
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                {awards[hovered].nome}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
