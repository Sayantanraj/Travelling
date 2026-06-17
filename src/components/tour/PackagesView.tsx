"use client";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { allTours, regionLabels, seasonLabels, type Tour } from "@/lib/data/tours";
import { TourCard } from "@/components/tour/TourCard";
import { cn } from "@/lib/utils/cn";

const REGIONS: Tour["region"][] = ["hills", "beach", "pilgrimage", "desert", "northeast", "south", "west", "international"];
const SEASONS: Tour["season"][] = ["puja-oct-26", "nov-dec-26", "jan-feb-27", "mar-apr-27", "may-jun-27", "weekend", "international", "bumper"];
const PRICE_BANDS = [
  { label: "৳ ৫,০০০ পর্যন্ত", max: 5000 },
  { label: "৳ ১০,০০০ পর্যন্ত", max: 10000 },
  { label: "৳ ২০,০০০ পর্যন্ত", max: 20000 },
  { label: "৳ ২০,০০০+", max: Infinity },
];
const DURATIONS = [
  { label: "৫ দিন পর্যন্ত", max: 5 },
  { label: "৬–১০ দিন", min: 6, max: 10 },
  { label: "১০+ দিন", min: 11, max: Infinity },
];

type Filters = {
  region: string;
  season: string;
  maxPrice: number;
  durIdx: number;
};

function FilterPanel({
  filters,
  setFilter,
  reset,
}: {
  filters: Filters;
  setFilter: (k: keyof Filters, v: string | number) => void;
  reset: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bengali text-lg font-bold text-ink">ফিল্টার</h3>
        <button onClick={reset} className="font-bengali text-sm text-rose-brand">
          রিসেট
        </button>
      </div>

      <div>
        <p className="mb-2 font-bengali text-sm font-semibold text-ink/70">অঞ্চল</p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setFilter("region", filters.region === r ? "" : r)}
              className={cn(
                "rounded-full px-3 py-1.5 font-bengali text-sm transition",
                filters.region === r ? "bg-indigo-brand text-white" : "bg-cream text-ink/70"
              )}
            >
              {regionLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-bengali text-sm font-semibold text-ink/70">মরসুম</p>
        <div className="flex flex-wrap gap-2">
          {SEASONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter("season", filters.season === s ? "" : s)}
              className={cn(
                "rounded-full px-3 py-1.5 font-bengali text-sm transition",
                filters.season === s ? "bg-indigo-brand text-white" : "bg-cream text-ink/70"
              )}
            >
              {seasonLabels[s].emoji} {seasonLabels[s].bn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-bengali text-sm font-semibold text-ink/70">দাম</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_BANDS.map((b) => (
            <button
              key={b.label}
              onClick={() => setFilter("maxPrice", filters.maxPrice === b.max ? 0 : b.max)}
              className={cn(
                "rounded-full px-3 py-1.5 font-bengali text-sm transition",
                filters.maxPrice === b.max ? "bg-saffron text-white" : "bg-cream text-ink/70"
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-bengali text-sm font-semibold text-ink/70">সময়কাল</p>
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setFilter("durIdx", filters.durIdx === i + 1 ? 0 : i + 1)}
              className={cn(
                "rounded-full px-3 py-1.5 font-bengali text-sm transition",
                filters.durIdx === i + 1 ? "bg-indigo-brand text-white" : "bg-cream text-ink/70"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PackagesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const filters: Filters = {
    region: searchParams.get("region") ?? "",
    season: searchParams.get("season") ?? "",
    maxPrice: Number(searchParams.get("maxPrice") ?? 0),
    durIdx: Number(searchParams.get("dur") ?? 0),
  };

  const setFilter = (k: keyof Filters, v: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    const key = k === "maxPrice" ? "maxPrice" : k === "durIdx" ? "dur" : k;
    if (!v) params.delete(key);
    else params.set(key, String(v));
    router.replace(`/packages?${params.toString()}`, { scroll: false });
  };

  const reset = () => router.replace("/packages", { scroll: false });

  const filtered = useMemo(() => {
    return allTours.filter((t) => {
      if (filters.region && t.region !== filters.region) return false;
      if (filters.season && t.season !== filters.season) return false;
      if (filters.maxPrice && t.priceINR > filters.maxPrice) return false;
      if (filters.durIdx) {
        const d = DURATIONS[filters.durIdx - 1];
        if (t.days < (d.min ?? 0) || t.days > d.max) return false;
      }
      return true;
    });
  }, [filters.region, filters.season, filters.maxPrice, filters.durIdx]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  return (
    <div className="container-px py-8">
      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-brand">
            <FilterPanel filters={filters} setFilter={setFilter} reset={reset} />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between">
            <p className="font-bengali text-sm text-ink/60">
              <span className="font-bold text-ink">{filtered.length}</span> টি প্যাকেজ পাওয়া গেছে
            </p>
            <button
              onClick={() => setSheetOpen(true)}
              className="flex items-center gap-2 rounded-full bg-indigo-brand px-4 py-2 font-bengali text-sm font-semibold text-white lg:hidden"
            >
              <SlidersHorizontal size={16} /> ফিল্টার
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 text-center font-bengali text-ink/50">
              কোনো প্যাকেজ পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setSheetOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 pb-safe"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/15" />
              <button
                onClick={() => setSheetOpen(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream"
                aria-label="বন্ধ"
              >
                <X size={18} />
              </button>
              <FilterPanel filters={filters} setFilter={setFilter} reset={reset} />
              <button
                onClick={() => setSheetOpen(false)}
                className="btn-indigo mt-6 w-full"
              >
                {filtered.length} টি প্যাকেজ দেখুন
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
