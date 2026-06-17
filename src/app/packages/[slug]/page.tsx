import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTours, getTourBySlug } from "@/lib/data/tours";
import TourDetailClient from "@/components/tour/TourDetailClient";

export function generateStaticParams() {
  return allTours.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "প্যাকেজ পাওয়া যায়নি" };
  return {
    title: `${tour.nameEn} — ${tour.days} দিন`,
    description: `${tour.nameBn} (${tour.days} দিন) — ₹${tour.priceINR.toLocaleString("en-IN")} থেকে। ${tour.itineraryBn}`,
  };
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();
  return <TourDetailClient tour={tour} />;
}
