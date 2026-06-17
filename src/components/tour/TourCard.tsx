"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Clock, MapPin, Train, Plane } from "lucide-react";
import type { Tour } from "@/lib/data/tours";
import { regionLabels } from "@/lib/data/tours";
import { resolveImage } from "@/lib/data/images";
import { waUrl, formatINR } from "@/lib/utils/whatsapp";

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  const img = resolveImage(tour.heroImage);
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-brand transition-shadow hover:shadow-brand-lg"
    >
      <Link href={`/packages/${tour.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={img}
          alt={tour.nameEn}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 gradient-overlay" />

        {tour.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-saffron px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
            {tour.badge}
          </span>
        )}
        {tour.discountPercent && (
          <span className="discount-shimmer absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full text-xs font-extrabold text-ink shadow-lg">
            {tour.discountPercent}%
            <span className="-mt-1 text-[8px]">OFF</span>
          </span>
        )}

        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Clock size={12} /> {tour.days} দিন
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 font-bengali text-xs font-medium text-white backdrop-blur">
            <MapPin size={12} /> {regionLabels[tour.region]}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/packages/${tour.slug}`}>
          <h3 className="font-bengali text-lg font-bold leading-snug text-ink line-clamp-2">
            {tour.nameBn}
          </h3>
          <p className="text-sm text-ink/50">{tour.nameEn}</p>
        </Link>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {tour.trainFareIncluded && (
            <span className="flex items-center gap-1 rounded bg-teal-brand/10 px-2 py-0.5 text-[11px] font-medium text-teal-brand">
              <Train size={11} /> Train Incl.
            </span>
          )}
          {tour.airFareIncluded && (
            <span className="flex items-center gap-1 rounded bg-indigo-brand/10 px-2 py-0.5 text-[11px] font-medium text-indigo-brand">
              <Plane size={11} /> Air Incl.
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-end gap-2">
            <span className="text-xl font-extrabold text-indigo-brand">
              {formatINR(tour.priceINR)}
            </span>
            {tour.originalPriceINR && (
              <span className="mb-0.5 text-sm text-ink/40 line-through">
                {formatINR(tour.originalPriceINR)}
              </span>
            )}
            <span className="mb-0.5 font-bengali text-xs text-ink/50">/ জন</span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={waUrl(tour.nameBn)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2.5 font-bengali text-sm font-bold text-white transition active:scale-95"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link
              href={`/packages/${tour.slug}`}
              className="flex items-center justify-center rounded-full border border-indigo-brand px-3 py-2.5 font-bengali text-sm font-bold text-indigo-brand transition hover:bg-indigo-brand hover:text-white active:scale-95"
            >
              বিস্তারিত
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
