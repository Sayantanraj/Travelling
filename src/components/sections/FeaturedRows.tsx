"use client";
import Link from "next/link";
import Image from "next/image";
import { Plane, ArrowRight } from "lucide-react";
import { allTours, tours, type Tour } from "@/lib/data/tours";
import { resolveImage } from "@/lib/data/images";
import { formatINR, waUrl } from "@/lib/utils/whatsapp";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { TourCard } from "@/components/tour/TourCard";

const intlSlugs = ["andaman-special-5n-6d", "thailand-5d", "bhutan-9d", "nepal-10d", "bangladesh-10d"];
const weekendSlugs = ["digha-hilsa-3d", "puri-4d", "sundarban-hilsa-3d", "darjeeling-5d"];

function pick(slugs: string[]): Tour[] {
  return slugs.map((s) => allTours.find((t) => t.slug === s)!).filter(Boolean);
}

export default function FeaturedRows() {
  const intl = pick(intlSlugs);
  const weekend = pick(weekendSlugs);

  return (
    <>
      {/* International & Premium */}
      <section className="bg-gradient-to-b from-indigo-brand to-[#16306f] py-14 text-white">
        <div className="container-px">
          <FadeIn>
            <div className="flex items-center gap-2">
              <Plane size={26} className="text-saffron" />
              <h2 className="font-bengali text-2xl font-bold sm:text-3xl">
                আন্তর্জাতিক ও প্রিমিয়াম
              </h2>
            </div>
            <p className="mt-1 font-bengali text-sm text-white/70">
              দেশ-বিদেশের বিশেষ গন্তব্য — অনেকগুলিতে এয়ার ফেয়ার সহ
            </p>
          </FadeIn>

          <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {intl.map((tour) => (
              <StaggerItem key={tour.id}>
                <Link
                  href={`/packages/${tour.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-brand-lg"
                >
                  <Image
                    src={resolveImage(tour.heroImage)}
                    alt={tour.nameEn}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 gradient-overlay" />
                  {tour.airFareIncluded && (
                    <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-saffron px-3 py-1 text-xs font-bold text-white">
                      <Plane size={13} /> Air Fare Included
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-bengali text-2xl font-bold">{tour.nameBn}</h3>
                    <p className="text-sm text-white/70">{tour.nameEn} · {tour.days} দিন</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-saffron">
                        {formatINR(tour.priceINR)}
                      </span>
                      <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Weekend escapes */}
      <section className="bg-cream py-14">
        <div className="container-px">
          <FadeIn>
            <h2 className="font-bengali text-2xl font-bold text-ink sm:text-3xl">
              🏖️ উইকেন্ড এসকেপ
            </h2>
            <p className="mt-1 font-bengali text-sm text-ink/60">
              অল্প খরচে কাছের গন্তব্য — <span className="font-bold text-rose-brand">From ₹2,499</span>
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {weekend.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
