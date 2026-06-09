"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Logo piece definitions ───────────────────────────────────────────────────
// Coordinate originali logo-local (135×270) × scale 2.3
// Le stesse del file HTML originale.
// SIZE_MULTIPLIER applicato per ridurre del 50% (0.5) o ingrandire.
const SIZE_MULTIPLIER = 0.5;
const PIECES = [
  // S1 right spine
  { left: 255.3, top: 0,     w: 55.2, h: 621   },
  // S2 top arm
  { left: 0,     top: 310.5, w: 283,  h: 43.7  },
  // S3 upper-left stub
  { left: 0,     top: 310.5, w: 57.5, h: 75.9  },
  // S4 middle arm
  { left: 0,     top: 409.4, w: 283,  h: 43.7  },
  // S5 lower-left bar
  { left: 0,     top: 409.4, w: 57.5, h: 211.6 },
  // S6 bottom arm
  { left: 0,     top: 579.6, w: 230,  h: 43.7  },
].map((p) => ({
  left: p.left * SIZE_MULTIPLIER,
  top:  p.top  * SIZE_MULTIPLIER,
  w:    p.w    * SIZE_MULTIPLIER,
  h:    p.h    * SIZE_MULTIPLIER,
}));

const CONTAINER_W = 310.5 * SIZE_MULTIPLIER;
const CONTAINER_H = 621   * SIZE_MULTIPLIER;

// ─── Scatter helper ──────────────────────────────────────────────────────────
type ScatterTransform = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  opacity: number;
};

function randomScatter(): ScatterTransform {
  const dirs = ["right","left","top","bottom","tl","tr","bl","br"] as const;
  const d = dirs[Math.floor(Math.random() * dirs.length)];
  const X = 1500, Y = 950;
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  let x = 0, y = 0;
  if (d === "right")  { x =  r(X*.55,X);  y =  r(-400,400); }
  if (d === "left")   { x = -r(X*.55,X);  y =  r(-400,400); }
  if (d === "top")    { y = -r(Y*.55,Y);  x =  r(-500,500); }
  if (d === "bottom") { y =  r(Y*.55,Y);  x =  r(-500,500); }
  if (d === "tl")     { x = -r(X*.5,X);  y = -r(Y*.5,Y); }
  if (d === "tr")     { x =  r(X*.5,X);  y = -r(Y*.5,Y); }
  if (d === "bl")     { x = -r(X*.5,X);  y =  r(Y*.5,Y); }
  if (d === "br")     { x =  r(X*.5,X);  y =  r(Y*.5,Y); }
  return { x, y, rotate: r(-200,200), scale: r(0.55,1.25), opacity: 0 };
}

// ─── Component ───────────────────────────────────────────────────────────────
interface LoaderDesktopProps {
  /** Chiamato quando il fade-out è completato */
  onComplete?: () => void;
  /** Durata pausa logo visibile prima del fade-out (ms). Default 1200 */
  holdMs?: number;
}

export default function LoaderDesktop({
  onComplete,
  holdMs = 1200,
}: LoaderDesktopProps) {
  const N = PIECES.length;
  const [visible, setVisible] = useState(true);
  // Pre-generiamo scatter fissi (una sola volta) per evitare re-render
  const [scatters] = useState<ScatterTransform[]>(() =>
    PIECES.map(() => randomScatter())
  );

  // Tempistica: ultima piece arriva a delay=(N-1)*90 + 1250ms
  const gatherDone = 1250 + (N - 1) * 90;

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
    }, gatherDone + holdMs);
    return () => clearTimeout(t);
  }, [gatherDone, holdMs]);

  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader-desktop"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
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
          {/* Stage 1920×1080 scalato per adattarsi alla finestra */}
          <StageScaler>
            {/* Logo container centrato nello stage (dimensioni scalate da SIZE_MULTIPLIER) */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: CONTAINER_W,
                height: CONTAINER_H,
                transform: "translate(-50%,-50%)",
              }}
            >
              {PIECES.map((p, i) => (
                <motion.div
                  key={i}
                  initial={scatters[i]}
                  animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.25,
                    ease: easeOut,
                    delay: (N - 1 - i) * 0.09,
                    opacity: { duration: 0.65, delay: (N - 1 - i) * 0.09 },
                  }}
                  style={{
                    position: "absolute",
                    left: p.left,
                    top: p.top,
                    width: p.w,
                    height: p.h,
                    background: "#0A0A0A",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          </StageScaler>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Stage scaler (replica la logica JS dell'HTML originale) ─────────────────
function StageScaler({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={{ position: "relative", width: 0, height: 0 }}>
      <div
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          transform: `translate(-50%,-50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
