import type { Metadata } from "next";
import Image from "next/image";
import { Hotel, Car, Award, Users } from "lucide-react";
import { company } from "@/lib/data/company";
import { destImages } from "@/lib/data/images";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description: "হাওলাদার ট্যুর এন্ড ট্রাভেলস — ২০০৫ সাল থেকে ভ্রমণের বিশ্বস্ত সঙ্গী। প্রতিষ্ঠাতা অনুপ হাওলাদার ও অমিত হাওলাদার।",
};

const timeline = [
  { year: "২০০৫", text: "শ্রীরামপুর থেকে যাত্রা শুরু — অল্প কিছু পরিবার নিয়ে প্রথম ভ্রমণ।" },
  { year: "২০১০", text: "পশ্চিমবঙ্গ জুড়ে শাখা এজেন্ট নেটওয়ার্ক বিস্তার।" },
  { year: "২০১৫", text: "হরিদ্বারে নিজস্ব হোটেল চালু — তীর্থযাত্রীদের জন্য আরামদায়ক ব্যবস্থা।" },
  { year: "২০২০", text: "Howladar Group of Hotels — অল ইন্ডিয়া হোটেল ও কার বুকিং সেবা।" },
  { year: "২০২৬", text: "২১তম বর্ষপূর্তি — ৫০+ গন্তব্য, হাজারো খুশি পরিবার।" },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[300px] overflow-hidden">
        <Image src={destImages.varanasi} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-indigo-brand/50" />
        <div className="container-px absolute inset-x-0 bottom-0 pb-10 text-white">
          <FadeIn>
            <p className="font-bengali text-saffron">{company.taglineBn}</p>
            <h1 className="font-bengali text-3xl font-bold sm:text-5xl">আমাদের গল্প</h1>
          </FadeIn>
        </div>
      </div>

      <section className="container-px py-14">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bengali text-lg leading-8 text-ink/80">
              {company.nameBn} — {company.founded} সাল থেকে হুগলির শ্রীরামপুর-শেওড়াফুলি অঞ্চলের
              মধ্যবিত্ত বাঙালি পরিবারের ভ্রমণের বিশ্বস্ত সঙ্গী। দুই প্রজন্মের পরিচালনায়,
              প্রতিটি ভ্রমণে আমরা যত্ন আর বিশ্বাসকে সবার আগে রাখি।
            </p>
          </div>
        </FadeIn>

        {/* Founders */}
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {company.owners.map((name) => (
            <StaggerItem key={name}>
              <div className="rounded-2xl bg-white p-6 text-center shadow-brand">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-indigo-brand text-2xl font-bold text-white">
                  {name.charAt(0)}
                </div>
                <h3 className="mt-3 font-bengali text-xl font-bold text-ink">{name}</h3>
                <p className="font-bengali text-sm text-ink/60">প্রতিষ্ঠাতা ও পরিচালক</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Timeline */}
      <section className="bg-white py-14">
        <div className="container-px">
          <FadeIn>
            <h2 className="text-center font-bengali text-2xl font-bold text-ink sm:text-3xl">
              ২১ বছরের পথচলা
            </h2>
          </FadeIn>
          <div className="mx-auto mt-10 max-w-2xl border-l-2 border-saffron/40 pl-8">
            {timeline.map((t, i) => (
              <FadeIn key={t.year} delay={i * 0.05}>
                <div className="relative mb-8">
                  <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full bg-saffron font-bengali text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="font-display text-xl font-bold text-indigo-brand">{t.year}</p>
                  <p className="mt-1 font-bengali text-ink/75">{t.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Group of Hotels */}
      <section className="container-px py-14">
        <FadeIn>
          <div className="overflow-hidden rounded-2xl bg-indigo-brand text-white shadow-brand-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-auto">
                <Image src={destImages.haridwar} alt="Haridwar Hotel" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-8">
                <h2 className="font-bengali text-2xl font-bold">Howladar Group of Hotels</h2>
                <p className="mt-2 font-bengali text-white/80">All India Hotel & Car Booking</p>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Hotel, t: "হরিদ্বারে নিজস্ব হোটেল" },
                    { icon: Car, t: "সারা ভারতে গাড়ি বুকিং" },
                    { icon: Award, t: "২১ বছরের বিশ্বস্ত সেবা" },
                    { icon: Users, t: "হাজারো খুশি পরিবার" },
                  ].map(({ icon: Icon, t }) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron"><Icon size={18} /></span>
                      <span className="font-bengali">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
