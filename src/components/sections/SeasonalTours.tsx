"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tours, seasonLabels, type Tour } from "@/lib/data/tours";
import { TourCard } from "@/components/tour/TourCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils/cn";

const SEASONS: Tour["season"][] = [
  "puja-oct-26",
  "nov-dec-26",
  "jan-feb-27",
  "mar-apr-27",
  "may-jun-27",
];

export default function SeasonalTours() {
  const [active, setActive] = useState<Tour["season"]>("puja-oct-26");
  const filtered = tours.filter((t) => t.season === active);

  return (
    <section className="bg-white py-14">
      <div className="container-px">
        <FadeIn>
          <h2 className="text-center font-bengali text-2xl font-bold text-ink sm:text-3xl">
            মরসুম অনুযায়ী ভ্রমণ
          </h2>
          <p className="mt-1 text-center font-bengali text-sm text-ink/60">
            আপনার পছন্দের সময় বেছে নিন
          </p>
        </FadeIn>

        {/* Tabs */}
        <div className="no-scrollbar mt-7 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
          {SEASONS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 font-bengali text-sm font-semibold transition-all",
                active === s
                  ? "bg-indigo-brand text-white shadow-brand"
                  : "bg-cream text-ink/70 hover:bg-saffron/10"
              )}
            >
              {seasonLabels[s].emoji} {seasonLabels[s].bn}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
