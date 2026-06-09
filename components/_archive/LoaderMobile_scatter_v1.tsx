"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Logo pieces ─────────────────────────────────────────────────────────────
// Mobile: scale 0.7 (era 1.4, ridotto del 50%) → logo ~94×189 px
// Proporzioni identiche all'originale.
const SCALE = 0.7;

const RAW = [
  { left: 111, top: 0,     w: 24,  h: 270   }, // S1 right spine
  { left: 0,   top: 135,   w: 123, h: 19    }, // S2 top arm
  { left: 0,   top: 135,   w: 25,  h: 33    }, // S3 upper-left stub
  { left: 0,   top: 178,   w: 123, h: 19    }, // S4 middle arm
  { left: 0,   top: 178,   w: 25,  h: 92    }, // S5 lower-left bar
  { left: 0,   top: 252,   w: 100, h: 19    }, // S6 bottom arm
] as const;

const PIECES = RAW.map((p) => ({
  left:  p.left  * SCALE,
  top:   p.top   * SCALE,
  w:     p.w     * SCALE,
  h:     p.h     * SCALE,
}));

const LOGO_W = 135 * SCALE; // ~189
const LOGO_H = 270 * SCALE; // ~378

// ─── Scatter helper ──────────────────────────────────────────────────────────
type ScatterTransform = {
  x: number; y: number; rotate: number; scale: number; opacity: number;
};

function randomScatter(): ScatterTransform {
  const dirs = ["right","left","top","bottom","tl","tr","bl","br"] as const;
  const d = dirs[Math.floor(Math.random() * dirs.length)];
  // Distanze calibrate per uno schermo mobile (max ~430px wide)
  const X = 500, Y = 800;
  const r = (a: number, b: number) => a + Math.random() * (b - a);
  let x = 0, y = 0;
  if (d === "right")  { x =  r(X*.55,X);  y =  r(-200,200); }
  if (d === "left")   { x = -r(X*.55,X);  y =  r(-200,200); }
  if (d === "top")    { y = -r(Y*.55,Y);  x =  r(-200,200); }
  if (d === "bottom") { y =  r(Y*.55,Y);  x =  r(-200,200); }
  if (d === "tl")     { x = -r(X*.5,X);  y = -r(Y*.5,Y); }
  if (d === "tr")     { x =  r(X*.5,X);  y = -r(Y*.5,Y); }
  if (d === "bl")     { x = -r(X*.5,X);  y =  r(Y*.5,Y); }
  if (d === "br")     { x =  r(X*.5,X);  y =  r(Y*.5,Y); }
  return { x, y, rotate: r(-180,180), scale: r(0.4,1.1), opacity: 0 };
}

// ─── Component ───────────────────────────────────────────────────────────────
interface LoaderMobileProps {
  onComplete?: () => void;
  holdMs?: number;
}

export default function LoaderMobile({
  onComplete,
  holdMs = 1200,
}: LoaderMobileProps) {
  const N = PIECES.length;
  const [visible, setVisible] = useState(true);
  const [scatters] = useState<ScatterTransform[]>(() =>
    PIECES.map(() => randomScatter())
  );

  const gatherDone = 1250 + (N - 1) * 90;

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), gatherDone + holdMs);
    return () => clearTimeout(t);
  }, [gatherDone, holdMs]);

  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader-mobile"
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
          {/* Logo centrato, dimensioni fisse per mobile */}
          <div
            style={{
              position: "relative",
              width: LOGO_W,
              height: LOGO_H,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
