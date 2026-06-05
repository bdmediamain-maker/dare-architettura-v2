'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const word1 = 'DARE';
const word2 = 'ARCHITETTURA';
const STAGGER_1 = 0.12;
const STAGGER_2 = 0.06;
const PAUSE_BETWEEN_WORDS = 0.2;
const FIRST_DELAY = 0.3;

// When the line should start: after every letter is on screen
const lineDelay =
  FIRST_DELAY + word1.length * STAGGER_1 + PAUSE_BETWEEN_WORDS + word2.length * STAGGER_2 + 0.1;

export default function Loader() {
  const locale = useLocale();
  // SSR + client both start true; client-side effect decides whether to keep it
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip the animation on subsequent navigations within the same session
    if (sessionStorage.getItem('loader-shown')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }

    const hide = () => {
      sessionStorage.setItem('loader-shown', '1');
      setShow(false);
    };

    const main = setTimeout(hide, 3500);
    // Safety: force-hide after 5s no matter what
    const safety = setTimeout(hide, 5000);

    return () => {
      clearTimeout(main);
      clearTimeout(safety);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
      <motion.div
        key="loader"
        initial={{ opacity: 1, filter: 'blur(0px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 1.6, ease }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Architectural "d" mark above the wordmark */}
        <motion.img
          src="/logo-d-new.png"
          alt=""
          width={64}
          height={84}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          style={{
            marginBottom: '24px',
            display: 'block',
            width: 'auto',
            height: '72px',
            objectFit: 'contain',
          }}
        />

        {/* Animated wordmark — DARE / ARCHITETTURA, letter by letter.
            Inline-flex column makes the parent as wide as DARE; ARCHITETTURA
            uses width:100% + justify-content:space-between so its letters
            spread across the same exact width. */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '6px',
          }}
        >
          {/* DARE — natural width sets the column width */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              letterSpacing: '0.2em',
            }}
          >
            {word1.split('').map((letter, i) => (
              <motion.span
                key={`d-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: FIRST_DELAY + i * STAGGER_1,
                  ease,
                }}
                style={{
                  fontSize: '36px',
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  color: '#000',
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* ARCHITETTURA — fills the full DARE width */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {word2.split('').map((letter, i) => (
              <motion.span
                key={`a-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay:
                    FIRST_DELAY +
                    word1.length * STAGGER_1 +
                    PAUSE_BETWEEN_WORDS +
                    i * STAGGER_2,
                  ease,
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  fontFamily: 'inherit',
                  color: '#000',
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hairline — starts AFTER the wordmark finishes assembling */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: lineDelay, ease }}
          style={{
            width: '240px',
            height: '1px',
            backgroundColor: '#000',
            marginTop: '32px',
            transformOrigin: 'left',
          }}
        />

        <p
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '28px',
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#888',
            letterSpacing: '0.1em',
          }}
        >
          {locale === 'it' ? 'Ferrara, Italia' : 'Ferrara, Italy'}
        </p>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
