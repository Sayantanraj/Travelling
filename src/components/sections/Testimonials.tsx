"use client";
import { Star, Quote } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

// Placeholder testimonials — owner will swap with real reviews.
const reviews = [
  { name: "সুমিতা দাস", city: "শ্রীরামপুর", text: "কাশ্মীর ট্যুরটা দারুণ ছিল! পরিবারের সবাই খুব আনন্দ পেয়েছি। হোটেল, খাবার সব first class।", tour: "কাশ্মীর" },
  { name: "রবি ঘোষ", city: "দুর্গাপুর", text: "আন্দামান প্যাকেজে সব কিছু সময়মত হয়েছে। গাইড খুব হেল্পফুল ছিল। আবার যাব।", tour: "আন্দামান" },
  { name: "অঞ্জলি সাহা", city: "বর্ধমান", text: "২১ বছরের অভিজ্ঞতা সত্যিই বোঝা যায়। পুরী ট্যুরে কোনো ঝামেলা হয়নি।", tour: "পুরী" },
  { name: "প্রদীপ মণ্ডল", city: "কল্যাণী", text: "দার্জিলিং-গ্যাংটক ট্রিপটা পরিবারের জন্য perfect ছিল। দামও সাশ্রয়ী।", tour: "দার্জিলিং" },
  { name: "মিতা চক্রবর্তী", city: "বেহালা", text: "কেরল ট্যুরের ব্যবস্থাপনা অসাধারণ। WhatsApp এ সব আপডেট পেয়েছি।", tour: "কেরল" },
  { name: "অসীম পাল", city: "বারুইপুর", text: "রাজস্থান ট্যুরে প্রতিটা জায়গা সুন্দর করে ঘুরিয়েছে। হাওলাদার-কে ধন্যবাদ।", tour: "রাজস্থান" },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="w-80 shrink-0 rounded-2xl bg-white p-6 shadow-brand">
      <Quote className="text-saffron" size={28} />
      <div className="mt-2 flex gap-0.5 text-saffron">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" />
        ))}
      </div>
      <p className="mt-3 font-bengali text-sm leading-7 text-ink/80">{r.text}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-brand font-bold text-white">
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="font-bengali text-sm font-bold text-ink">{r.name}</p>
          <p className="font-bengali text-xs text-ink/50">{r.city} · {r.tour}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="overflow-hidden bg-cream py-14">
      <div className="container-px">
        <FadeIn>
          <h2 className="text-center font-bengali text-2xl font-bold text-ink sm:text-3xl">
            যাত্রীদের অভিজ্ঞতা
          </h2>
          <p className="mt-1 text-center font-bengali text-sm text-ink/60">
            হাজারো খুশি পরিবারের আস্থা
          </p>
        </FadeIn>
      </div>

      <div className="group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
