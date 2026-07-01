"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import { heroMontage, heroVideo } from "@/lib/data/images";

const NAME = "Howladar";
const MIN_MS = 1800; // keep the animation on screen at least this long
const MAX_MS = 9000; // hard cap so it never hangs
const easeOut = [0.16, 1, 0.3, 1] as const;

// Preload a single image; resolves on load OR error so we never hang.
const preloadImage = (src: string) =>
  new Promise<void>((res) => {
    const img = new window.Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });

// Preload the hero video until it can actually play (first frame buffered),
// so it plays instantly when the splash lifts — no "image first, then video".
const preloadVideo = (src: string) =>
  new Promise<void>((res) => {
    const v = document.createElement("video");
    v.muted = true;
    v.preload = "auto";
    v.playsInline = true;
    const done = () => res();
    v.addEventListener("canplay", done, { once: true });
    v.addEventListener("loadeddata", done, { once: true });
    v.addEventListener("error", done, { once: true });
    v.src = src;
    v.load();
    setTimeout(done, MAX_MS - 1000); // per-asset safety cap
  });

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  // Ready logic: wait until the hero video can play + montage images load,
  // then keep the splash for a minimum time. Capped so it never hangs.
  useEffect(() => {
    const start = performance.now();
    let minTimer: ReturnType<typeof setTimeout>;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      const elapsed = performance.now() - start;
      minTimer = setTimeout(() => setDone(true), Math.max(0, MIN_MS - elapsed));
    };

    Promise.all([
      preloadVideo(heroVideo),
      ...heroMontage.map(preloadImage),
    ]).then(finish);

    const cap = setTimeout(() => setDone(true), MAX_MS);
    return () => {
      clearTimeout(minTimer);
      clearTimeout(cap);
    };
  }, []);

  // Cosmetic percentage counter (ease-out to 100 over MIN_MS).
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / MIN_MS);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock scroll while visible.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0b1a45]"
        >
          {/* Depth gradient + vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e3a8a_0%,#0b1a45_55%,#05102e_100%)]" />

          {/* Drifting glow orbs */}
          <motion.div
            aria-hidden
            className="absolute h-72 w-72 rounded-full bg-saffron/25 blur-[90px]"
            initial={{ x: -180, y: -120 }}
            animate={{ x: [-180, -120, -180], y: [-120, -60, -120] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute h-80 w-80 rounded-full bg-teal-brand/20 blur-[100px]"
            initial={{ x: 200, y: 120 }}
            animate={{ x: [200, 140, 200], y: [120, 60, 120] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Faint twinkling dots */}
          {[
            { l: "18%", t: "26%", d: 0 },
            { l: "80%", t: "30%", d: 0.6 },
            { l: "30%", t: "72%", d: 1.1 },
            { l: "68%", t: "68%", d: 0.3 },
            { l: "50%", t: "16%", d: 0.9 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/70"
              style={{ left: s.l, top: s.t }}
              animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.3, 0.6] }}
              transition={{ duration: 2.4, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Plane tracing a dotted arc */}
            <div className="relative mb-6 h-16 w-72">
              <svg viewBox="0 0 280 60" className="absolute inset-0 h-full w-full">
                <motion.path
                  d="M6,46 Q140,-12 274,46"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
              </svg>
              <motion.div
                className="absolute left-0 top-0 text-saffron"
                style={{ offsetPath: 'path("M6,46 Q140,-12 274,46")', offsetRotate: "auto" } as any}
                initial={{ offsetDistance: "0%" } as any}
                animate={{ offsetDistance: ["0%", "100%"] } as any}
                transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
              >
                <Plane size={22} className="rotate-45 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
              </motion.div>
            </div>

            {/* Wordmark with shine sweep */}
            <div className="relative overflow-hidden">
              <div className="flex">
                {NAME.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: easeOut }}
                    className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl"
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              {/* light streak */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-160%" }}
                animate={{ x: "260%" }}
                transition={{ delay: 1, duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
              />
            </div>

            {/* Ornamental divider + Tour & Travels */}
            <div className="mt-3 flex items-center gap-3">
              <motion.span
                className="block h-px w-10 origin-right bg-gradient-to-l from-saffron to-transparent sm:w-16"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: easeOut }}
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="whitespace-nowrap text-sm font-semibold tracking-[0.34em] text-saffron sm:text-base"
              >
                TOUR &amp; TRAVELS
              </motion.p>
              <motion.span
                className="block h-px w-10 origin-left bg-gradient-to-r from-saffron to-transparent sm:w-16"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: easeOut }}
              />
            </div>

            {/* Bengali tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="mt-3 font-bengali text-sm text-white/65 sm:text-base"
            >
              ভ্রমণের ২১ বছরের বিশ্বাস
            </motion.p>

            {/* Progress bar + percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-9 flex w-52 flex-col items-center gap-2"
            >
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron to-amber-200 transition-[width] duration-150 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="font-sans text-xs tracking-[0.2em] text-white/50">{pct}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
