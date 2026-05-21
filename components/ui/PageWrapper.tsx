'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
