'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('loader-shown')) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      sessionStorage.setItem('loader-shown', '1');
      setVisible(false);
      document.body.style.overflow = '';
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Image src="/logo.png" alt="dare-architettura" width={60} height={60} priority />
            <div>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#000',
                  lineHeight: 1,
                }}
              >
                DARE
              </p>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#000',
                  marginTop: '4px',
                }}
              >
                ARCHITETTURA
              </p>
            </div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{ height: '1px', backgroundColor: '#000', marginTop: '32px' }}
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
            Ferrara, Italia
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
