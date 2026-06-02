'use client';

import { useEffect } from 'react';

/**
 * Locks the document scroll while mounted. Use on routes that
 * intentionally fit in a single viewport (e.g. the homepage).
 *
 * Always resets to '' on unmount — does NOT capture prev values, so it's
 * safe even when other components (e.g. Loader) temporarily set overflow.
 */
export function LockBodyScroll() {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);
  return null;
}
