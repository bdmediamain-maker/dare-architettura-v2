"use client";

/**
 * PageLoader
 * ─────────────────────────────────────────────────────────────
 * Wrapper unificato che monta il loader corretto in base alla
 * larghezza della finestra:
 *   < 768px  → LoaderMobile
 *   ≥ 768px  → LoaderDesktop
 *
 * Utilizzo in app/layout.tsx (o in una pagina specifica):
 *
 *   import PageLoader from "@/components/PageLoader";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <body>
 *           <PageLoader />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * Props:
 *   onComplete  — callback opzionale invocato quando il fade-out finisce
 *   holdMs      — ms di pausa col logo composto prima del fade-out (default 1200)
 */

import { useEffect, useState } from "react";
import LoaderDesktop from "./LoaderDesktop";
import LoaderMobile from "./LoaderMobile";

interface PageLoaderProps {
  onComplete?: () => void;
  holdMs?: number;
}

export default function PageLoader({ onComplete, holdMs = 200 }: PageLoaderProps) {
  // SSR-safe: durante l'idratazione non sappiamo la dimensione;
  // rendiamo null e poi scegliamo lato client.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile === null) return null;

  return isMobile ? (
    <LoaderMobile onComplete={onComplete} holdMs={holdMs} />
  ) : (
    <LoaderDesktop onComplete={onComplete} holdMs={holdMs} />
  );
}
