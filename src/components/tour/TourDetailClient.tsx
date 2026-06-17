"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle, Phone, Clock, MapPin, Calendar, Train, Plane,
  Check, X, Users, AlertTriangle, ChevronRight,
} from "lucide-react";
import type { Tour } from "@/lib/data/tours";
import { regionLabels, seasonLabels } from "@/lib/data/tours";
import { resolveImage } from "@/lib/data/images";
import { waUrl, telUrl, formatINR } from "@/lib/utils/whatsapp";
import { trainNotice } from "@/lib/data/company";
import { FadeIn } from "@/components/animations/FadeIn";

const inclusions = [
  "AC/Non-AC ট্রেন বা গাড়িতে যাতায়াত",
  "মানসম্মত হোটেলে থাকা",
  "প্রতিদিন প্রাতরাশ, দুপুর ও রাতের খাবার",
  "অভিজ্ঞ ট্যুর গাইড ও এসকর্ট",
  "সব সাইটসিইং ও ট্রান্সফার",
];
const exclusions = [
  "ব্যক্তিগত খরচ (লন্ড্রি, ফোন ইত্যাদি)",
  "প্রবেশমূল্য / ক্যামেরা ফি (উল্লেখ না থাকলে)",
  "ট্রেনে খাবার (নিজ দায়িত্বে)",
  "প্রাকৃতিক দুর্যোগে অতিরিক্ত খরচ",
];

export default function TourDetailClient({ tour }: { tour: Tour }) {
  const img = resolveImage(tour.heroImage);
  const days = tour.itineraryBn
    .split(/[,।]/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="pb-28 lg:pb-0">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden">
        <Image src={img} alt={tour.nameEn} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="container-px absolute inset-x-0 bottom-0 pb-8 text-white">
          <Link href="/packages" className="mb-3 inline-flex items-center gap-1 font-bengali text-sm text-white/80 hover:text-saffron">
            প্যাকেজ <ChevronRight size={14} /> {tour.nameEn}
          </Link>
          <div className="flex flex-wrap gap-2">
            {tour.badge && (
              <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold uppercase">{tour.badge}</span>
            )}
            <span className="rounded-full bg-black/40 px-3 py-1 font-bengali text-xs backdrop-blur">
              {seasonLabels[tour.season].emoji} {seasonLabels[tour.season].bn}
            </span>
          </div>
          <h1 className="mt-2 font-bengali text-3xl font-bold leading-tight sm:text-5xl">{tour.nameBn}</h1>
          <p className="text-white/70">{tour.nameEn}</p>
          <div className="mt-3 flex flex-wrap gap-3 font-bengali text-sm">
            <span className="flex items-center gap-1"><Clock size={15} /> {tour.days} দিন</span>
            <span className="flex items-center gap-1"><MapPin size={15} /> {regionLabels[tour.region]}</span>
            {tour.minHeads && <span className="flex items-center gap-1"><Users size={15} /> ন্যূনতম {tour.minHeads} জন</span>}
          </div>
        </div>
      </div>

      <div className="container-px py-10">
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* Main */}
          <div>
            {/* Itinerary timeline */}
            <section>
              <h2 className="font-bengali text-2xl font-bold text-ink">দিনযাপন (Itinerary)</h2>
              <div className="mt-6 space-y-4 border-l-2 border-saffron/30 pl-6">
                {days.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full bg-saffron text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="font-bengali text-ink/85">{d}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <section className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-green-50 p-5">
                <h3 className="font-bengali text-lg font-bold text-green-700">অন্তর্ভুক্ত</h3>
                <ul className="mt-3 space-y-2">
                  {inclusions.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-bengali text-sm text-ink/80">
                      <Check size={16} className="mt-0.5 shrink-0 text-green-600" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-rose-50 p-5">
                <h3 className="font-bengali text-lg font-bold text-rose-brand">অন্তর্ভুক্ত নয়</h3>
                <ul className="mt-3 space-y-2">
                  {exclusions.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-bengali text-sm text-ink/80">
                      <X size={16} className="mt-0.5 shrink-0 text-rose-brand" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Departure dates */}
            <section className="mt-10">
              <h3 className="flex items-center gap-2 font-bengali text-lg font-bold text-ink">
                <Calendar size={20} /> যাত্রার তারিখ
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tour.departureDates.map((d) => (
                  <span key={d} className="rounded-full border border-indigo-brand/20 bg-indigo-brand/5 px-3 py-1.5 font-bengali text-sm font-medium text-indigo-brand">
                    {d}
                  </span>
                ))}
              </div>
            </section>

            {/* Mandatory notice */}
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-saffron/40 bg-saffron/10 p-4">
              <AlertTriangle className="mt-0.5 shrink-0 text-saffron" size={22} />
              <p className="font-bengali text-sm font-medium leading-7 text-ink/85">{trainNotice}</p>
            </div>

            {/* Map */}
            <section className="mt-10">
              <h3 className="flex items-center gap-2 font-bengali text-lg font-bold text-ink">
                <MapPin size={20} /> অবস্থান
              </h3>
              <div className="mt-3 overflow-hidden rounded-2xl shadow-brand">
                <iframe
                  title="map"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(tour.nameEn + " India")}&output=embed`}
                />
              </div>
            </section>
          </div>

          {/* Sticky price card (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-brand-lg">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-indigo-brand">{formatINR(tour.priceINR)}</span>
                {tour.originalPriceINR && (
                  <span className="mb-1 text-lg text-ink/40 line-through">{formatINR(tour.originalPriceINR)}</span>
                )}
              </div>
              <p className="font-bengali text-sm text-ink/50">প্রতি জন · + Train Fair</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {tour.trainFareIncluded && (
                  <span className="flex items-center gap-1 rounded bg-teal-brand/10 px-2 py-1 text-xs font-medium text-teal-brand"><Train size={12} /> Train Incl.</span>
                )}
                {tour.airFareIncluded && (
                  <span className="flex items-center gap-1 rounded bg-indigo-brand/10 px-2 py-1 text-xs font-medium text-indigo-brand"><Plane size={12} /> Air Incl.</span>
                )}
              </div>

              <a href={waUrl(tour.nameBn)} target="_blank" rel="noopener noreferrer" className="btn-saffron mt-5 w-full bg-[#25D366]">
                <MessageCircle size={18} /> WhatsApp এ বুকিং
              </a>
              <a href={telUrl} className="btn-indigo mt-3 w-full">
                <Phone size={18} /> কল করুন
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-black/5 bg-white/95 backdrop-blur-md pb-safe lg:hidden">
        <div className="container-px flex items-center gap-3 py-3">
          <div className="shrink-0">
            <div className="flex items-end gap-1">
              <span className="text-xl font-extrabold text-indigo-brand">{formatINR(tour.priceINR)}</span>
            </div>
            <span className="font-bengali text-[11px] text-ink/50">প্রতি জন</span>
          </div>
          <a href={waUrl(tour.nameBn)} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 font-bengali text-sm font-bold text-white">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a href={telUrl} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-indigo-brand text-white">
            <Phone size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
