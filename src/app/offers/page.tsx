import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { bumperOffers } from "@/lib/data/tours";
import { TourCard } from "@/components/tour/TourCard";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "বাম্পার অফার",
  description:
    "হাওলাদার ট্যুর এন্ড ট্রাভেলস — ২০২৬-২৭ এর বাম্পার অফার। কাশ্মীর, গোয়া, রাজস্থান, হরিদ্বার সহ ২৪টি প্যাকেজে বিশেষ ছাড়। সীমিত সময়ের জন্য।",
};

export default function OffersPage() {
  // Show the biggest discounts first.
  const offers = [...bumperOffers].sort(
    (a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0)
  );

  return (
    <div className="bg-cream pt-20">
      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-brand to-saffron py-12 text-white">
        <div className="container-px">
          <FadeIn>
            <div className="flex items-center gap-2">
              <Flame size={28} />
              <span className="font-bengali text-sm font-semibold uppercase tracking-wide">
                সীমিত সময়ের অফার
              </span>
            </div>
            <h1 className="mt-2 font-bengali text-3xl font-bold sm:text-5xl">
              বাম্পার অফার — ২০২৬-২৭
            </h1>
            <p className="mt-2 max-w-xl font-bengali text-white/90">
              {bumperOffers.length}টি জনপ্রিয় প্যাকেজে দারুণ ছাড়। আসন সীমিত —
              আজই WhatsApp বা ফোনে বুক করুন।
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Offers grid */}
      <section className="container-px py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {offers.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}
