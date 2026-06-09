"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderMobileProps {
  onComplete?: () => void;
  holdMs?: number;
  fallbackMs?: number;
}

const FADE_DURATION_S = 0.4;
const FADE_PRE_END_S = FADE_DURATION_S;

/**
 * Mobile loader: riproduce /public/logodare_loader_mobile.mp4 a schermo intero.
 * Il fade-out parte ~0.4s PRIMA della fine del video, sincronizzato con la
 * sparizione del logo nelle ultime frame → niente flash bianco prima del sito.
 */
export default function LoaderMobile({
  onComplete,
  holdMs = 0,
  fallbackMs = 6000,
}: LoaderMobileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname() ?? "";
  const locationLabel = pathname.startsWith("/en")
    ? "Ferrara, Italy"
    : "Ferrara, Italia";

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      /* autoplay bloccato — fallback gestisce la chiusura */
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), fallbackMs);
    return () => clearTimeout(t);
  }, [fallbackMs]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    if (v.currentTime >= v.duration - FADE_PRE_END_S) {
      setVisible(false);
    }
  };

  const handleEnded = () => {
    setTimeout(() => setVisible(false), holdMs);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader-mobile"
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
            src="/logodare_loader_mobile.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            style={{
              maxWidth: "85vw",
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
              bottom: "20px",
              right: "20px",
              margin: 0,
              fontFamily: "monospace",
              fontSize: "10px",
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
