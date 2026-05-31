'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
