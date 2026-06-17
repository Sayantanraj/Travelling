import { Suspense } from "react";
import type { Metadata } from "next";
import PackagesView from "@/components/tour/PackagesView";

export const metadata: Metadata = {
  title: "সব প্যাকেজ",
  description: "৫০+ ভ্রমণ প্যাকেজ — পাহাড়, সমুদ্র, তীর্থ, মরুভূমি ও আন্তর্জাতিক। অঞ্চল, মরসুম, দাম অনুযায়ী ফিল্টার করুন।",
};

export default function PackagesPage() {
  return (
    <div className="bg-cream pt-24">
      <div className="container-px">
        <h1 className="font-bengali text-3xl font-bold text-ink sm:text-4xl">
          সব ভ্রমণ প্যাকেজ
        </h1>
        <p className="mt-1 font-bengali text-ink/60">
          আপনার পছন্দ অনুযায়ী ফিল্টার করে সেরা প্যাকেজটি বেছে নিন
        </p>
      </div>
      <Suspense fallback={<div className="container-px py-16 text-center font-bengali text-ink/50">লোড হচ্ছে…</div>}>
        <PackagesView />
      </Suspense>
    </div>
  );
}
