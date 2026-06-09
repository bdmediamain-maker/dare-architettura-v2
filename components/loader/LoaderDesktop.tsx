"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderDesktopProps {
  /** Chiamato quando il fade-out è completato */
  onComplete?: () => void;
  /** Pausa col video appena finito prima del fade-out (ms) — fallback se timeUpdate non scatta. Default 0 */
  holdMs?: number;
  /** Fallback hard-stop in caso il video non parta (autoplay bloccato, ecc.). Default 6000 */
  fallbackMs?: number;
}

// Durata del fade-out in secondi — anticipa la chiusura del loader rispetto
// alla fine del video, così quando il logo svanisce il sito è già visibile.
const FADE_DURATION_S = 0.4;
const FADE_PRE_END_S = FADE_DURATION_S; // start fade this many seconds before video end

/**
 * Desktop loader: riproduce /public/logodare_loader_desktop.mp4 a tutto schermo.
 * Il fade-out inizia ~0.4s PRIMA della fine del video, sincronizzato con la
 * sparizione del logo nelle ultime frame.
 */
export default function LoaderDesktop({
  onComplete,
  holdMs = 0,
  fallbackMs = 6000,
}: LoaderDesktopProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname() ?? "";
  const locationLabel = pathname.startsWith("/en")
    ? "Ferrara, Italy"
    : "Ferrara, Italia";

  // Avvia il video subito (alcuni browser hanno autoplay capriccioso).
  useEffect(() => {
    videoRef.current?.play().catch(() => {
      /* autoplay bloccato — il fallback sotto chiuderà comunque */
    });
  }, []);

  // Fallback: se il video non emette mai `ended`, chiudi dopo fallbackMs.
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), fallbackMs);
    return () => clearTimeout(t);
  }, [fallbackMs]);

  // Avvia il fade-out PRIMA della fine del video, così il sito appare
  // esattamente quando il logo termina la sua animazione.
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    if (v.currentTime >= v.duration - FADE_PRE_END_S) {
      setVisible(false);
    }
  };

  // Safety net: se timeUpdate non scatta in tempo (es. video brevissimo),
  // chiudi al naturale onEnded dopo l'eventuale hold.
  const handleEnded = () => {
    setTimeout(() => setVisible(false), holdMs);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader-desktop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_S, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            src="/logodare_loader_desktop.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            style={{
              maxWidth: "min(80vw, 900px)",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
              background: "#FFFFFF",
            }}
          />

          {/* Location label — bottom right, same gray as hamburger dropdown bg */}
          <p
            style={{
              position: "absolute",
              bottom: "28px",
              right: "28px",
              margin: 0,
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#aaaaaa",
              userSelect: "none",
            }}
          >
            {locationLabel}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
