'use client';

import { useEffect } from 'react';

/**
 * Locks the document scroll while mounted. Use on routes that
 * intentionally fit in a single viewport (e.g. the homepage).
 */
export function LockBodyScroll() {
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);
  return null;
}
