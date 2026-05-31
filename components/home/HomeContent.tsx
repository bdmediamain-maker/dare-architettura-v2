'use client';

import { motion } from 'framer-motion';

interface HomeContentProps {
  tagline: string;
  manifestoLead: string;
  manifestoBody: string;
  labels: { fondato: string; sede: string; contatto: string };
  sedeValue: string;
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const textShadow =
  '0 1px 20px rgba(255,255,255,0.9), 0 1px 40px rgba(255,255,255,0.7)';

export function HomeContent({
  tagline,
  manifestoLead,
  manifestoBody,
  labels,
  sedeValue,
}: HomeContentProps) {
  const items = [
    { label: labels.fondato, value: '2009' },
    { label: labels.sede, value: sedeValue },
    { label: labels.contatto, value: 'studio@dare-architettura.net' },
  ];

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px 40px',
        margin: '-110px -24px -48px -24px',
      }}
      className="lg:!-mx-16 lg:!-my-20"
    >
      {/* Hero wordmark — clean Inter, stampatello */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{ overflowX: 'hidden' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 'clamp(48px, 8vw, 120px)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            color: '#000',
            textAlign: 'center',
            textShadow,
          }}
        >
          dare-architettura
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: '#000',
            margin: '24px auto 16px',
            transformOrigin: 'center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontStyle: 'italic',
            fontSize: '22px',
            fontWeight: 300,
            color: '#000',
            marginBottom: '32px',
            textShadow,
          }}
        >
          {tagline}
        </motion.p>
      </section>

      {/* Manifesto */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{
          maxWidth: '680px',
          margin: '24px auto 32px',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '22px',
            lineHeight: 1.6,
            color: '#000',
            textShadow,
          }}
        >
          <strong style={{ fontWeight: 600 }}>{manifestoLead}</strong>{' '}
          <span style={{ fontWeight: 400, color: '#333' }}>{manifestoBody}</span>
        </p>
      </motion.section>

      {/* Info row */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        style={{ marginTop: '24px', padding: '0 24px', width: '100%' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <div
                key={i}
                className={`text-center border-t md:border-t-0 md:border-l border-black pt-6 md:pt-0 md:pl-6${
                  isLast ? ' md:border-r md:pr-6' : ''
                }`}
              >
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#666',
                    marginBottom: '2px',
                    textShadow,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#000',
                    textShadow,
                  }}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
