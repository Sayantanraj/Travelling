"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { bumperOffers } from "@/lib/data/tours";
import { resolveImage } from "@/lib/data/images";
import { formatINR } from "@/lib/utils/whatsapp";
import { FadeIn } from "@/components/animations/FadeIn";

export default function BumperCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // scroll by ~80% of the visible width
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-cream to-white py-14">
      <div className="container-px">
        <FadeIn>
          <div className="flex items-center gap-2">
            <Flame className="text-rose-brand" size={26} />
            <h2 className="font-bengali text-2xl font-bold text-ink sm:text-3xl">
              বাম্পার অফার — ২০২৬-২৭
            </h2>
          </div>
          <p className="mt-1 font-bengali text-sm text-ink/60">
            সীমিত সময়ের জন্য বিশেষ ছাড়। আসন সীমিত — আজই বুক করুন।
          </p>
        </FadeIn>
      </div>

      <div className="relative mt-6">
        {/* Desktop nav arrows — transparent, scroll the carousel on click.
            Left arrow only appears once scrolled right (nothing to its left at start). */}
        {canLeft && (
          <button
            type="button"
            aria-label="আগের অফার"
            onClick={() => scrollBy(-1)}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 active:scale-95 lg:grid"
          >
            <ChevronLeft size={26} />
          </button>
        )}
        {canRight && (
          <button
            type="button"
            aria-label="পরের অফার"
            onClick={() => scrollBy(1)}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40 active:scale-95 lg:grid"
          >
            <ChevronRight size={26} />
          </button>
        )}

        <div
          ref={scrollerRef}
          onScroll={updateArrows}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-8"
        >
        {bumperOffers.map((tour) => (
          <Link
            key={tour.id}
            href={`/packages/${tour.slug}`}
            className="group relative w-64 shrink-0 overflow-hidden rounded-2xl shadow-brand"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={resolveImage(tour.heroImage)}
                alt={tour.nameEn}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 gradient-overlay" />
            </div>

            {tour.discountPercent && (
              <div className="discount-shimmer absolute right-3 top-3 grid h-14 w-14 place-items-center rounded-full text-sm font-extrabold text-ink shadow-lg">
                {tour.discountPercent}%
                <span className="-mt-1 text-[9px]">OFF</span>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <span className="rounded bg-rose-brand px-2 py-0.5 text-[10px] font-bold uppercase">
                {tour.days} দিন
              </span>
              <h3 className="mt-2 font-bengali text-lg font-bold leading-snug line-clamp-2">
                {tour.nameBn}
              </h3>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-xl font-extrabold text-saffron">
                  {formatINR(tour.priceINR)}
                </span>
                {tour.originalPriceINR && (
                  <span className="mb-0.5 text-sm text-white/60 line-through">
                    {formatINR(tour.originalPriceINR)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
