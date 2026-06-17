import Image from "next/image";
import { Award, Hotel, Car, Gift } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/animations/FadeIn";
import { destImages } from "@/lib/data/images";

const pillars = [
  { icon: Award, titleBn: "২১ বছরের অভিজ্ঞতা", descBn: "২০০৫ সাল থেকে হাজারো পরিবারের নিশ্চিন্ত ভ্রমণ সঙ্গী।" },
  { icon: Hotel, titleBn: "হরিদ্বারে নিজস্ব হোটেল", descBn: "নিজস্ব হোটেলে আরামদায়ক ও সাশ্রয়ী থাকার ব্যবস্থা।" },
  { icon: Car, titleBn: "অল ইন্ডিয়া হোটেল & কার বুকিং", descBn: "Howladar Group of Hotels — সারা ভারতে হোটেল ও গাড়ি।" },
  { icon: Gift, titleBn: "ফ্যামিলি গিফট ভাউচার", descBn: "২০২৬-২৭ এ প্রতিটি বুকিংয়ে আকর্ষণীয় গিফট ভাউচার।" },
];

export default function WhyHowladar() {
  return (
    <section className="relative overflow-hidden py-16">
      <Image
        src={destImages.kashmir}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-indigo-brand/90" />

      <div className="container-px relative z-10 text-white">
        <FadeIn>
          <h2 className="text-center font-bengali text-2xl font-bold sm:text-3xl">
            কেন হাওলাদার?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center font-bengali text-sm text-white/75">
            বিশ্বাস, অভিজ্ঞতা আর যত্ন — তিন প্রজন্মের পরিবারের জন্য।
          </p>
        </FadeIn>

        <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, titleBn, descBn }) => (
            <StaggerItem key={titleBn}>
              <div className="flex h-full flex-col items-center rounded-2xl glass p-4 text-center sm:p-6">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-white sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-[26px] sm:w-[26px]" />
                </div>
                <h3 className="mt-3 font-bengali text-sm font-bold leading-snug sm:mt-4 sm:text-lg">
                  {titleBn}
                </h3>
                <p className="mt-1.5 font-bengali text-xs leading-6 text-white/80 sm:mt-2 sm:text-sm sm:leading-7">
                  {descBn}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
