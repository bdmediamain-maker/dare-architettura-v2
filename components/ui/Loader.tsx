'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Loader() {
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

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
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
        <Image
          src="/logo-full.png"
          alt="dare-architettura"
          width={220}
          height={50}
          priority
          style={{ width: 'auto', height: '80px', objectFit: 'contain' }}
        />
        {/* Use scaleX instead of width — Safari animates it smoothly */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease }}
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
          Ferrara, Italia
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
