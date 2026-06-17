"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MapPin } from "lucide-react";
import { branchAgents, type BranchAgent } from "@/lib/data/agents";
import { FadeIn } from "@/components/animations/FadeIn";

export default function BranchMap() {
  const [selected, setSelected] = useState<BranchAgent | null>(null);

  return (
    <section className="bg-white py-14">
      <div className="container-px">
        <FadeIn>
          <h2 className="text-center font-bengali text-2xl font-bold text-ink sm:text-3xl">
            পশ্চিমবঙ্গ জুড়ে আমাদের এজেন্ট
          </h2>
          <p className="mt-1 text-center font-bengali text-sm text-ink/60">
            পিনে ট্যাপ করুন — এজেন্টের নাম ও ফোন নম্বর দেখুন
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mx-auto mt-8 aspect-[4/3] max-w-2xl rounded-2xl bg-gradient-to-br from-teal-brand/10 to-indigo-brand/10 p-4">
            {/* Stylized WB silhouette */}
            <svg viewBox="0 0 100 80" className="h-full w-full" aria-hidden>
              <path
                d="M40 6 L55 9 L58 18 L52 26 L60 30 L57 40 L66 44 L62 56 L70 60 L64 72 L52 76 L46 68 L40 70 L34 60 L38 50 L30 44 L36 36 L28 30 L34 22 L30 14 Z"
                fill="#0EA5E9"
                fillOpacity="0.15"
                stroke="#1E3A8A"
                strokeOpacity="0.4"
                strokeWidth="0.6"
              />
            </svg>

            {/* Pulsing pins */}
            {branchAgents.map((a) => (
              <button
                key={a.phone}
                onClick={() => setSelected(a)}
                style={{ left: `${a.x}%`, top: `${a.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={`${a.city} — ${a.name}`}
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-saffron" />
                <span className="relative grid h-7 w-7 place-items-center rounded-full bg-indigo-brand text-white shadow-lg transition-transform group-hover:scale-125">
                  <MapPin size={14} />
                </span>
                <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink/80 px-1.5 py-0.5 font-bengali text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {a.cityBn}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Agent chips fallback list */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {branchAgents.map((a) => (
            <button
              key={`chip-${a.phone}`}
              onClick={() => setSelected(a)}
              className="rounded-lg bg-cream px-3 py-2 text-left font-bengali text-sm transition hover:bg-saffron/10"
            >
              <span className="font-bold text-ink">{a.cityBn}</span>
              <br />
              <span className="text-xs text-ink/60">{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-brand-lg"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream text-ink/60"
                aria-label="বন্ধ"
              >
                <X size={18} />
              </button>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-indigo-brand text-white">
                <MapPin size={26} />
              </div>
              <h3 className="mt-3 font-bengali text-xl font-bold text-ink">{selected.cityBn}</h3>
              <p className="font-bengali text-ink/70">{selected.name}</p>
              <a
                href={`tel:+91${selected.phone}`}
                className="btn-saffron mt-5 w-full bg-[#25D366]"
              >
                <Phone size={18} /> {selected.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
